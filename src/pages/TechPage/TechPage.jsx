import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import gsap from "gsap/dist/gsap";
import styles from "./TechPage.module.css";
import AnimatedPage from "../../Components/AnimatedPage/AnimatedPage";

const techStack = [
  {
    name: "React",
    description: "Building interfaces with reactive components.",
    icon: "ri-reactjs-line",
    color: "#61DAFB",
    link: "https://react.dev/",
  },
  {
    name: "React Native",
    description: "Building mobile applications with the power of React.",
    icon: "ri-reactjs-line",
    color: "#61DAFB",
    link: "https://reactnative.dev/",
  },
  {
    name: "Node.js",
    description: "Server-side logic on a high-performance JS runtime.",
    icon: "ri-nodejs-line",
    color: "#68A063",
    link: "https://nodejs.org/",
  },
  {
    name: "Next.js",
    description: "The full-stack framework for high-performance apps.",
    icon: "ri-nextjs-fill",
    color: "#f5f5f0",
    link: "https://nextjs.org/",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS for rapid and flexible styling.",
    icon: "ri-css3-line",
    color: "#06B6D4",
    link: "https://tailwindcss.com/",
  },
  {
    name: "MongoDB",
    description: "Flexible NoSQL database for modern digital products.",
    icon: "ri-database-2-line",
    color: "#4DB33D",
    link: "https://www.mongodb.com/",
  },
  {
    name: "TypeScript",
    description: "Typed JavaScript for more reliable and scalable code.",
    icon: "ri-typescript-fill",
    color: "#007ACC",
    link: "https://www.typescriptlang.org/",
  },
  {
    name: "Figma",
    description: "Crafting precise interface designs and prototypes.",
    icon: "ri-pencil-ruler-line",
    color: "#F24E1E",
    link: "https://www.figma.com/",
  },
  {
    name: "Git",
    description: "Industry-standard version control for source code.",
    icon: "ri-git-merge-line",
    color: "#F05033",
    link: "https://git-scm.com/",
  },
  {
    name: "GitHub",
    description: "Collaborative platform for code hosting and review.",
    icon: "ri-github-fill",
    color: "#f5f5f0",
    link: "https://github.com/",
  },
  {
    name: "NPM",
    description: "The essential package manager for the JS ecosystem.",
    icon: "ri-npmjs-fill",
    color: "#CB3837",
    link: "https://www.npmjs.com/",
  },
  {
    name: "Postman",
    description: "Comprehensive toolset for API development and testing.",
    icon: "ri-compasses-line",
    color: "#FF6C37",
    link: "https://www.postman.com/",
  },
  {
    name: "Vercel",
    description: "The platform for frontend developers and teams.",
    icon: "ri-rocket-line",
    color: "#f5f5f0",
    link: "https://vercel.com/",
  },
  {
    name: "Netlify",
    description: "Powerful platform for modern web deployment.",
    icon: "ri-rocket-line",
    color: "#00C7B7",
    link: "https://netlify.com/",
  },
  {
    name: "Firebase",
    description: "Google's suite for mobile and web app development.",
    icon: "ri-fire-line",
    color: "#FFCA28",
    link: "https://firebase.google.com/",
  },
  {
    name: "AWS",
    description: "Secure and scalable cloud computing infrastructure.",
    icon: "ri-cloud-line",
    color: "#FF9900",
    link: "https://aws.amazon.com/",
  },
];

const PER_PAGE = 8;

const TechnologyPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const wrapperRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);

  const totalPages = Math.ceil(techStack.length / PER_PAGE);
  const current = useMemo(() => techStack.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  ), [currentPage]);

  /* ── Magnetic Tilt with Content Follow ── */
  const handleMouseMove = useCallback((e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
    });

    // Content follow (watermark moves opposite)
    const watermark = card.querySelector(`.${styles.cardWatermark}`);
    if (watermark) {
      gsap.to(watermark, {
        x: (x - centerX) / 10,
        y: (y - centerY) / 10,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  }, []);

  const handleMouseLeave = useCallback((index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power2.out" });

    const watermark = card.querySelector(`.${styles.cardWatermark}`);
    if (watermark) {
      gsap.to(watermark, { x: 0, y: 0, duration: 0.8, ease: "power2.out" });
    }
  }, []);

  /* ── Header reveal ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(`.${styles.eyebrow}`, { opacity: 0, x: -20, duration: 1, ease: "power3.out" })
        .from(`.${styles.heading} span`, {
          y: 100,
          rotateX: -90,
          opacity: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "power4.out"
        }, "-=0.7")
        .from(`.${styles.subheading}`, { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.5");
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  /* ── Grid reveal on page change ── */
  useEffect(() => {
    if (!gridRef.current) return;
    const containers = gridRef.current.querySelectorAll(`.${styles.cardContainer}`);
    
    const ctx = gsap.context(() => {
      gsap.from(containers, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "all"
      });
    }, gridRef);
    return () => ctx.revert();
  }, [currentPage]);

  const handlePage = useCallback((page) => {
    setCurrentPage(page);
    wrapperRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <AnimatedPage>
      <section ref={wrapperRef} className={styles.wrapper} id="tech">
        {/* Visual Overlays */}
        
        <div className={styles.scanlines} aria-hidden="true" />

        <div className={styles.container}>
          {/* Header */}
          <header ref={headerRef} className={styles.header}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>Digital Arsenal</span>
            </div>
            <h1 className={styles.heading}>
              <div className={styles.headingLine}>
                <span>My</span> <span className={styles.headingAccent}>Tech Stack</span>
              </div>
            </h1>
            <p className={styles.subheading}>
              A curated collection of tools and technologies utilized to craft high-end digital experiences.
            </p>
          </header>

          {/* Grid */}
          <div ref={gridRef} className={styles.grid}>
            {current.map((tech, index) => (
              <div key={tech.name} className={styles.cardContainer}>
                <a
                  href={tech.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                  ref={(el) => (cardRefs.current[index] = el)}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  data-cursor="hover"
                  data-cursor-type="link"
                  data-cursor-text="Open Link"
                >
                  <div className={styles.cardWatermark}>{tech.name.split(' ')[0]}</div>
                  
                  <span className={styles.cardNum}>
                    {String(
                      techStack.findIndex((t) => t.name === tech.name) + 1,
                    ).padStart(2, "0")}
                  </span>

                  <div className={styles.iconWrap} style={{ color: tech.color }}>
                    <i className={tech.icon} aria-hidden="true" data-cursor-type="link" data-cursor-text="Open Link" />
                  </div>

                  <h3 className={styles.cardTitle}>{tech.name}</h3>
                  <p className={styles.cardDesc}>{tech.description}</p>

                  <span className={styles.cardLink}>
                    Explore Documentation{" "}
                    <i className="ri-arrow-right-up-line" aria-hidden="true" />
                  </span>
                </a>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className={styles.pagination}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  data-cursor="hover"
                  aria-label={`Page ${i + 1}`}
                  aria-pressed={currentPage === i + 1}
                  aria-controls="tech-grid"
                data-cursor-type="link"
                data-cursor-text="Find out more" 
                  key={i + 1}
                  onClick={() => handlePage(i + 1)}
                  className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.active : ""}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </nav>
          )}
        </div>
      </section>
    </AnimatedPage>
  );
};

export default TechnologyPage;
