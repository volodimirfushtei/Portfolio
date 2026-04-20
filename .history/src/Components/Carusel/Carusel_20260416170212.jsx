import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MonitorSmartphone, Workflow, Clock, Users } from "lucide-react";
import SoftSkills from "../SoftSkills/SoftSkills";
import styles from "./Carusel.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Carousel() {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const slideRefs = useRef([]);


 

      {/* RIGHT — Soft skills panel */}
      <div className={styles.panel}>
        <SoftSkills />
      </div>
    </div>
  );
}
