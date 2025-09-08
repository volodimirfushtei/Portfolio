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
      scrub: 2.5,
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
            width: "30%",
            height: "30%",
            opacity: 0,
            filter: "blur(2px)",
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
      style={{ overflow: "hidden" }}
      ref={sectionRef}
      className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center bg-[url('https://cdn.prod.website-files.com/6840876d4d1ed0e8e2a330b9/68641f683476d979a209226a_Pixel%201_white.svg')] bg-center "
    >
      <p className="text-[var(--color-text)] text-md md:text-ms  text-center  tracking-tight absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
        ↓ Keep Scrolling ↓
      </p>
      <div
        ref={imageRef}
        className="flex flex-row justify-center gap-6 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   transition-transform duration-300"
      >
        <h2
          className="text-white/70 text-6xl md:text-6xl font-bold tracking-tight flex items-center"
          style={{ fontSize: "clamp(2.5rem, 10vw, 3.6rem)" }}
        >
          GSAP
          <i className=" text-yellow-400 text-3xl md:text-5xl  align-middle">
            G
          </i>{" "}
        </h2>
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="Zoom from small"
          className="object-cover rounded-xl shadow-lg hover:shadow-xl border border-secondary transition-transform duration-300"
        />

        <div className="absolute top-1/2 left-1/2  transform -translate-x-[190px] rounded-lg hover:scale-105  ">
          <a
            ref={aRef}
            target="_blank"
            href="https://github.com/volodimirfushtei"
            className="flex text-warning text-4xl md:text-5xl  items-center justify-center font-bold p-2 backdrop-blur-xl  text-decoration-none hover:text-warning hover:scale-105 hover:shadow-xl transition-colors duration-300  "
          >
            {" "}
            View <i className="ri-github-fill"></i> GitHub
          </a>
        </div>

        <h2
          className="text-white/70 text-5xl md:text-5xl font-bold tracking-tight ml-2 flex items-center"
          style={{ fontSize: "clamp(2.5rem, 10vw, 3.6rem)" }}
        >
          <i className="ri-copyright-line text-yellow-400 text-4xl md:text-6xl  align-middle"></i>
          2025
        </h2>
      </div>
    </section>
  );
}
