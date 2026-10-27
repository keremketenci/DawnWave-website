"use client";

// translations
import { useTranslations } from "next-intl";

// components
import { socialButtonClass } from "@/components/ui/button/ButtonSocials";
import { Icon, type IconName } from "@/components/ui/Icon";

// hooks & utils
import { copyToClipboard } from "@/lib/copy-to-clipboard";

interface ButtonCopyProps {
  value: string;
  icon: IconName;
  iconClass?: string;
  isActive: boolean;
}

/** Social-style icon button that copies `value` (e.g. an email address) to the clipboard. */
export function ButtonCopy({ value, icon, iconClass, isActive }: ButtonCopyProps) {
  const t = useTranslations("Toast.CardTeam.Email.Copy");

  return (
    <button
      type="button"
      className={socialButtonClass(icon, isActive)}
      title={value}
      aria-label={value}
      onClick={() => copyToClipboard(value, { success: t("success"), failed: t("failed") })}
    >
      <Icon name={icon} className={iconClass} />
    </button>
  );
}
