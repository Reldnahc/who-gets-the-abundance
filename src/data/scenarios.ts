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
      "An extreme political collapse turns near-total automation and surveillance into instruments of dispossession and mass killing.",
    snapshot:
      "Public notices still describe the system as a program of security and renewal. In practice, automated logistics, weapons, identification systems, and sealed supply networks have made the governing coalition materially independent of most residents. Courts, opposition media, and independent civic organizations were dismantled before the final escalation. Official ideology now classifies targeted groups as irredeemable threats. People outside the favored category lose legal status and access; organized perpetrators use the automated state to carry out mass killing and extermination. This is not technology acting on its own, nor a secret plan attributed to today’s institutions. It is a tail-risk political collapse in which dehumanization, willing perpetrators, and the destruction of every restraint combine with unusually powerful tools.",
    employment:
      "Human labor is largely unnecessary to the ruling system, removing a practical source of bargaining power for most people.",
    ownership:
      "Automated production, compute, land, and security infrastructure are controlled by a closed governing class.",
    politicalStructure:
      "Authoritarian institutions enforce an eliminationist ideology after courts, opposition, and civic restraints have failed.",
    necessities:
      "Access is deliberately withdrawn from targeted groups and reserved for protected populations and regime functions.",
    autonomy:
      "Legal personhood, movement, privacy, and political voice are absent for people the regime has marked as disposable.",
    livingStandards:
      "Extraordinary productive capacity coexists with intentional deprivation; output is severed from any claim to universal welfare.",
    primaryRisks: [
      "State-directed dehumanization escalating into extermination",
      "Automated surveillance and force reducing practical barriers to mass coercion",
      "A self-sufficient ruling system no longer constrained by dependence on the wider population",
    ],
    toward: [
      "Near-total automation under extremely concentrated ownership",
      "Eliminationist ideology, organized perpetrators, and systematic dehumanization",
      "The joint destruction of democracy, civil liberties, public claims, and bargaining power",
    ],
    away: [
      "Independent courts, media, civic institutions, and enforceable human rights",
      "Broad economic ownership and universal, unconditional access to necessities",
      "Democratic control of surveillance, security, and automated infrastructure",
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
      "Concentrated automation and surveillance let a governing coalition suppress opposition and exclude disfavored groups from public life.",
    snapshot:
      "In 2042, public services are fast for residents whose identity records remain in good standing. A teacher in a disfavored district, however, finds that transit permissions, medical appointments, and work credentials can be suspended after an automated security review. Most production continues with little human labor, so strikes and boycotts carry less leverage than they once did. Independent journalists operate from abroad, while local associations require state approval. Food and housing exist in abundance, but access is rationed through political categories. Detention, forced displacement, and severe persecution are routine possibilities. The system is stable not because everyone supports it, but because surveillance, concentrated resources, and weak institutions make organized opposition extraordinarily dangerous.",
    employment:
      "Employment is limited and politically filtered; losing approved status can end both work and access to essential systems.",
    ownership:
      "The state or an aligned ownership bloc controls the automated economy and its critical data systems.",
    politicalStructure:
      "Opposition is suppressed, participation is selective, and automated surveillance reinforces one-party or coalition rule.",
    necessities:
      "Basic provision is technically ample but conditional, unequal, and withdrawable from disfavored populations.",
    autonomy:
      "Movement, association, expression, and private life are sharply constrained by pervasive monitoring and coercion.",
    livingStandards:
      "Favored groups may live comfortably while political status, not productive scarcity, determines who benefits.",
    primaryRisks: [
      "Mass deprivation, detention, forced displacement, and severe persecution",
      "Political classification becoming a gatekeeper for necessities",
      "Automated surveillance making dissent easier to identify and punish",
    ],
    toward: [
      "High automation paired with authoritarian government and concentrated ownership",
      "Weak privacy, due process, and independent civic institutions",
      "Conditional access systems that turn political compliance into economic survival",
    ],
    away: [
      "Enforceable civil liberties, due process, and plural political participation",
      "Independent channels for essentials that cannot be revoked for dissent",
      "Distributed control over compute, communications, and productive infrastructure",
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
    shortName: "Neo-feudal",
    range: "24–35.99",
    minimum: 24,
    maximum: 36,
    summary:
      "A narrow ownership class controls the automated foundations of life while formal rights survive without much practical leverage.",
    snapshot:
      "By 2044, elections still happen and contracts still promise equal treatment. Yet a small set of holding networks owns most housing, energy storage, medical systems, and high-value compute. A family can leave one service territory, but the alternatives share owners, identity standards, and risk models. Human work remains available in care, status services, and local maintenance, although its withdrawal rarely disrupts production. Residents petition platform landlords for repairs, education credits, and business access with little ability to negotiate terms. Many people avoid destitution through thin public benefits, but building assets or entering a high-opportunity network is difficult. Formal citizenship remains; practical independence has become something closer to a licensed privilege.",
    employment:
      "Human work persists at the margins, but owners need little labor and workers cannot bargain for a meaningful share of output.",
    ownership:
      "A small hereditary or self-reproducing asset class controls land, compute, housing, and automated production.",
    politicalStructure:
      "Formal democratic rights coexist with deep private power and heavy influence over the rules that shape daily life.",
    necessities:
      "A minimal floor may exist, while good housing, care, education, and compute depend on patron-like private institutions.",
    autonomy:
      "People retain legal rights but face few viable exits from the organizations that mediate opportunity and survival.",
    livingStandards:
      "Some automated goods are inexpensive, yet rents and gatekeeping capture gains before they become durable household security.",
    primaryRisks: [
      "Private governance displacing meaningful public accountability",
      "Asset inheritance hardening into durable social rank",
      "Formal freedoms becoming difficult to exercise without economic independence",
    ],
    toward: [
      "Highly concentrated ownership of land, compute, housing, and essential networks",
      "Weak labor leverage as automated systems need fewer people",
      "Public institutions too thin to provide credible alternatives",
    ],
    away: [
      "Competitive and interoperable infrastructure with real exit rights",
      "Broad ownership, public options, and anti-monopoly enforcement",
      "Universal access to the foundations required for independent participation",
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
    shortName: "Dependency",
    range: "36–47.99",
    minimum: 36,
    maximum: 48,
    summary:
      "Life is materially stable, but access and opportunity increasingly depend on a few firms or tightly integrated public-private systems.",
    snapshot:
      "In 2039, one household dashboard manages rent, health coverage, training credits, energy, and the family’s allocation of personal compute. The package is reliable and cheaper than the separate services it replaced. It is also tied to a platform account whose terms change with little negotiation. After a parent leaves an approved employer, several benefits shift to a narrower tier and an appeal takes months. Local government offers a fallback, but it uses the same vendors and identity rails. Most people are fed, housed, and connected; open deprivation is uncommon. Still, changing jobs, organizing at work, or challenging an automated decision can put too many parts of ordinary life at risk at once.",
    employment:
      "Jobs are fewer and more monitored, with benefit bundles making workers dependent even when their labor retains some value.",
    ownership:
      "A small number of dominant firms and public-private consortia own the systems through which most services are delivered.",
    politicalStructure:
      "Elections and regulation persist, but institutions rely heavily on vendors they struggle to audit or replace.",
    necessities:
      "Provision is generally stable yet often conditional on employment, membership, reputation, or behavioral compliance.",
    autonomy:
      "People retain choices on paper, while high switching costs and linked services make refusal economically costly.",
    livingStandards:
      "Automation supports comfortable consumption, but insecurity and weak negotiating power limit who can convert it into freedom.",
    primaryRisks: [
      "Essential benefits becoming leverage for private or bureaucratic compliance",
      "Vendor lock-in weakening democratic oversight and individual exit",
      "Nominal abundance masking fragile household security",
    ],
    toward: [
      "Monopoly infrastructure and bundled access to necessities",
      "Weak public alternatives and limited worker bargaining power",
      "Rules that permit essential access to depend on platform or employment status",
    ],
    away: [
      "Portable benefits, open standards, data rights, and meaningful due process",
      "Strong public options and enforcement against abusive concentration",
      "Universal access that is independent of a single employer or platform",
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
      "Production expands and many goods become cheaper, while ownership, security, and decision-making power continue to concentrate.",
    snapshot:
      "By 2040, a modest income buys astonishing software, customized tutoring, routine diagnostics, and manufactured goods. Measured output is high. Housing near opportunity, trusted human care, political influence, and ownership stakes remain scarce. A logistics coordinator uses capable systems to do what once required a department, but works on renewable contracts and receives no claim on the capital that made the gains possible. Her children enjoy better tools than any previous generation and face a weaker path to stable assets. Public services soften the worst shocks without changing who makes investment decisions. Daily life is materially richer and institutionally thinner: people consume more capability while holding less durable power over the systems around them.",
    employment:
      "Employment remains important but less secure, with a smaller share of gains flowing through wages and long-term careers.",
    ownership:
      "Productive assets and strategic decisions are concentrated even as products become broadly affordable.",
    politicalStructure:
      "Democratic institutions function, but wealth concentration gives a narrow group persistent agenda-setting power.",
    necessities:
      "Many essentials improve in price or quality, while housing, care, and premium access remain uneven and insecure.",
    autonomy:
      "Consumer choice expands faster than workplace voice, asset ownership, or influence over consequential automated systems.",
    livingStandards:
      "Typical material consumption rises, but productivity growth does not reliably become stability, time, or shared wealth.",
    primaryRisks: [
      "A widening gap between inexpensive consumption and costly security",
      "Concentrated wealth converting into durable political influence",
      "Households becoming richer in services but poorer in ownership and leverage",
    ],
    toward: [
      "Rapid automation with middling redistribution and bargaining institutions",
      "Asset appreciation accruing faster than wages or public claims",
      "Policies that equate cheaper output with broadly shared welfare",
    ],
    away: [
      "Mechanisms that spread ownership and the returns to productive capital",
      "Stronger bargaining institutions, social dividends, and universal services",
      "Democratic oversight of major investment and deployment decisions",
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
    shortName: "Productivity",
    range: "61–73.99",
    minimum: 61,
    maximum: 74,
    summary:
      "AI mostly augments workers and improves services, producing real but uneven gains within a society where employment remains central.",
    snapshot:
      "In 2037, a community clinic serves twice as many patients with the same staff. Automated documentation and diagnostic support leave nurses more time for care, while a regional agreement gives employees a say in monitoring and staffing. Similar gains reach construction, translation, logistics, and public administration. Wages rise in many fields and some workweeks shorten, though workers in poorly organized sectors cycle through disruptions and retraining. Public benefits catch part of the transition, but most households still need a job for security and status. The economy feels more capable rather than fundamentally reorganized: services work better, skilled teams do more, and living standards improve, yet ownership remains uneven and freedom from compulsory work is still limited.",
    employment:
      "Employment remains the main route to income and belonging, with AI more often changing jobs than eliminating them outright.",
    ownership:
      "Private ownership remains dominant, tempered by pensions, employee stakes, taxation, and some public investment.",
    politicalStructure:
      "Democratic governments and social dialogue shape deployment unevenly but retain meaningful influence.",
    necessities:
      "Public and market services improve, though access still varies by income, region, and employment status.",
    autonomy:
      "Workers gain useful tools and some time, but employer decisions and job dependence still structure much of adult life.",
    livingStandards:
      "Productivity supports broader wage and service gains, with visible gaps between well-governed and weakly protected sectors.",
    primaryRisks: [
      "Uneven transitions leaving specific workers and regions behind",
      "Productivity gains outrunning wage growth or reduced working time",
      "Temporary augmentation becoming a path to later concentration",
    ],
    toward: [
      "Capable assistive systems combined with partial worker voice and redistribution",
      "Investment in public services, skills, and diffusion beyond frontier firms",
      "Competition that keeps useful infrastructure available to many organizations",
    ],
    away: [
      "Broader ownership and stronger claims on the returns to automation",
      "Universal access that makes transitions less dependent on employment",
      "Institutions that convert productivity into time as well as income",
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
      "Large AI gains flow through wages, public services, shorter hours, social dividends, and ownership that reaches beyond a narrow investor class.",
    snapshot:
      "In 2041, a transit engineer works a four-day week and receives both wages and a modest annual dividend from a public investment fund. Her pension, a worker trust, and private savings all hold stakes in the automated systems used across the region. Firms still compete, fail, and pursue profit; labor agreements and public rules set boundaries for monitoring, safety, and gain-sharing. Healthcare and education no longer depend on a particular employer, which makes changing jobs less risky. Some communities adapt faster than others, and disputes over taxes, intellectual property, energy, and migration remain vigorous. The difference is leverage: ordinary citizens possess enough income, services, votes, and ownership to bargain over how productivity changes their lives.",
    employment:
      "Paid work remains common but hours fall, bargaining improves, and job loss is less likely to threaten basic security.",
    ownership:
      "Private firms coexist with worker funds, pensions, cooperatives, public stakes, and broadly held productive assets.",
    politicalStructure:
      "Competitive democracy has enough administrative capacity and public trust to govern powerful systems.",
    necessities:
      "Strong universal services and portable benefits provide a reliable floor alongside market choice.",
    autonomy:
      "People can change jobs, organize, create, care for others, or refuse intrusive systems without courting destitution.",
    livingStandards:
      "Productivity gains appear in better services, higher incomes, social dividends, and more discretionary time.",
    primaryRisks: [
      "Governance failing to keep pace with complex private and public systems",
      "Regional or generational gaps persisting beneath strong averages",
      "Successful institutions being weakened by capture or complacency",
    ],
    toward: [
      "Broad capital ownership and enforceable worker participation",
      "Universal services, social dividends, and capable democratic government",
      "Open infrastructure that lets smaller firms and public institutions participate",
    ],
    away: [
      "Erosion of civic trust, bargaining power, or fiscal capacity",
      "Re-concentration of infrastructure and productive ownership",
      "Access systems that become conditional, exclusionary, or difficult to contest",
    ],
    accent: {
      category: "blue-teal",
      color: "#3f7d82",
      soft: "#e1eeee",
      ink: "#28585c",
    },
  },
  {
    id: "optional-work-abundance",
    slug: "optional-work-abundance",
    name: "Optional-Work Abundance",
    shortName: "Optional work",
    range: "88–100",
    minimum: 88,
    maximum: 100,
    summary:
      "Automation handles much undesirable labor while broad ownership, rights, and universal provision make work genuinely optional.",
    snapshot:
      "In 2048, basic housing, healthcare, food, education, transit, energy, and a useful share of compute are guaranteed without an employment test. A resident spends two mornings each week coordinating a watershed project and another helping an independent game studio; neither role is required to keep her home. Automated production funds a social dividend through public, cooperative, and widely distributed private ownership. Paid work, craft, caregiving, entrepreneurship, and prestige have not disappeared, but unemployment no longer implies social failure. Politics remains demanding. Communities debate ecological limits, scarce locations, attention, unequal recognition, and how much authority to delegate to machines. Abundance has widened freedom, not ended governance or the human search for purpose.",
    employment:
      "Paid work is available and often meaningful, but survival, civic standing, and access to opportunity do not depend on holding a job.",
    ownership:
      "Automated productive wealth is distributed across public funds, cooperatives, households, and competitive private enterprise.",
    politicalStructure:
      "Strong democratic institutions govern shared systems while preserving pluralism, due process, and meaningful local choice.",
    necessities:
      "A generous universal floor covers the practical foundations of participation without behavioral or employment conditions.",
    autonomy:
      "People have substantial control over time, association, privacy, place, and whether to sell their labor.",
    livingStandards:
      "High productivity becomes broad security and discretionary time, while scarce ecological and positional goods still require allocation.",
    primaryRisks: [
      "Meaning, status, and belonging remaining unequal after material scarcity falls",
      "Democratic oversight becoming too slow or superficial for complex systems",
      "Environmental costs and genuinely scarce goods being hidden by material abundance",
    ],
    toward: [
      "Very high automation combined with broad ownership and strong public claims",
      "Universal necessities, civil liberties, and democratic control of consequential systems",
      "Institutions that distribute time and agency rather than consumption alone",
    ],
    away: [
      "Concentration of productive assets or the infrastructure beneath universal provision",
      "Conditional benefits, weakened privacy, or exclusion from political decisions",
      "Treating technical capacity as a substitute for ongoing democratic governance",
    ],
    accent: {
      category: "teal",
      color: "#23766f",
      soft: "#dfeee9",
      ink: "#18534e",
    },
  },
] as const;

export const scenarioById = Object.fromEntries(
  scenarios.map((scenario) => [scenario.id, scenario]),
) as Record<ScenarioId, Scenario>;

export const scenariosFromPositiveToSevere = [...scenarios].reverse();
