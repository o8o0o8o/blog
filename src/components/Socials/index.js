import React from "react";
import styled from "@emotion/styled";

const getAuthors = (allAuthors, authorIds) => {
  const selected = authorIds
    .map((authorId) =>
      allAuthors.find((author) => author.authorId === authorId)
    )
    .filter(Boolean);
  return selected;
};

const Avatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const Author = ({ name, authorId, photo }) => (
  <div className="author">
    <div className="author__img-wrap">
      <Avatar src={`/img/team/${photo}`} alt={name} />
    </div>
    <div className="author__desc">
      <p className="author__name">{name}</p>
      <p className="author__company">{`@${authorId}`}</p>
    </div>
  </div>
);

const data = {
  users: { edges: [] },
};

const Socials = ({ authorIds }) => {
  const allAuthors = data.users.edges.map(({ node }) => ({ ...node }));
  const postAuthors = getAuthors(allAuthors, authorIds);

  return (
    <div className="article-info">
      <div className="article-info__socials">
        <a href="https://twitter.com/FocusReactive">
          <img src="/icons/twitter.svg" alt="Twitter" />
        </a>
        <a href="https://www.facebook.com/focusreactive/">
          <img src="/icons/facebook.svg" alt="Facebook" />
        </a>
      </div>
      <div className="article-info__authors">
        {/* {postAuthors.map((author) => (
          <Author {...author} key={author.authorId} />
        ))} */}
        <Author authorId="UsulPro" name="Oleg Proskurin" photo="oleg.jpg" />
      </div>
    </div>
  );
};

Socials.defaultProps = {
  authorIds: [],
};

export default Socials;
