import styles from "./HeroCard.module.css";
import React from "react";

export default function HeroCard() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <span className={styles.tag}>Web Developer</span>
        <h1>
          Build <span className={styles.highlight}>Web Apps</span> People Love
        </h1>
        <p>
          I’m a junior freelance developer from Ukraine. I help you craft
          modern, fast, and user-friendly websites and interfaces.
        </p>

        <div className={styles.actions}>
          <button className={styles.primary}>View Portfolio</button>
          <button className={styles.secondary}>Contact Me</button>
        </div>

        <div className={styles.trustedBy}>
          <span>You may have seen me in:</span>
          <div className={styles.logos}>
            <img src="/logos/notion.svg" alt="Notion" />
            <img src="/logos/airtable.svg" alt="Airtable" />
            <img src="/logos/mailchimp.svg" alt="Mailchimp" />
            <img src="/logos/gumroad.svg" alt="Gumroad" />
          </div>
        </div>
      </div>

      <div className={styles.imageBlock}>
        <img
          src="/images/My_photo.png"
          alt="Volodymyr Fushtei"
          className={styles.portrait}
        />
        <div className={styles.badge}>10+ Projects Completed</div>
        <div className={styles.stat}>
          90% of clients recommend after the first delivery
        </div>
      </div>
    </section>
  );
}
