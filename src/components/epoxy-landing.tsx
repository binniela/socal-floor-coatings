"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BadgeDollarSign,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  CreditCard,
  Gem,
  Hammer,
  Home,
  MapPin,
  Menu,
  Paintbrush,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { QuoteForm } from "@/components/quote-form";
import { PageFooter, ProcessSection, ReviewsSection, SectionHeading, TrustBand } from "@/components/epoxy-sections";

const companyName = "SoCal Floor Coatings";
const navLinks = [
  { href: "#gallery", label: "Gallery" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

const images = {
  hero: "/images/garage-after.jpg",
  garageBefore: "/images/garage-before.jpg",
  garageAfter: "/images/garage-after.jpg",
  patioBefore: "/images/patio-before.jpg",
  patioAfter: "/images/patio-after.jpg",
  basementBefore: "/images/basement-before.jpg",
  basementAfter: "/images/basement-after.jpg",
  serviceGarage: "/images/service-garage.jpg",
  servicePatio: "/images/service-patio.jpg",
  serviceBasement: "/images/service-basement.jpg",
  serviceLaundry: "/images/service-laundry.jpg",
};

const trustStats = [
  { icon: Star, label: "4.9 Google Rating", detail: "Local homeowners" },
  { icon: Timer, label: "1-Day Installs", detail: "Most garage systems" },
  { icon: ShieldCheck, label: "Licensed Installers", detail: "CSLB license checked" },
  { icon: BadgeCheck, label: "Polyaspartic System", detail: "Won't peel like epoxy" },
];

const services = [
  {
    icon: Home,
    title: "Residential Garage Floors",
    href: "/services/garage-floor-coating",
    image: images.serviceGarage,
    items: ["Flake epoxy systems", "Polyaspartic topcoat", "Hot tire pickup resistant"],
  },
  {
    icon: Sparkles,
    title: "Patios, Porches & Walkways",
    href: "/services/patio-coating",
    image: images.servicePatio,
    items: ["UV-stable coatings", "Slip-resistant texture", "Outdoor concrete protection"],
  },
  {
    icon: Paintbrush,
    title: "Basement & Home Gym Floors",
    href: "/services/basement-floor-coating",
    image: images.serviceBasement,
    items: ["Moisture-aware prep", "Easy-clean surfaces", "Comfortable home upgrades"],
  },
  {
    icon: Wrench,
    title: "Laundry & Utility Rooms",
    href: "/services/basement-floor-coating",
    image: images.serviceLaundry,
    items: ["Stain-resistant finish", "Crack repair", "Durable everyday protection"],
  },
];

const reasons = [
  { icon: Gem, title: "Polyaspartic — not epoxy", text: "UV-stable, won't yellow or peel. Hot-tire-pickup resistant. Cures in hours, not days." },
  { icon: Hammer, title: "Diamond grinding prep", text: "Installers we work with open the concrete profile before coating so the system bonds correctly." },
  { icon: Zap, title: "Same-week scheduling", text: "Fast site visits and tight installation windows for ready projects." },
  { icon: BadgeDollarSign, title: "Ask about financing", text: "Many installers offer monthly payment plans for garage, patio, and basement projects." },
  { icon: Wrench, title: "Crack repair included", text: "Chips, cracks, and surface defects are treated before basecoat." },
  { icon: ShieldCheck, title: "Warranty in writing", text: "We favor installers who put adhesion and hot-tire-pickup coverage in writing before work starts." },
];

const projects = [
  {
    title: "2-Car Garage Refresh",
    location: "Pasadena, CA",
    caption: "Concrete repair, full flake broadcast, and UV-stable polyaspartic topcoat.",
    before: images.garageBefore,
    after: images.garageAfter,
  },
  {
    title: "Covered Patio Upgrade",
    location: "Glendale, CA",
    caption: "Slip-resistant residential coating for a cleaner outdoor living space.",
    before: images.patioBefore,
    after: images.patioAfter,
  },
  {
    title: "Home Gym Basement Floor",
    location: "Long Beach, CA",
    caption: "Low-maintenance finish for workouts, storage, laundry, and family use.",
    before: images.basementBefore,
    after: images.basementAfter,
  },
];

const faqs = [
  {
    question: "How long does an epoxy garage floor last?",
    answer: "A properly prepped epoxy or polyaspartic garage system can last 10 to 20+ years depending on use, moisture, and maintenance.",
  },
  {
    question: "How soon can I drive on it?",
    answer: "Most 1-day polyaspartic systems are ready for foot traffic the next day and vehicle traffic after the recommended cure window.",
  },
  {
    question: "Is polyaspartic better than epoxy?",
    answer: "Polyaspartic topcoats cure quickly, resist UV yellowing, and add abrasion resistance. Many premium floors use epoxy basecoat plus polyaspartic topcoat.",
  },
  {
    question: "What causes hot tire pickup?",
    answer: "Weak prep, thin coatings, or low-grade paint can soften under hot tires. Diamond grinding and professional coating systems help prevent it.",
  },
  {
    question: "How much does epoxy flooring cost?",
    answer: "Most 1-car garages run $800–$1,400. A standard 2-car garage is typically $1,800–$2,800. Three-car and larger spaces range from $2,800–$4,500+. Price depends on concrete condition, repairs needed, and coating system. We send a written quote after a free on-site estimate — no surprise charges.",
  },
];

const serviceAreas = [
  { name: "Pasadena", slug: "/pasadena" },
  { name: "Glendale", slug: "/glendale" },
  { name: "Burbank", slug: "/burbank" },
  { name: "Irvine", slug: "/irvine" },
  { name: "Anaheim", slug: "/anaheim" },
  { name: "Long Beach", slug: "/long-beach" },
  { name: "Santa Monica", slug: "/santa-monica" },
  { name: "Torrance", slug: "/torrance" },
];

export function EpoxyLanding() {
  return (
    <main className="contractor-site min-h-screen bg-white text-gray-900">
      <SiteHeader />
      <HeroSection />
      <TrustBand />
      <BeforeAfterGallery />
      <VisualizationSection />
      <ServicesSection />
      <WhyChooseUs />
      <ReviewsSection />
      <ProcessSection />
      <FinancingSection />
      <OfferSection />
      <ServiceAreasSection />
      <BuyerGuideSection />
      <FaqSection />
      <ContactSection />
      {/* Bottom padding keeps the footer clear of the fixed mobile CTA bar */}
      <div className="pb-20 sm:pb-0">
        <PageFooter />
      </div>
      <MobileCtaBar />
    </main>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/[0.97] backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label={`${companyName} home`}>
          <img src="/logo.png" alt="SoCal Floor Coatings logo" className="h-11 w-11 rounded-md object-cover shadow-[0_0_32px_rgba(249,115,22,0.35)]" />
          <span>
            <span className="contractor-logo block text-lg leading-none">SOCAL FLOOR COATINGS</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Residential coatings</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-semibold uppercase tracking-wide text-gray-500 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-gray-900">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#quote"
            className="hidden h-11 items-center gap-2 bg-[#f97316] px-5 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#ea580c] sm:flex"
          >
            Get Free Quote
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <button
            aria-expanded={menuOpen}
            className="grid h-11 w-11 place-items-center border border-gray-200 text-gray-900 lg:hidden"
            aria-label="Open navigation"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div className="border-t border-gray-200 bg-white px-4 py-4 shadow-[0_22px_60px_rgba(0,0,0,0.12)] lg:hidden">
          <nav className="grid gap-2" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="border border-gray-200 px-4 py-3 text-sm font-black uppercase tracking-wide text-gray-900"
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3">
            <a className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#f97316] text-sm font-black uppercase tracking-wide text-white" href="#quote" onClick={() => setMenuOpen(false)}>
              Get Free Quote
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="top"
      className="relative isolate scroll-mt-24 overflow-hidden pt-20"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(8,8,8,0.93) 0%, rgba(8,8,8,0.82) 45%, rgba(8,8,8,0.25) 100%), url(${images.hero})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-4 pb-6 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
        <div className="max-w-4xl py-4">
          <div className="mb-5 flex flex-wrap gap-2">
            <Badge icon={Star}>4.9 Google rating</Badge>
            <Badge icon={ShieldCheck}>Licensed, insured installers</Badge>
            <Badge icon={Clock3}>Local LA & OC pros</Badge>
          </div>
          <p className="mb-3 text-sm font-black uppercase tracking-widest text-[#f97316]">Garage floor coating specialists</p>
          <h1 className="contractor-display max-w-4xl text-5xl leading-[0.98] text-white sm:text-6xl">
            Polyaspartic Garage Floor Coatings — Installed In 1 Day
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-300">
            Won&apos;t peel like epoxy. UV-stable. We match you with licensed, insured local installers who use diamond-ground prep and a premium polyaspartic system — a finish built for real home life in LA & Orange County.
          </p>
          <p className="mt-3 text-sm font-bold uppercase tracking-wide text-gray-500">
            500+ local garage floors coated • LA & Orange County
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#quote"
              className="inline-flex h-12 items-center justify-center gap-2 bg-[#f97316] px-7 text-sm font-black uppercase tracking-wide text-white shadow-[0_20px_50px_rgba(249,115,22,0.4)] transition hover:bg-[#ea580c]"
            >
              Get Free Quote
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#gallery"
              className="inline-flex h-12 items-center justify-center gap-2 border border-white/20 px-7 text-sm font-black uppercase tracking-wide text-white transition hover:border-white/50"
            >
              See Our Work
            </a>
          </div>
        </div>

        {/* Form card — white on dark background = premium showroom effect */}
        <div id="quote" className="scroll-mt-24 border border-white/10 bg-white p-5 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
          <div className="mb-5 border border-[#f97316]/30 bg-[#f97316]/[0.08] p-4">
            <p className="text-sm font-black uppercase tracking-wide text-[#ea580c]">Same-week written estimate — free</p>
            <p className="mt-1 text-sm leading-6 text-gray-600">We come to you, measure the space, show color samples, and send a clear quote. No pressure.</p>
          </div>
          <QuoteForm idPrefix="hero" buttonLabel="Request My Free Estimate" />
        </div>
      </div>
    </section>
  );
}

function Badge({ icon: Icon, children }: { icon: typeof Star; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border border-white/15 bg-black/40 px-3 py-2 text-xs font-bold uppercase tracking-wide text-gray-300 backdrop-blur">
      <Icon className="h-3.5 w-3.5 text-[#f97316]" aria-hidden />
      {children}
    </span>
  );
}

function BeforeAfterGallery() {
  return (
    <section id="gallery" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Before & after gallery"
          title="See what your concrete could become."
          text="Garage, patio, and basement transformations help you picture the finish, texture, and color that fits your home."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ComparisonCard key={project.title} project={project} initialValue={index === 0 ? 64 : index === 1 ? 58 : 52} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonCard({
  project,
  initialValue,
}: {
  project: { title: string; location: string; caption: string; before: string; after: string };
  initialValue: number;
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <article className="overflow-hidden border border-gray-200 bg-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#171a1f]">
        <Image
          src={project.before}
          alt={`${project.title} before coating`}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${value}%` }}>
          <div className="relative h-full" style={{ width: `${10000 / value}%` }}>
            <Image
              src={project.after}
              alt={`${project.title} after coating`}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          </div>
        </div>
        <div className="absolute inset-y-0" style={{ left: `${value}%` }}>
          <div className="h-full w-1 -translate-x-1/2 bg-[#f97316] shadow-[0_0_24px_rgba(249,115,22,0.85)]" />
        </div>
        <span className="absolute left-3 top-3 bg-white/[0.9] px-3 py-1 text-xs font-black uppercase tracking-wide">After</span>
        <span className="absolute right-3 top-3 bg-white/[0.9] px-3 py-1 text-xs font-black uppercase tracking-wide">Before</span>
        <input
          aria-label={`Reveal before and after for ${project.title}`}
          className="absolute inset-x-4 bottom-4 accent-[#f97316]"
          max="82"
          min="24"
          onChange={(event) => setValue(Number(event.target.value))}
          type="range"
          value={value}
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#ea580c]">
          <MapPin className="h-4 w-4" aria-hidden />
          {project.location}
        </div>
        <h3 className="mt-3 text-xl font-black text-gray-900">{project.title}</h3>
        <p className="mt-2 text-sm leading-6 text-gray-500">{project.caption}</p>
      </div>
    </article>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 bg-[#111111] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          inverted
          eyebrow="Our services"
          title="Built for garages, patios, basements, home gyms, and utility rooms."
          text="Choose a residential coating system that fits how your family actually uses the space."
        />
        <div className="mt-10 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <a key={service.title} href={service.href} className="group overflow-hidden bg-[#111111] transition hover:bg-[#1a1a1a]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={service.image} alt={service.title} className="object-cover brightness-75 transition group-hover:brightness-90 group-hover:scale-[1.03]" fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" />
              </div>
              <div className="p-5">
                <service.icon className="h-7 w-7 text-[#f97316]" aria-hidden />
                <h3 className="mt-4 text-lg font-black text-white">{service.title}</h3>
                <ul className="mt-4 space-y-3 text-sm font-semibold text-gray-400">
                  {service.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#f97316]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex items-center gap-1 text-xs font-black uppercase tracking-wide text-[#f97316]">
                  Learn more <ArrowRight className="h-3 w-3" aria-hidden />
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="bg-[#0d0d0d] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <SectionHeading
              inverted
              eyebrow="Why choose us"
              title="Every trust signal homeowners want before work starts."
              text="We vet installers so your project is clear, clean, and in writing before work starts at your home."
            />
            <a
              href="#contact"
              className="mt-8 inline-flex h-12 items-center gap-2 bg-[#f97316] px-6 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#ea580c]"
            >
              Schedule Estimate
              <CalendarCheck className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason.title} className="bg-[#111111] p-5">
                <reason.icon className="h-7 w-7 text-[#f97316]" aria-hidden />
                <h3 className="mt-4 text-lg font-black text-white">{reason.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OfferSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden border border-[#f97316]/20 bg-[#0d0d0d] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-7 sm:p-10">
            <p className="text-sm font-black uppercase tracking-widest text-[#f97316]">This month for homeowners</p>
            <h2 className="contractor-display mt-4 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">Free Estimate + Flake Color Consultation</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400">
              Request an estimate and a vetted local installer will check your concrete, review color blends, and map out the right coating system for your space.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#quote"
                className="inline-flex h-12 items-center justify-center gap-2 bg-[#f97316] px-6 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#ea580c]"
              >
                Claim Offer
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
          <div className="min-h-[300px] bg-cover bg-center brightness-75" style={{ backgroundImage: `url(${images.garageAfter})` }} aria-label="Finished epoxy garage floor" />
        </div>
      </div>
    </section>
  );
}

function ServiceAreasSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <SectionHeading
            eyebrow="Neighborhood service areas"
            title="Residential epoxy flooring near you."
            text="We help homeowners across Los Angeles and Orange County upgrade garages, patios, basements, and concrete utility spaces."
          />
          <div className="grid grid-cols-2 gap-px border border-gray-200 bg-gray-200 sm:grid-cols-4">
            {serviceAreas.map((area) => (
              <a
                key={area.slug}
                href={area.slug}
                className="flex min-h-24 flex-col justify-between bg-white p-4 transition hover:bg-orange-50"
              >
                <MapPin className="h-5 w-5 text-[#ea580c]" aria-hidden />
                <span className="text-sm font-black">{area.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BuyerGuideSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/guide-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden border border-gray-200 bg-white lg:grid-cols-[1.2fr_0.8fr]">
          <div className="p-7 sm:p-10">
            <div className="mb-5 inline-flex items-center gap-2 border border-[#f97316]/30 bg-[#f97316]/[0.08] px-3 py-2 text-xs font-black uppercase tracking-wide text-[#ea580c]">
              <BookOpen className="h-4 w-4" aria-hidden />
              Free buyer&apos;s guide
            </div>
            <h2 className="contractor-display text-4xl leading-tight text-gray-900 sm:text-5xl">
              Polyaspartic vs. Epoxy: The 2026 Garage Floor Coating Guide
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600">
              What every LA &amp; Orange County homeowner should know before choosing a coating system — including why most contractors install polyaspartic but still rank for &ldquo;epoxy,&rdquo; what hot-tire-pickup actually means, and how to read a warranty.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-gray-500">
              {[
                "Epoxy vs. polyaspartic vs. polyurea — plain-English breakdown",
                "Diamond grinding: why it matters more than the coating brand",
                "How to evaluate a warranty (and what to watch out for)",
                "Pricing ranges for LA & OC and how to get an accurate quote",
                "5 questions to ask every contractor before signing",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#f97316]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center border-t border-gray-200 p-7 sm:p-10 lg:border-l lg:border-t-0">
            {status === "success" ? (
              <div>
                <p className="text-lg font-black text-gray-900">Check your inbox.</p>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  The guide is on its way to {email}. If you don&apos;t see it within a few minutes, check your spam folder.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <p className="text-lg font-black text-gray-900">Get the free guide</p>
                <p className="text-sm text-gray-500">Enter your email and we&apos;ll send it instantly. No spam.</p>
                <label className="grid gap-2">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">Email address</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-12 border border-gray-200 bg-gray-100 px-4 text-sm font-semibold text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#f97316]"
                  />
                </label>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex h-12 items-center justify-center gap-2 bg-[#f97316] text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#ea580c] disabled:cursor-wait disabled:opacity-70"
                >
                  {status === "sending" ? "Sending…" : "Send Me the Guide"}
                  <BookOpen className="h-4 w-4" aria-hidden />
                </button>
                {status === "error" && (
                  <p className="text-xs font-bold text-[#fda29b]">Something went wrong — please try again.</p>
                )}
                <p className="text-xs text-gray-400">No spam. Unsubscribe any time.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-[#111111] py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          inverted
          eyebrow="FAQ"
          title="Answers that remove friction before the call."
          text="Straight answers about durability, timing, cost, hot tire pickup, and what to expect at your home."
        />
        <div className="mt-10 divide-y divide-white/10 border border-white/10">
          {faqs.map((item) => (
            <details key={item.question} className="group p-5 open:bg-[#1a1a1a]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-white">
                {item.question}
                <ArrowRight className="h-5 w-5 shrink-0 text-[#f97316] transition group-open:rotate-90" aria-hidden />
              </summary>
              <p className="mt-4 text-sm leading-7 text-gray-400">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-[#0d0d0d] py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-[#f97316]">Get your free estimate instantly</p>
          <h2 className="contractor-display mt-4 text-4xl leading-tight text-white sm:text-5xl">Ready to transform your garage?</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-gray-400">
            Tell us which residential space you want coated and we will follow up with estimate options, timing, and color guidance.
          </p>
          <p className="mt-4 text-sm font-black uppercase tracking-wide text-[#f97316]">
            500+ local garage floors coated • LA + OC homes
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <ContactTile icon={MapPin} label="Service area" value="LA + OC homes" href="#contact" />
            <ContactTile icon={Clock3} label="Response time" value="Same business day" href="#quote" />
            <ContactTile icon={Phone} label="Prefer to call?" value="(626) 243-8727" href="tel:+16262438727" />
          </div>
        </div>
        {/* White form card pops against the dark section */}
        <div className="border border-white/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.4)]">
          <QuoteForm idPrefix="contact" buttonLabel="Send My Quote Request" light />
        </div>
      </div>
    </section>
  );
}

function ContactTile({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a href={href} className="border border-white/10 bg-[#1a1a1a] p-5 transition hover:border-[#f97316]/40">
      <Icon className="h-6 w-6 text-[#f97316]" aria-hidden />
      <p className="mt-4 text-xs font-black uppercase tracking-widest text-gray-500">{label}</p>
      <p className="mt-1 text-base font-black text-white">{value}</p>
    </a>
  );
}

function FinancingSection() {
  return (
    <section className="bg-[#111111] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden border border-white/10 bg-[#1a1a1a] lg:grid-cols-[1fr_auto]">
          <div className="p-7 sm:p-10">
            <p className="text-sm font-black uppercase tracking-widest text-[#f97316]">Flexible payment options</p>
            <h2 className="contractor-display mt-4 text-4xl leading-tight text-white sm:text-5xl">
              Financing Options
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400">
              Many of the installers we work with offer monthly payment plans for garage, patio, and basement floors — ask during your free estimate.
            </p>
            <a
              href="#quote"
              className="mt-7 inline-flex h-12 items-center gap-2 bg-[#f97316] px-6 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#ea580c]"
            >
              Get Your Free Estimate
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 border-t border-white/10 p-7 sm:p-10 lg:border-l lg:border-t-0">
            <CreditCard className="h-12 w-12 text-[#f97316]" aria-hidden />
            <p className="text-center text-sm font-black text-white">
              Low monthly<br />payments
            </p>
            <p className="text-center text-xs leading-5 text-gray-500">
              Terms set by<br />your installer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const vizStyles = [
  { value: "light-gray-flake", label: "Light Gray Flake", color: "#c4c4c4", dark: false },
  { value: "charcoal-flake", label: "Charcoal Flake", color: "#3a3a3a", dark: true },
  { value: "mocha-flake", label: "Mocha Tan Flake", color: "#9b7a5a", dark: true },
  { value: "white-marble", label: "White Marble", color: "#f0ece8", dark: false },
];

function VisualizationSection() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [style, setStyle] = useState("charcoal-flake");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 4 * 1024 * 1024) {
      setErrorMsg("Photo must be under 4 MB.");
      return;
    }
    setErrorMsg("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!image) { setErrorMsg("Please upload a photo of your space."); return; }
    setStatus("sending");
    setErrorMsg("");
    const fd = new FormData();
    fd.append("image", image);
    fd.append("email", email);
    fd.append("style", style);
    try {
      const res = await fetch("/api/floor-visualization", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "failed");
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong — please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-widest text-[#f97316]">On it</p>
          <h2 className="contractor-display mt-4 text-4xl leading-tight text-gray-900 sm:text-5xl">
            Visualization incoming.
          </h2>
          <p className="mt-5 text-base leading-7 text-gray-500">
            Check your inbox at <strong>{email}</strong> in about an hour. We&apos;re putting the finishing touches on your custom floor visualization and will send it over shortly.
          </p>
          <p className="mt-4 text-sm font-bold text-gray-400">
            Didn&apos;t get it? Check your spam folder or{" "}
            <a href="#quote" className="text-[#f97316] underline">request a free estimate directly</a>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">

          {/* Left — copy */}
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-[#f97316]">Free floor visualizer</p>
            <h2 className="contractor-display mt-4 text-4xl leading-tight text-gray-900 sm:text-5xl">
              See your floor before we start.
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-500">
              Upload a photo of your garage, patio, or basement. Our team will send you a custom visualization showing exactly what your space could look like with a finished polyaspartic floor — within the hour.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Free — no credit card, no obligation",
                "Personalized to your actual space",
                "Delivered to your inbox within the hour",
                "Choose your color system below",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#f97316]" />
                  {point}
                </li>
              ))}
            </ul>

            {/* Style picker */}
            <div className="mt-8">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400">Choose a color system</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {vizStyles.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setStyle(s.value)}
                    className={`border p-3 text-left transition ${
                      style === s.value
                        ? "border-[#f97316] bg-orange-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <span
                      className="block h-6 w-full border border-black/10"
                      style={{ background: s.color }}
                    />
                    <span className="mt-2 block text-xs font-black leading-tight text-gray-700">
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — upload form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Drop zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              className={`relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center border-2 border-dashed transition ${
                dragging
                  ? "border-[#f97316] bg-orange-50"
                  : preview
                  ? "border-gray-300 bg-gray-50"
                  : "border-gray-300 bg-gray-50 hover:border-[#f97316]/60 hover:bg-orange-50/30"
              }`}
            >
              {preview ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="Your space" className="h-full w-full object-cover" style={{ maxHeight: 280 }} />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition hover:opacity-100">
                    <p className="text-sm font-black text-white">Click to change photo</p>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center">
                  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center border border-gray-200 bg-white">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-black text-gray-700">Drop your photo here</p>
                  <p className="mt-1 text-xs text-gray-400">or click to browse — JPG, PNG under 4 MB</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
            </div>

            {/* Email */}
            <label className="grid gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-gray-500">Your email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12 border border-gray-200 bg-gray-50 px-4 text-sm font-semibold text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#f97316]"
              />
            </label>

            {errorMsg && (
              <p className="text-xs font-bold text-red-500">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex h-12 items-center justify-center gap-2 bg-[#f97316] text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#ea580c] disabled:cursor-wait disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <span className="animate-spin">⟳</span>
                  Generating your visualization…
                </>
              ) : (
                <>
                  Send My Custom Visualization
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </>
              )}
            </button>

            <p className="text-xs text-gray-400">
              We&apos;ll send your visualization within the hour. No spam — just your floor preview.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0d0d0d]/[0.97] p-3 backdrop-blur sm:hidden">
      <a className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#f97316] text-sm font-black uppercase tracking-wide text-white" href="#quote">
        <Send className="h-4 w-4" aria-hidden />
        Get Free Quote
      </a>
    </div>
  );
}
