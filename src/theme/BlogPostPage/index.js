import React from "react";
import {
  BlogPostProvider,
  useBlogPost,
} from "@docusaurus/theme-common/internal";
import BlogLayout from "@theme/BlogLayout";
import BlogPostItem from "@theme/BlogPostItem";

import Socials from "../../components/Socials";
import { MarkdownBlock } from "../../components/MarkdownBlock";
import Signatures from "../../components/Signatures";
import { PostPaginator } from "../../components/PostPaginator";

function BlogPostPageContent({ children }) {
  const { metadata } = useBlogPost();
  const { title, description, tags, frontMatter, relatedPosts, permalink } =
    metadata;

  return (
    <BlogLayout>
      <MarkdownBlock
        className="container"
        heroImage={frontMatter.image || frontMatter.heroImage}
        title={title}
        description={description}
      >
        <Socials authorIds={frontMatter.authorIds} />
      </MarkdownBlock>
      <BlogPostItem>{children}</BlogPostItem>
      <Signatures />
      <PostPaginator posts={relatedPosts} excludeLinks={permalink} />
    </BlogLayout>
  );
}
export default function BlogPostPage(props) {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <BlogPostPageContent>
        <BlogPostContent />
      </BlogPostPageContent>
    </BlogPostProvider>
  );
}
