import React, { useState, useEffect } from "react";
import styles from "./SectionBadge.module.css";

const SectionBadge = ({ children }) => {
  return (
    <div ref={cornerRef} className={styles.cornerBadge} aria-hidden="true">
      <span className={styles.cornerBadgeNum}>01</span>
      <span className={styles.cornerBadgeLabel}>Hero</span>
    </div>
  );
};

export default SectionBadge;
