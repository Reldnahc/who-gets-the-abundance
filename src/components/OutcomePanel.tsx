import { useId, useState } from "react";

import type { Archetype } from "../data/scenarios";
import type {
  AxisContribution,
  AxisInputKey,
  FutureEvaluation,
  MatchRelation,
} from "../lib/futureModel";
import { IndicatorBars } from "./IndicatorBars";
import styles from "./FutureSimulator.module.css";

interface OutcomePanelProps {
  scenario: Archetype;
  secondaryScenario: Archetype;
  evaluation: FutureEvaluation;
}

const driverLabels: Record<
  AxisInputKey,
  { higher: string; lower: string; neutral: string }
> = {
  ownership: {
    higher: "Broader ownership",
    lower: "Concentrated ownership",
    neutral: "Ownership near midpoint",
  },
  socialDividend: {
    higher: "More shared returns",
    lower: "Privately captured gains",
    neutral: "Shared returns near midpoint",
  },
  universalAccess: {
    higher: "More universal access",
    lower: "Conditional access",
    neutral: "Access near midpoint",
  },
  democracy: {
    higher: "Democratic accountability",
    lower: "Centralized authority",
    neutral: "Accountability near midpoint",
  },
  civilLiberties: {
    higher: "Protected liberties",
    lower: "Weak liberties",
    neutral: "Liberties near midpoint",
  },
  workerPower: {
    higher: "Collective leverage",
    lower: "Fragmented leverage",
    neutral: "Leverage near midpoint",
  },
  openInfrastructure: {
    higher: "Open infrastructure",
    lower: "Gatekept infrastructure",
    neutral: "Openness near midpoint",
  },
};

function matchEyebrow(
  relation: MatchRelation,
  primaryName: string,
  secondaryName: string,
): string {
  if (relation === "between") {
    return `Between ${primaryName} and ${secondaryName}`;
  }

  if (relation === "leaning") return `Leans toward ${primaryName}`;
  return `Closest to ${primaryName}`;
}

function secondaryCopy(relation: MatchRelation, secondaryName: string): string {
  if (relation === "between") return `Nearly as close: ${secondaryName}`;
  if (relation === "leaning") return `Also resembles ${secondaryName}`;
  return `Also nearby ${secondaryName}`;
}

function titleCase(value: string): string {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function AxisDriverRow({
  title,
  items,
}: {
  title: string;
  items: AxisContribution[];
}) {
  return (
    <div className={styles.axisDriverRow}>
      <strong>{title}</strong>
      <div>
        {items.map((item) => (
          <span
            className={styles.axisDriver}
            data-direction={item.direction}
            key={item.key}
          >
            <span aria-hidden="true">
              {item.direction === "higher"
                ? "+"
                : item.direction === "lower"
                  ? "-"
                  : "mid"}
            </span>
            {driverLabels[item.key][item.direction]}
          </span>
        ))}
      </div>
    </div>
  );
}

export function OutcomePanel({
  scenario,
  secondaryScenario,
  evaluation,
}: OutcomePanelProps) {
  const { coordinates, match } = evaluation;

  return (
    <div className={styles.outcomeContent}>
      <header className={styles.outcomeHeader}>
        <p className={styles.matchEyebrow}>
          {matchEyebrow(match.relation, scenario.name, secondaryScenario.name)}
        </p>
        <h2 className={styles.outcomeTitle}>{scenario.name}</h2>
        <p className={styles.outcomeSummary}>{scenario.summary}</p>
        <div className={styles.matchMeta}>
          <span className={styles.secondaryMatch}>
            {secondaryCopy(match.relation, secondaryScenario.name)}
          </span>
          <span className={styles.fitQuality}>
            {titleCase(match.fitQuality)} archetype fit
          </span>
        </div>
        <dl className={styles.coordinateChips}>
          <div>
            <dt>Shared benefit</dt>
            <dd>{Math.round(coordinates.sharedBenefit)}</dd>
          </div>
          <div>
            <dt>Public agency</dt>
            <dd>{Math.round(coordinates.publicAgency)}</dd>
          </div>
          <div>
            <dt>Automation</dt>
            <dd>{Math.round(coordinates.automation)}</dd>
          </div>
        </dl>
      </header>

      <div className={styles.outcomeDashboard}>
        <section
          className={styles.glanceSection}
          aria-labelledby="glance-heading"
        >
          <h3 id="glance-heading">At a glance</h3>
          <dl className={styles.glanceList}>
            <div>
              <dt>Work</dt>
              <dd>{scenario.employment}</dd>
            </div>
            <div>
              <dt>Wealth</dt>
              <dd>{scenario.livingStandards}</dd>
            </div>
            <div>
              <dt>Power</dt>
              <dd>{scenario.politicalStructure}</dd>
            </div>
          </dl>
        </section>

        <section
          className={styles.indicatorSection}
          aria-labelledby="indicators-heading"
        >
          <h3 id="indicators-heading">Structural indicators</h3>
          <IndicatorBars indicators={evaluation.indicators} />
        </section>
      </div>

      <section
        className={styles.forcesSection}
        aria-labelledby="forces-heading"
      >
        <h3 id="forces-heading">What shapes these coordinates</h3>
        <div className={styles.axisDrivers}>
          <AxisDriverRow
            title="Who gets the gains"
            items={evaluation.sharedBenefitDrivers}
          />
          <AxisDriverRow
            title="Who can shape the rules"
            items={evaluation.publicAgencyDrivers}
          />
        </div>
      </section>
    </div>
  );
}

export function OutcomeDetails({ scenario }: { scenario: Archetype }) {
  const [isOpen, setIsOpen] = useState(false);
  const detailsId = useId();

  return (
    <section
      className={`${styles.outcomeDetails} ${isOpen ? styles.outcomeDetailsOpen : ""}`}
    >
      <button
        type="button"
        className={styles.detailsToggle}
        aria-expanded={isOpen}
        aria-controls={detailsId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>Explore this archetype</span>
        <span className={styles.detailsChevron} aria-hidden="true">
          <svg viewBox="0 0 20 20" focusable="false">
            <path d="m5.5 7.5 4.5 4.5 4.5-4.5" />
          </svg>
        </span>
      </button>
      <div
        id={detailsId}
        className={styles.detailsReveal}
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
      >
        <div className={styles.detailsRevealInner}>
          <div className={styles.outcomeDetailsBody}>
            <p className={styles.detailSnapshot}>{scenario.snapshot}</p>

            <dl className={styles.profileGrid}>
              <div>
                <dt>Work</dt>
                <dd>{scenario.employment}</dd>
              </div>
              <div>
                <dt>Ownership</dt>
                <dd>{scenario.ownership}</dd>
              </div>
              <div>
                <dt>Politics</dt>
                <dd>{scenario.politicalStructure}</dd>
              </div>
              <div>
                <dt>Necessities</dt>
                <dd>{scenario.necessities}</dd>
              </div>
              <div>
                <dt>Autonomy</dt>
                <dd>{scenario.autonomy}</dd>
              </div>
              <div>
                <dt>Living standards</dt>
                <dd>{scenario.livingStandards}</dd>
              </div>
            </dl>

            <div className={styles.movementGrid}>
              <section>
                <h3>Risks</h3>
                <ul>
                  {scenario.primaryRisks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>Toward</h3>
                <ul>
                  {scenario.toward.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>Away</h3>
                <ul>
                  {scenario.away.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
