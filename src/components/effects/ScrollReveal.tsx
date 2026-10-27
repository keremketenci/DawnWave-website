"use client";

// react
import { useEffect } from "react";

// next
import { usePathname } from "next/navigation";

/** Reveals every `[data-reveal]` element once it scrolls into view. Renders nothing. */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    window.__revealBooted = true;

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    const reveal = (el: Element) => el.setAttribute("data-revealed", "");

    if (!document.documentElement.classList.contains("reveal-ready")) {
      elements.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      // Trigger a little before the element is fully on screen.
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
