import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import s from "./projectsPage.module.css";

const ProjectPage = () => {
  const projects = [
    {
      id: 1,
      title: "Ttavel Camper",
      description: "Мобільний додаток для онлайн-шопінгу...",
      tags: [
        "React.js",
        "Node.js",
        "Redux",
        "MongoDB",
        "Express.js",
        "Tailwind CSS",
      ],
      imageUrl: "/images/Camper.png",
      alt: "E-commerce додаток",
    },
    {
      id: 2,
      title: "FitTrack Pro",
      description: "Додаток для відстеження фізичної активності...",
      tags: ["Flutter", "Firebase", "HealthKit", "Google Fit"],
      imageUrl: "/images/logo_b.png",
      alt: "Фітнес-трекер",
    },
    {
      id: 3,
      title: "Weather App",
      description: "Мобільний додаток для показу погоди...",
      tags: ["React Native", "OpenWeatherMap API", "React Navigation", "Redux"],
      imageUrl: "/images/Programmer_mob.png",
      alt: "Погода",
    },
    {
      id: 4,
      title: "Crypto Tracker",
      description: "Додаток для відстеження криптовалютових коштів...",
      imageUrl: "/images/Portfolio.png",
      tags: ["Flutter", "Firebase", "CoinGecko API", "Chart.js"],
      alt: "Криптовалюта",
    },
    {
      id: 5,
      title: "Food Delivery",
      description: "Мобільний додаток для замовлення їжі...",
      tags: ["React Native", "Node.js", "MongoDB", "Stripe"],
      imageUrl: "/images/Food_Delivery.png",
      alt: "Доставка їжі",
    },
    {
      id: 6,
      title: "Travel Planner",
      description: "Додаток для планування подорожей...",
      tags: ["Flutter", "Firebase", "Google Maps API", "Dart"],
      imageUrl: "/images/Travel_Planner.png",
      alt: "Планувальник подорожей",
    },
  ];

  // 🔵 Пагінація
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        opacity: { duration: 0.4 },
        scale: { duration: 0.6 },
      }}
    >
      <div id="portfolio" className={s.wrapper}>
        <div className={s.container}>
          <div className={s.grid}>
            {currentProjects.map((project) => (
              <div key={project.id} className={s.card}>
                <div className={s.imageWrapper}>
                  <img
                    src={project.imageUrl}
                    alt={project.alt}
                    className={s.image}
                    loading="lazy"
                  />
                </div>
                <div className={s.content}>
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className={s.tags}>
                    {project.tags.map((tag, index) => (
                      <span key={index} className={s.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.imageUrl}
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
  );
};

export default ProjectPage;
