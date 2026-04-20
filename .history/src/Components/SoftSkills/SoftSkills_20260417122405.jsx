

import styles from "./SoftSkills.module.css";



export default function SoftSkills() {
  const skills = [
    {
      title: "Communication & Collaboration",
      img: "/images/scott_webb.jpg",
      items: [
        "Able to clearly and effectively communicate ideas",
        "Open to feedback and constructive criticism",
        "Experience working in interdisciplinary teams",
      ],
      icon: "ri-chat-3-line",
    },
    {
      title: "Teamwork",
      img: "/images/business.jpg",
      items: [
        "Work effectively with colleagues under deadlines",
        "Support team spirit and help others achieve goals",
        "Willing to take on different roles depending on needs",
      ],
      icon: "ri-team-line",
    },
    {
      title: "Critical & Creative Thinking",
      img: "/images/ingo.jpg",
      items: [
        "Find unconventional solutions to complex problems",
        "Analyze issues from multiple perspectives",
        "Combine creative approaches with practical solutions",
      ],
      icon: "ri-lightbulb-line",
    },
    {
      title: "Organization & Time Management",
      img: "/images/corporate.jpg",
      items: [
        "Prioritize tasks for efficiency",
        "Meet deadlines without compromising quality",
        "Use planning tools (Trello, Notion, Asana)",
      ],
      icon: "ri-time-line",
    },
  ];


  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {skills.map((skill, i) => (
          <div key={skill.title} className={styles.block}>
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>

            <div className={styles.blockHeader}>
              <i className={skill.icon} aria-hidden="true" />
              <h3 className={styles.title}>{skill.title}</h3>
              <div className="position absolute inset-0 bg-gradient"/>
              <img
                src={skill.img}
                alt={skill.title}
                className={styles.img}
                loading="lazy"
              />
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
