"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  function toggleTheme() {
    const nextIsLight = !isLight;

    setIsLight(nextIsLight);
    document.documentElement.classList.toggle("theme-light", nextIsLight);
  }

  const Icon = isLight ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle rounded-soft order-2 inline-flex h-10 shrink-0 items-center justify-center gap-2 border border-white/12 px-3 font-mono text-sm font-semibold text-white transition-colors hover:border-orange-400 hover:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400/60 md:order-none"
      aria-label={isLight ? "Dark Mode aktivieren" : "White Mode aktivieren"}
      title={isLight ? "Dark Mode" : "White Mode"}
    >
      <Icon aria-hidden="true" size={15} strokeWidth={2.1} />
      <span className="hidden lg:inline">{isLight ? "Dark" : "White"}</span>
    </button>
  );
}
