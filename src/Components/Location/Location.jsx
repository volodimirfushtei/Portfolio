import { useState } from "react";
import styles from "./Location.module.css";

export default function LocationBadge({
  location = "Ukraine, Ivano-Frankivsk",
}) {
  return (
    <div className={styles.badge} aria-label={`Location: ${location}`}>
      {/* Pin */}
      <div className={styles.pinWrap} aria-hidden="true">
        <div className={styles.pin}>
          <div className={styles.pinInner} />
        </div>
        <div className={styles.ripple} />
        <div className={styles.ripple2} />
      </div>

      {/* Text */}
      <span className={styles.text}>{location}</span>
    </div>
  );
}
