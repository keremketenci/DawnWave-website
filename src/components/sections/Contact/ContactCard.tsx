// translations
import { getTranslations } from "next-intl/server";

// data
import { studioSocials } from "@/data/socials";

// components ui
import { ButtonSocials } from "@/components/ui/button/ButtonSocials";
import { CardHighlighted } from "@/components/ui/card/CardHighlighted";
import { Separator } from "@/components/ui/shadcn/separator";
import { Mail, MapPin, Phone } from "lucide-react";

// hooks & utils
import { siteConfig } from "@/lib/site";

export async function ContactCard() {
  const t = await getTranslations("Contact");
  const email = `${t("Card.Content.Mail.contact")}@${t("Card.Content.Mail.domain")}`;

  return (
    <div className="grid grid-cols-1 gap-8">
      <CardHighlighted
        cardType="Horizontal"
        cardClass="bg-card-background text-white border border-slate-800 flex items-center p-4"
        icon={<Mail size={64} aria-hidden="true" />}
        content={<a href={`mailto:${email}`}>{email}</a>}
        contentClass="text-2xl break-all"
        description={t("Card.Description.mail")}
        descriptionClass="ml-3"
      />

      <CardHighlighted
        cardType="Horizontal"
        cardClass="bg-card-background text-white border border-slate-800 flex items-center p-4"
        icon={<Phone size={64} aria-hidden="true" />}
        content={<a href={`tel:${siteConfig.phone}`}>{t("Card.Content.phone")}</a>}
        contentClass="text-2xl"
        description={t("Card.Description.phone")}
        descriptionClass="ml-3"
      />

      <CardHighlighted
        cardType="Horizontal"
        cardClass="bg-card-background text-white border border-slate-800 flex items-center p-4"
        icon={<MapPin size={64} aria-hidden="true" />}
        content={<address className="not-italic">{t("Card.Content.address")}</address>}
        contentClass="text-2xl"
        description={t("Card.Description.address")}
        descriptionClass="ml-3"
      />

      <Separator />

      <div className="flex flex-wrap justify-center gap-2.5">
        {studioSocials.map((social) => (
          <ButtonSocials
            key={social.icon}
            href={social.href}
            label={social.label}
            icon={social.icon}
            iconClass={social.iconClass}
            isActive={true}
          />
        ))}
      </div>
      <Separator />
    </div>
  );
}
