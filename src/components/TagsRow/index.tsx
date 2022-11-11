import React from "react";
import styled from "@emotion/styled";
import Link from "@docusaurus/Link";

type TagProp = {
  isLink: boolean;
};

export const Tag = styled.span<TagProp>`
  margin-right: 9px;
  text-decoration: none;
  color: #13cf2e;
  :last-of-type {
    margin-right: 0;
  }
  ${({ isLink }) =>
    isLink
      ? `
  :hover {
    text-decoration: underline;
  }
  `
      : ""}
`;

export const TagsRow = ({ tags, noLinks }) => {
  return tags.map((tag) => {
    const hashtag = `#${tag.label}`;

    if (noLinks)
      return (
        <Tag key={hashtag} isLink={false}>
          {hashtag}
        </Tag>
      );

    return (
      <Tag key={hashtag} isLink={true}>
        <Link to={tag.permalink}>{hashtag}</Link>
      </Tag>
    );
  });
};
