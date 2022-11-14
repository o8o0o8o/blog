import React from "react";
import Author from "../Author";
import styles from "./styles.module.css";
import { BlogApiAuthor } from "@site/src/types";

const getAuthors = (allAuthors: BlogApiAuthor[], authorIds: string[]) => {
  const selected = authorIds
    .map((authorId) =>
      allAuthors.find((author) => author.authorId === authorId)
    )
    .filter(Boolean);
  return selected;
};

type SocialsProps = {
  authorIds: [];
  authorsMap: [];
};

const Socials = ({ authorIds, authorsMap }: SocialsProps) => {
  const postAuthors = getAuthors(authorsMap, authorIds);

  return (
    <div className={styles["article-info"]}>
      <div className={styles["article-info__socials"]}>
        <a href="https://twitter.com/FocusReactive">
          <img src="/icons/twitter.svg" alt="Twitter" />
        </a>
        <a href="https://www.facebook.com/focusreactive/">
          <img src="/icons/facebook.svg" alt="Facebook" />
        </a>
      </div>
      <div className={styles["article-info__authors"]}>
        {postAuthors.map((author) => (
          <Author {...author} key={author.authorId} />
        ))}
      </div>
    </div>
  );
};

export default Socials;
