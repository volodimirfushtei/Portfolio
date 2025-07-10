import { useRef, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  return (
    <motion.section
      ref={sectionRef}
      className={styles.hero}
      style={{ opacity }}
    >
      {/* Анімований фон з частинками */}
      <div className={styles.particleBackground}>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              "--size": `${Math.random() * 6 + 4}px`,
              "--x": `${Math.random() * 100}%`,
              "--y": `${Math.random() * 100}%`,
              "--delay": `${Math.random() * 5}s`,
              "--duration": `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      {/* Відео з паралакс-ефектом */}
      <motion.div className={styles.videoContainer} style={{ y: yBg }}>
        <video autoPlay muted loop playsInline className={styles.video}>
          <source src="/videos/abstract-waves.mp4" type="video/mp4" />
          <source src="/videos/abstract-waves.webm" type="video/webm" />
        </video>
        <div className={styles.videoOverlay} />
      </motion.div>

      {/* Контент з анімацією */}
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.headingWrapper}
        >
          <h1 className={styles.title}>
            <span className={styles.titleHighlight}>Сучасні</span> рішення
            <br />
            для вашого бізнесу
          </h1>
          <p className={styles.subtitle}>
            Інноваційний підхід до створення цифрових продуктів
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={styles.ctaWrapper}
        >
          <button className={styles.ctaButton}>
            <span>Почати співпрацю</span>
            <div className={styles.buttonHoverEffect} />
          </button>
          <div className={styles.scrollIndicator}>
            <div className={styles.scrollArrow} />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
