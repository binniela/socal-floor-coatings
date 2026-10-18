import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageFooter, PageHeader, SectionHeading } from "@/components/epoxy-sections";

export const metadata: Metadata = {
  title: "Epoxy & Polyaspartic Garage Floor Coating FAQ | SoCal Floor Coatings",
  description:
    "Answers to common questions about epoxy vs polyaspartic, cost, hot tire pickup, warranties, and 1-day installation for residential garage floors in LA and Orange County.",
};

const faqs = [
  {
    question: "Is polyaspartic better than epoxy for a garage floor?",
    answer:
      "Polyaspartic topcoats cure faster, resist UV yellowing, and offer superior abrasion resistance compared to standard epoxy. Most premium residential systems use a basecoat (often epoxy or polyurea) plus a polyaspartic topcoat for the best combination of bond strength and surface durability. Polyaspartic won't yellow in sunlight the way a standard epoxy can, and it's far more resistant to hot-tire-pickup.",
  },
  {
    question: "What is hot tire pickup and how do I prevent it?",
    answer:
      "Hot tire pickup happens when warm tires — after driving — bond to a floor coating that softens under heat, then pull the coating off when you drive away. It's most common with low-quality paint, thin coatings, and floors that weren't properly prepped. Diamond grinding before coating, combined with a commercial-grade polyaspartic topcoat, significantly reduces the risk. Ask your installer whether their system is rated hot-tire-pickup resistant, and get the warranty in writing.",
  },
  {
    question: "How long does a polyaspartic garage floor installation take?",
    answer:
      "Most residential garage floors are completed in a single day. The crew arrives in the morning, diamond-grinds the slab, repairs cracks and chips, applies the basecoat, broadcasts the flake, scrapes back the excess, and applies the topcoat. You can walk on it the next morning and drive on it within the cure window specified on your project sheet — typically 24–48 hours for vehicles.",
  },
  {
    question: "How long does an epoxy or polyaspartic garage floor last?",
    answer:
      "A properly prepped polyaspartic garage system can last 15–25+ years with normal residential use. The two biggest factors in longevity are surface preparation (diamond grinding opens the concrete profile so the coating bonds deeply) and topcoat quality. Ask your installer for a written warranty that covers adhesion and hot-tire-pickup failure.",
  },
  {
    question: "How much does a garage floor coating cost in LA or Orange County?",
    answer:
      "Residential garage floor coating in Los Angeles and Orange County typically runs $3–$10 per square foot depending on square footage, existing concrete condition, number of repairs needed, and the coating system selected. A 1-car garage usually runs $1,500–$2,800; a 2-car garage typically lands at $2,500–$4,500; a 3-car can run $4,000–$7,000 or more. The fastest way to get an accurate number is a free on-site estimate — we measure, moisture-test, and give you a written quote.",
  },
  {
    question: "Do you offer financing?",
    answer:
      "Often, yes. Many of the installers we work with offer monthly payment plans for garage floors, patios, basements, and multi-area projects. Terms are set by the installer — ask about financing during your free estimate.",
  },
  {
    question: "What should a floor coating warranty cover?",
    answer:
      "A good residential warranty covers adhesion failure and hot-tire-pickup failure under normal residential use, and it should be in writing before any work begins. Typical exclusions are commercial use, vehicle fluid spills left for long periods, and structural concrete movement. Warranties are issued by the installer — ask for the full document during your estimate.",
  },
  {
    question: "Can you coat a patio, basement, or pool deck in addition to a garage?",
    answer:
      "Yes. The installers we work with apply polyaspartic coatings on patios, porches, basements, home gyms, laundry rooms, utility rooms, and pool decks. Each surface type has specific prep requirements — patios need UV-stable topcoats, pool decks require slip-resistant texture, and basements need moisture testing. Your installer assesses each surface at the estimate and recommend the right system for the use case.",
  },
  {
    question: "What is diamond grinding and why does it matter?",
    answer:
      "Diamond grinding uses industrial diamond-tipped discs to abrade the surface of the concrete and open its pore structure. This creates a mechanical profile that the coating chemically bonds into — think of it as roughing up a surface before gluing. Without proper grinding, even premium coatings can delaminate. It's the single most important step in the installation process, and it's included in every project.",
  },
  {
    question: "Do I need to move everything out of the garage?",
    answer:
      "Yes. The garage should be cleared of all vehicles, boxes, shelving, and other items before the crew arrives. Installers need full access to the concrete slab. If there are wall-mounted shelving units or cabinets with legs, those should be moved or their footprints noted in advance so the crew can work around anchor holes.",
  },
  {
    question: "How do I maintain a polyaspartic garage floor?",
    answer:
      "Polyaspartic floors are low-maintenance. Regular sweeping and occasional mopping with a pH-neutral cleaner are all that's typically needed. Avoid prolonged contact with harsh chemicals like paint stripper or brake fluid — clean spills promptly. For outdoor surfaces, a periodic rinse-down is sufficient. Don't use abrasive scrubbers that can dull the finish over time.",
  },
  {
    question: "How do I get a free estimate?",
    answer:
      "Fill out the short quote form on our homepage or call (626) 243-8727. We'll match you with a licensed local installer for a same-week on-site visit. They measure the space, moisture-test the concrete, walk through color and finish options, and send a written quote. No pressure, no obligation.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="contractor-site min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHeader />

      <nav className="border-b border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-400 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <a href="/" className="hover:text-gray-900">Home</a>
          <span className="mx-2">›</span>
          <span className="text-gray-700">FAQ</span>
        </div>
      </nav>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="Everything you need to know before the estimate."
            text="Answers about polyaspartic vs epoxy, cost, hot tire pickup, warranty, 1-day installs, and what to expect from your garage floor project."
          />

          <div className="mt-12 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-gray-50">
            {faqs.map((item) => (
              <details key={item.question} className="group p-5 open:bg-gray-50">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black">
                  {item.question}
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#f97316] transition group-open:rotate-90" aria-hidden />
                </summary>
                <p className="mt-4 text-sm leading-7 text-gray-600">{item.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-[#f97316]/30 bg-orange-50 p-8 text-center">
            <p className="text-sm font-black uppercase text-[#ea580c]">Still have questions?</p>
            <h2 className="contractor-display mt-4 text-3xl text-gray-900">
              Talk to us — free, no pressure.
            </h2>
            <p className="mt-4 text-base text-gray-600">
              Call (626) 243-8727 or request a free estimate and a licensed local installer will walk through your project, surface condition, and coating options in person.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="tel:+16262438727"
                className="inline-flex h-12 items-center gap-2 rounded-md border border-gray-300 px-5 text-sm font-black text-gray-900 transition hover:border-[#ea580c]/60 hover:text-[#ea580c]"
              >
                Call (626) 243-8727
              </a>
              <a
                href="/#quote"
                className="inline-flex h-12 items-center gap-2 rounded-md bg-[#f97316] px-5 text-sm font-black text-white transition hover:bg-[#ea580c]"
              >
                Get Free Estimate <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
