import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import ToggleTheme from "../ToggleTheme/ToggleTheme";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
        mobileMenuOpen ? styles.mobileMenuOpen : ""
      }`}
    >
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <i className={`ri-code-s-slash-line ${styles.logoIcon}`}></i>
          <span>MyPortfolio</span>
        </Link>
        <ToggleTheme />
        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <i className="ri-home-line"></i>
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <i className="ri-briefcase-line"></i>
          </NavLink>

          <NavLink
            to="/tech"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <i className="ri-code-line"></i>
          </NavLink>

          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <i className="ri-contacts-line"></i>
          </NavLink>

          <Link to="/contacts" className={styles.contactButton}>
            Contact Me
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? (
            <i className="ri-close-line"></i>
          ) : (
            <i className="ri-menu-line"></i>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${
          mobileMenuOpen ? styles.mobileMenuActive : ""
        }`}
      >
        <nav className={styles.mobileNav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.mobileNavLink} ${isActive ? styles.active : ""}`
            }
            onClick={toggleMobileMenu}
          >
            <i className="ri-home-line"></i>
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${styles.mobileNavLink} ${isActive ? styles.active : ""}`
            }
            onClick={toggleMobileMenu}
          >
            <i className="ri-briefcase-line"></i>
            <span>Projects</span>
          </NavLink>

          <NavLink
            to="/tech"
            className={({ isActive }) =>
              `${styles.mobileNavLink} ${isActive ? styles.active : ""}`
            }
            onClick={toggleMobileMenu}
          >
            <i className="ri-code-line"></i>
            <span>Tech</span>
          </NavLink>

          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              `${styles.mobileNavLink} ${isActive ? styles.active : ""}`
            }
            onClick={toggleMobileMenu}
          >
            <i className="ri-contacts-line"></i>
            <span>Contacts</span>
          </NavLink>

          <Link
            to="/contacts"
            className={styles.mobileContactButton}
            onClick={toggleMobileMenu}
          >
            Contact Me
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
