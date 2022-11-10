import React from "react";

import Author from "../Author";

const getAuthors = (allAuthors, authorIds) => {
  const selected = authorIds
    .map((authorId) =>
      allAuthors.find((author) => author.authorId === authorId)
    )
    .filter(Boolean);
  return selected;
};

const Socials = ({ authorIds, authorsMap }) => {
  const postAuthors = getAuthors(authorsMap, authorIds);

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
        {postAuthors.map((author) => (
          <Author {...author} key={author.authorId} />
        ))}
      </div>
    </div>
  );
};

Socials.defaultProps = {
  authorIds: [],
  authorsMap: [],
};

export default Socials;
