import React, { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

import styles from "./Sertificate.module.css";

const Certificate = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isScaled, setIsScaled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Safe viewport dimensions for SSR
  useEffect(() => {
    if (typeof window !== "undefined") {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  // tilt math - адаптовано під розмір картки
  const rotateX = useTransform(mouseY, [0, 360], [10, -10]);
  const rotateY = useTransform(mouseX, [0, 360], [-10, 10]);

  const smoothX = useSpring(rotateX, {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  });

  const smoothY = useSpring(rotateY, {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  });

  const scale = useSpring(isScaled ? 1.8 : 1, {
    stiffness: 200,
    damping: 25,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Нормалізуємо значення
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Форматування часу
  const formattedTime = currentTime.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className={styles.wrapper}>
      {/* Інформаційна колонка */}
      <div className={styles.infoContainer}>
        <motion.div
          className={styles.infoContent}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h4 className={styles.infoSubtitle}>
            From{" "}
            <motion.span
              className={styles.flagIcon}
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            >
              <img
                src="https://flagcdn.com/ua.svg"
                alt="Ukraine Flag"
                width="24"
                height="16"
                style={{ borderRadius: "2px" }}
              />
            </motion.span>{" "}
            with Passion
          </h4>

          <h2 className={styles.infoTitle}>
            Local time –{" "}
            <motion.span
              className={styles.time}
              animate={{
                color: ["#e8f53c", "#ff5252", "#e8f53c"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              {formattedTime}
              <i className="ri-time-line" aria-hidden="true"></i>
            </motion.span>
          </h2>

          <motion.p
            className={styles.infoText}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Got a question?
          </motion.p>

          <motion.p className={styles.infoText}>
            Email me at:{" "}
            <motion.a
              href="mailto:fuschteyy@gmail.com"
              className={styles.emailLink}
              whileHover={{
                scale: 1.05,
                color: "var(--color-accent)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              fuschteyy@gmail.com
            </motion.a>
          </motion.p>
        </motion.div>
      </div>

      {/* Картка сертифіката */}
      <div
        className={styles.cardContainer}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          mouseX.set(180); // Скидаємо позицію миші
          mouseY.set(150);
        }}
      >
        <motion.div
          className={styles.card}
          style={{
            rotateX: smoothX,
            rotateY: smoothY,
            scale,
            transformPerspective: 1000,
          }}
          onClick={() => setIsScaled(!isScaled)}
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="glow"
                className={styles.glow}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.35, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>

          <div className={styles.certificate}>
            <div className={styles.header}>
              <h1 className={styles.certificateTitle}>
                <span>CERTIFICATE</span>
                <span className={styles.goitBadge}>GOIT</span>
              </h1>
              <h2 className={styles.name}>FUSHTEI VOLODYMYR</h2>
            </div>

            <div className={styles.body}>
              <p className={styles.achievement}>
                Has successfully completed <br />
                <span className={styles.course}>FULLSTACK DEVELOPER</span>{" "}
                <br />
                course at GoIT
              </p>

              <div className={styles.divider} />

              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <span>Date</span>
                  <span className={styles.detailValue}>21/01/2025</span>
                </div>
                <div className={styles.detailItem}>
                  <span>ID</span>
                  <span className={styles.detailValue}>35048</span>
                </div>
                <div className={styles.detailItem}>
                  <span>Specialty</span>
                  <span className={styles.detailValue}>FULLSTACK</span>
                </div>
                <div className={styles.detailItem}>
                  <span>Website</span>
                  <span className={styles.detailValue}>goit.global</span>
                </div>
              </div>

              <div className={styles.signature}>
                <div className={styles.signatureLine} />
                <div className={styles.signatureDetails}>
                  <div className={styles.ceo}>CEO of GoIT</div>
                  <div className={styles.ceoName}>Anton Chornyi</div>
                </div>
                <div className={styles.signatureLine} />
              </div>
            </div>

            <div className={styles.watermark}>GOIT</div>
          </div>

          <motion.a
            href="/certificates/FUSHTEI_VOLODYMYR.pdf"
            download
            className={styles.downloadButton}
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Download Certificate</span>
            <i className="ri-download-line" aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Certificate;
