import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CardTech.module.css";

const CardTech = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [manualFlip, setManualFlip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (manualFlip || isMobile) return;
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 6000);
    return () => clearInterval(interval);
  }, [manualFlip, isMobile]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setManualFlip(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card} onClick={handleFlip}>
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              className={`${styles.side} ${styles.front}`}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.card}>
                <div className={styles.backContent}>
                  <img
                    src="/images/My_photo.png"
                    alt="Volodymyr Fushtei"
                    className={styles.avatar}
                  />

                  <div className={styles.textBlock}>
                    <h2 className={styles.subtitle}>Freelance Web Developer</h2>
                    <h1 className={styles.title}>
                      <span className={styles.highlight}>Volodymyr</span>{" "}
                      Fushtei
                    </h1>
                    <p className={styles.description}>
                      Hi there! I'm a junior freelance web developer from
                      Ukraine. I love crafting modern, responsive websites and
                      apps.
                    </p>
                  </div>
                  <button className={styles.button}>
                    View Portfolio <i className="ri-arrow-right-line" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              className={`${styles.side} ${styles.back}`}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className={styles.video}
                poster="/images/pexels-digi.jpg"
              >
                <source src="src/assets/Web_developer.mp4" type="video/mp4" />
              </video>
              <div className={styles.frontText}>
                <span className={styles.badge}>Featured</span>
                <p>
                  {manualFlip
                    ? "Tap to flip"
                    : isMobile
                    ? "Tap to view info"
                    : "Auto-flips every 6s. Click to pause"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CardTech;
