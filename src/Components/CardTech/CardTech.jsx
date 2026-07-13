import { useLayoutEffect, useRef, useState, useEffect } from "react";
import styles from "./CardTech.module.css";
import { gsap } from "gsap";

const techStack = [
  { name: "React", icon: "ri-reactjs-line" },
  { name: "Next.js", icon: "ri-nextjs-line" },
  { name: "Node.js", icon: "ri-nodejs-line" },
  { name: "JavaScript", icon: "ri-javascript-line" },
  { name: "CSS3", icon: "ri-css3-line" },
  { name: "HTML5", icon: "ri-html5-line" },
  { name: "GSAP", icon: "ri-animation-line" },
  { name: "Three.js", icon: "ri-3d-line" },
  { name: "React Native", icon: "ri-mobile-line" },
  { name: "Tailwind CSS", icon: "ri-css3-line" },
  { name: "Framer", icon: "ri-animation-line" },

];

const CardTech = () => {
  const profileCardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(profileCardRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.to(profileCardRef.current, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  // ── Intersection Observer для анімації при скролі ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (profileCardRef.current) {
      observer.observe(profileCardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ── Копіювання email ──
  const handleCopyEmail = () => {
    const email = "volodimir.fushtei@gmail.com";
    navigator.clipboard.writeText(email);
    // Тут можна додати toast повідомлення
  };

  return (
    <section 
      className={`${styles.profileCard} ${isVisible ? styles.visible : ""}`} 
      ref={profileCardRef}
    ><div className={styles.watermark}>
      FUSHTEI
    </div>
      <div className={styles.profileHeader}>
        <div className={styles.avatarWrap}>
          <img
            src="/images/preview.webp"
            alt="Volodymyr Fushtei"
            className={styles.avatar}
            loading="lazy"
          />
          <span className={styles.avatarStatus} />
        </div>

        <div className={styles.info}>
          <span className={styles.status}>
            <span className={styles.statusDot} />
            Available for freelance
          </span>

          <h2 className={styles.name}>
            Volodymyr Fushtei
          </h2>

          <p className={styles.role}>
            Full Stack Developer
          </p>
        </div>
      </div>

      <p className={styles.bio}>
        Building modern web experiences with React,
        Next.js, Node.js and motion-driven interfaces.
      </p>

      <div className={styles.techStack}>
        {techStack.map((tech) => (
          <span key={tech.name} className={styles.techItem}>
            <i className={tech.icon} />
            {tech.name}
          </span>
        ))}
      </div>

      <div className={styles.actions}>
        <a
          href="https://github.com/volodimirfushtei"
          target="_blank"
          rel="noreferrer"
          className={styles.primaryBtn}
        >
          <i className="ri-github-fill" />
          View GitHub
        </a>

        <button className={styles.secondaryBtn} onClick={handleCopyEmail}>
          <i className="ri-mail-line" />
          Email Me
        </button>
      </div>
    </section>
  );
};

export default CardTech;
