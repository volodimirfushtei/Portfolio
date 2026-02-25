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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemsRef.current;

      /* ── Reveal animation ── */
      gsap.from(items, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          once: true,
        },
      });

      /* ── Counters ── */
      items.forEach((item) => {
        const numEl = item.querySelector("[data-num]");
        const target = Number(item.dataset.value);

        if (!numEl || isNaN(target)) return;

        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            numEl.textContent = Math.round(counter.value);
          },
        });
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container}>
      <div ref={cardRef} className={styles.card}>
        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => (itemsRef.current[i] = el)}
              className={styles.statItem}
              data-value={stat.value}
            >
              <div className={styles.value}>
                <span className={styles.counter}>
                  <span data-num>0</span>
                  <span className={styles.suffix}>{stat.suffix}</span>
                </span>
              </div>
              <div className={styles.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceTable;
