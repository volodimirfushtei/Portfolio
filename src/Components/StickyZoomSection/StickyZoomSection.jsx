import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StickyZoomSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const aRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const img = imageRef.current;
    const a = aRef.current;

    const tl = gsap.timeline();

    ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      pin: true,
      scrub: 1.5,
      animation: tl
        .fromTo(
          img,
          {
            width: 100,
            height: 100,
            opacity: 1,
            filter: "blur(0px)",
            borderRadius: "8px",

            ease: "power1.out",
          },
          {
            width: "100%",
            height: "100%",
            opacity: 1,

            filter: "blur(0px)",
            borderRadius: "8px",
            ease: "power1.out",
          }
        )
        .fromTo(
          a,
          {
            width: "60%",
            height: "60%",
            opacity: 0,
            filter: "blur(0px)",
            borderRadius: "8px",
            ease: "power1.out",
          },
          {
            width: "100%",
            height: "100%",
            opacity: 1,
            filter: "blur(0px)",
            borderRadius: "8px",
            ease: "power1.out",
          }
        ),
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] w-full bg-gradient-to-br from-primary via-black/60 to-secondary overflow-hidden flex items-center justify-center bg-[url('https://cdn.prod.website-files.com/6840876d4d1ed0e8e2a330b9/68641f683476d979a209226a_Pixel%201_white.svg')] bg-center"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -translate-x-1/2 -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl -z-10"></div>
      </div>
      <p className="text-white/50  tracking-tight absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
        ↓ Keep Scrolling ↓
      </p>
      <div
        ref={imageRef}
        className="flex flex-row justify-center gap-4 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  hover:shadow-lg transition-transform duration-300"
      >
        <h2
          className="text-white/70 text-9xl md:text-10xl font-bold tracking-tight "
          style={{ fontSize: "clamp(2.5rem, 10vw, 3.6rem)" }}
        >
          <i className="ri-reactjs-line text-blue-400 text-5xl md:text-6xl mr-4 align-middle"></i>
          React
        </h2>
        <img
          src="/images/njeromin1.jpg"
          alt="Zoom from small"
          className="object-cover rounded-xl shadow-lg border border-white/20 transition-transform duration-300"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-[27px] -translate-y-1/2 rounded-lg hover:scale-105 hover:shadow-lg ">
          <a
            ref={aRef}
            target="_blank"
            href="https://github.com/volodimirfushtei"
            className="text-warning text-2xl md:text-3xl font-bold tracking-tight text-decoration-none hover:text-warning hover:scale-110 transition-colors duration-300  "
          >
            View GitHub
          </a>
        </div>

        <h2
          className="text-white/70 text-6xl md:text-6xl font-bold tracking-tight ml-2"
          style={{ fontSize: "clamp(2.5rem, 10vw, 4rem)" }}
        >
          <i className="ri-copyright-line text-yellow-400 text-5xl md:text-6xl mr-4 align-middle"></i>
          2025
        </h2>
      </div>
    </section>
  );
}
