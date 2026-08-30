export type ScenarioId =
  | "eliminationist-regime"
  | "authoritarian-exclusion"
  | "automated-neo-feudalism"
  | "corporate-dependency"
  | "unequal-abundance"
  | "broad-productivity-boom"
  | "shared-prosperity"
  | "optional-work-abundance";

export type AccentCategory =
  | "tail-risk"
  | "danger"
  | "rust"
  | "orange"
  | "amber"
  | "slate"
  | "blue-teal"
  | "teal";

export interface Scenario {
  id: ScenarioId;
  slug: ScenarioId;
  name: string;
  shortName: string;
  range: string;
  minimum: number;
  maximum: number;
  summary: string;
  snapshot: string;
  employment: string;
  ownership: string;
  politicalStructure: string;
  necessities: string;
  autonomy: string;
  livingStandards: string;
  primaryRisks: string[];
  toward: string[];
  away: string[];
  accent: {
    category: AccentCategory;
    color: string;
    soft: string;
    ink: string;
  };
}

/** Ordered from concentrated power to broadly shared power for the spectrum. */
export const scenarios: readonly Scenario[] = [
  {
    id: "eliminationist-regime",
    slug: "eliminationist-regime",
    name: "Eliminationist Regime",
    shortName: "Tail risk",
    range: "0–11.99, with every tail-risk guard satisfied",
    minimum: 0,
    maximum: 12,
    summary:
      "Near-total automation serves an eliminationist state after ownership, rights, democratic checks, and ordinary people’s leverage have collapsed.",
    snapshot:
      "Automated production and security systems make the governing coalition less dependent on the wider population. Courts, opposition media, and civic organizations have already been dismantled. An official ideology strips targeted groups of legal status and access to necessities, while organized perpetrators carry out mass killing. The technology did not choose this path; dehumanization, willing institutions, and the destruction of every restraint did.",
    employment:
      "Most labor is unnecessary to the regime, removing a crucial source of public leverage.",
    ownership:
      "A closed governing class controls production, land, compute, and security.",
    politicalStructure:
      "An authoritarian state enforces eliminationist ideology without independent checks.",
    necessities:
      "The regime deliberately denies necessities to targeted groups.",
    autonomy:
      "Targeted people lose legal status, movement, privacy, and political voice.",
    livingStandards:
      "Vast output coexists with deliberate deprivation and extermination.",
    primaryRisks: [
      "State-directed dehumanization and mass killing",
      "Automated coercion at vast scale",
      "Rule without dependence on public consent",
    ],
    toward: [
      "Near-total automation under closed ownership",
      "Eliminationist ideology and organized perpetrators",
      "Collapse of rights, democracy, and public claims",
    ],
    away: [
      "Independent courts, media, and civic institutions",
      "Enforceable rights and universal access",
      "Democratic control of security infrastructure",
    ],
    accent: {
      category: "tail-risk",
      color: "#8b3f43",
      soft: "#f2e5e3",
      ink: "#5f272c",
    },
  },
  {
    id: "authoritarian-exclusion",
    slug: "authoritarian-exclusion",
    name: "Authoritarian Exclusion",
    shortName: "Exclusion",
    range: "12–23.99, or below 12 without the full tail-risk guard",
    minimum: 12,
    maximum: 24,
    summary:
      "Automation, surveillance, and concentrated power suppress opposition and exclude disfavored groups from resources and public life.",
    snapshot:
      "Public services are efficient for residents whose records remain in good standing. For others, transit, healthcare, work credentials, and housing can disappear after an automated security review. Production needs little human labor, so strikes carry less leverage. Food and shelter are plentiful, but political status determines access. Surveillance makes organizing dangerous, while detention, displacement, and severe persecution remain constant threats.",
    employment:
      "Work is scarce, politically filtered, and tied to approved status.",
    ownership:
      "The state or an allied bloc controls production and data systems.",
    politicalStructure:
      "Opposition is suppressed and surveillance reinforces authoritarian rule.",
    necessities:
      "Provision is ample for favored groups and withdrawable from others.",
    autonomy:
      "Movement, association, expression, and privacy are sharply constrained.",
    livingStandards:
      "Political status, rather than scarcity, determines who benefits.",
    primaryRisks: [
      "Detention, displacement, and severe persecution",
      "Political control of basic necessities",
      "Automated punishment of dissent",
    ],
    toward: [
      "Authoritarian rule with concentrated ownership",
      "Weak due process and civic institutions",
      "Conditional access tied to compliance",
    ],
    away: [
      "Enforceable rights and plural participation",
      "Unconditional access to essentials",
      "Distributed control of critical infrastructure",
    ],
    accent: {
      category: "danger",
      color: "#9b4b3c",
      soft: "#f4e8e1",
      ink: "#663128",
    },
  },
  {
    id: "automated-neo-feudalism",
    slug: "automated-neo-feudalism",
    name: "Automated Neo-Feudalism",
    shortName: "Feudal",
    range: "24–35.99",
    minimum: 24,
    maximum: 36,
    summary:
      "A narrow ownership class controls the automated foundations of life while formal rights survive without practical leverage.",
    snapshot:
      "Elections and contracts still promise equal treatment, but a few holding networks own most housing, energy, healthcare, and compute. Human work continues in care and local services, yet withdrawing it rarely disrupts production. Residents petition platform landlords for repairs, education credits, and business access with little power to negotiate. Basic benefits prevent destitution, while independent wealth and meaningful exit remain rare.",
    employment:
      "Work persists, but owners need too little labor for effective bargaining.",
    ownership:
      "A self-reproducing asset class controls land, compute, and production.",
    politicalStructure:
      "Formal democracy coexists with dominant private power.",
    necessities:
      "A thin floor exists; good services depend on private gatekeepers.",
    autonomy: "Legal rights remain, but viable exits are scarce.",
    livingStandards: "Cheap goods coexist with high rents and entrenched rank.",
    primaryRisks: [
      "Private governance without accountability",
      "Inherited assets becoming permanent rank",
      "Rights without economic independence",
    ],
    toward: [
      "Concentrated ownership of essential systems",
      "Weak leverage in a low-labor economy",
      "Public institutions without credible alternatives",
    ],
    away: [
      "Broad ownership and strong public options",
      "Interoperability and real exit rights",
      "Universal access to essential infrastructure",
    ],
    accent: {
      category: "rust",
      color: "#a45f42",
      soft: "#f3e9df",
      ink: "#653b2c",
    },
  },
  {
    id: "corporate-dependency",
    slug: "corporate-dependency",
    name: "Corporate Dependency",
    shortName: "Depend.",
    range: "36–47.99",
    minimum: 36,
    maximum: 48,
    summary:
      "Life is materially stable, but access and opportunity depend on a few firms or tightly integrated public-private systems.",
    snapshot:
      "One household account manages rent, health coverage, training, energy, and personal compute. The bundle is reliable and affordable, but its terms are hard to challenge. When a parent leaves an approved employer, several benefits drop to a narrower tier. Government offers a fallback using the same vendors and identity rails. Most people are secure, yet changing jobs or contesting an automated decision risks too much at once.",
    employment: "Fewer, monitored jobs come bundled with essential benefits.",
    ownership:
      "Dominant firms and public-private consortia own service infrastructure.",
    politicalStructure:
      "Elected governments depend on vendors they struggle to audit.",
    necessities:
      "Provision is stable but often conditional on membership or work.",
    autonomy: "High switching costs make refusal economically costly.",
    livingStandards:
      "Comfortable consumption comes with fragile security and weak leverage.",
    primaryRisks: [
      "Benefits used to enforce compliance",
      "Vendor lock-in weakening public oversight",
      "Stable consumption without durable security",
    ],
    toward: [
      "Bundled access through monopoly systems",
      "Weak public alternatives and bargaining power",
      "Benefits tied to platforms or employment",
    ],
    away: [
      "Portable benefits and open standards",
      "Strong public options and data rights",
      "Access independent of employer or platform",
    ],
    accent: {
      category: "orange",
      color: "#a66d37",
      soft: "#f4ebdc",
      ink: "#65451f",
    },
  },
  {
    id: "unequal-abundance",
    slug: "unequal-abundance",
    name: "Unequal Abundance",
    shortName: "Unequal",
    range: "48–60.99",
    minimum: 48,
    maximum: 61,
    summary:
      "Production expands and many goods get cheaper while ownership, security, and decision-making power keep concentrating.",
    snapshot:
      "A modest income buys powerful software, tutoring, diagnostics, and manufactured goods. Housing near opportunity, trusted care, political influence, and ownership stakes remain scarce. One worker now does a department’s former workload on a renewable contract, without any claim on the capital behind the gains. Her family consumes more capability than previous generations but has less security and little say over the systems around them.",
    employment: "Jobs remain important but less secure and less rewarded.",
    ownership: "Assets and strategic decisions remain concentrated.",
    politicalStructure:
      "Democracy functions under persistent pressure from concentrated wealth.",
    necessities:
      "Many essentials improve, while housing and care remain uneven.",
    autonomy: "Consumer choice grows faster than voice or ownership.",
    livingStandards:
      "Consumption rises without equal gains in security, time, or wealth.",
    primaryRisks: [
      "Cheap consumption masking costly insecurity",
      "Wealth becoming durable political power",
      "Households gaining services but losing leverage",
    ],
    toward: [
      "Automation with middling distribution",
      "Assets outpacing wages and public claims",
      "Cheaper output treated as shared welfare",
    ],
    away: [
      "Broader ownership of productive capital",
      "Stronger bargaining and social dividends",
      "Public oversight of major deployments",
    ],
    accent: {
      category: "amber",
      color: "#9a7b2f",
      soft: "#f2eddd",
      ink: "#5f4b1d",
    },
  },
  {
    id: "broad-productivity-boom",
    slug: "broad-productivity-boom",
    name: "Broad Productivity Boom",
    shortName: "Boom",
    range: "61–73.99",
    minimum: 61,
    maximum: 74,
    summary:
      "AI augments workers and improves services, producing real but uneven gains while employment remains central.",
    snapshot:
      "A community clinic serves twice as many patients with the same staff. Automated documentation gives nurses more time for care, and a regional agreement limits monitoring. Similar gains reach construction, logistics, and public administration. Wages rise in many fields and some workweeks shrink, though poorly protected workers face repeated disruption. Life improves, but most households still need a job for income, security, and status.",
    employment: "AI changes jobs more often than it removes them.",
    ownership:
      "Private ownership dominates, tempered by pensions and public investment.",
    politicalStructure:
      "Democratic governments retain uneven but meaningful influence.",
    necessities:
      "Services improve, though access still varies by income and region.",
    autonomy: "Better tools coexist with continued dependence on employers.",
    livingStandards:
      "Productivity lifts wages and services unevenly across sectors.",
    primaryRisks: [
      "Workers and regions left behind",
      "Productivity outrunning wages or free time",
      "Augmentation leading to later concentration",
    ],
    toward: [
      "Assistive systems with some worker voice",
      "Investment in public services and diffusion",
      "Competition among infrastructure providers",
    ],
    away: [
      "Broader claims on automation returns",
      "Universal security beyond employment",
      "Shorter hours alongside higher output",
    ],
    accent: {
      category: "slate",
      color: "#5c7487",
      soft: "#e7ecee",
      ink: "#364b5b",
    },
  },
  {
    id: "shared-prosperity",
    slug: "shared-prosperity",
    name: "Shared Prosperity",
    shortName: "Shared",
    range: "74–87.99",
    minimum: 74,
    maximum: 88,
    summary:
      "AI gains flow through wages, services, shorter hours, social dividends, and ownership beyond a narrow investor class.",
    snapshot:
      "A transit engineer works four days a week and receives wages plus a public-fund dividend. Her pension and worker trust hold stakes in the automated systems used across the region. Firms still compete, while labor agreements shape monitoring and gain-sharing. Healthcare and education no longer depend on a particular employer. Disputes remain, but ordinary citizens have enough income, services, votes, and ownership to bargain over change.",
    employment:
      "Paid work remains common, but hours fall and security improves.",
    ownership: "Private, worker, cooperative, and public ownership coexist.",
    politicalStructure:
      "Democratic institutions can set and enforce meaningful rules.",
    necessities: "Strong public services make access broadly reliable.",
    autonomy:
      "Economic security makes refusal and participation more practical.",
    livingStandards:
      "Productivity becomes higher income, better services, and more time.",
    primaryRisks: [
      "Uneven gains across regions",
      "Ownership drifting back toward concentration",
      "Public systems becoming slow or captured",
    ],
    toward: [
      "Broad ownership and strong bargaining",
      "Universal services and social dividends",
      "Accountable, competitive infrastructure",
    ],
    away: [
      "Concentrated capital and weakened labor",
      "Essential services tied to employment",
      "Opaque deployment without public oversight",
    ],
    accent: {
      category: "blue-teal",
      color: "#3f7880",
      soft: "#e2ecea",
      ink: "#28565c",
    },
  },
  {
    id: "optional-work-abundance",
    slug: "optional-work-abundance",
    name: "Optional-Work Abundance",
    shortName: "Optional",
    range: "88–100",
    minimum: 88,
    maximum: 100,
    summary:
      "Automation handles much undesirable labor while broad ownership and universal security make paid work genuinely optional.",
    snapshot:
      "A resident chooses a paid role restoring wetlands for two days a week, then spends time caring for family and composing music. Housing, healthcare, education, energy, and basic compute are guaranteed without employment tests. Automated systems are owned through public funds, cooperatives, pensions, and private stakes. Work still carries craft and status, but no longer decides who deserves to live securely. Allocation, ecological limits, and meaning remain active political questions.",
    employment: "Paid work is available but no longer required for survival.",
    ownership:
      "Automated production is broadly held through diverse institutions.",
    politicalStructure:
      "Democratic governance sets limits and resolves allocation disputes.",
    necessities: "Housing, care, education, energy, and compute are universal.",
    autonomy:
      "People control more of their time and can refuse harmful conditions.",
    livingStandards:
      "Productivity becomes security, time, services, and wider opportunity.",
    primaryRisks: [
      "Ecological pressure from abundant production",
      "New status hierarchies replacing job hierarchies",
      "Complacency weakening public institutions",
    ],
    toward: [
      "Broad ownership of automated production",
      "Universal services and social dividends",
      "Strong rights and democratic accountability",
    ],
    away: [
      "Conditional access tied to work or compliance",
      "Capture of shared assets by narrow interests",
      "Opaque systems without public challenge",
    ],
    accent: {
      category: "teal",
      color: "#287b73",
      soft: "#deeeea",
      ink: "#17554f",
    },
  },
] as const;

export const scenarioById = Object.fromEntries(
  scenarios.map((scenario) => [scenario.id, scenario]),
) as Record<ScenarioId, Scenario>;

export const scenariosFromPositiveToSevere = [...scenarios].reverse();
