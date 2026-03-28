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
  const textRef = useRef(null);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });

  const [ripples, setRipples] = useState([]);
  const [hoverText, setHoverText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const rippleId = useRef(0);

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
      // Шукаємо всі елементи з data-cursor="hover"
      const hoverElements = document.querySelectorAll("[data-cursor='hover']");

      console.log(`Found ${hoverElements.length} hover elements`); // Для дебагу

      hoverElements.forEach((el) => {
        if (el.hasAttribute("data-cursor-listener")) return;

        el.setAttribute("data-cursor-listener", "true");

        // Отримуємо текст для курсора
        const getCursorText = () => {
          // Пріоритет: data-cursor-text > aria-label > textContent > default
          if (el.getAttribute("data-cursor-text")) {
            return el.getAttribute("data-cursor-text");
          }
          if (el.getAttribute("aria-label")) {
            return el.getAttribute("aria-label");
          }

          // Для кнопок беремо текст кнопки
          if (el.tagName === "BUTTON" && el.textContent) {
            return el.textContent.trim();
          }

          // Для посилань
          if (el.tagName === "A" && el.textContent) {
            return el.textContent.trim();
          }

          // За замовчуванням
          return "Click";
        };

        const text = getCursorText();
        let scaleValue = 2.5;

        // Різний scale для різних типів елементів
        if (el.tagName === "BUTTON") {
          scaleValue = 3;
        } else if (el.tagName === "A") {
          scaleValue = 2.8;
        } else if (el.classList.contains(styles.mediaContainer)) {
          scaleValue = 4;
        }

        el.addEventListener("mouseenter", () => {
          setIsHovering(true);
          setHoverText(text);

          if (cursorRef.current) {
            gsap.killTweensOf(cursorRef.current);
            gsap.to(cursorRef.current, {
              scale: scaleValue,
              duration: 0.3,
              ease: "backOut(0.3)",
              overwrite: true,
            });
          }

          if (textRef.current) {
            gsap.killTweensOf(textRef.current);
            gsap.to(textRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.2,
              ease: "power2.out",
            });
          }
        });

        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setHoverText("");

          if (cursorRef.current) {
            gsap.killTweensOf(cursorRef.current);
            gsap.to(cursorRef.current, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
              overwrite: true,
            });
          }

          if (textRef.current) {
            gsap.killTweensOf(textRef.current);
            gsap.to(textRef.current, {
              opacity: 0,
              scale: 0.8,
              duration: 0.2,
              ease: "power2.out",
            });
          }
        });
      });
    };

    // Додаємо обробники з затримкою
    const timeout = setTimeout(addHoverEffects, 150);

    // Спостерігаємо за змінами в DOM (для динамічно доданих елементів)
    const observer = new MutationObserver(() => {
      addHoverEffects();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [location]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className={`${styles.cursor} ${isHovering ? styles.hovering : ""}`}
        style={{
          translateX: springX,
          translateY: springY,
        }}
      >
        <span ref={textRef} className={styles.cursorText}>
          {hoverText}
        </span>
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
