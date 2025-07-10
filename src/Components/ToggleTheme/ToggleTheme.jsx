import { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { DarkMode, LightMode, BrightnessAuto } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const ThemeToggle = () => {
  const [mode, setMode] = useState(null);
  const muiTheme = useTheme();

  // Initialize theme
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Default to system preference if no saved preference
    const initialMode = savedTheme
      ? savedTheme
      : prefersDark
      ? "dark"
      : "light";
    setMode(initialMode);
    applyTheme(initialMode);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      if (!localStorage.getItem("theme")) {
        const newMode = e.matches ? "dark" : "light";
        setMode(newMode);
        applyTheme(newMode);
      }
    };
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const applyTheme = (themeMode) => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark-theme");
      document.documentElement.classList.remove("light-theme");
    } else {
      document.documentElement.classList.add("light-theme");
      document.documentElement.classList.remove("dark-theme");
    }
  };

  const toggleTheme = () => {
    let newMode;
    if (mode === "dark") {
      newMode = "light";
    } else if (mode === "light") {
      newMode = "system";
    } else {
      newMode = "dark";
    }

    setMode(newMode);
    if (newMode === "system") {
      localStorage.removeItem("theme");
      const systemMode = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      applyTheme(systemMode);
    } else {
      localStorage.setItem("theme", newMode);
      applyTheme(newMode);
    }
  };

  const getTooltipTitle = () => {
    switch (mode) {
      case "dark":
        return "Switch to Light Mode";
      case "light":
        return "Switch to System Preference";
      default:
        return "Switch to Dark Mode";
    }
  };

  const getIcon = () => {
    switch (mode) {
      case "dark":
        return <DarkMode fontSize="medium" />;
      case "light":
        return <LightMode fontSize="medium" />;
      default:
        return <BrightnessAuto fontSize="medium" />;
    }
  };

  return (
    <Tooltip title={getTooltipTitle()}>
      <IconButton
        color="inherit"
        onClick={toggleTheme}
        sx={{
          p: 1,
          borderRadius: "50%",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor:
              muiTheme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.04)",
            transform: "scale(1.1)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        {getIcon()}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
