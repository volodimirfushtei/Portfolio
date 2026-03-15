import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ExperienceTable.module.css";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 1, suffix: "+", label: "Years Experience" },
  { value: 5, suffix: "+", label: "Projects Completed" },
  { value: 3, suffix: "+", label: "Happy Clients" },
  { value: 10, suffix: "+", label: "Technologies" },
  { value: 2, suffix: "+", label: "Languages" },
  { value: 1, suffix: "+", label: "Certifications" },
];

const ExperienceTable = () => {
  const cardRef = useRef(null);
  const itemsRef = useRef([]);
  const counterRefs = useRef([]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      const items = itemsRef.current.filter(Boolean);

      if (items.length === 0) return;

      /* ── Reveal animation for stat items ── */
      gsap.from(items, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 75%",
          end: "top 65%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      /* ── Counter animations ── */
      items.forEach((item, index) => {
        const numEl = item.querySelector(`.${styles.number}`);
        const target = Number(item.dataset.value);

        if (!numEl || isNaN(target) || target === 0) return;

        /* Create a proxy object for animation */
        const counterObj = { value: 0 };

        gsap.to(counterObj, {
          value: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            end: "top 65%",
            toggleActions: "play none none none",
            once: true,
          },
          onUpdate: () => {
            numEl.textContent = Math.round(counterObj.value);
          },
        });

        /* Store reference for cleanup */
        counterRefs.current[index] = counterObj;
      });
    }, cardRef);

    return () => {
      ctx.revert();
      counterRefs.current = [];
    };
  }, []);

  return (
    <div className={styles.container}>
      <div ref={cardRef} className={styles.card}>
        {/* Decorative top line */}
        <div className={styles.cardDecor} aria-hidden="true" />

        {/* Stats grid */}
        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <div
              key={`stat-${stat.label}`}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className={styles.statItem}
              data-value={stat.value}
              role="listitem"
            >
              {/* Value */}
              <div className={styles.value}>
                <span className={styles.counter}>
                  <span className={styles.number}>0</span>
                  <span className={styles.suffix}>{stat.suffix}</span>
                </span>
              </div>

              {/* Label */}
              <div className={styles.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceTable;
