import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import styles from "./homePage.module.css";

import ControllerSkills from "../../Components/ControllerSkills/ControllerSkills.jsx";
import ExperienceTable from "../../Components/ExperienceTable/ExperienceTable.jsx";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import Footer from "../../Components/Footer/Footer.jsx";
import Header from "../../Components/Header/Header.jsx";
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
      <div className={styles.content}>
        {/* Text Content */}
        <div className={styles.textContent}>
          <Motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className={styles.title}>
              Hello, I'm a{" "}
              <span className={styles.name}>Fullstack Developer</span>
            </h1>
            <p className={styles.paragraph}>
              I specialize in building modern, fast and scalable websites and
              web applications.
            </p>

            <button
              className={styles.button}
              onClick={() =>
                window.open("https://github.com/volodimirfushtei", "_blank")
              }
            >
              View My Projects
            </button>

            <div className={styles.experience}>
              <ExperienceTable />
            </div>
          </Motion.div>
        </div>

        {/* Image Content */}
        <div className={styles.imageWrapper}>
          <Motion.div
            whileHover={{ scale: 1.02 }}
            className="position-relative"
          >
            <img
              src={
                hovered ? "/images/pexels-jorge.jpg" : "/images/pexels-digi.jpg"
              }
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              alt="Developer Preview"
              className={styles.profileImage}
              width="600"
              height="500"
              overflow="hidden"
              loading="lazy"
            />
            <Badge
              bg="dark"
              text="light"
              className={`${styles.imageBadge} position-absolute`}
            >
              <i className="bi bi-star-fill text-warning me-1"></i>
              Available for work
            </Badge>
          </Motion.div>
        </div>
      </div>

      {/* Skills Section */}
      <div className={styles.skillsSection}>
        <ControllerSkills items={skills} />
      </div>
      <Footer />
    </Motion.div>
  );
};

export default HomePage;
