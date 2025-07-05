import React from "react";
import SocialIcon from "../SocialIcon/SocialIcon";
import s from "./ContactInfo.module.css";

const ContactInfo = ({ items }) => {
  return (
    <div className={s.contactInfo}>
      <div className={s.headerWrapper}>
        <h2 className={s.header}>Contact Info</h2>
      </div>

      <div className={s.infoList}>
        {/* Email */}
        <div className={s.infoItem}>
          <div className={s.iconWrapper}>
            <i className="ri-mail-line"></i>
          </div>
          <div className={s.infoText}>
            <h3 className={s.infoTitle}>Email</h3>
            <p className={s.infoDetail}>fuschteyy@gmail.com</p>
          </div>
        </div>

        {/* Phone */}
        <div className={s.infoItem}>
          <div className={s.iconWrapper}>
            <i className="ri-phone-line"></i>
          </div>
          <div className={s.infoText}>
            <h3 className={s.infoTitle}>Phone</h3>
            <p className={s.infoDetail}>+380 95 877 71 07</p>
          </div>
        </div>

        {/* Working Hours */}
        <div className={s.infoItem}>
          <div className={s.iconWrapper}>
            <i className="ri-time-line"></i>
          </div>
          <div className={s.infoText}>
            <h3 className={s.infoTitle}>Working Hours</h3>
            <p className={s.infoDetail}>Mon-Fri: 9:00 - 18:00</p>
          </div>
        </div>
      </div>

      {/* Social Networks */}
      <div className={s.socialSection}>
        <h3 className={s.socialTitle}>Social Networks</h3>
        <div className={s.socialIcons}>
          {items.map((item) => (
            <SocialIcon key={item.alt} src={item.src} alt={item.alt} />
          ))}
        </div>
      </div>

      {/* Map */}
      <div className={s.mapContainer}>
        <img
          src="https://public.readdy.ai/gen_page/map_placeholder_1280x720.png"
          alt="Location Map"
          loading="lazy"
          className={s.map}
          width="500"
          height="300"
        />
      </div>
    </div>
  );
};

export default ContactInfo;
