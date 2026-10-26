"use client";

/**
 * Renders an inline script that executes during server rendering only.
 *
 * React never runs <script> tags created on the client and logs
 * "Encountered a script tag while rendering React component…" whenever it
 * re-creates one (dev-mode Strict Mode remount resets <head>, Fast Refresh,
 * full client re-render after a hydration bailout, …). Switching the type to
 * an inert data block (`text/plain`) on client renders silences that warning
 * — React treats non-JavaScript script types as data blocks — while the
 * server-emitted copy (`text/javascript`) still runs synchronously before
 * the first paint. suppressHydrationWarning covers the deliberate
 * type-attribute mismatch: the DOM copy has already executed and wins.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
