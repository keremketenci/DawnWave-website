import "server-only";

import nodemailer, { type Transporter } from "nodemailer";
import { z } from "zod";

// Form submissions are sent through Gmail's SMTP server with a Google App Password
// (https://myaccount.google.com/apppasswords, requires 2-Step Verification).
const mailEnvSchema = z.object({
  // Gmail address that sends the emails.
  GMAIL_USER: z.email(),
  // 16-character App Password. Google shows it in groups of four; spaces are ignored.
  GMAIL_APP_PASSWORD: z
    .string()
    .transform((value) => value.replace(/\s+/g, ""))
    .pipe(z.string().length(16)),
  // Recipient of every form submission. Fixed on the server, never taken from the client.
  // Defaults to GMAIL_USER, i.e. the messages land in the same Gmail inbox.
  CONTACT_EMAIL: z.email().optional(),
});

type MailEnv = z.infer<typeof mailEnvSchema>;

let env: MailEnv | undefined;
let transporter: Transporter | undefined;

function getMailEnv(): MailEnv {
  if (env) return env;

  const result = mailEnvSchema.safeParse(process.env);
  if (!result.success) {
    const keys = result.error.issues.map((issue) => issue.path.join(".")).join(", ");
    throw new Error(`Mail is not configured. Missing or invalid env: ${keys}`);
  }

  env = result.data;
  return env;
}

function getTransporter(config: MailEnv) {
  transporter ??= nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.GMAIL_USER,
      pass: config.GMAIL_APP_PASSWORD,
    },
  });
  return transporter;
}

type SendMailOptions = {
  subject: string;
  text: string;
  html: string;
  replyTo?: { name?: string; address: string };
};

export async function sendMail({ subject, text, html, replyTo }: SendMailOptions) {
  const config = getMailEnv();

  return getTransporter(config).sendMail({
    // Gmail only sends as the authenticated account; the visitor goes into Reply-To,
    // so "Reply" in Gmail answers them directly.
    from: { name: "DawnWave Website", address: config.GMAIL_USER },
    to: config.CONTACT_EMAIL ?? config.GMAIL_USER,
    replyTo: replyTo ? { name: replyTo.name ?? "", address: replyTo.address } : undefined,
    subject,
    text,
    html,
  });
}
