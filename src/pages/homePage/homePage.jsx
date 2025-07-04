import React, { useState } from "react";
import s from "./homePage.module.css";
import TechIcon from "../../Components/TechIcon/TechIcon.jsx";
import { motion as Motion } from "motion/react";
import MenuIcon from "../../Components/MenuIcon/MenuIcon";
import { Link, NavLink } from "react-router-dom";
import ControllerSkills from "../../Components/ControllerSkills/ControllerSkills.jsx";
import ControllerMenu from "../../Components/ControllerMenu/ControllerMenu.jsx";
import ExperienceTable from "../../Components/ExperienceTable/ExperienceTable.jsx";

const HomePage = () => {
  const [hovered, setHovered] = useState(false);
  // Додайте цей код в будь-який компонент (наприклад, HomePage)

  const skills = [
    { src: "/icons/react.svg", alt: "React" },
    { src: "/icons/javascript.svg", alt: "JavaScript" },
    { src: "/icons/nextjs.svg", alt: "Next.js" },
    { src: "/icons/html.svg", alt: "HTML" },
    { src: "/icons/css.svg", alt: "CSS" },
    { src: "/icons/sass.svg", alt: "Sass" },
    { src: "/icons/git.svg", alt: "Git" },
    { src: "/icons/github.svg", alt: "GitHub" },
    { src: "/icons/figma.svg", alt: "Figma" },
    { src: "/icons/vercel.svg", alt: "Vercel" },
    { src: "/icons/render.svg", alt: "Render" },
    { src: "/icons/nodejs.svg", alt: "Node.js" },
    { src: "/icons/expressjs.svg", alt: "Express.js" },
    { src: "/icons/mongodb.svg", alt: "MongoDB" },
  ];

  return (
    <Motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        opacity: { duration: 0.4 },
        scale: { duration: 0.6 },
      }}
    >
      <>
        <div className={s.container_home}>
          <div className={s.content}>
            <div className={s.text}>
              <h1 className={s.title}>Hello, I’m a Fullstack Developer</h1>
              <p className={s.paragraph}>
                I specialize in building modern, fast and scalable websites and
                web applications.
              </p>
              <button
                className={s.button}
                onClick={() =>
                  window.open("https://github.com/volodimirfushtei", "_blank")
                }
              >
                View My Projects
              </button>
              <div className={s.experience}>
                {" "}
                <ExperienceTable />
              </div>
            </div>
            <div className={s.preview}>
              <img
                src={
                  hovered
                    ? "/images/Programmer.jpg"
                    : "/images/Programmer_mob.png"
                }
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                alt="Preview"
                loading="lazy"
                width="500"
                height="500"
                className={s.image}
              />
            </div>
          </div>
          {/* Стек технологій */}
          <div className={s.stack}>
            <ControllerSkills items={skills} />
          </div>
        </div>
      </>
    </Motion.div>
  );
};

export default HomePage;
