"use client";

import { ArrowDown, ArrowUp } from "lucide-react";

export function MoveButtons({
  index,
  length,
  onMove,
}: {
  index: number;
  length: number;
  onMove: (to: number) => void;
}) {
  return (
    <>
      <button type="button" className="admin-icon" aria-label="Nach oben" disabled={index === 0} onClick={() => onMove(index - 1)}>
        <ArrowUp aria-hidden="true" size={16} />
      </button>
      <button type="button" className="admin-icon" aria-label="Nach unten" disabled={index === length - 1} onClick={() => onMove(index + 1)}>
        <ArrowDown aria-hidden="true" size={16} />
      </button>
    </>
  );
}

export function move<T>(items: readonly T[], from: number, to: number) {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}
