import React from "react";
import styles from "./styles.module.css";
import styled from "@emotion/styled";

export const Article = styled.article`
  overflow: hidden;
`;

export const MarkdownBlock = ({ children, heroImage, title, description }) => (
  <div>
    <h1 className={styles.article__title}>{title}</h1>
    <p className={styles.article__shortdesc}>{description}</p>
    {children}
    <img src={heroImage} />
    {/* <h3 className={styles.article__title__content}>{title}</h3> */}
  </div>
);
