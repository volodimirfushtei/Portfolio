import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./homePage.module.css";

import ControllerSkills from "../../Components/ControllerSkills/ControllerSkills.jsx";

import Footer from "../../Components/Footer/Footer.jsx";

import Expertise from "../../Components/Expertise/Expertise";
import Carusel from "../../Components/Carusel/Carusel.jsx";

import HeroSection from "../../Components/HeroSection/HeroSection.jsx";
import FadeInAnimate from "../../Components/FadeInAnimate/FadeInAnimate.jsx";
import useScrollDetection from "../../hooks/useScrollDetection";

import Sertificate from "../../Components/Sertificate/Sertificate.jsx";
import CtaSection from "../../Components/CtaSection/CtaSection.jsx";
import ScrollToTopBtn from "../../Components/ScrollToTopBtn/ScrollTotopBtn.jsx";
import ScrollProgress from "../../Components/ScrollProgress/ScrollProgress.jsx";
import CornerBadge from "../../Components/CornerBadge/CornerBadge.jsx";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import StickyZoomSection from "../../Components/StickyZoomSection/StickyZoomSection.jsx";

const HomePage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const [activeSection, setActiveSection] = useState({
    number: 1,
    label: "Hero",
  });

  // Відстеження активної секції
  useEffect(() => {
    const sections = [
      { id: "hero", number: 1, label: "Hero" },
      { id: "expertise", number: 2, label: "Expertise" },
      { id: "skills", number: 3, label: "Skills" },
      { id: "carusel", number: 4, label: "Projects" },
      { id: "cta", number: 5, label: "Contact" },
      { id: "certificate", number: 6, label: "Certificate" },
      { id: "sticky", number: 7, label: "Showcase" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find((s) => s.id === entry.target.id);
            if (section) {
              setActiveSection({
                number: section.number,
                label: section.label,
              });
            }
          }
        });
      },
      { threshold: 0.5 }, // Секція вважається активною, коли видно 50%
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);
  // Custom scroll hook
  const isScrolled = useScrollDetection(1200);

  // Scroll progress calculation
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTotal =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      const progress = Math.min(100, (scrollPosition / scrollTotal) * 100);
      setScrollProgress(progress);
      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${progress}%`,
      );
    };

    const throttledScroll = throttle(updateScrollProgress, 16);
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  // Scroll animation for CTA section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "0px"]);

  // Skills data
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      {/* Corner Badge - завжди показує активну секцію */}
      <CornerBadge number={activeSection.number} label={activeSection.label} />
      <ScrollProgress scrollProgress={scrollProgress} />
      <section className={styles.section}>
        <HeroSection />
      </section>

      <main className="w-screen overflow-hidden">
        {/* Expertise Section */}
        <section
          id="expertise"
          className={`${styles.expertise} ${styles.section}`}
        >
          <Expertise />
        </section>

        {/* Skills Section */}
        <section id="skills" className={styles.skillsSection}>
          <ControllerSkills items={skills} />
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className={`${styles.projects} ${styles.section}`}
        >
          <div
            ref={sectionRef}
            className={`${styles.carusel} ${styles.section} `}
          >
            <Carusel />
          </div>

          <motion.section
            id="cta"
            className={`${styles.cta} ${styles.section} `}
            style={{ y }}
          >
            <CtaSection />
          </motion.section>

          {/* Certificate Section */}
          <section
            id="serteficate"
            className={`${styles.sertificate} ${styles.section}`}
            style={{ y }}
          >
            <Sertificate />
          </section>
          <section className={`${styles.sticky} ${styles.section}`}>
            <StickyZoomSection />
          </section>
        </section>
      </main>
      <Footer />
      <ScrollToTopBtn />
      <ScrollProgress progress={scrollProgress} />
    </motion.div>
  );
};

// Throttle function for scroll events
function throttle(fn, wait) {
  let time = Date.now();
  return function () {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}

export default HomePage;
