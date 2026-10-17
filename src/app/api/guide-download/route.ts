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

const schema = z.object({
  email: z.string().trim().email().max(254),
});

export async function POST(request: Request) {
  // Block requests from outside the site
  const origin = request.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  // Stricter limit: 3 guide emails per IP per 15 minutes (prevents spam relay abuse)
  const ip = getIp(request);
  if (!rateLimit(`guide:${ip}`, 3, 15 * 60 * 1000)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests — please try again in a few minutes." },
      { status: 429 },
    );
  }

  const payload = await request.json().catch(() => null);
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
  }

  const { email } = parsed.data;
  const leadEmail = process.env.LEAD_EMAIL ?? "vincentlc0805@gmail.com";

  try {
    // Send guide to the homeowner
    await resend.emails.send({
      from: "SoCal Floor Coatings <quotes@epoxycoatingco.com>",
      to: email,
      subject: "Your Free Guide: Polyaspartic vs. Epoxy (2026 Edition)",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0d1117">
          <div style="background:#08090b;padding:32px 40px;border-radius:8px 8px 0 0">
            <p style="color:#2dd4bf;font-weight:800;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px">SoCal Floor Coatings</p>
            <h1 style="color:#ffffff;font-size:28px;font-weight:800;margin:0;line-height:1.2">Polyaspartic vs. Epoxy: The 2026 Garage Floor Coating Guide</h1>
          </div>

          <div style="background:#f8fafc;padding:32px 40px;border-radius:0 0 8px 8px;border:1px solid #e0e7ef;border-top:none">

            <p style="font-size:15px;line-height:1.7;color:#374151">Thanks for downloading. Here's everything you need to know before choosing a garage floor coating system in LA and Orange County.</p>

            <hr style="border:none;border-top:1px solid #e0e7ef;margin:24px 0"/>

            <h2 style="font-size:18px;font-weight:800;color:#0d1117;margin:0 0 12px">1. Epoxy vs. Polyaspartic vs. Polyurea — Plain-English Breakdown</h2>
            <p style="font-size:14px;line-height:1.7;color:#374151;margin:0 0 16px"><strong>Epoxy</strong> is the original residential garage coating — strong bond, widely available, affordable. The downside: standard epoxy yellows under UV, can peel under hot tires, and takes 3–5 days to fully cure.</p>
            <p style="font-size:14px;line-height:1.7;color:#374151;margin:0 0 16px"><strong>Polyaspartic</strong> is a faster-curing, UV-stable topcoat chemistry. Most premium residential systems use an epoxy or polyurea basecoat for bond strength, then a polyaspartic topcoat for surface durability. It won't yellow outdoors and cures in hours instead of days.</p>
            <p style="font-size:14px;line-height:1.7;color:#374151;margin:0 0 16px"><strong>Polyurea</strong> is similar to polyaspartic — both are high-performance, fast-cure coatings. Some contractors use the terms interchangeably. What matters more than the label is the specific product, prep quality, and installer training.</p>
            <p style="font-size:14px;line-height:1.7;color:#374151"><em>Why do contractors still use the word "epoxy" in ads if they install polyaspartic?</em> Because that's what homeowners search for. The smart approach: rank for "epoxy," deliver polyaspartic.</p>

            <hr style="border:none;border-top:1px solid #e0e7ef;margin:24px 0"/>

            <h2 style="font-size:18px;font-weight:800;color:#0d1117;margin:0 0 12px">2. Diamond Grinding: Why It Matters More Than the Coating Brand</h2>
            <p style="font-size:14px;line-height:1.7;color:#374151;margin:0 0 16px">Concrete is dense and sealed on the surface. A coating applied directly to unprepped concrete doesn't penetrate — it sits on top and eventually peels. Diamond grinding opens the concrete's pore structure so the coating has something to chemically and mechanically bond to.</p>
            <p style="font-size:14px;line-height:1.7;color:#374151">If a contractor quotes you without mentioning surface prep, that's a red flag. Ask specifically: "Do you diamond grind every floor, and is that included in the price?"</p>

            <hr style="border:none;border-top:1px solid #e0e7ef;margin:24px 0"/>

            <h2 style="font-size:18px;font-weight:800;color:#0d1117;margin:0 0 12px">3. Hot-Tire Pickup: What It Is and How to Prevent It</h2>
            <p style="font-size:14px;line-height:1.7;color:#374151;margin:0 0 16px">Hot-tire pickup happens when warm tires (after driving) bond to a floor coating that softens under heat. When you drive away, the coating comes with the tire. It's the most common complaint about DIY garage floor paints and low-quality coatings.</p>
            <p style="font-size:14px;line-height:1.7;color:#374151">Prevention: proper diamond grinding, a commercial-grade coating system (not a paint), and specifically a polyaspartic or polyurea topcoat. Ask whether the warranty explicitly covers hot-tire-pickup — if not, it's not a real warranty for a garage floor.</p>

            <hr style="border:none;border-top:1px solid #e0e7ef;margin:24px 0"/>

            <h2 style="font-size:18px;font-weight:800;color:#0d1117;margin:0 0 12px">4. How to Read a Warranty</h2>
            <p style="font-size:14px;line-height:1.7;color:#374151;margin:0 0 8px">A real warranty should specify:</p>
            <ul style="font-size:14px;line-height:1.7;color:#374151;margin:0 0 16px;padding-left:20px">
              <li>What it covers (adhesion failure, hot-tire-pickup, delamination)</li>
              <li>What it excludes (structural movement, misuse, commercial traffic on a residential-rated system)</li>
              <li>Who backs it (the installer, not just the coating manufacturer)</li>
              <li>How to make a claim</li>
            </ul>
            <p style="font-size:14px;line-height:1.7;color:#374151">If the warranty is verbal or just says "lifetime," ask for it in writing before any work begins.</p>

            <hr style="border:none;border-top:1px solid #e0e7ef;margin:24px 0"/>

            <h2 style="font-size:18px;font-weight:800;color:#0d1117;margin:0 0 12px">5. Pricing Ranges for LA & Orange County</h2>
            <p style="font-size:14px;line-height:1.7;color:#374151;margin:0 0 12px">Residential garage floor coating in Los Angeles and Orange County typically runs:</p>
            <table style="width:100%;border-collapse:collapse;font-size:13px;margin:0 0 16px">
              <tr style="background:#f0f4f8"><td style="padding:8px 12px;border:1px solid #e0e7ef;font-weight:700">1-Car Garage (~200 sq ft)</td><td style="padding:8px 12px;border:1px solid #e0e7ef">$1,500 – $2,800</td></tr>
              <tr><td style="padding:8px 12px;border:1px solid #e0e7ef;font-weight:700">2-Car Garage (~400–500 sq ft)</td><td style="padding:8px 12px;border:1px solid #e0e7ef">$2,500 – $4,500</td></tr>
              <tr style="background:#f0f4f8"><td style="padding:8px 12px;border:1px solid #e0e7ef;font-weight:700">3-Car Garage (~600–800 sq ft)</td><td style="padding:8px 12px;border:1px solid #e0e7ef">$4,000 – $7,000</td></tr>
            </table>
            <p style="font-size:14px;line-height:1.7;color:#374151">These ranges include diamond grinding, crack repair, flake broadcast, and polyaspartic topcoat. Prices vary based on concrete condition, number of repairs, and coating system. Get an on-site estimate — phone quotes are almost always inaccurate.</p>

            <hr style="border:none;border-top:1px solid #e0e7ef;margin:24px 0"/>

            <h2 style="font-size:18px;font-weight:800;color:#0d1117;margin:0 0 12px">6. Five Questions to Ask Every Contractor</h2>
            <ol style="font-size:14px;line-height:1.9;color:#374151;margin:0;padding-left:20px">
              <li><strong>Do you diamond grind every floor, and is that included?</strong></li>
              <li><strong>What coating system do you install — epoxy, polyurea, or polyaspartic?</strong></li>
              <li><strong>Does your warranty cover hot-tire-pickup, and can I get it in writing?</strong></li>
              <li><strong>Are your installers W-2 employees or subcontractors?</strong></li>
              <li><strong>Can I see project photos and contact references in my city?</strong></li>
            </ol>

            <hr style="border:none;border-top:1px solid #e0e7ef;margin:24px 0"/>

            <div style="background:#071316;border:1px solid rgba(45,212,191,0.3);border-radius:8px;padding:24px 28px">
              <p style="color:#99f6e4;font-weight:800;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px">Ready for your free estimate?</p>
              <p style="color:#ffffff;font-size:16px;font-weight:800;margin:0 0 8px">SoCal Floor Coatings — (626) 243-8727</p>
              <p style="color:rgba(255,255,255,0.65);font-size:14px;line-height:1.6;margin:0 0 16px">Family-owned crew serving LA &amp; Orange County. Free moisture test, color consultation, and written quote — no pressure.</p>
              <a href="https://apexgaragecoatings.com/#quote" style="display:inline-block;background:#2dd4bf;color:#08090b;font-weight:800;font-size:13px;padding:12px 24px;border-radius:6px;text-decoration:none">Get My Free Estimate →</a>
            </div>

          </div>
        </div>
      `,
    });

    // Notify the contractor
    await resend.emails.send({
      from: "SoCal Floor Coatings <quotes@epoxycoatingco.com>",
      to: leadEmail,
      subject: `Guide download — ${email}`,
      html: `<p style="font-family:sans-serif">New buyer's guide download from <strong>${email}</strong> at ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PT.</p>`,
    });
  } catch (err) {
    console.error("Guide email failed", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
