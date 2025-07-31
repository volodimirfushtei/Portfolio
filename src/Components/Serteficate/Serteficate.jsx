import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import styles from "./Serteficate.module.css";

const Certificate = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isScaled, setIsScaled] = useState(false);
  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [0, window.innerHeight], [5, -5]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-5, 5]);

  const smoothX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  const scale = useSpring(isScaled ? 2.6 : 1, {
    stiffness: 200,
    damping: 20,
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
    <motion.div className={styles.wrapper} onMouseMove={handleMouseMove}>
      <motion.div className={styles.container}>
        <h4>
          From{" "}
          <i
            className="ri-flag-fill"
            style={{ color: "#0057B7", fontSize: "1.5rem" }}
          ></i>{" "}
          with Passion
        </h4>

        <h2>
          Local time -{" "}
          <span className={styles.time}>
            {currentTime.toLocaleTimeString()}
            <i className="ri-time-line" aria-hidden="true"></i>
          </span>
        </h2>

        <p>Got a question?</p>
        <p>
          Email me at{" "}
          <a href="mailto:fuschteyy@gmail.com" className={styles.emailLink}>
            fuschteyy@gmail.com
          </a>
        </p>
      </motion.div>

      <motion.div
        className={`${styles.card} `}
        style={{
          rotateX: smoothX,
          rotateY: smoothY,
          scale,
        }}
        onClick={() => setIsScaled((prev) => !prev)}
      >
        <div className={styles.certificate}>
          <div className={styles.header}>
            <h1 className={styles.certificateTitle}>CERTIFICATE GOIT</h1>
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
