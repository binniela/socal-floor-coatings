import type { MetadataRoute } from "next";

const siteUrl = "https://epoxycoatingco.com";

const cities = [
  "pasadena", "glendale", "burbank", "irvine", "anaheim",
  "long-beach", "santa-monica", "torrance", "riverside", "corona",
  "ontario", "pomona", "van-nuys", "arcadia", "whittier",
  "west-covina", "el-monte", "alhambra", "rancho-cucamonga",
  "chino-hills", "fullerton", "garden-grove", "huntington-beach",
  "newport-beach", "costa-mesa", "thousand-oaks",
];

const services = [
  "garage-floor-coating",
  "patio-coating",
  "basement-floor-coating",
  "pool-deck-coating",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const cityRoutes = cities.map((city) => ({
    url: `${siteUrl}/${city}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${siteUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...serviceRoutes,
    ...cityRoutes,
  ];
}
