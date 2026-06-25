# Abbasi Industries — Official Website

Marketing website for **Abbasi Logue Estates, LLC, doing business as Abbasi Industries** — a vertically integrated real estate, hospitality, and technology operating company headquartered in Salt Lake City, Utah.

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, exported as a fully static site and deployed on **Vercel**.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Structure

```
src/app/         routes: / (home), /contact, /privacy, /terms, + robots/sitemap/og/icon
src/components/  bespoke UI (Hero, Services, Spotlight, Technology, Markets, Leadership, …)
src/data/        site.ts (business identity), services.ts, markets.ts, team.ts
public/images/   AI-generated section imagery (swap-ready)
public/team/     leadership headshots
scripts/         gen-images.mjs — regenerates imagery via OpenAI gpt-image-1
```

## Editing content

Almost everything is data-driven — edit the files in `src/data/`:

- **Business identity** (name, address, email, phone, domain): `src/data/site.ts`
- **Services / technology / process**: `src/data/services.ts`
- **Markets / focus areas**: `src/data/markets.ts`
- **Leadership**: `src/data/team.ts`

### Leadership photos

Real headshots live at `public/team/taha.jpg` and `public/team/nichell.jpg`,
wired up via the `photo` field in `src/data/team.ts`. To swap a photo, replace the
file (4:5 portrait works best). Clearing `photo` falls back to an elegant monogram.

### Regenerating imagery

`scripts/gen-images.mjs` generates the section imagery with OpenAI `gpt-image-1`.
It reads `OPENAI_API_KEY` from the environment (or a local `.env`). To replace any
image with a real property photo, just drop a JPEG at the matching path in
`public/images/` — the components read paths from `src/data/`.

## Custom domain

The canonical URL is set in `src/data/site.ts` (`site.url`). After attaching the
domain in **Vercel → Settings → Domains**, confirm `site.url` matches the apex,
then redeploy so `metadata`, `sitemap.xml`, `robots.txt`, and the JSON-LD all
reference the live domain.

## Notes

- `Privacy Policy` and `Terms of Service` are reasonable boilerplate — recommend a
  legal review before relying on them.
- The site is fully static (`output: 'export'`); there is no backend.
