import type { ScenarioId } from "./scenarios";

export interface Source {
  title: string;
  authorOrOrganization: string;
  publication: string;
  year: number;
  url: string;
  relevance: string;
  supports: Array<
    | "automation"
    | "ownership"
    | "workerPower"
    | "socialDividend"
    | "democracy"
    | "civilLiberties"
    | "universalAccess"
    | "openInfrastructure"
    | ScenarioId
  >;
}

export const sources: readonly Source[] = [
  {
    title:
      "Generative AI and Jobs: A global analysis of potential effects on job quantity and quality",
    authorOrOrganization: "Paweł Gmyrek, Janine Berg, and David Bescond",
    publication: "International Labour Organization Working Paper 96",
    year: 2023,
    url: "https://www.ilo.org/publications/generative-ai-and-jobs-global-analysis-potential-effects-job-quantity-and",
    relevance:
      "Examines occupational exposure, augmentation, job quality, and why labor-market institutions matter alongside technical capability.",
    supports: ["automation", "workerPower", "broad-productivity-boom"],
  },
  {
    title:
      "OECD Employment Outlook 2023: Artificial Intelligence and the Labour Market",
    authorOrOrganization: "OECD",
    publication: "OECD Employment Outlook",
    year: 2023,
    url: "https://www.oecd.org/en/publications/2023/07/oecd-employment-outlook-2023_904bcef3/full-report.html",
    relevance:
      "Reviews evidence on AI, job quantity and quality, skills, social dialogue, and collective bargaining while emphasizing uncertainty.",
    supports: ["automation", "workerPower", "broad-productivity-boom"],
  },
  {
    title: "Gen-AI: Artificial Intelligence and the Future of Work",
    authorOrOrganization:
      "Mauro Cazzaniga, Florence Jaumotte, Longji Li, Giovanni Melina, Augustus J. Panton, Carlo Pizzinelli, Emma Rockall, and Marina M. Tavares",
    publication: "International Monetary Fund Staff Discussion Note 2024/001",
    year: 2024,
    url: "https://www.imf.org/en/publications/staff-discussion-notes/issues/2024/01/14/gen-ai-artificial-intelligence-and-the-future-of-work-542379",
    relevance:
      "Explores how AI exposure, complementarity, capital returns, property rights, and redistribution can shape income and wealth distribution.",
    supports: [
      "automation",
      "ownership",
      "socialDividend",
      "unequal-abundance",
      "shared-prosperity",
    ],
  },
  {
    title: "Recommendation on the Ethics of Artificial Intelligence",
    authorOrOrganization: "UNESCO",
    publication: "UNESCO General Conference",
    year: 2021,
    url: "https://www.unesco.org/en/articles/recommendation-ethics-artificial-intelligence?hub=66929",
    relevance:
      "Provides a human-rights-centered framework spanning dignity, democratic participation, privacy, fairness, oversight, inclusion, and benefit sharing.",
    supports: [
      "democracy",
      "civilLiberties",
      "universalAccess",
      "authoritarian-exclusion",
    ],
  },
];

// Developer note: add new sources only after verifying the title, authorship,
// publication date, and destination URL. These readings inform the questions;
// they do not validate the simulator's weights or scenario boundaries.
