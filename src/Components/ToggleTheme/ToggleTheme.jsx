import { useEffect, useState } from "react";
import { Sun, Moon, SunMoon, X } from "lucide-react";
import styles from "./ToggleTheme.module.css";

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

const THEME_COLORS = {
  "dark-theme": "#020229ff",
  "light-theme": "#dfdfdfff",
  "auto-theme": "linear-gradient(135deg, #7c8cff 50%, #111111 50%)",
  "purple-theme": "#8b5cf6",
  "neutral-theme": "#080808ff",
  "blue-theme": "#3b82f6",
  "emerald-theme": "#10b981",
  "sunset-theme": "#ff7a18",
  "prelight-theme": "#4f46e5",
};

const ToggleTheme = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark-theme"
      : "light-theme";

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark-theme";
  });

  useEffect(() => {
    const root = document.documentElement;
    const applied = theme === "auto-theme" ? getSystemTheme() : theme;
    THEMES.forEach((t) => root.classList.remove(t));
    root.classList.add(applied);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSelectTheme = (newTheme) => {
    setTheme(newTheme);
    setIsModalOpen(false);
  };

  const icons = {
    "light-theme": <Sun size={18} strokeWidth={1.5} />,
    "dark-theme": <Moon size={18} strokeWidth={1.5} />,
    "auto-theme": <SunMoon size={18} strokeWidth={1.5} />,
    "purple-theme": <Moon size={18} strokeWidth={1.5} />,
    "neutral-theme": <Moon size={18} strokeWidth={1.5} />,
    "blue-theme": <Moon size={18} strokeWidth={1.5} />,
    "emerald-theme": <Moon size={18} strokeWidth={1.5} />,
    "sunset-theme": <Sun size={18} strokeWidth={1.5} />,
    "prelight-theme": <Sun size={18} strokeWidth={1.5} />,
  };

  const labels = {
    "light-theme": "Light",
    "dark-theme": "Dark",
    "auto-theme": "Auto",
    "purple-theme": "Purple",
    "neutral-theme": "Neutral",
    "blue-theme": "Blue",
    "emerald-theme": "Emerald",
    "sunset-theme": "Sunset",
    "prelight-theme": "Prelight",
  };

  return (
    <>
      <button
        className={`${styles.toggle} ${isModalOpen ? styles.active : ""}`}
        onClick={toggleModal}
        aria-label={`Switch theme, current: ${labels[theme]}`}
        title={`Current theme: ${labels[theme]}`}
      >
        <span className={styles.icon}>{icons[theme]}</span>
      </button>

      {isModalOpen && (
        <div className={styles.overlay} onClick={toggleModal}>
          <div 
            className={styles.modal} 
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Select Theme</h2>
              <button className={styles.modalClose} onClick={toggleModal}>
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <div className={styles.grid}>
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`${styles.themeCard} ${theme === t ? styles.selected : ""}`}
                  onClick={() => handleSelectTheme(t)}
                >
                  <div 
                    className={styles.colorPreview} 
                    style={{ background: THEME_COLORS[t] }}
                  >
                    <span className={styles.themeIcon}>{icons[t]}</span>
                  </div>
                  <span className={styles.themeLabel}>{labels[t]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

    
    
 

export default ToggleTheme;
