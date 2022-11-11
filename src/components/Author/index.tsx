import React from "react";
import styled from "@emotion/styled";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.css";

type AvatarProps = {
  avatarSize: "small" | "big";
};

const Avatar = styled.img<AvatarProps>`
  ${({ avatarSize }) =>
    avatarSize === "big"
      ? "width: 80px; height 80px;"
      : "width: 45px; height 45px;"}
  border-radius: 50%;
`;

const Author = ({ name, authorId, photo, avatarSize, isItSignature }) => (
  <div className={styles.author}>
    <div className={styles["author__img-wrap"]}>
      <Avatar
        src={`/images/team/${photo}`}
        alt={name}
        avatarSize={avatarSize}
      />
    </div>
    <div className={styles.author__desc}>
      <Link to={`/blog/author/${authorId}`}>
        <p
          className={
            isItSignature
              ? clsx(styles.author__name, styles.author__name__signature)
              : styles.author__name
          }
        >
          {name}
        </p>
      </Link>
      <p
        className={
          isItSignature
            ? clsx(styles.author__company, styles.author__company__signature)
            : styles.author__company
        }
      >{`@${authorId}`}</p>
    </div>
  </div>
);

export default Author;
