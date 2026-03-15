import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import styles from "./ControllerSkills.module.css";

// Масив технологій
const techItems = [
  { id: 1, name: "HTML", icon: "html" },
  { id: 2, name: "CSS", icon: "css" },
  { id: 3, name: "JavaScript", icon: "js" },
  { id: 4, name: "React", icon: "react" },
  { id: 5, name: "Next.js", icon: "next" },
  { id: 6, name: "Node.js", icon: "node" },
];

const TechCard = ({ tech, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.03,
        ease: [0.76, 0, 0.24, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.08, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={styles.cardInner}
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className={styles.front}>
          <i className={tech.icon} style={{ color: tech.color }} />
          <span className={styles.name}>{tech.name}</span>
        </div>
        <div className={styles.back}>
          <p style={{ color: tech.color }}>{tech.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ControllerSkills = () => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Заголовок з анімацією */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.span
          className={styles.eyebrowLine}
          initial={{ width: 0 }}
          animate={isInView ? { width: 32 } : { width: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <h3 className={styles.heading}>Coding process and tools</h3>
      </motion.div>

      {/* Трек з картками */}
      <div className={styles.track}>
        <motion.div
          className={styles.inner}
          animate={{
            x: isInView && !isPaused ? [0, -2000] : 0,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
        >
          {/* 3 повтори для більшої кількості карток */}
          {[...techItems, ...techItems, ...techItems].map((tech, index) => (
            <TechCard
              key={`${tech.name}-${index}`}
              tech={tech}
              index={index % techItems.length}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ControllerSkills;
