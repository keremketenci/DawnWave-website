// hooks & utils
import { cn } from "@/lib/utils";

/** Horizontal page padding shared by the content sections. */
export const sectionPadding = "px-4 sm:px-16 md:px-24 xl:px-32 2xl:px-48";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  /** Fill the whole screen on phones too (default: only from the `md` breakpoint). */
  fullHeightOnMobile?: boolean;
}

/**
 * A page section that fills one screen (minus the fixed 72px navbar) and centres its
 * content, so jumping to a section from the navbar shows only that section.
 * Taller content simply grows the section.
 */
export function Section({ id, children, className, fullHeightOnMobile }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "flex flex-col justify-center pt-24 pb-12 md:pt-18 md:pb-8",
        fullHeightOnMobile ? "min-h-svh" : "md:min-h-svh",
        className,
      )}
    >
      {children}
    </section>
  );
}
