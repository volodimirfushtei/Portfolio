import { useState, useEffect, useRef, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import styles from "./Header.module.css";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import FullscreenButton from "../FullScreenButton/FullScreenButton";
import useScrollDetection from "../../hooks/useScrollDetection";
import Logo from "../Logo/Logo";
import { NAV_ITEMS } from "../../constants/navigations";

const Header = () => {
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();

  const isScrolled = useScrollDetection(50);
  const [scrollDirection, setScrollDirection] = useState("up");
  const prevScrollRef = useRef(0);

  // Спрощений напрямок скролу
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollDirection(prevScrollRef.current > currentScroll ? "up" : "down");
      prevScrollRef.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ховаємо/показуємо хедер
  useEffect(() => {
    if (isScrolled && scrollDirection === "down") {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [isScrolled, scrollDirection]);

  // Анімація хедера
  useEffect(() => {
    if (!headerRef.current) return;
    
    gsap.to(headerRef.current, {
      y: hidden ? -120 : 0,
      duration: 0.4,
      ease: "power2.inOut",
    });
  }, [hidden]);

  // Закриваємо меню при зміні сторінки
  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
      document.body.style.overflow = "";
    }
  }, [location.pathname]);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
    document.body.style.overflow = !menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${hidden ? styles.hidden : ""}`}
    >
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <Logo />
          <span className={styles.logoText}>Volodimir Fushtei</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          
          <Link to="/contacts" className={styles.ctaBtn}>
            <img src="/images/preview.webp" alt="" className={styles.ctaPhoto} />
            <div className={styles.ctaText}>
              <span>Grab 15 minutes</span>
              <span className={styles.ctaStatus}>Open and ready</span>
            </div>
          </Link>
        </nav>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <ToggleTheme />
          <FullscreenButton />
          
          {/* Burger Button */}
          <button
            className={`${styles.burger} ${menuOpen ? styles.open : ""}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        <nav className={styles.mobileNav}>
          {NAV_ITEMS.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `${styles.mobileNavLink} ${isActive ? styles.active : ""}`
              }
              onClick={toggleMenu}
            >
              <span className={styles.mobileNum}>0{index + 1}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
