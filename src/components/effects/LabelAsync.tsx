// styles
import styles from "@/components/effects/LabelAsync.module.css";

interface LabelAsyncProps {
  text1?: string;
  text1Class?: string;
  text2?: string;
  text2Class?: string;
  text3?: string;
  text3Class?: string;
  text4?: string;
  text4Class?: string;
}

export function LabelAsync({
  text1,
  text1Class,
  text2,
  text2Class,
  text3,
  text3Class,
  text4,
  text4Class,
}: LabelAsyncProps) {
  return (
    <div className="flex justify-center">
      <div className={``}>
        <div className={`${styles.LabelAsyncLoader} select-none`}>
          <div className={`${styles.LabelAsyncWords} text-right`}>
            <span className={`${styles.LabelAsyncWord} ${text1Class}`}>{text1}</span>
            <a href="https://keremketenci.com" target="_blank" rel="noopener noreferrer">
              <span className={`${styles.LabelAsyncWord} ${text2Class}`}>{text2}</span>
            </a>
            <span className={`${styles.LabelAsyncWord} ${text1Class}`}>{text1}</span>
            <a href="https://keremketenci.com" target="_blank" rel="noopener noreferrer">
              <span className={`${styles.LabelAsyncWord} ${text2Class}`}>{text2}</span>
            </a>
            <span className={`${styles.LabelAsyncWord} ${text1Class}`}>{text1}</span>
          </div>
        </div>
      </div>
      <div className={``}>
        <div className={`${styles.LabelAsyncLoader} select-none`}>
          <div className={`${styles.LabelAsyncWords} text-left`}>
            <span className={`${styles.LabelAsyncWord} ${text3Class}`}>{text3}</span>
            <a href="https://keremketenci.com" target="_blank" rel="noopener noreferrer">
              <span className={`${styles.LabelAsyncWord} ${text4Class}`}>{text4}</span>
            </a>
            <span className={`${styles.LabelAsyncWord} ${text3Class}`}>{text3}</span>
            <a href="https://keremketenci.com" target="_blank" rel="noopener noreferrer">
              <span className={`${styles.LabelAsyncWord} ${text4Class}`}>{text4}</span>
            </a>
            <span className={`${styles.LabelAsyncWord} ${text3Class}`}>{text3}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
