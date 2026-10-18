import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://epoxycoatingco.com";

const title = "SoCal Floor Coatings | Garage Floor Coating LA & Orange County";
const description =
  "Polyaspartic garage floor, patio, basement, and pool deck coatings installed in 1 day by licensed local installers. Diamond grinding prep. Serving Pasadena, Glendale, Irvine & all of SoCal.";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SoCal Floor Coatings",
  telephone: "+16262438727",
  url: siteUrl,
  areaServed: [
    "Pasadena", "Glendale", "Burbank", "Irvine", "Anaheim",
    "Long Beach", "Santa Monica", "Torrance", "Riverside", "Corona",
    "Ontario", "Pomona", "Van Nuys", "Arcadia", "Whittier",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "47",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Residential Epoxy & Polyaspartic Flooring Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Garage Floor Coating" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Patio Coating" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Basement Floor Coating" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pool Deck Coating" } },
    ],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "SoCal Floor Coatings",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SoCal Floor Coatings — Garage & Patio Floor Coating SoCal" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  verification: { google: "DIsVdjd06Z8L-qdLRZJKv79GBGB8Y5ab9Bo0gdrTLfY" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${montserrat.variable} ${inter.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
