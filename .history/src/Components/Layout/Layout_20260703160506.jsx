import { Outlet } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import ScrollToTopBtn from "../ScrollToTopBtn/ScrollTotopBtn";
import Header from "../Header/Header";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import gsap from "gsap";
import s from "./Layout.module.css";






const Layout = () => {

 




  return (
    <div className={s.layoutContainer}>
      <Header />
      <ScrollToTopBtn />
      <main
        className={`${s.mainContent} `}

      >
        <div  id="smooth-wrapper" className="wrapper overflow-hidden">
          <div  id="smooth-content" className="content will-change-transform">
            <AnimatePresence mode="wait">

              <Outlet key={location.pathname} />
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
