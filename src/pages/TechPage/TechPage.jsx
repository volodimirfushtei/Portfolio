import { useState, useRef, useEffect } from "react";
import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import styles from "./TechPage.module.css";
import AnimatedPage from "../../Components/AnimatedPage/AnimatedPage";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  {
    name: "React",
    description: "Будуємо UI з реактивними компонентами.",
    icon: "ri-reactjs-line",
    color: "#61DAFB",
    link: "https://react.dev/",
  },
  {
    name: "React Native",
    description: "Будуємо мобільні додатки з React.",
    icon: "ri-reactjs-line",
    color: "#61DAFB",
    link: "https://reactnative.dev/",
  },
  {
    name: "Node.js",
    description: "Серверна логіка на потужному JS-рунтаймі.",
    icon: "ri-nodejs-line",
    color: "#68A063",
    link: "https://nodejs.org/",
  },
  {
    name: "Next.js",
    description: "Фреймворк для сторінок і API без зайвого клопоту.",
    icon: "ri-nextjs-fill",
    color: "#f5f5f0",
    link: "https://nextjs.org/",
  },
  {
    name: "Tailwind CSS",
    description: "CSS за допомогою простих класів — швидко і просто.",
    icon: "ri-css3-line",
    color: "#06B6D4",
    link: "https://tailwindcss.com/",
  },
  {
    name: "MongoDB",
    description: "Гнучка NoSQL база даних для сучасних додатків.",
    icon: "ri-database-2-line",
    color: "#4DB33D",
    link: "https://www.mongodb.com/",
  },
  {
    name: "TypeScript",
    description: "JavaScript з підтримкою типів і менше помилок.",
    icon: "ri-typescript-fill",
    color: "#007ACC",
    link: "https://www.typescriptlang.org/",
  },
  {
    name: "Figma",
    description: "Інтерфейсні дизайни для веб-додатків.",
    icon: "ri-pencil-ruler-line",
    color: "#F24E1E",
    link: "https://www.figma.com/",
  },
  {
    name: "Git",
    description: "Контролюємо версії нашого коду.",
    icon: "ri-git-merge-line",
    color: "#F05033",
    link: "https://git-scm.com/",
  },
  {
    name: "GitHub",
    description: "Інструмент для зберігання та обміну кодом.",
    icon: "ri-github-fill",
    color: "#f5f5f0",
    link: "https://github.com/",
  },
  {
    name: "NPM",
    description: "Менеджер пакетів для JavaScript.",
    icon: "ri-npmjs-fill",
    color: "#CB3837",
    link: "https://www.npmjs.com/",
  },
  {
    name: "Postman",
    description: "Інструмент для тестування API.",
    icon: "ri-compasses-line",
    color: "#FF6C37",
    link: "https://www.postman.com/",
  },
  {
    name: "Vercel",
    description: "Платформа для деплою Next.js додатків.",
    icon: "ri-rocket-line",
    color: "#f5f5f0",
    link: "https://vercel.com/",
  },
  {
    name: "Netlify",
    description: "JAMstack деплой з CI/CD з коробки.",
    icon: "ri-rocket-line",
    color: "#00C7B7",
    link: "https://netlify.com/",
  },
  {
    name: "Firebase",
    description: "BaaS платформа від Google.",
    icon: "ri-fire-line",
    color: "#FFCA28",
    link: "https://firebase.google.com/",
  },
  {
    name: "AWS",
    description: "Хмарна інфраструктура світового масштабу.",
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

  const totalPages = Math.ceil(techStack.length / PER_PAGE);
  const current = techStack.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  /* ── Initial header reveal ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.1,
      });
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  /* ── Grid reveal on page change ── */
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("a");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" },
    );
  }, [currentPage]);

  const handlePage = (page) => {
    setCurrentPage(page);
    wrapperRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatedPage>
      <section ref={wrapperRef} className={styles.wrapper} id="tech">
        <div className={styles.container}>
          {/* Header */}
          <header ref={headerRef} className={styles.header}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>Tech Stack</span>
            </div>
            <h1 className={styles.heading}>
              My <span className={styles.headingAccent}>Tools</span>
            </h1>
            <p className={styles.subheading}>
              Tools and technologies I use to bring ideas to life
            </p>
          </header>

          {/* Grid */}
          <div ref={gridRef} className={styles.grid}>
            {current.map((tech) => (
              <a
                key={tech.name}
                href={tech.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                {/* Card number */}
                <span className={styles.cardNum}>
                  {String(
                    techStack.findIndex((t) => t.name === tech.name) + 1,
                  ).padStart(2, "0")}
                </span>

                <div className={styles.iconWrap} style={{ color: tech.color }}>
                  <i className={tech.icon} aria-hidden="true" />
                </div>

                <h3 className={styles.cardTitle}>{tech.name}</h3>
                <p className={styles.cardDesc}>{tech.description}</p>

                <span className={styles.cardLink}>
                  Explore{" "}
                  <i className="ri-arrow-right-s-line" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePage(i + 1)}
                  className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.active : ""}`}
                  aria-label={`Page ${i + 1}`}
                  aria-current={currentPage === i + 1 ? "page" : undefined}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </AnimatedPage>
  );
};

export default TechnologyPage;
