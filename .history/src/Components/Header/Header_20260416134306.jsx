import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import styles from "./Header.module.css";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import FullscreenButton from "../FullScreenButton/FullScreenButton";
import useScrollDetection from "../../hooks/useScrollDetection";
import Logo from "../Logo/Logo";
import { NAV_ITEMS } from "../../constants/navigations";

// Винесено в окремий хук для чистоти коду
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
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
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
  const location = useLocation();

  const isScrolled = useScrollDetection(50);
  const scrollDirection = useScrollDirection();

  // Закриваємо меню при зміні роуту
  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
      document.body.style.overflow = "";
    }
  }, [location.pathname, menuOpen]);

  // Hide/show on scroll
  useEffect(() => {
    if (isScrolled && scrollDirection === "down") setHidden(true);
    else if (scrollDirection === "up" || !isScrolled) setHidden(false);
  }, [isScrolled, scrollDirection]);

  // Анімація хедера
  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(headerRef.current, {
        y: hidden ? -100 : 0,
        opacity: hidden ? 0 : 1,
        duration: 0.4,
        ease: "power2.inOut",
      });
    });

    return () => ctx.revert();
  }, [hidden]);

  // Анімація мобільного меню
  useEffect(() => {
    const links = navLinksRef.current.filter(Boolean);

    if (menuOpen && links.length) {
      // Анімація появи
      gsap.fromTo(
        links,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.2,
          ease: "back.out(0.7)",
        }
      );
    } else if (!menuOpen && links.length) {
      // Анімація зникнення
      gsap.to(links, {
        y: 30,
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
    
    // Блокуємо прокрутку на тач-пристроях
    if (next) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.width = "";
    }
  }, [menuOpen]);

  // Очищення при розмонтуванні
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, []);

  // Мемоізація навігаційних елементів
  const navItems = useMemo(() => NAV_ITEMS, []);

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${
        menuOpen ? styles.menuOpen : ""
      }`}
    >
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logoLink} aria-label="Home">
          <div className={styles.logo}>
            <Logo />
            <span className={styles.logoText}>Volodimir Fushtei</span>
          </div>
        </Link>

        <div className={styles.rightSection}>
          <ToggleTheme />
          <FullscreenButton />

          {/* Desktop navigation */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {navItems.map((item) => (
              <div key={item.path} className={styles.navItem}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                  aria-current={({ isActive }) => isActive ? "page" : undefined}
                >
                  {item.icon && <i className={item.icon} aria-hidden="true" />}
                  <span>{item.label}</span>
                </NavLink>
              </div>
            ))}

            {/* CTA button */}
            <Link
              to="/contacts"
              className={styles.ctaBtn}
              aria-label="Book 15 minutes consultation"
            >
              <img
                src="/images/Myphoto.webp"
                alt=""
                className={styles.ctaPhoto}
                aria-hidden="true"
                loading="lazy"
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

          {/* Mobile burger button */}
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

      {/* Mobile menu overlay */}
      <div
        ref={mobileMenuRef}
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuVisible : ""}`}
        role="dialog"
        aria-hidden={!menuOpen}
        aria-modal={menuOpen}
      >
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              ref={(el) => {
                if (el) navLinksRef.current[index] = el;
              }}
              className={({ isActive }) =>
                `${styles.mobileNavLink} ${isActive ? styles.active : ""}`
              }
              onClick={toggleMenu}
            >
              <span className={styles.mobileNum}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.mobileNavLabel}>{item.label}</span>
              {item.icon && <i className={item.icon} aria-hidden="true" />}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
