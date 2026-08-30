import { scenarioExamples } from "../data/presets";
import { scenarios, type ScenarioId } from "../data/scenarios";
import type { FutureInputs } from "../lib/futureModel";
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
  const markerPosition = `clamp(0.9rem, ${outcomePosition}%, calc(100% - 0.9rem))`;

  return (
    <section className={styles.spectrum} aria-labelledby="spectrum-heading">
      <div className={styles.spectrumHeadingRow}>
        <div>
          <p className={styles.eyebrow}>Future spectrum</p>
          <h2 id="spectrum-heading" className={styles.spectrumTitle}>
            One capability, different settlements
          </h2>
        </div>
        <p className={styles.spectrumHint}>Select a label to try an example.</p>
      </div>

      <div className={styles.spectrumPlot}>
        <div
          className={styles.spectrumMarker}
          style={{ left: markerPosition }}
          aria-hidden="true"
        >
          <span>Current</span>
        </div>
        <div className={styles.spectrumTrack} aria-hidden="true">
          {scenarios.map((scenario) => (
            <span
              key={scenario.id}
              style={{ backgroundColor: scenario.accent.color }}
            />
          ))}
        </div>
        <div
          className={styles.spectrumSegments}
          role="group"
          aria-label="Scenario examples"
        >
          {scenarios.map((scenario, index) => {
            const current = scenario.id === scenarioId;
            return (
              <button
                key={scenario.id}
                type="button"
                className={`${styles.spectrumSegment} ${current ? styles.currentSegment : ""}`}
                aria-pressed={current}
                onClick={() => onSelect(scenarioExamples[scenario.id])}
              >
                <span className={styles.segmentIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.segmentLong}>{scenario.name}</span>
                <span className={styles.segmentShort}>
                  {scenario.shortName}
                </span>
                <span className={styles.srOnly}>
                  Try a representative configuration. {scenario.range}.
                </span>
              </button>
            );
          })}
        </div>
        <div className={styles.spectrumEndpoints} aria-hidden="true">
          <span>Concentrated power</span>
          <span>Broadly shared power</span>
        </div>
      </div>
    </section>
  );
}
