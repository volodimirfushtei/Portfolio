import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import styles from "./TechPage.module.css";

const tech = [
  {
    name: "React.js",
    description: "JavaScript library for building user interfaces.",
    icon: "ri-reactjs-line",
    color: "#61DAFB",
    link: "https://react.dev/",
  },
  {
    name: "Node.js",
    description: "JavaScript runtime built on Chrome's V8 engine.",
    icon: "ri-nodejs-line",
    color: "#68A063",
    link: "https://nodejs.org/",
  },
  {
    name: "Next.js",
    description: "The React Framework for Production.",
    icon: "ri-nextjs-fill",
    color: "#5f5f5f",
    link: "https://nextjs.org/",
  },
  {
    name: "TypeScript",
    description:
      "Strongly typed programming language that builds on JavaScript.",
    icon: "ri-typescript-line",
    color: "#007ACC",
    link: "https://www.typescriptlang.org/",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI development.",
    icon: "ri-css3-line",
    color: "#38B2AC",
    link: "https://tailwindcss.com/",
  },
  {
    name: "MongoDB",
    description: "NoSQL database for modern web applications.",
    icon: "ri-database-2-line",
    color: "#47A248",
    link: "https://www.mongodb.com/",
  },

  // ... other tech items with color property
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const TechnologyPage = () => {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <motion.h2
          className={styles.heading}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          My <span className={styles.highlight}>Tech Stack</span>
        </motion.h2>

        <motion.p
          className={styles.subheading}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        ></motion.p>

        <div className={styles.grid}>
          {tech.map((technology, index) => (
            <motion.div
              key={technology.name}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <Tilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor="lightblue"
                glareBorderRadius="12px"
                scale={1.02}
                transitionSpeed={1500}
              >
                <div
                  className={styles.card}
                  style={{ borderTop: `4px solid ${technology.color}` }}
                >
                  <motion.div
                    className={styles.iconWrapper}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <i
                      className={`${technology.icon} ${styles.icon}`}
                      style={{ color: technology.color }}
                    />
                  </motion.div>

                  <div className={styles.content}>
                    <h3 className={styles.title}>{technology.name}</h3>
                    <p className={styles.description}>
                      {technology.description}
                    </p>

                    {technology.link && (
                      <motion.a
                        href={technology.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                        whileHover={{ x: 3 }}
                        style={{ color: technology.color }}
                      >
                        Learn more
                        <i className={`ri-arrow-right-line ${styles.arrow}`} />
                      </motion.a>
                    )}
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TechnologyPage;
