// translations
import { getTranslations } from "next-intl/server";

// components
import { reveal } from "@/components/effects/reveal";
import { ContactCard } from "@/components/sections/Contact/ContactCard";
import { ContactForm } from "@/components/sections/Contact/ContactForm";

export async function Contact() {
  const t = await getTranslations("Contact");

  return (
    <div>
      <h2 {...reveal()} className="text-4xl font-bold text-center p-4 text-accent">
        {t("title")}
      </h2>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
        <div className="flex" {...reveal(100)}>
          <ContactCard />
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
