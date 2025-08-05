import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import s from "./contactsPage.module.css";
import ContactForm from "../../Components/ContactForm/ContactForm";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Реєстрація плагіна GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ContactsPage = () => {
  const bgRef = useRef(null);
  const containerRef = useRef(null);

  const socialItems = [
    {
      icon: "ri-facebook-fill",
      label: "Facebook",
      url: "https://facebook.com",
    },
    {
      icon: "ri-instagram-line",
      label: "Instagram",
      url: "https://instagram.com",
    },
    {
      icon: "ri-telegram-line",
      label: "Telegram",
      url: "https://telegram.org",
    },
    {
      icon: "ri-linkedin-fill",
      label: "LinkedIn",
      url: "https://linkedin.com",
    },
    { icon: "ri-github-fill", label: "GitHub", url: "https://github.com" },
  ];

  // Анімації Framer Motion
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
    tap: { scale: 0.9 },
  };

  // GSAP анімації для фону
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        y: 50,
        repeat: 0,
        yoyo: true,
        duration: 5,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      className={s.contactsPage}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      ref={containerRef}
      aria-labelledby="page-title"
    >
      <div className={s.bg} ref={bgRef} aria-hidden="true" />

      <div className={s.container}>
        <motion.h1
          className={s.pageTitle}
          variants={childVariants}
          id="page-title"
        >
          Let's Connect
        </motion.h1>

        <div className={s.formsContainer}>
          <motion.section
            className={s.textSection}
            variants={containerVariants}
            aria-labelledby="contact-info"
          >
            <div className={s.glassBox}>
              <motion.article variants={childVariants}>
                <h3 className={s.title} id="contact-info">
                  <i className="ri-mail-line" aria-hidden="true" /> Get in Touch
                </h3>
                <p className={s.description}>
                  Fill in the form and I'll get back to you within 24 hours. I'm
                  excited to hear about your project ideas!
                </p>
              </motion.article>

              <motion.article variants={childVariants}>
                <h3 className={s.title}>
                  <i className="ri-reactjs-line" aria-hidden="true" /> Modern
                  Tech Stack
                </h3>
                <p className={s.description}>
                  Built with React, Framer Motion, and CSS Modules for buttery
                  smooth animations and responsive design.
                </p>
              </motion.article>

              <motion.article variants={childVariants}>
                <h3 className={s.title}>
                  <i className="ri-group-line" aria-hidden="true" />{" "}
                  Collaboration Ready
                </h3>
                <p className={s.description}>
                  Perfect for startups, agencies, and freelance projects. Let's
                  build something amazing together!
                </p>
              </motion.article>

              <motion.div
                className={s.socials}
                variants={childVariants}
                aria-label="Social media links"
              >
                {socialItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.url}
                    className={s.socialLink}
                    variants={socialVariants}
                    whileHover="hover"
                    whileTap="tap"
                    aria-label={item.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={item.icon} aria-hidden="true" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.section>

          <motion.div
            variants={childVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <ContactForm key="ContactForm" />
          </motion.div>
        </div>

        <motion.footer
          className={s.infoContainer}
          variants={childVariants}
          aria-label="Copyright information"
        >
          <p className={s.copyright}>
            <i className="ri-copyright-line" aria-hidden="true" /> 2025
            Volodymyr Fushtey
            <motion.i
              className="ri-heart-fill"
              aria-hidden="true"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </p>
          <p className={s.copyright}>
            Crafted with React{" "}
            <i className="ri-reactjs-line" aria-hidden="true" /> & Framer Motion{" "}
            <i className="ri-motion-line" aria-hidden="true" />
          </p>
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default ContactsPage;
