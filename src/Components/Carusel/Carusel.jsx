import React, { useEffect, useRef, useMemo } from "react";
import SoftSkills from "../SoftSkills/SoftSkills";
import styles from "./Carusel.module.css";
import { MonitorSmartphone, Workflow, Clock, Users } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function Carousel() {
  const containerRef = useRef(null);
  const slides = useMemo(
    () => [
      {
        id: 1,
        image: "/images/business.jpg",
        title: "Frontend Development",
        subtitle: "Building responsive UIs with React & Next.js",
        color: "from-primary/40 to-secondary/60",
        icon: (
          <MonitorSmartphone className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-warning animate-border" />
        ),
      },
      {
        id: 2,
        image: "/images/happyt.jpg",
        title: "Backend Integration",
        subtitle: "Creating seamless API connections",
        color: "from-secondary/60 to-primary/30",
        icon: (
          <Workflow className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-warning animate-border" />
        ),
      },
      {
        id: 3,
        image: "/images/managmant.jpg",
        title: "Performance Optimization",
        subtitle: "Fast, efficient web applications",
        color: "from-primary/60 via-secondary/70 to-transparent",
        icon: (
          <Clock className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-warning animate-border" />
        ),
      },
      {
        id: 4,
        image: "/images/business.jpg",
        title: "User Experience",
        subtitle: "Intuitive and accessible interfaces",
        color: "from-secondary/60 to-primary/70",
        icon: (
          <Users className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-warning animate-border" />
        ),
      },
    ],
    []
  );

  useEffect(() => {
    if (!gsap || !ScrollTrigger || !containerRef.current) return;

    // Обмежуємо селектори коренем, автоматичний cleanup
    const ctx = gsap.context(() => {
      // Прогрес-бар
      gsap.fromTo(
        ".progress-bar-inner",
        { scaleY: 0, transformOrigin: "bottom" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      // Анімації для кожного слайду
      gsap.utils.toArray(".slide").forEach((section) => {
        const img = section.querySelector(".slide-img");
        const icon = section.querySelector(".slide-icon");
        const title = section.querySelector(".slide-title");
        const subtitle = section.querySelector(".slide-subtitle");

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.1, opacity: 0.7 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                scroller: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (icon) {
          gsap.fromTo(
            icon,
            { opacity: 0, y: -50, rotation: -20 },
            {
              opacity: 1,
              y: 0,
              rotation: 0,
              duration: 1,
              ease: "elastic.out(1, 0.5)",
              scrollTrigger: {
                trigger: section,
                scroller: containerRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (title) {
          gsap.fromTo(
            title,
            { opacity: 0, x: -80 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                scroller: containerRef.current,
                start: "top 65%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (subtitle) {
          gsap.fromTo(
            subtitle,
            { opacity: 0, x: 80 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                scroller: containerRef.current,
                start: "top 60%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [slides]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-16 items-center justify-center min-h-screen p-4 md:p-6 ">
      {/* LEFT SLIDER */}
      <h2 className={`font-bold ${styles.main_title}`}>Soft Skills</h2>
      <div
        ref={containerRef}
        className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full lg:w-1/2 overflow-y-auto snap-y snap-mandatory scroll-smooth rounded-xl lg:rounded-2xl shadow-lg lg:shadow-2xl scrollbar-hidden"
      >
        {/* Scroll Progress Bar */}
        <div className="sticky top-1/2 right-2 md:right-3 lg:right-4 w-1 h-16 md:h-20 lg:h-24 bg-white/50 backdrop-blur-sm rounded-full z-50">
          <div className="progress-bar-inner h-1/2 bg-warning rounded-full " />
        </div>

        {slides.map((slide) => (
          <section
            key={slide.id}
            id={`slide-${slide.id}`}
            data-slide={slide.id}
            className="slide relative h-[500px] md:h-[600px] lg:h-[700px] w-full snap-start overflow-hidden glass-effect "
          >
            <div className="absolute inset-0 slide-img">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div
              className={`absolute inset-0 bg-gradient-to-b ${slide.color} mix-blend-multiply drop-shadow-2xl glass-effect`}
            />

            <div className="container h-full flex items-center justify-center px-4 ">
              <div className="flex flex-col items-center justify-center max-w-2xl text-white text-center ">
                <div className="slide-icon sticky z-10 my-4 md:my-6 lg:mb-8 flex justify-center items-center bg-transparent ">
                  {slide.icon}
                </div>

                <div
                  className={`${styles.title} slide-title w-[600px] h-[60px] text-2xl md:text-3xl lg:text-4xl font-bold leading-tight bg-blue/10 p-2 md:p-3 backdrop-blur-xl border-b-2 border-white/90 rounded-t-xl`}
                  data-slide={slide.id}
                >
                  {slide.title}
                </div>

                <p
                  className={`${styles.subtitle} slide-subtitle w-[600px] h-[60px] text-lg md:text-xl lg:text-2xl font-light opacity-90 bg-yellow/10 p-2 md:p-3 backdrop-blur-xl rounded-b-xl`}
                  data-slide={slide.id}
                >
                  {slide.subtitle}
                </p>
              </div>
            </div>
            <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 text-white text-xs md:text-sm ">
              <h2 className={` ${styles.m_title}`}>Soft Skills</h2>
            </div>
            <div className="absolute  bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-[var(--color-text)] text-xs md:text-sm animate-pulse">
              <span>↓ Scroll Down ↓</span>
            </div>
          </section>
        ))}
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 max-w-2xl mt-6 lg:mt-0">
        <SoftSkills />
      </div>
    </div>
  );
}
