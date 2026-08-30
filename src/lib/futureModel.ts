import type { ScenarioId } from "../data/scenarios";

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
export type ProtectiveKey = Exclude<SliderKey, "automation">;
export type FutureInputs = Record<SliderKey, number>;

export interface StructuralIndicators {
  materialAbundance: number;
  sharedProsperity: number;
  personalAutonomy: number;
  politicalSecurity: number;
  freedomFromCompulsoryWork: number;
}

export interface Contribution {
  key: ProtectiveKey;
  value: number;
  contribution: number;
  magnitude: number;
  direction: "protective" | "risk" | "neutral";
}

export interface LeverResult {
  key: ProtectiveKey;
  before: number;
  after: number;
  improvement: number;
}

export interface FutureEvaluation {
  inputs: FutureInputs;
  institutionalCapacity: number;
  automationAmplifier: number;
  outcomePosition: number;
  scenarioId: ScenarioId;
  indicators: StructuralIndicators;
  protectiveForces: Contribution[];
  riskForces: Contribution[];
  levers: LeverResult[];
}

export const institutionalWeights: Readonly<Record<ProtectiveKey, number>> = {
  ownership: 0.21,
  democracy: 0.18,
  socialDividend: 0.16,
  workerPower: 0.13,
  civilLiberties: 0.13,
  universalAccess: 0.11,
  openInfrastructure: 0.08,
};

export const protectiveKeys = Object.keys(
  institutionalWeights,
) as ProtectiveKey[];

export function clamp(value: number, minimum = 0, maximum = 100): number {
  if (!Number.isFinite(value)) return minimum;
  return Math.min(maximum, Math.max(minimum, value));
}

export function clampInputs(inputs: FutureInputs): FutureInputs {
  return Object.fromEntries(
    inputKeys.map((key) => [key, clamp(inputs[key])]),
  ) as unknown as FutureInputs;
}

export function calculateInstitutionalCapacity(inputs: FutureInputs): number {
  const safe = clampInputs(inputs);

  return protectiveKeys.reduce(
    (sum, key) => sum + safe[key] * institutionalWeights[key],
    0,
  );
}

export function calculateAutomationAmplifier(automation: number): number {
  return 0.55 + 0.9 * (clamp(automation) / 100);
}

export function calculateOutcomePosition(inputs: FutureInputs): number {
  const safe = clampInputs(inputs);
  const institutionalCapacity = calculateInstitutionalCapacity(safe);
  const automationAmplifier = calculateAutomationAmplifier(safe.automation);

  return clamp(50 + (institutionalCapacity - 50) * automationAmplifier);
}

export function satisfiesEliminationistGuard(inputs: FutureInputs): boolean {
  const safe = clampInputs(inputs);

  return (
    safe.automation >= 85 &&
    safe.ownership <= 12 &&
    safe.democracy <= 12 &&
    safe.civilLiberties <= 12 &&
    safe.socialDividend <= 15 &&
    safe.workerPower <= 15 &&
    calculateOutcomePosition(safe) < 12
  );
}

export function selectScenario(inputs: FutureInputs): ScenarioId {
  const safe = clampInputs(inputs);
  const position = calculateOutcomePosition(safe);

  if (position >= 88) return "optional-work-abundance";
  if (position >= 74) return "shared-prosperity";
  if (position >= 61) return "broad-productivity-boom";
  if (position >= 48) return "unequal-abundance";
  if (position >= 36) return "corporate-dependency";
  if (position >= 24) return "automated-neo-feudalism";
  if (position >= 12) return "authoritarian-exclusion";

  return satisfiesEliminationistGuard(safe)
    ? "eliminationist-regime"
    : "authoritarian-exclusion";
}

export function calculateIndicators(
  inputs: FutureInputs,
): StructuralIndicators {
  const safe = clampInputs(inputs);

  return {
    materialAbundance: clamp(
      safe.automation * 0.65 + safe.universalAccess * 0.35,
    ),
    sharedProsperity: clamp(
      safe.ownership * 0.4 +
        safe.socialDividend * 0.25 +
        safe.workerPower * 0.2 +
        safe.universalAccess * 0.15,
    ),
    personalAutonomy: clamp(
      safe.democracy * 0.35 +
        safe.civilLiberties * 0.3 +
        safe.workerPower * 0.2 +
        safe.universalAccess * 0.15,
    ),
    politicalSecurity: clamp(
      safe.democracy * 0.55 + safe.civilLiberties * 0.3 + safe.ownership * 0.15,
    ),
    freedomFromCompulsoryWork: clamp(
      safe.automation *
        (0.3 +
          0.7 *
            ((safe.ownership + safe.socialDividend + safe.universalAccess) /
              300)),
    ),
  };
}

export function calculateContributions(inputs: FutureInputs): Contribution[] {
  const safe = clampInputs(inputs);
  const amplifier = calculateAutomationAmplifier(safe.automation);

  return protectiveKeys.map((key) => {
    const contribution =
      institutionalWeights[key] * (safe[key] - 50) * amplifier;
    const direction =
      contribution > 0.001
        ? "protective"
        : contribution < -0.001
          ? "risk"
          : "neutral";

    return {
      key,
      value: safe[key],
      contribution,
      magnitude: Math.abs(contribution),
      direction,
    };
  });
}

export function rankCounterfactualLevers(inputs: FutureInputs): LeverResult[] {
  const safe = clampInputs(inputs);
  const baseline = calculateOutcomePosition(safe);

  return protectiveKeys
    .map((key) => {
      const after = clamp(safe[key] + 20);
      const changed = { ...safe, [key]: after };

      return {
        key,
        before: safe[key],
        after,
        improvement: calculateOutcomePosition(changed) - baseline,
      };
    })
    .sort((first, second) => {
      const difference = second.improvement - first.improvement;
      return Math.abs(difference) > Number.EPSILON
        ? difference
        : protectiveKeys.indexOf(first.key) -
            protectiveKeys.indexOf(second.key);
    });
}

export function evaluateFuture(inputs: FutureInputs): FutureEvaluation {
  const safe = clampInputs(inputs);
  const contributions = calculateContributions(safe);

  return {
    inputs: safe,
    institutionalCapacity: calculateInstitutionalCapacity(safe),
    automationAmplifier: calculateAutomationAmplifier(safe.automation),
    outcomePosition: calculateOutcomePosition(safe),
    scenarioId: selectScenario(safe),
    indicators: calculateIndicators(safe),
    protectiveForces: contributions
      .filter((item) => item.direction === "protective")
      .sort((first, second) => second.magnitude - first.magnitude)
      .slice(0, 3),
    riskForces: contributions
      .filter((item) => item.direction === "risk")
      .sort((first, second) => second.magnitude - first.magnitude)
      .slice(0, 3),
    levers: rankCounterfactualLevers(safe),
  };
}
