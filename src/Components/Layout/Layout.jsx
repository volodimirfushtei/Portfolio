import { Outlet } from "react-router-dom";
import SidebarMenu from "../SidebarMenu/SidebarMenu.jsx";
import Overlay from "../Overlay/Overlay.jsx";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion as MotionPathHelper } from "framer-motion";
import useWindowSize from "../../hooks/useWindowSize.js";
import Header from "../Header/Header.jsx";

const menuItems = [
  {
    src: "/icons/home.svg",
    alt: "Home",
    href: "/",
    label: "Home",
  },
  {
    src: "/icons/contacts.svg",
    alt: "Contacts",
    href: "/contacts",
    label: "Contacts",
  },
  {
    src: "/icons/projects.svg",
    alt: "Projects",
    href: "/projects",
    label: "Projects",
  },
  {
    src: "/icons/tech.svg",
    alt: "Tech Stack",
    href: "/tech",
    label: "Tech Stack",
  },
];

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  // Auto-close mobile menu when resizing to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-row h-screen bg-(var(--color-background))">
      {/* Sidebar - hidden on mobile when menu is closed */}
      <MotionPathHelper.div
        initial={{ opacity: 0, x: -100, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        className={`fixed top-0 left-0  text-white ${
          isMobile && !isMobileMenuOpen ? "hidden" : ""
        }`}
        aria-label="Sidebar"
        role="navigation"
        aria-hidden={!isMobileMenuOpen}
        aria-expanded={isMobileMenuOpen}
      >
        <SidebarMenu
          items={menuItems}
          onClose={isMobile ? toggleMobileMenu : null}
        />
      </MotionPathHelper.div>

      {/* Mobile menu button (hamburger) */}
      {isMobile && (
        <button
          onClick={toggleMobileMenu}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && <Overlay onClick={toggleMobileMenu} />}
      </AnimatePresence>

      {/* Main content area */}
      <main className="flex-1 ml-36 overflow-auto  transition-all duration-300">
        <AnimatePresence mode="wait">
          <Outlet context={{ isMobile }} />
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;
