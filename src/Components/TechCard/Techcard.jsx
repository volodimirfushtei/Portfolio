import { useRef } from "react";
import styles from "./TechCard.module.css";

const TechCard = ({ tech, style }) => {
  const cardRef = useRef(null);

  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;

  const lerp = (start, end, t) => start + (end - start) * t;

  const animate = () => {
    currentX = lerp(currentX, targetX, 0.1);
    currentY = lerp(currentY, targetY, 0.1);

    if (cardRef.current) {
      cardRef.current.style.transform = `
        rotateX(${currentX}deg)
        rotateY(${currentY}deg)
        scale(1.04)
      `;
    }

    requestAnimationFrame(animate);
  };

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    targetX = (y - centerY) / 12;
    targetY = (x - centerX) / 12;

    // glare
    cardRef.current.style.setProperty("--x", x / rect.width);
    cardRef.current.style.setProperty("--y", y / rect.height);
  };

  const handleMouseEnter = () => {
    animate();
  };

  const handleMouseLeave = () => {
    targetX = 0;
    targetY = 0;

    if (cardRef.current) {
      cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    }
  };

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

        {tech.image && <img src={tech.image} alt={tech.name} />}

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
