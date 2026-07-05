import { useEffect, useState, useRef } from "react";
import styles from "./Loader.module.css";
import NoiseOverlay from "../NoiseOverlay/NoiseOverlay";
import Logo from "../Logo/Logo";
import gsap from "gsap";

const images = [
  {
    id: 0,
    color: "oklch(73% 0.022 265)",
    alt: "Technology",
    src: "/images/sity-portrait.webp",
    srcSmall: "/images/sity-portrait-small.webp",
    srcMedium: "/images/sity-portrait-medium.webp",
  },
  {
    id: 1,
    color: "oklch(97% 0.004 90)",
    alt: "UI Design",
    src: "/images/preview-portrait.webp",
    srcSmall: "/images/preview-portrait-small.webp",
    srcMedium: "/images/preview-portrait-medium.webp",
  },
  {
    id: 2,
    color: "oklch(85% 0.01 265)",
    alt: "Web Development",
    src: "/images/web-dev-portrait.webp",
    srcSmall: "/images/web-dev-portrait-small.webp",
    srcMedium: "/images/web-dev-portrait-medium.webp",
  },
  {
    id: 3,
    color: "oklch(70% 0.015 265)",
    alt: "Editorial Design",
    src: "/images/editorial-portrait.webp",
    srcSmall: "/images/editorial-portrait-small.webp",
    srcMedium: "/images/editorial-portrait-medium.webp",
  },
];

const Loader = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const nameRefs = useRef([]);
  const digitRefs = useRef([]);
  const taglineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progress counter
      let obj = { value: 0 };

      gsap.to(obj, {
        value: 100,
        duration: 4,
        ease: "power2.out",
        onUpdate: () => {
          setProgress(Math.floor(obj.value));
        }
      });

      // Name reveal
      gsap.to(`.${styles.nameSpan}`, {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.6
      });

      // Slides reveal
      gsap.fromTo(`.${styles.previewSlide}`,
        { x: 80, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          delay: 2
        }
      );

      // Curtains cinematic exit
      gsap.to(`.${styles.curtain}`, {
        y: "-120%",
        duration: 1.4,
        stagger: {
          each: 0.08,
          from: "random"
        },
        ease: "power4.inOut",
        delay: 3.5
      });

      // Fade out overlay
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 1,
        delay: 4.2,
        onComplete: () => {
          setIsLoading(false);
          onComplete?.();
        }
      });

      // Tagline animation
      gsap.fromTo(taglineRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.5
        }
      );

      // Digit animation (each digit)
      digitRefs.current.forEach((digit, i) => {
        gsap.fromTo(digit,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
            delay: i * 0.05
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  // Оновлюємо прогрес
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        if (onComplete) onComplete();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  const digits = String(Math.min(progress, 100)).padStart(3, "0").split("");

  return (
    <>
      {isLoading && (
        <div ref={containerRef} className={styles.loaderWrapper}>
          <div ref={overlayRef} className={styles.overlay}>
            <NoiseOverlay />

            {/* Curtain panels */}
            <div className={styles.curtainsContainer}>
              {images.map((img) => (
                <div
                  key={img.id}
                  className={styles.curtain}
                  style={{ backgroundColor: img.color }}
                />
              ))}
            </div>

            {/* Slides preview */}
            <div className={styles.slidesWrapper}>
              <div className={styles.slidesContainer}>
                {images.slice(0, 3).map((img, index) => (
                  <div key={img.id} className={styles.previewSlide}>
                    <picture>
                      <source
                        media="(max-width: 480px)"
                        srcSet={img.srcSmall}
                      />
                      <source
                        media="(max-width: 768px)"
                        srcSet={img.srcMedium}
                      />
                      <img
                        src={img.src}
                        alt={img.alt}
                        className={styles.previewImage}
                        loading="lazy"
                      />
                    </picture>
                    <div className={styles.previewOverlay} />
                    <span className={styles.previewNumber}>0{index + 1}</span>
                  </div>
                ))}
              </div>
              <p className={styles.slidesHint}>Loading portfolio projects...</p>
            </div>

            {/* Logo */}
            <div className={styles.logo}>
              <Logo />
            </div>

            {/* Top bar */}
            <div className={styles.topBar}>
              <span className={styles.brandName}>VF / PORTFOLIO</span>
              <span className={styles.year}>2026</span>
            </div>

            {/* Center content */}
            <div className={styles.center}>
              <div className={styles.nameWrap}>
                <h1 className={styles.developerName}>
                  <div className={styles.nameMask}>
                    <span className={`${styles.nameSpan} ${styles.firstName}`}>
                      VOLODYMYR
                    </span>
                  </div>
                  <div className={styles.nameMask}>
                    <span className={`${styles.nameSpan} ${styles.lastName}`}>
                      FUSHTEI
                    </span>
                  </div>
                </h1>
              </div>

              <div className={styles.counterWrap}>
                {digits.map((d, i) => (
                  <span
                    key={`${i}-${d}`}
                    ref={(el) => (digitRefs.current[i] = el)}
                    className={styles.digit}
                  >
                    {d}
                  </span>
                ))}
                <span className={styles.pct}>%</span>
              </div>

              <p ref={taglineRef} className={styles.tagline}>
                {progress < 40 && "Digital Genesis"}
                {progress >= 40 && progress < 70 && "Compiling Visions"}
                {progress >= 70 && progress < 100 && "Loading Portfolio"}
                {progress >= 100 && "Ready"}
              </p>
            </div>

            {/* Progress track */}
            <div className={styles.trackWrap}>
              <div className={styles.track}>
                <div
                  className={styles.fill}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className={styles.trackLabels}>
                <span className={styles.trackLabel}>System.load</span>
                <span className={styles.trackLabel}>Verified</span>
              </div>
            </div>

            {/* Bottom bar */}
            <div className={styles.bottomBar}>
              <span className={styles.statusText}>
                Frontend Engineer / Crafting Digital Excellence
              </span>
              <span className={styles.statusDot} />
            </div>

            {/* Fade out overlay */}
            {progress >= 100 && (
              <div className={styles.fadeOut} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;