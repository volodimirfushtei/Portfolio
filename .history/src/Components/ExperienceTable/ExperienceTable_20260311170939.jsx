import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import styles from "./ExperienceTable.module.css";

const stats = [
  { value: 1, suffix: "+", label: "Years Experience" },
  { value: 5, suffix: "+", label: "Projects Completed" },
  { value: 3, suffix: "+", label: "Happy Clients" },
  { value: 10, suffix: "+", label: "Technologies" },
  { value: 2, suffix: "+", label: "Languages" },
  { value: 1, suffix: "+", label: "Certifications" },
];

// Компонент лічильника
const Counter = ({ value, suffix, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;
    const duration = 2000; // 2 секунди

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function для плавності (easeOutQuad)
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      const currentValue = Math.floor(easeOutQuad * value);

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value]);

  return (
    <span className={styles.counter}>
      <span className={styles.number} data-num>
        {count}
      </span>
      <span className={styles.suffix}>{suffix}</span>
    </span>
  );
};

// Компонент окремого елемента статистики
const StatItem = ({ stat, index, isInView }) => {
  const itemRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <motion.div
      ref={itemRef}
      className={styles.statItem}
      data-value={stat.value}
      role="listitem"
      variants={itemVariants}
      initial="hidden"
      animate={controls}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={styles.value}>
        <Counter value={stat.value} suffix={stat.suffix} isInView={isInView} />
      </div>
      <div className={styles.label}>{stat.label}</div>
    </motion.div>
  );
};

const ExperienceTable = () => {
  const cardRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Відстеження видимості секції
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3, rootMargin: "0px" },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Варіанти анімації для картки
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  // Варіанти анімації для декоративної лінії
  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <div className={styles.container}>
      <motion.div
        ref={cardRef}
        className={styles.card}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Decorative top line */}
        <motion.div
          className={styles.cardDecor}
          variants={lineVariants}
          aria-hidden="true"
        />

        {/* Stats grid */}
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <StatItem
              key={`stat-${stat.label}`}
              stat={stat}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ExperienceTable;
