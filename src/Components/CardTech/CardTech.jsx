import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CardTech.module.css";

const CardTech = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [manualFlip, setManualFlip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 640);
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
      <motion.div
        className={styles.cardContainer}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className={styles.card} onClick={handleFlip}>
          <AnimatePresence mode="wait">
            {!isFlipped ? (
              <motion.div
                key="front"
                className={`${styles.side} ${styles.front}`}
                initial={{ translateY: 0, opacity: 1 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: -100, opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className={styles.cardContent}>
                  <motion.img
                    src="/images/My_photo.png"
                    alt="Volodymyr Fushtei"
                    className={styles.avatar}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  />
                  <div className={styles.textBlock}>
                    <motion.h2
                      className={styles.subtitle}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      Freelance Web Developer
                    </motion.h2>
                    <motion.h1
                      className={styles.title}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <span className={styles.highlight}>Volodymyr</span>{" "}
                      Fushtei
                    </motion.h1>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="back"
                className={`${styles.side} ${styles.back}`}
                initial={{ translateY: -100, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: -100, opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className={styles.backContent}>
                  <span className={styles.badge}>Featured</span>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {manualFlip
                      ? "Tap to flip back"
                      : isMobile
                      ? "Tap to view info"
                      : "Auto-flips every 6s. Click to pause"}
                  </motion.p>
                  <motion.div
                    className={styles.techGrid}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {/* Add your tech icons/logos here */}
                    <div className={styles.techItem}>React</div>
                    <div className={styles.techItem}>Node.js</div>
                    <div className={styles.techItem}>CSS3</div>
                    <div className={styles.techItem}>JavaScript</div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default CardTech;
