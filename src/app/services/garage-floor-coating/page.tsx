import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Phone, ShieldCheck, Star, Timer } from "lucide-react";
import { PageFooter, PageHeader, ProcessSection, ReviewsSection, SectionHeading, TrustBand } from "@/components/epoxy-sections";
import { QuoteForm } from "@/components/quote-form";

export const metadata: Metadata = {
  title: "Garage Floor Coating in LA & Orange County | SoCal Floor Coatings",
  description:
    "Professional polyaspartic garage floor coatings installed in 1 day by licensed local installers. Diamond grinding prep, and hot-tire-pickup resistant finish. Serving Pasadena, Glendale, Burbank & more.",
  alternates: { canonical: "/services/garage-floor-coating" },
};

const features = [
  "Full-flake polyaspartic system — won't peel like epoxy",
  "Diamond grinding prep for maximum adhesion",
  "Hot-tire-pickup resistant topcoat",
  "UV-stable — no yellowing in sunlight",
  "Stain, oil, and chemical resistant",
  "Written adhesion warranty from your installer",
  "1-day install — drive on it the next day",
  "Crack and chip repair included",
];

export default function GarageFloorCoatingPage() {
  return (
    <div className="contractor-site min-h-screen bg-white text-gray-900">
      <PageHeader />

      {/* Breadcrumb */}
      <nav className="border-b border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-400 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <a href="/" className="hover:text-gray-900">Home</a>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Garage Floor Coating</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-start lg:px-8">
          <div>
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-xs font-bold text-gray-700">
                <Star className="h-4 w-4 text-[#f97316]" aria-hidden /> 4.9 Google Rating
              </span>
              <span className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-xs font-bold text-gray-700">
                <Timer className="h-4 w-4 text-[#f97316]" aria-hidden /> 1-Day Install
              </span>
              <span className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-xs font-bold text-gray-700">
                <ShieldCheck className="h-4 w-4 text-[#f97316]" aria-hidden /> Licensed Installers
              </span>
            </div>
            <p className="mb-4 text-sm font-black uppercase text-[#ea580c]">Residential garage floor coating</p>
            <h1 className="contractor-display text-5xl leading-[0.98] text-gray-900 sm:text-6xl">
              Polyaspartic Garage Floor Coating in LA &amp; Orange County
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Turn a stained, dusty garage slab into a clean, glossy floor that won&apos;t peel, yellow, or pick up hot tires.
              Installed in a single day with diamond grinding prep by a licensed local installer.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm leading-6 text-gray-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#f97316]" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="tel:+16262438727"
                className="inline-flex h-12 items-center gap-2 rounded-md border border-gray-300 bg-gray-100 px-5 text-sm font-black text-gray-900 transition hover:border-[#ea580c]/60 hover:text-[#ea580c]"
              >
                <Phone className="h-4 w-4" aria-hidden /> (626) 243-8727
              </a>
              <a
                href="#quote"
                className="inline-flex h-12 items-center gap-2 rounded-md bg-[#f97316] px-5 text-sm font-black text-white transition hover:bg-[#ea580c]"
              >
                Get Free Estimate <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>

          {/* Quote form */}
          <div id="quote" className="scroll-mt-24 rounded-lg border border-gray-200 bg-white p-5 shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
            <div className="mb-4 rounded-md border border-[#f97316]/[0.35] bg-[#f97316]/[0.12] p-4">
              <p className="text-sm font-black text-[#ea580c]">Free estimate + color consultation</p>
              <p className="mt-1 text-sm text-gray-600">Same-week estimates for garage floor projects.</p>
            </div>
            <QuoteForm idPrefix="garage-service" buttonLabel="Request My Free Estimate" defaultProjectType="Garage floor" />
          </div>
        </div>
      </section>

      <TrustBand />
      <ReviewsSection />
      <ProcessSection />

      {/* Pricing context */}
      <section className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Garage floor coating cost"
            title="Transparent pricing, no surprises."
            text="Residential garage floor coating in LA and Orange County typically runs $3–$10 per square foot depending on square footage, repairs needed, and the coating system. A 2-car garage usually lands between $2,500 and $5,500 all-in."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { label: "1-Car Garage", range: "$1,500 – $2,800", detail: "~200–250 sq ft, basic flake system" },
              { label: "2-Car Garage", range: "$2,500 – $4,500", detail: "~400–500 sq ft, full flake + topcoat" },
              { label: "3-Car Garage", range: "$4,000 – $7,000", detail: "~600–800 sq ft, premium polyaspartic" },
            ].map((tier) => (
              <div key={tier.label} className="rounded-lg border border-gray-200 bg-white p-6">
                <p className="text-sm font-black uppercase text-[#f97316]">{tier.label}</p>
                <p className="mt-3 text-3xl font-black text-gray-900">{tier.range}</p>
                <p className="mt-2 text-sm text-gray-400">{tier.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-400">
            Prices include diamond grinding, crack repair, flake broadcast, and polyaspartic topcoat.
            Exact pricing requires an on-site moisture test and measurement.{" "}
            <a href="#quote" className="font-black text-[#f97316] underline">Get a free estimate.</a>
          </p>
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-sm font-black uppercase text-[#f97316]">Other services</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { href: "/services/patio-coating", label: "Patio & Porch Coating" },
              { href: "/services/basement-floor-coating", label: "Basement Floor Coating" },
              { href: "/services/pool-deck-coating", label: "Pool Deck Coating" },
            ].map((link) => (
              <a key={link.href} href={link.href} className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-black transition hover:border-[#ea580c]/40">
                {link.label} <ArrowRight className="h-4 w-4 text-[#f97316]" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
