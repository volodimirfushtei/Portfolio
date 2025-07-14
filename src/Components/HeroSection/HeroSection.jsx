import { useRef } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import styles from "./HeroSection.module.css";
import HeroMedia from "../HeroMedia/HeroMedia";

const HeroSection = () => {
  const sectionRef = useRef(null);

  // Scroll progress with spring smoothing
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothScrollY = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    mass: 0.5,
  });

  // Parallax effects
  const parallaxEffects = {
    yBg: useTransform(smoothScrollY, [0, 1], ["0%", "15%"]),
    opacity: useTransform(smoothScrollY, [0, 0.7], [1, 0]),
    scale: useTransform(smoothScrollY, [0, 1], [1, 1.05]),
    textY: useTransform(smoothScrollY, [0, 1], ["0%", "30%"]),
    gradientPosition: useTransform(
      smoothScrollY,
      [0, 1],
      ["0% 0%", "100% 100%"]
    ),
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "backOut",
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className={styles.hero}
      style={{ opacity: parallaxEffects.opacity }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Dynamic gradient background */}
      <motion.div
        className={styles.gradientBackground}
        style={{ backgroundPosition: parallaxEffects.gradientPosition }}
      />
      {/* Main content */}
      <div className={styles.content}>
        <motion.div
          className={styles.textContent}
          style={{ y: parallaxEffects.textY }}
          variants={itemVariants}
        >
          <motion.h1 className={styles.title}>
            <motion.span
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
            >
              Innovative
            </motion.span>{" "}
            digital
            <br /> solutions
          </motion.h1>

          <motion.p className={styles.subtitle} variants={itemVariants}>
            Transforming ideas into exceptional web experiences
          </motion.p>

          <motion.div className={styles.buttons} variants={itemVariants}>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(138, 99, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className={styles.primaryButton}
            >
              Start a project
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className={styles.secondaryButton}
            >
              View my work
            </motion.button>
          </motion.div>
        </motion.div>

        <HeroMedia />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        animate={{
          opacity: [0, 1, 0],
          y: [0, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
        }}
      >
        <div className={styles.scrollArrow} />
        <span className={styles.scrollText}>Scroll</span>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
