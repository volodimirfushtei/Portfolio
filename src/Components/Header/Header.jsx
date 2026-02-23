import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCallback } from "react";
import { gsap } from "gsap";
import styles from "./Header.module.css";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import FullscreenButton from "../FullScreenButton/FullScreenButton";
import useScrollDetection from "../../hooks/useScrollDetection";
import Logo from "../Logo/Logo";
import { NAV_ITEMS } from "../../constants/navigations";
const useScrollDirection = () => {
  const [direction, setDirection] = useState(null);
  const prevRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const cur = window.scrollY;
        setDirection(prevRef.current > cur ? "up" : "down");
        prevRef.current = cur;
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return direction;
};

const Header = () => {
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovering, setHovering] = useState(null);
  const [hidden, setHidden] = useState(false);

  const isScrolled = useScrollDetection(100);
  const scrollDirection = useScrollDirection();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ── Hide/show on scroll ── */
  useEffect(() => {
    if (isScrolled && scrollDirection === "down") setHidden(true);
    else if (scrollDirection === "up" || !isScrolled) setHidden(false);
  }, [isScrolled, scrollDirection]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(headerRef.current, {
        y: hidden ? -100 : 0,
        opacity: hidden ? 0 : 1,
        duration: 0.45,
        ease: "power3.out",
      });
    }, headerRef);

    return () => ctx.revert(); // Clean up GSAP animations
  }, [hidden]);

  // Similarly for mobile menu animations
  const toggleMenu = useCallback(() => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "";

    if (next && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
          onReverseComplete: () => {
            // Cleanup if needed
          },
        },
      );
    } else if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: "power3.in",
      });
    }
  }, [menuOpen]);
  // Focus trap (optional but recommended)
  useEffect(() => {
    if (menuOpen) {
      const focusableElements = mobileMenuRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusableElements?.length) {
        focusableElements[0].focus();
      }
    }
  }, [menuOpen]);
  /* cleanup overflow on unmount */
  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/about" className={styles.logo}>
          <Logo />
          <span className={styles.logoText}>Portfolio</span>
        </Link>

        <div className={styles.rightSection}>
          <ToggleTheme />
          <FullscreenButton />

          {/* Desktop nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.path}
                className={styles.navItem}
                onMouseEnter={() => setHovering(item.path)}
                onMouseLeave={() => setHovering(null)}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  <i className={item.icon} aria-hidden="true" />
                  {hovering === item.path && (
                    <span className={styles.navLabel}>{item.label}</span>
                  )}
                </NavLink>
              </div>
            ))}

            {/* CTA button */}
            <Link
              to="/contacts"
              className={styles.ctaBtn}
              aria-label="Grab 15 minutes with us"
              rel="noopener noreferrer"
            >
              <img
                src="/images/Myphoto.jpg"
                alt=""
                className={styles.ctaPhoto}
                aria-hidden="true"
              />
              <div className={styles.ctaText}>
                <span className={styles.ctaMain}>Grab 15 minutes</span>
                <span className={styles.ctaSub}>
                  <span className={styles.ctaDot} aria-hidden="true" />
                  Open and ready
                </span>
              </div>
            </Link>
          </nav>

          {/* Mobile burger */}
          <button
            className={styles.burger}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`${styles.burgerLine} ${menuOpen ? styles.burgerOpen : ""}`}
            />
            <span
              className={`${styles.burgerLine} ${menuOpen ? styles.burgerOpen : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuVisible : ""}`}
        role="dialog"
        aria-hidden={!menuOpen}
      >
        {/* Top bar with counter */}
        <div className={styles.mobileTop}>
          <span className={styles.mobileLabel}>Navigation</span>
          <button
            className={styles.mobileClose}
            onClick={toggleMenu}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <nav className={styles.mobileNav}>
          {NAV_ITEMS.map((item, i) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.mobileNavLink} ${isActive ? styles.active : ""}`
              }
              onClick={toggleMenu}
            >
              <span className={styles.mobileNum}>0{i + 1}</span>
              <span className={styles.mobileNavLabel}>{item.label}</span>
              <i
                className={item.icon}
                aria-hidden="true"
                aria-label={item.label}
              />
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
