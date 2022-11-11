import React from "react";
import styled from "@emotion/styled";
import Link from "@docusaurus/Link";

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

const Author = ({ name, authorId, photo, avatarSize }) => (
  <div className="author">
    <div className="author__img-wrap">
      <Avatar
        src={`/images/team/${photo}`}
        alt={name}
        avatarSize={avatarSize}
      />
    </div>
    <div className="author__desc">
      <Link to={`/blog/author/${authorId}`}>
        <p className="author__name">{name}</p>
      </Link>
      <p className="author__company">{`@${authorId}`}</p>
    </div>
  </div>
);

export default Author;
