// src/components/ProjectPage.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./projectsPage.module.css";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      }
    };

    fetchProjects();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const projectsPerPage = 4;

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTag =
      filterTag === "" ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(filterTag.toLowerCase())
      );
    return matchesSearch && matchesTag;
  });

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: 0,
      scale: 0.99,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
      transition: { type: "spring", stiffness: 300 },
    },
  };
  if (loading) {
    return (
      <div className={styles.projectsPage}>
        <p className={styles.loading}>
          <i className="ri-loader-line"></i>Loading projects...
        </p>
      </div>
    );
  }

  return (
    <div className={styles.projectsPage}>
      <motion.div
        className={styles.header}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>My Projects</h1>
      </motion.div>

      <motion.div
        className={styles.controls}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className={styles.searchContainer}>
          <i className="ri-search-line"></i>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Search projects"
          />
        </div>

        <div className={styles.filterContainer}>
          <i className="ri-filter-line"></i>
          <select
            value={filterTag}
            onChange={(e) => {
              setFilterTag(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Filter by technology"
          >
            <option value="">All Technologies</option>
            {Array.from(new Set(projects.flatMap((p) => p.tags))).map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      <motion.div
        className={styles.projectsGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {paginatedProjects.length > 0 ? (
            paginatedProjects.map((project) => (
              <motion.div
                key={project.id}
                className={styles.projectCard}
                variants={cardVariants}
                whileHover="hover"
              >
                <div
                  className={styles.cardHeader}
                  style={{ borderColor: project.accentColor }}
                >
                  <div className={styles.imageContainer}>
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className={styles.projectImage}
                      loading="lazy"
                    />
                    <div
                      className={styles.overlay}
                      style={{ backgroundColor: `${project.accentColor}30` }}
                    />
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>
                    {project.description}
                  </p>

                  <div className={styles.tagsContainer}>
                    {Array.isArray(project.tags) &&
                      (project.tags ?? []).map((tag) => (
                        <span
                          key={tag}
                          className={styles.tag}
                          style={{
                            backgroundColor: `${project.accentColor}15`,
                            color: project.accentColor,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  <div className={styles.cardFooter}>
                    <a
                      href={project.urlVercel.trim()}
                      className={styles.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: project.accentColor }}
                    >
                      View Project
                      <i className="ri-arrow-right-line"></i>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className={styles.noResults}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <i className="ri-emotion-sad-line"></i>
              <p>No projects found matching your criteria</p>
              <button
                className={styles.resetButton}
                onClick={() => {
                  setSearchTerm("");
                  setFilterTag("");
                }}
              >
                Reset filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {totalPages > 1 && (
        <motion.div
          className={styles.pagination}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`${styles.pageButton} ${
                currentPage === i + 1 ? styles.activePage : ""
              }`}
              disabled={currentPage === i + 1}
            >
              {i + 1}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ProjectPage;
