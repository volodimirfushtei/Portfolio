import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useWindowSize from "../../hooks/useWindowSize";
import Header from "../Header/Header";

import Overlay from "../Overlay/Overlay";

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
  return (
    <div className={s.layoutContainer}>
      <Header />
<Overlay  />
      <motion.main
        className={`${s.mainContent} `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </motion.main>
    </div>
  );
};

export default Layout;
