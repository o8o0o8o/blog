import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import { TagsRow } from "../TagsRow";

const ArticleItem = ({ tags, title, permalink }) => {
  return (
    <ul>
      <li className={styles.articlesList__item}>
        <Link className="articles-list__link" to={permalink} inner>
          <div className="container">
            <h3 className="articles-list__title">{title}</h3>
            <div className="articles-list__tags">
              <TagsRow tags={tags} noLinks />
            </div>
          </div>
        </Link>
      </li>
    </ul>
  );
};

export const PostPaginator = ({ posts, title, excludeLinks }) => {
  if (posts.length < 1) {
    return null;
  }
  const articlesList = posts.filter(
    (node) => !excludeLinks.includes(node.permalink)
  );

  return (
    <>
      {articlesList.map((node) => {
        return <ArticleItem key={node.permalink} {...node} />;
      })}
    </>
  );
};
