import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./projectsPage.module.css";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const projectsPerPage = 4;

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
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTag =
      filterTag === "" ||
      (project.tags &&
        project.tags.some((tag) =>
          tag.toLowerCase().includes(filterTag.toLowerCase())
        ));
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
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  if (loading) {
    return (
      <motion.div
        className={styles.loadingContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={styles.loading}>
          <motion.i
            className="ri-loader-4-line"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
          />
          <p>Loading projects...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.projectsPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={styles.header}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 0.77, 0.47, 0.97],
        }}
      >
        <h2 className={styles.heading}>
          My <span>Projects</span>
        </h2>
        <p className={styles.subheading}>
          A collection of my recent work and experiments
        </p>
      </motion.div>

      <motion.div
        className={styles.controls}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
            {Array.from(new Set(projects.flatMap((p) => p.tags || []))).map(
              (tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              )
            )}
          </select>
        </div>
      </motion.div>

      <motion.div
        className={styles.projectsGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          {paginatedProjects.length > 0 ? (
            paginatedProjects.map((project) => (
              <motion.div
                key={project.id}
                className={styles.projectCard}
                variants={cardVariants}
                whileHover="hover"
                layout
              >
                <div
                  className={styles.cardHeader}
                  style={{ borderColor: project.accentColor || "#6366f1" }}
                >
                  <div className={styles.imageContainer}>
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className={styles.projectImage}
                      loading="lazy"
                    />
                    <motion.div
                      className={styles.overlay}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.85 }}
                      style={{
                        backgroundColor: `${
                          project.accentColor || "#6366f1"
                        }80`,
                      }}
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
                    <motion.a
                      href={project.urlVercel?.trim() || "#"}
                      className={styles.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      style={{
                        color: project.accentColor || "#6366f1",
                      }}
                    >
                      View Project
                      <i className="ri-arrow-right-line"></i>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className={styles.noResults}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <i className="ri-emotion-sad-line"></i>
              <p>No projects found matching your criteria</p>
              <motion.button
                className={styles.resetButton}
                onClick={() => {
                  setSearchTerm("");
                  setFilterTag("");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {totalPages > 1 && (
        <motion.div
          className={styles.pagination}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <motion.button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`${styles.pageButton} ${
                currentPage === i + 1 ? styles.activePage : ""
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={currentPage === i + 1}
            >
              {i + 1}
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectPage;
