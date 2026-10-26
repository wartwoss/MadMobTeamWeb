# SEO implementation & launch checklist

## Implemented

- Localized metadata for every route (title, description, keywords, canonical).
- `hreflang` alternates + `x-default` for `en`, `ar`, `ckb`.
- Open Graph and Twitter cards with a generated 1200×630 image.
- Generated `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, Apple icon.
- JSON-LD: `ProfessionalService`, `WebSite`, `AboutPage`, `CollectionPage`,
  `ContactPage`, `BreadcrumbList`, and `FAQPage`.
- Semantic headings/landmarks, skip link, labelled navigation, real `<a>`
  links for the social cards, and `<address>` for contact details.
- No-JS fallback so loaders/reveal animations never hide the content from
  crawlers.
- Lazy-loaded below-the-fold sections and decorative client-only chrome.
- Optional GA4, Google Search Console and Bing verification via env.
- Phone and email in the footer; full NAP lives in structured data.
- Brand spelling standardized to **MadMobTeam**.

## Required before publishing

The production origin is configured as `https://madmobteam.com` in
`app/lib/site.ts` (confirmed live). `NEXT_PUBLIC_SITE_URL` overrides it if the
domain ever changes:

```bash
NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
```

Canonical URLs, sitemap entries, `hreflang`, OG URLs and JSON-LD all read from
that one value.

Optional:

```bash
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...
NEXT_PUBLIC_BING_SITE_VERIFICATION=...
NEXT_PUBLIC_GA_ID=G-...
```

## After deploy

1. Open `/robots.txt` and `/sitemap.xml`; confirm the production domain.
2. Submit the sitemap in Google Search Console and Bing Webmaster Tools.
3. Run the home page through the Rich Results Test / Schema Markup Validator.
4. Run PageSpeed Insights on `/en`, `/en/about`, `/en/projects`, `/en/contact`.
5. Check that `/en/does-not-exist` returns a 404 and has `noindex`.
6. Test an Arabic and a Kurdish URL for correct `lang`, `dir`, canonical and
   `hreflang`.

## Content priorities for the next phase

Technical SEO is in place. The remaining ranking upside is content:

- Dedicated service pages (web development, mobile apps, custom software).
- Individual case-study URLs for each project instead of one interactive page.
- Replace the demo social feed with real posts or keep it `data-nosnippet`
  (already marked) so it is not used for snippets.
- A local landing page for "web development in Sulaymaniyah" with real
  project photos, testimonials and a map.
- A blog or resource section targeting long-tail questions.
