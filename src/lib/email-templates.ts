import "server-only";

import { escapeHtml } from "@/lib/escape-html";
import type { ContactInput, SubscribeInput } from "@/lib/validation";

function toHtml(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

function rows(fields: [label: string, value: string][]) {
  return fields
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top" style="padding:4px 12px 4px 0">${escapeHtml(label)}</th><td style="padding:4px 0">${toHtml(value)}</td></tr>`,
    )
    .join("");
}

export function contactEmail({ name, surname, email, subject, message }: ContactInput) {
  const fullName = `${name} ${surname}`;
  const fields: [string, string][] = [
    ["Name", fullName],
    ["Email", email],
    ["Subject", subject],
    ["Message", message],
  ];

  return {
    // Prefixed so the messages are easy to filter or label in Gmail.
    subject: `[DawnWave İletişim] ${subject}`,
    replyTo: { name: fullName, address: email },
    text: fields.map(([label, value]) => `${label}: ${value}`).join("\n\n"),
    html: `<table>${rows(fields)}</table>`,
  };
}

export function subscribeEmail({ email }: SubscribeInput) {
  return {
    subject: `[DawnWave Bülten] Yeni abone: ${email}`,
    replyTo: { address: email },
    text: email,
    html: `<p>${escapeHtml(email)}</p>`,
  };
}
