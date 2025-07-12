import { useRef } from "react";
import {
  useScroll,
  useTransform,
  motion as Motion,
  useSpring,
} from "framer-motion";
import styles from "./HeroSection.module.css";
import HeroMedia from "../HeroMedia/HeroMedia";
import CardTech from "../CardTech/CardTech";
import ExperienceTable from "../ExperienceTable/ExperienceTable";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Smoothed scroll effects with spring physics
  const smoothScrollY = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    mass: 0.5,
  });

  // Parallax effects
  const yBg = useTransform(smoothScrollY, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(smoothScrollY, [0, 0.7], [1, 0]);
  const scale = useTransform(smoothScrollY, [0, 1], [1, 1.05]);
  const textY = useTransform(smoothScrollY, [0, 1], ["0%", "30%"]);

  // Gradient animation values
  const gradientPosition = useTransform(
    smoothScrollY,
    [0, 1],
    ["0% 0%", "100% 100%"]
  );

  return (
    <Motion.section
      ref={sectionRef}
      className={styles.hero}
      style={{ opacity }}
    >
      {/* Dynamic gradient background */}
      <Motion.div
        className={styles.gradientBackground}
        style={{ backgroundPosition: gradientPosition }}
      />

      {/* Optimized video background */}
      <Motion.div className={styles.videoContainer} style={{ y: yBg, scale }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.video}
          preload="auto"
          aria-label="Background video showing abstract cyber patterns"
        >
          <source src="/assets/Cyber.mp4" type="video/mp4" />
          <track kind="captions" srcLang="en" label="English captions" />
        </video>
        <div className={styles.videoOverlay} />
      </Motion.div>

      {/* Content with staggered animations */}
      <div className={styles.content}>
        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "backOut" }}
          className={styles.textContent}
          style={{ y: textY }}
        >
          <Motion.h1
            className={styles.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Motion.span
              className={styles.titleGradient}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
              aria-label="Innovative digital solutions"
            >
              Innovative
            </Motion.span>{" "}
            digital
            <br /> solutions
          </Motion.h1>

          <Motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Transforming ideas into exceptional web experiences
          </Motion.p>

          <Motion.div
            className={styles.buttons}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(138, 99, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className={styles.primaryButton}
              aria-label="Start a project"
            >
              Start a project
            </Motion.button>
            <Motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className={styles.secondaryButton}
              aria-label="View my work"
            >
              View my work
            </Motion.button>
          </Motion.div>
        </Motion.div>
        <HeroMedia />
        <Motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "backOut" }}
          className={styles.cardContainer}
        ></Motion.div>
      </div>

      {/* Enhanced scroll indicator with accessibility */}
      <Motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0],
          y: [0, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          times: [0, 0.5, 1],
        }}
        aria-hidden="true"
      >
        <div className={styles.scrollArrow} />
        <div className={styles.scrollText}>Scroll</div>
      </Motion.div>
    </Motion.section>
  );
};

export default HeroSection;
