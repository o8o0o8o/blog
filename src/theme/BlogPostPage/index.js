import React from "react";
import clsx from "clsx";
import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import {
  BlogPostProvider,
  useBlogPost,
} from "@docusaurus/theme-common/internal";
import BlogLayout from "@theme/BlogLayout";
import BlogPostItem from "@theme/BlogPostItem";
import BlogPostPaginator from "@theme/BlogPostPaginator";
import BlogPostPageMetadata from "@theme/BlogPostPage/Metadata";
import TOC from "@theme/TOC";
import Socials from "../../components/Socials";
import { MarkdownBlock } from "../../components/MarkdownBlock";
import Signatures from "../../components/Signatures";
import ArticleList from "../../components/ArticleList";
function BlogPostPageContent({ sidebar, children }) {
  const { metadata, toc } = useBlogPost();
  const {
    title,
    description,
    date,
    tags,
    authors,
    frontMatter,
    nextItem,
    prevItem,
  } = metadata;

  const {
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = frontMatter;
  return (
    <BlogLayout
      sidebar={sidebar}
      toc={
        !hideTableOfContents && toc.length > 0 ? (
          <TOC
            toc={toc}
            minHeadingLevel={tocMinHeadingLevel}
            maxHeadingLevel={tocMaxHeadingLevel}
          />
        ) : undefined
      }
    >
      <MarkdownBlock
        className="container"
        heroImage={frontMatter.image}
        title={title}
      >
        <h1 className="article__title">{title}</h1>
        <p className="article__short-desc">{description}</p>
        <Socials />
      </MarkdownBlock>
      <BlogPostItem>{children}</BlogPostItem> <Signatures />
      <ArticleList postTags={tags} short excludeIds={title} />
      {(nextItem || prevItem) && (
        <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
      )}
    </BlogLayout>
  );
}
export default function BlogPostPage(props) {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage
        )}
      >
        <BlogPostPageMetadata />
        <BlogPostPageContent sidebar={props.sidebar}>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
