import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { gsap } from "gsap";
import styles from "./Header.module.css";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import FullscreenButton from "../FullScreenButton/FullScreenButton";
import useScrollDetection from "../../hooks/useScrollDetection";
import Logo from "../Logo/Logo";

const useScrollDirection = () => {
  const [direction, setDirection] = useState(null);
  const prev = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY;
      setDirection(prev.current > cur ? "up" : "down");
      prev.current = cur;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return direction;
};

const navItems = [
  { path: "/", icon: "ri-home-line", label: "Home" },
  { path: "/projects", icon: "ri-briefcase-line", label: "Projects" },
  { path: "/tech", icon: "ri-code-line", label: "Tech" },
  { path: "/contacts", icon: "ri-contacts-line", label: "Contacts" },
  { path: "/error", icon: "ri-error-warning-line", label: "Test Error" },
];

const Header = () => {
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovering, setHovering] = useState(null);
  const [hidden, setHidden] = useState(false);

  const isScrolled = useScrollDetection(100);
  const scrollDirection = useScrollDirection();

  /* ── Hide/show on scroll ── */
  useEffect(() => {
    if (isScrolled && scrollDirection === "down") setHidden(true);
    else if (scrollDirection === "up" || !isScrolled) setHidden(false);
  }, [isScrolled, scrollDirection]);

  useEffect(() => {
    gsap.to(headerRef.current, {
      y: hidden ? -100 : 0,
      opacity: hidden ? 0 : 1,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [hidden]);

  /* ── Mobile menu open/close ── */
  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "";

    if (next) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: "power3.in",
      });
    }
  };

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
            {navItems.map((item) => (
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
            <a
              href="/contacts"
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
            </a>
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
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className={styles.mobileMenu}
          role="dialog"
          aria-label="Navigation"
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
            {navItems.map((item, i) => (
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
                <i className={item.icon} aria-hidden="true" />
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
