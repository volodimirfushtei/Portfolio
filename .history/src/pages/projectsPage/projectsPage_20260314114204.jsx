import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import styles from "./projectsPage.module.css";

// Mock data - in real app, this would come from an API
const PROJECTS = [
  {
    id: 1,
    title: "NEBULA CONCEPT",
    description:
      "Immersive digital experience with 3D interactions and particle systems",
    image: "/images/project1.jpg",
    tags: ["React", "Three.js", "GSAP"],
    category: "web",
    year: "2024",
  },
  {
    id: 2,
    title: "EDGE STUDIO",
    description:
      "Minimalist portfolio for creative agency with fluid animations",
    image: "/images/project2.jpg",
    tags: ["Vue", "Nuxt", "Tailwind"],
    category: "web",
    year: "2023",
  },
  {
    id: 3,
    title: "VOID APP",
    description: "Mobile application for mindfulness and meditation",
    image: "/images/project3.jpg",
    tags: ["React Native", "Expo", "Firebase"],
    category: "mobile",
    year: "2024",
  },
  {
    id: 4,
    title: "CYBER UI KIT",
    description:
      "Design system with cyberpunk aesthetics for modern interfaces",
    image: "/images/project4.jpg",
    tags: ["Figma", "Design System", "UI/UX"],
    category: "design",
    year: "2023",
  },
  {
    id: 5,
    title: "ECLIPSE BRAND",
    description: "Complete brand identity for tech startup",
    image: "/images/project5.jpg",
    tags: ["Branding", "Identity", "Print"],
    category: "design",
    year: "2023",
  },
  {
    id: 6,
    title: "NOVA DASHBOARD",
    description: "Analytics dashboard with real-time data visualization",
    image: "/images/project6.jpg",
    tags: ["React", "D3.js", "Express"],
    category: "web",
    year: "2024",
  },
  {
    id: 7,
    title: "ORBIT GAME",
    description: "Browser-based space exploration game",
    image: "/images/project7.jpg",
    tags: ["Phaser", "Canvas", "WebGL"],
    category: "game",
    year: "2023",
  },
  {
    id: 8,
    title: "CRYSTAL PACK",
    description: "3D asset pack for game developers",
    image: "/images/project8.jpg",
    tags: ["Blender", "3D", "Assets"],
    category: "3d",
    year: "2024",
  },
];

const ITEMS_PER_PAGE = 6;

const ProjectsPage = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState({});

  // Simulate API fetch
  useEffect(() => {
    const fetchProjects = async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProjects(PROJECTS);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesCategory =
        category === "all" || project.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, category]);

  // Pagination
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category]);

  // Handle image load
  const handleImageLoad = useCallback((projectId) => {
    setImagesLoaded((prev) => ({ ...prev, [projectId]: true }));
  }, []);

  // Get unique categories for filter
  const categories = useMemo(() => {
    const cats = projects.map((p) => p.category);
    return ["all", ...new Set(cats)];
  }, [projects]);

  if (loading) {
    return (
      <div className={styles.loadingWrap}>
        <div className={styles.loadingInner}>
          <div className={styles.spinner}>◉</div>
          <span>Loading projects</span>
        </div>
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.eyebrowText}>Selected work</span>
          </div>

          <h1 className={styles.heading}>
            FEATURED <span className={styles.headingAccent}>PROJECTS</span>
          </h1>

          <p className={styles.subheading}>
            A curated collection of digital experiences, each crafted with
            precision and purpose.
          </p>
        </header>

        {/* Controls */}
        <div
          className={styles.controls}
          role="search"
          aria-label="Project filters"
        >
          <div className={styles.field}>
            <i className="ri-search-line" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search projects"
            />
          </div>

          <div className={styles.field}>
            <i className="ri-filter-line" aria-hidden="true" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by category"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all"
                    ? "All Categories"
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        {paginatedProjects.length > 0 ? (
          <>
            <div className={styles.grid} role="list" aria-label="Projects">
              {paginatedProjects.map((project, index) => (
                <article
                  key={project.id}
                  className={styles.card}
                  role="listitem"
                >
                  <div className={styles.imageWrap}>
                    {!imagesLoaded[project.id] && (
                      <div className={styles.imageLoading} aria-hidden="true" />
                    )}
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`${styles.image} ${imagesLoaded[project.id] ? styles.loaded : ""}`}
                      loading="lazy"
                      onLoad={() => handleImageLoad(project.id)}
                    />
                    <div className={styles.imageOverlay} aria-hidden="true" />
                    <span className={styles.cardNum} aria-hidden="true">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                      .padStart(2, '0')
                    </span>
                  </div>

                  <div className={styles.cardBody}>
                    <h2 className={styles.cardTitle}>{project.title}</h2>
                    <p className={styles.cardDesc}>{project.description}</p>

                    <div className={styles.tags} aria-label="Technologies used">
                      {project.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/projects/${project.id}`}
                      className={styles.cardLink}
                      aria-label={`View details for ${project.title}`}
                    >
                      <span>View case</span>
                      <i className="ri-arrow-right-line" aria-hidden="true" />
                    </Link>
                  </div>

                  <div className={styles.cardAccent} aria-hidden="true" />
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                className={styles.pagination}
                aria-label="Project pagination"
              >
                <button
                  className={styles.pageBtn}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <i className="ri-arrow-left-line" aria-hidden="true" />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.active : ""}`}
                    onClick={() => setCurrentPage(i + 1)}
                    aria-label={`Page ${i + 1}`}
                    aria-current={currentPage === i + 1 ? "page" : undefined}
                  >
                    {i + 1}
                    {currentPage === i + 1 && (
                      <span className={styles.visuallyHidden}>(current)</span>
                    )}
                  </button>
                ))}

                <button
                  className={styles.pageBtn}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </button>
              </nav>
            )}
          </>
        ) : (
          <div className={styles.noResults}>
            <i className="ri-error-warning-line" aria-hidden="true" />
            <p>No projects found matching your criteria</p>
            <button
              className={styles.resetBtn}
              onClick={() => {
                setSearchTerm("");
                setCategory("all");
              }}
              aria-label="Clear all filters"
            >
              <i className="ri-restart-line" aria-hidden="true" />
              <span>Reset filters</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProjectsPage;
