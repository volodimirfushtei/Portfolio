import { useRef, useEffect, useState } from "react";
import styles from "./ExperienceTable.module.css";

const STATS = [
  { value: 3, suffix: "+", label: "Years Experience", index: "01" },
  { value: 15, suffix: "+", label: "Projects Completed", index: "02" },
  { value: 12, suffix: "+", label: "Happy Clients", index: "03" },
  { value: 20, suffix: "+", label: "Technologies", index: "04" },
  { value: 3, suffix: "+", label: "Languages", index: "05" },
  { value: 4, suffix: "+", label: "Certifications", index: "06" },
];

const Counter = ({ value, suffix, start }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const step = Math.max(1, Math.floor(value / 40)); 

    const interval = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 33); 

    return () => clearInterval(interval);
  }, [start, value]);

  return (
    <span className={styles.counterWrap}>
      <span className={styles.counterNum}>{count}</span>
      <span className={styles.counterSuffix}>{suffix}</span>
    </span>
  );
};

const ExperienceTable = () => {
  const sectionRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect(); // запускаємо лише один раз
        }
      },
      { threshold: 0.5 } // 50% секції в viewport
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.cell}>
              <span className={styles.cellIndex}>{stat.index}</span>
              <div className={styles.valueWrap}>
                <Counter value={stat.value} suffix={stat.suffix} start={startCount} />
              </div>
              <p className={styles.label}>{stat.label}</p>
              <span className={styles.accentBar} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTable;
