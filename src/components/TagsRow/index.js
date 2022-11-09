import React from 'react';
import styled from '@emotion/styled';

export const Tag = isLink => (isLink ? styled.a : styled.span)`
  margin-right: 9px;
  text-decoration: none;
  color: #13cf2e;
  :last-of-type {
    margin-right: 0;
  }
  ${isLink ? `
  :hover {
    text-decoration: underline;
  }
  ` : ''}

`;

export const TagsRow = ({ tags, onClick, noLinks }) => {
  return tags.map(tag => {
    const hashtag = `#${tag}`;
    const Wrapper = Tag(!noLinks)
    return (
      <Wrapper href={hashtag} key={hashtag} onClick={() => onClick(tag)}>
        {hashtag}
      </Wrapper>
    );
  });
};
