const blogPluginExports = require("@docusaurus/plugin-content-blog");
const {
  getBlogTags,
} = require("@docusaurus/plugin-content-blog/lib/blogUtils");
const utils = require("@docusaurus/utils");
const path = require("path");
const { stringify } = require("yaml");
const os = require("os");
const defaultBlogPlugin = blogPluginExports.default;
const normalizeFrontMatterTag = require("../utils/normalizeFrontMatterTag.ts");
const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: "ahan5lt9",
  dataset: "production",
  apiVersion: "2022-11-21", // use current UTC date - see "specifying API version"!
  token: "", // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});

const pluginDataDirRoot = path.join(
  ".docusaurus",
  "docusaurus-plugin-content-blog"
);
const aliasedSource = (source) =>
  `~blog/${utils.posixPath(path.relative(pluginDataDirRoot, source))}`;

function formatBlogPostDate(locale, date, calendar) {
  try {
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
  } catch (err) {
    logger_1.default.error`Can't format blog post date "${String(date)}"`;
    throw err;
  }
}

function paginateBlogPosts({
  blogPosts,
  basePageUrl,
  blogTitle,
  blogDescription,
}) {
  const totalCount = blogPosts.length;
  const postsPerPage = totalCount;
  const numberOfPages = Math.ceil(totalCount / postsPerPage);
  const pages = [];

  function permalink(page) {
    return page > 0
      ? utils.normalizeUrl([basePageUrl, `page/${page + 1}`])
      : basePageUrl;
  }

  for (let page = 0; page < numberOfPages; page += 1) {
    pages.push({
      items: blogPosts
        .slice(page * postsPerPage, (page + 1) * postsPerPage)
        .map((item) => item.id),
      metadata: {
        permalink: permalink(page),
        page: page + 1,
        postsPerPage,
        totalPages: numberOfPages,
        totalCount,
        previousPage: page !== 0 ? permalink(page - 1) : undefined,
        nextPage: page < numberOfPages - 1 ? permalink(page + 1) : undefined,
        blogDescription,
        blogTitle,
      },
    });
  }

  return pages;
}

function getRelatedPosts(allBlogPosts, currentPost) {
  const relatedPosts = allBlogPosts.filter(
    (post) =>
      post.tags.some((postTag) =>
        currentPost.tags.some(
          (currentPostTag) => postTag.label === currentPostTag.label
        )
      ) && post.title !== currentPost.title
  );

  return relatedPosts.map((post) => ({
    title: post.title,
    permalink: "/" + post.slug,
    authors: post.authors,
    tags: post.tags,
  }));
}

async function blogPluginExtended(...pluginArgs) {
  pluginArgs[1].routeBasePath = "/"; // Serve the blogPosts at the site's root

  const postsPerPageOption = "ALL";
  const blogTagsListPath = "/tags";
  const blogPluginInstance = await defaultBlogPlugin(...pluginArgs);
  const { blogTitle, blogDescription } = pluginArgs[1];
  const authorsMap = [];

  return {
    name: "docusaurus-plugin-content-blog",
    // Add all properties of the default blog plugin so existing functionality is preserved
    ...blogPluginInstance,
    /**
     * Override the default `contentLoaded` hook to access blog posts data
     */

    loadContent: async function () {
      const blogPosts = [];

      try {
        const postFields = `
      title,
      date,
      description,
      "heroImage": heroImage.asset->url,
      "slug": slug.current,
      "authors": authors[]->id,
      content,
      "tags": tags[]->label,
      `;

        const authorFields = `
      id,
      name,
      about,
      "picture": picture.asset->url,
      `;

        const indexQuery = `{
        "posts": *[_type == "post"] | order(date desc, _updatedAt desc) {${postFields}},
        "authors": *[_type == "author"] {${authorFields}},       
      }`;

        const res = await client.fetch(indexQuery, {});

        res.authors.forEach((author) =>
          authorsMap.push({
            id: author.id,
            name: author.name,
            about: author.about,
            picture: author.picture,
          })
        );

        for (const post of res.posts) {
          post.tags = post.tags.map(
            (tag) => normalizeFrontMatterTag(blogTagsListPath, tag) // TODO implement on sanity side?
          );
        }

        for (const post of res.posts) {
          const slug = "/" + post.slug; //TODO
          const relatedPosts = getRelatedPosts(res.posts, post);

          blogPosts.push({
            id: slug,
            metadata: {
              permalink: slug,
              source: "temp",
              title: post.title,
              description: post.description,
              tags: post.tags,
              authors: post.authors,
              frontMatter: {},
            },
            content: post.content[0],
            ...post,
            slug,
            mdx:
              "---" +
              os.EOL +
              stringify({
                ...post,
                content: undefined,
                formattedDate: formatBlogPostDate("en-US", post.data),
                heroImage: post.heroImage,
                authors: post.authors,
                slug,
                relatedPosts,
                authorsMap,
                tags: post.tags,
              }) +
              "---" +
              os.EOL +
              post.content[0],
          });
        }
      } catch (error) {
        console.log(error);
      }
      return {
        blogPosts,
        blogSidebarTitle: "none",
        blogListPaginated: [],
        blogTags: getBlogTags({ blogPosts, postsPerPageOption }),
        blogTagsListPath,
      };
    },

    contentLoaded: async function (data) {
      const { content: blogContents, actions } = data;
      const { addRoute, createData } = actions;
      const blogItemsToMetadata = {};
      const {
        blogPosts: allBlogPosts,
        blogTags,
        blogTagsListPath,
      } = blogContents;

      function blogPostItemsModule(items) {
        return items.map((postId) => {
          const blogPostMetadata = blogItemsToMetadata[postId];

          return {
            content: {
              __import: true,
              path: blogPostMetadata.source,
              query: {
                truncated: true,
              },
            },
          };
        });
      }

      const blogPosts = allBlogPosts.filter(
        (post) => post.metadata.frontMatter.is_featured !== true
      );

      const blogListPaginated = paginateBlogPosts({
        blogPosts,
        basePageUrl: "/blog",
        blogTitle,
        blogDescription,
        postsPerPageOption,
      });

      // Create routes for blog entries.
      await Promise.all(
        allBlogPosts.map(async (blogPost) => {
          const { id, metadata } = blogPost;

          const contentPath = await createData(
            `${utils.docuHash(id)}.mdx`,
            blogPost.mdx
          );

          metadata.source = contentPath;

          addRoute({
            path: metadata.permalink,
            component: "@theme/BlogPostPage",
            exact: true,
            modules: {
              content: contentPath,
            },
          });

          blogItemsToMetadata[id] = metadata;
        })
      );

      const tagsProp = Object.values(blogTags).map((tag) => ({
        label: tag.label,
        permalink: tag.permalink,
        count: tag.items.length,
      }));

      const tagsPropPath = await createData(
        `${utils.docuHash(`${blogTagsListPath}-tags`)}.json`,
        JSON.stringify(tagsProp, null, 2)
      );

      async function createTagsListPage() {
        addRoute({
          path: blogTagsListPath,
          component: "@theme/BlogTagsListPage",
          exact: true,
          modules: {
            tags: aliasedSource(tagsPropPath),
          },
        });
      }

      // Create routes for blog's paginated list entries.
      await Promise.all(
        blogListPaginated.map(async (listPage) => {
          const { metadata, items } = listPage;
          const { permalink } = metadata;

          const pageMetadataPath = await createData(
            `${utils.docuHash(permalink)}.json`,
            JSON.stringify(metadata, null, 2)
          );

          addRoute({
            path: permalink,
            component: "@theme/BlogListPage",
            exact: true,
            modules: {
              items: blogPostItemsModule(items),
              metadata: aliasedSource(pageMetadataPath),
              tags: tagsPropPath,
            },
          });
        })
      );

      authorsMap.map(async (author) => {
        const authorId = author.id;
        const authorPosts = allBlogPosts.filter((post) => {
          const authorIds = post.metadata.authors;

          return authorIds[0] === authorId;
        });

        const authorListPaginated = paginateBlogPosts({
          blogPosts: authorPosts,
          basePageUrl: "/blog/author/" + authorId,
          blogTitle,
          blogDescription,
          postsPerPageOption,
        });

        authorListPaginated.map((authorListPage) => {
          const { metadata, items } = authorListPage;
          const { permalink } = metadata;

          addRoute({
            path: permalink,
            component: "@site/src/components/AuthorPage",
            exact: true,
            modules: {
              items: blogPostItemsModule(items),
            },
          });
        });
      });

      // Tags. This is the last part so we early-return if there are no tags.
      if (Object.keys(blogTags).length === 0) {
        return;
      }

      async function createTagPostsListPage(tag) {
        await Promise.all(
          tag.pages.map(async (blogPaginated) => {
            const { metadata, items } = blogPaginated;

            const tagProp = {
              label: tag.label,
              permalink: tag.permalink,
              allTagsPath: blogTagsListPath,
              count: tag.items.length,
            };

            const tagPropPath = await createData(
              `${utils.docuHash(metadata.permalink)}.json`,
              JSON.stringify(tagProp, null, 2)
            );

            const listMetadataPath = await createData(
              `${utils.docuHash(metadata.permalink)}-list.json`,
              JSON.stringify(metadata, null, 2)
            );

            addRoute({
              path: metadata.permalink,
              component: "@theme/BlogTagsPostsPage",
              exact: true,
              modules: {
                items: blogPostItemsModule(items),
                tag: aliasedSource(tagPropPath),
                listMetadata: aliasedSource(listMetadataPath),
              },
            });
          })
        );
      }

      await createTagsListPage();
      await Promise.all(Object.values(blogTags).map(createTagPostsListPage));
    },
    postBuild: function () // Do we need this?
    {},
  };
}

module.exports = {
  ...blogPluginExports,
  default: blogPluginExtended,
};
