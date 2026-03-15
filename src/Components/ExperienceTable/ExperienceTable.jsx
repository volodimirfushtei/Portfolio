import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ExperienceTable.module.css";

gsap.registerPlugin(ScrollTrigger);

// Статистика винесена в константу з актуальними значеннями
const STATS = [
  { value: 3, suffix: "+", label: "Years Experience", index: "01" },
  { value: 15, suffix: "+", label: "Projects Completed", index: "02" },
  { value: 12, suffix: "+", label: "Happy Clients", index: "03" },
  { value: 20, suffix: "+", label: "Technologies", index: "04" },
  { value: 3, suffix: "+", label: "Languages", index: "05" },
  { value: 4, suffix: "+", label: "Certifications", index: "06" },
];

/* ── Precision GSAP Counter з оптимізацією ── */
const Counter = ({ value, suffix, trigger }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const countRef = useRef({ val: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    // Зупиняємо попередню анімацію
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Створюємо нову анімацію
    animationRef.current = gsap.to(countRef.current, {
      val: value,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => {
        setDisplayValue(Math.floor(countRef.current.val));
      },
      onComplete: () => {
        setDisplayValue(value); // Фінальне значення
      },
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [trigger, value]);

  return (
    <span className={styles.counterWrap}>
      <span className={styles.counterNum}>{displayValue}</span>
      <span className={styles.counterSuffix}>{suffix}</span>
    </span>
  );
};

const ExperienceTable = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const noiseRef = useRef(null);
  const scanlinesRef = useRef(null);
  
  const [triggered, setTriggered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Мемоізація статистики
  const stats = useMemo(() => STATS, []);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mouse move handler для градієнта
  const handleMouseMove = useCallback((e) => {
    if (isMobile) return;
    
    const cells = gridRef.current?.querySelectorAll(`.${styles.cell}`);
    cells?.forEach((cell) => {
      const rect = cell.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      cell.style.setProperty("--x", `${x}%`);
      cell.style.setProperty("--y", `${y}%`);
    });
  }, [isMobile]);

  // GSAP анімації
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ScrollTrigger для появи сітки
      const cells = gridRef.current?.querySelectorAll("[data-cell]");
      
      if (cells?.length) {
        // Початковий стан
        gsap.set(cells, {
          opacity: 0,
          y: 60,
          clipPath: "inset(0 0 100% 0)",
        });

        // Таймлайн появи
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => setTriggered(true),
          },
          defaults: { ease: "expo.out" },
        });

        tl.to(cells, {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0 0% 0)",
          stagger: 0.1,
          duration: 1.2,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        if (isMobile) return;
        const cells = gridRef.current?.querySelectorAll(`.${styles.cell}`);
        cells?.forEach((cell) => {
          cell.style.setProperty("--x", "50%");
          cell.style.setProperty("--y", "50%");
        });
      }}
    >
  

      {/* Внутрішній контент */}
      <div className={styles.inner}>
        <div
          ref={gridRef}
          className={styles.grid}
          role="list"
          aria-label="Experience statistics"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-cell
              role="listitem"
              className={styles.cell}
              style={{ "--i": stat.index }}
              aria-label={`${stat.label}: ${stat.value}${stat.suffix}`}
            >
              {/* Індекс в кутку */}
              <span className={styles.cellIndex} aria-hidden="true">
                {stat.index}
              </span>

              {/* Значення з лічильником */}
              <div className={styles.valueWrap}>
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  trigger={triggered}
                />
              </div>

              {/* Мітка */}
              <p className={styles.label}>{stat.label}</p>

              {/* Акцентна лінія при наведенні */}
              <span className={styles.accentBar} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTable;
