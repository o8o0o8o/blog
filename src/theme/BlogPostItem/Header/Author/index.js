import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
function MaybeLink(props) {
  if (props.href) {
    return <Link {...props} />;
  }
  return <>{props.children}</>;
}
export default function BlogPostItemHeaderAuthor({ author, className }) {
  const { name, title, url, imageURL, email } = author;
  const link = url || (email && `mailto:${email}`) || undefined;

  return null;
}
