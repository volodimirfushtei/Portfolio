import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./homePage.module.css";

// Components
import HeroSection from "../../Components/HeroSection/HeroSection";
import Expertise from "../../Components/Expertise/Expertise";
import ControllerSkills from "../../Components/ControllerSkills/ControllerSkills";
import Carusel from "../../Components/Carusel/Carusel";
import CtaSection from "../../Components/CtaSection/CtaSection";
import Sertificate from "../../Components/Sertificate/Sertificate";
import StickyZoomSection from "../../Components/StickyZoomSection/StickyZoomSection";
import Footer from "../../Components/Footer/Footer";
import ScrollToTopBtn from "../../Components/ScrollToTopBtn/ScrollTotopBtn";
import SectionBadge from "../../Components/SectionBadge/SectionBadge";
import ScrollProgress from "../../Components/ScrollProgress/ScrollProgress";

/* ═════════════════════════════════════════════════════════════ */
/* SECTION CONFIGURATION */
/* ═════════════════════════════════════════════════════════════ */

const SECTIONS = [
  {
    id: "hero",
    number: "01",
    label: "Hero",
    Component: HeroSection,
    showBadge: true,
  },
  {
    id: "expertise",
    number: "02",
    label: "Expertise",
    Component: Expertise,
    showBadge: true,
  },
  {
    id: "skills",
    number: "03",
    label: "Skills",
    Component: ControllerSkills,
    showBadge: true,
  },
  {
    id: "projects",
    number: "04",
    label: "Projects",
    Component: Carusel,
    showBadge: true,
  },
  {
    id: "cta",
    number: "05",
    label: "CTA",
    Component: CtaSection,
    showBadge: true,
  },
  {
    id: "certificates",
    number: "06",
    label: "Certificates",
    Component: Sertificate,
    showBadge: true,
  },
  {
    id: "sticky",
    number: "07",
    label: "Sticky",
    Component: StickyZoomSection,
    showBadge: true,
  },
];

/* ═════════════════════════════════════════════════════════════ */
/* HOMEPAGE COMPONENT */
/* ═════════════════════════════════════════════════════════════ */

const HomePage = () => {
  const containerRef = useRef(null);
  const ctaRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* ✅ SCROLL PROGRESS TRACKING */
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      const progress =
        scrollHeight > 0
          ? Math.min(100, (scrollPosition / scrollHeight) * 100)
          : 0;

      setScrollProgress(progress);
      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${progress}%`,
      );
    };

    const throttledScroll = throttle(handleScroll, 16);
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  /* ✅ CTA PARALLAX ANIMATION */
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["end end", "end start"],
  });
  const ctaY = useTransform(scrollYProgress, [0, 1], ["0%", "-30px"]);

  return (
    <motion.div
      ref={containerRef}
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ═══════════════════════════════════════════════════════ */}
      {/* RENDER SECTIONS DYNAMICALLY */}
      {/* ═══════════════════════════════════════════════════════ */}
      {SECTIONS.map((section, index) => {
        const SectionComponent = section.Component;
        const isFirstSection = index === 0;

        return (
          <motion.section
            key={section.id}
            id={section.id}
            className={`${isFirstSection ? styles.hero : ""} ${styles.section}`}
            initial={{ opacity: 0 }}
            animate={isFirstSection ? { opacity: 1 } : undefined}
            whileInView={!isFirstSection ? { opacity: 1 } : undefined}
            transition={{ duration: 0.8 }}
            viewport={
              !isFirstSection ? { once: false, amount: 0.3 } : undefined
            }
          >
            {/* ✅ Render section component */}
            <SectionComponent />

            {/* ✅ Render dynamic badge */}
            {section.showBadge && (
              <SectionBadge
                number={section.number}
                label={section.label}
                sectionSelector={`#${section.id}`}
              />
            )}
          </motion.section>
        );
      })}

      {/* ═══════════════════════════════════════════════════════ */}
      {/* FOOTER */}
      {/* ═══════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Footer />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* FLOATING ELEMENTS */}
      {/* ═══════════════════════════════════════════════════════ */}
      <ScrollProgress progress={scrollProgress} />
      <ScrollToTopBtn />
    </motion.div>
  );
};

/* ═════════════════════════════════════════════════════════════ */
/* UTILITY FUNCTIONS */
/* ═════════════════════════════════════════════════════════════ */

/**
 * Throttle function to limit function calls
 * @param {Function} fn - Function to throttle
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(fn, wait) {
  let lastTime = Date.now();
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      fn(...args);
      lastTime = now;
    }
  };
}

export default HomePage;
