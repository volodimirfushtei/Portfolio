import React from "react";
import { motion } from "framer-motion";
import styles from "./ExperienceTable.module.css";

const ExperienceTable = () => {
  const stats = [
    { value: 5, label: "Years Experience", suffix: "+" },
    { value: 30, label: "Projects Completed", suffix: "+" },
    { value: 15, label: "Happy Clients", suffix: "+" },
    { value: 10, label: "Technologies", suffix: "+" },
  ];

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className={styles.card}
      >
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
      </motion.div>
    </div>
  );
};

export default ExperienceTable;
