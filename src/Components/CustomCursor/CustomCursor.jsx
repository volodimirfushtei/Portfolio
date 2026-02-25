import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./CustomCursor.module.css";

const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });

  const [ripples, setRipples] = useState([]);
  const rippleId = useRef(0);

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const click = (e) => {
      const newRipple = { id: rippleId.current++, x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(
        () => setRipples((prev) => prev.filter((r) => r.id !== newRipple.id)),
        500,
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", click);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", click);
    };
  }, []);

  // Hover-ефекти для інтерактивних елементів
  useEffect(() => {
    const hoverElements = document.querySelectorAll("[data-cursor='hover']");
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(".cursor", {
          scale: 1.5,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          duration: 0.3,
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(".cursor", {
          scale: 1,
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          duration: 0.3,
        });
      });
    });
  }, []);

  return (
    <>
      <motion.div
        className={styles.cursor}
        style={{ translateX: springX, translateY: springY }}
      />
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className={styles.ripple}
          initial={{ scale: 0, opacity: 0.6, filter: "blur(8px)" }}
          animate={{ scale: 5, opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
