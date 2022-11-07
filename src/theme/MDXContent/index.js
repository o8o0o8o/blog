import React from "react";
import { MDXProvider } from "@mdx-js/react";
import MDXComponents from "@theme/MDXComponents";
// import { useBlogPost } from "@docusaurus/theme-common/internal";
// // import sklndksl from "@docusaurus/plugin-content-blog/src/";
import { Image } from "../../components/Image";
import Gist from "../../components/Gist";
import Socials from "../../components/Socials";
import { MarkdownBlock } from "../../components/MarkdownBlock";
import Signatures from "../../components/Signatures";
import ArticleList from "../../components/ArticleList";

const components = {
  ...MDXComponents,
  Gist,
  ImageBlock: Image,
};

export default function MDXContent({ children }) {
  // const { assets, metadata } = useBlogPost();
  // const { title, description, date, tags, authors, frontMatter } = metadata;
  // console.log(getBlogTags );

  const title = "Storybook Addon Console";
  const frontMatter = { image: "/img/hero/storybook-console-hero.png" };
  const description =
    "There're some cases when you can't / don't want / forgot to keep browser console opened. Storybook Addon Console helps you to get all console output in Storybook actions panel when you're developing your App Components.";
  const tags = [
    "Storybook",
    "Addon",
    "DX",
    "storybook-addon",
    "decorator",
    "console",
  ];
  return (
    <>
      <MarkdownBlock
        className="container"
        heroImage={frontMatter.image}
        title={title}
      >
        <h1 className="article__title">{title}</h1>
        <p className="article__short-desc">{description}</p>
        <Socials />
      </MarkdownBlock>

      <MDXProvider components={components}>{children}</MDXProvider>
      <Signatures />
      <ArticleList postTags={tags} short excludeIds={title} />
    </>
  );
}
