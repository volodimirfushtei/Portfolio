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
  const scrollPosition = useScrollDetection(50);
  
  const isScrolled = useScrollDetection(50) > 50;
  
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
  const navLinksRef = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const isScrolled = useScrollDetection(50);
  const scrollDirection = useScrollDirection();

  /* ── Hide/show on scroll ── */
  useEffect(() => {
    if (isScrolled && scrollDirection === "down") setHidden(true);
    else if (scrollDirection === "up" || !isScrolled) setHidden(false);
  }, [isScrolled, scrollDirection]);

  useEffect(() => {
  if (!headerRef.current) return;

  const ctx = gsap.context(() => {
    gsap.to(headerRef.current, {
      y: hidden ? -100 : 0,
      opacity: hidden ? 0 : 1,
      duration: 0.5,
    });
  });

  return () => ctx.revert();
}, [hidden]);

  /* ── Mobile menu animations ── */
useEffect(() => {
  const links = navLinksRef.current.filter(Boolean);
  
if (links.length) {
  gsap.fromTo(
    links,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 }
  );
}

  if (menuOpen) {
    gsap.fromTo(
      links,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.3,
        ease: "power4.out",
      }
    );
  } else {
    gsap.to(links, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
    });
  }
}, [menuOpen]);

  const toggleMenu = useCallback(() => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  }, [menuOpen]);

  /* cleanup overflow on unmount */
  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    []
  );

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Logo />
          <span className={styles.logoText}>Portfolio</span>
        </div>
        <div className={styles.rightSection}>
          <ToggleTheme />
          <FullscreenButton />

          {/* Desktop nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <div key={item.path} className={styles.navItem}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  <i className={item.icon} aria-hidden="true" />
                  <span className={styles.navLabel}>{item.label}</span>
                </NavLink>
              </div>
            ))}

            {/* CTA button */}
            <Link
              to="/contacts"
              className={styles.ctaBtn}
              aria-label="Grab 15 minutes with us"
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
        <nav className={styles.mobileNav}>
          {NAV_ITEMS.map((item, i) => (
            <NavLink
              key={item.path}
              to={item.path}
              ref={(el) => (navLinksRef.current[i] = el)}
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
    </header>
  );
};

export default Header;
