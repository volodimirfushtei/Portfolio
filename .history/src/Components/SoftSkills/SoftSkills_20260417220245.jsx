import styles from "./SoftSkills.module.css";

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
      icon: "ri-chat-3-line",
    },
    {
      title: "Teamwork",
      img: "/images/business.jpg",
      items: [
        "Work under deadlines",
        "Support team goals",
        "Flexible roles",
      ],
      icon: "ri-team-line",
    },
    {
      title: "Thinking",
      img: "/images/ingo.jpg",
      items: [
        "Creative problem solving",
        "Multi-perspective analysis",
        "Practical + creative mix",
      ],
      icon: "ri-lightbulb-line",
    },
  
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Soft Skills</h2>
      <div className={styles.grid}>
        {skills.map((skill, i) => (
          <div 
            key={skill.title} 
            className={styles.card}
            role="article"
            tabIndex={0}
          >
            {/* background image */}
            <img 
              src={skill.img} 
              alt="" 
              className={styles.bg}
              loading="lazy"
            />

            {/* overlay */}
            <div className={styles.overlay} />

            {/* content */}
            <div className={styles.content}>
              <div className={styles.top}>
                <span className={styles.num}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <i className={skill.icon} />
              </div>

              <h3 className={styles.title}>{skill.title}</h3>

              <ul className={styles.list}>
                {skill.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className={styles.end} />  
      </div>
    </section>
  );
}