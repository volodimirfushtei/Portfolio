import React from "react";
import s from "./contactsPage.module.css";
import { Link } from "react-router-dom";

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
    <div className={s.contactsPage}>
      <div className={s.container}>
        <div className={s.line}></div>
        <h3 className={s.title_2}>Замовити консультацію</h3>
        <div className="flex w-full flex-row gap-12">
          <ContactForm />
          <ContactInfo items={social_items} key={social_items.alt} />
          <Consultation />
        </div>
      </div>
    </div>
  );
};

export default contactsPage;
