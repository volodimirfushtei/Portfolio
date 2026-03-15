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
  const cardRefs = useRef([]);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const PER_PAGE = 4;

  /* ── Helper: Split Title into Lines ── */
  const splitTitle = (text) => {
    if (!text) return [];
    return text.split(/(?<=[.!?])\s+|(?<=\|)\s*/).map(line => line.replace('|', '').trim());
  };

  /* ── Firestore with error handling ── */
  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, "projects"),
      (snap) => {
        try {
          const projectsData = snap.docs.map((d) => {
            const data = d.data();
            let tags = [];
            if (Array.isArray(data.tags)) {
              tags = data.tags.filter(Boolean);
            } else if (typeof data.tags === "string") {
              tags = data.tags.split(/[,，]/).map((t) => t.trim()).filter(Boolean);
            }

            return {
              id: d.id,
              ...data,
              tags: tags.slice(0, 4), 
              title: data.title || "Untitled Project",
              description: data.description || "Digital Experience",
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
      }
    );
    return () => unsub();
  }, []);

  /* ── Filtering ── */
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterTag]);

  const uniqueTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((p) => {
      p.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [projects]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, currentPage, PER_PAGE]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);

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

  /* ── GSAP Entry Animations ── */
  useEffect(() => {
    if (loading || !headerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(`.${styles.eyebrow}`, { opacity: 0, x: -20, duration: 1, ease: "power3.out" })
        .from(`.${styles.heading} span`, { y: 100, rotateX: -90, opacity: 0, stagger: 0.1, duration: 1.2, ease: "power4.out" }, "-=0.7")
        .from(`.${styles.subheading}`, { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.5");
    }, pageRef);
    return () => ctx.revert();
  }, [loading]);

  useEffect(() => {
    if (loading || !gridRef.current) return;
    const containers = gridRef.current.querySelectorAll(`.${styles.cardContainer}`);
    if (!containers.length) return;
    const ctx = gsap.context(() => {
      gsap.from(containers, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all"
      });
    }, gridRef);
    return () => ctx.revert();
  }, [paginated, loading]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    pageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearchTerm("");
    setFilterTag("");
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingWrap}>
        <div className={styles.loadingInner}>
          <i className={`ri-loader-4-line ${styles.spinner}`} />
          <span className={styles.loadingText}>COLLECTING DATA</span>
        </div>
      </div>
    );
  }

  return (
    <AnimatedPage>
      <div ref={pageRef} className={styles.page}>
        <div className={styles.noise} aria-hidden="true" />
        <div className={styles.scanlines} aria-hidden="true" />

        <div className={styles.container}>
          <header ref={headerRef} className={styles.header}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span className={styles.eyebrowText}>Curated selection</span>
            </div>
            <h1 className={styles.heading}>
              <div className={styles.headingLine}>
                <span>My</span> <span className={styles.headingAccent}>Portfolio</span>
              </div>
            </h1>
            <p className={styles.subheading}>
              A showcase of digital craftsmanship, focused on motion and interaction.
            </p>
          </header>

          <div className={styles.controls}>
            <div className={styles.field}>
              <i className="ri-search-line" />
              <input
                type="text"
                placeholder="Find projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <i className="ri-filter-line" />
              <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)}>
                <option value="">Sort by Tech</option>
                {uniqueTags.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>

          <div ref={gridRef} className={styles.grid}>
            {paginated.length > 0 ? (
              paginated.map((project, index) => (
                <div key={project.id} className={styles.cardContainer}>
                  <article
                    className={styles.card}
                    ref={(el) => (cardRefs.current[index] = el)}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    <div className={styles.cardWatermark}>{project.title.split(' ')[0]}</div>
                    <div className={styles.imageWrap}>
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className={styles.image}
                        loading="lazy"
                        onError={(e) => { e.target.src = "/images/business.jpg"; }}
                      />
                      <span className={styles.cardNum}>
                        {String((currentPage - 1) * PER_PAGE + index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{project.title}</h3>
                      <p className={styles.cardDesc}>{project.description}</p>
                      <div className={styles.tags}>
                        {project.tags?.map((tag) => (
                          <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                      <a
                        href={(project.urlVercel || project.urlGitHub || "#").trim()}
                        className={styles.cardLink}
                        target={project.urlVercel || project.urlGitHub ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (!project.urlVercel && !project.urlGitHub) {
                            e.preventDefault();
                            alert("This project details are private.");
                          }
                        }}
                      >
                        <span>{project.urlVercel || project.urlGitHub ? "View Detail" : "Restricted"}</span>
                        <i className={project.urlVercel || project.urlGitHub ? "ri-arrow-right-up-line" : "ri-lock-line"} />
                      </a>
                    </div>
                  </article>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <i className="ri-emotion-sad-line" />
                <p>No matches found in this category.</p>
                <button className={styles.resetBtn} onClick={handleResetFilters}>Return to all</button>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <nav className={styles.pagination}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.active : ""}`}
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
