import { useEffect, useState } from "react";
import { Sun, Moon, SunMoon } from "lucide-react";
import styles from "./ToggleTheme.module.css";

const THEMES = ["light-theme", "dark-theme", "auto-theme"];

const ToggleTheme = () => {
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

  const cycle = () => {
    setTheme((prev) => {
      const idx = THEMES.indexOf(prev);
      return THEMES[(idx + 1) % THEMES.length];
    });
  };

  const icons = {
    "light-theme": <Sun size={16} strokeWidth={1.5} />,
    "dark-theme": <Moon size={16} strokeWidth={1.5} />,
    "auto-theme": <SunMoon size={16} strokeWidth={1.5} />,
  };

  const labels = {
    "light-theme": "Light",
    "dark-theme": "Dark",
    "auto-theme": "Auto",
  };

  return (
    <button
      className={styles.toggle}
      onClick={cycle}
      aria-label={`Switch theme, current: ${labels[theme]}`}
      title={labels[theme]}
    >
      <span className={styles.icon}>{icons[theme]}</span>
      <span className={styles.label}>{labels[theme]}</span>
    </button>
  );
};

export default ToggleTheme;
