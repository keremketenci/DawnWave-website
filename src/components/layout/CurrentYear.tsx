"use client";

// react
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Renders the current year. Pages are statically generated, so the HTML contains the
 * build year (`fallback`) and the browser swaps in the visitor's current year after
 * hydration, without a hydration mismatch.
 */
export function CurrentYear({ fallback }: { fallback: number }) {
  return useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => fallback,
  );
}
