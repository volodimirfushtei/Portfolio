import { useCallback } from "react";
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParBG = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "#000000", // Чорний фон
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab", // Ефект при наведенні
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff", // Білі частинки
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
          },
          move: {
            enable: true,
            speed: 2,
          },
          number: {
            density: {
              enable: true,
            },
            value: 500, // Кількість частинок
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
      }}
    />
  );
};

export default ParBG;
