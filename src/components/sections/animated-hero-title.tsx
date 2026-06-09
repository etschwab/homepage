"use client";

import { useEffect, useMemo, useState } from "react";

type AnimatedHeroTitleProps = {
  name: string;
  title: readonly [string, string];
};

type Cursor = {
  line: number;
  char: number;
};

export function AnimatedHeroTitle({ name, title }: AnimatedHeroTitleProps) {
  const lines = useMemo(
    () => ["Hallo, ich bin", `${name}.`, title[0], title[1]],
    [name, title],
  );
  const [cursor, setCursor] = useState<Cursor>({ line: 0, char: 0 });

  useEffect(() => {
    if (cursor.line >= lines.length) {
      return;
    }

    const currentLine = lines[cursor.line];
    const lineDone = cursor.char >= currentLine.length;
    const delay = lineDone ? 260 : cursor.char === 0 ? 180 : 32;

    const timeout = window.setTimeout(() => {
      if (lineDone) {
        setCursor({ line: cursor.line + 1, char: 0 });
        return;
      }

      setCursor({ line: cursor.line, char: cursor.char + 1 });
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [cursor, lines]);

  const activeLine = Math.min(cursor.line, lines.length - 1);
  const finished = cursor.line >= lines.length;

  return (
    <h1
      aria-label={lines.join(" ")}
      className="hero-title relative mt-7 text-3xl font-bold leading-[1.04] tracking-normal text-white sm:text-5xl sm:leading-[1.02] md:text-6xl lg:text-7xl"
    >
      <span aria-hidden="true" className="invisible block">
        {lines.map((line, index) => (
          <span
            key={`shadow-${index}-${line}`}
            className={index < 2 ? "block" : "block text-zinc-400"}
          >
            {line}
          </span>
        ))}
      </span>

      <span aria-hidden="true" className="absolute inset-0 block">
        {lines.map((line, index) => {
          const safeLine = line ?? "";
          const text =
            index < cursor.line
              ? safeLine
              : index === cursor.line
                ? safeLine.slice(0, cursor.char)
                : "";
          const showCursor = finished ? index === lines.length - 1 : index === activeLine;

          return (
            <span
              key={`typed-${index}-${safeLine}`}
              className={index < 2 ? "block" : "block text-zinc-400"}
            >
              {text}
              {showCursor ? <span className="typing-caret" /> : null}
            </span>
          );
        })}
      </span>
    </h1>
  );
}
