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

const Container = styled.div`
  max-width: 620px;
  margin: 0px auto 60px;
  border-top: rgb(235, 235, 235) solid 1px;
  padding-top: 9px;
  h4 {
    color: rgba(0, 0, 0, 0.54);
    font-weight: 300;
  }
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const AuthorBlock = styled.div`
  font-size: 14px;
  line-height: 1.72;
  max-width: 620px;
  margin: 8px auto 0;
  .author__desc {
    .author__name {
      font-size: 28px;
      font-weight: 600px;
    }
    .author__company {
      font-size: 18px;
      font-weight: 300px;
    }
  }
`;

const Author = ({ name, authorId, photo }) => (
  <div className="author">
    <div className="author__img-wrap">
      <Avatar src={`/images/team/${photo}`} alt={name} />
    </div>
    <div className="author__desc">
      <p className="author__name">{name}</p>
      <p className="author__company">{`@${authorId}`}</p>
    </div>
  </div>
);

const data = {
  authors: { edges: [] },
};

const Signatures = ({ authorIds, authorsMap }) => {
  const postAuthors = getAuthors(authorsMap, authorIds);

  return (
    <Container>
      <h4>WRITTEN BY</h4>
      {postAuthors.map((author) => (
        <AuthorBlock key={author.authorId}>
          <Author {...author} />
        </AuthorBlock>
      ))}
    </Container>
  );
};

export default Signatures;
