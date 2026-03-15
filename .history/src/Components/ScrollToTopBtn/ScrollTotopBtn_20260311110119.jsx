import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./ScrollToTopBtn.module.css";

const ScrollToTopBtn = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 300);

      // ✅ Розрахунок прогресу скролу
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      className={styles.scrollToTop}
      animate={{
        opacity: isScrolled ? 1 : 0,
        pointerEvents: isScrolled ? "auto" : "none",
      }}
      transition={{ duration: 0.3 }}
      aria-label="Scroll to top"
    >
      {/* ═══════════════════════════════════════════════════════ */}
      {/* PROGRESS LINE (VERTICAL) */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className={styles.progressContainer}>
        {/* Background line */}
        <div className={styles.progressBg} />

        {/* Animated progress line */}
        <motion.div
          className={styles.progressBar}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: scrollProgress / 100 }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* LABEL & BUTTON */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className={styles.content}>
        <span className={styles.label}>Back to top</span>

        <motion.button
          className={styles.button}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 16V4M10 4L5 9M10 4L15 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </div>

      {/* Progress percentage */}
      <span className={styles.percentage}>{Math.round(scrollProgress)}%</span>
    </motion.div>
  );
};

export default ScrollToTopBtn;
