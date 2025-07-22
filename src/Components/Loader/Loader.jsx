import React, { useEffect, useState } from "react";
import s from "./Loader.module.css";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const Loader = ({ onComplete }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));
  const width = useTransform(count, (v) => `${v}%`);

  // Enhanced animation values
  const glowIntensity = useTransform(count, [0, 100], [0.1, 0.8]);
  const blurAmount = useTransform(count, [0, 100], ["blur(12px)", "blur(0px)"]);
  const saturation = useTransform(count, [0, 100], [0.8, 1.5]);
  const particleOpacity = useTransform(count, [0, 100], [0, 0.5]);
  const scale = useTransform(count, [0, 100], [0.9, 1.1]);

  const textGlow = useTransform(
    glowIntensity,
    (v) => `0 0 ${v * 20}px rgba(138, 99, 255, ${v * 1.5})`
  );

  const gradientBg = useTransform(
    count,
    (v) => `linear-gradient(
      90deg, 
      rgba(138, 99, 255, 0.75) 0%, 
      rgba(99, 179, 255, 0.75) ${v}%, 
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
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        pointerEvents: completed ? "none" : "all",
        backdropFilter: blurAmount,
        filter: `saturate(${saturation})`,
      }}
    >
      <motion.div
        className={s.backgroundOverlay}
        style={{
          opacity: useTransform(count, [0, 100], [0.8, 0.2]),
          background: useTransform(
            count,
            [0, 100],
            ["rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0.2)"]
          ),
        }}
      />

      <motion.div
        className={s.loaderCard}
        style={{
          scale,
          boxShadow: textGlow,
        }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 100,
        }}
      >
        <div className={s.contentWrapper}>
          <div className={s.progressIndicator}>
            <motion.span
              className={s.percentage}
              style={{
                textShadow: textGlow,
                color: useTransform(count, [0, 100], ["#8a63ff", "#63b3ff"]),
              }}
            >
              {rounded}
            </motion.span>
            <motion.span
              className={s.percentSymbol}
              style={{
                textShadow: textGlow,
                color: useTransform(count, [0, 100], ["#8a63ff", "#63b3ff"]),
              }}
            >
              %
            </motion.span>
          </div>

          <div className={s.progressBarContainer}>
            <motion.div
              className={s.progressBar}
              style={{
                width,
                background: gradientBg,
              }}
            />
          </div>
        </div>

        <motion.div
          className={s.particles}
          style={{
            opacity: particleOpacity,
            background: useTransform(
              count,
              [0, 100],
              [
                "radial-gradient(circle at center, rgba(138, 99, 255, 0.2) 0%, transparent 70%)",
                "radial-gradient(circle at center, rgba(99, 179, 255, 0.4) 0%, transparent 70%)",
              ]
            ),
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Loader;
