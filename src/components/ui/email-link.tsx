"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

const emailParts = ["etienne.schwab", "bwdbern", "ch"] as const;

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
        const email = `${emailParts[0]}@${emailParts[1]}.${emailParts[2]}`;
        window.location.href = `mailto:${email}`;
      }}
    >
      {children}
    </a>
  );
}
