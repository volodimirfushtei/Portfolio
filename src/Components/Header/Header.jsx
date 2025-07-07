import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
const Header = () => {
  return (
    <header
      className="navbar navbar-expand-lg navbar-light"
      style={{
        background: "var(--color-surface)",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        padding: "0.75rem 1.5rem",
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Логотип */}
        <Link
          to="/"
          className="navbar-brand fw-bold"
          style={{
            color: "var(--color-title)",
            fontSize: "1.25rem",
            textDecoration: "none",
          }}
        >
          <i className="bi bi-code-slash mr-2 "></i>
          MyPortfolio
        </Link>
        <Link to="/notifications" className="position-relative left-60">
          <i className="ri-notification-line"></i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </Link>

        {/* Навігація */}
        <nav className="d-none d-lg-flex align-items-center gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${s.nav_link} ${
                isActive ? "text-primary fw-bold" : "text-reset"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "text-primary fw-bold" : "text-decoration-none"
              }`
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/tech"
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-primary fw-bold" : "text-reset"}`
            }
          >
            Technology
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-primary fw-bold" : "text-reset"}`
            }
          >
            Contacts
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
