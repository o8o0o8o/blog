import React from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import styles from "./styles.module.css";

const CustomNavbarItem = ({ label, to }) => {
  const location = useLocation();

  return (
    <Link to={to} className={styles.navbarLink}>
      <div
        className={
          location.pathname.startsWith(to) ? styles.navbarLinkActive : ""
        }
      >
        {label}
      </div>
    </Link>
  );
};

export default CustomNavbarItem;
