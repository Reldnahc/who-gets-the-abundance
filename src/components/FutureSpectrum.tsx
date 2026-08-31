import { scenarioExamples } from "../data/presets";
import { scenarioById, scenarios, type ScenarioId } from "../data/scenarios";
import type { FutureInputs } from "../lib/futureModel";
import { calculateDisplayPosition } from "../lib/spectrumModel";
import styles from "./FutureSimulator.module.css";

interface FutureSpectrumProps {
  outcomePosition: number;
  scenarioId: ScenarioId;
  onSelect: (inputs: FutureInputs) => void;
}

export function FutureSpectrum({
  outcomePosition,
  scenarioId,
  onSelect,
}: FutureSpectrumProps) {
  const displayPosition = calculateDisplayPosition(outcomePosition, scenarioId);
  const markerPosition = `clamp(0.9rem, ${displayPosition}%, calc(100% - 0.9rem))`;
  const spectrumColumns = scenarios
    .map((scenario) => `${scenario.maximum - scenario.minimum}fr`)
    .join(" ");
  const selectedScenario = scenarioById[scenarioId];

  return (
    <section className={styles.spectrum} aria-labelledby="spectrum-heading">
      <h2 id="spectrum-heading" className={styles.spectrumTitle}>
        Possible futures
      </h2>

      <div className={styles.spectrumPlot}>
        <div
          className={styles.spectrumMarker}
          style={{ left: markerPosition }}
          aria-hidden="true"
        >
          <span>Current</span>
        </div>
        <div
          className={styles.spectrumTrack}
          style={{ gridTemplateColumns: spectrumColumns }}
          aria-hidden="true"
        >
          {scenarios.map((scenario) => (
            <span
              key={scenario.id}
              style={{ backgroundColor: scenario.accent.color }}
            />
          ))}
        </div>
        <div
          className={styles.spectrumSegments}
          style={{ gridTemplateColumns: spectrumColumns }}
          role="group"
          aria-label="Try a representative scenario"
        >
          {scenarios.map((scenario, index) => {
            const current = scenario.id === scenarioId;
            return (
              <button
                key={scenario.id}
                type="button"
                className={`${styles.spectrumSegment} ${
                  current ? styles.currentSegment : ""
                }`}
                aria-pressed={current}
                onClick={() => onSelect(scenarioExamples[scenario.id])}
              >
                <span className={styles.segmentIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.segmentLong} aria-hidden="true">
                  {scenario.name}
                </span>
                <span className={styles.segmentShort} aria-hidden="true">
                  {scenario.shortName}
                </span>
                <span className={styles.srOnly}>
                  {scenario.name}. Try a representative configuration.{" "}
                  {scenario.range}.
                </span>
              </button>
            );
          })}
        </div>
        <div className={styles.spectrumEndpoints} aria-hidden="true">
          <span>Concentrated power</span>
          <span>Broadly shared power</span>
        </div>
        <p className={styles.spectrumSelection}>
          <span>Selected future:</span> {selectedScenario.name}
        </p>
      </div>
    </section>
  );
}
