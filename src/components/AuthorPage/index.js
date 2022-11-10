import React from "react";
import BlogLayout from "@theme/BlogLayout";

import { ArticlesList } from "../ArticlesList";

const AuthorPage = (props) => {
  const { items } = props;

  const posts = items.map((item) => ({
    tags: item.content.metadata.tags,
    title: item.content.metadata.title,
    permalink: item.content.metadata.permalink,
    description: item.content.metadata.description,
  }));
  const author = items[0].content.metadata.authors[0];

  return (
    <>
      <BlogLayout>
        <ArticlesList posts={posts} />
      </BlogLayout>
    </>
  );
};

export default AuthorPage;