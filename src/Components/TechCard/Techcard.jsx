import { useRef, useCallback, useEffect } from "react";
import styles from "./TechCard.module.css";

const TechCard = ({ tech, style, index }) => {
  const cardRef = useRef(null);
  const animationRef = useRef(null);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const isHovering = useRef(false);

  const lerp = (start, end, t) => start + (end - start) * t;

  const animate = useCallback(() => {
    if (!cardRef.current) return;

    currentX.current = lerp(currentX.current, targetX.current, 0.1);
    currentY.current = lerp(currentY.current, targetY.current, 0.1);

    cardRef.current.style.transform = `
      rotateX(${currentX.current}deg)
      rotateY(${currentY.current}deg)
      scale(1.02)
    `;

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Обмежуємо максимальний кут обертання
    const maxRotation = 15;
    targetX.current = Math.min(Math.max((y - centerY) / 12, -maxRotation), maxRotation);
    targetY.current = Math.min(Math.max((x - centerX) / 12, -maxRotation), maxRotation);

    // Оновлюємо позицію для glare ефекту
    cardRef.current.style.setProperty("--x", (x / rect.width).toString());
    cardRef.current.style.setProperty("--y", (y / rect.height).toString());
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isHovering.current) return;
    isHovering.current = true;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animate();
  }, [animate]);

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    targetX.current = 0;
    targetY.current = 0;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (cardRef.current) {
      cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
      cardRef.current.style.setProperty("--x", "0.5");
      cardRef.current.style.setProperty("--y", "0.5");
    }
  }, []);

  // Очищення анімації при розмонтуванні
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.wrapper} style={style}>
      <div
        ref={cardRef}
        className={styles.card}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.glare} />

        {tech.image && (
          <img
            src={tech.image}
            alt={tech.name}
            loading="lazy"
            className={styles.cardImage}
          />
        )}

        <div className={styles.cardContent}>
          {tech.icon && (
            <i className={tech.icon} style={{ color: tech.color }} />
          )}

          <div className={styles.info}>
            <span className={styles.name}>{tech.name}</span>
            <span className={styles.desc}>{tech.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechCard;