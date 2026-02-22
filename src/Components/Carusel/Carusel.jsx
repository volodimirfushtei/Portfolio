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
      /* ── Progress bar tied to scroll inside container ── */
      const updateProgress = () => {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const pct = scrollTop / (scrollHeight - clientHeight);
        if (progressRef.current) {
          gsap.set(progressRef.current, {
            scaleY: pct,
            transformOrigin: "top",
          });
        }
      };
      container.addEventListener("scroll", updateProgress, { passive: true });

      /* ── Per-slide animations ── */
      slideRefs.current.forEach((slide) => {
        if (!slide) return;

        const img = slide.querySelector(`.${styles.slideImg}`);
        const icon = slide.querySelector(`.${styles.slideIcon}`);
        const title = slide.querySelector(`.${styles.slideTitle}`);
        const subtitle = slide.querySelector(`.${styles.slideSubtitle}`);

        const trigger = {
          trigger: slide,
          scroller: container,
          toggleActions: "play none none reverse",
        };

        if (img)
          gsap.fromTo(
            img,
            { scale: 1.1, opacity: 0.6 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { ...trigger, start: "top 80%" },
            },
          );

        if (icon)
          gsap.fromTo(
            icon,
            { opacity: 0, y: -40, rotation: -15 },
            {
              opacity: 1,
              y: 0,
              rotation: 0,
              duration: 1,
              ease: "elastic.out(1, 0.5)",
              scrollTrigger: { ...trigger, start: "top 70%" },
            },
          );

        if (title)
          gsap.fromTo(
            title,
            { opacity: 0, x: -60 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { ...trigger, start: "top 65%" },
            },
          );

        if (subtitle)
          gsap.fromTo(
            subtitle,
            { opacity: 0, x: 60 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { ...trigger, start: "top 60%" },
            },
          );
      });

      return () => container.removeEventListener("scroll", updateProgress);
    }, containerRef);

    return () => ctx.revert();
  }, [slides]);

  return (
    <div className={styles.wrapper}>
      {/* LEFT — scroll slider */}
      <div ref={containerRef} className={styles.slider}>
        {/* Progress bar */}
        <div className={styles.progressTrack} aria-hidden="true">
          <div ref={progressRef} className={styles.progressFill} />
        </div>

        {slides.map((slide, i) => (
          <section
            key={slide.id}
            ref={(el) => (slideRefs.current[i] = el)}
            className={styles.slide}
          >
            {/* Background image */}
            <div className={`${styles.slideImg} ${styles.slideImgWrap}`}>
              <img
                src={slide.image}
                alt={slide.title}
                className={styles.slideImage}
                loading="lazy"
              />
            </div>

            {/* Gradient overlay */}
            <div className={styles.slideOverlay} aria-hidden="true" />

            {/* Top label */}
            <div className={styles.slideTopLabel} aria-hidden="true">
              <span className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>Soft Skills</span>
            </div>

            {/* Center content */}
            <div className={styles.slideContent}>
              <div className={`${styles.slideIcon}`}>
                <slide.Icon size={48} strokeWidth={1.5} />
              </div>

              <h2 className={`${styles.slideTitle}`}>{slide.title}</h2>
              <p className={`${styles.slideSubtitle}`}>{slide.subtitle}</p>
            </div>

            {/* Scroll hint */}
            {i < slides.length - 1 && (
              <div className={styles.scrollHint} aria-hidden="true">
                <span>↓</span>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* RIGHT — soft skills */}
      <div className={styles.panel}>
        <SoftSkills />
      </div>
    </div>
  );
}
