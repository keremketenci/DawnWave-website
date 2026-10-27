// styles
import styles from "@/components/ui/button/ButtonDecode.module.css";

interface ButtonDecodeProps {
  text: string;
}

/** Submit button with the "decoding" hover effect. */
export function ButtonDecode({ text }: ButtonDecodeProps) {
  return (
    <button type="submit" className={styles.ButtonDecode}>
      <span>{text}</span>
    </button>
  );
}
