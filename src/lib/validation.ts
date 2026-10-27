import { z } from "zod";

// Shared between the forms (client) and the API routes (server).
// Error messages are keys of the `Validation` messages namespace; the forms translate them.

// Zod's JIT compiler uses `new Function`, which the Content-Security-Policy blocks.
z.config({ jitless: true });

const singleLine = (value: string) => !/[\r\n]/.test(value);

export const contactSchema = z.object({
  name: z.string().trim().min(2, "nameMin").max(50, "nameMax").refine(singleLine, "singleLine"),
  surname: z
    .string()
    .trim()
    .min(2, "surnameMin")
    .max(50, "surnameMax")
    .refine(singleLine, "singleLine"),
  email: z.email("email").max(254, "email"),
  subject: z
    .string()
    .trim()
    .min(3, "subjectMin")
    .max(150, "subjectMax")
    .refine(singleLine, "singleLine"),
  message: z.string().trim().min(10, "messageMin").max(5000, "messageMax"),
  // Honeypot: hidden from people, bots tend to fill it in.
  website: z.string().max(200).optional(),
});

export const subscribeSchema = z.object({
  email: z.email("email").max(254, "email"),
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type SubscribeInput = z.infer<typeof subscribeSchema>;
