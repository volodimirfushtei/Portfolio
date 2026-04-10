import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import s from "./Overlay.module.css";

/* ── Синхронизировать с App.jsx ── */
const OVERLAY_HIDE_DELAY = 4500; // 4500ms (Loader) - 1200ms (exit animation)

const Overlay = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), OVERLAY_HIDE_DELAY);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          className={s.overlayContainer}
          style={{ pointerEvents: "none" }}
        >
          {[0, 1, 2, 4].map((i) => (
            <motion.div
              key={i}
              className={s.column}
              style={{ left: `${i * 25}%` }}
              initial={{ y: "0%" }}
              animate={{ y: "100%" }}
              exit={{ y: "100%" }}
              transition={{
                duration: 1.5,
                ease: [0.76, 0, 0.24, 1],
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default Overlay;
