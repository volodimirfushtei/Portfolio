import React, { useRef } from "react";
import styles from "./Footer.module.css";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });

  // Зсув backgroundPositionY в залежності від скролу
  const bgPosition = useTransform(scrollYProgress, [0, 1], ["50%", "100%"]);
  const bgPositionSpring = useSpring(bgPosition, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <motion.footer
      className={styles.footer}
      role="contentinfo"
      ref={footerRef}
      aria-label="Footer"
      style={{ backgroundPositionY: bgPositionSpring }}
    >
      <div className={styles.content}>
        <div className={styles.column}>
          <div className={styles.logo}>
            <h4 className={styles.portfolio} ref={footerRef}>
              Portfolio
            </h4>
            <h2 className={styles.getStarted}>GET STARTED</h2>
            <p>Modern web development solutions tailored to your needs</p>
          </div>
          <div className={styles.socialLinks}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <h4>Quick Links</h4>
          <ul className={styles.linkList}>
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url} className={styles.navLink}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Contact</h4>
          <address className={styles.contactInfo}>
            {contactInfo.map((item, index) => (
              <p key={index}>
                <i className={item.icon}></i>
                {item.url ? (
                  <a href={item.url}>{item.text}</a>
                ) : (
                  <span>{item.text}</span>
                )}
              </p>
            ))}
          </address>
        </div>
      </div>

      <div className={styles.copyright}>
        <img
          src="/images/my_photo.jpg"
          alt="my_photo"
          className={styles.myPhoto}
        />
        © {currentYear} My Portfolio. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;

const socialLinks = [
  {
    icon: "ri-github-fill",
    label: "GitHub",
    url: "https://github.com/volodimirfushtei",
  },
  {
    icon: "ri-linkedin-fill",
    label: "LinkedIn",
    url: "https://linkedin.com/in/yourprofile",
  },
  {
    icon: "ri-slack-fill",
    label: "Slack",
    url: "https://random-x1r5268.slack.com/team/U07UCAKB1RV",
  },
  { icon: "ri-discord-fill", label: "Discord", url: "#" },
];

const quickLinks = [
  { name: "Home", url: "#home" },
  { name: "Projects", url: "#projects" },
  { name: "Tech", url: "#tech" },
  { name: "Contacts", url: "#contacts" },
];

const contactInfo = [
  { icon: "ri-map-pin-line", text: "Ivano-Frankivsk, Ukraine" },
  {
    icon: "ri-mail-line",
    text: "fushteyy@gmail.com",
    url: "mailto:fushteyy@gmail.com",
  },
  {
    icon: "ri-phone-line",
    text: "+380 95 877 71 07",
    url: "tel:+380958777107",
  },
];
