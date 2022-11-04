import React from "react";
import { MDXProvider } from "@mdx-js/react";
import MDXComponents from "@theme/MDXComponents";
import { Image } from "../../components/Image";
import Gist from "../../components/Gist";

const components = {
  ...MDXComponents,
  Gist,
  ImageBlock: Image,
};

export default function MDXContent({ children }) {
  console.log(children);

  return <MDXProvider components={components}>{children}</MDXProvider>;
}
