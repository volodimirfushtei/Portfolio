import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Header.module.css";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import FullscreenButton from "../FullScreenButton/FullScreenButton";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  const navItems = [
    { path: "/", icon: "ri-home-line", label: "Home" },
    { path: "/projects", icon: "ri-briefcase-line", label: "Projects" },
    { path: "/tech", icon: "ri-code-line", label: "Tech" },
    { path: "/contacts", icon: "ri-contacts-line", label: "Contacts" },
  ];

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
        mobileMenuOpen ? styles.mobileMenuOpen : ""
      }`}
    >
      <div className={styles.container}>
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/" className={styles.logo}>
            <i className={`ri-code-s-slash-line ${styles.logoIcon}`}></i>
            <span>MyPortfolio</span>
          </Link>
        </motion.div>

        <div className={styles.rightSection}>
          <ToggleTheme />
          <FullscreenButton />

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navItems.map((item) => (
              <div
                key={item.path}
                onMouseEnter={() => setIsHovering(item.path)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  <i className={item.icon}></i>
                  {isHovering === item.path && (
                    <motion.span
                      className={styles.navLabel}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </NavLink>
              </div>
            ))}

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/contacts" className={styles.contactButton}>
                Contact Me
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? (
              <i className="ri-close-line"></i>
            ) : (
              <i className="ri-menu-line"></i>
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav
              className={styles.mobileNav}
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `${styles.mobileNavLink} ${isActive ? styles.active : ""}`
                    }
                    onClick={toggleMobileMenu}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contacts"
                  className={styles.mobileContactButton}
                  onClick={toggleMobileMenu}
                >
                  Contact Me
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
