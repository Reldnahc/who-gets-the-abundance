import { describe, expect, it } from "vitest";

import { businessAsUsual, scenarioExamples } from "../data/presets";
import { archetypeCenters, archetypeOrder } from "../data/scenarios";
import {
  calculateCoordinates,
  calculateIndicators,
  calculatePublicAgency,
  calculateSharedBenefit,
  clampInputs,
  classifyMatch,
  evaluateFuture,
  findNearbyMatches,
  rankArchetypes,
  type ArchetypeMatch,
  type FutureCoordinates,
  type FutureInputs,
} from "./futureModel";
import { buildShareUrl, parseState, serializeState } from "./shareState";

const neutral: FutureInputs = {
  automation: 50,
  ownership: 50,
  workerPower: 50,
  socialDividend: 50,
  democracy: 50,
  civilLiberties: 50,
  universalAccess: 50,
  openInfrastructure: 50,
};

describe("two-axis future model", () => {
  it("defines twelve archetypes with one representative preset each", () => {
    expect(archetypeOrder).toHaveLength(12);
    expect(Object.keys(scenarioExamples).sort()).toEqual(
      [...archetypeOrder].sort(),
    );
  });

  it("places all-50 inputs at 50 on both visible axes", () => {
    expect(calculateSharedBenefit(neutral)).toBe(50);
    expect(calculatePublicAgency(neutral)).toBe(50);
    expect(calculateCoordinates(neutral)).toEqual({
      sharedBenefit: 50,
      publicAgency: 50,
      automation: 50,
    });
  });

  it("changes shared benefit, but not public agency, for an economic input", () => {
    const changed = { ...neutral, ownership: 80 };

    expect(calculateSharedBenefit(changed)).toBe(62);
    expect(calculatePublicAgency(changed)).toBe(50);
  });

  it("changes public agency, but not shared benefit, for a power input", () => {
    const changed = { ...neutral, democracy: 80 };

    expect(calculateSharedBenefit(changed)).toBe(50);
    expect(calculatePublicAgency(changed)).toBe(59);
  });

  it("keeps both visible axes unchanged when automation changes", () => {
    const low = calculateCoordinates({ ...neutral, automation: 0 });
    const high = calculateCoordinates({ ...neutral, automation: 100 });

    expect(low.sharedBenefit).toBe(high.sharedBenefit);
    expect(low.publicAgency).toBe(high.publicAgency);
    expect(low.automation).toBe(0);
    expect(high.automation).toBe(100);
  });

  it("maps every representative configuration to its documented center and itself", () => {
    archetypeOrder.forEach((scenarioId) => {
      const evaluation = evaluateFuture(scenarioExamples[scenarioId]);
      const center = archetypeCenters[scenarioId];

      expect(evaluation.coordinates.sharedBenefit).toBeCloseTo(
        center.sharedBenefit,
      );
      expect(evaluation.coordinates.publicAgency).toBeCloseTo(
        center.publicAgency,
      );
      expect(evaluation.coordinates.automation).toBeCloseTo(center.automation);
      expect(evaluation.match.primary.scenarioId).toBe(scenarioId);
      expect(evaluation.match.primary.distance).toBeCloseTo(0);
    });
  });

  it.each([
    [
      "automation-plateau" as const,
      { sharedBenefit: 45.75, publicAgency: 64.25, automation: 30 },
    ],
    [
      "dividend-capitalism" as const,
      { sharedBenefit: 64, publicAgency: 69.5, automation: 90 },
    ],
    [
      "competitive-abundance" as const,
      { sharedBenefit: 45.5, publicAgency: 84.75, automation: 95 },
    ],
  ])(
    "selects the new %s representative at its derived center",
    (id, center) => {
      const evaluation = evaluateFuture(scenarioExamples[id]);

      expect(evaluation.coordinates).toEqual(center);
      expect(evaluation.match.primary.scenarioId).toBe(id);
      expect(evaluation.match.primary.distance).toBeCloseTo(0);
    },
  );

  it("uses automation to distinguish Plateau from a higher-capability future", () => {
    const plateauInputs = scenarioExamples["automation-plateau"];
    const plateau = evaluateFuture(plateauInputs);
    const higherAutomation = evaluateFuture({
      ...plateauInputs,
      automation: 62,
    });

    expect(plateau.match.primary.scenarioId).toBe("automation-plateau");
    expect(higherAutomation.coordinates.sharedBenefit).toBe(
      plateau.coordinates.sharedBenefit,
    );
    expect(higherAutomation.coordinates.publicAgency).toBe(
      plateau.coordinates.publicAgency,
    );
    expect(higherAutomation.match.primary.scenarioId).toBe(
      "broad-productivity-boom",
    );
  });

  it("returns finite, ascending, distinct matches with deterministic ties", () => {
    const ranking = rankArchetypes(calculateCoordinates(neutral));

    expect(ranking).toHaveLength(archetypeOrder.length);
    expect(ranking.every((match) => Number.isFinite(match.distance))).toBe(
      true,
    );
    expect(new Set(ranking.map((match) => match.scenarioId)).size).toBe(
      archetypeOrder.length,
    );
    ranking.slice(1).forEach((match, index) => {
      expect(match.distance).toBeGreaterThanOrEqual(
        ranking[index]?.distance ?? 0,
      );
    });

    const firstCenter = archetypeCenters[archetypeOrder[0]];
    const secondCenter = archetypeCenters[archetypeOrder[1]];
    const midpoint: FutureCoordinates = {
      sharedBenefit:
        (firstCenter.sharedBenefit + secondCenter.sharedBenefit) / 2,
      publicAgency: (firstCenter.publicAgency + secondCenter.publicAgency) / 2,
      automation: (firstCenter.automation + secondCenter.automation) / 2,
    };
    const tied = rankArchetypes(midpoint);

    expect(tied[0]?.distance).toBeCloseTo(tied[1]?.distance ?? -1);
    expect(tied[0]?.scenarioId).toBe(archetypeOrder[0]);
    expect(tied[1]?.scenarioId).toBe(archetypeOrder[1]);
  });

  it("classifies relation boundaries at gaps 3 and 8", () => {
    expect(classifyMatch(0, 2.999).relation).toBe("between");
    expect(classifyMatch(0, 3).relation).toBe("leaning");
    expect(classifyMatch(0, 7.999).relation).toBe("leaning");
    expect(classifyMatch(0, 8).relation).toBe("closest");
  });

  it("classifies fit quality boundaries at distances 10 and 20", () => {
    expect(classifyMatch(10, 20).fitQuality).toBe("strong");
    expect(classifyMatch(10.001, 20).fitQuality).toBe("moderate");
    expect(classifyMatch(20, 30).fitQuality).toBe("moderate");
    expect(classifyMatch(20.001, 30).fitQuality).toBe("loose");
  });

  it("returns every archetype inside the nearby-distance window", () => {
    const matches: ArchetypeMatch[] = [
      { scenarioId: "unequal-abundance", distance: 10 },
      { scenarioId: "broad-productivity-boom", distance: 11 },
      { scenarioId: "automated-neo-feudalism", distance: 17.999 },
      { scenarioId: "corporate-dependency", distance: 18 },
    ];

    expect(findNearbyMatches(matches).map((match) => match.scenarioId)).toEqual(
      ["broad-productivity-boom", "automated-neo-feudalism"],
    );
  });

  it("lets Mixed Baseline show more than one nearby archetype", () => {
    const evaluation = evaluateFuture(businessAsUsual);

    expect(evaluation.match.primary.scenarioId).toBe("unequal-abundance");
    expect(evaluation.match.secondary.scenarioId).toBe(
      "broad-productivity-boom",
    );
    expect(evaluation.match.relation).toBe("leaning");
    expect(evaluation.match.nearby.map((match) => match.scenarioId)).toEqual([
      "broad-productivity-boom",
      "corporate-dependency",
      "automation-plateau",
      "dividend-capitalism",
      "automated-neo-feudalism",
    ]);
  });

  it("ranks Eliminationist Regime as an ordinary bottom-left archetype", () => {
    const representative = scenarioExamples["eliminationist-regime"];
    const evaluation = evaluateFuture(representative);
    const formerGuardBreak = evaluateFuture({
      ...representative,
      democracy: 13,
    });

    expect(evaluation.coordinates).toEqual({
      sharedBenefit: 8.6,
      publicAgency: 5.45,
      automation: 95,
    });
    expect(evaluation.match.primary.scenarioId).toBe("eliminationist-regime");
    expect(formerGuardBreak.match.primary.scenarioId).toBe(
      "eliminationist-regime",
    );
    expect(
      evaluation.rankedMatches.some(
        (match) => match.scenarioId === "eliminationist-regime",
      ),
    ).toBe(true);
  });

  it("clamps all inputs and conceptual indicators to 0–100", () => {
    const clamped = clampInputs({
      ...neutral,
      automation: 500,
      ownership: -20,
    });
    const indicators = calculateIndicators({
      ...neutral,
      automation: 500,
      ownership: -20,
    });

    expect(clamped.automation).toBe(100);
    expect(clamped.ownership).toBe(0);
    expect(
      Object.values(indicators).every((value) => value >= 0 && value <= 100),
    ).toBe(true);
  });
});

describe("share state compatibility", () => {
  it("keeps the existing compact keys and round-trips complete state", () => {
    const state: FutureInputs = {
      automation: 91,
      ownership: 83,
      workerPower: 71,
      socialDividend: 67,
      democracy: 88,
      civilLiberties: 79,
      universalAccess: 74,
      openInfrastructure: 69,
    };

    const serialized = serializeState(state);
    expect(serialized).toBe("a=91&o=83&w=71&s=67&d=88&c=79&u=74&i=69");
    expect(parseState(serialized, businessAsUsual)).toEqual(state);

    const url = buildShareUrl(
      "https://example.test/project/?old=1#methodology",
      state,
    );
    const parsedUrl = new URL(url);
    expect(parsedUrl.hash).toBe("");
    expect(parseState(parsedUrl.search, businessAsUsual)).toEqual(state);
  });

  it("ignores invalid values, clamps finite values, and never throws", () => {
    expect(() =>
      parseState("?a=not-a-number&o=-50&w=900&c=%E0%A4%A", businessAsUsual),
    ).not.toThrow();

    const parsed = parseState(
      "?a=not-a-number&o=-50&w=900&c=%E0%A4%A",
      businessAsUsual,
    );

    expect(parsed.automation).toBe(businessAsUsual.automation);
    expect(parsed.ownership).toBe(0);
    expect(parsed.workerPower).toBe(100);
    expect(parsed.civilLiberties).toBe(businessAsUsual.civilLiberties);
  });
});
