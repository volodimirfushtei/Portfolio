import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./CustomCursor.module.css";

const CustomCursor = () => {
  const location = useLocation();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });

  const [ripples, setRipples] = useState([]);
  const [hoverText, setHoverText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [targetScale, setTargetScale] = useState(1);
  const rippleId = useRef(0);

  // Плавна зміна scale
  const scale = useSpring(targetScale, {
    stiffness: 400,
    damping: 25,
    restDelta: 0.001,
  });

  useEffect(() => {
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

  useEffect(() => {
    const addHoverEffects = () => {
      const hoverElements = document.querySelectorAll("[data-cursor='hover']");

      hoverElements.forEach((el) => {
        if (el.hasAttribute("data-cursor-listener")) return;

        el.setAttribute("data-cursor-listener", "true");

        const text =
          el.getAttribute("data-cursor-text") ||
          el.getAttribute("aria-label") ||
          el.textContent?.trim() ||
          "Click";

        let scaleValue = 2.5;
        if (el.tagName === "BUTTON") scaleValue = 3;
        else if (el.tagName === "A") scaleValue = 2.8;

        el.addEventListener("mouseenter", () => {
          setIsHovering(true);
          setHoverText(text);
          setTargetScale(scaleValue);
        });

        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setHoverText("");
          setTargetScale(1);
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
        className={`${styles.cursor} ${isHovering ? styles.hovering : ""}`}
        style={{
          translateX: springX,
          translateY: springY,
          scale: scale,
        }}
      >
        <motion.span
          className={styles.cursorText}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovering ? 1 : 0,
            scale: isHovering ? 2 : 0.8,
          }}
          transition={{ duration: 0.2 }}
        >
          {hoverText}
        </motion.span>
      </motion.div>
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
