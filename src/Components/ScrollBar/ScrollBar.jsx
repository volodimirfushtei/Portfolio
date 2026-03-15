import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./ScrollBar.module.css";

const ScrollBar = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const pages = [
    { id: 1, color: "var(--color-background)", title: "Welcome" },
    { id: 2, color: "var(--color-surface)", title: "Services" },
    { id: 3, color: "var(--color-background)", title: "Portfolio" },
    { id: 4, color: "var(--color-surface)", title: "Contact" },
  ];

  const scrollToSection = (index) => {
    const sectionHeight = containerRef.current.clientHeight;
    containerRef.current.scrollTo({
      top: sectionHeight * index,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.wrapper}>
      {/* Main Content */}
      <div ref={containerRef} className={`${styles.mainContent} ${styles.container}`}>
        {pages.map((page) => (
          <section
            key={page.id}
            id={`section-${page.id}`}
            className={styles.section}
            style={{ backgroundColor: page.color }}
          >
            <motion.h2
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {page.title}
            </motion.h2>
          </section>
        ))}
      </div>

      {/* Custom Scrollbar */}
      <div className={styles.scrollbarTrack}>
        <div className={styles.line}>
          {/* Progress Indicator */}
          <motion.div
            className={styles.progress}
            style={{
              scaleY: scrollProgress,
            }}
          />

          {/* Navigation Dots */}
          <div className={styles.dotContainer}>
            {pages.map((_, index) => (
              <button
                key={index}
                className={styles.dot}
                onClick={() => scrollToSection(index)}
                aria-label={`Go to section ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollBar;
