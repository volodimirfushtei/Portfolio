import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./ExperienceTable.module.css";

const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = value;
      const increment = 1;
      const intervalTime = duration / steps;

      let start = 0;
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, intervalTime);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={styles.counter}
    >
      {count}
      {suffix && <span className={styles.suffix}>{suffix}</span>}
    </motion.span>
  );
};

const ExperienceTable = () => {
  const stats = [
    { value: 1, label: "Years Experience", suffix: "+" },
    { value: 5, label: "Projects Completed", suffix: "+" },
    { value: 3, label: "Happy Clients", suffix: "+" },
    { value: 10, label: "Technologies", suffix: "+" },
    { value: 2, label: "Languages", suffix: "+" },
    { value: 1, label: "Certifications", suffix: "+" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.value}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className={styles.label}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceTable;
