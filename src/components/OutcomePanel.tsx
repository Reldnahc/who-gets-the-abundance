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
  onTryLever: (key: ProtectiveKey) => void;
}

const labels: Record<ProtectiveKey, string> = {
  ownership: "Distributed ownership",
  workerPower: "Worker and citizen power",
  socialDividend: "Social dividend",
  democracy: "Democratic accountability",
  civilLiberties: "Civil liberties",
  universalAccess: "Universal access",
  openInfrastructure: "Open and competitive infrastructure",
};

const protectiveCopy: Record<ProtectiveKey, string> = {
  ownership:
    "Broad ownership gives more people a durable claim on automated production and its returns.",
  workerPower:
    "Strong bargaining institutions give workers and citizens practical leverage over deployment decisions.",
  socialDividend:
    "A strong social dividend converts part of the productivity gain into shared income and services.",
  democracy:
    "Democratic accountability keeps consequential systems open to challenge, replacement, and public rule-setting.",
  civilLiberties:
    "Strong civil-liberties protections limit coercive surveillance and preserve room to organize or dissent.",
  universalAccess:
    "Universal access makes essential security less dependent on a job, platform, or political status.",
  openInfrastructure:
    "Open infrastructure creates real alternatives to monopoly systems and makes exit more credible.",
};

const riskCopy: Record<ProtectiveKey, string> = {
  ownership:
    "Concentrated ownership lets a narrow group capture returns and govern access to productive assets.",
  workerPower:
    "Weak bargaining power leaves people with little leverage over firms that need less of their labor.",
  socialDividend:
    "Limited public claims allow rising productivity to remain private rather than becoming broad security.",
  democracy:
    "Weak accountability makes concentrated technical and political power difficult to contest.",
  civilLiberties:
    "Weak civil liberties increase the coercive potential of identification, monitoring, and automated enforcement.",
  universalAccess:
    "Conditional necessities turn employment, platform membership, or political approval into survival leverage.",
  openInfrastructure:
    "Monopoly infrastructure narrows the ability to switch, build alternatives, or resist gatekeepers.",
};

const leverPhrases: Record<ProtectiveKey, string> = {
  ownership: "broader distributed ownership",
  workerPower: "stronger worker and citizen power",
  socialDividend: "a stronger social dividend",
  democracy: "stronger democratic accountability",
  civilLiberties: "stronger civil-liberties protections",
  universalAccess: "more universal access",
  openInfrastructure: "more open and competitive infrastructure",
};

function DriverList({
  items,
  direction,
}: {
  items: Contribution[];
  direction: "protective" | "risk";
}) {
  if (items.length === 0) {
    return (
      <p className={styles.emptyDriver}>
        No {direction === "protective" ? "protective" : "risk"} force is
        currently above the model’s neutral point.
      </p>
    );
  }

  return (
    <ul className={styles.driverList}>
      {items.map((item) => (
        <li key={item.key}>
          <span className={styles.driverMark} aria-hidden="true">
            {direction === "protective" ? "+" : "−"}
          </span>
          <span>
            <strong>{labels[item.key]}</strong>
            {direction === "protective"
              ? protectiveCopy[item.key]
              : riskCopy[item.key]}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function OutcomePanel({
  scenario,
  evaluation,
  onTryLever,
}: OutcomePanelProps) {
  const leadingProtection = evaluation.protectiveForces[0];
  const leadingRisk = evaluation.riskForces[0];
  const levers = evaluation.levers.slice(0, 2);
  const leverSummary = levers.map((lever) => leverPhrases[lever.key]);

  return (
    <div className={styles.outcomeContent}>
      <header className={styles.outcomeHeader}>
        <div>
          <p className={styles.eyebrow}>Illustrative outcome</p>
          <h2>{scenario.name}</h2>
        </div>
        <span className={styles.notForecast}>
          Conceptual result · not a forecast
        </span>
      </header>

      <p className={styles.outcomeSummary}>{scenario.summary}</p>

      <section className={styles.snapshot} aria-labelledby="snapshot-heading">
        <p className={styles.sectionKicker} id="snapshot-heading">
          A fictional snapshot
        </p>
        <p>{scenario.snapshot}</p>
      </section>

      <section className={styles.whyBlock} aria-labelledby="why-heading">
        <p className={styles.sectionKicker} id="why-heading">
          Why these inputs lead here
        </p>
        <p>
          {leadingProtection && leadingRisk
            ? `${labels[leadingProtection.key]} is the strongest protective force in this configuration, while ${labels[leadingRisk.key].toLowerCase()} creates the strongest modeled vulnerability.`
            : leadingProtection
              ? `${labels[leadingProtection.key]} is the strongest protective force, with no institution set below the model’s neutral point.`
              : leadingRisk
                ? `${labels[leadingRisk.key]} is the strongest modeled vulnerability, with no institution set above the neutral point.`
                : "The institutional settings sit at the model’s neutral point, so capability alone leaves the result near the middle."}
        </p>
        {evaluation.inputs.automation > 70 && (
          <p className={styles.capabilityNote}>
            <strong>Capability magnifies structure.</strong> High automation is
            amplifying the consequences of the ownership, rights, access, and
            governance settings selected here.
          </p>
        )}
        {evaluation.inputs.automation < 30 && (
          <p className={styles.capabilityNote}>
            <strong>Capability limits the range.</strong> With automation still
            limited, both the potential abundance and the potential
            concentration of power remain closer to the middle.
          </p>
        )}
      </section>

      <section
        className={styles.analysisSection}
        aria-labelledby="indicators-heading"
      >
        <div className={styles.sectionHeadingRow}>
          <div>
            <p className={styles.sectionKicker}>Structural indicators</p>
            <h3 id="indicators-heading">What daily life could feel like</h3>
          </div>
          <p>Conceptual composites, not measured predictions.</p>
        </div>
        <IndicatorBars indicators={evaluation.indicators} />
      </section>

      <section
        className={styles.analysisSection}
        aria-labelledby="drivers-heading"
      >
        <div className={styles.sectionHeadingRow}>
          <div>
            <p className={styles.sectionKicker}>Strongest drivers</p>
            <h3 id="drivers-heading">Forces shaping this result</h3>
          </div>
          <p>Relative to a neutral setting of 50.</p>
        </div>
        <div className={styles.driverColumns}>
          <div>
            <h4>Protective forces</h4>
            <DriverList
              items={evaluation.protectiveForces}
              direction="protective"
            />
          </div>
          <div>
            <h4>Risk forces</h4>
            <DriverList items={evaluation.riskForces} direction="risk" />
          </div>
        </div>
      </section>

      <section
        className={styles.leversSection}
        aria-labelledby="levers-heading"
      >
        <div className={styles.sectionHeadingRow}>
          <div>
            <p className={styles.sectionKicker}>Most effective levers</p>
            <h3 id="levers-heading">Test a different assumption</h3>
          </div>
        </div>
        <p className={styles.leverIntro}>
          Within this model, {leverSummary[0] ?? "no remaining adjustment"}
          {leverSummary[1] ? ` and ${leverSummary[1]}` : ""} would shift the
          internal result most. This is a model sensitivity, not a real-world
          policy forecast.
        </p>
        <div className={styles.leverButtons}>
          {levers.map((lever) => (
            <button
              type="button"
              key={lever.key}
              onClick={() => onTryLever(lever.key)}
              disabled={lever.after === lever.before}
            >
              <span>
                <strong>{labels[lever.key]}</strong>
                {lever.after === lever.before
                  ? "Already at the model ceiling"
                  : `Try ${lever.before} → ${lever.after}`}
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                width="18"
                height="18"
              >
                <path
                  d="M4 10h11m-4-4 4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </section>

      <section
        className={styles.profileSection}
        aria-labelledby="profile-heading"
      >
        <div className={styles.sectionHeadingRow}>
          <div>
            <p className={styles.sectionKicker}>Institutional profile</p>
            <h3 id="profile-heading">The equilibrium behind the name</h3>
          </div>
        </div>
        <dl className={styles.profileGrid}>
          <div>
            <dt>Employment</dt>
            <dd>{scenario.employment}</dd>
          </div>
          <div>
            <dt>Ownership</dt>
            <dd>{scenario.ownership}</dd>
          </div>
          <div>
            <dt>Political structure</dt>
            <dd>{scenario.politicalStructure}</dd>
          </div>
          <div>
            <dt>Access to necessities</dt>
            <dd>{scenario.necessities}</dd>
          </div>
          <div>
            <dt>Personal autonomy</dt>
            <dd>{scenario.autonomy}</dd>
          </div>
          <div>
            <dt>Productivity and living standards</dt>
            <dd>{scenario.livingStandards}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
