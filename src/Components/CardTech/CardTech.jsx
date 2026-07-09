import {  useLayoutEffect,useRef } from "react";
import styles from "./CardTech.module.css";
import { gsap } from "gsap";
const techStack = [
  { name: "React", icon: "ri-reactjs-line" },
  { name: "Next.js", icon: "ri-nextjs-line" },
  { name: "Node.js", icon: "ri-nodejs-line" },
  { name: "JavaScript", icon: "ri-javascript-line" },
  { name: "CSS3", icon: "ri-css3-line" },
  { name: "HTML5", icon: "ri-html5-line" },
];

const CardTech = () => {
  const profileCardRef = useRef(null);
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
  eas: "power3.out",
});

return () => ctx.revert();

  });
}, []);
  return (
    <section className={styles.profileCard} ref={profileCardRef}>
  <div className={styles.profileHeader}>
    <div className={styles.avatarWrap}>
      <img
        src="/images/preview.webp"
        alt="Volodymyr Fushtei"
        className={styles.avatar}
      />
    </div>

    <div className={styles.info}>
      <span className={styles.status}>
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
    <span>React</span>
    <span>Next.js</span>
    <span>Node.js</span>
    <span>MongoDB</span>
    <span>GSAP</span>
    <span>Framer Motion</span>
    <span>Three.js</span>
  </div>

  <div className={styles.actions}>
    <a
      href="https://github.com/volodimirfushtei"
      target="_blank"
      rel="noreferrer"
      className={styles.primaryBtn}
    >
      View GitHub
    </a>

    <button className={styles.secondaryBtn}>
      Download CV
    </button>
  </div>
</section>
  );
};

export default CardTech;
