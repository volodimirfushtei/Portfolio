import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
const Header = () => {
  return (
    <header
      className="navbar navbar-expand-lg navbar-light w-378 "
      style={{
        background: "transparent",
        color: "var(--color-text)",

        padding: "2rem 0",
        backdropFilter: "blur(10px)",
        borderBottom: "6px solid var(--color-border)",
      }}
    >
      <div className="container-fluid p-0 d-flex align-items-center justify-content-evenly">
        {/* Логотип */}
        <Link
          to="/"
          className="navbar-brand fw-bold"
          style={{
            color: "var(--color-title)",
            fontSize: "1.8rem",
            textDecoration: "none",
          }}
        >
          <i className="bi bi-code-slash mr-2 "></i>
          MyPortfolio
        </Link>
        <Link to="/notifications" className="position-relative left-40">
          <i className="ri-notification-line"></i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </Link>
        {/* Навігація */}
        <nav className="d-none d-lg-flex align-items-center gap-3 text-var(--color-text)">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${s.nav_link} ${isActive ? s.active : ""}`
            }
          >
            <i className="ri-home-line mr-2"></i>
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${s.nav_link} ${isActive ? s.active : ""}`
            }
          >
            <i className="ri-briefcase-line mr-2"></i>
          </NavLink>

          <NavLink
            to="/tech"
            className={({ isActive }) =>
              `${s.nav_link} ${isActive ? s.active : ""}`
            }
          >
            <i className="ri-code-line mr-2"></i>
          </NavLink>

          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `${s.nav_link} ${isActive ? s.active : ""}`
            }
          >
            <i className="ri-contacts-line mr-2"></i>
          </NavLink>

          <Link
            to="/contacts"
            className="btn btn-primary btn-sm ms-3"
            style={{
              borderRadius: "30px",
              textTransform: "uppercase",
              fontWeight: "500",
            }}
          >
            Contact Me
          </Link>
        </nav>

        {/* Mobile burger button */}
        <button
          className="btn d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mobileMenu"
          aria-controls="mobileMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="ri-menu-line" style={{ fontSize: "1.5rem" }}></i>
        </button>
      </div>

      {/* Mobile menu */}
      <div className="collapse d-lg-none" id="mobileMenu">
        <nav className="d-flex flex-column p-3 gap-2">
          <Link to="/" className={`${s.nav_link} text-reset`}>
            Home
          </Link>
          <Link to="/projects" className={`${s.nav_link} text-reset`}>
            Projects
          </Link>
          <Link to="/tech" className={`${s.nav_link} text-reset`}>
            Tech Stack
          </Link>
          <Link to="/contacts" className={`${s.nav_link} text-reset`}>
            Contacts
          </Link>
          <Link
            to="/contacts"
            className="btn btn-primary btn-sm mt-2"
            style={{ borderRadius: "30px" }}
          >
            Contact Me
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
