import type { StructuralIndicators } from "../lib/futureModel";
import styles from "./FutureSimulator.module.css";

const indicatorDefinitions: ReadonlyArray<{
  key: keyof StructuralIndicators;
  label: string;
  description: string;
}> = [
  {
    key: "materialAbundance",
    label: "Material abundance",
    description: "Productive capability combined with practical access.",
  },
  {
    key: "sharedProsperity",
    label: "Shared prosperity",
    description:
      "How broadly ownership, income, and essential access are shared.",
  },
  {
    key: "personalAutonomy",
    label: "Personal autonomy",
    description: "Room to choose, refuse, organize, and live without coercion.",
  },
  {
    key: "politicalSecurity",
    label: "Political security",
    description: "Protection against arbitrary rule and durable exclusion.",
  },
  {
    key: "freedomFromCompulsoryWork",
    label: "Freedom from compulsory work",
    description:
      "Whether automation becomes real freedom from labor for survival.",
  },
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
              <div>
                <span className={styles.indicatorLabel}>{indicator.label}</span>
                <span className={styles.indicatorDescription}>
                  {indicator.description}
                </span>
              </div>
              <span className={styles.indicatorValue}>
                <strong>{value}</strong> / 100 · {level(value)}
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
