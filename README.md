# Who Gets the Abundance?

A single-page public-interest simulator for exploring how automation capability can combine with ownership, political power, rights, access, and infrastructure to produce very different social outcomes.

The model is an illustrative thought tool. Its weights and scenario thresholds are explicit normative design choices, not empirically validated coefficients, probabilities, or policy forecasts.

## Local development

Requirements: Node.js 22.12 or newer and npm.

```bash
npm install
npm run dev
```

The development server defaults to `http://localhost:4321`.

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

- Astro renders the header, editorial explanation, complete eight-scenario archive, methodology, sources, and footer as static HTML.
- React is used only for `src/components/FutureSimulator.tsx`, hydrated with `client:load`.
- `src/lib/futureModel.ts` contains the pure scoring, indicator, driver, guard, and counterfactual functions.
- `src/lib/shareState.ts` owns compact query-string serialization and safe parsing.
- Vitest covers the model and share-state edge cases.

## Production URL and base paths

The local fallback URL is centralized at `siteConfig.productionUrl` in `src/config/site.ts`. Before a non-GitHub deployment, replace it with the real public URL or set the `PUBLIC_SITE_URL` environment variable. Include the repository path for a project site, for example:

```text
PUBLIC_SITE_URL=https://username.github.io/repository-name
```

Astro derives the deployment base path from that URL, so assets, canonical metadata, anchors, the sitemap, and shared query-string links work under GitHub Pages project paths.

The included GitHub Pages workflow derives the standard Pages URL from the repository at build time. Set a repository Actions variable named `PUBLIC_SITE_URL` only when using a custom domain or nonstandard path.

## Donation link

Replace `siteConfig.donationUrl` in `src/config/site.ts` before publishing. The
placeholder value exists only in that configuration property.

## Sources

The public reading list is typed in `src/data/sources.ts`. Add entries only after verifying the title, author or organization, publication, year, and URL. The readings motivate the questions explored here; they do not validate the simulator’s formula.
