import React from "react";
import { motion as Motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useState } from "react";

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
  },
  {
    name: "Next.js",
    description: "Фреймворк для SSR у React.",
    icon: "ri-flutter-fill",
  },
  {
    name: "Git",
    description: "Система контролю версій.",
    icon: "ri-git-branch-line",
  },
  {
    name: "Redux",
    description: "Сховище стану для React.",
    icon: "ri-stack-line",
  },
  {
    name: "TypeScript",
    icon: "ri-code-s-slash-line",
    description: "Надмножина JavaScript із типами.",
  },
  {
    name: "Tailwind CSS",
    icon: "ri-tailwind-fill",
    description: "CSS-фреймворк.",
  },
  {
    name: "MongoDB",
    icon: "ri-database-2-line",
    description: "NoSQL база даних.",
  },
  {
    name: "Express.js",
    icon: "ri-server-line",
    description: "Фреймворк для Node.js.",
  },
  {
    name: "Sass",
    icon: "ri-sass-line",
    description: "CSS-препроцесор.",
  },
  {
    name: "Firebase",
    icon: "ri-fire-fill",
    description: "Платформа для мобільних і веб-додатків.",
  },
  {
    name: "Framer Motion",
    icon: "ri-motion-fill",
    description: "Бібліотека для анімації в React.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const TechnologyPage = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  return (
    <div
      id="technologies"
      className="w-full py-12 bg-black text-gray-100 relative overflow-hidden"
    >
      <Motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        <div className="w-full h-full bg-gradient-to-br from-[#333334] via-transparent to-[#1a1a1a] blur-3xl"></div>
      </Motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold mb-8  text-center">
          Технології, які ми використовуємо
        </h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {tech.map((tech, index) => (
            <Motion.div
              key={tech.name}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <Tilt
                className="w-full h-full"
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
                <div className="bg-[#181717] rounded-lg shadow-md p-3 flex flex-col items-center text-center hover:shadow-xl transition h-full">
                  <i
                    className={`${tech.icon} text-5xl text-[#5c74ee] mb-4`}
                    aria-hidden="true"
                  ></i>
                  <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
                  <p className="text-gray-400">{tech.description}</p>
                  <a
                    href={tech.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-[#50d6c7] hover:underline"
                  >
                    Докладніше<i className="ri-external-link-line"></i>
                  </a>
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
