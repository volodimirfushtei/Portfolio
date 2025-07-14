import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./projectsPage.module.css";

const ProjectPage = () => {
  const projects = [
    {
      id: 1,
      title: "Travel Camper",
      description:
        "Mobile app for finding and booking campsites with real-time availability and user reviews.",
      tags: ["React.js", "Redux", "MongoDB", "Tailwind CSS"],
      imageUrl: "/images/Camper.png",
      urlVercel: "https://goit-campers-ten.vercel.app/",
      accentColor: "#FF6B6B",
    },
    {
      id: 2,
      title: "Travel Campers",
      description:
        "Website for booking campsites with real-time availability and user reviews.",
      tags: ["React.js", "Redux", "MongoDB", "Tailwind CSS"],
      imageUrl: "/images/Campers.png",
      urlVercel:
        "https://images.unsplash.com/photo-1522202176988-66274cf831e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      accentColor: "#FF8",
    },

    {
      id: 3,
      title: "Travel Campers",
      description:
        "Website for booking campsites with real-time availability and user reviews.",
      tags: ["React.js", "Redux", "MongoDB", "Tailwind CSS"],
      imageUrl: "/images/Campers.png",
      urlVercel: "https://goit-campers-ten.vercel.app/",
      accentColor: "#FF6333",
    },

    {
      id: 4,
      title: "Travel Campers",
      description:
        "Website for booking campsites with real-time availability and user reviews.",
      tags: ["React.js", "Redux", "MongoDB", "Tailwind CSS"],
      imageUrl: "/images/Campers.png",
      urlVercel: "https://goit-campers-ten.vercel.app/",
      accentColor: "#Fccc22",
    },

    {
      id: 5,
      title: "Travel Campers",
      description:
        "Website for booking campsites with real-time availability and user reviews.",
      tags: ["React.js", "Redux", "MongoDB", "Tailwind CSS"],
      imageUrl: "/images/Campers.png",
      urlVercel: "https://goit-campers-ten.vercel.app/",
      accentColor: "#FF6bbb",
    },

    {
      id: 6,
      title: "Travel Campers",
      description:
        "Website for booking campsites with real-time availability and user reviews.",
      tags: ["React.js", "Redux", "MongoDB", "Tailwind CSS"],
      imageUrl: "/images/Campers.png",
      urlVercel: "https://goit-campers-ten.vercel.app/",
      accentColor: "#6B6B",
    },
    // ... other projects with improved descriptions
  ];

  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const projectsPerPage = 4;

  // Filter and pagination logic
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

  // Animation variants
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
      y: -10,
      scale: 1.02,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <div className={styles.projectsPage}>
      {/* Header Section */}
      <motion.div
        className={styles.header}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>My Projects</h1>
        <p className={styles.subtitle}></p>
      </motion.div>

      {/* Search and Filter */}
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

      {/* Projects Grid */}
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
                layout
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
                    {project.tags.map((tag) => (
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
                      href={project.urlVercel}
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

      {/* Pagination */}
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
