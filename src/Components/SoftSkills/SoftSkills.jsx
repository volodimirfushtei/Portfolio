import styles from "./SoftSkills.module.css";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MoveUpRight, MessageCircle, Users, Lightbulb } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);


export default function SoftSkills() {




  const skills = [
    {
      title: "Communication",
      img: "/images/scott_webb.jpg",
      items: [
        "Clear communication of ideas",
        "Open to feedback",
        "Cross-team collaboration",
      ],

    },
    {
      title: "Teamwork",
      img: "/images/business.jpg",
      items: [
        "Work under deadlines",
        "Support team goals",
        "Flexible roles",
      ],

    },
    {
      title: "Thinking",
      img: "/images/ingo.jpg",
      items: [
        "Creative problem solving",
        "Multi-perspective analysis",
        "Practical + creative mix",
      ],

    },
  ];
  useLayoutEffect(() => {
    const cards = gsap.utils.toArray(`.${styles.card}`);

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        {
          y: 0,
          scale: 1,
          opacity: 1,
        },
        {
          y: (i + 1) * 80,              // менший рух
          scale: 1 - i * 0.06,          // сильніший depth
          opacity: 1 - i * 0.15,        // легке згасання
          ease: "none",
          scrollTrigger: {
            trigger: `.${styles.grid}`,
            start: "top 85%",
            end: "bottom top",
            scrub: 0.6,                 // 👈 плавніше ніж true
          },
        }
      );
    });
  }, []);


  return (

    <section className={styles.section} id="soft-skills">
      <div className="wrapper">
        <div className="content">
          <div className={styles.header}>
            <span className={styles.eyebrow}>Capabilities</span>
            <h2 className={styles.heading}>Personal Skills</h2>
          </div>

          <div className={styles.grid} >
            {skills.map((skill, i) => (
              <div
                key={skill.title}
                className={styles.card}
                role="article"
                tabIndex={0}
                data-cursor="hover"
                data-cursor-type="link"
                data-cursor-text="Explore Experience"

              >
                {/* background layer */}
                <div className={styles.bgWrapper}>

                  <img
                    src={skill.img}
                    alt=""
                    className={styles.bg}
                    loading="lazy"
                  />
                  <div className={styles.overlay} />
                </div>

                {/* content layer */}
                <div className={styles.content}>
                  <div className={styles.top}>
                    <span className={styles.num}>
                      {String(i + 1).padStart(2, "0")}
                    </span>

                  </div>

                  <div className={styles.mainContent}>
                    <h3 className={styles.title}>{skill.title}</h3>
                    <div className={styles.listWrapper}>
                      <ul className={styles.list}>
                        {skill.items.map((item, idx) => (
                          <li key={item} style={{ "--idx": idx }}>
                            <span className={styles.bullet}>—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={styles.footer}>
                    <span className={styles.explore}>Explore Experience</span>
                    <MoveUpRight />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

  );
}
