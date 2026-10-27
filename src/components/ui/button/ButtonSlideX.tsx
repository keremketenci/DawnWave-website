// styles
import styles from "@/components/ui/button/ButtonSlideX.module.css";

interface ButtonSlideXProps {
  text: string;
  /** Renders a link styled as the button instead of a <button>. */
  href?: string;
}

export function ButtonSlideX({ text, href }: ButtonSlideXProps) {
  if (href) {
    return (
      <a href={href} className={`${styles.ButtonSlideX} ${styles.ButtonSlideXLink}`}>
        {text}
      </a>
    );
  }

  return (
    <button type="button" className={styles.ButtonSlideX}>
      {text}
    </button>
  );
}
