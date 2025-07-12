import React from "react";
import styles from "./HeroMedia.module.css";

const HeroMedia = () => {
  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.video}
          poster="/images/pexels-jorge.jpg"
        >
          <source src="src/assets/Cyber.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className={styles.overlay}>
          <div className={styles.badge} role="status" aria-live="polite">
            <span className={styles.pulseDot} aria-hidden="true"></span>
            <span>Available for work</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <h3>My Creative Process</h3>
        <p>
          Combining technical expertise with design thinking to build
          exceptional digital experiences
        </p>
      </div>
    </div>
  );
};

export default HeroMedia;
