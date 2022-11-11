import React from "react";
import styled from "@emotion/styled";
import Link from "@docusaurus/Link";

export const Tag = (isLink) => (isLink ? styled.a : styled.span)`
  margin-right: 9px;
  text-decoration: none;
  color: #13cf2e;
  :last-of-type {
    margin-right: 0;
  }
  ${
    isLink
      ? `
  :hover {
    text-decoration: underline;
  }
  `
      : ""
  }

`;

export const TagsRow = ({ tags, noLinks }) => {
  return tags.map((tag) => {
    const hashtag = `#${tag.label}`;
    const Wrapper = Tag(!noLinks);
    return (
      <>
        {noLinks ? (
          <Wrapper key={hashtag}>{hashtag}</Wrapper>
        ) : (
          <Wrapper key={hashtag}>
            <Link to={tag.permalink}>{hashtag}</Link>
          </Wrapper>
        )}
      </>
    );
  });
};
