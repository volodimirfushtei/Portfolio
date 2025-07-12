import React from "react";
import s from "./contactsPage.module.css";
import { motion } from "framer-motion";
import ContactForm from "../../Components/ContactForm/ContactForm";
import ContactInfo from "../../Components/ContactInfo/ContactInfo";

const ContactsPage = () => {
  const socialItems = [
    { src: "/icons/facebook.svg", alt: "Facebook" },
    { src: "/icons/instagram.svg", alt: "Instagram" },
    { src: "/icons/telegram.svg", alt: "Telegram" },
    { src: "/icons/linkedin.svg", alt: "LinkedIn" },
    { src: "/icons/github.svg", alt: "GitHub" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className={s.contactsPage}>
      {/* Animated progress bar */}
      <motion.div
        className={s.progressBar}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      <motion.div
        className={s.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h3 className={s.pageTitle} variants={childVariants}>
          Get In Touch
        </motion.h3>

        <div className={s.formsContainer}>
          <motion.div variants={childVariants}>
            <ContactForm key="ContactForm" />
          </motion.div>

          <motion.div variants={childVariants}>
            <ContactInfo items={socialItems} key="ContactInfo" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactsPage;
