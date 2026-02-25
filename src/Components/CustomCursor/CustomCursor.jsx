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
    const hoverEls = document.querySelectorAll("a, button, .interactive");

    const onHover = () => {
      gsap.to(".cursor", {
        scale: 3,
        backgroundColor: "rgba(255,0,255,0.7)",
        borderColor: "#ff00ff",
        boxShadow: "0 0 20px #ff00ff66",
        duration: 0.3,
      });
    };

    const onLeave = () => {
      gsap.to(".cursor", {
        scale: 1,
        backgroundColor: "rgba(203,194,194,0.7)",
        borderColor: "#fff",
        boxShadow: "0 0 0px transparent",
        duration: 0.3,
      });
    };

    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", onHover);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", onHover);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
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
