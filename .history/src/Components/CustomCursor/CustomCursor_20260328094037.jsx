import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import styles from "./CustomCursor.module.css";

const CustomCursor = () => {
  const location = useLocation();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorRef = useRef(null);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });

  const [isMoved, setIsMoved] = useState(false);
  const [ripples, setRipples] = useState([]);
  const rippleId = useRef(0);

  useEffect(() => {
    // Встановлюємо початкові координати в центр
    cursorX.set(window.innerWidth / 2);
    cursorY.set(window.innerHeight / 2);

    // Невелика затримка для плавної появи
    setTimeout(() => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }, 100);
  }, []);

  useEffect(() => {
    const move = (e) => {
      if (!isMoved) setIsMoved(true);
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
  }, [isMoved]);

  // Hover-ефекти
  useEffect(() => {
    const addHoverEffects = () => {
      const hoverElements = document.querySelectorAll("[data-cursor='hover']");

      hoverElements.forEach((el) => {
        if (el.hasAttribute("data-cursor-listener")) return;

        el.setAttribute("data-cursor-listener", "true");

        el.addEventListener("mouseenter", () => {
          if (cursorRef.current) {
            gsap.to(cursorRef.current, {
              scale: 2,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });

        el.addEventListener("mouseleave", () => {
          if (cursorRef.current) {
            gsap.to(cursorRef.current, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      });
    };

    const timeout = setTimeout(addHoverEffects, 150);
    const observer = new MutationObserver(() => addHoverEffects());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [location]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className={styles.cursor}
        style={{
          translateX: springX,
          translateY: springY,
          opacity: isMoved ? 1 : 0.8,
        }}
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
