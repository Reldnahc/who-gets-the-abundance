import { describe, expect, it } from "vitest";

import { scenarioExamples } from "../data/presets";
import { scenarioById, scenarios, type ScenarioId } from "../data/scenarios";
import {
  calculateOutcomePosition,
  satisfiesEliminationistGuard,
  selectScenario,
  type FutureInputs,
} from "./futureModel";
import { calculateDisplayPosition } from "./spectrumModel";

const failedGuardInputs: FutureInputs = {
  automation: 95,
  ownership: 8,
  workerPower: 8,
  socialDividend: 8,
  democracy: 13,
  civilLiberties: 8,
  universalAccess: 10,
  openInfrastructure: 8,
};

describe("spectrum display position", () => {
  it("keeps a guarded sub-12 result in Authoritarian Exclusion", () => {
    const rawPosition = calculateOutcomePosition(failedGuardInputs);
    const scenarioId = selectScenario(failedGuardInputs);

    expect(rawPosition).toBeLessThan(12);
    expect(satisfiesEliminationistGuard(failedGuardInputs)).toBe(false);
    expect(scenarioId).toBe("authoritarian-exclusion");

    const displayPosition = calculateDisplayPosition(rawPosition, scenarioId);
    const scenario = scenarioById[scenarioId];

    expect(displayPosition).toBeGreaterThan(scenario.minimum);
    expect(displayPosition).toBeLessThan(scenario.maximum);
  });

  it("keeps a valid Eliminationist result inside the tail-risk band", () => {
    const inputs = scenarioExamples["eliminationist-regime"];
    const rawPosition = calculateOutcomePosition(inputs);
    const scenarioId = selectScenario(inputs);

    expect(satisfiesEliminationistGuard(inputs)).toBe(true);
    expect(scenarioId).toBe("eliminationist-regime");

    const displayPosition = calculateDisplayPosition(rawPosition, scenarioId);
    const scenario = scenarioById[scenarioId];

    expect(displayPosition).toBeGreaterThan(scenario.minimum);
    expect(displayPosition).toBeLessThan(scenario.maximum);
  });

  it("places every representative configuration inside its selected band", () => {
    scenarios.forEach((scenario) => {
      const inputs = scenarioExamples[scenario.id];
      const scenarioId = selectScenario(inputs);
      const displayPosition = calculateDisplayPosition(
        calculateOutcomePosition(inputs),
        scenarioId,
      );

      expect(scenarioId).toBe(scenario.id);
      expect(displayPosition).toBeGreaterThan(scenario.minimum);
      expect(displayPosition).toBeLessThan(scenario.maximum);
    });
  });

  it("insets boundary values so they never enter neighboring bands", () => {
    scenarios.forEach((scenario) => {
      const atMinimum = calculateDisplayPosition(scenario.minimum, scenario.id);
      const atMaximum = calculateDisplayPosition(scenario.maximum, scenario.id);

      expect(atMinimum).toBeGreaterThan(scenario.minimum);
      expect(atMinimum).toBeLessThan(scenario.maximum);
      expect(atMaximum).toBeGreaterThan(scenario.minimum);
      expect(atMaximum).toBeLessThan(scenario.maximum);
    });
  });

  it("safely clamps malformed positions", () => {
    const scenarioId: ScenarioId = "shared-prosperity";
    const scenario = scenarioById[scenarioId];

    [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY].forEach(
      (value) => {
        const displayPosition = calculateDisplayPosition(value, scenarioId);

        expect(Number.isFinite(displayPosition)).toBe(true);
        expect(displayPosition).toBeGreaterThan(scenario.minimum);
        expect(displayPosition).toBeLessThan(scenario.maximum);
      },
    );
  });

  it("does not alter the raw scoring result", () => {
    const rawPosition = calculateOutcomePosition(failedGuardInputs);

    expect(rawPosition).toBeCloseTo(0);
    expect(
      calculateDisplayPosition(rawPosition, "authoritarian-exclusion"),
    ).toBeCloseTo(12.5);
    expect(calculateOutcomePosition(failedGuardInputs)).toBe(rawPosition);
  });
});
