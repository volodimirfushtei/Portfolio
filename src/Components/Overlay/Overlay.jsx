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
    <Motion.div
      initial={{ x: 0 }}
      animate={{ x: "100%" }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className={s.overlay}
    />
  );
};

export default Overlay;
