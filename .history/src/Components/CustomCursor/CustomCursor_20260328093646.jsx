import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./CustomCursor.module.css";

const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorRef = useRef(null);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });

  const [ripples, setRipples] = useState([]);
  const rippleId = useRef(0);
  // У CustomCursor.jsx, на початку компонента
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0,
      );
    };
    checkTouch();
  }, []);

  if (isTouchDevice) return null; // Не рендеримо курсор на мобільних

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

  // Виправлений hover-ефект
  useEffect(() => {
    // Функція для додавання обробників
    const addHoverEffects = () => {
      console.log(document.querySelectorAll("[data-cursor='hover']"));
      const hoverElements = document.querySelectorAll("[data-cursor='hover']");

      hoverElements.forEach((el) => {
        // Перевіряємо, чи вже є обробник, щоб не додавати дублікати
        if (el.hasAttribute("data-cursor-listener")) return;

        el.setAttribute("data-cursor-listener", "true");

        el.addEventListener("mouseenter", () => {
          if (cursorRef.current) {
            gsap.to(cursorRef.current, {
              scale: 3,
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

    // Додаємо обробники для існуючих елементів
    addHoverEffects();

    // Слідкуємо за появою нових елементів
    const observer = new MutationObserver(() => {
      addHoverEffects();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      // Опціонально: видаляємо всі обробники при розмонтуванні
      const hoverElements = document.querySelectorAll("[data-cursor='hover']");
      hoverElements.forEach((el) => {
        // Тут можна видалити обробники, якщо потрібно
      });
    };
  }, []);

  return (
    <>
      <motion.div
        ref={cursorRef}
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
