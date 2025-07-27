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
      <motion.div
        className={s.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={s.formsContainer}>
          <motion.div className={s.textSection} variants={childVariants}>
            <div className={s.glassBox}>
              <h3 className={s.title}>
                <i className="ri-mail-line" /> Get in Touch
              </h3>
              <p className={s.description}>
                Fill in the form and I will get back to you as soon as possible.
                I will be happy to answer your questions.
              </p>

              <h3 className={s.title}>
                <i className="ri-reactjs-line" /> Built with React
              </h3>
              <p className={s.description}>
                This contact page is fully built with modern React and Framer
                Motion.There is also a Pro version with more advanced features
                by Creative Tim
              </p>

              <h3 className={s.title}>
                <i className="ri-group-line" /> For Startups
              </h3>
              <p className={s.description}>
                Ideal for portfolio, freelance or startup projects.
              </p>
            </div>
          </motion.div>

          <motion.div variants={childVariants}>
            <ContactForm key="ContactForm" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactsPage;
