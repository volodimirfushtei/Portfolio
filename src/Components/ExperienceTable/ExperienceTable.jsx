import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./ExperienceTable.module.css";
import FadeInAnimate from "./../FadeInAnimate/FadeInAnimate";
import Particles from "react-tsparticles";
const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      const duration = 4000;
      const steps = 10;
      const increment = Math.ceil(value / steps);
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
  }, [inView, value]); // Залежність від inView

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {count}
      {suffix && <span className={styles.suffix}>{suffix}</span>}
    </motion.span>
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
      <div
        className={`${styles.card}`}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
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
