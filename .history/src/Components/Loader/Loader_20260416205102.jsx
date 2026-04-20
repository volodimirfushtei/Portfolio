import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Loader.module.css";
import NoiseOverlay from "../NoiseOverlay/NoiseOverlay";
import Logo from "../Logo/Logo";

const images = [
  {id: 0,
    srcSmall: "/images/sity-portrait.webp",
    src: "/images/sity",
    srcMedium: "/images/sity-portrait-medium.webp",
    alt: "Technology",
  },
  {
    id: 1,
    srcSmall: "/images/preview-portrait.webp",
    src: "/images/preview.webp",
    srcMedium: "/images/preview-portrait-medium.webp",
    alt: "UI Design",
  },
  {
    id: 2,
    srcSmall: "/images/sity-portrait.webp",
    src: "/images/sity.webp",
    srcMedium: "/images/sity-portrait-medium.webp",
    alt: "Web Development",
  },

  
];

const Loader = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showSlides, setShowSlides] = useState(false);
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    let intervals = [];

    const runStep = (target, speed) => {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          currentProgress += 1;
          setProgress(Math.min(currentProgress, target));

          if (currentProgress >= target) {
            clearInterval(interval);
            resolve();
          }
        }, speed);
        intervals.push(interval);
      });
    };

    const runLoading = async () => {
      await runStep(30, 18);
      await new Promise(r => setTimeout(r, 200));
      setShowName(true);

      await runStep(65, 12);
      await new Promise(r => setTimeout(r, 200));
      setShowLogo(true);

      await runStep(85, 22);
      await new Promise(r => setTimeout(r, 200));
      setShowSlides(true);

      await runStep(100, 8);
    };

    runLoading();

    return () => {
      intervals.forEach(clearInterval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        if (onComplete) onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  const digits = String(Math.min(progress, 100)).padStart(3, "0").split("");

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NoiseOverlay />

          {/* Curtain panels - залишаємо без змін */}
          <div className={styles.curtainsContainer}>
            {images.map((img) => (
              <motion.div
                key={img.id}
                className={styles.curtain}
                style={{ backgroundImage: `url(${img.src})` }}
                initial={{ y: 0 }}
                animate={progress >= 100 ? { y: "-100%" } : {}}
                transition={{ duration: 0.8, delay: img.id * 0.08 }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.div
            className={styles.logo}
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={showLogo ? { scale: 1, opacity: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
          >
            <Logo />
          </motion.div>

          {/* Slides preview - ВИПРАВЛЕНО */}
          <motion.div
            className={styles.slidesWrapper}
            initial={{ opacity: 0, x: 100 }}
            animate={showSlides ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.slidesContainer}>
              {images.slice(0, 3).map((img, index) => (  // Додано slice(0,3)
                <motion.div
                  key={img.id}
                  className={styles.previewSlide}  // Змінено з curtain на previewSlide
                  initial={{ opacity: 0, x: 50 }}
                  animate={showSlides ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                        <picture>
        <source
          media="(max-width: 480px)"
          srcSet={img.srcSmall}
          width="140"
          height="278"
        />
        <source
          media="(max-width: 768px)"
          srcSet={img.srcMedium}
          width="280"
          height="556"
        />
        <img
          src={img.src}
          alt={img.alt}
          className={styles.previewImage}
          loading="lazy"
          width="600"
          height="905"
        />
      </picture>
                  <div className={styles.previewOverlay} />
                  <span className={styles.previewNumber}>0{index + 1}</span>
                </motion.div>
              ))}
            </div>
            <p className={styles.slidesHint}>Loading portfolio projects...</p>
          </motion.div>

          {/* Top bar */}
          <div className={styles.topBar}>
            <span className={styles.brandName}>VF / PORTFOLIO</span>
            <span className={styles.year}>2026</span>
          </div>

          {/* Center content */}
          <div className={styles.center}>
            <div className={styles.nameWrap}>
              <h1 className={styles.developerName}>
                <div className={styles.nameMask}>
                  <motion.span
                    className={`${styles.nameSpan} ${styles.firstName}`}
                    initial={{ y: 40, opacity: 0 }}
                    animate={showName ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    VOLODYMYR
                  </motion.span>
                </div>
                <div className={styles.nameMask}>
                  <motion.span
                    className={`${styles.nameSpan} ${styles.lastName}`}
                    initial={{ y: 40, opacity: 0 }}
                    animate={showName ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.25 }}
                  >
                    FUSHTEI
                  </motion.span>
                </div>
              </h1>
            </div>

            <div className={styles.counterWrap}>
              {digits.map((d, i) => (
                <motion.span
                  key={`${i}-${d}`}
                  className={styles.digit}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  {d}
                </motion.span>
              ))}
              <span className={styles.pct}>%</span>
            </div>

            <motion.p
              className={styles.tagline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {progress < 40 && "Digital Genesis"}
              {progress >= 40 && progress < 70 && "Compiling Visions"}
              {progress >= 70 && progress < 100 && "Loading Portfolio"}
              {progress >= 100 && "Ready"}
            </motion.p>
          </div>

          {/* Progress track */}
          <div className={styles.trackWrap}>
            <div className={styles.track}>
              <motion.div
                className={styles.fill}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className={styles.trackLabels}>
              <span className={styles.trackLabel}>System.load</span>
              <span className={styles.trackLabel}>Verified</span>
            </div>
          </div>

          {/* Bottom bar */}
          <div className={styles.bottomBar}>
            <span className={styles.statusText}>
              Frontend Engineer / Crafting Digital Excellence
            </span>
            <motion.span
              className={styles.statusDot}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          {/* Fade out overlay */}
          {progress >= 100 && (
            <motion.div
              className={styles.fadeOut}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;