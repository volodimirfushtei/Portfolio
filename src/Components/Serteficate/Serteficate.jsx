import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Serteficate.module.css";

const Certificate = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isScaled, setIsScaled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScale = () => {
    setIsScaled(true);
    setIsAnimating(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className={styles.container}
        variants={itemVariants}
        whileHover={{ y: -5 }}
      >
        <motion.h4 variants={itemVariants}>
          From{" "}
          <i
            className="ri-flag-fill"
            style={{ color: "#0057B7", fontSize: "1.5rem" }}
          ></i>{" "}
          with Passion
        </motion.h4>

        <motion.h2 variants={itemVariants}>
          Local time -{" "}
          <span className={styles.time}>
            {currentTime.toLocaleTimeString()}
            <i className="ri-time-line"></i>
          </span>
        </motion.h2>

        <motion.p variants={itemVariants}>Got a question?</motion.p>

        <motion.p variants={itemVariants}>
          Email me at{" "}
          <a href="mailto:fuschteyy@gmail.com" className={styles.emailLink}>
            fuschteyy@gmail.com
          </a>
        </motion.p>
      </motion.div>

      <motion.div
        className={`${styles.card} ${isScaled ? styles.scaled : ""}`}
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className={styles.certificate} onClick={handleScale}>
          <div className={styles.header}>
            <h1 className={styles.certificateTitle}>CERTIFICATE</h1>
            <h2 className={styles.name}>FUSHTEI VOLODYMYR</h2>
          </div>

          <div className={styles.body}>
            <p className={styles.achievement}>
              Has successfully completed <br />
              <span className={styles.course}>FULLSTACK DEVELOPER</span> <br />
              course at GoIT
            </p>

            <div className={styles.divider}></div>

            <div className={styles.details}>
              <div className={styles.date}>21/01/2025</div>
              <div className={styles.id}>Unique ID 35048</div>
              <div className={styles.specialty}>FULLSTACK</div>
              <div className={styles.website}>goit.global</div>
            </div>

            <div className={styles.signature}>
              <div className={styles.signatureLine}></div>
              <div className={styles.ceo}>CEO of GoIT</div>
              <div className={styles.ceoName}>Anton Chornyi</div>
            </div>
          </div>

          <div className={styles.watermark}>GOIT</div>
        </div>

        <a
          href="/images/FUSHTEI_VOLODYMYR.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.downloadButton}
        >
          Download Certificate
          <i className="ri-download-line"></i>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Certificate;
