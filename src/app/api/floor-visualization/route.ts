import { getIp, rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Resend } from "resend";
import { z } from "zod";

// Ask Vercel for up to 60s — works on Pro, capped at 10s on Hobby
export const maxDuration = 60;

const ALLOWED_ORIGINS = [
  "https://www.epoxycoatingco.com",
  "https://epoxycoatingco.com",
  "http://localhost:3000",
  "http://localhost:3001",
];

const STYLES: Record<string, { label: string; prompt: string }> = {
  "light-gray-flake": {
    label: "Light Gray Flake",
    prompt:
      "light silver-gray polyaspartic epoxy floor coating with scattered decorative vinyl color flake chips in light gray and white tones, high-gloss professional finish with realistic light reflections",
  },
  "charcoal-flake": {
    label: "Charcoal Flake",
    prompt:
      "dark charcoal polyaspartic epoxy floor coating with scattered decorative vinyl color flake chips in dark gray and black tones, high-gloss professional finish with realistic light reflections",
  },
  "mocha-flake": {
    label: "Mocha Tan Flake",
    prompt:
      "warm mocha and tan polyaspartic epoxy floor coating with scattered decorative vinyl color flake chips in tan, brown, and beige tones, satin professional finish with realistic light reflections",
  },
  "white-marble": {
    label: "White Marble",
    prompt:
      "clean white polyaspartic epoxy floor coating with subtle light gray marble-style veining and scattered white decorative chips, ultra high-gloss premium finish with realistic light reflections",
  },
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ ok: false, error: "Visualization service not configured." }, { status: 503 });
  }
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  // Block outside-domain requests
  const origin = request.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  // Rate limit: 2 visualization requests per IP per hour
  const ip = getIp(request);
  if (!rateLimit(`viz:${ip}`, 2, 60 * 60 * 1000)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests — please try again later." },
      { status: 429 },
    );
  }

  // Parse multipart form data
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const imageFile = formData.get("image") as File | null;
  const rawEmail = formData.get("email") as string | null;
  const rawStyle = formData.get("style") as string | null;

  // Validate email
  const emailResult = z.string().trim().email().max(254).safeParse(rawEmail);
  if (!emailResult.success) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }

  // Validate image
  if (!imageFile || imageFile.size === 0) {
    return NextResponse.json({ ok: false, error: "Please upload a photo." }, { status: 400 });
  }
  if (imageFile.size > 4 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: "Photo must be under 4 MB." }, { status: 400 });
  }
  if (!imageFile.type.startsWith("image/")) {
    return NextResponse.json({ ok: false, error: "Please upload an image file." }, { status: 400 });
  }

  // Resolve style
  const style = STYLES[rawStyle ?? ""] ? rawStyle! : "charcoal-flake";
  const { label: styleLabel, prompt: stylePrompt } = STYLES[style];
  const email = emailResult.data;
  const leadEmail = process.env.LEAD_EMAIL ?? "vincentlc0805@gmail.com";

  // Convert uploaded file → File object for OpenAI
  const arrayBuffer = await imageFile.arrayBuffer();
  const imageBytes = new Uint8Array(arrayBuffer);
  // OpenAI requires PNG for the edit endpoint — we pass as-is and label it png;
  // for JPEG inputs the API still accepts them via gpt-image-1
  const imageForOpenAI = new File([imageBytes], "space.png", { type: "image/png" });

  // Generate floor visualization
  let b64Image: string;
  try {
    const response = await openai.images.edit({
      model: "gpt-image-1",
      image: imageForOpenAI,
      prompt: `This is a photo of a residential space. Replace ONLY the floor with a premium ${stylePrompt}. The floor must look completely photorealistic — correct perspective, lighting, shadows, and reflections that match the existing room lighting. Do not change anything else: walls, ceiling, car, furniture, doors, windows, objects, and every other element must remain exactly as they appear in the original photo.`,
      n: 1,
      size: "1024x1024",
    });
    const imageData = response.data?.[0]?.b64_json;
    if (!imageData) throw new Error("No image returned from OpenAI");
    b64Image = imageData;
  } catch (err) {
    console.error("[floor-visualization] OpenAI error:", err);
    return NextResponse.json(
      { ok: false, error: "Visualization generation failed — please try again." },
      { status: 500 },
    );
  }

  // Schedule the mockup email to arrive ~30 min from now (looks hand-crafted)
  const deliverAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

  try {
    // Mockup email to the homeowner — scheduled
    await resend.emails.send({
      from: "SoCal Floor Coatings <quotes@epoxycoatingco.com>",
      to: email,
      subject: "Your Custom Floor Visualization — SoCal Floor Coatings",
      scheduledAt: deliverAt,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111827">
          <div style="background:#0d0d0d;padding:32px 40px">
            <p style="color:#f97316;font-weight:800;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 10px">SoCal Floor Coatings</p>
            <h1 style="color:#ffffff;font-size:26px;font-weight:800;margin:0;line-height:1.2">Your Custom Floor Visualization</h1>
          </div>
          <div style="padding:32px 40px;border:1px solid #e5e7eb;border-top:none">
            <p style="font-size:15px;line-height:1.7;color:#374151;margin:0 0 20px">
              We took a look at your space and put together a visualization showing what it could look like with our <strong>${styleLabel}</strong> polyaspartic floor system. The attached image shows your space transformed with a professional 1-day install.
            </p>
            <p style="font-size:14px;line-height:1.7;color:#374151;margin:0 0 24px">
              <strong>What you're seeing:</strong> Premium polyaspartic topcoat over a diamond-ground concrete base. UV-stable, hot-tire-pickup resistant, and backed by our lifetime warranty.
            </p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;padding:20px 24px;margin:0 0 24px">
              <p style="font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;margin:0 0 4px">Your visualization is attached</p>
              <p style="font-size:14px;color:#374151;margin:0">Open the attached PNG to see your space with the ${styleLabel} system.</p>
            </div>
            <p style="font-size:14px;line-height:1.7;color:#374151;margin:0 0 24px">
              Like what you see? We offer free on-site estimates with a moisture check and full color consultation — usually available the same week, no pressure.
            </p>
            <a href="https://www.epoxycoatingco.com/#quote" style="display:inline-block;background:#f97316;color:#ffffff;font-weight:800;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;padding:14px 28px;text-decoration:none">
              Book My Free Estimate →
            </a>
            <p style="margin-top:32px;padding-top:24px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;line-height:1.6">
              SoCal Floor Coatings — Family-owned · Licensed &amp; insured · Serving LA &amp; Orange County
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `floor-visualization-${style}.png`,
          content: b64Image,
        },
      ],
    });

    // Immediate contractor notification
    await resend.emails.send({
      from: "SoCal Floor Coatings <quotes@epoxycoatingco.com>",
      to: leadEmail,
      subject: `Floor visualization request — ${email}`,
      html: `
        <p style="font-family:sans-serif">
          New floor visualization from <strong>${email}</strong>.<br/>
          Style: <strong>${styleLabel}</strong><br/>
          Mockup email scheduled for ~30 min from now.<br/><br/>
          Follow up with them after the visualization lands.
        </p>
      `,
    });
  } catch (err) {
    console.error("[floor-visualization] Resend error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send — please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
