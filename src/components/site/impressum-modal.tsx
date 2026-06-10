"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Mail, X } from "lucide-react";

import { EmailLink } from "@/components/ui/email-link";
import { profile } from "@/data/profile";

const imprintRows = [
  { label: "Verantwortlich", value: "Etienne Schwab" },
  { label: "Standort", value: "Schweiz" },
  { label: "Art der Website", value: "Persönliche Portfolio- und Bewerbungsseite" },
] as const;

export function ImpressumModal() {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="transition-colors hover:text-orange-300 focus:text-orange-300 focus:outline-none"
      >
        Impressum
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 px-3 py-4 backdrop-blur-sm sm:items-center sm:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="rounded-soft w-full max-w-2xl border border-white/10 bg-[var(--panel)] p-5 text-left shadow-2xl shadow-black/50 outline-none backdrop-blur-md sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-sm text-orange-400">Impressum</p>
                <h2
                  id={titleId}
                  className="mt-3 text-2xl font-semibold text-white sm:text-3xl"
                >
                  Angaben zur Website
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-soft grid size-10 shrink-0 place-items-center border border-white/10 text-zinc-400 transition-colors hover:border-orange-400 hover:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400/60"
                aria-label="Impressum schliessen"
              >
                <X aria-hidden="true" size={18} />
              </button>
            </div>

            <p
              id={descriptionId}
              className="mt-5 text-sm leading-7 text-zinc-400"
            >
              Diese Website ist eine persönliche Portfolio- und Bewerbungsseite
              von {profile.name}. Die folgenden Angaben öffnen sich als Modal,
              ohne die aktuelle Seite zu verlassen.
            </p>

            <dl className="mt-6 grid gap-3 sm:grid-cols-3">
              {imprintRows.map((row) => (
                <div
                  key={row.label}
                  className="rounded-soft border border-white/10 bg-white/[0.03] p-4"
                >
                  <dt className="font-mono text-xs uppercase tracking-normal text-zinc-500">
                    {row.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-white">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 rounded-soft border border-orange-400/25 bg-orange-400/[0.045] p-4">
              <p className="font-mono text-xs uppercase tracking-normal text-orange-300">
                Kontakt
              </p>
              <EmailLink className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-orange-300 transition-colors hover:text-orange-200">
                <Mail aria-hidden="true" size={16} />
                {profile.email}
              </EmailLink>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
