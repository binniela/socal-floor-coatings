import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { PageFooter, PageHeader, ProcessSection, ReviewsSection, TrustBand } from "@/components/epoxy-sections";
import { QuoteForm } from "@/components/quote-form";

export const metadata: Metadata = {
  title: "Pool Deck Coating in LA & Orange County | SoCal Floor Coatings",
  description:
    "Slip-resistant, UV-stable polyaspartic pool deck coatings installed in 1 day. Stays cool underfoot, resists water and chemicals. Serving LA and Orange County homes.",
  alternates: { canonical: "/services/pool-deck-coating" },
};

const features = [
  "Slip-resistant texture rated for wet surfaces",
  "UV-stable — won't fade or blister in the sun",
  "Cool-to-touch finish in California heat",
  "Chemical and chlorine resistant",
  "Crack and surface repair included",
  "Written warranty from your installer",
  "Complements existing pool tile and coping",
  "Color and finish consultation included",
];

export default function PoolDeckCoatingPage() {
  return (
    <div className="contractor-site min-h-screen bg-white text-gray-900">
      <PageHeader />
      <nav className="border-b border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-400 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <a href="/" className="hover:text-gray-900">Home</a>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Pool Deck Coating</span>
        </div>
      </nav>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-start lg:px-8">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#ea580c]">Pool deck & outdoor concrete coating</p>
            <h1 className="contractor-display text-5xl leading-[0.98] text-gray-900 sm:text-6xl">
              Pool Deck Coating in LA &amp; Orange County
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Give your pool deck a slip-resistant, UV-stable coating that stays safe when wet, resists California sun, and holds up to pool chemicals — installed in a single day by a licensed local installer.
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
              <a href="tel:+16262438727" className="inline-flex h-12 items-center gap-2 rounded-md border border-gray-300 bg-gray-100 px-5 text-sm font-black text-gray-900 transition hover:border-[#ea580c]/60 hover:text-[#ea580c]">
                <Phone className="h-4 w-4" aria-hidden /> (626) 243-8727
              </a>
              <a href="#quote" className="inline-flex h-12 items-center gap-2 rounded-md bg-[#f97316] px-5 text-sm font-black text-white transition hover:bg-[#ea580c]">
                Get Free Estimate <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
          <div id="quote" className="scroll-mt-24 rounded-lg border border-gray-200 bg-white p-5 shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
            <div className="mb-4 rounded-md border border-[#f97316]/[0.35] bg-[#f97316]/[0.12] p-4">
              <p className="text-sm font-black text-[#ea580c]">Free estimate + color consultation</p>
              <p className="mt-1 text-sm text-gray-600">Same-week estimates for pool deck projects.</p>
            </div>
            <QuoteForm idPrefix="pool-service" buttonLabel="Request My Free Estimate" defaultProjectType="Patio or porch" />
          </div>
        </div>
      </section>

      <TrustBand />
      <ReviewsSection />
      <ProcessSection />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-sm font-black uppercase text-[#f97316]">Other services</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { href: "/services/garage-floor-coating", label: "Garage Floor Coating" },
              { href: "/services/patio-coating", label: "Patio & Porch Coating" },
              { href: "/services/basement-floor-coating", label: "Basement Floor Coating" },
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
