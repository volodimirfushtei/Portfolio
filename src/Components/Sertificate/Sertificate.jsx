import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import styles from "./Sertificate.module.css";

const Certificate = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);


  // Responsive Check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Time update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // GSAP Magnetic Tilt (Subtle)
  const handleMouseMove = useCallback((e) => {
    if (isMobile || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile || !cardRef.current) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [isMobile]);

  return (
    <section className={styles.section}>
      {/* ── Visual Overlays ── */}
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.scanlines} aria-hidden="true" />

      <div className={styles.wrapper}>
        {/* Info Column */}
        <div className={styles.infoContainer} data-scroll data-speed="0.2" data-scroll-delay="0.2">
          <motion.div
            className={styles.infoSubtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.eyebrowLine} />
            <span className={styles.infoSubtitleText}>Ivano-Frankivsk, Ukraine</span>
          </motion.div>

          <motion.h2
            className={styles.infoTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Local time
            <span className={`${styles.time} ${styles.timeShimmer}`}>
              {formattedTime}
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <p className={styles.infoText}>
              Collaborating across borders. <br />
              <a href="mailto:fuschteyy@gmail.com" className={styles.emailLink}>
                fuschteyy@gmail.com
              </a>
            </p>
          </motion.div>
        </div>

        {/* Card Column */}
        <div className={styles.cardContainer} data-cursor="hover"
          data-cursor-type="link"
          data-scroll
          data-speed="0.4"
          data-scroll-delay="0.2"
          data-cursor-text="GOIT sertificate"  >
          <motion.div
            className={styles.card}

            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: -15, rotateX: 15, rotateZ: 5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.certificate}>
              <div className={styles.certificateHeader}>
                <div className={styles.certLabel}>
                  <span className={styles.certLabelText}>CERTIFICATE</span>
                  <span className={styles.goitBadge}>GOIT</span>
                </div>
                <h3 className={styles.userName}>FUSHTEI VOLODYMYR</h3>
              </div>

              <div className={styles.body}>
                <p className={styles.achievement}>
                  Has successfully completed <br />
                  <span className={styles.courseName}>FULLSTACK DEVELOPER</span>
                </p>

                <div className={styles.details}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Date</span>
                    <span className={styles.detailValue}>21/01/2025</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>ID</span>
                    <span className={styles.detailValue}>35048</span>
                  </div>
                </div>
              </div>

              <div className={styles.watermark}>GOIT</div>
            </div>

            <a
              href="/certificates/FUSHTEI_VOLODYMYR.pdf"
              download
              className={styles.downloadButton}
              data-cursor="hover"
              data-cursor-type="link"
              data-cursor-text="Download Sertificate"
            >
              <span className={styles.downloadText}>Download PDF</span>
              <span className={styles.downloadIcon}>→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certificate;
