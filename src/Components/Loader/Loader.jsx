import React, { useEffect, useState } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import s from "./Loader.module.css";

const Loader = ({ onComplete, showSpinner = true }) => {
  const progress = useMotionValue(0);
  const percent = useTransform(progress, (v) => Math.floor(v));
  const width = useTransform(progress, (v) => `${v}%`);
  const [done, setDone] = useState(false);
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 2.5,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (latest) => {
        setDisplayPercent(Math.floor(latest));
      },
      onComplete: () => {
        setDone(true);
        onComplete?.();
      },
    });
    return () => controls.stop();
  }, [progress, onComplete]);

  return (
    <motion.div
      className={s.loader}
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className={s.loaderBox}>
        <motion.div className={s.progressBar} style={{ width }}>
          <i className={`ri-spinner-line ${s.spinner}`} />
        </motion.div>
        <motion.div className={s.percent}>{displayPercent}%</motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
