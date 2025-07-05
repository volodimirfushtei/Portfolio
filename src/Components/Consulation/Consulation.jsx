import React from "react";
import { RiArrowRightLine } from "react-icons/ri";
import s from "./Consulation.module.css";

const Consultation = () => {
  return (
    <div className={s.consultation} id="consultation">
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.gradient}></div>

          <div className={s.inner}>
            <div className={s.text}>
              <h3 className={s.title}>Готові обговорити ваш проєкт?</h3>
              <p>
                Розкажіть нам про вашу ідею, і ми допоможемо втілити її в життя.
                Наша команда експертів готова відповісти на всі ваші запитання
                та запропонувати оптимальне рішення.
              </p>
              <a href="#contact" className={s.button}>
                Get a Consultation
                <RiArrowRightLine className={s.icon} />
              </a>
            </div>

            <div className={s.imageContainer}>
              <img
                src="https://readdy.ai/api/search-image?query=business%2520team%2520discussing%2520mobile%2520app%2520project%252C%2520professional%2520meeting%252C%2520designers%2520and%2520developers%2520collaborating%252C%2520modern%2520office%2520setting%252C%2520yellow%2520accent%2520lighting%252C%2520high%2520quality%2520professional%2520photo&width=500&height=300&seq=11&orientation=landscape"
                alt="Консультація з розробки мобільних додатків"
                loading="lazy"
                className={s.image}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
