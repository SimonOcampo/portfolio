"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

const subscribe = () => () => undefined;

/**
 * Keeps SSR and the first client render identical, then applies the user's
 * reduced-motion preference immediately after hydration.
 */
export function useHydratedReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const hasHydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  return hasHydrated && Boolean(prefersReducedMotion);
}
