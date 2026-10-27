// styles
import styles from "@/components/ui/button/ButtonSocials.module.css";

// components
import { Icon, type IconName } from "@/components/ui/Icon";

// hooks & utils
import { cn } from "@/lib/utils";

export function socialButtonClass(icon: IconName, isActive: boolean) {
  return cn(isActive ? styles.ButtonSocials : "inline-block", styles[`ButtonSocials-${icon}`]);
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
