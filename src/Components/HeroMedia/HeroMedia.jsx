import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroMedia.module.css';

gsap.registerPlugin(ScrollTrigger);

const HeroMedia = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const frameRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Entry Animation ── */
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
      });

      // Container reveal
      tl.fromTo(
        containerRef.current,
        { opacity: 0, clipPath: 'inset(10% 10% 90% 10%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.6,
        }
      )
      // Image scale + clip reveal
      .fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.25 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1.1,
          duration: 2,
          ease: 'expo.inOut',
        },
        '-=1.2'
      )
      // Frame scale-in
      .fromTo(
        frameRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 0.3, duration: 1.2, ease: 'back.out(1.7)' },
        '-=1.4'
      )
      // Content stagger
      .from(
        contentRef.current.querySelectorAll('[data-reveal]'),
        {
          y: 60,
          opacity: 0,
          rotateX: 15,
          scale: 0.95,
          filter: 'blur(8px)',
          stagger: 0.1,
          duration: 1.2,
          ease: 'expo.out',
        },
        '-=0.8'
      )
      // Name fade-in
      .fromTo(
        nameRef.current,
        { opacity: 0, x: 20 },
        { opacity: 0.7, x: 0, duration: 1, ease: 'power2.out' },
        '-=0.6'
      );

      /* ── Scroll Parallax ── */
      gsap.to(imageRef.current, {
        yPercent: -10,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to(overlayRef.current, {
        yPercent: -5,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });

      /* ── Floating Animation ── */
      gsap.to(imageRef.current, {
        y: -20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(overlayRef.current, {
        x: 20,
        y: -10,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    /* ── Magnetic Hover ── */
    const container = containerRef.current;
    const image = imageRef.current;

    const handleMove = (e) => {
      if (!container || !image) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      gsap.to(image, {
        x: x * 30,
        y: y * 15,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    const handleLeave = () => {
      gsap.to(image, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    container.addEventListener('mousemove', handleMove);
    container.addEventListener('mouseleave', handleLeave);

    return () => {
      ctx.revert();
      container.removeEventListener('mousemove', handleMove);
      container.removeEventListener('mouseleave', handleLeave);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.mediaContainer}
      data-cursor="hover"
      data-cursor-type="link"
      data-cursor-text="Hero"
    >
      <img
        ref={imageRef}
        src="/images/preview.webp"
        alt="Hero background"
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.divider} />
      <div className={styles.overlayHalf} />
      <div ref={overlayRef} className={styles.overlay} />
      <div ref={frameRef} className={styles.frame} />

      <div className={styles.liveBadge}>
        <span className={styles.liveDot} />
        LIVE
      </div>

      <span ref={nameRef} className={styles.name}>
        VOLODYMYR FUSHTEI
      </span>

      <div ref={contentRef} className={styles.footer}>
        <div className={styles.info}>
          <span className={styles.label} data-reveal>
            Creative Engineering
          </span>
          <h3 className={styles.title} data-reveal>
            <span>Frontend</span>
            <span>Motion</span>
          </h3>
          <span className={styles.tags} data-reveal>
            React · Next.js · GSAP
          </span>
        </div>

        <div className={styles.right} data-reveal>
          <span className={styles.year}>2026</span>
          <a
            href="https://djinni.co/my/profile/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            View Work
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroMedia;
