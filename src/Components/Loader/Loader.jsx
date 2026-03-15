import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading | reveal | done

  const timers = useRef([]);

  useEffect(() => {
    if (!isLoading) return;
    let current = 0;

    const steps = [
      { target: 30, delay: 0, speed: 18 },
      { target: 65, delay: 400, speed: 12 },
      { target: 85, delay: 800, speed: 22 },
      { target: 100, delay: 1100, speed: 8 },
    ];

    steps.forEach(({ target, delay, speed }) => {
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          current += 1;
          setProgress(current);
          if (current >= target) clearInterval(interval);
        }, speed);

        timers.current.push(interval);
      }, delay);

      timers.current.push(timeout);
    });

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current.forEach(clearInterval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setPhase("reveal"), 300);
      setTimeout(() => setPhase("done"), 1800);
      setTimeout(() => setIsLoading(false), 2800);
    }
  }, [progress]);

  const digits = String(progress).padStart(3, "0").split("");

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.overlay}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Grain texture */}
          <div className={styles.grain} aria-hidden="true" />

          {/* Curtain panels that slide up on reveal */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className={styles.curtain}
              style={{ left: `${i * 20}%` }}
              animate={
                phase === "reveal" || phase === "done"
                  ? { y: "-100%" }
                  : { y: "0%" }
              }
              transition={{
                duration: 0.9,
                ease: [0.76, 0, 0.24, 1],
                delay: i * 0.08,
              }}
            />
          ))}

          {/* Top bar */}
          <div className={styles.topBar}>
            <motion.span
              className={styles.brandName}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              VF / PORTFOLIO
            </motion.span>
            <motion.span
              className={styles.year}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              2025
            </motion.span>
          </div>

          {/* Center content */}
          <div className={styles.center}>
            {/* Big counter */}
            <div
              className={styles.counterWrap}
              aria-label={`Loading ${progress}%`}
            >
              {digits.map((d, i) => (
                <motion.span
                  key={`${i}-${d}`}
                  className={styles.digit}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
                >
                  {d}
                </motion.span>
              ))}
              <span className={styles.pct}>%</span>
            </div>

            {/* Tagline that types in */}
            <motion.p
              className={styles.tagline}
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > 20 ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              {progress < 40 && "Initializing experience"}
              {progress >= 40 && progress < 75 && "Crafting interfaces"}
              {progress >= 75 && progress < 100 && "Almost there"}
              {progress >= 100 && "Welcome"}
            </motion.p>
          </div>

          {/* Progress track */}
          <div className={styles.trackWrap}>
            <div className={styles.track}>
              <motion.div
                className={styles.fill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className={styles.trackLabels}>
              <span className={styles.trackLabel}>Loading</span>
              <span className={styles.trackLabel}>Complete</span>
            </div>
          </div>

          {/* Bottom bar */}
          <div className={styles.bottomBar}>
            <motion.span
              className={styles.statusText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Frontend developer — React / Next.js / Motion
            </motion.span>
            <motion.span
              className={styles.statusDot}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
