export const siteConfig = {
  name: "Who Gets the Abundance?",
  title: "Who Gets the Abundance? | Exploring Possible AI Futures",
  description:
    "Explore how automation, ownership, democracy, civil liberties, and wealth distribution could shape radically different AI futures—from optional work and shared prosperity to authoritarian exclusion.",
  productionUrl: "http://localhost:4321",
  socialImage: "og-image.png",
  author: "Who Gets the Abundance? project",
  attribution: "An independent public-interest technology project",
  donationUrl: "https://buymeacoffee.com/REPLACE_ME",
} as const;

export function resolveProductionUrl(environmentValue?: string): string {
  const candidate = environmentValue?.trim() || siteConfig.productionUrl;

  try {
    return new URL(candidate).toString();
  } catch {
    return siteConfig.productionUrl;
  }
}
