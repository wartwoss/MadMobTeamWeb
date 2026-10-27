import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {key: 'X-Content-Type-Options', value: 'nosniff'},
          {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
          {key: 'X-DNS-Prefetch-Control', value: 'on'},
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      /* Metadata routes: safe to cache hard — they only change on deploy.
         Keeps repeat visits and crawlers off the origin. */
      {
        source: '/sitemap.xml',
        headers: [
          {key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400'},
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400'},
        ],
      },
      {
        source: '/manifest.webmanifest',
        headers: [
          {key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400'},
        ],
      },
      {
        source: '/icon.svg',
        headers: [
          {key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800'},
        ],
      },
      {
        source: '/opengraph-image',
        headers: [
          {key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800'},
        ],
      },
      {
        source: '/twitter-image',
        headers: [
          {key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800'},
        ],
      },
      {
        source: '/apple-icon',
        headers: [
          {key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800'},
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
