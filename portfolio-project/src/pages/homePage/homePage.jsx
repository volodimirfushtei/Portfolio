import React, { useEffect, useState } from "react";
import s from "./homePage.module.css";
import TechIcon from "../../Components/TechIcon/TechIcon.jsx";
import Logo from "../../Components/Logo/Logo.jsx";
import MenuIcon from "../../Components/MenuIcon/MenuIcon";
import { Link, NavLink } from "react-router-dom";

import gsap from "gsap";
import ControllerSkills from "../../Components/ControllerSkills/ControllerSkills.jsx";

const HomePage = () => {
  const [hovered, setHovered] = useState(false);

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

  const items = [
    { src: "/icons/home.svg", alt: "Home" },
    { src: "/icons/tech.svg", alt: "Tech" },
    { src: "/icons/projects.svg", alt: "Projects" },
    { src: "/icons/contacts.svg", alt: "Contacts" },
  ];

  // Анімована стрічка меню
  useEffect(() => {
    gsap
      .to(".menu", {
        y: "-50%",
        repeat: -1,
        duration: 20,
        ease: "linear",
        yoyo: true,
        repeatDelay: 0,
        delay: 0,
        paused: true,
      })
      .progress(0.2)
      .play(); // Початкова позиція стрічки меню

    gsap.to(".menu", {
      y: "0%",
      repeat: -1,
      duration: 10,
      ease: "linear",
      yoyo: true,
      repeatDelay: 0,
      delay: 0,
      paused: true,
    });

    return () => gsap.killTweensOf(".menu");
  }, []);

  useEffect(() => {
    gsap.to(".skills", {
      x: "-50%",
      repeat: -1,
      duration: 10,
      ease: "linear",
      yoyo: true,
      repeatDelay: 0,
      delay: 0,
      paused: true,
    });
  }, []);

  return (
    <div className={s.container}>
      {/* Головний блок */}
      <div className={s.content}>
        <Logo />
        <div className={s.menu}>
          <div className="menu">
            {items.map((item) => (
              <NavLink
                key={item.alt}
                to={`/${item.alt.toLowerCase()}`}
                className={s.menuItem}
              >
                <MenuIcon src={item.src} alt={item.alt} />
                <span className={s.alt}>{item.alt}</span>
              </NavLink>
            ))}
            {/* Дублюємо для безперервного скролу */}
            {items.map((item) => (
              <NavLink
                key={`dup-${item.alt}`}
                to={`/${item.alt.toLowerCase()}`}
                className={s.menuItem}
              >
                <MenuIcon src={item.src} alt={item.alt} />
                <span className={s.alt}>{item.alt}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Текст і картинка */}
        <div className={s.text}>
          <h1 className={s.title}>Hello, I’m a Fullstack Developer</h1>
          <p className={s.paragraph}>
            I specialize in building modern, fast and scalable websites and web
            applications.
          </p>
          <button className={s.button}>View My Work</button>
        </div>
        <div className={s.preview}>
          <img
            src={hovered ? "/images/Programmer.jpg" : "/images/Portfolio.png"}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            alt="Preview"
            className={s.image}
          />
          <p className={s.overlay}>
            Check out my projects and learn more about me.
          </p>
        </div>
      </div>

      {/* Стек технологій */}
      <ControllerSkills items={skills} />
    </div>
  );
};

export default HomePage;
