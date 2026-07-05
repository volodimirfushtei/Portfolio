import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./CustomCursor.module.css";

const CustomCursor = () => {
  const location = useLocation();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 25 });
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 25 });

  const [ripples, setRipples] = useState([]);
  const [hoverText, setHoverText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const rippleId = useRef(0);
  const isMobile = useRef(false);

  useEffect(() => {
    // Перевірка на мобільний пристрій
    isMobile.current = window.innerWidth < 768;
    if (isMobile.current) return;

    // Initial position
    cursorX.set(window.innerWidth / 2);
    cursorY.set(window.innerHeight / 2);

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const enter = () => setIsHidden(false);
    const leave = () => setIsHidden(true);

    const click = (e) => {
      const newRipple = { id: rippleId.current++, x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(
        () => setRipples((prev) => prev.filter((r) => r.id !== newRipple.id)),
        800
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", click);
    window.addEventListener("mouseenter", enter);
    window.addEventListener("mouseleave", leave);

    // Оновлення при ресайзі
    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
      if (isMobile.current) {
        document.body.classList.remove(styles.noCursorBody);
      } else {
        document.body.classList.add(styles.noCursorBody);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", click);
      window.removeEventListener("mouseenter", enter);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const addHoverEffects = () => {
      const elements = document.querySelectorAll(
        "button, input, textarea, select, [data-cursor='hover']"
      );

      elements.forEach((el) => {
        if (el.hasAttribute("data-cursor-listener")) return;
        el.setAttribute("data-cursor-listener", "true");

        const text = el.getAttribute("data-cursor-text") || "";

        el.addEventListener("mouseenter", () => {
          setIsHovering(true);
          setHoverText(text);
        });

        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setHoverText("");
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

  // Hide native cursor globally
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      document.body.classList.add(styles.noCursorBody);
    }
    return () => {
      document.body.classList.remove(styles.noCursorBody);
    };
  }, []);

  // Не рендеримо на мобільних
  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <>
      <motion.div
        className={`${styles.cursor} ${isHovering ? styles.hovering : ""} ${isHidden ? styles.hidden : ""}`}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: smoothX,
          y: smoothY,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className={styles.cursorTextInner}>
          {hoverText && (
            <span className={styles.cursorText}>
              {hoverText}
            </span>
          )}
        </div>
      </motion.div>

      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className={styles.ripple}
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 3.5, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            x: r.x,
            y: r.y,
            pointerEvents: 'none',
            zIndex: 9998,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
