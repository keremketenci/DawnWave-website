// Shared by server and client components; see ScrollReveal.tsx and globals.css.

/**
 * Inline script for <head>: hides `data-reveal` elements before first paint.
 * If <ScrollReveal> has not started after 3s (JS failed), everything is shown again.
 */
export const scrollRevealScript = `(function(){var d=document.documentElement;if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("reveal-ready");setTimeout(function(){if(!window.__revealBooted)d.classList.remove("reveal-ready")},3000)})()`;

/** Props that opt an element into the scroll reveal, with an optional stagger delay. */
export function reveal(delayMs = 0) {
  return {
    "data-reveal": "",
    style: delayMs ? ({ "--reveal-delay": `${delayMs}ms` } as React.CSSProperties) : undefined,
  };
}
