import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import styles from "./homePage.module.css";

import ControllerSkills from "../../Components/ControllerSkills/ControllerSkills.jsx";
import ExperienceTable from "../../Components/ExperienceTable/ExperienceTable.jsx";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import Footer from "../../Components/Footer/Footer.jsx";
import Header from "../../Components/Header/Header.jsx";
import CardTech from "../../Components/CardTech/CardTech.jsx";
import Carusel from "../../Components/Carusel/Carusel.jsx";
import HeroMedia from "../../Components/HeroMedia/HeroMedia.jsx";
import HeroSection from "../../Components/HeroSection/HeroSection.jsx";
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

  return (
    <Motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      <Header />
      <HeroSection />

      {/* Skills Section */}
      <div className={styles.skillsSection}>
        <ControllerSkills items={skills} />
      </div>
      <Carusel />
      <Footer />
    </Motion.div>
  );
};

export default HomePage;
