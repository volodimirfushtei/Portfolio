import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
import StickyZoomSection from "../../Components/StickyZoomSection/StickyZoomSection.jsx";
import ScrollBar from "../../Components/ScrollBar/ScrollBar.jsx";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Model from "../../Components/Model/Model.jsx";
 
gsap.registerPlugin(ScrollTrigger);
// Page level reveal animation variants
const pageReveal = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1], // Custom Awwwards-style easing
      staggerChildren: 0.2,
    },
  },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const HomePage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const modelRef = useRef(null);
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
      variants={pageReveal}
      initial="hidden"
      animate="visible"
      className={styles.container}  
      ref={sectionRef}
    >
      
      <ScrollToTopBtn />
      <motion.section variants={sectionReveal} className={styles.section} >
        <HeroSection />
       
      </motion.section>
   <section className={styles.canvas} ref={modelRef}>
        <Canvas>
     <Model />
    </Canvas>
    </section>
      <main className={styles.main}>
        {/* Expertise Section */}
        <motion.section
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          id="expertise"
          className={`${styles.expertise} ${styles.section}`}
        >
          <Expertise />
        </motion.section>

        {/* Skills Section */}
        <motion.section
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          id="skills"
          className={styles.section} // Changed from skillsSection to section for uniform padding layout
        >
          <ControllerSkills items={skills} />
        </motion.section>

        {/* Projects Section */}
        <section
          id="projects"
          className={`${styles.projects} ${styles.section}`}
        >
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            
            className={`${styles.carusel} ${styles.section} `}
          >
            <Carusel />
          </motion.div>

          <motion.section
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            id="cta"
            className={`${styles.cta} ${styles.section} `}
            style={{ y }}
          >
            <CtaSection />
          </motion.section>

          {/* Certificate Section */}
          <motion.section
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            id="serteficate"
            className={`${styles.sertificate} ${styles.section}`}
            style={{ y }}
          >
            <Sertificate />
          </motion.section>

          <motion.section
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={`${styles.sticky} ${styles.section}`}
          >
            <StickyZoomSection />
          </motion.section>
        </section>
      </main>
      <Footer />
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
