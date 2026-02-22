import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SoftSkills.module.css";
gsap.registerPlugin(ScrollTrigger);
export default function SoftSkills() {
  const skills = [
    {
      title: "Communication & Collaboration",
      items: [
        "Able to clearly and effectively communicate ideas",
        "Open to feedback and constructive criticism",
        "Experience working in interdisciplinary teams",
      ],
      icon: "ri-chat-3-line",
    },
    {
      title: "Teamwork",
      items: [
        "Work effectively with colleagues under deadlines",
        "Support team spirit and help others achieve goals",
        "Willing to take on different roles depending on needs",
      ],
      icon: "ri-team-line",
    },
    {
      title: "Critical & Creative Thinking",
      items: [
        "Find unconventional solutions to complex problems",
        "Analyze issues from multiple perspectives",
        "Combine creative approaches with practical solutions",
      ],
      icon: "ri-lightbulb-line",
    },
    {
      title: "Organization & Time Management",
      items: [
        "Prioritize tasks for efficiency",
        "Meet deadlines without compromising quality",
        "Use planning tools (Trello, Notion, Asana)",
      ],
      icon: "ri-time-line",
    },
  ];

  const ref = useRef(null);
  const blocksRef = useRef([]);
  useEffect(() => {
    if (gsap && ScrollTrigger) {
      const blocks = gsap.utils.toArray(".block", ref.current);
      gsap.fromTo(
        blocks,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.3, // по черзі
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Анімація пунктів списку всередині кожного блоку
      blocks.forEach((block) => {
        const items = block.querySelectorAll("li");
        gsap.fromTo(
          items,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }
  }, []);

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.grid}>
        {skills.map((skill, i) => (
          <div
            key={skill.title}
            className={styles.block}
            ref={(el) => (blocksRef.current[i] = el)}
          >
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>

            <div className={styles.blockHeader}>
              <i className={skill.icon} aria-hidden="true" />
              <h3 className={styles.title}>{skill.title}</h3>
            </div>

            <ul className={styles.list}>
              {skill.items.map((item) => (
                <li key={item} className={styles.item}>
                  <span className={styles.bullet} aria-hidden="true">
                    ▸
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
