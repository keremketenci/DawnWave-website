// translations
import { getTranslations } from "next-intl/server";

// components
import { reveal } from "@/components/effects/reveal";
// import { ContactCard } from "@/components/sections/Contact/ContactCard";
import { ContactForm } from "@/components/sections/Contact/ContactForm";

export async function Contact() {
  const t = await getTranslations("Contact");

  return (
    <div>
      <h2 {...reveal()} className="text-4xl font-bold text-center p-4 text-accent">
        {t("title")}
      </h2>

      {/* Only the form is shown for now. To bring back the info cards (email, phone,
          address, socials), restore this two-column layout and remove the wrapper below.
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6">
        <div className="flex" {...reveal(100)}>
          <ContactCard />
        </div>
        <ContactForm />
      </div> */}

      <div className="mx-auto max-w-3xl">
        <ContactForm />
      </div>
    </div>
  );
}
