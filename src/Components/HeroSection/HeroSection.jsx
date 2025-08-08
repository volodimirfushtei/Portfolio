import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import styles from "./HeroSection.module.css";
import HeroMedia from "../HeroMedia/HeroMedia";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll progress with spring smoothing
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothScrollY = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
  });

  // Parallax effects
  const parallaxEffects = {
    yBg: useTransform(smoothScrollY, [0, 1], ["0%", "20%"]),
    opacity: useTransform(smoothScrollY, [0, 0.8], [1, 0]),
    scale: useTransform(smoothScrollY, [0, 1], [1, 1.1]),
    textY: useTransform(smoothScrollY, [0, 1], ["0%", "40%"]),
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
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className={styles.hero}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated gradient background */}
      <motion.div
        className={`${styles.gradientBackground} ${
          scrolled ? styles.scrolled : ""
        }`}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        style={{ y: parallaxEffects.yBg, opacity: parallaxEffects.opacity }}
      />

      {/* Decorative floating shapes */}
      <div className={styles.floatingShapes}>
        <motion.div
          className={styles.shapeCircle}
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={styles.shapeTriangle}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Main content */}
      <div className={styles.content}>
        <motion.div
          className={styles.textContent}
          style={{ y: parallaxEffects.yBg, opacity: parallaxEffects.opacity }}
        >
          <motion.h1 className={styles.title} variants={itemVariants}>
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
              className={styles.primaryButton}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 24px rgba(67, 104, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start a project
              <span className={styles.buttonArrow}>→</span>
            </motion.button>

            <motion.button
              className={styles.secondaryButton}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 24px rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open("https://github.com/volodimirfushtei")}
            >
              View my work
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.mediaContainer}
          style={{ y: parallaxEffects.yBg, opacity: parallaxEffects.opacity }}
        >
          <HeroMedia />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        animate={{
          y: [0, 15, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className={styles.scrollArrow} />
        <span>Scroll to explore</span>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
