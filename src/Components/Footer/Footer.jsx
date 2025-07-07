import React from "react";
import s from "./Footer.module.css";

const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start text-muted bg-surface"
      style={{
        background: "var(--color-surface)",
        color: "var(--color-text)",
        padding: "2rem 0",
        borderTop: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <div className="container text-center text-md-start">
        <div className="row mt-3">
          {/* Company */}
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6
              className="text-uppercase fw-bold mb-4"
              style={{ color: "var(--color-title)" }}
            >
              My Portfolio
            </h6>
            <p style={{ color: "var(--color-text)" }}>
              Modern web applications and creative solutions.
            </p>
          </div>

          {/* Useful Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6
              className="text-uppercase fw-bold mb-4"
              style={{ color: "var(--color-title)" }}
            >
              Links
            </h6>
            <p>
              <a href="/" className={`${s.text_reset} text-decoration-none`}>
                Home
              </a>
            </p>
            <p>
              <a
                href="/projects"
                className={`${s.text_reset} text-decoration-none`}
              >
                Projects
              </a>
            </p>
            <p>
              <a
                href="/contacts"
                className={`${s.text_reset} text-decoration-none`}
              >
                Contacts
              </a>
            </p>
            <p>
              <a
                href="/tech"
                className={`${s.text_reset} text-decoration-none`}
              >
                Tech Stack
              </a>
            </p>
          </div>

          {/* Contact */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6
              className="text-uppercase fw-bold mb-4"
              style={{ color: "var(--color-title)" }}
            >
              Contact
            </h6>
            <p style={{ color: "var(--color-text)" }}>
              <i className="ri-map-pin-line me-2"></i>
              Ivano-Frankivsk, Ukraine
            </p>
            <p style={{ color: "var(--color-text)" }}>
              <i className="ri-mail-line me-2"></i>
              fushteyy@gmail.com
            </p>
            <p style={{ color: "var(--color-text)" }}>
              <i className="ri-phone-line me-2"></i>
              +380 95 877 71 07
            </p>
          </div>
        </div>
      </div>

      <div
        className="text-center py-3 "
        style={{
          borderTop: "1px solid rgba(0,0,0,0.1)",
          marginTop: "1rem",
          fontSize: "0.9rem",
          color: "var(--color-text)",
        }}
      >
        © {new Date().getFullYear()} My Portfolio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
