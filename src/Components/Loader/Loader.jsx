import React, { useEffect, useState, useRef } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import s from "./Loader.module.css";

const Loader = ({ onComplete, showSpinner = true }) => {
  const progress = useMotionValue(0);
  const percent = useTransform(progress, (v) => Math.floor(v));
  const width = useTransform(progress, (v) => `${v}%`);
  const [done, setDone] = useState(false);
  const [displayPercent, setDisplayPercent] = useState(0);
  const [showSpinnerState, setShowSpinnerState] = useState(false);
  const gridRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  // animate progress
  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 2.5,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (latest) => {
        setDisplayPercent(Math.floor(latest));
        setShowSpinnerState(latest > 0 && latest < 100);
      },
      onComplete: () => {
        setDone(true);
        onComplete?.();
      },
    });
    return () => controls.stop();
  }, [progress, onComplete]);

  // parallax by cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;
      if (gridRef.current) {
        gridRef.current.style.transform = `perspective(800px) rotateX(65deg) rotateY(${x}deg) rotateX(${y}deg)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className={s.loader}
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className={s.gridLines} aria-hidden="true" ref={gridRef} />

      <motion.div className={s.loaderBox}>
        {showSpinner && (
          <motion.i
            className={`ri-spinner-line ${s.spinner}`}
            animate={{ opacity: showSpinnerState ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
        <motion.div className={s.progressBar} style={{ width }} />
        <motion.div className={s.percent}>{displayPercent}%</motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
