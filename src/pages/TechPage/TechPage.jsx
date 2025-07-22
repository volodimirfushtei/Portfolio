import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

import styles from "./TechPage.module.css";
import AnimatedPage from "../../Components/AnimatedPage/AnimatedPage";
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
  {
    name: "GitHub",
    description: "Інструмент для зберігання та обміну кодом.",
    icon: "ri-github-fill",
    color: "#181717",
    link: "https://github.com/ ",
  },
  {
    name: "NPM",
    description: "Менеджер пакетів для JavaScript.",
    icon: "ri-npmjs-fill",
    color: "#CB3837",
    link: "https://www.npmjs.com/ ",
  },
  {
    name: "Postman",
    description: "Інструмент для тестування API.",
    icon: "ri-postman-line",
    color: "#FF6C37",
    link: "https://www.postman.com/ ",
  },
  {
    name: "Vercel",
    description: "Платформа для розгортання і деплою додатків.",
    icon: "ri-rocket-line",
    color: "#000000",
    link: "https://vercel.com/ ",
  },
  {
    name: "Netlify",
    description: "Платформа для розгортання і деплою додатків.",
    icon: "ri-rocket-line",
    color: "#000000",
    link: "https://netlify.com/ ",
  },
  {
    name: "Heroku",
    description: "Платформа для розгортання і деплою додатків.",
    icon: "ri-rocket-line",
    color: "#000000",
    link: "https://heroku.com/ ",
  },
  {
    name: "Firebase",
    description: "Платформа для розгортання і деплою додатків.",
    icon: "ri-rocket-line",
    color: "#000000",
    link: "https://firebase.google.com/ ",
  },
  {
    name: "AWS",
    description: "Платформа для розгортання і деплою додатків.",
    icon: "ri-rocket-line",
    color: "#000000",
    link: "https://aws.amazon.com/ ",
  },
];

const TechnologyPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef(null);
  const projectsPerPage = 8;
  const totalPages = Math.ceil(techStack.length / projectsPerPage);

  const currentProjects = techStack.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 10;

    if (isBottom && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <AnimatedPage>
      <section
        className={styles.wrapper}
        id="tech"
        style={{ overflowY: "auto" }}
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

          <motion.div
            className={styles.grid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            ref={containerRef}
            onScroll={handleScroll}
          >
            {currentProjects.map((tech) => (
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
          </motion.div>

          {totalPages > 1 && (
            <motion.div
              className={styles.pagination}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`${styles.pageButton} ${
                    currentPage === i + 1 ? styles.activePage : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </AnimatedPage>
  );
};

export default TechnologyPage;
