import React, { useEffect } from "react";
import {
  motion as Motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import styles from "./ExperienceTable.module.css";

const Counter = ({ from = 0, to, duration = 2 }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: [0.16, 1, 0.3, 1], // Spring-like easing
      delay: 0.5,
    });
    return controls.stop;
  }, [count, to, duration]);

  return (
    <Motion.span
      className={styles.counterNumber}
      style={{
        background: `linear-gradient(135deg, #8a63ff, #63b3ff)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {rounded}
    </Motion.span>
  );
};

const ExperienceItem = ({ label, value, duration }) => (
  <div className={styles.experienceItem}>
    <Counter to={value} duration={duration} />
    <div className={styles.experienceLabel}>{label}</div>
    <div className={styles.experienceDivider} />
  </div>
);

const ExperienceTable = () => {
  return (
    <Motion.div
      className={styles.experienceContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={styles.experienceCard}>
        <h3 className={styles.cardTitle}>Professional Journey</h3>

        <div className={styles.experienceGrid}>
          <ExperienceItem label="Years" value={1} duration={1.5} />
          <ExperienceItem label="Clients" value={3} duration={1.5} />
          <ExperienceItem label="Team Projects" value={3} duration={2} />
          <ExperienceItem label="Total Projects" value={5} duration={2.5} />
        </div>
      </div>
    </Motion.div>
  );
};

export default ExperienceTable;
