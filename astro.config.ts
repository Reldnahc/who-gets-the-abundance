import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import { resolveProductionUrl } from "./src/config/site";

const productionUrl = new URL(
  resolveProductionUrl(process.env.PUBLIC_SITE_URL),
);
const base = productionUrl.pathname.replace(/\/$/, "") || "/";

export default defineConfig({
  site: productionUrl.origin,
  base,
  output: "static",
  trailingSlash: "always",
  integrations: [react(), sitemap()],
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
  },
});
