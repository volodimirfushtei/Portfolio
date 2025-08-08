import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./homePage.module.css";

import ControllerSkills from "../../Components/ControllerSkills/ControllerSkills.jsx";

import Footer from "../../Components/Footer/Footer.jsx";

import Expertise from "../../Components/Expertise/Expertise";
import Carusel from "../../Components/Carusel/Carusel.jsx";
import ScrollBar from "../../Components/ScrollBar/ScrollBar.jsx";
import HeroSection from "../../Components/HeroSection/HeroSection.jsx";
import FadeInAnimate from "../../Components/FadeInAnimate/FadeInAnimate.jsx";
import useScrollDetection from "../../hooks/useScrollDetection";
import ParticlesBackground from "../../Components/ParBG/ParBG.jsx";
import Sertificate from "../../Components/Sertificate/Sertificate.jsx";
import CtaSection from "../../Components/CtaSection/CtaSection.jsx";
import ScrollToTopBtn from "../../Components/ScrollToTopBtn/ScrollTotopBtn.jsx";
import ScrollProgress from "../../Components/ScrollProgress/ScrollProgress.jsx";
const HomePage = () => {
  const [hovered, setHovered] = useState(false);
  const isScrolled = useScrollDetection(1200);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTotal =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      const progress = (scrollPosition / scrollTotal) * 100;
      setScrollProgress(progress);
      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${progress}%`
      );
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);
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
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`${styles.container}`}
      style={{
        overflowY: "auto",
      }}
    >
      <HeroSection />
      <main className="w-screen">
        {/* Expertise Section */}
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
          <section
            id="carusel"
            className={`${styles.carusel} ${styles.section}`}
          >
            <Carusel />
          </section>
          <section
            id="serteficate"
            className={`${styles.serteficate} ${styles.section}`}
          >
            <section id="cta " className={`${styles.cta} ${styles.section}`}>
              <CtaSection />
            </section>
            <section
              id="serteficate"
              className={`${styles.serteficate} ${styles.section}`}
            >
              <Sertificate />
            </section>
          </section>
        </section>
      </main>
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTopBtn />
      <ScrollProgress />
    </motion.div>
  );
};

export default HomePage;
