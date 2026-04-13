import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import styles from "./Loader.module.css";
import NoiseOverlay from "../NoiseOverlay/NoiseOverlay";

const images = [
  {
    id: 0,
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    fallback: "/images/loader/code.jpg",
    width: 500,
    height: 1080,
    alt: "Code abstraction",
    border: "1px solid #ccc"
  },
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop",
    fallback: "/images/loader/design.jpg",
    width: 500,
    height: 1080,
    alt: "UI Design",
    border: "1px solid #ccc"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    fallback: "/images/loader/tech.jpg",
    width: 500,
    height: 1080,
    alt: "Technology",
    border: "1px solid #ccc"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    fallback: "/images/loader/creative.jpg",
    width: 500,
    height: 1080,
    alt: "Creative thinking",
    border: "1px solid #ccc"
  },
];

const Loader = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading");
  const [isMounted, setIsMounted] = useState(true);

  const containerRef = useRef(null);
  const curtainsContainerRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);

    if (!isLoading) return;

    // Анімація для імені (тільки якщо елементи існують)
    const nameSpans = document.querySelectorAll(`.${styles.nameSpan}`);
    if (nameSpans.length > 0) {
      gsap.fromTo(
        nameSpans,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.2 }
      );
    }

    let currentProgress = 0;
    let intervals = [];

    const runStep = (target, speed) => {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!isMounted) {
            clearInterval(interval);
            resolve();
            return;
          }

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

      await runStep(65, 12);
      await new Promise(r => setTimeout(r, 200));

      await runStep(85, 22);
      await new Promise(r => setTimeout(r, 200));

      await runStep(100, 8);
    };

    runLoading();

    return () => {
      intervals.forEach(clearInterval);
      setIsMounted(false);
    };
  }, [isLoading, isMounted]);

  useEffect(() => {
    if (progress >= 100 && isMounted) {
      const timeout1 = setTimeout(() => setPhase("reveal"), 800);
      const timeout2 = setTimeout(() => {
        setIsLoading(false);
        if (onComplete) onComplete();
      }, 2000);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    }
  }, [progress, isMounted, onComplete]);

  // GSAP Curtain Animation - перевірка наявності елементів
  useEffect(() => {
    if (phase === "reveal" && containerRef.current && isMounted) {
      // Перевіряємо чи є елементи перед анімацією
      const curtains = document.querySelectorAll(`.${styles.curtain}`);

      if (curtains.length === 0) {
        console.warn("No curtain elements found, skipping animation");
        // Якщо немає штор, просто ховаємо лоадер
        setTimeout(() => {
          setIsLoading(false);
          if (onComplete) onComplete();
        }, 500);
        return;
      }

      // Блокуємо помилки GSAP
      try {
        // Blur effect on container
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            filter: "blur(8px)",
            duration: 0.6,
            ease: "power2.in",
            overwrite: true
          });
        }

        // Curtain animation
        gsap.to(curtains, {
          y: "-100%",
          duration: 0.8,
          stagger: 0.08,
          ease: "power4.inOut",
          overwrite: true
        });

        // Fade out textual content
        const elementsToFade = [
          `.${styles.topBar}`,
          `.${styles.center}`,
          `.${styles.trackWrap}`,
          `.${styles.bottomBar}`
        ];

        elementsToFade.forEach(selector => {
          const el = document.querySelector(selector);
          if (el) {
            gsap.to(el, {
              opacity: 0,
              y: -30,
              duration: 0.6,
              ease: "power3.in",
              overwrite: true
            });
          }
        });
      } catch (error) {
        console.error("GSAP animation error:", error);
        // Якщо помилка, просто ховаємо лоадер
        setTimeout(() => {
          setIsLoading(false);
          if (onComplete) onComplete();
        }, 500);
      }
    }
  }, [phase, isMounted, onComplete]);

  // Обробка помилки WebGL
  useEffect(() => {
    const handleContextLost = (event) => {
      event.preventDefault();
      console.warn("WebGL context lost");
      // Продовжуємо роботу без 3D
    };

    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.addEventListener("webglcontextlost", handleContextLost);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("webglcontextlost", handleContextLost);
      }
    };
  }, []);

  const digits = String(Math.min(progress, 100)).padStart(3, "0").split("");

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.overlay}
          ref={containerRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NoiseOverlay />

          {/* Curtain panels */}
          <div className={styles.curtainsContainer} ref={curtainsContainerRef}>
            {images.map((img) => (
              <div
                key={img.id}
                className={styles.curtain}
                style={{ backgroundImage: `url(${img.src})` }}
              />
            ))}
          </div>

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
                  <span className={`${styles.nameSpan} ${styles.firstName}`}>VOLODYMYR</span>
                </div>
                <div className={styles.nameMask}>
                  <span className={`${styles.nameSpan} ${styles.lastName}`}>FUSHTEI</span>
                </div>
              </h1>
            </div>

            <div className={styles.counterWrap}>
              {digits.map((d, i) => (
                <span key={`${i}-${d}`} className={styles.digit}>
                  {d}
                </span>
              ))}
              <span className={styles.pct}>%</span>
            </div>

            <p className={styles.tagline}>
              {progress < 40 && "Digital Genesis"}
              {progress >= 40 && progress < 75 && "Compiling Visions"}
              {progress >= 75 && progress < 100 && "Synchronizing"}
              {progress >= 100 && "Ready"}
            </p>
          </div>

          {/* Progress track */}
          <div className={styles.trackWrap}>
            <div className={styles.track}>
              <div className={styles.fill} style={{ width: `${progress}%` }} />
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
