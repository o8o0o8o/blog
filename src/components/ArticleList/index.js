import React from "react";
import clsx from "clsx";

import Link from "@docusaurus/Link";
import { TagsRow } from "../TagsRow";
import { Store } from "../../../store";

const ArticleItem = ({ frontmatter, fields }) => {
  const { title, description, tags } = frontmatter;
  const { slug } = fields;
  const finalTitle = title || slug;
  return (
    <li className="articles-list__item">
      <Link
        className="articles-list__link"
        to={`/${slug.replace(/^\//, "")}`}
        inner
      >
        <div className="container">
          <h3 className="articles-list__title">{finalTitle}</h3>
          <p className="articles-list__desc">{description}</p>
          <div className="articles-list__tags">
            <TagsRow tags={tags} noLinks />
          </div>
        </div>
      </Link>
    </li>
  );
};

const ArticlesList = ({ postTags, short, excludeIds }) => {
  const result = {
    edges: [
      {
        node: {
          id: "skdfkksd",
          fields: { slug: "/blog/contentfull-part2" },
          frontmatter: {
            tags: [
              "Storybook",
              "Addon",
              "DX",
              "storybook-addon",
              "decorator",
              "console",
            ],
          },
        },
      },
    ],
  };

  const articlesList = result.edges.filter(
    ({ node: { id } }) => !excludeIds.includes(id)
  );

  // const { tags } = React.useContext(Store);
  const tagsToShow = postTags; //|| tags;
  const byTags = tagsToShow.length
    ? ({ node }) => {
        const matchingTags = node.frontmatter.tags
          .map((tg) => tagsToShow.includes(tg))
          .filter(Boolean);
        return !!matchingTags.length;
      }
    : () => true;

  return (
    <section
      id="articles"
      data-section="articles"
      className="articles is-light js-scroll-header"
    >
      <div className="articles__inner">
        <ul className={clsx("articles-list", { short })}>
          {articlesList.map(({ node }) => {
            return <ArticleItem key={node.fields.slug} {...node} />;
          })}
        </ul>
      </div>
    </section>
  );
};

ArticlesList.defaultProps = {
  postTags: undefined,
  short: false,
  excludeIds: [],
};

export default ArticlesList;
