import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Header.module.css";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import FullscreenButton from "../FullScreenButton/FullScreenButton";
import useScrollDetection from "../../hooks/useScrollDetection";
import Logo from "../Logo/Logo";

// Додаємо хук для визначення напрямку скролу
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [prevOffset, setPrevOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      setScrollDirection(prevOffset > currentOffset ? "up" : "down");
      setPrevOffset(currentOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevOffset]);

  return scrollDirection;
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(null);
  const [isHidden, setIsHidden] = useState(false);

  const isScrolled = useScrollDetection(100);
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    if (isScrolled && scrollDirection === "down") {
      setIsHidden(true);
    } else if (scrollDirection === "up" || !isScrolled) {
      setIsHidden(false);
    }
  }, [isScrolled, scrollDirection]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  const navItems = [
    { path: "/", icon: "ri-home-line", label: "Home" },
    { path: "/projects", icon: "ri-briefcase-line", label: "Projects" },
    { path: "/tech", icon: "ri-code-line", label: "Tech" },
    { path: "/contacts", icon: "ri-contacts-line", label: "Contacts" },
    {
      path: "/error",
      icon: "ri-error-warning-line",
      label: "Test Error",
    },
  ];

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${
        mobileMenuOpen ? styles.mobileMenuOpen : ""
      }`}
      initial={{ y: 0 }}
      animate={{
        y: isHidden ? -100 : 0,
        opacity: isHidden ? 0 : 1,
      }}
      transition={{ type: "spring", damping: 15, stiffness: 100 }}
    >
      <div className={styles.container}>
        {/* Logo */}

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/about" className={styles.logo}>
            <Logo />

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
              <a
                href="/contacts"
                target="_blank"
                aria-label="Grab 15 minutes with us"
                rel="noopener noreferrer"
                className="w-inline-block text-decoration-none"
              >
                <div
                  className={`${styles.button_main} ${styles.first_01} w-inline-block`}
                >
                  <div className={styles.photo}>
                    <img
                      src="/images/Myphoto.jpg"
                      alt="photo"
                      className={styles.photo_main}
                    />
                  </div>
                  <div className={`${styles.button_flex_text} flex`}>
                    <div className={styles.button_text_01}>
                      Grab 15 minutes with us
                    </div>

                    <div className={`${styles.avaible_wrapper} flex`}>
                      <div className={styles.avaible_dot}></div>
                      <div className={styles.button_text_02}>
                        Open and ready
                      </div>
                    </div>
                  </div>
                </div>
              </a>
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
              ></motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
