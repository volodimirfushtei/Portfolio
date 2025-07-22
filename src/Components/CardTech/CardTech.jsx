import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./CardTech.module.css";

const CardTechAutoFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [manualFlip, setManualFlip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Визначаємо тип пристрою при завантаженні та при зміні розміру
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Автоматичний переворот кожні 6с, якщо не було ручного перевороту
  useEffect(() => {
    if (manualFlip || isMobile) return; // На мобільних вимикаємо авто-переворот

    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 6000);

    return () => clearInterval(interval);
  }, [manualFlip, isMobile]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setManualFlip(true);
  };

  // Спеціальні налаштування для мобільних пристроїв
  const cardHeight = isMobile ? "400px" : isTablet ? "500px" : "600px";
  const textSize = isMobile ? "text-sm" : "text-base";

  return (
    <div
      className={`flex w-full justify-center items-center min-h-screen px-4 ${styles.container}`}
    >
      <motion.div
        className={`relative w-full max-w-4xl ${styles.cardWrapper}`}
        style={{ height: cardHeight }}
        onClick={handleFlip}
        onKeyDown={(e) => e.key === "Enter" && handleFlip()}
        role="button"
        aria-label="Flip technology card"
        tabIndex={0}
        whileHover={{ scale: !isMobile ? 1.02 : 1 }} // На мобільних вимикаємо hover-ефект
        whileTap={{ scale: 0.98 }}
      >
        {/* Основа картки */}
        <motion.div
          className={`relative w-full h-full ${styles.cardInner}`}
          style={{
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateY: isFlipped ? 180 : 0,
            transition: {
              type: "spring",
              damping: isMobile ? 20 : 15, // Більше демпфування для мобільних
              stiffness: 100,
            },
          }}
        >
          {/* Передня сторона */}
          <motion.div
            className={`absolute inset-0 ${styles.frontSide}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: isFlipped ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.videoContainer}>
              <video
                autoPlay
                muted
                loop
                playsInline
                className={styles.video}
                poster="/images/pexels-digi.jpg"
              >
                <source src="src/assets/Web_developer.mp4" type="video/mp4" />
              </video>
            </div>

            <div className={styles.frontContent}>
              <span className={styles.badge}>Featured</span>
              <div className={styles.autoFlipText}>
                {manualFlip
                  ? "Tap to flip"
                  : isMobile
                  ? "Tap to view info"
                  : "Auto-flips every 6s. Click to pause"}
              </div>
            </div>
          </motion.div>

          {/* Задня сторона */}
          <motion.div
            className={`absolute inset-0 ${styles.backSide}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: isFlipped ? 1 : 0,
              transition: { delay: isFlipped ? 0.3 : 0 },
            }}
          >
            <div className={styles.splitContainer}>
              {/* Ліва частина - фото */}
              <div className={styles.leftSide}>
                <img
                  src="/images/My_photo.png"
                  alt="Developer portrait"
                  loading="lazy"
                />
              </div>

              {/* Права частина - код */}
              <div className={styles.rightSide}>
                <img
                  src="/images/pex_code.jpg"
                  alt="Code background"
                  loading="lazy"
                />
                <div className={styles.initials}>VF</div>
              </div>
            </div>

            {/* Основний текст */}
            <div className={`${styles.mainText} ${textSize}`}>
              <h2>Freelance Web Developer</h2>
              <h1>
                <span className={styles.nameHighlight}>Volodymyr</span> Fushtei
              </h1>
              <p>
                Hi there! I'm a junior freelance web developer from Ukraine. I
                have a strong passion for creating visually stunning and
                user-friendly websites.
              </p>
            </div>

            {/* Кнопка */}
            <div className={styles.buttonWrapper}>
              <motion.button
                className={styles.flipButton}
                whileHover={{ scale: !isMobile ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View</span>
                <i className="ri-arrow-right-line" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Індикатор авто-перевороту (тільки для десктопу) */}
        {!manualFlip && !isMobile && (
          <motion.div
            className={styles.autoFlipIndicator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className={styles.indicatorDot}></div>
            <div>Auto-flip</div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CardTechAutoFlip;
