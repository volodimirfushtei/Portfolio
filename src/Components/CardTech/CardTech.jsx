import { useState, useEffect } from "react";
import styles from "./CardTech.module.css";

const techStack = [
  { name: "React", icon: "ri-reactjs-line" },
  { name: "Next.js", icon: "ri-nextjs-line" },
  { name: "Node.js", icon: "ri-nodejs-line" },
  { name: "JavaScript", icon: "ri-javascript-line" },
  { name: "CSS3", icon: "ri-css3-line" },
  { name: "HTML5", icon: "ri-html5-line" },
];

const CardTech = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [manualFlip, setManualFlip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (manualFlip || isMobile) return;
    const id = setInterval(() => setIsFlipped((p) => !p), 6000);
    return () => clearInterval(id);
  }, [manualFlip, isMobile]);

  const handleFlip = () => {
    setIsFlipped((p) => !p);
    setManualFlip(true);
  };

  return (
    <div className={styles.cardTech}>
      <div
        className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        aria-label={isFlipped ? "Show profile" : "Show tech stack"}
        onKeyDown={(e) => e.key === "Enter" && handleFlip()}
      >
        {/* ── Front ── */}
        <div className={`${styles.side} ${styles.front}`}>
          <div className={styles.avatarWrap}>
            <img
              src="/images/preview.png"
              alt="Volodymyr Fushtei"
              className={styles.avatar}
              loading="eager"
            />
            <div className={styles.avatarRing} aria-hidden />
          </div>

          <div className={styles.textBlock}>
            <p className={styles.subtitle}>Freelance Web Developer</p>
            <h2 className={styles.title}>
              <span className={styles.highlight}>Volodymyr</span> Fushtei
            </h2>
          </div>

          <div className={styles.flipHint} aria-hidden>
            <i className="ri-arrow-left-right-line" />
            {isMobile ? " Tap to view skills" : " Click to flip"}
          </div>
        </div>

        {/* ── Back ── */}
        <div className={`${styles.side} ${styles.back}`}>
          <div className={styles.backContent}>
            <div className={styles.badge}>
              <span className={styles.badgeLine} />
              Tech Stack
            </div>

            <p className={styles.flipMessage}>
              {manualFlip
                ? "Tap to flip back"
                : isMobile
                  ? "Tap to view profile"
                  : "Auto-flips every 6s"}
            </p>

            <div className={styles.techGrid}>
              {techStack.map((tech) => (
                <div key={tech.name} className={styles.techItem}>
                  <i
                    className={`${tech.icon} ${styles.techIcon}`}
                    aria-hidden
                  />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTech;
