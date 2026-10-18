import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { PageFooter, PageHeader, ProcessSection, ReviewsSection, TrustBand } from "@/components/epoxy-sections";
import { QuoteForm } from "@/components/quote-form";

const cities: Record<string, { name: string; county: string; blurb: string }> = {
  pasadena: {
    name: "Pasadena",
    county: "Los Angeles County",
    blurb:
      "Pasadena homeowners trust SoCal Floor Coatings for polyaspartic garage floor, patio, and basement coatings. We serve single-family homes, craftsman bungalows, and modern builds throughout Pasadena, Altadena, and the surrounding neighborhoods.",
  },
  glendale: {
    name: "Glendale",
    county: "Los Angeles County",
    blurb:
      "We connect homeowners with licensed installers of polyaspartic garage and patio floor coatings throughout Glendale, CA. From Montrose to Adams Hill to the Verdugo Woodlands, local pros deliver 1-day installs for Glendale homeowners.",
  },
  burbank: {
    name: "Burbank",
    county: "Los Angeles County",
    blurb:
      "SoCal Floor Coatings serves Burbank homeowners with polyaspartic garage floor, patio, and utility room coatings. Same-week estimates from licensed local installers for properties throughout Burbank and North Hollywood.",
  },
  irvine: {
    name: "Irvine",
    county: "Orange County",
    blurb:
      "Irvine homeowners and HOA-approved properties rely on SoCal Floor Coatings for clean, durable polyaspartic garage and patio floor coatings. We serve Irvine, Tustin, Lake Forest, and the wider Orange County area.",
  },
  anaheim: {
    name: "Anaheim",
    county: "Orange County",
    blurb:
      "SoCal Floor Coatings connects you with licensed installers of polyaspartic garage, patio, and pool deck coatings for Anaheim homeowners. Fast same-week estimates from licensed local installers for properties throughout Anaheim Hills and surrounding areas.",
  },
  "long-beach": {
    name: "Long Beach",
    county: "Los Angeles County",
    blurb:
      "We connect homeowners with licensed installers of polyaspartic garage and patio floor coatings for Long Beach homeowners in Bixby Knolls, Belmont Shore, and beyond. Moisture-aware prep handles the coastal climate — handled by licensed local installers.",
  },
  "santa-monica": {
    name: "Santa Monica",
    county: "Los Angeles County",
    blurb:
      "SoCal Floor Coatings serves Santa Monica with UV-stable, moisture-resistant polyaspartic garage and patio floor coatings. Coastal humidity is no problem — installers moisture-test every slab before coating.",
  },
  torrance: {
    name: "Torrance",
    county: "Los Angeles County",
    blurb:
      "Torrance homeowners choose SoCal Floor Coatings for polyaspartic garage floor, patio, and home gym coatings. We serve Old Torrance, Southwood, and the South Bay with 1-day installs by licensed local pros.",
  },
  riverside: {
    name: "Riverside",
    county: "Riverside County",
    blurb:
      "SoCal Floor Coatings connects you with licensed installers of polyaspartic garage floor, patio, and pool deck coatings throughout Riverside, CA. Same-week scheduling, diamond grinding prep, and licensed installers for Riverside homeowners.",
  },
  corona: {
    name: "Corona",
    county: "Riverside County",
    blurb:
      "Corona homeowners choose SoCal Floor Coatings for durable polyaspartic garage and patio floor coatings. We serve properties throughout Corona, Norco, and the Inland Empire with 1-day installs by licensed local pros.",
  },
  ontario: {
    name: "Ontario",
    county: "San Bernardino County",
    blurb:
      "SoCal Floor Coatings serves Ontario, CA with polyaspartic garage floor, basement, and patio coatings. Inland Empire homeowners get same-week scheduling, full diamond grinding prep, and licensed installers.",
  },
  pomona: {
    name: "Pomona",
    county: "Los Angeles County",
    blurb:
      "We connect homeowners with licensed installers of polyaspartic garage and patio floor coatings for Pomona homeowners. Serving the Pomona Valley with 1-day installs, diamond grinding prep, and licensed local installers.",
  },
  "van-nuys": {
    name: "Van Nuys",
    county: "Los Angeles County",
    blurb:
      "SoCal Floor Coatings serves Van Nuys and the San Fernando Valley with polyaspartic garage floor and patio coatings. Same-week estimates from licensed local installers for Valley homeowners.",
  },
  arcadia: {
    name: "Arcadia",
    county: "Los Angeles County",
    blurb:
      "Arcadia homeowners trust SoCal Floor Coatings for premium polyaspartic garage and patio floor coatings. We serve Arcadia, Monrovia, and the San Gabriel Valley foothills with 1-day installs.",
  },
  whittier: {
    name: "Whittier",
    county: "Los Angeles County",
    blurb:
      "SoCal Floor Coatings connects you with licensed installers of polyaspartic garage floor and patio coatings for Whittier homeowners. Serving East LA County with same-week scheduling, diamond grinding prep, and licensed local installers.",
  },
  "west-covina": {
    name: "West Covina",
    county: "Los Angeles County",
    blurb:
      "West Covina homeowners choose SoCal Floor Coatings for polyaspartic garage floor, patio, and basement coatings. Serving the San Gabriel Valley with 1-day installs by licensed local pros.",
  },
  "el-monte": {
    name: "El Monte",
    county: "Los Angeles County",
    blurb:
      "SoCal Floor Coatings serves El Monte with durable polyaspartic garage floor and patio coatings. Same-week scheduling and diamond grinding prep for El Monte and South El Monte homeowners.",
  },
  alhambra: {
    name: "Alhambra",
    county: "Los Angeles County",
    blurb:
      "SoCal Floor Coatings connects you with licensed installers of polyaspartic garage floor and patio coatings for Alhambra homeowners. Serving the western San Gabriel Valley with 1-day installs by licensed local pros.",
  },
  "rancho-cucamonga": {
    name: "Rancho Cucamonga",
    county: "San Bernardino County",
    blurb:
      "Rancho Cucamonga homeowners trust SoCal Floor Coatings for polyaspartic garage floor, patio, and pool deck coatings. Inland Empire installs completed in 1 day by licensed local pros.",
  },
  "chino-hills": {
    name: "Chino Hills",
    county: "San Bernardino County",
    blurb:
      "SoCal Floor Coatings serves Chino Hills with premium polyaspartic garage floor and patio coatings. Serving Chino Hills and the Pomona Valley with 1-day installs by licensed local pros.",
  },
  fullerton: {
    name: "Fullerton",
    county: "Orange County",
    blurb:
      "Fullerton homeowners choose SoCal Floor Coatings for polyaspartic garage floor, patio, and pool deck coatings. Serving North Orange County with same-week estimates from licensed local installers.",
  },
  "garden-grove": {
    name: "Garden Grove",
    county: "Orange County",
    blurb:
      "SoCal Floor Coatings connects you with licensed installers of polyaspartic garage and patio floor coatings for Garden Grove homeowners. Serving central Orange County with 1-day installs, diamond grinding prep, and licensed local installers.",
  },
  "huntington-beach": {
    name: "Huntington Beach",
    county: "Orange County",
    blurb:
      "SoCal Floor Coatings serves Huntington Beach with UV-stable, moisture-resistant polyaspartic garage floor and patio coatings. Coastal prep included — installers moisture-test every slab before coating.",
  },
  "newport-beach": {
    name: "Newport Beach",
    county: "Orange County",
    blurb:
      "Newport Beach homeowners trust SoCal Floor Coatings for premium polyaspartic garage floor, patio, and pool deck coatings. Coastal-grade moisture prep from licensed local installers.",
  },
  "costa-mesa": {
    name: "Costa Mesa",
    county: "Orange County",
    blurb:
      "SoCal Floor Coatings serves Costa Mesa with polyaspartic garage floor and patio coatings. Moisture-tested, UV-stable coatings with 1-day installs by licensed local pros for Orange County homeowners.",
  },
  "thousand-oaks": {
    name: "Thousand Oaks",
    county: "Ventura County",
    blurb:
      "SoCal Floor Coatings connects you with licensed installers of polyaspartic garage floor, patio, and pool deck coatings for Thousand Oaks homeowners. Serving the Conejo Valley with same-week estimates from licensed local installers.",
  },
};

export function generateStaticParams() {
  return Object.keys(cities).map((city) => ({ city }));
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const city = cities[params.city];
  if (!city) return {};
  return {
    title: `Garage Floor Coating in ${city.name}, CA | SoCal Floor Coatings`,
    description: `Polyaspartic garage floor coatings installed in 1 day in ${city.name}, ${city.county}. Licensed local installers, diamond grinding prep, and hot-tire-pickup resistant finish. Call (626) 243-8727.`,
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = cities[params.city];
  if (!city) notFound();

  return (
    <div className="contractor-site min-h-screen bg-white text-gray-900">
      <PageHeader />

      {/* Breadcrumb */}
      <nav className="border-b border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-400 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <a href="/" className="hover:text-gray-900">Home</a>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Garage Floor Coating in {city.name}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-start lg:px-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-[#ea580c]">
              <MapPin className="h-4 w-4" aria-hidden />
              {city.name}, {city.county}
            </div>
            <h1 className="contractor-display text-5xl leading-[0.98] text-gray-900 sm:text-6xl">
              Garage Floor Coating in {city.name}, CA
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">{city.blurb}</p>
            <p className="mt-5 text-sm font-bold text-gray-500">
              Polyaspartic system • 1-day install • Licensed installers • Diamond grinding prep
            </p>
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
              <p className="text-sm font-black text-[#ea580c]">Free estimate for {city.name} homeowners</p>
              <p className="mt-1 text-sm text-gray-600">Same-week site visits available in {city.name} and nearby areas.</p>
            </div>
            <QuoteForm idPrefix={`city-${params.city}`} buttonLabel="Request My Free Estimate" />
          </div>
        </div>
      </section>

      <TrustBand />
      <ReviewsSection />
      <ProcessSection />

      {/* Service links */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-sm font-black uppercase text-[#f97316]">Our services in {city.name}</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/services/garage-floor-coating", label: "Garage Floor Coating" },
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
