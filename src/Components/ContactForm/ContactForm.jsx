import React from "react";
import s from "./ContactForm.module.css";

const ContactForm = () => {
  return (
    <div className={s.contactForm}>
      <div className={s.formWrapper}>
        <div className={s.formContainer}>
          <form className={s.form}>
            <div className={s.formGroup}>
              <label htmlFor="name">Ім&apos;я</label>
              <input
                type="text"
                id="name"
                className={s.input}
                placeholder="Ваше ім'я"
              />
            </div>

            <div className={s.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className={s.input}
                placeholder="Ваш email"
              />
            </div>

            <div className={s.formGroup}>
              <label htmlFor="phone">Телефон</label>
              <input
                type="tel"
                id="phone"
                className={s.input}
                placeholder="Ваш телефон"
              />
            </div>

            <div className={s.formGroup}>
              <label htmlFor="project-type">Тип проєкту</label>
              <div className={s.selectWrapper}>
                <select id="project-type" defaultValue="" className={s.select}>
                  <option value="" disabled>
                    Оберіть тип проєкту
                  </option>
                  <option value="e-commerce">E-commerce додаток</option>
                  <option value="social">Соціальний додаток</option>
                  <option value="business">Бізнес-додаток</option>
                  <option value="entertainment">Розважальний додаток</option>
                  <option value="other">Інше</option>
                </select>
                <div className={s.selectIcon}>
                  <i className="ri-arrow-down-s-line"></i>
                </div>
              </div>
            </div>

            <div className={s.formGroup}>
              <label htmlFor="message">Опис проєкту</label>
              <textarea
                id="message"
                rows="2"
                className={s.textarea}
                placeholder="Розкажіть детальніше про ваш проєкт..."
              ></textarea>
            </div>

            <button type="submit" className={s.submitButton}>
              Send Message
              <i className="ri-send-plane-2-line"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
