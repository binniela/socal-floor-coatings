import { ClipboardCheck, Sparkles, Star, Wrench } from "lucide-react";

const reviews = [
  {
    name: "Maya R.",
    city: "Burbank",
    project: "Garage floor coating",
    text: "The quote was clear, the crew showed up on time, and the garage finally feels like part of the house. We had cars back in fast.",
  },
  {
    name: "Daniel K.",
    city: "Pasadena",
    project: "2-car garage floor",
    text: "They explained the prep work better than every other company we called. The diamond grinding and topcoat made a huge difference.",
  },
  {
    name: "Alicia M.",
    city: "Irvine",
    project: "Patio coating",
    text: "Short form, fast callback, no pressure. The final floor is tough, glossy, and ridiculously easy to clean.",
  },
  {
    name: "James T.",
    city: "Glendale",
    project: "3-car garage floor",
    text: "Done in one day, exactly as promised. The flake pattern looks incredible and holds up perfectly under our SUVs. Worth every penny.",
  },
  {
    name: "Sandra L.",
    city: "Torrance",
    project: "Basement gym floor",
    text: "We converted our basement to a home gym and needed something durable. The coating is seamless, easy to clean, and looks professional.",
  },
  {
    name: "Kevin P.",
    city: "Long Beach",
    project: "Patio & garage combo",
    text: "Got both the garage and back patio done at the same time. Great pricing, clean crew, and the results are better than I expected.",
  },
];

const process = [
  { icon: ClipboardCheck, title: "Free Estimate", text: "A local installer measures, moisture-checks, reviews colors, and sends a clear quote." },
  { icon: Wrench, title: "Prep & Install", text: "Diamond grinding, crack repair, basecoat, broadcast, scrape, and topcoat." },
  { icon: Sparkles, title: "Enjoy The Floor", text: "Easy to clean, stain resistant, UV stable, and ready for real home life." },
];

export function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false,
  inverted = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  dark?: boolean;
  inverted?: boolean;
}) {
  if (inverted) {
    return (
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-widest text-[#f97316]">{eyebrow}</p>
        <h2 className="contractor-display mt-4 text-4xl leading-tight text-white sm:text-5xl">{title}</h2>
        <p className="mt-5 text-base leading-7 text-gray-400">{text}</p>
      </div>
    );
  }
  return (
    <div className="max-w-3xl">
      <p className={dark ? "text-sm font-black uppercase tracking-widest text-[#ea580c]" : "text-sm font-black uppercase tracking-widest text-[#f97316]"}>
        {eyebrow}
      </p>
      <h2
        className={
          dark
            ? "contractor-display mt-4 text-4xl leading-tight text-[#0d1117] sm:text-5xl"
            : "contractor-display mt-4 text-4xl leading-tight text-gray-900 sm:text-5xl"
        }
      >
        {title}
      </h2>
      <p className={dark ? "mt-5 text-base leading-7 text-[#52606d]" : "mt-5 text-base leading-7 text-gray-500"}>
        {text}
      </p>
    </div>
  );
}

export function TrustBand() {
  return (
    <section className="bg-[#0d0d0d]" aria-label="Trust metrics">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {[
          ["500+", "Garage floors coated"],
          ["1-Day", "Install — most systems"],
          ["CSLB", "Licensed installers"],
          ["Free", "Written estimates"],
        ].map(([value, label]) => (
          <div key={label} className="py-8 text-center">
            <p className="text-3xl font-black text-[#f97316]">{value}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-gray-400">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="scroll-mt-24 border-y border-gray-100 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div>
            <a
              href="https://www.google.com/search?q=SoCal+Floor+Coatings+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-black uppercase tracking-widest text-[#f97316] hover:underline"
            >
              Google reviews ↗
            </a>
            <h2 className="contractor-display mt-4 text-4xl leading-tight sm:text-5xl">
              4.9 stars from homeowners who wanted it done right.
            </h2>
            <div className="mt-6 flex gap-1 text-[#ea580c]" aria-label="5 star rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-6 w-6 fill-current" aria-hidden />
              ))}
            </div>
            <p className="mt-5 text-base leading-7 text-gray-500">
              Neighbors call us for clean crews, fast communication, and floors that make the whole garage feel finished.
            </p>
            <a
              href="https://www.google.com/search?q=SoCal+Floor+Coatings+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-bold text-[#ea580c] hover:underline"
            >
              See all reviews on Google →
            </a>
            <p className="mt-3 text-sm font-bold text-gray-400">
              Licensed, insured installers • Serving LA and Orange County homes
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.name} className="border border-gray-200 bg-white p-5">
                <div className="mb-4 flex gap-1 text-[#ea580c]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-current" aria-hidden />
                  ))}
                </div>
                <p className="text-sm leading-6 text-gray-600">{review.text}</p>
                <p className="mt-5 text-sm font-black text-gray-900">{review.name}</p>
                <p className="text-xs font-semibold text-gray-400">
                  {review.city} homeowner • {review.project}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-24 bg-[#0d0d0d] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          inverted
          eyebrow="Simple 3-step process"
          title="From quote to finished floor without the guesswork."
          text="You know what happens, when your installer arrives, how they prep, and when you can use the space again."
        />
        <div className="mt-12 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-3">
          {process.map((step, index) => (
            <article
              key={step.title}
              className="relative bg-[#111111] p-8"
            >
              <span className="absolute right-6 top-6 text-5xl font-black text-white/[0.06]">0{index + 1}</span>
              <step.icon className="h-9 w-9 text-[#f97316]" aria-hidden />
              <h3 className="mt-8 text-2xl font-black text-white">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-gray-400">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PageHeader({ companyName = "SoCal Floor Coatings" }: { companyName?: string }) {
  return (
    <header className="border-b border-gray-200 bg-white/[0.95]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-3" aria-label={`${companyName} home`}>
          <img src="/logo.png" alt="SoCal Floor Coatings logo" className="h-10 w-10 rounded-md object-cover" />
          <span>
            <span className="contractor-logo block text-base leading-none">SOCAL FLOOR COATINGS</span>
            <span className="text-xs font-semibold uppercase text-gray-400 tracking-wide">Residential coatings</span>
          </span>
        </a>
        <a
          href="/#quote"
          className="hidden h-10 items-center gap-2 bg-[#f97316] px-4 text-sm font-black text-white transition hover:bg-[#ea580c] sm:flex"
        >
          Free Quote
        </a>
      </div>
    </header>
  );
}

export function PageFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-black text-gray-900">SoCal Floor Coatings</p>
            <p className="mt-1 text-xs text-gray-400">Serving Los Angeles &amp; Orange County homes</p>
          </div>
          <div className="flex flex-col gap-2 text-xs text-gray-400 sm:flex-row sm:gap-6">
            <a href="/" className="hover:text-gray-900">Home</a>
            <a href="/services/garage-floor-coating" className="hover:text-gray-900">Garage Floors</a>
            <a href="/services/patio-coating" className="hover:text-gray-900">Patio Coating</a>
            <a href="/services/basement-floor-coating" className="hover:text-gray-900">Basement Floors</a>
            <a href="/faq" className="hover:text-gray-900">FAQ</a>
            <a href="/privacy" className="hover:text-gray-900">Privacy</a>
          </div>
        </div>
        <p className="mt-8 border-t border-gray-100 pt-6 text-center text-xs leading-5 text-gray-400 sm:text-left">
          SoCal Floor Coatings is a referral service. We are not a contractor and do not perform installation work. Projects are completed by independent, CSLB-licensed contractors, who are solely responsible for their work, pricing, and warranties.
        </p>
      </div>
    </footer>
  );
}
