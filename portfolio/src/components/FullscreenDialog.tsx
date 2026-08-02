"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

interface FullscreenDialogProps {
  children: ReactNode;
  onClose?: () => void;
  labelledBy?: string;
  ariaLabel?: string;
  className?: string;
  contentClassName?: string;
  showBackdrop?: boolean;
}

export default function FullscreenDialog({
  children,
  onClose,
  labelledBy,
  ariaLabel,
  className,
  contentClassName,
  showBackdrop = true,
}: FullscreenDialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const chamberScroller = document.querySelector<HTMLElement>("[data-chamber-scroll][data-active='true']");
    const main = document.querySelector<HTMLElement>("main");
    const previousBodyOverflow = document.body.style.overflow;
    const previousScrollerOverflow = chamberScroller?.style.overflow ?? "";

    document.body.style.overflow = "hidden";
    if (chamberScroller) chamberScroller.style.overflow = "hidden";
    if (main) main.inert = true;

    const focusFrame = window.requestAnimationFrame(() => {
      const firstFocusable = contentRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      (firstFocusable ?? contentRef.current)?.focus({ preventScroll: true });
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !contentRef.current) return;

      const focusable = [...contentRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (element) => !element.hasAttribute("disabled") && element.getClientRects().length > 0
      );
      if (!focusable.length) {
        event.preventDefault();
        contentRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      if (chamberScroller) chamberScroller.style.overflow = previousScrollerOverflow;
      if (main) main.inert = false;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-label={ariaLabel}
      className={twMerge("fixed inset-0 z-[100] isolate", className)}
    >
      {showBackdrop && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close dialog"
          onClick={onClose}
          className="absolute inset-0 size-full cursor-default bg-black/80 backdrop-blur-md"
        />
      )}
      <div
        ref={contentRef}
        tabIndex={-1}
        className={twMerge("relative z-10 outline-none", contentClassName)}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
