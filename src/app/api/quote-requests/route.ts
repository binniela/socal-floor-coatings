import { getIp, rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const ALLOWED_ORIGINS = [
  "https://www.epoxycoatingco.com",
  "https://epoxycoatingco.com",
  "http://localhost:3000",
  "http://localhost:3001",
];

const resend = new Resend(process.env.RESEND_API_KEY);

const quoteRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(254).optional(),
  zip: z.string().trim().min(5).max(12),
  projectType: z.string().trim().min(2).max(80),
  garageSize: z.string().trim().max(40).optional(),
  timeline: z.string().trim().max(40).optional(),
  formLocation: z.string().trim().max(40).optional(),
});

export async function POST(request: Request) {
  // Block requests from outside the site
  const origin = request.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  // Rate limit: 5 submissions per IP per 15 minutes
  const ip = getIp(request);
  if (!rateLimit(`quote:${ip}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests — please try again in a few minutes." },
      { status: 429 },
    );
  }

  const payload = await request.json().catch(() => null);
  const parsed = quoteRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the quote request fields." },
      { status: 400 },
    );
  }

  const lead = {
    ...parsed.data,
    receivedAt: new Date().toISOString(),
  };

  const toEmail = process.env.LEAD_EMAIL ?? "vincentlc0805@gmail.com";

  try {
    await resend.emails.send({
      from: "SoCal Floor Coatings <quotes@epoxycoatingco.com>",
      to: toEmail,
      subject: `New Quote Request — ${lead.projectType} (${lead.zip})`,
      html: `
        <h2 style="font-family:sans-serif;margin-bottom:16px">New Quote Request</h2>
        <table style="font-family:sans-serif;border-collapse:collapse;width:100%;max-width:480px">
          <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:bold;background:#f5f5f5">Name</td><td style="padding:8px 12px;border:1px solid #e0e0e0">${lead.name}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:bold;background:#f5f5f5">Phone</td><td style="padding:8px 12px;border:1px solid #e0e0e0">${lead.phone}</td></tr>
          ${lead.email ? `<tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:bold;background:#f5f5f5">Email</td><td style="padding:8px 12px;border:1px solid #e0e0e0">${lead.email}</td></tr>` : ""}
          <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:bold;background:#f5f5f5">ZIP</td><td style="padding:8px 12px;border:1px solid #e0e0e0">${lead.zip}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:bold;background:#f5f5f5">Project Type</td><td style="padding:8px 12px;border:1px solid #e0e0e0">${lead.projectType}</td></tr>
          ${lead.garageSize ? `<tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:bold;background:#f5f5f5">Garage Size</td><td style="padding:8px 12px;border:1px solid #e0e0e0">${lead.garageSize}</td></tr>` : ""}
          ${lead.timeline ? `<tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:bold;background:#f5f5f5">Timeline</td><td style="padding:8px 12px;border:1px solid #e0e0e0">${lead.timeline}</td></tr>` : ""}
          ${lead.formLocation ? `<tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:bold;background:#f5f5f5">Form</td><td style="padding:8px 12px;border:1px solid #e0e0e0">${lead.formLocation}</td></tr>` : ""}
          <tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-weight:bold;background:#f5f5f5">Received</td><td style="padding:8px 12px;border:1px solid #e0e0e0">${new Date(lead.receivedAt).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PT</td></tr>
        </table>
        <p style="font-family:sans-serif;margin-top:16px;color:#555">Reply to this email or call <strong>${lead.phone}</strong> to follow up.</p>
      `,
    });
  } catch (err) {
    console.error("Failed to send quote request email", err);
    return NextResponse.json({ ok: false, error: "Failed to send." }, { status: 500 });
  }

  console.info("Residential epoxy quote request", lead);
  return NextResponse.json({ ok: true });
}
