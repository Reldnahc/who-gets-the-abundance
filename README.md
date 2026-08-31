# Who Gets the Abundance?

A single-page public-interest simulator mapping how shared benefit, public agency, and automation capability can combine into very different social futures.

The model is an illustrative thought tool. Its axis weights, archetype centers, and match thresholds are explicit normative design choices, not empirically validated coefficients, probabilities, or policy forecasts.

## Local development

Requirements: Node.js 22.12 or newer and npm.

```bash
npm ci
npm run dev
```

With the default project base path, the development server serves the site at `http://localhost:4321/who-gets-the-abundance/`.

## Quality checks

```bash
npm run format
npm run lint
npm run check
npm run test
npm run build
```

Run every check in sequence with:

```bash
npm run verify
```

The production output is fully static in `dist/` and does not require a Node server.

## Architecture

- Astro renders the header, nine-archetype archive, methodology, sources, and footer as static HTML.
- React is used only for `src/components/FutureSimulator.tsx`, hydrated with `client:load`.
- `src/components/FutureMap.tsx` renders the interactive two-axis archetype map.
- `src/lib/futureModel.ts` calculates shared benefit, public agency, indicators, and nearest-archetype matches.
- `src/lib/shareState.ts` owns compact query-string serialization and safe parsing.
- Vitest covers the model and share-state edge cases.

The two visible institutional axes carry most of archetype distance. Automation remains independent so capability cannot point toward a socially positive or negative result by itself. The interface shows the nearest match and every archetype inside the nearby-distance window rather than forcing mixed states into exclusive bands.

## Initial GitHub Pages setup

Before the first deployment from a new repository, select:

`Settings → Pages → Build and deployment → Source → GitHub Actions`

The included workflow then verifies and publishes the static `dist/` artifact on pushes to `main`.

## Production URL and base paths

The standard project URL, `https://reldnahc.github.io/who-gets-the-abundance/`, is the default at `siteConfig.productionUrl` in `src/config/site.ts`.

`PUBLIC_SITE_URL` is an optional override for a future custom domain, alternate deployment, or preview build. Include any required path:

```text
PUBLIC_SITE_URL=https://username.github.io/repository-name
```

Astro derives the deployment base path from that URL, so assets, canonical metadata, anchors, the sitemap, and shared query-string links work under GitHub Pages project paths.

The GitHub Pages workflow also derives the standard Pages URL at build time. Set a repository Actions variable named `PUBLIC_SITE_URL` only for a custom domain or nonstandard path.

## Sitemap and robots

The sitemap index is published at:

`https://reldnahc.github.io/who-gets-the-abundance/sitemap-index.xml`

That URL can be submitted directly to search-engine webmaster tools. Crawlers generally consult the host-root `robots.txt`; this project repository cannot control that file for the entire `reldnahc.github.io` host. The generated project-path robots file is included only as a deployment artifact.

## Donation link

The support link is centralized at `siteConfig.donationUrl` in `src/config/site.ts` and can be changed there later.

## Sources

The public reading list is typed in `src/data/sources.ts`. Add entries only after verifying the title, author or organization, publication, year, and URL. The readings motivate the questions explored here; they do not validate the simulator’s formula.
