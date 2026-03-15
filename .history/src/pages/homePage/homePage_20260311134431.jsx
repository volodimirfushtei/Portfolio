import { sections } from "../../constants/sections";
import styles from "./HomePage.module.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CornerBadge from "../../Components/CornerBadge/CornerBadge";
import ScrollToTopBtn from "../../Components/ScrollToTopBtn/ScrollTotopBtn";

const HomePage = () => {
  const [activeSection, setActiveSection] = useState(sections[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find((s) => s.id === entry.target.id);
            if (section) setActiveSection(section);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-100px 0px -100px 0px" },
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div className={styles.container}>
      {/* Corner Badge - змінюється при скролі */}
      <CornerBadge number={activeSection.number} label={activeSection.label} />
      <ScrollToTopBtn />

      {/* Рендеримо всі секції з id */}
      {sections.map(({ id, component: Component }) => (
        <section key={id} id={id} className={styles.section}>
          <Component />
        </section>
      ))}

      <Footer />
    </motion.div>
  );
};

// Throttle function for scroll events
function throttle(fn, wait) {
  let time = Date.now();
  return function () {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}

export default HomePage;
