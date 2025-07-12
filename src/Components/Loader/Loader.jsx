import React, { useEffect, useState } from "react";
import s from "./Loader.module.css";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const Loader = ({ onComplete }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));
  const width = useTransform(count, (v) => `${v}%`);

  // Enhanced animation values
  const glowIntensity = useTransform(count, [0, 100], [0.1, 0.5]);
  const blurAmount = useTransform(count, [0, 100], [12, 4]);
  const saturation = useTransform(count, [0, 100], [0.8, 1.2]);
  const particleOpacity = useTransform(count, [0, 100], [0, 0.3]);

  const boxShadow = useTransform(
    glowIntensity,
    (v) => `0 0 ${v * 50}px rgba(138, 99, 255, ${v * 2})`
  );

  const textGlow = useTransform(
    glowIntensity,
    (v) => `0 0 ${v * 20}px rgba(255, 255, 255, ${v * 1.5})`
  );

  const gradientBg = useTransform(
    count,
    (v) => `linear-gradient(
      90deg, 
      rgba(138, 99, 255, 0.95) 0%, 
      rgba(99, 179, 255, 0.95) ${v}%, 
      rgba(255, 255, 255, 0.1) ${v}%
    )`
  );

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 2.8,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        setCompleted(true);
        onComplete?.();
      },
    });
    return controls.stop;
  }, [count, onComplete]);

  return (
    <motion.div
      className={s.loaderContainer}
      initial={{ opacity: 1 }}
      animate={{ opacity: completed ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        pointerEvents: completed ? "none" : "all",
        backdropFilter: blurAmount,
        filter: `saturate(${saturation})`,
      }}
    >
      <div className={s.backgroundOverlay} />

      <motion.div
        className={s.loaderCard}
        style={{ boxShadow }}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.6,
          ease: "backOut",
        }}
      >
        <div className={s.progressIndicator}>
          <motion.span
            className={s.percentage}
            style={{ textShadow: textGlow }}
          >
            {rounded}
          </motion.span>
          <span className={s.percentSymbol}>%</span>
        </div>

        <div className={s.progressBarContainer}>
          <motion.div
            className={s.progressBar}
            style={{
              width,
              background: gradientBg,
            }}
          />
          <p className={s.loadingText}>Buffering</p>
        </div>

        <motion.div
          className={s.particles}
          style={{ opacity: particleOpacity }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Loader;
