# Arojen Tarinat website

The official website of **Arojen Tarinat: Genghis Khan**, a turn-based strategy game made in Finland.

Live: https://www.arojentarinat.com

## Pages

| Path | Page |
|---|---|
| `/` | Home: hero, features, online play, realms, victory paths, screenshots, FAQ |
| `/about` | Story, facts, timeline, team, principles, the novel, the development journal and the source code |
| `/contact` | Contact topics and a message form (opens the visitor's email app) |
| `/privacy` | Privacy policy for the game and the website (English) |
| `/privacy-fi` | Tietosuojakäytäntö, Finnish version of the privacy policy |
| `/security` | Security policy (English) |
| `/security-fi` | Tietoturvakäytäntö, Finnish version of the security policy |
| `/privacy-{zh,hi,es,ar,fr,bn,pt,ru,ur,id,de,ja}` | Privacy policy translations (Chinese, Hindi, Spanish, Arabic, French, Bengali, Portuguese, Russian, Urdu, Indonesian, German, Japanese) |
| `/security-{zh,hi,es,ar,fr,bn,pt,ru,ur,id,de,ja}` | Security policy translations, same 12 languages |
| `/delete-account` | How to delete an account and its data (for Google Play's Data safety form) |
| any other path | Custom 404 page |

## How it is built

- Plain HTML, one stylesheet (`assets/css/site.css`) and one small script (`assets/js/site.js`). No framework, no build step.
- Fonts (Cinzel, Inter; SIL Open Font License) are self-hosted, so the site makes no requests to third parties and sets no cookies.
- Icons are SVG symbols in `assets/img/icons.svg`, used with `<svg><use href="/assets/img/icons.svg#name"/></svg>`.
- Images are WebP in two sizes (`-640` and `-1280`) with `srcset`.
- SEO: unique titles and descriptions, canonical URLs, Open Graph and Twitter cards, JSON-LD (VideoGame, MobileApplication, Organization, Book, FAQPage, BreadcrumbList), `sitemap.xml` and `robots.txt`.
- `vercel.json` turns on clean URLs (`/about` serves `about.html`), long caching for `/assets` and security headers.

## Deploy

Vercel deploys every push to `main`. Framework preset: **Other**, no build command, output directory: the repository root. The site answers on `www.arojentarinat.com`; the bare domain redirects there.

Game invite links and Android App Links use `dl.arojentarinat.com` (a Cloudflare Worker, not this site).

## Updating

- Version or numbers on the home page: `index.html`.
- Bump `?v=3` on `site.css` and `site.js` in every page after changing them, so browsers fetch the new files.
