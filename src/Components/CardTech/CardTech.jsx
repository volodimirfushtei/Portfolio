import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CardTech.module.css";

const CardTech = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [manualFlip, setManualFlip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
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

  const techStack = [
    { name: "React", icon: "ri-reactjs-line" },
    { name: "Next.js", icon: "ri-nextjs-line" },
    { name: "Node.js", icon: "ri-nodejs-line" },
    { name: "JavaScript", icon: "ri-javascript-line" },
    { name: "CSS3", icon: "ri-css3-line" },
    { name: "HTML5", icon: "ri-html5-line" },
  ];

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.cardContainer}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div
          className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
          onClick={handleFlip}
        >
          <AnimatePresence mode="wait">
            {!isFlipped ? (
              <motion.div
                key="front"
                className={`${styles.side} ${styles.front}`}
                initial={{ rotateY: 0, opacity: 1 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className={styles.cardContent}>
                  <div className={styles.avatarWrapper}>
                    <motion.img
                      src="/images/my_photo.jpg"
                      alt="Volodymyr Fushtei"
                      className={styles.avatar}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    />
                    <div className={styles.avatarGlow} />
                  </div>
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
                  <div className={styles.flipHint}>
                    <i className="ri-arrow-left-right-line"></i>
                    {isMobile ? "Tap to view skills" : "Click to flip"}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="back"
                className={`${styles.side} ${styles.back}`}
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className={styles.backContent}>
                  <span className={styles.badge}>Tech Stack</span>
                  <motion.p
                    className={styles.flipMessage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {manualFlip
                      ? "Tap to flip back"
                      : isMobile
                      ? "Tap to view profile"
                      : "Auto-flips every 6s"}
                  </motion.p>
                  <motion.div
                    className={styles.techGrid}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {techStack.map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        className={styles.techItem}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <i className={`${tech.icon} ${styles.techIcon}`}></i>
                        {tech.name}
                      </motion.div>
                    ))}
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
