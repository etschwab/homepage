"use client";

import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

function getCurrentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function ThemeToggle() {
  function toggleTheme() {
    const nextTheme: Theme = getCurrentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Farbschema wechseln"
      title="Farbschema wechseln"
    >
      <Sun className="theme-icon theme-icon-sun" aria-hidden="true" size={17} />
      <Moon className="theme-icon theme-icon-moon" aria-hidden="true" size={16} />
    </button>
  );
}
