// styles
import styles from "@/components/effects/LoaderGlitch.module.css";

interface LoaderGlitchProps {
  text: string;
}

export function LoaderGlitch({ text }: LoaderGlitchProps) {
  return (
    <div role="status">
      <div className={styles.LoaderGlitch} data-glitch={text}>
        {text}
      </div>
    </div>
  );
}
