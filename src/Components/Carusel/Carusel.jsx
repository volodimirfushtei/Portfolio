import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MonitorSmartphone, Workflow, Clock, Users } from "lucide-react";
import SoftSkills from "../SoftSkills/SoftSkills";
import styles from "./Carusel.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Carousel() {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const slideRefs = useRef([]);


  const slides = useMemo(
    () => [
      {
        id: 1,
        image: "/images/business.jpg",
        title: "Frontend Development",
        subtitle: "Building responsive UIs with React & Next.js",
        Icon: MonitorSmartphone,
      },
      {
        id: 2,
        image: "/images/happyt.jpg",
        title: "Backend Integration",
        subtitle: "Creating seamless API connections",
        Icon: Workflow,
      },
      {
        id: 3,
        image: "/images/managmant.jpg",
        title: "Performance Optimization",
        subtitle: "Fast, efficient web applications",
        Icon: Clock,
      },
      {
        id: 4,
        image: "/images/business.jpg",
        title: "User Experience",
        subtitle: "Intuitive and accessible interfaces",
        Icon: Users,
      },
    ],
    [],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;



    const ctx = gsap.context(() => {
      /* ── Update progress bar based on scroll position ── */
      const updateProgress = () => {
        const { scrollTop, scrollHeight, clientHeight } = container;
        if (scrollHeight === clientHeight) return; // Уникнути ділення на 0

        const pct = scrollTop / (scrollHeight - clientHeight);
        if (progressRef.current) {
          gsap.to(progressRef.current, {
            scaleY: Math.max(0, Math.min(1, pct)),
            duration: 0.1,
            overwrite: "auto",
          });
        }
      };

      // Обробник скролу з throttling для оптимізації
      let scrollTimeout;
      const handleScroll = () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        updateProgress();
        scrollTimeout = setTimeout(() => {
          updateProgress();
        }, 50);
      };

      container.addEventListener("scroll", handleScroll, { passive: true });

      /* ── Per-slide entrance animations ── */
      slideRefs.current.forEach((slide, index) => {
        if (!slide) return;

        const img = slide.querySelector(`.${styles.slideImg}`);
        const overlay = slide.querySelector(`.${styles.slideOverlay}`);
        const label = slide.querySelector(`.${styles.slideTopLabel}`);
        const icon = slide.querySelector(`.${styles.slideIcon}`);
        const title = slide.querySelector(`.${styles.slideTitle}`);
        const subtitle = slide.querySelector(`.${styles.slideSubtitle}`);
        const hint = slide.querySelector(`.${styles.scrollHint}`);

        // Створюємо timeline для кожного слайда
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: slide,
            scroller: container,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              // Додаткова логіка при вході слайда
            },
          },
        });

        // Image fade and scale
        if (img) {
          tl.fromTo(
            img,
            { scale: 1.15, opacity: 0.5 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
            },
            0,
          );
        }

        // Overlay fade
        if (overlay) {
          tl.fromTo(
            overlay,
            { opacity: 0.3 },
            {
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            0,
          );
        }

        // Label entrance
        if (label) {
          tl.fromTo(
            label,
            { opacity: 0, y: -20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
            },
            0.2,
          );
        }

        // Icon animation
        if (icon) {
          tl.fromTo(
            icon,
            { opacity: 0, y: -40, rotation: -15 },
            {
              opacity: 1,
              y: 0,
              rotation: 0,
              duration: 0.9,
              ease: "elastic.out(1, 0.6)",
            },
            0.1,
          );
        }

        // Title animation
        if (title) {
          tl.fromTo(
            title,
            { opacity: 0, x: -50, skewY: 7 },
            {
              opacity: 1,
              x: 0,
              skewY: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            0.25,
          );
        }

        // Subtitle animation
        if (subtitle) {
          tl.fromTo(
            subtitle,
            { opacity: 0, x: 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            0.35,
          );
        }

        // Scroll hint animation
        if (hint) {
          tl.fromTo(
            hint,
            { opacity: 0, y: -10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            0.4,
          );
        }
      });

      return () => {
        container.removeEventListener("scroll", handleScroll);
        if (scrollTimeout) clearTimeout(scrollTimeout);
      };
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [slides]);

  return (
    <div className={styles.wrapper}>
      {/* Corner badge */}
      <div className={styles.cornerBadge} aria-hidden>
        <span className={styles.cornerBadgeNum}>03</span>
        <span className={styles.cornerBadgeLabel}>Carousel</span>
      </div>
      {/* LEFT — Scroll slider */}
      <div ref={containerRef} className={styles.slider}>
        {/* Progress bar */}
        <div className={styles.progressTrack} aria-hidden="true">
          <div ref={progressRef} className={styles.progressFill} />
        </div>

        {/* Slides */}
        {slides.map((slide, i) => (
          <section
            key={slide.id}
            ref={(el) => (slideRefs.current[i] = el)}
            className={styles.slide}
            data-slide-id={slide.id}
            data-cursor="hover"
            data-cursor-type="link"
            data-cursor-text="Scroll for Soft Skills"
          >
            {/* Background image (z-index: 0) */}
            <div className={`${styles.slideImg} ${styles.slideImgWrap}`}>
              <img
                src={slide.image}
                alt={slide.title}
                className={styles.slideImage}
                loading="lazy"
              />
            </div>

            {/* Gradient overlay (z-index: 1) */}
            <div className={styles.slideOverlay} aria-hidden="true" />

            {/* Top label (z-index: 3) */}
            <div className={styles.slideTopLabel} aria-hidden="true">
              <span className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>Soft Skills</span>
            </div>

            {/* Center content (z-index: 2) */}
            <div className={styles.slideContent}>
              <div className={styles.slideIcon}>
                <slide.Icon size={48} strokeWidth={1.5} />
              </div>

              <h2 className={styles.slideTitle}>{slide.title}</h2>
              <p className={styles.slideSubtitle}>{slide.subtitle}</p>
            </div>

            {/* Scroll hint (z-index: 3) */}
            {i < slides.length - 1 && (
              <div className={styles.scrollHint} aria-hidden="true">
                <span>↓</span>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* RIGHT — Soft skills panel */}
      <div className={styles.panel}>
        <SoftSkills />
      </div>
    </div>
  );
}
