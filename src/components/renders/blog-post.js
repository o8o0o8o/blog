import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

import Layout from '../components/Layout/Layout';
import { MarkdownBlock, tags, Article } from './blog-post.styles';
import { Image } from './blog-post.components';
import Gist from '../components/Blog/Gist';
import { TagsRow } from '../components/App/TagsRow';
import Socials from '../components/Blog/Socials';
import Signatures from '../components/Blog/Signatures';
import ArticlesList from '../components/App/ArticlesList';

const components = {
  ...tags,
  /**
   * we can't simple override img tag because of issue in MDXRenderer
   */
  // img: Image,
  Gist,
  ImageBlock: Image,
};

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { authorIds, title, heroImage, tags } = post.frontmatter;
    const description = post.frontmatter.description || post.excerpt;

    return (
      <Layout
        location={this.props.location}
        siteTitle={siteTitle}
        postTitle={title}
        description={description}
        page="blog-post"
        darkHeader
        blogPost
        context={this.props.pageContext}
      >
        <Article className="article is-light js-scroll-header">
          <MarkdownBlock className="container" heroImage={heroImage}>
            <h1 className="article__title">{title}</h1>
            <p className="article__short-desc">{description}</p>
          </MarkdownBlock>
          <Socials authorIds={authorIds} />
          <MarkdownBlock className="container" heroImage={heroImage}>
            {heroImage ? (
              <img className="hero-image" src={heroImage} alt={title} />
            ) : null}
            <MDXProvider components={components}>
              <MDXRenderer>{post.body}</MDXRenderer>
            </MDXProvider>
          </MarkdownBlock>
          <div className="tags">
            <TagsRow tags={tags} noLinks />
          </div>
        </Article>
        <Signatures authorIds={authorIds} />
        <ArticlesList postTags={tags} short excludeIds={[post.id]} />
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        heroImage
        authorIds
        tags
      }
    }
  }
`;
