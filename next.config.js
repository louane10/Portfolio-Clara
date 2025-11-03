const isProd = process.env.NODE_ENV === 'production';
const isPreview = process.env.VERCEL_ENV === 'preview';

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: csp,
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    // Coupe tout par défaut (caméra, micro, géoloc…). Ouvre au cas par cas si nécessaire.
    value: 'accelerometer=(), camera=(), microphone=(), geolocation=(), gyroscope=(), magnetometer=(), usb=()',
  },
];
module.exports = {
  reactStrictMode: true, async headers() {
    return [
      {
        // Tous les chemins
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};