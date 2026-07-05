import { useRef, useLayoutEffect, useState } from "react";
import styles from "./ControllerSkills.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techItems = [
  { name: "React", icon: "icon-react", description: "Library" },
  { name: "Next.js", icon: "icon-nextjs", description: "Framework" },
  { name: "JavaScript", icon: "icon-javascript", description: "Language" },
  { name: "Node.js", icon: "icon-nodejs", description: "Runtime" },
  { name: "MongoDB", icon: "icon-mongodb", description: "Database" },
  { name: "TypeScript", icon: "icon-typescript", description: "Language" },
  { name: "Tailwind", icon: "icon-tailwind", description: "CSS Framework" },
  { name: "Firebase", icon: "icon-firebase", description: "Backend" },
  { name: "GraphQL", icon: "icon-graphql", description: "API" },
  { name: "Docker", icon: "icon-docker", description: "DevOps" },
];

export default function ControllerSkills() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(`.${styles.card}`);

      // Анімація карток
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            scale: 0.8,
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "top 20%",
              scrub: 1.2,
            },
          }
        );
      });

      // Паралакс ефект
      gsap.to(`.${styles.inner}`, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Ефект при наведенні на картку
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Клонуємо масив для безкінечного скролу
  const doubledItems = [...techItems, ...techItems, ...techItems];

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <span className={styles.line} />
        <h3 className={styles.heading}>Coding process and tools</h3>
      </div>

      <div 
        className={styles.track}
        ref={trackRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`${styles.inner} ${isHovered ? styles.paused : ''}`}>
          {doubledItems.map((tech, i) => (
            <div key={`${tech.name}-${i}`} className={styles.card}>
              <div className={styles.cardContent}>
                <svg className={styles.icon} width={40} height={40}>
                  <use href={`/sprite.svg#${tech.icon}`} />
                </svg>
                <div className={styles.cardInfo}>
                  <div className={styles.name}>{tech.name}</div>
                  <div className={styles.desc}>{tech.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
