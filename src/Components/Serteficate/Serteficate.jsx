import React, { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

import styles from "./Serteficate.module.css";
import FadeInAnimate from "./../FadeInAnimate/FadeInAnimate";

const Certeficate = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isScaled, setIsScaled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [0, window.innerHeight], [8, -8]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-8, 8]);

  const smoothX = useSpring(rotateX, { stiffness: 150, damping: 25 });
  const smoothY = useSpring(rotateY, { stiffness: 150, damping: 25 });

  const scale = useSpring(isScaled ? 1.8 : 1, {
    stiffness: 200,
    damping: 25,
  });

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.wrapper}>
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
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              <i className="ri-flag-fill"></i>
            </motion.span>{" "}
            with Passion
          </h4>

          <h2 className={styles.infoTitle}>
            Local time -{" "}
            <motion.span
              className={styles.time}
              animate={{ color: ["#4368ff", "#ff5252", "#4368ff"] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              {currentTime.toLocaleTimeString()}
              <i className="ri-time-line" aria-hidden="true"></i>
            </motion.span>
          </h2>

          <motion.p className={styles.infoText} whileHover={{ x: 5 }}>
            Got a question?
          </motion.p>

          <motion.p className={styles.infoText}>
            Email me at{" "}
            <motion.a
              href="mailto:fuschteyy@gmail.com"
              className={styles.emailLink}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 2px 8px rgba(67, 104, 255, 0.3)",
              }}
            >
              fuschteyy@gmail.com
            </motion.a>
          </motion.p>
        </motion.div>
      </div>

      <div
        className={styles.cardContainer}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className={styles.card}
          style={{
            rotateX: smoothX,
            rotateY: smoothY,
            scale,
          }}
          onClick={() => setIsScaled(!isScaled)}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glow effect */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className={styles.glow}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>

          <div className={styles.certificate}>
            {/* Decorative elements */}
            <div className={styles.corner}></div>
            <div className={`${styles.corner} ${styles.cornerRight}`}></div>

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

              <div className={styles.divider}>
                <div className={styles.dividerInner}></div>
              </div>

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
                <div className={styles.signatureLine}></div>
                <div className={styles.signatureDetails}>
                  <div className={styles.ceo}>CEO of GoIT</div>
                  <div className={styles.ceoName}>Anton Chornyi</div>
                </div>
              </div>
            </div>

            <div className={styles.watermark}>GOIT</div>
          </div>

          <motion.a
            href="/images/FUSHTEI_VOLODYMYR.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadButton}
            whileHover={{
              backgroundColor: "#3a5eff",
              boxShadow: "0 4px 12px rgba(58, 94, 255, 0.3)",
            }}
          >
            Download Certificate
            <i className="ri-download-line"></i>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Certeficate;
