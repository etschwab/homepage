"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Mail, X } from "lucide-react";

import { EmailLink } from "@/components/ui/email-link";
import { profile, siteCopy } from "@/data/profile";

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
        className="transition-colors hover:text-sky-700 focus:text-sky-700 focus:outline-none"
      >
        {siteCopy.footer.imprint}
      </button>

      {isOpen ? (
        <div
          className="modal-backdrop fixed inset-0 z-[80] grid place-items-center bg-white/90 px-4 py-6 backdrop-blur-sm"
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
            className="modal-panel rounded-soft max-h-[min(44rem,calc(100svh-3rem))] w-full max-w-2xl overflow-y-auto border border-black/10 bg-white p-5 text-left shadow-2xl outline-none sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-sm text-sky-700/80">
                  {siteCopy.footer.imprint}
                </p>
                <h2
                  id={titleId}
                  className="mt-3 text-2xl font-semibold text-zinc-950 sm:text-3xl"
                >
                  {siteCopy.imprint.title}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-soft grid size-10 shrink-0 place-items-center border border-black/10 text-zinc-500 transition-colors hover:border-sky-200/30 hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-sky-200/20"
                aria-label={siteCopy.imprint.closeLabel}
              >
                <X aria-hidden="true" size={18} />
              </button>
            </div>

            <p
              id={descriptionId}
              className="mt-5 text-sm leading-7 text-zinc-500"
            >
              {siteCopy.imprint.description}
            </p>

            <dl className="mt-6 grid gap-3 sm:grid-cols-3">
              {siteCopy.imprint.rows.map((row) => (
                <div
                  key={row.label}
                  className="rounded-soft border border-black/10 bg-white/75 p-4"
                >
                  <dt className="font-mono text-xs uppercase tracking-normal text-zinc-500">
                    {row.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-zinc-900">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 rounded-soft border border-sky-200/20 bg-sky-50/80 p-4">
              <p className="font-mono text-xs uppercase tracking-normal text-sky-700/90">
                {siteCopy.imprint.contact}
              </p>
              <EmailLink className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-sky-700/90 transition-colors hover:text-zinc-950">
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
