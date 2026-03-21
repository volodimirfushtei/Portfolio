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

  const currentRef = { value: 0 };

  const runStep = (target, speed) => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        currentRef.value += 1;
        setProgress(currentRef.value);

        if (currentRef.value >= target) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  };

  const run = async () => {
    await runStep(30, 18);
    await new Promise(r => setTimeout(r, 200));

    await runStep(65, 12);
    await new Promise(r => setTimeout(r, 200));

    await runStep(85, 22);
    await new Promise(r => setTimeout(r, 200));

    await runStep(100, 8);
  };

  run();
}, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setPhase("reveal"), 400);
      setTimeout(() => setPhase("done"), 1800);
      setTimeout(() => setIsLoading(false), 3200);
    }
  }, [progress]);

  // GSAP Curtain Animation
  useEffect(() => {
    if (phase === "reveal") {
      gsap.to(containerRef.current, {
  filter: "blur(8px)",
  duration: 0.6
      });
      gsap.fromTo(curtainRefs.current,
  { scaleY: 1 },
  { scaleY: 1.2, y: "-100%", stagger: 0.1 }
);
      gsap.to(curtainRefs.current, {
        y: "-100%",
        duration: 0.8,
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
