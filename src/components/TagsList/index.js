import React from "react";
import styled from "@emotion/styled";
import { TagsRow } from "../TagsRow";

const TagsHolder = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const TagsList = () => {
  return (
    <section
      className="tag-section h-margin is-light js-scroll-header"
      id="tag-section"
      data-section="tag-section"
    >
      <TagsHolder className="container">
        <TagsRow tags={tags} />
      </TagsHolder>
    </section>
  );
};

export default TagsList;
