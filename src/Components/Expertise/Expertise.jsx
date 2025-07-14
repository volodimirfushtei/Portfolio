import React from "react";
import { motion } from "framer-motion";
import styles from "./Expertise.module.css";
import CardTech from "../CardTech/CardTech";
import ExperienceTable from "../ExperienceTable/ExperienceTable";

const Expertise = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className={styles.expertise} id="expertise">
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={sectionVariants}
      >
        {/* Technical Skills Section */}
        <motion.div className={styles.section} variants={itemVariants}>
          <CardTech />
        </motion.div>

        {/* Experience Section */}
        <motion.div className={styles.section} variants={itemVariants}>
          <ExperienceTable />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Expertise;
