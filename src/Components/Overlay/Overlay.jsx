import React, { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import s from "./Overlay.module.css";

const Overlay = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Прибрати оверлей через 1.5 сек (після анімації)
    const timer = setTimeout(() => setIsVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={s.overlayContainer}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Motion.div
          key={i}
          className={s.column}
          style={{ left: `${i * 20}%` }}
          initial={{ y: "0%" }}
          animate={{ y: "100%" }}
          transition={{
            duration: 0.9,
            ease: [0.76, 0, 0.24, 1],
            delay: i * 0.08,
          }}
        />
      ))}
    </div>
  );
};

export default Overlay;
