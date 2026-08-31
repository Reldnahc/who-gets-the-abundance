export const siteConfig = {
  name: "Who Gets the Abundance?",
  title: "Who Gets the Abundance? | Exploring Possible AI Futures",
  description:
    "Explore a two-axis map of how shared benefit, public agency, and automation capability can combine into very different social futures.",
  productionUrl: "https://reldnahc.github.io/who-gets-the-abundance/",
  socialImage: "og-image.png",
  author: "Who Gets the Abundance? project",
  attribution: "An independent public-interest technology project",
  donationUrl: "https://buymeacoffee.com/chandlerlee",
} as const;

export function resolveProductionUrl(environmentValue?: string): string {
  const candidate = environmentValue?.trim() || siteConfig.productionUrl;

  try {
    return new URL(candidate).toString();
  } catch {
    return siteConfig.productionUrl;
  }
}
