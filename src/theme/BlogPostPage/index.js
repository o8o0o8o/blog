import React from "react";
import {
  BlogPostProvider,
  useBlogPost,
} from "@docusaurus/theme-common/internal";
import BlogLayout from "@theme/BlogLayout";
import BlogPostItem from "@theme/BlogPostItem";

import Socials from "../../components/Socials";
import {
  Article,
  MarkdownBlock,
} from "../../components/renders/blog-post.styles";
import Signatures from "../../components/Signatures";
import { ArticlesList } from "../../components/ArticlesList";
import styles from "./styles.module.css";
import { TagsRow } from "../../components/TagsRow";

function BlogPostPageContent({ children }) {
  const { metadata } = useBlogPost();
  const { title, description, tags, frontMatter, relatedPosts, permalink } =
    metadata;
  const heroImage = frontMatter.image || frontMatter.heroImage;

  return (
    <BlogLayout>
      <Article className={styles.article}>
        <MarkdownBlock className="container" heroImage={heroImage}>
          <h1 className="article__title">{title}</h1>
          <p className="article__short-desc">{description}</p>
        </MarkdownBlock>
        <Socials authorIds={frontMatter.authorIds} />
        <MarkdownBlock className="container" heroImage={heroImage}>
          {heroImage ? (
            <img className="hero-image" src={heroImage} alt={title} />
          ) : null}
        </MarkdownBlock>
        <BlogPostItem>{children}</BlogPostItem>
        <div className={styles.article__tags}>
          <TagsRow tags={tags.map((tag) => tag.label)} noLinks />
        </div>
      </Article>
      <Signatures />
      <ArticlesList posts={relatedPosts} excludeLinks={permalink} />
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
