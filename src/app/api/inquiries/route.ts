import { z } from "zod";
import { route, HttpError, handleOptions } from "@/lib/http";
import { db } from "@/lib/db";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  phone: z.string().trim().regex(/^[+0-9\s-]{7,20}$/, "Enter a valid phone number"),
  subject: z.string().trim().min(3).max(150),
  message: z.string().trim().min(10).max(2000),
});

const recent = new Map<string, number>(); // best-effort throttle per server instance

export const OPTIONS = handleOptions;

export const POST = route(async (req) => {
  const raw = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!raw) throw new HttpError(400, "Invalid request.");
  if (raw.website) return { ok: true, message: "Thank you. Your inquiry has been received." }; // honeypot
  if (!Number(raw.t) || Date.now() - Number(raw.t) < 3000) throw new HttpError(400, "Please take a moment to complete the form.");
  const d = schema.parse(raw);
  const last = recent.get(d.email) ?? 0;
  if (Date.now() - last < 30000) throw new HttpError(429, "Please wait a moment before sending another message.");
  recent.set(d.email, Date.now());
  await db.inquiry.create({ data: d });
  return { ok: true, message: "Thank you. Your inquiry has been received." };
});
