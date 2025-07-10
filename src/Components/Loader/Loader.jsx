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
  const rounded = useTransform(count, (latest) => Math.floor(latest));
  const width = useTransform(count, (latest) => `${latest}%`);
  const glowIntensity = useTransform(count, [0, 100], [0.1, 0.3]);
  const blurIntensity = useTransform(count, [0, 100], [8, 2]);

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
      initial={{ opacity: 1 }}
      animate={completed ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={s.loader_wrapper}
      style={{
        pointerEvents: completed ? "none" : "auto",
        backdropFilter: blurIntensity,
        backgroundImage: "url(/images/robs.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        boxShadow: useTransform(
          glowIntensity,
          (v) => `0 0 ${v * 40}px rgba(138, 99, 255, ${v * 1.5})`
        ),
        transition:
          "backdrop-filter 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Motion.div
        className={s.loader}
        style={{
          boxShadow: useTransform(
            glowIntensity,
            (v) => `0 0 ${v * 40}px rgba(138, 99, 255, ${v * 1.5})`
          ),
          transition: "box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className={s.counter}>
          <Motion.span
            style={{
              textShadow: useTransform(
                glowIntensity,
                (v) => `0 0 ${v * 15}px rgba(138, 99, 255, ${v * 1.2})`
              ),
              transition: "text-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {rounded}
          </Motion.span>
          <span>%</span>
        </div>

        <div className={s.loader_bar_wrapper}>
          <Motion.div
            className={s.loader_bar}
            style={{
              width,
              background: useTransform(
                count,
                (v) => `linear-gradient(90deg, 
                rgba(138, 99, 255, 0.95) 0%, 
                rgba(99, 179, 255, 0.95) ${v}%, 
                rgba(255, 255, 255, 0.2) ${v}%)`
              ),
              boxShadow: useTransform(
                glowIntensity,
                (v) => `0 0 ${v * 15}px rgba(138, 99, 255, ${v})`
              ),
            }}
          />
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
