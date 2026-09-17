# oTTeGames

A simple game marketplace — storefront, catalog, game pages, cart, and library.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## SEO

Page metadata, sitemaps, social images, and structured data follow the [SEO Next.js Starter](https://vercel.com/templates/next.js/seo-starter) pattern.

Copy `.env.example` to `.env.local` for local overrides. `NEXT_PUBLIC_URL` must be an HTTP(S) origin without a path. Local and Preview deployments stay `noindex`; production indexes unless `NEXT_PUBLIC_INDEXABLE=false`.

After the app is running:

```bash
npm run test:seo
```

Inspect `/sitemap.xml`, `/robots.txt`, and `/api/og?title=oTTeGames`.
