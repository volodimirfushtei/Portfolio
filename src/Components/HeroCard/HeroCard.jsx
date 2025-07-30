import React from "react";
import { motion } from "framer-motion";
import styles from "./HeroCard.module.css";

export default function HeroCard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className={styles.hero}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className={styles.content}>
        <motion.span className={styles.tag} variants={itemVariants}>
          Web Developer
        </motion.span>

        <motion.h1 variants={itemVariants}>
          Build <span className={styles.highlight}>Web Apps</span> People Love
        </motion.h1>

        <motion.p variants={itemVariants}>
          I'm a junior freelance developer from Ukraine. I help you craft
          modern, fast, and user-friendly websites and interfaces.
        </motion.p>

        <motion.div className={styles.actions} variants={itemVariants}>
          <button className={styles.primary}>View Portfolio</button>
          <button className={styles.secondary}>Contact Me</button>
        </motion.div>

        <motion.div className={styles.trustedBy} variants={itemVariants}>
          <span>You may have seen me in:</span>
          <div className={styles.logos}>
            <img src="/logos/notion.svg" alt="Notion" />
            <img src="/logos/airtable.svg" alt="Airtable" />
            <img src="/logos/mailchimp.svg" alt="Mailchimp" />
            <img src="/logos/gumroad.svg" alt="Gumroad" />
          </div>
        </motion.div>
      </div>

      <motion.div className={styles.imageBlock} variants={itemVariants}>
        <img
          src="/images/My_photo.png"
          alt="Volodymyr Fushtei"
          className={styles.portrait}
        />
        <div className={styles.badge}>10+ Projects Completed</div>
        <div className={styles.stat}>
          90% of clients recommend after the first delivery
        </div>
      </motion.div>
    </motion.section>
  );
}
