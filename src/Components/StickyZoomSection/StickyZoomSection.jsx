import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StickyZoomSection() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=160%",
            pin: true,
            scrub: true,
          },
        })
        // Zoom block
        .fromTo(
          innerRef.current,
          {
            scale: 0.2,
            borderRadius: "16px",
          },
          {
            scale: 1,
            borderRadius: "12px",
            ease: "none",
          },
        )
        .to(innerRef.current, {
          scale: 2.0,
          borderRadius: "12px",
          ease: "none",
        })
        // CTA reveal
        .fromTo(
          ctaRef.current,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
          },
          0.4,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center
                 bg-[url('https://cdn.prod.website-files.com/6840876d4d1ed0e8e2a330b9/68641f683476d979a209226a_Pixel%201_white.svg')]
                 bg-center bg-cover"
    >
      <p className="absolute top-10 text-xs tracking-widest text-white/50 animate-pulse">
        SCROLL ↓
      </p>

      <div
        ref={innerRef}
        className="relative flex items-center gap-8 will-change-transform"
      >
        <h2 className="text-white/70 font-bold text-[clamp(2.5rem,8vw,3.5rem)]">
          GSAP <span className="text-yellow-400">G</span>
        </h2>

        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          alt=""
          className="w-[280px] h-[180px] object-cover  shadow-xl"
        />

        <h2 className="text-white/70 font-bold text-[clamp(2.5rem,8vw,3.5rem)]">
          © 2025
        </h2>

        <a
          ref={ctaRef}
          href="https://github.com/volodimirfushtei"
          target="_blank"
          className="absolute bottom-16 left-1/2 -translate-x-1/2
                     bg-white/10 backdrop-blur-xl
                     px-2 py-2 
                     text-xl font-bold text-white
                     shadow-lg"
        >
          View GitHub
        </a>
      </div>
    </section>
  );
}
