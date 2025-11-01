import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import CircularText from "../CircularText/CircularText";
const HeroMedia = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);
  const textRef = useRef(null);
  const circleRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
      });

      // Плавна поява контейнера
      tl.from(containerRef.current, { opacity: 0, y: 40 });

      // Зображення з масштабом
      tl.from(
        imageRef.current,
        { opacity: 0, scale: 1.1, duration: 1 },
        "-=0.4"
      );

      // Бейдж з bounce-ефектом
      tl.from(
        badgeRef.current,
        { opacity: 0, y: 20, scale: 0.9, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3"
      );

      // Текстова секція
      tl.from(
        textRef.current.children,
        {
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 0.6,
        },
        "-=0.2"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-2xl mx-auto p-6 border border-border rounded-2xl overflow-hidden"
    >
      <div className="relative group">
        {/* Image Container */}
        <div
          ref={imageRef}
          className="relative rounded-2xl mb-4 overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
        >
          <img
            src="/images/preview.png"
            width={300}
            height={250}
            alt="Profile photo"
            className="profile-image object-cover "
          />
          <div className="position-absolute top-8 right-10">
            <CircularText />
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badge Overlay */}
          <div ref={badgeRef} className="absolute bottom-4 right-14">
            <div className="flex items-center gap-2 bg-background/95 backdrop-blur-xl rounded-full px-2 py-1 shadow-lg border-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-secondary">
                Available for work
              </span>
              <a
                href="https://djinni.co/my/profile/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-small text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
              >
                Follow
              </a>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div ref={textRef} className="mt-12 space-y-6 text-center">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            My Creative Process
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Combining technical expertise with design thinking to build
            exceptional digital experiences
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroMedia;
