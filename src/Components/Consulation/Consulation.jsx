import React from "react";
import { RiArrowRightLine } from "react-icons/ri";
import s from "./Consulation.module.css";

const Consultation = () => {
  return (
    <div className={s.container}>
      <div className={s.card}>
        <div className={s.headerWrapper}>
          <h2 className={s.header}>Consultation</h2>
        </div>

        <div className={s.content}>
          <div className={s.textContent}>
            <h3 className={s.title}>Get ready to discuss your project</h3>
            <p className={s.description}>
              Tell us about your project and our team will get back to you. And
              if you have any questions, we will be happy to answer them.
            </p>
            <a href="#contact" className={s.button}>
              <span>Get in touch</span>
              <RiArrowRightLine className={s.icon} aria-hidden="true" />
            </a>
          </div>

          <div className={s.imageWrapper}>
            <img
              src="https://readdy.ai/api/search-image?query=business%2520team%2520discussing%2520mobile%2520app%2520project%252C%2520professional%2520meeting%252C%2520designers%2520and%2520developers%2520collaborating%252C%2520modern%2520office%2520setting%252C%2520yellow%2520accent%2520lighting%252C%2520high%2520quality%2520professional%2520photo&width=500&height=300&seq=11&orientation=landscape"
              alt="Team discussing mobile app project"
              loading="lazy"
              className={s.image}
              width="500"
              height="300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
