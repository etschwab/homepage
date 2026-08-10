"use client";

import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";

import { siteCopy } from "@/data/profile";

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
      >
        {siteCopy.footer.imprint}
      </button>

      {isOpen ? (
        <div
          className="modal-backdrop"
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
            className="modal-panel"
          >
            <div className="modal-heading">
              <div>
                <p className="section-label">
                  {siteCopy.footer.imprint}
                </p>
                <h2 id={titleId}>
                  {siteCopy.imprint.title}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                className="modal-close"
                aria-label={siteCopy.imprint.closeLabel}
              >
                <X aria-hidden="true" size={18} />
              </button>
            </div>

            <p
              id={descriptionId}
              className="modal-description"
            >
              {siteCopy.imprint.description}
            </p>

            <dl className="modal-rows">
              {siteCopy.imprint.rows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>

          </section>
        </div>
      ) : null}
    </>
  );
}
