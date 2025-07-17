import { useEffect, useState } from "react";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { DarkMode, LightMode, BrightnessAuto } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: 8,
  borderRadius: "50%",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(0, 0, 0, 0.04)",
    transform: "scale(1.1)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.5rem",
  },
}));

const ToggleTheme = () => {
  const [mode, setMode] = useState(null);
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  // Initialize theme
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialMode = savedTheme || (prefersDark ? "dark" : "light");
    setMode(initialMode);
    applyTheme(initialMode);

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
    document.documentElement.setAttribute("data-theme", themeMode);
    if (themeMode === "system") {
      const systemMode = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.documentElement.classList.toggle(
        "dark-theme",
        systemMode === "dark"
      );
      document.documentElement.classList.toggle(
        "light-theme",
        systemMode === "light"
      );
    } else {
      document.documentElement.classList.toggle(
        "dark-theme",
        themeMode === "dark"
      );
      document.documentElement.classList.toggle(
        "light-theme",
        themeMode === "light"
      );
    }
  };

  const toggleTheme = () => {
    const newMode =
      mode === "dark" ? "light" : mode === "light" ? "system" : "dark";
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
    if (!mounted) return "Loading theme...";
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
    if (!mounted) return <BrightnessAuto fontSize="medium" />;
    switch (mode) {
      case "dark":
        return <DarkMode />;
      case "light":
        return <LightMode />;
      default:
        return <BrightnessAuto />;
    }
  };

  if (!mounted) {
    return (
      <StyledIconButton disabled>
        <BrightnessAuto />
      </StyledIconButton>
    );
  }

  return (
    <Tooltip title={getTooltipTitle()} arrow>
      <StyledIconButton
        color="info"
        size="large"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        aria-expanded={mode === "dark"}
        aria-controls="toggle-theme"
        aria-haspopup="true"
        aria-owns="toggle-theme"
      >
        {getIcon()}
      </StyledIconButton>
    </Tooltip>
  );
};

export default ToggleTheme;
