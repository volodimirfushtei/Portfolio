import React, { useState, useEffect, useRef, useCallback } from "react";

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
        <div className={styles.infoContainer} >
          <div
            className={styles.infoSubtitle}
            
          >
            <span className={styles.eyebrowLine} />
            <span className={styles.infoSubtitleText}>Ivano-Frankivsk, Ukraine</span>
          </div>

          <h2
            className={styles.infoTitle}
            
          >
            Local time
            <span className={`${styles.time} ${styles.timeShimmer}`}>
              {formattedTime}
            </span>
          </h2>

          <div
            className={styles.infoButtons}
          >
            <p className={styles.infoText}>
              Collaborating across borders. <br />
              <a href="mailto:fuschteyy@gmail.com" className={styles.emailLink}>
                fuschteyy@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Card Column */}
        <div className={styles.cardContainer} data-cursor="hover"
          data-cursor-type="link"
          data-scroll
          data-cursor-text="GOIT sertificate"  >
          <div
            className={styles.card}

            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={cardRef}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificate;
