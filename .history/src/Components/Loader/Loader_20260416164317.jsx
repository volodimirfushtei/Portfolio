import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Loader.module.css";
import NoiseOverlay from "../NoiseOverlay/NoiseOverlay";
import Logo from "../Logo/Logo";

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  // ⚡ smooth RAF progress (без setInterval)
  useEffect(() => {
    let start = performance.now();

    const update = (t) => {
      const elapsed = t - start;

      // easing (Webflow-style)
      const p = Math.min(elapsed / 1800, 1);
      const eased = 1 - Math.pow(1 - p, 3);

      setProgress(Math.floor(eased * 100));

      if (p < 1) {
        requestAnimationFrame(update);
      } else {
        setDone(true);
        setTimeout(() => {
          onComplete?.();
        }, 600);
      }
    };

    requestAnimationFrame(update);
  }, [onComplete]);

  const digits = String(progress).padStart(3, "0").split("");

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <NoiseOverlay />

          {/* CENTER */}
          <div className={styles.center}>
            <motion.div
              className={styles.logo}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Logo />
            </motion.div>

            {/* COUNTER */}
            <div className={styles.counter}>
              {digits.map((d, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {d}
                </motion.span>
              ))}
              <span className={styles.percent}>%</span>
            </div>

            {/* TAGLINE */}
            <motion.p
              className={styles.tagline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Loading Experience...
            </motion.p>
          </div>

          {/* PROGRESS BAR */}
          <div className={styles.progress}>
            <motion.div
              className={styles.bar}
              style={{ scaleX: progress / 100 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;