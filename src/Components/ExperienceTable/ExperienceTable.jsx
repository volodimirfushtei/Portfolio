import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./ExperienceTable.module.css";

const FadeInAnimate = ({
  children,
  direction = "left",
  delay = 0.4,
  duration = 1.6,
  triggerOnce = false,
  threshold = 0.2,
  distance = 200,
}) => {
  const { ref, inView } = useInView({ triggerOnce, threshold });

  const variants = {
    hidden: {
      opacity: 0,
      x:
        direction === "left" ? -distance : direction === "right" ? distance : 0,
      y:
        direction === "top" ? -distance : direction === "bottom" ? distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

const ExperienceTable = () => {
  const stats = [
    { value: 5, label: "Years Experience", suffix: "+" },
    { value: 30, label: "Projects Completed", suffix: "+" },
    { value: 15, label: "Happy Clients", suffix: "+" },
    { value: 10, label: "Technologies", suffix: "+" },
    { value: 2, label: "Languages", suffix: "+" },
    { value: 3, label: "Certifications", suffix: "+" },
  ];

  return (
    <div className={styles.container}>
      <FadeInAnimate direction="bottom" delay={0.2}>
        <div className={styles.card}>
          <h3 className={styles.title}>Professional Milestones</h3>
          <div className={styles.grid}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={styles.statItem}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={styles.value}>
                  {stat.value}
                  <span className={styles.suffix}>{stat.suffix}</span>
                </div>
                <div className={styles.label}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInAnimate>
    </div>
  );
};

export default ExperienceTable;
