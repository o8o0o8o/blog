import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import { TagsRow } from "../TagsRow";
import type { BlogApiRelatedPosts, BlogApiTag } from "@site/src/types";

interface ArticleItemProps {
  tags: BlogApiTag[];
  title: string;
  permalink: string;
  description?: string;
}

const ArticleItem = ({
  tags,
  title,
  permalink,
  description,
}: ArticleItemProps) => {
  return (
    <li className={styles["articles-list__item"]}>
      <Link className={styles["articles-list__link"]} to={permalink}>
        <div className="container">
          <h3 className={styles["articles-list__title"]}>{title}</h3>
          {description && <p className="articles-list__desc">{description}</p>}
          <div className="articles-list__tags">
            <TagsRow tags={tags} noLinks />
          </div>
        </div>
      </Link>
    </li>
  );
};

interface ArticlesListProps {
  posts: BlogApiRelatedPosts[];
  excludeLinks?: string[];
}

export const ArticlesList = ({
  posts,
  excludeLinks = [],
}: ArticlesListProps) => {
  if (posts.length < 1) {
    return null;
  }
  const articlesList = posts.filter(
    (node) => !excludeLinks.includes(node.permalink)
  );

  return (
    <div className={styles["articles-list"]}>
      <ul className={styles["articles-list__list"]}>
        {articlesList.map((node) => {
          return <ArticleItem key={node.permalink} {...node} />;
        })}
      </ul>
    </div>
  );
};
