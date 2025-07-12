import React from "react";
import { motion } from "framer-motion";
import SocialIcon from "../SocialIcon/SocialIcon";
import s from "./ContactInfo.module.css";

const ContactInfo = ({ items }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={s.contactInfo}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      whileHover={{ y: -5 }}
    >
      <motion.div className={s.headerWrapper} variants={itemVariants}>
        <h2 className={s.header}>Contact Information</h2>
        <p className={s.subheader}>Get in touch with me</p>
      </motion.div>

      <div className={s.infoList}>
        {/* Email */}
        <motion.div className={s.infoItem} variants={itemVariants}>
          <div className={s.iconWrapper}>
            <i className="ri-mail-line"></i>
          </div>
          <div className={s.infoText}>
            <h3 className={s.infoTitle}>Email</h3>
            <a href="mailto:fuschteyy@gmail.com" className={s.infoDetail}>
              fuschteyy@gmail.com
            </a>
          </div>
        </motion.div>

        {/* Phone */}
        <motion.div className={s.infoItem} variants={itemVariants}>
          <div className={s.iconWrapper}>
            <i className="ri-phone-line"></i>
          </div>
          <div className={s.infoText}>
            <h3 className={s.infoTitle}>Phone</h3>
            <a href="tel:+380958777107" className={s.infoDetail}>
              +380 95 877 71 07
            </a>
          </div>
        </motion.div>

        {/* Working Hours */}
        <motion.div className={s.infoItem} variants={itemVariants}>
          <div className={s.iconWrapper}>
            <i className="ri-time-line"></i>
          </div>
          <div className={s.infoText}>
            <h3 className={s.infoTitle}>Working Hours</h3>
            <p className={s.infoDetail}>Mon-Fri: 9:00 - 18:00</p>
          </div>
        </motion.div>
      </div>

      {/* Social Networks */}
      <motion.div className={s.socialSection} variants={itemVariants}>
        <h3 className={s.socialTitle}>Connect With Me</h3>
        <div className={s.socialIcons}>
          {items.map((item) => (
            <SocialIcon key={item.alt} src={item.src} alt={item.alt} />
          ))}
        </div>
      </motion.div>

      {/* Map */}
      <motion.div className={s.mapContainer} variants={itemVariants}>
        <iframe
          src="https://maps.google.com/maps?q=Kyiv&output=embed"
          className={s.map}
          loading="lazy"
          title="Location Map"
          allowFullScreen
        ></iframe>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfo;
