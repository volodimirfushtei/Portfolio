import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useWindowSize from "../../hooks/useWindowSize";
import Header from "../Header/Header";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import Overlay from "../Overlay/Overlay";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import s from "./Layout.module.css";

const menuItems = [
  {
    src: "/icons/home.svg",
    alt: "Home",
    href: "/",
    label: "Home",
    icon: "ri-home-line",
  },
  {
    src: "/icons/contacts.svg",
    alt: "Contacts",
    href: "/contacts",
    label: "Contacts",
    icon: "ri-contacts-line",
  },
  {
    src: "/icons/projects.svg",
    alt: "Projects",
    href: "/projects",
    label: "Projects",
    icon: "ri-briefcase-line",
  },
  {
    src: "/icons/tech.svg",
    alt: "Tech Stack",
    href: "/tech",
    label: "Tech Stack",
    icon: "ri-code-line",
  },
];

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className={s.layoutContainer}>
      {isMobile && (
        <button
          onClick={toggleMobileMenu}
          className={s.mobileMenuButton}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="sidebar-menu"
        >
          {isMobileMenuOpen ? (
            <i className="ri-close-line"></i>
          ) : (
            <i className="ri-menu-line"></i>
          )}
        </button>
      )}

      <Header />
      <SidebarMenu
        menuItems={menuItems}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      <AnimatePresence>
        {isMobile && isMobileMenuOpen && <Overlay onClick={toggleMobileMenu} />}
      </AnimatePresence>

      <motion.main
        className={`${s.mainContent} ${isMobileMenuOpen ? s.blurContent : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <Outlet context={{ isMobile }} />
        </AnimatePresence>
      </motion.main>
    </div>
  );
};

export default Layout;
