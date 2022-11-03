import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

const SocialLink = ({ label, to }) => {
  return (
    <Link to={to} className={styles.social}>
      <img className={styles.icon} alt={label} src={`/icons/${label}.svg`} />
    </Link>
  );
};

export default SocialLink;
