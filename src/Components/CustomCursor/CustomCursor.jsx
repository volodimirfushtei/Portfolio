import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.css";

const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { damping: 20, stiffness: 300 });
  const springY = useSpring(cursorY, { damping: 20, stiffness: 300 });

  const [ripples, setRipples] = useState([]);
  const rippleId = useRef(0);

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const click = (e) => {
      const newRipple = {
        id: rippleId.current++,
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 500);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", click);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", click);
    };
  }, []);

  return (
    <>
      {/* Курсор */}
      <motion.div
        className={styles.cursor}
        style={{
          translateX: springX,
          translateY: springY,
        }}
      />
      View
      {/* Ripple (хвилі) */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className={styles.ripple}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 5, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            left: r.x,
            top: r.y,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
