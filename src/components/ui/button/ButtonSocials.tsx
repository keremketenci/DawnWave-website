// styles
import styles from "@/components/ui/button/ButtonSocials.module.css";

// components
import { Icon, type IconName } from "@/components/ui/Icon";

// hooks & utils
import { cn } from "@/lib/utils";

export function socialButtonClass(icon: IconName, isActive: boolean) {
  // Brand colours only apply to the round (active) buttons; inactive ones are plain icons.
  return isActive ? cn(styles.ButtonSocials, styles[`ButtonSocials-${icon}`]) : "inline-block";
}

interface ButtonSocialsProps {
  href: string;
  label?: string;
  icon: IconName;
  iconClass?: string;
  isActive: boolean;
}

export function ButtonSocials({ href, label, icon, iconClass, isActive }: ButtonSocialsProps) {
  return (
    <a href={href} className={socialButtonClass(icon, isActive)} title={href} aria-label={label}>
      <Icon name={icon} className={iconClass} />
    </a>
  );
}
