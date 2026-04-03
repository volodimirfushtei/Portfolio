import { useEffect, useState, useRef } from "react";
import { Sun, Moon, SunMoon, Check } from "lucide-react";
import styles from "./ToggleTheme.module.css";
import { gsap } from "gsap";

/* ── Theme definitions ── */
const THEMES = [
  "dark-theme",
  "light-theme",
  "auto-theme",
  "purple-theme",
  "neutral-theme",
  "blue-theme",
  "emerald-theme",
  "sunset-theme",
  "prelight-theme",
];

/* Perceptually rich oklch swatches per theme */
const THEME_SWATCHES = {
  "dark-theme":    "linear-gradient(145deg, oklch(13% 0.022 265) 0%, oklch(22% 0.075 278) 100%)",
  "light-theme":   "linear-gradient(145deg, oklch(97% 0.004 90) 0%, oklch(90% 0.01 78) 100%)",
  "auto-theme":    "linear-gradient(135deg, oklch(13% 0.022 265) 50%, oklch(97% 0.004 90) 50%)",
  "purple-theme":  "linear-gradient(145deg, oklch(9% 0.025 20) 0%, oklch(55% 0.28 24) 100%)",
  "neutral-theme": "linear-gradient(145deg, oklch(10% 0.008 264) 0%, oklch(16% 0.01 264) 100%)",
  "blue-theme":    "linear-gradient(145deg, oklch(14% 0.04 260) 0%, oklch(22% 0.055 236) 100%)",
  "emerald-theme": "linear-gradient(145deg, oklch(5% 0.015 152) 0%, oklch(88% 0.32 152) 100%)",
  "sunset-theme":  "linear-gradient(145deg, oklch(13% 0.025 28) 0%, oklch(78% 0.2 52) 100%)",
  "prelight-theme":"linear-gradient(145deg, oklch(100% 0 0) 0%, oklch(54% 0.24 278) 100%)",
};

const THEME_ICONS = {
  "dark-theme":    <Moon    size={14} strokeWidth={1.5} />,
  "light-theme":   <Sun     size={14} strokeWidth={1.5} />,
  "auto-theme":    <SunMoon size={14} strokeWidth={1.5} />,
  "purple-theme":  <Moon    size={14} strokeWidth={1.5} />,
  "neutral-theme": <Moon    size={14} strokeWidth={1.5} />,
  "blue-theme":    <Moon    size={14} strokeWidth={1.5} />,
  "emerald-theme": <Moon    size={14} strokeWidth={1.5} />,
  "sunset-theme":  <Sun     size={14} strokeWidth={1.5} />,
  "prelight-theme":<Sun     size={14} strokeWidth={1.5} />,
};

const THEME_LABELS = {
  "dark-theme":    "Dark",
  "light-theme":   "Light",
  "auto-theme":    "Auto",
  "purple-theme":  "Crimson",
  "neutral-theme": "Neutral",
  "blue-theme":    "Ocean",
  "emerald-theme": "Neon",
  "sunset-theme":  "Sunset",
  "prelight-theme":"Indigo",
};

/* ── Helpers ── */
const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark-theme"
    : "light-theme";

/* ════════════════════════════════════════════════ */
const ToggleTheme = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const panelRef = useRef(null);

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    const system = getSystemTheme();
    localStorage.setItem("theme", system);
    return system;
  });

  /* ── Apply theme to <html> ── */
  useEffect(() => {
    const root = document.documentElement;
    const applied = theme === "auto-theme" ? getSystemTheme() : theme;
    THEMES.forEach((t) => root.classList.remove(t));
    root.classList.add(applied);
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* ── Auto theme media listener ── */
  useEffect(() => {
    if (theme !== "auto-theme") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const root = document.documentElement;
      THEMES.forEach((t) => root.classList.remove(t));
      root.classList.add(media.matches ? "dark-theme" : "light-theme");
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme]);

  /* ── Panel GSAP animations ── */
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        panelRef.current,
        { y: -12, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" }
      );
    } else if (shouldRender) {
      gsap.to(panelRef.current, {
        y: -8, opacity: 0, scale: 0.96,
        duration: 0.22, ease: "power2.in",
        onComplete: () => setShouldRender(false),
      });
    }
  }, [isOpen]);

  /* ── Toggle panel ── */
  const openPanel = () => { setShouldRender(true); setIsOpen(true); };
  const closePanel = () => setIsOpen(false);
  const togglePanel = () => (isOpen ? closePanel() : openPanel());

  /* ── Select theme ── */
  const handleSelect = (t) => {
    setTheme(t);
    gsap.to(panelRef.current, {
      y: -8, opacity: 0, scale: 0.96,
      duration: 0.22, ease: "power2.in",
      onComplete: () => { setIsOpen(false); setShouldRender(false); },
    });
  };

  const currentLabel = THEME_LABELS[theme];

  return (
    <>
      {/* ── Trigger pill ── */}
      <button
        className={`${styles.toggle} ${isOpen ? styles.active : ""}`}
        onClick={togglePanel}
        aria-label={`Theme: ${currentLabel}. Click to change.`}
        title={`Current theme: ${currentLabel}`}
      >
        <span className={styles.toggleDot} />
        <span className={styles.icon}>{THEME_ICONS[theme]}</span>
        <span className={styles.toggleLabel}>{currentLabel}</span>
      </button>

      {/* ── Panel + backdrop ── */}
      {shouldRender && (
        <>
          <div className={styles.overlay} onClick={closePanel} />

          <div
            className={styles.panel}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Select theme"
          >
            {/* Header */}
            <div className={styles.panelHeader}>
              <div className={styles.panelMeta}>
                <h2 className={styles.panelTitle}>Appearance</h2>
                <span className={styles.panelSubtitle}>Select a colour theme</span>
              </div>
              <button
                className={styles.panelClose}
                onClick={closePanel}
                aria-label="Close"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Grid */}
            <div className={styles.panelBody}>
              <div className={styles.grid}>
                {THEMES.map((t) => (
                  <button
                    key={t}
                    className={`${styles.themeCard} ${theme === t ? styles.selected : ""}`}
                    onClick={() => handleSelect(t)}
                    title={THEME_LABELS[t]}
                    aria-pressed={theme === t}
                  >
                    {/* Swatch */}
                    <div
                      className={styles.swatch}
                      style={{ background: THEME_SWATCHES[t] }}
                    >
                      <span className={styles.swatchIcon}>
                        {THEME_ICONS[t]}
                      </span>
                      {theme === t && (
                        <span className={styles.selectedBadge}>
                          <Check size={9} strokeWidth={3} />
                        </span>
                      )}
                    </div>

                    {/* Footer strip */}
                    <div className={styles.cardFooter}>
                      <span className={styles.themeLabel}>{THEME_LABELS[t]}</span>
                      <span className={styles.activeDot} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className={styles.panelFooter}>
              <span className={styles.footerDot} />
              Active — {currentLabel}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ToggleTheme;



