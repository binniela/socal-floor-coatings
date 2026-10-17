/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent your site from being embedded in iframes on other domains (clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // Stop browsers from guessing file types (MIME sniffing attacks)
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Only send the origin (no full URL) as the Referer header to third parties
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Disable camera, mic, and geolocation access — this site doesn't need them
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Tell browsers to always use HTTPS for the next 1 year
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
    ];
  },
};

export default nextConfig;
