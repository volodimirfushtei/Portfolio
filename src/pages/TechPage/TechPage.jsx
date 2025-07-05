import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import s from "./TechPage.module.css";

const tech = [
  {
    name: "React.js",
    description: "JavaScript бібліотека для створення інтерфейсів.",
    icon: "ri-reactjs-line",
    link: "https://react.dev/",
  },
  {
    name: "Node.js",
    description: "Серверне середовище виконання JavaScript.",
    icon: "ri-nodejs-line",
    link: "https://nodejs.org/en/",
  },
  {
    name: "Next.js",
    description: "Фреймворк для SSR у React.",
    icon: "ri-flutter-fill",
    link: "https://nextjs.org/",
  },
  {
    name: "Git",
    description: "Система контролю версій.",
    icon: "ri-git-branch-line",
    link: "https://git-scm.com/",
  },
  {
    name: "Redux",
    description: "Сховище стану для React.",
    icon: "ri-stack-line",
    link: "https://redux.js.org/",
  },
  {
    name: "TypeScript",
    description: "Надмножина JavaScript із типами.",
    icon: "ri-code-s-slash-line",
    link: "https://www.typescriptlang.org/",
  },
  {
    name: "Tailwind CSS",
    description: "CSS-фреймворк.",
    icon: "ri-tailwind-css-fill",
    link: "https://tailwindcss.com/",
  },
  {
    name: "MongoDB",
    description: "NoSQL база даних.",
    icon: "ri-database-2-line",
    link: "https://www.mongodb.com/",
  },
  {
    name: "Express.js",
    description: "Фреймворк для Node.js.",
    icon: "ri-server-line",
    link: "https://expressjs.com/",
  },
  {
    name: "Grid",
    description: "CSS-система для створення сіток.",
    icon: "ri-grid-fill",
    link: "https://css-tricks.com/snippets/css/complete-guide-grid/",
  },
  {
    name: "Firebase",
    description: "Платформа для мобільних і веб-додатків.",
    icon: "ri-fire-fill",
    link: "https://firebase.google.com/",
  },
  {
    name: "Flutter",
    description: "Фреймворк для створення мобільних додатків.",
    icon: "ri-flutter-fill",
    link: "https://flutter.dev/",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const TechnologyPage = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div id="technologies" className={s.wrapper}>
      <Motion.div
        className={s.background}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      />

      <div className={s.container}>
        <h2 className={s.heading}>Technologies</h2>
        <div
          className={s.grid}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {tech.map((t, index) => (
            <Motion.div
              key={t.name}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <Tilt
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                perspective={1000}
                transitionSpeed={500}
                glareEnable={true}
                glareMaxOpacity={0.5}
                glareColor="#010101"
                glarePosition="all"
                glareBorderRadius="5px"
              >
                <div className={s.card}>
                  <i className={`${t.icon} ${s.icon}`} aria-hidden="true"></i>
                  <h3 className={s.title}>{t.name}</h3>
                  <p className={s.description}>{t.description}</p>
                  {t.link && (
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={s.link}
                    >
                      Go to website
                      <i className={`ri-arrow-right-line ${s.arrow}`}></i>
                    </a>
                  )}
                </div>
              </Tilt>
            </Motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnologyPage;
