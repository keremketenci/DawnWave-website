"use client";

// translations
import { useTranslations } from "next-intl";

// form
import type { Control, FieldPath, FieldValues } from "react-hook-form";

// components ui
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";

const inputClass =
  "bg-black border border-slate-800 focus-visible:ring-black ring-offset-slate-800";

interface FormTextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  labelClass?: string;
  placeholder: string;
  description: string;
  type?: "text" | "email";
  autoComplete?: string;
  multiline?: boolean;
}

/** Labelled input with inline error message and description, used by the site's forms. */
export function FormTextField<T extends FieldValues>({
  control,
  name,
  label,
  labelClass = "ml-1",
  placeholder,
  description,
  type,
  autoComplete,
  multiline,
}: FormTextFieldProps<T>) {
  const t = useTranslations("Validation");
  // Schema messages are keys of the Validation namespace (see src/lib/validation.ts).
  const translate = (message?: string) =>
    message && t.has(message as Parameters<typeof t>[0])
      ? t(message as Parameters<typeof t>[0])
      : message;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="short:space-y-1">
          <div className="flex justify-between items-end space-x-4">
            <FormLabel className={labelClass}>{label}</FormLabel>
            <div className="text-right">
              {fieldState.error && <FormMessage>{translate(fieldState.error.message)}</FormMessage>}
            </div>
          </div>
          <FormControl>
            {multiline ? (
              <Textarea
                className={`${inputClass} short:min-h-16`}
                placeholder={placeholder}
                {...field}
              />
            ) : (
              <Input
                className={inputClass}
                placeholder={placeholder}
                type={type}
                autoComplete={autoComplete}
                {...field}
              />
            )}
          </FormControl>
          <FormDescription>{description}</FormDescription>
        </FormItem>
      )}
    />
  );
}

/** Hidden field that only bots fill in. */
export function HoneypotField<T extends FieldValues>({ control }: { control: Control<T> }) {
  return (
    <FormField
      control={control}
      name={"website" as FieldPath<T>}
      render={({ field }) => (
        <input
          type="text"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          {...field}
        />
      )}
    />
  );
}
