import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { gsap } from "gsap";
import styles from "./Header.module.css";

import ToggleTheme from "../ToggleTheme/ToggleTheme";
import FullscreenButton from "../FullScreenButton/FullScreenButton";
import Logo from "../Logo/Logo";
import { NAV_ITEMS } from "../../constants/navigations";

const Header = () => {
  const headerRef = useRef(null);
  const navLinksRef = useRef([]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastScroll = useRef(0);

  // 🔹 scroll hide/show (простий)
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll.current && current > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🔹 header animation
  useEffect(() => {
    gsap.to(headerRef.current, {
      y: hidden ? -80 : 0,
      opacity: hidden ? 0 : 1,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [hidden]);

  // 🔹 mobile menu animation
  useEffect(() => {
    const links = navLinksRef.current;

    if (menuOpen) {
      gsap.fromTo(
        links,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(links, {
        y: 20,
        opacity: 0,
        duration: 0.3,
      });
    }

    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${hidden ? styles.hidden : ""}`}
    >
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Logo />
          <span>Volodimir</span>
        </div>

        {/* Right */}
        <div className={styles.right}>
          <ToggleTheme />
          <FullscreenButton />

          {/* Desktop */}
          <nav className={styles.nav}>
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
          </nav>

          {/* Burger */}
          <button
            className={styles.burger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div
        className={`${styles.mobile} ${
          menuOpen ? styles.mobileOpen : ""
        }`}
      >
        {NAV_ITEMS.map((item, i) => (
          <NavLink
            key={item.path}
            to={item.path}
            ref={(el) => (navLinksRef.current[i] = el)}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default Header;
