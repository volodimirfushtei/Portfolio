import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import styles from "./ScrollToTopBtn.module.css";

const ScrollToTopBtn = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const magneticRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 300);

      // ✅ Calculate scroll progress
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!magneticRef.current || !buttonRef.current) return;

    const magnetic = magneticRef.current;
    const button = buttonRef.current;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = magnetic.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(button, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
      });
    };

    magnetic.addEventListener("mousemove", handleMouseMove);
    magnetic.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      magnetic.removeEventListener("mousemove", handleMouseMove);
      magnetic.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isScrolled]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setScrollProgress(0);
  };

  // SVG dimensions for circular progress
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.div
          className={styles.scrollToTop}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ═══════════════════════════════════════════════════════ */}
          {/* MAGNETIC BUTTON AREA */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div ref={magneticRef} className={styles.magneticContainer} onClick={scrollToTop}>
            {/* Circular Progress SVG */}
            <svg className={styles.progressSvg} viewBox="0 0 60 60">
              <circle
                className={styles.progressCircleBg}
                cx="30"
                cy="30"
                r={radius}
              />
            
            </svg>

            {/* Main Button with Icon */}
            <div ref={buttonRef} className={styles.button}>
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 19V5M12 5L5 12M12 5L19 12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* LABEL & PERCENTAGE */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className={styles.content}>
            <span className={styles.label}>Back to top</span>
            <span className={styles.percentage}>{Math.round(scrollProgress)}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopBtn;
