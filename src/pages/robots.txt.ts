import type { APIRoute } from "astro";

import { siteConfig } from "../config/site";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL(siteConfig.productionUrl);
  const basePath = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const sitemapUrl = new URL(`${basePath}sitemap-index.xml`, origin);

  return new Response(
    [`User-agent: *`, `Allow: ${basePath}`, `Sitemap: ${sitemapUrl}`, ""].join(
      "\n",
    ),
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );
};
