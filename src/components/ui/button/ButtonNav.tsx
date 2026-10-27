// styles
import styles from "@/components/ui/button/ButtonNav.module.css";

interface ButtonNavProps {
  onClick?: () => void;
  checked?: boolean;
  label: string;
}

/** Animated hamburger toggle. */
export function ButtonNav({ onClick, checked, label }: ButtonNavProps) {
  return (
    <label className={styles.ButtonNav} htmlFor="ButtonNav">
      <input
        type="checkbox"
        id="ButtonNav"
        aria-label={label}
        onClick={onClick}
        checked={checked}
        readOnly
      />
      <span></span>
      <span></span>
      <span></span>
    </label>
  );
}
