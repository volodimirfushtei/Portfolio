import HeroSection from "../Components/HeroSection/HeroSection";
import Expertise from "../Components/Expertise/Expertise";
import ControllerSkills from "../Components/ControllerSkills/ControllerSkills";
import Carusel from "../Components/Carusel/Carusel";
import CtaSection from "../Components/CtaSection/CtaSection";
import Sertificate from "../Components/Sertificate/Sertificate";
import StickyZoomSection from "../Components/StickyZoomSection/StickyZoomSection";

export const sections = [
  { id: "hero", number: 1, label: "Hero", component: HeroSection },
  { id: "expertise", number: 2, label: "Expertise", component: Expertise },
  { id: "skills", number: 3, label: "Skills", component: ControllerSkills },
  { id: "carusel", number: 4, label: "Projects", component: Carusel },
  { id: "cta", number: 5, label: "Contact", component: CtaSection },
  {
    id: "certificate",
    number: 6,
    label: "Certificate",
    component: Sertificate,
  },
  { id: "sticky", number: 7, label: "Showcase", component: StickyZoomSection },
];
