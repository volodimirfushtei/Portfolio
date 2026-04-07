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

import Counter from "../Counter/Counter.jsx";

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
