import React from "react";
import {
  BlogPostProvider,
  useBlogPost, // @ts-ignore
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
import type { Author, RelatedPosts } from "@site/src/types";

function BlogPostPageContent({ children }) {
  const { metadata } = useBlogPost();

  type ExtendedMetadata = typeof metadata & {
    relatedPosts: RelatedPosts;
    authorsMap: Author[];
  };

  const {
    title,
    description,
    tags,
    frontMatter,
    relatedPosts,
    permalink,
    authorsMap,
  } = metadata as unknown as ExtendedMetadata;
  const heroImage = (frontMatter.image || frontMatter.heroImage) as string;
  const authorIds = frontMatter.authorIds;

  return (
    <BlogLayout>
      <Article className={styles.article}>
        <MarkdownBlock
          className={styles.article__container}
          heroImage={heroImage}
        >
          <h1 className={styles.article__title}>{title}</h1>
          <p className="article__short-desc">{description}</p>
        </MarkdownBlock>
        <Socials authorIds={authorIds} authorsMap={authorsMap} />
        <MarkdownBlock
          className={styles.article__container}
          heroImage={heroImage}
        >
          {heroImage ? (
            <img className="hero-image" src={heroImage} alt={title} />
          ) : null}
          <BlogPostItem>{children}</BlogPostItem>
        </MarkdownBlock>

        <div className={styles.article__tags}>
          <TagsRow tags={tags} noLinks={false} />
        </div>
      </Article>

      <Signatures authorsMap={authorsMap} authorIds={authorIds} />
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