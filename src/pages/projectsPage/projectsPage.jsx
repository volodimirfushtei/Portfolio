import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import s from "./projectsPage.module.css";

const ProjectPage = () => {
  const projects = [
    {
      id: 1,
      title: "Travel Camper",
      description: "Мобільний додаток для пошуку та бронювання кампів...",
      tags: ["React.js", "Redux", "MongoDB", "Server-json", "Tailwind CSS"],
      imageUrl: "/images/Camper.png",
      urlVercel: "https://goit-campers-ten.vercel.app/",
      alt: "E-commerce додаток",
      colorTitle: "red",
    },
    {
      id: 2,
      title: "FitTrack Pro",
      description: "Додаток для відстеження фізичної активності...",
      tags: ["Flutter", "Firebase", "HealthKit", "Google Fit"],
      imageUrl: "/images/logo_b.png",
      alt: "Фітнес-трекер",
      colorTitle: "white",
    },
    {
      id: 3,
      title: "Weather App",
      description: "Мобільний додаток для показу погоди...",
      tags: ["React Native", "OpenWeatherMap API", "React Navigation", "Redux"],
      imageUrl: "/images/Programmer_mob.png",
      alt: "Погода",
      colorTitle: "green",
    },
    {
      id: 4,
      title: "Crypto Tracker",
      description: "Додаток для відстеження криптовалютових коштів...",
      imageUrl: "/images/Portfolio.png",
      tags: ["Flutter", "Firebase", "CoinGecko API", "Chart.js"],
      alt: "Криптовалюта",
      colorTitle: "yellow",
    },
    {
      id: 5,
      title: "Food Delivery",
      description: "Мобільний додаток для замовлення їжі...",
      tags: ["React Native", "Node.js", "MongoDB", "Stripe"],
      imageUrl: "/images/Food_Delivery.png",
      alt: "Доставка їжі",
      colorTitle: "violet",
    },
    {
      id: 6,
      title: "Travel Planner",
      description: "Додаток для планування подорожей...",
      tags: ["Flutter", "Firebase", "Google Maps API", "Dart"],
      imageUrl: "/images/Travel_Planner.png",
      alt: "Планувальник подорожей",
      colorTitle: "lime",
    },
  ];
  const variants = {
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };
  // 🔵 Пагінація
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={s.projectsPage}>
      <Motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1 }}
        transition={{
          opacity: { duration: 0.4 },
          scale: { duration: 0.6 },
        }}
        class={{
          hidden: "hidden",
          visible: "visible",
        }}
      >
        <div id="portfolio" className={s.wrapper}>
          <div className={s.container}>
            <div className={s.grid}>
              {currentProjects.map((project) => (
                <div key={project.id} className={s.card}>
                  <Motion.div
                    className={s.imageWrapper}
                    variants={variants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <a href="#">
                      <img
                        src={project.imageUrl}
                        alt={project.alt}
                        className={s.image}
                        loading="lazy"
                      />
                      <div
                        className={s.card_title}
                        style={{ color: project.colorTitle }}
                      >
                        {project.title}
                      </div>
                    </a>
                    <div
                      className={s.coloredShadow}
                      style={{
                        backgroundImage:
                          "url('https://ui-avatars.com/api/?background=random' )",
                        opacity: 1,
                      }}
                    ></div>
                  </Motion.div>
                  <div className={s.content}>
                    <p>{project.description}</p>
                    <div className={s.tags}>
                      {project.tags.map((tag, index) => (
                        <span key={index} className={s.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.urlVercel}
                      className={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className={s.linkText}>Live Preview</span>
                      <i className="ri-arrow-right-line"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* 🔵 Пагінація */}
            <div className={s.pagination}>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`${s.pageButton} ${
                    currentPage === index + 1 ? s.activePage : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Motion.div>
      {/* 🔵 Search */}
      <div className="container mb-6 p-2 rounded w-full bg-surface ">
        <div className="row g-2">
          {/* Search */}
          <div className="col-12 col-md-4 ">
            <div className="input-group">
              <span className={"input-group-text"}>
                <i className="ri-search-line"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search projects..."
              />
            </div>
          </div>

          {/* Filter */}
          <div className="col-12 col-md-4">
            <div className="input-group">
              <span className="input-group-text">
                <i className="ri-filter-3-line"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Filter by tag..."
              />
            </div>
          </div>

          {/* Add */}
          <div className="col-12 col-md-4">
            <div className="input-group">
              <span className="input-group-text">
                <i className="ri-add-line"></i>
              </span>
              <input
                type="text"
                className="form-control "
                placeholder="Add a project..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
