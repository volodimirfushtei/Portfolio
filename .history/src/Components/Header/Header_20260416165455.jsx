import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";

import ToggleTheme from "../ToggleTheme/ToggleTheme";
import FullscreenButton from "../FullScreenButton/FullScreenButton";
import useScrollDetection from "../../hooks/useScrollDetection";
import Logo from "../Logo/Logo";
import { NAV_ITEMS } from "../../constants/navigations";

/* ─────────────────────────────────────────────
   Scroll direction (lightweight)
──────────────────────────────────────────── */
const useScrollDirection = () => {
  const [direction, setDirection] = useState("up");

  useEffect(() => {
    let prev = window.scrollY;

    const handleScroll = () => {
      const curr = window.scrollY;
      setDirection(curr > prev ? "down" : "up");
      prev = curr;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return direction;
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const isScrolled = useScrollDetection(50);
  const scrollDirection = useScrollDirection();

  /* ── Hide / show header ── */
  useEffect(() => {
    if (isScrolled && scrollDirection === "down") {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [isScrolled, scrollDirection]);

  /* ── Lock scroll when menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`
        ${styles.header}
        ${hidden ? styles.headerHidden : ""}
        ${isScrolled ? styles.scrolled : ""}
      `}
    >
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Logo />
          <span className={styles.logoText}>Volodimir Fushtei</span>
        </div>

        {/* Right side */}
        <div className={styles.right}>
          <ToggleTheme />
          <FullscreenButton />

          {/* Desktop nav */}
          <nav className={styles.desktopNav}>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* CTA */}
            <Link to="/contacts" className={styles.cta}>
              <img src="/images/Myphoto.jpg" alt="" />
              <div>
                <span>Grab 15 minutes</span>
                <small>Open and ready</small>
              </div>
            </Link>
          </nav>

          {/* Burger */}
          <button
            className={`${styles.burger} ${menuOpen ? styles.open : ""}`}
            onClick={toggleMenu}
            aria-label="menu"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <nav className={styles.mobileNav}>
          {NAV_ITEMS.map((item, i) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={toggleMenu}
              className={styles.mobileLink}
            >
              <span className={styles.num}>0{i + 1}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
