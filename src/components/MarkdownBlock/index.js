import React from "react";
import styles from "./styles.module.css";

export const MarkdownBlock = ({ children, heroImage, title, description }) => (
  <>
    <h1 className={styles.article__title}>{title}</h1>
    <p className={styles.article__shortdesc}>{description}</p>
    {children}
    <img src={heroImage} />
    {/* <h3 className={styles.article__title__content}>{title}</h3> */}
  </>
);
