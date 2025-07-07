import React from "react";
import s from "./contactsPage.module.css";
import { Link } from "react-router-dom";
import { motion as Motion } from "motion/react";
import ContactForm from "../../Components/ContactForm/ContactForm";

import ContactInfo from "../../Components/ContactInfo/ContactInfo";
import Consultation from "../../Components/Consulation/Consulation";
const contactsPage = () => {
  const social_items = [
    { src: "/icons/facebook.svg", alt: "Facebook" },
    { src: "/icons/instagram.svg", alt: "Instagram" },
    { src: "/icons/telegram.svg", alt: "Telegram" },
    { src: "/icons/linkedin.svg", alt: "LinkedIn" },
    { src: "/icons/github.svg", alt: "GitHub" },
  ];
  return (
    <Motion.div
      initial={{ width: 0 }}
      animate={{ width: "1350px" }}
      transition={{ duration: 2, ease: "easeOut" }}
      style={{
        height: "6px",
        background: "linear-gradient(90deg, #03dac6, #3333fb)",
        borderRadius: "4px",
        marginBottom: "1rem",
        marginTop: "1rem",
      }}
    >
      <div className={s.contactsPage}>
        <div className={s.container}>
          <div className={s.container_forms}>
            <ContactForm key="ContactForm" />
            <ContactInfo items={social_items} key={social_items.alt} />
            <Consultation />
          </div>
        </div>
      </div>
    </Motion.div>
  );
};

export default contactsPage;
