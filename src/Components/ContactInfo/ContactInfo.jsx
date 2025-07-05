import React from "react";
import SocialIcon from "../SocialIcon/SocialIcon";
import s from "./ContactInfo.module.css";

const ContactInfo = ({ items }) => {
  return (
    <div className={s.contactInfo}>
      <div className={s.container}>
        <div className={s.infoList}>
          {/* Email */}
          <div className={s.infoItem}>
            <div className={s.iconWrapper}>
              <i className="ri-mail-line"></i>
            </div>
            <div>
              <h5>Email</h5>
              <p>fuschteyy@gmail.com</p>
            </div>
          </div>

          {/* Телефон */}
          <div className={s.infoItem}>
            <div className={s.iconWrapper}>
              <i className="ri-phone-line"></i>
            </div>
            <div>
              <h5>Телефон</h5>
              <p>+380 95 877 71 07</p>
            </div>
          </div>

          {/* Робочий час */}
          <div className={s.infoItem}>
            <div className={s.iconWrapper}>
              <i className="ri-time-line"></i>
            </div>
            <div>
              <h5>Робочий час</h5>
              <p>Пн-Пт: 9:00 - 18:00</p>
            </div>
          </div>
        </div>

        {/* Соціальні мережі */}
        <div className={s.socialSection}>
          <h5>Соціальні мережі</h5>
          <div className={s.socialIcons}>
            {items.map((item) => (
              <SocialIcon key={item.alt} src={item.src} alt={item.alt} />
            ))}
          </div>
        </div>

        {/* Мапа */}
        <div className={s.mapContainer}>
          <img
            src="https://public.readdy.ai/gen_page/map_placeholder_1280x720.png"
            alt="Мапа"
            loading="lazy"
            className={s.map}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
