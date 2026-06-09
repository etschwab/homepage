"use client";

import { useEffect, useState } from "react";

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(false), 760);

    return () => window.clearTimeout(timeout);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="page-loader-overlay fixed inset-0 z-[100] grid place-items-center bg-[#080808]">
      <div className="grid justify-items-center gap-4">
        <div className="loader-mark" aria-hidden="true">
          ES
        </div>
        <p className="font-mono text-sm text-zinc-400">
          Portfolio wird geladen
        </p>
      </div>
    </div>
  );
}
