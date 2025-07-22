import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import styles from "./homePage.module.css";

import ControllerSkills from "../../Components/ControllerSkills/ControllerSkills.jsx";

import Footer from "../../Components/Footer/Footer.jsx";

import Expertise from "../../Components/Expertise/Expertise";
import Carusel from "../../Components/Carusel/Carusel.jsx";
import ScrollBar from "../../Components/ScrollBar/ScrollBar.jsx";
import HeroSection from "../../Components/HeroSection/HeroSection.jsx";
import FadeInAnimate from "../../Components/FadeInAnimate/FadeInAnimate.jsx";
import useScrollDetection from "../../hooks/useScrollDetection";

const HomePage = () => {
  const [hovered, setHovered] = useState(false);
  const isScrolled = useScrollDetection(1200);

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
      transition={{ duration: 0.5 }}
      className={`${styles.container}`}
      style={{ overflowY: "auto" }}
    >
      <HeroSection />
      <main>
        <section
          id="expertise"
          className={`${styles.expertise} ${styles.section}`}
        >
          <Expertise />
        </section>
        {/* Skills Section */}
        <section id="skills" className={`${styles.skillsSection}`}>
          <ControllerSkills items={skills} />
        </section>
        <section
          id="projects"
          className={`${styles.projects} ${styles.section}`}
        >
          <Carusel />
        </section>
      </main>
      <Footer />
      <div
        id="scrollButton"
        className={`${
          styles.scrollContainer
        }  fixed bottom-6  right-6 z-50 transition-all duration-300 border-2 border-secondary rounded-2 p-2 bg-indigo-500 text-white shadow-md hover:shadow-lg cursor-pointer ${
          isScrolled
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none  cursor-not-allowed"
        }`}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={`${styles.scrollArrow} ${
            hovered ? "animate-flash" : ""
          } animate-pulse `}
        />
        <span className={styles.scrollText}>Scroll</span>
      </div>
    </Motion.div>
  );
};

export default HomePage;
