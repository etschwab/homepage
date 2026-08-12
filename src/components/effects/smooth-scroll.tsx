"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScroll() {
  return (
    <ReactLenis
      root
      options={{
        anchors: { offset: -88 },
        autoRaf: true,
        duration: 1.15,
        easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
        prevent: (node) => Boolean(node.closest("dialog")),
        smoothWheel: true,
        stopInertiaOnNavigate: true,
        wheelMultiplier: 1,
      }}
    />
  );
}
