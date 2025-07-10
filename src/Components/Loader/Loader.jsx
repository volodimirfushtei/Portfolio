import React, { useEffect, useState } from "react";
import s from "./Loader.module.css";
import {
  motion as Motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

const Loader = ({ onComplete }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));
  const width = useTransform(count, (v) => `${v}%`);
  const glow = useTransform(count, [0, 100], [0.1, 0.3]);
  const blur = useTransform(count, [0, 100], [8, 2]);

  const boxShadow = useTransform(
    glow,
    (v) => `0 0 ${v * 40}px rgba(138, 99, 255, ${v * 1.5})`
  );
  const textShadow = useTransform(
    glow,
    (v) => `0 0 ${v * 15}px rgba(138, 99, 255, ${v * 1.2})`
  );
  const loaderBarBg = useTransform(
    count,
    (v) =>
      `linear-gradient(90deg, 
      rgba(138, 99, 255, 0.95) 0%, 
      rgba(99, 179, 255, 0.95) ${v}%, 
      rgba(255, 255, 255, 0.2) ${v}%)`
  );
  const loaderBarShadow = useTransform(
    glow,
    (v) => `0 0 ${v * 15}px rgba(138, 99, 255, ${v})`
  );

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        setCompleted(true);
        if (onComplete) onComplete();
      },
    });
    return controls.stop;
  }, [count, onComplete]);

  return (
    <Motion.div
      className={s.loader_wrapper}
      initial={{ opacity: 1 }}
      animate={{ opacity: completed ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        pointerEvents: completed ? "none" : "auto",
        backdropFilter: blur,
        backgroundImage: "url(/images/robs.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        boxShadow,
      }}
    >
      <Motion.div className={s.loader} style={{ boxShadow }}>
        <div
          className={s.counter}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={rounded.get()}
        >
          <Motion.span style={{ textShadow }}>{rounded}</Motion.span>
          <span>%</span>
        </div>

        <div className={s.loader_bar_wrapper}>
          <Motion.div
            className={s.loader_bar}
            style={{
              width,
              background: loaderBarBg,
              boxShadow: loaderBarShadow,
            }}
          />
          <p className={s.loader_buffer}>Bufering</p>
        </div>

        <Motion.div
          className={s.loader_particles}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />
      </Motion.div>
    </Motion.div>
  );
};

export default Loader;
