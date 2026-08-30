import { describe, expect, it } from "vitest";

import { businessAsUsual, presets } from "../data/presets";
import {
  calculateOutcomePosition,
  clampInputs,
  rankCounterfactualLevers,
  satisfiesEliminationistGuard,
  selectScenario,
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

describe("future scoring model", () => {
  it("maps high automation and strong institutions to a positive scenario", () => {
    const inputs = {
      ...neutral,
      automation: 95,
      ownership: 90,
      workerPower: 90,
      socialDividend: 90,
      democracy: 90,
      civilLiberties: 90,
      universalAccess: 90,
      openInfrastructure: 90,
    };

    expect(selectScenario(inputs)).toBe("optional-work-abundance");
  });

  it("maps high automation and comprehensively weak institutions to the guarded severe tail", () => {
    const inputs: FutureInputs = {
      automation: 95,
      ownership: 5,
      workerPower: 5,
      socialDividend: 5,
      democracy: 5,
      civilLiberties: 5,
      universalAccess: 5,
      openInfrastructure: 5,
    };

    expect(satisfiesEliminationistGuard(inputs)).toBe(true);
    expect(selectScenario(inputs)).toBe("eliminationist-regime");
  });

  it("does not let high automation alone determine whether the outcome is positive or negative", () => {
    const highAutomation = { ...neutral, automation: 100 };
    const strong = {
      ...highAutomation,
      ownership: 90,
      workerPower: 90,
      socialDividend: 90,
      democracy: 90,
      civilLiberties: 90,
      universalAccess: 90,
      openInfrastructure: 90,
    };
    const weak = {
      ...highAutomation,
      ownership: 20,
      workerPower: 20,
      socialDividend: 20,
      democracy: 20,
      civilLiberties: 20,
      universalAccess: 20,
      openInfrastructure: 20,
    };

    expect(selectScenario(highAutomation)).toBe("unequal-abundance");
    expect(calculateOutcomePosition(strong)).toBeGreaterThan(88);
    expect(calculateOutcomePosition(weak)).toBeLessThan(24);
  });

  it("compresses low-automation outcomes away from both extremes", () => {
    const strongLowAutomation = {
      ...neutral,
      automation: 0,
      ownership: 100,
      workerPower: 100,
      socialDividend: 100,
      democracy: 100,
      civilLiberties: 100,
      universalAccess: 100,
      openInfrastructure: 100,
    };
    const weakLowAutomation = {
      ...strongLowAutomation,
      ownership: 0,
      workerPower: 0,
      socialDividend: 0,
      democracy: 0,
      civilLiberties: 0,
      universalAccess: 0,
      openInfrastructure: 0,
    };

    expect(calculateOutcomePosition(strongLowAutomation)).toBeCloseTo(77.5);
    expect(calculateOutcomePosition(weakLowAutomation)).toBeCloseTo(22.5);
    expect(selectScenario(strongLowAutomation)).not.toBe(
      "optional-work-abundance",
    );
    expect(selectScenario(weakLowAutomation)).not.toBe("eliminationist-regime");
  });

  it("requires every tail-risk guard before selecting Eliminationist Regime", () => {
    const guarded: FutureInputs = {
      automation: 95,
      ownership: 8,
      workerPower: 8,
      socialDividend: 8,
      democracy: 8,
      civilLiberties: 8,
      universalAccess: 10,
      openInfrastructure: 8,
    };

    expect(selectScenario(guarded)).toBe("eliminationist-regime");

    const guardBreaks: Array<[keyof FutureInputs, number]> = [
      ["automation", 84],
      ["ownership", 13],
      ["workerPower", 16],
      ["socialDividend", 16],
      ["democracy", 13],
      ["civilLiberties", 13],
    ];

    guardBreaks.forEach(([key, value]) => {
      expect(selectScenario({ ...guarded, [key]: value })).toBe(
        "authoritarian-exclusion",
      );
    });
  });

  it("clamps inputs below zero and above one hundred", () => {
    const clamped = clampInputs({
      ...neutral,
      automation: 500,
      ownership: -20,
    });

    expect(clamped.automation).toBe(100);
    expect(clamped.ownership).toBe(0);
    expect(calculateOutcomePosition(clamped)).toBeGreaterThanOrEqual(0);
    expect(calculateOutcomePosition(clamped)).toBeLessThanOrEqual(100);
  });

  it("maps the supplied presets to their expected broad scenarios", () => {
    const expected = new Map([
      ["democratic-abundance", "optional-work-abundance"],
      ["social-market-automation", "broad-productivity-boom"],
      ["business-as-usual", "unequal-abundance"],
      ["corporate-oligarchy", "authoritarian-exclusion"],
      ["automated-authoritarianism", "eliminationist-regime"],
    ]);

    presets.forEach((preset) => {
      expect(selectScenario(preset.values)).toBe(expected.get(preset.id));
    });
  });

  it("ranks equal-sized counterfactuals consistently by model weight", () => {
    const levers = rankCounterfactualLevers({ ...neutral, automation: 80 });

    expect(levers[0]?.key).toBe("ownership");
    expect(levers[1]?.key).toBe("democracy");
    expect(levers[0]?.improvement).toBeGreaterThan(levers[1]?.improvement ?? 0);
  });
});

describe("share state", () => {
  it("ignores invalid URL values, clamps finite values, and never throws", () => {
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

  it("round-trips a complete shared state", () => {
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
    expect(parseState(serialized, businessAsUsual)).toEqual(state);

    const url = buildShareUrl(
      "https://example.test/project/?old=1#methodology",
      state,
    );
    const parsedUrl = new URL(url);
    expect(parsedUrl.hash).toBe("");
    expect(parseState(parsedUrl.search, businessAsUsual)).toEqual(state);
  });
});
