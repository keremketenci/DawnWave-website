"use client";

// translations
import { useLocale, useTranslations } from "next-intl";

// i18n
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

// components ui
import { Icon } from "@/components/ui/Icon";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/shadcn/select";

export function LanguageSwitcher() {
  const t = useTranslations("Navbar");
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeHandler = (value: string) => {
    router.replace(pathname, { locale: value as Locale });
  };

  return (
    <div>
      <Select defaultValue={currentLocale} onValueChange={changeHandler}>
        <SelectTrigger
          aria-label={t("language")}
          className="bg-black text-white border border-slate-800 ring-offset-black focus:ring-black"
        >
          <Icon name={currentLocale} className="w-8 mr-2" />
        </SelectTrigger>
        <SelectContent className="bg-black text-white border-slate-800">
          <SelectItem className="focus:bg-slate-800 focus:text-white" value="en" lang="en">
            English
          </SelectItem>
          <SelectItem className="focus:bg-slate-800 focus:text-white" value="tr" lang="tr">
            Türkçe
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
