"use client";

// translations
import { useTranslations } from "next-intl";

// react
import { useState } from "react";

// form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// components
import { reveal } from "@/components/effects/reveal";
import { LoaderGlitch } from "@/components/effects/LoaderGlitch";

// components ui
import { ButtonDecode } from "@/components/ui/button/ButtonDecode";
import { CardHighlighted } from "@/components/ui/card/CardHighlighted";
import { FormTextField, HoneypotField } from "@/components/ui/form/FormTextField";
import { Form } from "@/components/ui/shadcn/form";
import { toast } from "sonner";

// hooks & utils
import { contactSchema, type ContactInput } from "@/lib/validation";

export function ContactForm() {
  const t = useTranslations("Contact.Form");
  const tToast = useTranslations("Toast.ContactForm.Email");

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ContactInput) => {
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        form.reset();
        toast(tToast("success"));
      } else {
        toast(`${tToast("failed")}.`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast(`${tToast("failed")}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardHighlighted
      cardType="Form"
      rootProps={reveal(200)}
      cardClass="bg-card-background text-white border border-slate-800"
      content={
        <div className="bg-card-background text-white rounded-3xl p-4 w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 short:space-y-1 space-x-0"
            >
              <FormTextField
                control={form.control}
                name="name"
                label={t("label.firstName")}
                placeholder={t("input-placeholder.firstName")}
                description={t("input-description.firstName")}
                autoComplete="given-name"
              />
              <FormTextField
                control={form.control}
                name="surname"
                label={t("label.lastName")}
                placeholder={t("input-placeholder.lastName")}
                description={t("input-description.lastName")}
                autoComplete="family-name"
              />
              <FormTextField
                control={form.control}
                name="email"
                type="email"
                label={t("label.email")}
                placeholder={t("input-placeholder.email")}
                description={t("input-description.email")}
                autoComplete="email"
              />
              <FormTextField
                control={form.control}
                name="subject"
                label={t("label.subject")}
                placeholder={t("input-placeholder.subject")}
                description={t("input-description.subject")}
              />
              <FormTextField
                control={form.control}
                name="message"
                multiline
                label={t("label.message")}
                placeholder={t("input-placeholder.message")}
                description={t("input-description.message")}
              />
              <HoneypotField control={form.control} />
              <div className="flex flex-col items-center">
                <div>
                  {loading ? (
                    <div className="p-2">
                      <LoaderGlitch text={t("Button.sending")} />
                    </div>
                  ) : (
                    <ButtonDecode text={t("Button.submit")} />
                  )}
                </div>
              </div>
            </form>
          </Form>
        </div>
      }
    />
  );
}
