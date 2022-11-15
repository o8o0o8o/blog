import React from "react";
import Layout from "@theme/Layout";

export default function BlogLayout(props) {
  const { children, ...layoutProps } = props;

  return (
    <Layout {...layoutProps}>
      <main itemScope itemType="http://schema.org/Blog" className="main">
        {children}
      </main>
    </Layout>
  );
}
