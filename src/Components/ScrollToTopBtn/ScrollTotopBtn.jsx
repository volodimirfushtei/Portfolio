// components/ScrollToTopBtn.tsx

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ScrollToTopBtn = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 300);

      // Розрахунок прогресу
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.button
      className="fixed bottom-8 right-8 z-50"
      animate={{
        opacity: isScrolled ? 1 : 0,
        y: isScrolled ? 0 : 20,
      }}
      transition={{ type: "spring", damping: 15, stiffness: 100 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.1 }}
      aria-label="Scroll to top"
    >
      {/* Круговий прогрес */}
      <div className="relative w-18 h-18">
        {/* Фонове кільце */}
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="1"
            className="origin-center transform -rotate-90"
          />
          {/* Прогрес */}
          <motion.path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#ff0000"
            strokeWidth="1"
            strokeDasharray="100"
            strokeDashoffset={100 - scrollProgress}
            className="origin-center transform -rotate-90"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 100 - scrollProgress }}
            transition={{ duration: 0.3 }}
          />
        </svg>

        {/* Стрілка всередині */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <motion.div
            className="text-var(--colot-text) text-sm "
            animate={{
              y: hovered ? [-3, 3, -3] : 0,
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <i className="ri-arrow-up-s-line   flex flex-col ">Top</i>
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
};

export default ScrollToTopBtn;
