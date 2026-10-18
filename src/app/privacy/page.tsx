import type { Metadata } from "next";
import { PageFooter, PageHeader } from "@/components/epoxy-sections";

export const metadata: Metadata = {
  title: "Privacy Policy | SoCal Floor Coatings",
  description: "How SoCal Floor Coatings collects, uses, and shares the information you submit in a quote request.",
};

const sections = [
  {
    heading: "Who we are",
    body: "SoCal Floor Coatings is a referral service that connects homeowners in Los Angeles and Orange County with independent, licensed floor coating contractors. We are not a contractor and do not perform installation work.",
  },
  {
    heading: "What we collect",
    body: "When you request a quote, we collect the details you enter: your name, phone number, email address, ZIP code, project type, garage size, timeline, and any photo you upload. We also collect basic technical data such as your IP address, which we use to prevent spam.",
  },
  {
    heading: "How we use it",
    body: "We use your information to understand your project, contact you about it, and match you with suitable local installers. If you upload a photo, we use it to generate a floor visualization and email it to you.",
  },
  {
    heading: "Who we share it with",
    body: "With your consent, we share your quote request with up to 3 independent, licensed installers who serve your area, so they can contact you with an estimate. Those installers handle your information under their own privacy practices. We also use service providers that host the site and send email on our behalf. We do not sell your information to data brokers.",
  },
  {
    heading: "Calls, texts, and emails",
    body: "By submitting a quote request with the consent box checked, you agree that we and the installers we share your request with may contact you by phone, text, or email about your project, including by automated means. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to any text to opt out, or contact us to withdraw consent.",
  },
  {
    heading: "Your California privacy rights",
    body: "California residents may request access to or deletion of the personal information we hold about them, and may opt out of further sharing. Call (626) 243-8727 to make a request. We will not discriminate against you for exercising these rights.",
  },
  {
    heading: "Retention",
    body: "We keep quote requests only as long as needed to connect you with installers and follow up on your project, then delete them.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="contractor-site min-h-screen bg-white text-gray-900">
      <PageHeader />

      <nav className="border-b border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-400 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <a href="/" className="hover:text-gray-900">Home</a>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Privacy</span>
        </div>
      </nav>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="contractor-display text-4xl text-gray-900 sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-gray-500">Last updated October 18, 2026</p>
          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-lg font-black text-gray-900">{section.heading}</h2>
                <p className="mt-2 text-base leading-7 text-gray-600">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
