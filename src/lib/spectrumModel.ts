import {
  scenarioById,
  type Scenario,
  type ScenarioId,
} from "../data/scenarios";
import { clamp } from "./futureModel";

const DISPLAY_POSITION_INSET = 0.5;

/**
 * Keeps the visual marker inside the scenario selected by the guarded model.
 * The raw model score remains unchanged and available on the evaluation.
 */
export function calculateDisplayPosition(
  rawPosition: number,
  scenarioId: ScenarioId,
): number {
  const scenario = scenarioById[scenarioId] as Scenario | undefined;

  if (!scenario) return clamp(rawPosition);

  const minimum = scenario.minimum + DISPLAY_POSITION_INSET;
  const maximum = scenario.maximum - DISPLAY_POSITION_INSET;

  return clamp(rawPosition, minimum, maximum);
}
