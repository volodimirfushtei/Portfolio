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

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 3,
      ease: "easeOut",
      onComplete: () => {
        setCompleted(true);
        if (onComplete) onComplete();
      },
    });
    return controls.stop;
  }, [count, onComplete]);

  return (
    <Motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={
        completed ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }
      }
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={s.loader_wrapper}
    >
      <div className={s.loader}>
        <div className={s.counter}>
          <Motion.span>{rounded}</Motion.span>
          <span>%</span>
        </div>
        <div className={s.loader_bar_wrapper}>
          <Motion.div className={s.loader_bar} style={{ width }} />
        </div>
      </div>
    </Motion.div>
  );
};

export default Loader;
