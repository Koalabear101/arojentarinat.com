# Arojen Tarinat website

The official website of **Arojen Tarinat: Genghis Khan**, a turn-based strategy game made in Finland.

Live: https://arojentarinat.vercel.app

## Pages

| Path | Page |
|---|---|
| `/` | Home: hero, features, online play, realms, victory paths, screenshots, FAQ |
| `/about` | Story, facts, timeline, team and principles |
| `/contact` | Contact topics and a message form (opens the visitor's email app) |
| `/privacy` | Privacy policy for the game and the website |
| `/delete-account` | How to delete an account and its data (for Google Play's Data safety form) |
| any other path | Custom 404 page |

## How it is built

- Plain HTML, one stylesheet (`assets/css/site.css`) and one small script (`assets/js/site.js`). No framework, no build step.
- Fonts (Cinzel, Inter; SIL Open Font License) are self-hosted, so the site makes no requests to third parties and sets no cookies.
- Icons are SVG symbols in `assets/img/icons.svg`, used with `<svg><use href="/assets/img/icons.svg#name"/></svg>`.
- Images are WebP in two sizes (`-640` and `-1280`) with `srcset`.
- SEO: unique titles and descriptions, canonical URLs, Open Graph and Twitter cards, JSON-LD (VideoGame, MobileApplication, Organization, FAQPage, BreadcrumbList), `sitemap.xml` and `robots.txt`.
- `vercel.json` turns on clean URLs (`/about` serves `about.html`), long caching for `/assets` and security headers.

## Deploy

Vercel deploys every push to `main`. Framework preset: **Other**, no build command, output directory: the repository root.

When the site moves to its own domain, replace `https://arojentarinat.vercel.app` in the HTML files, `sitemap.xml` and `robots.txt`.

## Updating

- Version or numbers on the home page: `index.html`.
- Bump `?v=1` on `site.css` and `site.js` in every page after changing them, so browsers fetch the new files.
