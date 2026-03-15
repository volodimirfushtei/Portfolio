import React, { useState, useEffect } from "react";
import styles from "./SectionBadge.module.css";

const SectionBadge = ({ children }) => {
  return <div className={styles.sectionBadge}>{children}</div>;
};

export default SectionBadge;
