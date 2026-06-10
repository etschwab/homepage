"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import { profile } from "@/data/profile";

type EmailLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
};

export function EmailLink({ children, onClick, ...props }: EmailLinkProps) {
  return (
    <a
      {...props}
      href="#kontakt"
      rel="nofollow"
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        event.preventDefault();
        window.location.href = `mailto:${profile.email}`;
      }}
    >
      {children}
    </a>
  );
}
