import "server-only";

import type { z } from "zod";

import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function json(body: unknown, status: number, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/** Rejects cross-site browser submissions. Requests without an Origin header (curl etc.) pass. */
function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const allowedHosts = [
    new URL(siteConfig.url).host,
    request.headers.get("x-forwarded-host"),
    request.headers.get("host"),
  ];
  try {
    return allowedHosts.includes(new URL(origin).host);
  } catch {
    return false;
  }
}

type FormEndpointOptions<T extends { website?: string }> = {
  name: string;
  schema: z.ZodType<T>;
  onSubmit: (data: T) => Promise<unknown>;
};

/** Shared POST handler for the public form endpoints. */
export async function handleFormSubmission<T extends { website?: string }>(
  request: Request,
  { name, schema, onSubmit }: FormEndpointOptions<T>,
) {
  if (!isSameOrigin(request)) {
    return json({ message: "Forbidden" }, 403);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ message: "Unsupported media type" }, 415);
  }

  const limit = await rateLimit(
    `${name}:${getClientIp(request)}`,
    RATE_LIMIT,
    RATE_LIMIT_WINDOW_MS,
  );
  if (!limit.ok) {
    return json({ message: "Too many requests" }, 429, {
      "Retry-After": String(limit.retryAfter),
    });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ message: "Payload too large" }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ message: "Invalid JSON" }, 400);
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return json({ message: "Invalid input" }, 400);
  }

  // Honeypot filled in: pretend everything went fine.
  if (parsed.data.website) {
    return json({ ok: true }, 200);
  }

  try {
    await onSubmit(parsed.data);
    return json({ ok: true }, 200);
  } catch (error) {
    console.error(`[${name}] Unable to send email:`, error);
    return json({ message: "Unable to send email" }, 500);
  }
}
