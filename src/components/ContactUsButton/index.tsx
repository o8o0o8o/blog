import Link from "@docusaurus/Link";
import React from "react";
import styles from "./styles.module.css";

type ContactUsButtonProps = {
  to: string;
  label: string;
};

const ContactUsButton = ({ label, to }: ContactUsButtonProps) => {
  return (
    <Link to={to} className={styles["menu__item-button"]}>
      {label}
    </Link>
  );
};

export default ContactUsButton;
