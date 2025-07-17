import React from "react";
import { motion } from "framer-motion";
import styles from "./ControllerSkills.module.css";

const techItems = [
  {
    name: "React",
    icon: "ri-reactjs-line",
    color: "#61dafb",
    description: "UI library",
  },
  {
    name: "TypeScript",
    icon: "ri-typescript-line",
    color: "#3178c6",
    description: "Typed JS",
  },
  {
    name: "Node.js",
    icon: "ri-nodejs-line",
    color: "#68a063",
    description: "Server runtime",
  },
  {
    name: "Figma",
    icon: "ri-pencil-ruler-line",
    color: "#a259ff",
    description: "Design tool",
  },
  {
    name: "MongoDB",
    icon: "ri-database-2-line",
    color: "#47a248",
    description: "NoSQL DB",
  },
  {
    name: "Tailwind",
    icon: "ri-css3-line",
    color: "#38bdf8",
    description: "Utility CSS",
  },
  {
    name: "Git",
    icon: "ri-git-branch-line",
    color: "#f1502f",
    description: "Version control",
  },
];

const ControllerSkills = () => {
  return (
    <div className={`${styles.container}`}>
      <div className={styles.header}>
        <h3>Coding process and tools at:</h3>
      </div>

      <div className={styles.sliderContainer}>
        <motion.div
          className={styles.sliderTrack}
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...techItems, ...techItems].map((tech, index) => (
            <div key={`${tech.name}-${index}`} className={styles.flipCard}>
              <div className={styles.flipInner}>
                {/* Front */}
                <div className={styles.flipFront}>
                  <i
                    className={`${tech.icon} ${styles.icon}`}
                    style={{ color: tech.color }}
                  ></i>
                  <span>{tech.name}</span>
                </div>
                {/* Back */}
                <div className={styles.flipBack}>
                  <p style={{ color: tech.color }}>{tech.description}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ControllerSkills;
