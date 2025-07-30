import React from "react";
import { motion } from "framer-motion";
import s from "./contactsPage.module.css";
import ContactForm from "../../Components/ContactForm/ContactForm";
import ContactInfo from "../../Components/ContactInfo/ContactInfo";

const ContactsPage = () => {
  const socialItems = [
    { src: "/icons/facebook.svg", alt: "Facebook", icon: "ri-facebook-fill" },
    {
      src: "/icons/instagram.svg",
      alt: "Instagram",
      icon: "ri-instagram-line",
    },
    { src: "/icons/telegram.svg", alt: "Telegram", icon: "ri-telegram-line" },
    { src: "/icons/linkedin.svg", alt: "LinkedIn", icon: "ri-linkedin-fill" },
    { src: "/icons/github.svg", alt: "GitHub", icon: "ri-github-fill" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    },
  };

  const socialVariants = {
    hover: {
      y: -5,
      scale: 1.1,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  return (
    <motion.div
      className={s.contactsPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={s.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={s.pageTitle} variants={childVariants}>
          Let's Connect
        </motion.h1>

        <div className={s.formsContainer}>
          <motion.div className={s.textSection} variants={childVariants}>
            <div className={s.glassBox}>
              <motion.div variants={childVariants}>
                <h3 className={s.title}>
                  <i className="ri-mail-line" /> Get in Touch
                </h3>
                <p className={s.description}>
                  Fill in the form and I'll get back to you within 24 hours. I'm
                  excited to hear about your project ideas!
                </p>
              </motion.div>

              <motion.div variants={childVariants}>
                <h3 className={s.title}>
                  <i className="ri-reactjs-line" /> Modern Tech Stack
                </h3>
                <p className={s.description}>
                  Built with React, Framer Motion, and CSS Modules for buttery
                  smooth animations and responsive design.
                </p>
              </motion.div>

              <motion.div variants={childVariants}>
                <h3 className={s.title}>
                  <i className="ri-group-line" /> Collaboration Ready
                </h3>
                <p className={s.description}>
                  Perfect for startups, agencies, and freelance projects. Let's
                  build something amazing together!
                </p>
              </motion.div>

              <motion.div className={s.socials} variants={childVariants}>
                {socialItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className={s.socialLink}
                    variants={socialVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className={item.icon} />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={childVariants} whileHover={{ scale: 1.01 }}>
            <ContactForm key="ContactForm" />
          </motion.div>
        </div>

        <motion.div className={s.infoContainer} variants={childVariants}>
          <p className={s.copyright}>
            <i className="ri-copyright-line" /> 2025 Volodymyr Fushtey
            <motion.i
              className="ri-heart-fill"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </p>
          <p className={s.copyright}>
            Crafted with React <i className="ri-reactjs-line" /> & Framer Motion{" "}
            <i className="ri-motion-line" />
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactsPage;
