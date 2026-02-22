import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./HeroCard.module.css";

export default function HeroCard() {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const actionsRef = useRef(null);
  const trustedRef = useRef(null);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);
  const statRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(tagRef.current, { opacity: 0, x: -16, duration: 0.6 })
        .from(
          headingRef.current.children,
          {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .from(descRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
        .from(
          actionsRef.current.children,
          {
            opacity: 0,
            y: 12,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.2",
        )
        .from(trustedRef.current, { opacity: 0, y: 10, duration: 0.5 }, "-=0.2")
        .from(imageRef.current, { opacity: 0, x: 40, duration: 0.9 }, "-=0.8")
        .from(
          [badgeRef.current, statRef.current],
          {
            opacity: 0,
            y: 10,
            scale: 0.94,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.5)",
          },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.content}>
        {/* Eyebrow tag */}
        <div ref={tagRef} className={styles.tag}>
          <span className={styles.tagLine} />
          <span>Web Developer</span>
        </div>

        {/* Heading — кожен рядок окремий span для stagger */}
        <h1 ref={headingRef} className={styles.heading}>
          <span>Build</span>
          <span className={styles.highlight}> Web Apps</span>
          <span> People Love</span>
        </h1>

        {/* Description */}
        <p ref={descRef} className={styles.description}>
          I'm a junior freelance developer from Ukraine. I help you craft
          modern, fast, and user-friendly websites and interfaces.
        </p>

        {/* Actions */}
        <div ref={actionsRef} className={styles.actions}>
          <button className={styles.primary}>
            <span>View Portfolio</span>
            <span className={styles.btnArrow}>→</span>
          </button>
          <button className={styles.secondary}>
            <span>Contact Me</span>
            <span className={styles.btnArrow}>→</span>
          </button>
        </div>

        {/* Trusted by */}
        <div ref={trustedRef} className={styles.trustedBy}>
          <span className={styles.trustedLabel}>You may have seen me in:</span>
          <div className={styles.logos}>
            <img src="/logos/notion.svg" alt="Notion" />
            <img src="/logos/airtable.svg" alt="Airtable" />
            <img src="/logos/mailchimp.svg" alt="Mailchimp" />
            <img src="/logos/gumroad.svg" alt="Gumroad" />
          </div>
        </div>
      </div>

      {/* Image block */}
      <div className={styles.imageBlock}>
        <img
          ref={imageRef}
          src="/images/My_photo.png"
          alt="Volodymyr Fushtei"
          className={styles.portrait}
          loading="eager"
        />
        <div ref={badgeRef} className={styles.badge}>
          <span className={styles.badgeNum}>10+</span>
          <span className={styles.badgeText}>Projects Completed</span>
        </div>
        <div ref={statRef} className={styles.stat}>
          <span className={styles.statNum}>90%</span>
          <span className={styles.statText}>clients recommend</span>
        </div>
      </div>
    </section>
  );
}
