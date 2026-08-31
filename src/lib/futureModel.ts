import {
  archetypeCenters,
  archetypeOrder,
  type ArchetypeCoordinates,
  type ArchetypeId,
} from "../data/scenarios";

export const inputKeys = [
  "automation",
  "ownership",
  "workerPower",
  "socialDividend",
  "democracy",
  "civilLiberties",
  "universalAccess",
  "openInfrastructure",
] as const;

export type SliderKey = (typeof inputKeys)[number];
export type FutureInputs = Record<SliderKey, number>;

export const sharedBenefitWeights = {
  ownership: 0.4,
  socialDividend: 0.35,
  universalAccess: 0.25,
} as const;

export const publicAgencyWeights = {
  democracy: 0.3,
  civilLiberties: 0.25,
  workerPower: 0.25,
  openInfrastructure: 0.2,
} as const;

export type SharedBenefitKey = keyof typeof sharedBenefitWeights;
export type PublicAgencyKey = keyof typeof publicAgencyWeights;
export type AxisInputKey = SharedBenefitKey | PublicAgencyKey;
export type AxisName = "sharedBenefit" | "publicAgency";

export interface FutureCoordinates {
  sharedBenefit: number;
  publicAgency: number;
  automation: number;
}

export interface ArchetypeMatch {
  scenarioId: ArchetypeId;
  distance: number;
}

export type MatchRelation = "between" | "leaning" | "closest";
export type FitQuality = "strong" | "moderate" | "loose";

export interface MatchSummary {
  primary: ArchetypeMatch;
  secondary: ArchetypeMatch;
  gap: number;
  relation: MatchRelation;
  fitQuality: FitQuality;
}

export interface TailRiskEvaluation {
  active: boolean;
  checks: Record<string, boolean>;
}

export interface StructuralIndicators {
  materialAbundance: number;
  sharedProsperity: number;
  personalAutonomy: number;
  politicalSecurity: number;
  freedomFromCompulsoryWork: number;
}

export interface AxisContribution {
  axis: AxisName;
  key: AxisInputKey;
  value: number;
  contribution: number;
  magnitude: number;
  direction: "higher" | "lower" | "neutral";
}

export interface FutureEvaluation {
  inputs: FutureInputs;
  coordinates: FutureCoordinates;
  match: MatchSummary;
  rankedMatches: ArchetypeMatch[];
  indicators: StructuralIndicators;
  sharedBenefitDrivers: AxisContribution[];
  publicAgencyDrivers: AxisContribution[];
  tailRisk: TailRiskEvaluation;
}

export function clamp(value: number, minimum = 0, maximum = 100): number {
  if (!Number.isFinite(value)) return minimum;
  return Math.min(maximum, Math.max(minimum, value));
}

export function clampInputs(inputs: FutureInputs): FutureInputs {
  return Object.fromEntries(
    inputKeys.map((key) => [key, clamp(inputs[key])]),
  ) as unknown as FutureInputs;
}

export function calculateSharedBenefit(inputs: FutureInputs): number {
  const safe = clampInputs(inputs);

  return clamp(
    safe.ownership * sharedBenefitWeights.ownership +
      safe.socialDividend * sharedBenefitWeights.socialDividend +
      safe.universalAccess * sharedBenefitWeights.universalAccess,
  );
}

export function calculatePublicAgency(inputs: FutureInputs): number {
  const safe = clampInputs(inputs);

  return clamp(
    safe.democracy * publicAgencyWeights.democracy +
      safe.civilLiberties * publicAgencyWeights.civilLiberties +
      safe.workerPower * publicAgencyWeights.workerPower +
      safe.openInfrastructure * publicAgencyWeights.openInfrastructure,
  );
}

export function calculateCoordinates(inputs: FutureInputs): FutureCoordinates {
  const safe = clampInputs(inputs);

  return {
    sharedBenefit: calculateSharedBenefit(safe),
    publicAgency: calculatePublicAgency(safe),
    automation: safe.automation,
  };
}

export function calculateArchetypeDistance(
  coordinates: FutureCoordinates,
  center: ArchetypeCoordinates,
): number {
  const sharedBenefitDifference =
    clamp(coordinates.sharedBenefit) - clamp(center.sharedBenefit);
  const publicAgencyDifference =
    clamp(coordinates.publicAgency) - clamp(center.publicAgency);
  const automationDifference =
    clamp(coordinates.automation) - clamp(center.automation);

  return Math.sqrt(
    0.4 * sharedBenefitDifference ** 2 +
      0.4 * publicAgencyDifference ** 2 +
      0.2 * automationDifference ** 2,
  );
}

export function rankArchetypes(
  coordinates: FutureCoordinates,
): ArchetypeMatch[] {
  return archetypeOrder
    .map((scenarioId) => ({
      scenarioId,
      distance: calculateArchetypeDistance(
        coordinates,
        archetypeCenters[scenarioId],
      ),
    }))
    .sort((first, second) => {
      const distanceDifference = first.distance - second.distance;

      if (Math.abs(distanceDifference) > Number.EPSILON) {
        return distanceDifference;
      }

      return (
        archetypeOrder.indexOf(first.scenarioId) -
        archetypeOrder.indexOf(second.scenarioId)
      );
    });
}

export function classifyMatch(
  primaryDistance: number,
  secondaryDistance: number,
): Pick<MatchSummary, "gap" | "relation" | "fitQuality"> {
  const primary = Number.isFinite(primaryDistance)
    ? Math.max(0, primaryDistance)
    : Number.POSITIVE_INFINITY;
  const secondary = Number.isFinite(secondaryDistance)
    ? Math.max(primary, secondaryDistance)
    : Number.POSITIVE_INFINITY;
  const gap = secondary - primary;
  const relation: MatchRelation =
    gap < 3 ? "between" : gap < 8 ? "leaning" : "closest";
  const fitQuality: FitQuality =
    primary <= 10 ? "strong" : primary <= 20 ? "moderate" : "loose";

  return { gap, relation, fitQuality };
}

export function evaluateExtremeTailRisk(
  inputs: FutureInputs,
  coordinates = calculateCoordinates(inputs),
): TailRiskEvaluation {
  const safe = clampInputs(inputs);
  const checks = {
    automation: safe.automation >= 85,
    sharedBenefit: coordinates.sharedBenefit <= 15,
    publicAgency: coordinates.publicAgency <= 12,
    ownership: safe.ownership <= 12,
    socialDividend: safe.socialDividend <= 15,
    universalAccess: safe.universalAccess <= 25,
    workerPower: safe.workerPower <= 15,
    democracy: safe.democracy <= 12,
    civilLiberties: safe.civilLiberties <= 12,
    openInfrastructure: safe.openInfrastructure <= 15,
  };

  return {
    active: Object.values(checks).every(Boolean),
    checks,
  };
}

export function calculateIndicators(
  inputs: FutureInputs,
  coordinates = calculateCoordinates(inputs),
): StructuralIndicators {
  const safe = clampInputs(inputs);

  return {
    materialAbundance: clamp(
      0.65 * safe.automation + 0.35 * safe.universalAccess,
    ),
    sharedProsperity: clamp(coordinates.sharedBenefit),
    personalAutonomy: clamp(
      0.35 * safe.civilLiberties +
        0.25 * safe.openInfrastructure +
        0.25 * safe.universalAccess +
        0.15 * safe.workerPower,
    ),
    politicalSecurity: clamp(
      0.45 * safe.democracy +
        0.35 * safe.civilLiberties +
        0.2 * safe.workerPower,
    ),
    freedomFromCompulsoryWork: clamp(
      safe.automation * (0.25 + 0.75 * (coordinates.sharedBenefit / 100)),
    ),
  };
}

export function calculateAxisContributions(
  inputs: FutureInputs,
  axis: AxisName,
): AxisContribution[] {
  const safe = clampInputs(inputs);
  const weights =
    axis === "sharedBenefit" ? sharedBenefitWeights : publicAgencyWeights;
  const entries = Object.entries(weights) as Array<[AxisInputKey, number]>;

  return entries
    .map(([key, weight]) => {
      const contribution = weight * (safe[key] - 50);

      return {
        axis,
        key,
        value: safe[key],
        contribution,
        magnitude: Math.abs(contribution),
        direction:
          contribution > 0.001
            ? ("higher" as const)
            : contribution < -0.001
              ? ("lower" as const)
              : ("neutral" as const),
      };
    })
    .sort((first, second) => {
      const magnitudeDifference = second.magnitude - first.magnitude;

      return Math.abs(magnitudeDifference) > Number.EPSILON
        ? magnitudeDifference
        : entries.findIndex(([key]) => key === first.key) -
            entries.findIndex(([key]) => key === second.key);
    })
    .slice(0, 2);
}

export function evaluateFuture(inputs: FutureInputs): FutureEvaluation {
  const safe = clampInputs(inputs);
  const coordinates = calculateCoordinates(safe);
  const rankedMatches = rankArchetypes(coordinates);
  const primary = rankedMatches[0];
  const secondary = rankedMatches[1];

  if (!primary || !secondary) {
    throw new Error("At least two archetypes are required for matching.");
  }

  const classification = classifyMatch(primary.distance, secondary.distance);

  return {
    inputs: safe,
    coordinates,
    match: {
      primary,
      secondary,
      ...classification,
    },
    rankedMatches,
    indicators: calculateIndicators(safe, coordinates),
    sharedBenefitDrivers: calculateAxisContributions(safe, "sharedBenefit"),
    publicAgencyDrivers: calculateAxisContributions(safe, "publicAgency"),
    tailRisk: evaluateExtremeTailRisk(safe, coordinates),
  };
}
