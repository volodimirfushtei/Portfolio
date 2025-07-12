import React, { useState } from "react";
import styles from "./CardTech.module.css";

const CardTech = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={styles.front}>
        <div className={styles.header}>
          <span className={styles.badge}>Featured</span>
          <h3>My Expertise</h3>
        </div>

        <ul className={styles.skillsList}>
          {["React", "Node.js", "TypeScript", "UI/UX"].map((skill, i) => (
            <li key={i} className={styles.skillItem}>
              <span className={styles.checkIcon}>✓</span>
              {skill}
            </li>
          ))}
        </ul>

        <div className={styles.hint}>Click to flip</div>
      </div>

      <div className={styles.back}>
        <h3>Technical Stack</h3>

        <div className={styles.techGrid}>
          {["React", "Node", "TS", "MongoDB", "Express", "Figma"].map(
            (tech, i) => (
              <div key={i} className={styles.techPill}>
                {tech}
              </div>
            )
          )}
        </div>

        <button className={styles.ctaButton}>View Full Stack</button>
      </div>
    </div>
  );
};

export default CardTech;
