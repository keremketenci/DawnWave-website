"use client";

// translations
import { useTranslations } from "next-intl";

// react
import { useState } from "react";

// form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// components
import { LoaderGlitch } from "@/components/effects/LoaderGlitch";

// components ui
import { ButtonDecode } from "@/components/ui/button/ButtonDecode";
import { CardHighlighted } from "@/components/ui/card/CardHighlighted";
import { FormTextField, HoneypotField } from "@/components/ui/form/FormTextField";
import { Form } from "@/components/ui/shadcn/form";
import { toast } from "sonner";

// hooks & utils
import { subscribeSchema, type SubscribeInput } from "@/lib/validation";

export function Subscribe() {
  const t = useTranslations("Subscribe");
  const tToast = useTranslations("Toast.Subscribe.Email");

  const form = useForm({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
      website: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SubscribeInput) => {
    setLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHighlighted
          cardType="Subscribe"
          cardClass="bg-card-background text-white border border-slate-800 flex flex-col p-4"
          title={t("title")}
          titleClass="text-center text-2xl"
          description={t("description")}
          descriptionClass="text-center"
          content={
            <>
              <FormTextField
                control={form.control}
                name="email"
                type="email"
                labelClass="ml-2"
                label={t("Form.label.email")}
                placeholder={t("Form.input-placeholder.email")}
                description={t("Form.input-description.email")}
                autoComplete="email"
              />
              <HoneypotField control={form.control} />
            </>
          }
          footer={
            <div>
              {loading ? (
                <div className="p-2">
                  <LoaderGlitch text={t("Button.subscribing")} />
                </div>
              ) : (
                <ButtonDecode text={t("Button.subscribe")} />
              )}
            </div>
          }
          footerClass="flex justify-center w-full"
        />
      </form>
    </Form>
  );
}
