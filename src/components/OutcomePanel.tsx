import { useId, useState } from "react";

import type { Scenario } from "../data/scenarios";
import {
  type Contribution,
  type FutureEvaluation,
  type ProtectiveKey,
} from "../lib/futureModel";
import { IndicatorBars } from "./IndicatorBars";
import styles from "./FutureSimulator.module.css";

interface OutcomePanelProps {
  scenario: Scenario;
  evaluation: FutureEvaluation;
}

const driverLabels: Record<
  ProtectiveKey,
  { protective: string; risk: string; explanation: string }
> = {
  ownership: {
    protective: "Broad ownership",
    risk: "Concentrated ownership",
    explanation: "Who holds durable claims on automated production.",
  },
  workerPower: {
    protective: "Strong bargaining power",
    risk: "Weak bargaining power",
    explanation: "How much practical leverage workers and citizens retain.",
  },
  socialDividend: {
    protective: "Shared productivity gains",
    risk: "Privately captured gains",
    explanation: "How much new output becomes shared income or services.",
  },
  democracy: {
    protective: "Democratic accountability",
    risk: "Weak democratic checks",
    explanation: "Whether powerful systems can be challenged and governed.",
  },
  civilLiberties: {
    protective: "Strong civil liberties",
    risk: "Weak civil liberties",
    explanation: "Protection from coercion, surveillance, and arbitrary power.",
  },
  universalAccess: {
    protective: "Universal access",
    risk: "Conditional necessities",
    explanation: "Whether basic security depends on work or political status.",
  },
  openInfrastructure: {
    protective: "Open infrastructure",
    risk: "Monopoly infrastructure",
    explanation:
      "Whether people can switch, interoperate, and build alternatives.",
  },
};

const tailRiskMessage =
  "Extreme tail risk. AI does not make this outcome inevitable; it requires the collapse of political, legal, economic, and civil-liberties restraints alongside near-total automation.";

function DriverChips({
  items,
  direction,
}: {
  items: Contribution[];
  direction: "protective" | "risk";
}) {
  if (items.length === 0) return null;

  return (
    <>
      {items.slice(0, 2).map((item) => (
        <span
          className={`${styles.driverChip} ${styles[direction]}`}
          key={item.key}
        >
          <span className={styles.driverArrow} aria-hidden="true">
            {direction === "protective" ? "↑" : "↓"}
          </span>
          <span className={styles.driverCopy}>
            <strong>{driverLabels[item.key][direction]}</strong>
            <small>{driverLabels[item.key].explanation}</small>
          </span>
        </span>
      ))}
    </>
  );
}

export function OutcomePanel({ scenario, evaluation }: OutcomePanelProps) {
  return (
    <div className={styles.outcomeContent}>
      <header className={styles.outcomeHeader}>
        <div>
          <h2
            className={
              scenario.id === "optional-work-abundance"
                ? styles.longOutcomeTitle
                : undefined
            }
          >
            {scenario.name}
          </h2>
          <p className={styles.outcomeSummary}>{scenario.summary}</p>
        </div>
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
        <h3 id="forces-heading">Biggest forces</h3>
        <div className={styles.driverChips}>
          <DriverChips
            items={evaluation.protectiveForces}
            direction="protective"
          />
          <DriverChips items={evaluation.riskForces} direction="risk" />
          {evaluation.protectiveForces.length === 0 &&
            evaluation.riskForces.length === 0 && (
              <span className={styles.neutralChip}>
                Institutions near neutral
              </span>
            )}
        </div>
        {evaluation.inputs.automation < 30 && (
          <p className={styles.capabilitySignal}>
            Low automation keeps the range closer to the middle.
          </p>
        )}
      </section>
    </div>
  );
}

export function OutcomeDetails({ scenario }: { scenario: Scenario }) {
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
        <span>Explore this future</span>
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
            {scenario.id === "eliminationist-regime" && (
              <p className={styles.tailRiskNote}>{tailRiskMessage}</p>
            )}
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
