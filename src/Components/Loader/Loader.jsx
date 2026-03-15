import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import styles from "./Loader.module.css";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading | reveal | done

  const containerRef = useRef(null);
  const curtainRefs = useRef([]);
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
          if (current >= target) {
            clearInterval(interval);
          }
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
      setTimeout(() => setPhase("reveal"), 400);
      setTimeout(() => setPhase("done"), 1800);
      setTimeout(() => setIsLoading(false), 2800);
    }
  }, [progress]);

  // GSAP Curtain Animation
  useEffect(() => {
    if (phase === "reveal") {
      gsap.to(curtainRefs.current, {
        y: "-100%",
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.inOut",
      });
      
      // Fade out textual content
      gsap.to(`.${styles.topBar}, .${styles.center}, .${styles.trackWrap}, .${styles.bottomBar}`, {
        opacity: 0,
        y: -40,
        duration: 0.8,
        ease: "power3.in"
      });
    }
  }, [phase]);

  const digits = String(progress).padStart(3, "0").split("");

  return (
    <AnimatePresence>
      {isLoading && (
        <div className={styles.overlay} ref={containerRef}>
          {/* Visual Overlays */}
          <div className={styles.noise} aria-hidden="true" />
          <div className={styles.scanlines} aria-hidden="true" />

          {/* Curtain panels */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              ref={(el) => (curtainRefs.current[i] = el)}
              className={styles.curtain}
              style={{ left: `${i * 20}%` }}
            />
          ))}

          {/* Top bar */}
          <div className={styles.topBar}>
            <span className={styles.brandName}>VF / PORTFOLIO</span>
            <span className={styles.year}>2025</span>
          </div>

          {/* Center content */}
          <div className={styles.center}>
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
              Motion Specialist / Crafting Digital Excellence
            </span>
            <motion.span
              className={styles.statusDot}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
