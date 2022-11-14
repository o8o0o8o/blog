import React from "react";
import styled from "@emotion/styled";
import { TagsRow } from "../TagsRow";
import { BlogApiTag } from "@site/src/types";

const TagsHolder = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  text-transform: uppercase;
  font-weight: bold;
  padding: 32px 0;
`;

type TagsListProps = {
  tags: BlogApiTag[];
};

const TagsList = ({ tags }: TagsListProps) => {
  return (
    <section
      className="tag-section h-margin is-light js-scroll-header"
      id="tag-section"
      data-section="tag-section"
    >
      <TagsHolder className="container">
        <TagsRow tags={tags} noLinks={false} />
      </TagsHolder>
    </section>
  );
};

export default TagsList;
