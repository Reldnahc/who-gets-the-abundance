import type { StructuralIndicators } from "../lib/futureModel";
import styles from "./FutureSimulator.module.css";

const indicatorDefinitions: ReadonlyArray<{
  key: keyof StructuralIndicators;
  label: string;
}> = [
  { key: "materialAbundance", label: "Material abundance" },
  { key: "sharedProsperity", label: "Shared prosperity" },
  { key: "personalAutonomy", label: "Personal autonomy" },
  { key: "politicalSecurity", label: "Political security" },
  { key: "freedomFromCompulsoryWork", label: "Freedom from compulsory work" },
];

interface IndicatorBarsProps {
  indicators: StructuralIndicators;
}

function level(value: number): string {
  if (value < 20) return "Very low";
  if (value < 40) return "Low";
  if (value < 60) return "Mixed";
  if (value < 80) return "High";
  return "Very high";
}

export function IndicatorBars({ indicators }: IndicatorBarsProps) {
  return (
    <div className={styles.indicatorList}>
      {indicatorDefinitions.map((indicator) => {
        const value = Math.round(indicators[indicator.key]);
        return (
          <div className={styles.indicator} key={indicator.key}>
            <div className={styles.indicatorLabelRow}>
              <span className={styles.indicatorLabel}>{indicator.label}</span>
              <span className={styles.indicatorValue}>
                {level(value)} <strong>{value}</strong>
              </span>
            </div>
            <div
              className={styles.indicatorTrack}
              role="meter"
              aria-label={indicator.label}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={value}
              aria-valuetext={`${level(value)}, ${value} out of 100 conceptual points`}
            >
              <span style={{ width: `${value}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
