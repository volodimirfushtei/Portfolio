import { Outlet } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import Header from "../Header/Header";

import s from "./Layout.module.css";




 

const Layout = () => {
  return (
    <div className={s.layoutContainer}>
      <Header />

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
