import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.column}>
          <h4>Portfolio</h4>
          <p>Modern web development solutions tailored to your needs</p>
          <div className={styles.socialLinks}>
            {["ri-github-fill", "ri-linkedin-fill", "ri-twitter-fill"].map(
              (icon, i) => (
                <a key={i} href="#" aria-label="Social media link">
                  <i className={icon}></i>
                </a>
              )
            )}
          </div>
        </div>

        <div className={styles.column}>
          <h4>Quick Links</h4>
          <ul>
            {["Home", "Projects", "About", "Contact"].map((link, i) => (
              <li key={i}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Contact</h4>
          <address>
            <p>
              <i className="ri-map-pin-line"></i> Ivano-Frankivsk, Ukraine
            </p>
            <p>
              <i className="ri-mail-line"></i> fushteyy@gmail.com
            </p>
            <p>
              <i className="ri-phone-line"></i> +380 95 877 71 07
            </p>
          </address>
        </div>
      </div>

      <div className={styles.copyright}>
        © {new Date().getFullYear()} My Portfolio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
