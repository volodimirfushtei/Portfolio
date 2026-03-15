import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import gsap from "gsap/dist/gsap";
import styles from "./projectsPage.module.css";
import { db } from "../../firebase";
import { onSnapshot, collection } from "firebase/firestore";
import AnimatedPage from "../../Components/AnimatedPage/AnimatedPage";

const ProjectPage = () => {
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const PER_PAGE = 4;

  /* ── Firestore з обробкою помилок ── */
  useEffect(() => {
    setLoading(true);

    const unsub = onSnapshot(
      collection(db, "projects"),
      (snap) => {
        try {
          const projectsData = snap.docs.map((d) => {
            const data = d.data();
            // Нормалізація tags
            let tags = [];
            if (Array.isArray(data.tags)) {
              tags = data.tags.filter(Boolean);
            } else if (typeof data.tags === "string") {
              tags = data.tags
                .split(/[,，]/) // Підтримка різних роздільників
                .map((t) => t.trim())
                .filter(Boolean);
            }

            return {
              id: d.id,
              ...data,
              tags,
              // Дефолтні значення
              title: data.title || "Untitled Project",
              description: data.description || "No description available",
              imageUrl: data.imageUrl || "/images/business.jpg",
              accentColor: data.accentColor || "#e8f53c",
            };
          });

          setProjects(projectsData);
        } catch (error) {
          console.error("Error processing projects:", error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Firestore error:", error);
        setLoading(false);
      },
    );

    return () => unsub();
  }, []);

  /* ── Фільтрація з мемоізацією ── */
  const filtered = useMemo(() => {
    if (!projects.length) return [];

    return projects.filter((p) => {
      const searchLower = searchTerm.toLowerCase();
      const matchSearch =
        !searchTerm ||
        p.title?.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(searchLower));

      const matchTag =
        !filterTag ||
        p.tags?.some((tag) => tag.toLowerCase() === filterTag.toLowerCase());

      return matchSearch && matchTag;
    });
  }, [projects, searchTerm, filterTag]);

  // Скидання сторінки при фільтрації
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterTag]);

  // Унікальні теги для фільтра
  const uniqueTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((p) => {
      p.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [projects]);

  // Пагінація
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, currentPage, PER_PAGE]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  /* ── Анімації GSAP ── */
  useEffect(() => {
    if (loading || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.1,
      });
    }, pageRef);

    return () => ctx.revert();
  }, [loading]);

  useEffect(() => {
    if (loading || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(`.${styles.card}`);
    if (!cards.length) return;

    // Спочатку ховаємо карти
    gsap.set(cards, { opacity: 0, y: 32 });

    // Потім показуємо з анімацією
    const ctx = gsap.context(() => {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.1,
      });
    }, gridRef);

    return () => ctx.revert();
  }, [paginated, loading]);

  /* ── Обробники подій ── */
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    // Плавний скрол до верху сторінки
    pageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearchTerm("");
    setFilterTag("");
  }, []);

  /* ── Стан завантаження ── */
  if (loading) {
    return (
      <div
        className={styles.loadingWrap}
        role="status"
        aria-label="Loading projects"
      >
        <div className={styles.loadingInner}>
          <i
            className={`ri-loader-4-line ${styles.spinner}`}
            aria-hidden="true"
          />
          <span>Loading projects...</span>
        </div>
      </div>
    );
  }

  return (
    <AnimatedPage>
      <div ref={pageRef} className={styles.page}>
        <div className={styles.container}>
          {/* Header */}
          <header ref={headerRef} className={styles.header}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              <span className={styles.eyebrowText}>Selected Work</span>
            </div>
            <h1 className={styles.heading}>
              My <span className={styles.headingAccent}>Projects</span>
            </h1>
            <p className={styles.subheading}>
              A collection of my recent work and experiments
            </p>
          </header>

          {/* Controls */}
          <div
            className={styles.controls}
            role="search"
            aria-label="Project filters"
          >
            <label className={styles.field}>
              <i className="ri-search-line" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search projects by title, description or technology"
              />
            </label>

            <label className={styles.field}>
              <i className="ri-filter-line" aria-hidden="true" />
              <select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                aria-label="Filter by technology"
              >
                <option value="">All Technologies</option>
                {uniqueTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Grid */}
          <div
            ref={gridRef}
            className={styles.grid}
            role="list"
            aria-label="Projects grid"
            aria-live="polite"
          >
            {paginated.length > 0 ? (
              paginated.map((project, index) => (
                <article
                  key={project.id}
                  className={styles.card}
                  role="listitem"
                  aria-label={`Project: ${project.title}`}
                >
                  {/* Image */}
                  <div className={styles.imageWrap}>
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className={styles.image}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "/images/business.jpg";
                      }}
                    />
                    <div
                      className={styles.imageOverlay}
                      style={{
                        background: `${project.accentColor}20`,
                      }}
                      aria-hidden="true"
                    />
                    <span className={styles.cardNum} aria-hidden="true">
                      {String(
                        (currentPage - 1) * PER_PAGE + index + 1,
                      ).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardDesc}>{project.description}</p>

                    <div className={styles.tags} aria-label="Technologies used">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className={styles.tag}
                          style={{
                            borderColor: `${project.accentColor}40`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.urlVercel && project.urlVercel.trim() && (
                      <a
                        href={project.urlVercel.trim()}
                        className={styles.cardLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: project.accentColor }}
                        aria-label={`View ${project.title} project (opens in new tab)`}
                      >
                        <span>View Project</span>
                        <i className="ri-arrow-right-line" aria-hidden="true" />
                      </a>
                    )}
                  </div>

                  {/* Accent bottom line */}
                  <div
                    className={styles.cardAccent}
                    style={{ background: project.accentColor }}
                    aria-hidden="true"
                  />
                </article>
              ))
            ) : (
              <div className={styles.noResults} role="status">
                <i className="ri-emotion-sad-line" aria-hidden="true" />
                <p>No projects found</p>
                <button
                  className={styles.resetBtn}
                  onClick={handleResetFilters}
                  aria-label="Reset all filters"
                >
                  <span>Reset filters</span>
                  <i className="ri-refresh-line" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              className={styles.pagination}
              aria-label="Project pagination"
              role="navigation"
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.active : ""}`}
                  aria-current={currentPage === i + 1 ? "page" : undefined}
                  aria-label={`Page ${i + 1}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ProjectPage;
