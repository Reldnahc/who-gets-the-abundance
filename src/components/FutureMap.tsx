import { scenarioExamples } from "../data/presets";
import { archetypeById, archetypes, type Archetype } from "../data/scenarios";
import type { FutureEvaluation, FutureInputs } from "../lib/futureModel";
import styles from "./FutureSimulator.module.css";

interface FutureMapProps {
  evaluation: FutureEvaluation;
  onSelect: (inputs: FutureInputs) => void;
}

function pointCode(name: string): string {
  return name
    .split(/[-\s]+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function currentLabelClass(anchor: Archetype["labelAnchor"]): string {
  if (anchor === "aboveRight") return styles.currentLabelBelowRight ?? "";
  if (anchor === "aboveLeft") return styles.currentLabelBelowLeft ?? "";
  if (anchor === "belowRight") return styles.currentLabelAboveRight ?? "";
  return styles.currentLabelAboveLeft ?? "";
}

function formatNames(names: string[]): string {
  if (names.length <= 1) return names[0] ?? "";
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names.at(-1)}`;
}

export function FutureMap({ evaluation, onSelect }: FutureMapProps) {
  const { coordinates, match } = evaluation;
  const automation = Math.round(coordinates.automation);
  const primaryArchetype = archetypeById[match.primary.scenarioId];
  const nearbyIds = new Set(match.nearby.map((item) => item.scenarioId));
  const nearbyNames = match.nearby.map(
    (item) => archetypeById[item.scenarioId].name,
  );

  return (
    <section className={styles.futureMap} aria-labelledby="map-heading">
      <header className={styles.mapHeader}>
        <div>
          <h2 id="map-heading">Map of possible futures</h2>
          <p>These are nearby archetypes, not steps from worst to best.</p>
        </div>
      </header>

      <div className={styles.mapPlotShell}>
        <span className={styles.mapYTitle}>Who can shape the rules?</span>
        <div className={styles.mapYScale} aria-hidden="true">
          <span className={styles.mapYHigh} aria-hidden="true">
            Contestable / autonomous
          </span>
          <span className={styles.mapYLow} aria-hidden="true">
            Managed / dependent
          </span>
        </div>
        <div className={styles.mapChart}>
          <div className={styles.mapPlot}>
            <span className={styles.mapCrosshairVertical} aria-hidden="true" />
            <span
              className={styles.mapCrosshairHorizontal}
              aria-hidden="true"
            />

            {archetypes.map((archetype) => {
              const isPrimary = archetype.id === match.primary.scenarioId;
              const isNearby = nearbyIds.has(archetype.id);

              return (
                <button
                  key={archetype.id}
                  type="button"
                  className={`${styles.mapPoint} ${styles[archetype.labelAnchor]} ${
                    isPrimary ? styles.primaryPoint : ""
                  } ${isNearby ? styles.nearbyPoint : ""}`}
                  style={
                    {
                      left: `${archetype.center.sharedBenefit}%`,
                      bottom: `${archetype.center.publicAgency}%`,
                      "--point-accent": archetype.accent.color,
                      "--point-soft": archetype.accent.soft,
                      "--point-ink": archetype.accent.ink,
                    } as React.CSSProperties
                  }
                  aria-label={`${archetype.name}. Shared benefit ${Math.round(
                    archetype.center.sharedBenefit,
                  )}, public agency ${Math.round(
                    archetype.center.publicAgency,
                  )}, automation ${Math.round(
                    archetype.center.automation,
                  )}. ${isPrimary ? "Closest archetype. " : isNearby ? "Nearby archetype. " : ""}Load representative configuration.`}
                  aria-pressed={isPrimary}
                  onClick={() => onSelect(scenarioExamples[archetype.id])}
                >
                  <span className={styles.mapPointDot} aria-hidden="true">
                    <span>{pointCode(archetype.name)}</span>
                  </span>
                  <span className={styles.mapPointLabel} aria-hidden="true">
                    <strong>{archetype.shortName}</strong>
                    {(isPrimary || isNearby) && (
                      <small>{isPrimary ? "Closest" : "Nearby"}</small>
                    )}
                  </span>
                </button>
              );
            })}

            <div
              className={`${styles.currentMapMarker} ${currentLabelClass(
                primaryArchetype.labelAnchor,
              )}`}
              style={
                {
                  "--current-x": `${coordinates.sharedBenefit}%`,
                  "--current-y": `${coordinates.publicAgency}%`,
                } as React.CSSProperties
              }
              aria-hidden="true"
            >
              <span>Current</span>
            </div>
          </div>

          <div className={styles.mapXAxis} aria-hidden="true">
            <span>Narrow capture</span>
            <strong>Who gets the gains?</strong>
            <span>Broad claims</span>
          </div>
        </div>
      </div>

      <div className={styles.mapLegend} aria-label="Archetype map key">
        {archetypes.map((archetype) => {
          const isPrimary = archetype.id === match.primary.scenarioId;
          const isNearby = nearbyIds.has(archetype.id);

          return (
            <button
              key={archetype.id}
              type="button"
              className={`${isPrimary ? styles.primaryLegend : ""} ${
                isNearby ? styles.nearbyLegend : ""
              }`}
              onClick={() => onSelect(scenarioExamples[archetype.id])}
            >
              <span
                style={{
                  backgroundColor: archetype.accent.soft,
                  borderColor: archetype.accent.color,
                  color: archetype.accent.ink,
                }}
                aria-hidden="true"
              >
                {pointCode(archetype.name)}
              </span>
              <strong>{archetype.name}</strong>
              {(isPrimary || isNearby) && (
                <small>{isPrimary ? "Closest" : "Nearby"}</small>
              )}
            </button>
          );
        })}
      </div>

      <p className={styles.srOnly}>
        Two-axis map. The horizontal axis shows who gets the gains, from narrow
        capture to broad claims. The vertical axis shows who can shape the
        rules, from managed or dependent to contestable or autonomous. Current
        coordinates are shared benefit {Math.round(coordinates.sharedBenefit)},
        public agency {Math.round(coordinates.publicAgency)}, and automation{" "}
        {automation}. The closest archetype is{" "}
        {archetypes.find((item) => item.id === match.primary.scenarioId)?.name};
        {nearbyNames.length > 0
          ? ` nearby archetypes, ordered by proximity, are ${formatNames(nearbyNames)}.`
          : ` the nearest alternative is ${archetypeById[match.secondary.scenarioId].name}.`}
      </p>
    </section>
  );
}
