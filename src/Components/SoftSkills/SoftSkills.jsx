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
  useEffect(() => {
    if (gsap && ScrollTrigger) {
      const blocks = gsap.utils.toArray(".skill-block");
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
        }
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
          }
        );
      });
    }
  }, []);

  return (
    <section
      className="relative w-full max-w-3xl mx-auto p-10 text-white overflow-hidden "
      ref={ref}
    >
      {skills.map((skill, index) => (
        <div key={index} className="skill-block mb-8 w-100 mx-auto text-center">
          <h3
            className={`text-2xl font-semibold flex items-center gap-2 mb-2 border-b pb-2 border-gray-400 ${styles.skillTitle}`}
          >
            <i
              className={`${skill.icon} p-2 text-secondary rounded-2`}
              aria-hidden="true"
            />
            {skill.title}
          </h3>
          <ul className="list-disc list-inside text-gray-300 text-left text-xl">
            {skill.items.map((item, idx) => (
              <li key={idx} custom={idx} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
