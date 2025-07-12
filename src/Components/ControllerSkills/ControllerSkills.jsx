import React from "react";
import { motion } from "framer-motion";
import styles from "./ControllerSkills.module.css";

const techItems = [
  { name: "React", icon: "ri-reactjs-line" },
  { name: "TypeScript", icon: "ri-typescript-line" },
  { name: "Node.js", icon: "ri-nodejs-line" },
  { name: "Figma", icon: "ri-pencil-ruler-line" },
  { name: "MongoDB", icon: "ri-database-2-line" },
  { name: "Tailwind", icon: "ri-css3-line" },
];

const ControllerSkills = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Technologies I Work With</h3>
        <p>My daily toolkit for building amazing products</p>
      </div>

      <div className={styles.sliderContainer}>
        <motion.div
          className={styles.sliderTrack}
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...techItems, ...techItems].map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              className={styles.techCard}
              whileHover={{ scale: 1.05 }}
            >
              <i className={tech.icon}></i>
              <span>{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ControllerSkills;
