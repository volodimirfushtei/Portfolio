import React from "react";
import { motion as Motion } from "framer-motion";

const projectPage = () => {
  const projects = [
    {
      id: 1,
      title: "Ttavel Camper",
      description:
        "Мобільний додаток для онлайн-шопінгу з персоналізованими рекомендаціями, інтеграцією з платіжними системами та програмою лояльності.",
      tags: ["React Native", "Node.js", "Firebase", "Stripe"],
      imageUrl: "/images/Camper.png",
      alt: "E-commerce додаток",
    },
    {
      id: 2,
      title: "FitTrack Pro",
      description:
        "Додаток для відстеження фізичної активності з персоналізованими тренуваннями, аналітикою прогресу та соціальними функціями.",
      tags: ["Flutter", "Firebase", "HealthKit", "Google Fit"],
      imageUrl:
        "https://readdy.ai/api/search-image?query=fitness%2520tracking%2520mobile%2520app%2520interface%2520on%2520smartphone%252C%2520workout%2520tracking%2520with%2520statistics%2520and%2520progress%2520charts%252C%2520modern%2520UI%2520with%2520yellow%2520accent%2520colors%252C%2520clean%2520design%252C%2520high%2520quality%2520screenshot&width=600&height=800&seq=13&orientation=portrait",
      alt: "Фітнес-трекер",
    },
    {
      id: 3,
      title: "Weather App",
      description:
        "Мобільний додаток для показу погоди з інтерактивними графіками та динамічними іконами.",
      tags: ["React Native", "OpenWeatherMap API", "React Navigation", "Redux"],
      imageUrl:
        "https://readdy.ai/api/search-image?query=finance%2520and%2520banking%2520mobile%2520app%2520interface%2520on%2520smartphone%252C%2520expense%2520tracking%2520and%2520investment%2520screens%252C%2520modern%2520UI%2520with%2520yellow%2520accent%2520colors%252C%2520clean%2520design%252C%2520high%2520quality%2520screenshot&width=600&height=800&seq=17&orientation=portrait",
      alt: "Погода",
    },
    {
      id: 4,
      title: "Crypto Tracker",
      description:
        "Додаток для відстеження криптовалютових коштів з персоналізованими графіками та аналітикою.",
      imageUrl: "/images/Portfolio.png",
      tags: ["Flutter", "Firebase", "CoinGecko API", "Chart.js"],
      alt: "Криптовалюта",
    },
  ];

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
      <div id="portfolio" className="w-full h-full ">
        <div className="container mx-auto px-2 py-2">
          <div className="text-center mb-16"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card hover:border-2 bg-[linear-gradient(90deg,rgba(00,00,00,0.6),rgba(94,96,209,0.6))] w-75 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-2 cursor-pointer hover:z-10"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.alt}
                    className="w-full h-full object-cover object-top opacity-50 hover:opacity-90 transition-opacity duration-300"
                  />
                </div>
                <div className="p-2">
                  <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                  <p className="text-gray-100 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://goit-campers-ten.vercel.app/"
                    className="text-primary hover:underline flex items-center"
                  >
                    <span>Live Preview</span>
                    <i className="ri-arrow-right-line ml-1 "></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Motion.div>
  );
};

export default projectPage;
