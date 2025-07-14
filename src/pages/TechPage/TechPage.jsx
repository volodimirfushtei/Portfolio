import React from "react";
import { motion } from "framer-motion";

import styles from "./TechPage.module.css";

const techStack = [
  {
    name: "React",
    description: "Будуємо UI з реактивними компонентами.",
    icon: "ri-reactjs-line",
    color: "#61DAFB",
    link: "https://react.dev/ ",
  },
  {
    name: "Node.js",
    description: "Серверна логіка на потужному JS-рунтаймі.",
    icon: "ri-nodejs-line",
    color: "#68A063",
    link: "https://nodejs.org/ ",
  },
  {
    name: "Next.js",
    description: "Фреймворк для сторінок і API без зайвого клопоту.",
    icon: "ri-nextjs-fill",
    color: "#000000",
    link: "https://nextjs.org/ ",
  },
  {
    name: "Tailwind CSS",
    description: "CSS за допомогою простих класів — швидко і просто.",
    icon: "ri-css3-line",
    color: "#06B6D4",
    link: "https://tailwindcss.com/ ",
  },
  {
    name: "MongoDB",
    description: "Гнучка NoSQL база даних для сучасних додатків.",
    icon: "ri-database-2-line",
    color: "#4DB33D",
    link: "https://www.mongodb.com/ ",
  },
  {
    name: "TypeScript",
    description: "JavaScript з підтримкою типів і менше помилок.",
    icon: "ri-typescript-fill",
    color: "#007ACC",
    link: "https://www.typescriptlang.org/ ",
  },
  {
    name: "Figma",
    description: "Інтерфейсні дизаєри для веб-додатків.",
    icon: "ri-pencil-ruler-line",
    color: "#F24E1E",
    link: "https://www.figma.com/ ",
  },
  {
    name: "Git",
    description: "Контролюємо версії нашого коду.",
    icon: "ri-git-merge-line",
    color: "#F05033",
    link: "https://git-scm.com/ ",
  },
];

const TechnologyPage = () => {
  return (
    <motion.section
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <motion.header
          className={styles.header}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={styles.heading}>
            My <span>Toolkit</span>
          </h2>
        </motion.header>

        <div className={styles.grid}>
          {techStack.map((tech) => (
            <a
              key={tech.name}
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
            >
              <div className={styles.card}>
                <div
                  className={styles.iconWrapper}
                  style={{ color: tech.color }}
                >
                  <i className={`${tech.icon} ${styles.icon}`} />
                </div>
                <h3 className={styles.title}>{tech.name}</h3>
                <p className={styles.description}>{tech.description}</p>
                <span className={styles.readMore}>
                  Explore <i className="ri-arrow-right-s-line" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TechnologyPage;
