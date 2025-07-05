import React from "react";
import s from "./ContactForm.module.css";

const ContactForm = () => {
  return (
    <div className={s.formContainer}>
      <div className={`${s.card} ${s.card_contact}`}>
        <form id="contact-form" method="post" className={s.form}>
          <div className={s.cardHeader}>
            <h2 className={s.cardTitle}>Contact Us</h2>
          </div>

          <div className={s.cardBody}>
            <div className={s.nameFields}>
              <div className={s.formGroup}>
                <input
                  className={s.formControl}
                  type="text"
                  name="name"
                  id="firstName"
                  required
                />
                <label className={s.bmdLabelFloating} htmlFor="firstName">
                  First name
                </label>
                <span className={s.materialInput}></span>
              </div>

              <div className={s.formGroup}>
                <input
                  className={s.formControl}
                  type="text"
                  name="lastname"
                  id="lastName"
                  required
                />
                <label className={s.bmdLabelFloating} htmlFor="lastName">
                  Last name
                </label>
                <span className={s.materialInput}></span>
              </div>
            </div>

            <div className={s.formGroup}>
              <input
                className={s.formControl}
                type="email"
                name="email"
                id="email"
                required
              />
              <label className={s.bmdLabelFloating} htmlFor="email">
                Email address
              </label>
              <span className={s.materialInput}></span>
            </div>

            <div className={s.formGroup}>
              <textarea
                id="message"
                className={s.formControl}
                name="message"
                rows="6"
                required
              ></textarea>
              <label className={s.bmdLabelFloating} htmlFor="message">
                Your Message
              </label>
              <span className={s.materialInput}></span>
            </div>
          </div>

          <div className={s.cardFooter}>
            <div className={s.formCheck}>
              <label className={s.formCheckLabel}>
                <input
                  className={s.formCheckInput}
                  type="checkbox"
                  name="subscribe"
                  id="subscribe"
                />
                <span className={s.checkboxCustom}></span>
                Subscribe to newsletter
              </label>
            </div>
            <button type="submit" className={s.btnPrimary}>
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
