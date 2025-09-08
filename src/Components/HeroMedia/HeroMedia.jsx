import React from "react";
import styles from "./HeroMedia.module.css";
import Src from "/images/preview.png";
const HeroMedia = () => {
  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <img
          src={Src}
          width={300}
          height={200}
          alt={"my photo"}
          className={styles.image}
        ></img>

        <div className={styles.overlay}>
          <div className={styles.badge} role="status" aria-live="polite">
            <span className={styles.pulseDot} aria-hidden="true"></span>
            <span className={styles.text}>Available for work</span>
            <span className={styles.pulseText} aria-hidden="true">
              <a
                href="https://djinni.co/my/profile/"
                target="_blank"
                className="    "
              >
                Follow
              </a>
            </span>
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
