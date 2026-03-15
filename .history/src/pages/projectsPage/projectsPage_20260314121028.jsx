import { useState, useEffect, useRef, useMemo } from "react";
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

  /* ── Firestore ── */
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "projects"),
      (snap) => {
        setProjects(
          snap.docs.map((d) => {
            const data = d.data();
            // tags може прийти як рядок, масив або undefined
            const tags = Array.isArray(data.tags)
              ? data.tags
              : typeof data.tags === "string"
                ? data.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                : [];
            return { id: d.id, ...data, tags };
          }),
        );
        setLoading(false);
      },
      (err) => {
        console.error("Firestore:", err);
        setLoading(false);
      },
    );
    return () => unsub();
  }, []);

  /* ── Filter ── */
  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const matchSearch = p.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchTag =
          !filterTag ||
          p.tags?.some((t) =>
            t.toLowerCase().includes(filterTag.toLowerCase()),
          );
        return matchSearch && matchTag;
      }),
    [projects, searchTerm, filterTag],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterTag]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );
  const uniqueTags = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tags || []))),
    [projects],
  );

  /* ── Header reveal ── */
  useEffect(() => {
    if (!headerRef.current) return;
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

  /* ── Grid reveal on page change ── */
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(`.${styles.card}`);
    if (!cards.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" },
    );
  }, [paginated.length, currentPage]);

  const handlePage = (p) => {
    setCurrentPage(p);
    pageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className={styles.loadingWrap}>
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
              <span className={styles.eyebrowLine} />
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
          <div className={styles.controls}>
            <label className={styles.field}>
              <i className="ri-search-line" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search projects"
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
                {uniqueTags.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Grid */}
          <div ref={gridRef} className={styles.grid}>
            {paginated.length > 0 ? (
              paginated.map((project, i) => (
                <div key={project.id} className={styles.card}>
                  {/* Image */}
                  <div className={styles.imageWrap}>
                    <img
                      src={project.imageUrl || "/images/business.jpg"}
                      alt={project.title}
                      className={styles.image}
                      loading="lazy"
                    />
                    <div
                      className={styles.imageOverlay}
                      style={{
                        background: `${project.accentColor || "#e8f53c"}30`,
                      }}
                    />
                    {/* Card number */}
                    <span className={styles.cardNum}>
                      {String((currentPage - 1) * PER_PAGE + i + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>
                  </div>

                  {/* Content */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardDesc}>{project.description}</p>

                    <div className={styles.tags}>
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className={styles.tag}
                          style={{
                            borderColor: `${project.accentColor || "#e8f53c"}40`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.urlVercel?.trim() || "#"}
                      className={styles.cardLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: project.accentColor || "#e8f53c" }}
                    >
                      <span>View Project</span>
                      <i className="ri-arrow-right-line" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Accent bottom line */}
                  <div
                    className={styles.cardAccent}
                    style={{ background: project.accentColor || "#e8f53c" }}
                  />
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <i className="ri-emotion-sad-line" aria-hidden="true" />
                <p>No projects found</p>
                <button
                  className={styles.resetBtn}
                  onClick={() => {
                    setSearchTerm("");
                    setFilterTag("");
                  }}
                >
                  <span>Reset filters</span>
                  <i className="ri-refresh-line" />
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePage(i + 1)}
                  className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.active : ""}`}
                  aria-current={currentPage === i + 1 ? "page" : undefined}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ProjectPage;
