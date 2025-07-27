import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import styles from "./Expertise.module.css";
import CardTech from "../CardTech/CardTech";
import ExperienceTable from "../ExperienceTable/ExperienceTable";

const Expertise = () => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.3,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    },
  };

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <section
      id="expertise"
      className={`${styles.expertise} glass-effect `}
      ref={ref}
    >
      <motion.div
        className={styles.background}
        style={{
          scale,
          y: yBg,
          opacity,
        }}
      />

      <motion.div
        className={`${styles.container} `}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <motion.div className={styles.section} variants={itemVariants}>
          <CardTech />
        </motion.div>

        <motion.div className={styles.section} variants={itemVariants}>
          <ExperienceTable />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Expertise;
