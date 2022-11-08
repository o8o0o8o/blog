import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import { TagsRow } from "../TagsRow";

const ArticleItem = ({ tags, title, permalink }) => {
  return (
    <li className={styles["articles-list__item"]}>
      <Link className={styles["articles-list__link"]} to={permalink} inner>
        <div className="container">
          <h3 className={styles["articles-list__title"]}>{title}</h3>
          <div className="articles-list__tags">
            <TagsRow tags={tags} noLinks />
          </div>
        </div>
      </Link>
    </li>
  );
};

export const ArticlesList = ({ posts, title, excludeLinks }) => {
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
