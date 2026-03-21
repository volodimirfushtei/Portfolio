import { useRef } from "react";
import styles from "./TechCard.module.css";

const TechCard = () => {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 10;
    const rotateY = (x - centerX) / 10;

    cardRef.current.style.transform = `
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg)
    `;
  };

  const reset = () => {
    cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div className={styles.wrapper}>
      <div
        ref={cardRef}
        className={styles.card}
        onMouseMove={handleMove}
        onMouseLeave={reset}
      >
        <img src="/image.jpg" alt="" />
         <div className={styles.card}>
              <div className={styles.cardContent}>
                <i className={tech.icon} style={{ color: tech.color }} />
                <div className={styles.info}>
                  <span className={styles.name}>{tech.name}</span>
                  <span className={styles.desc}>{tech.description}</span>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default TechCard;