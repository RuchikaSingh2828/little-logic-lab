import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  async redirects() {
    const difficulties = ["easy", "medium", "hard"] as const;
    const legacyNumberSizes = [3, 4, 5, 6] as const;
    const legacyShapeSizes = [3] as const;

    return [
      ...legacyNumberSizes.flatMap((size) =>
        difficulties.map((difficulty) => ({
          source: `/sudoku/number/${size}/${difficulty}`,
          destination: `/sudoku/number/7/${difficulty}`,
          permanent: true,
        }))
      ),
      ...legacyShapeSizes.flatMap((size) =>
        difficulties.map((difficulty) => ({
          source: `/sudoku/shape/${size}/${difficulty}`,
          destination: `/sudoku/shape/4/${difficulty}`,
          permanent: true,
        }))
      ),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
