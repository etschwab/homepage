"use client";

import { useEffect, useMemo, useState } from "react";

type AnimatedHeroTitleProps = {
  text: string;
  rolePrefix: string;
  roles: readonly string[];
};

export function AnimatedHeroTitle({
  text,
  rolePrefix,
  roles,
}: AnimatedHeroTitleProps) {
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const currentRole = useMemo(
    () => roles[roleIndex % Math.max(roles.length, 1)] ?? "",
    [roleIndex, roles],
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => setTypedText(text));

      return () => window.cancelAnimationFrame(frame);
    }

    if (typedText.length >= text.length) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setTypedText(text.slice(0, typedText.length + 1));
    }, typedText.length === 0 ? 260 : 72);

    return () => window.clearTimeout(timeout);
  }, [text, typedText]);

  useEffect(() => {
    if (roles.length <= 1) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, [roles]);

  return (
    <div>
      <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
        <span>{typedText || text.slice(0, 1)}</span>
        <span className="typewriter-caret" aria-hidden="true" />
      </h1>
      <p className="mt-5 flex flex-wrap items-center gap-2 text-xl font-medium text-zinc-300 sm:text-2xl">
        <span className="font-mono text-sm uppercase tracking-normal text-zinc-500">
          {rolePrefix}
        </span>
        <span
          key={currentRole}
          className="rotating-role text-cyan-100"
          aria-live="polite"
        >
          {currentRole}
        </span>
      </p>
    </div>
  );
}
