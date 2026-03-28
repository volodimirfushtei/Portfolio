import {
  hover,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./CustomCursor.module.css";
import { set } from "react-hook-form";

const CustomCursor = () => {
  const location = useLocation();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorRef = useRef(null);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });
  const [hoverText, setHoverText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState([]);
  const rippleId = useRef(0);

  // Використовуємо useTransform для масштабу
  const scale = useTransform(useMotionValue(0), [0, 1], [1, 1.5]);

  useEffect(() => {
    // Встановлюємо початкові координати в центр
    cursorX.set(window.innerWidth / 2);
    cursorY.set(window.innerHeight / 2);
  }, []);

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

  // Hover-ефекти з Framer Motion
  useEffect(() => {
    const addHoverEffects = () => {
      const hoverElements = document.querySelectorAll("[data-cursor='hover']");

      hoverElements.forEach((el) => {
        if (el.hasAttribute("data-cursor-listener")) return;

        el.setAttribute("data-cursor-listener", "true");
        // Отримуємо текст з атрибута data-cursor-text
        const text =
          el.getAttribute("data-cursor-text") ||
          el.getAttribute("aria-label") ||
          el.textContent?.trim() ||
          "Click";

        el.addEventListener("mousemove", (e) => {
          // Встановлюємо hover-текст
          setIsHovering(true);
          setHoverText(text);

          // Встановлюємо координати
          cursorX.set(e.clientX);
          cursorY.set(e.clientY);

        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setHoverText("");
        });
      });
    

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
          scale: isHovering ? 4 : 1,
          mixBlendMode: isHovering ? "difference" : "normal",
          background: isHovering ? "transparent" : "var(--color-accent)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <span
        className={styles.cursorText}
        style={{
          translateX: springX,
          translateY: springY,
          scale,
          mixBlendMode: isHovering ? "difference" : "normal",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {hoverText}
      </span>
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className={styles.ripple}
          initial={{ scale: 0, opacity: 0.6, filter: "blur(8px)" }}
          animate={{ scale: 1, opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
