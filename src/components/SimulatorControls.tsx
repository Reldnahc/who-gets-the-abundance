import { useId, useState } from "react";

import { type FutureInputs, type SliderKey } from "../lib/futureModel";
import styles from "./FutureSimulator.module.css";

interface InputDefinition {
  key: SliderKey;
  label: string;
  left: string;
  right: string;
  description: string;
}

const inputDefinitions: Record<SliderKey, InputDefinition> = {
  automation: {
    key: "automation",
    label: "Automation capability",
    left: "Assistive",
    right: "Near-total",
    description:
      "How much economically useful work automated systems can perform. Capability raises the stakes but has no built-in social direction.",
  },
  ownership: {
    key: "ownership",
    label: "Ownership of productive systems",
    left: "Narrowly held",
    right: "Broadly held",
    description:
      "How widely durable claims on automated firms, infrastructure, land, data, and investment returns are distributed.",
  },
  socialDividend: {
    key: "socialDividend",
    label: "Shared returns",
    left: "Private capture",
    right: "Social claim",
    description:
      "How much productivity returns to the public through dividends, services, transfers, wages, or other shared claims.",
  },
  universalAccess: {
    key: "universalAccess",
    label: "Access to essentials",
    left: "Conditional",
    right: "Universal",
    description:
      "How reliably everyone can access housing, healthcare, education, food, energy, compute, and other foundations of participation.",
  },
  democracy: {
    key: "democracy",
    label: "Democratic accountability",
    left: "Centralized",
    right: "Contestable",
    description:
      "Whether people can contest decisions, replace leaders, audit powerful systems, and shape the rules.",
  },
  civilLiberties: {
    key: "civilLiberties",
    label: "Civil liberties & due process",
    left: "Weak",
    right: "Protected",
    description:
      "How strongly privacy, expression, association, due process, and protection from coercion operate in practice.",
  },
  workerPower: {
    key: "workerPower",
    label: "Collective leverage",
    left: "Fragmented",
    right: "Organized",
    description:
      "How much practical leverage people have through organizing, participation, negotiation, and credible alternatives.",
  },
  openInfrastructure: {
    key: "openInfrastructure",
    label: "Infrastructure openness",
    left: "Gatekept",
    right: "Interoperable",
    description:
      "Whether people and institutions can switch providers, interoperate, inspect systems, and build without a single gatekeeper’s permission.",
  },
};

const inputGroups: ReadonlyArray<{
  label: string;
  keys: readonly SliderKey[];
}> = [
  { label: "Technology", keys: ["automation"] },
  {
    label: "Who gets the gains?",
    keys: ["ownership", "socialDividend", "universalAccess"],
  },
  {
    label: "Who can shape the rules?",
    keys: ["democracy", "civilLiberties", "workerPower", "openInfrastructure"],
  },
];

interface SimulatorControlsProps {
  inputs: FutureInputs;
  onChange: (key: SliderKey, value: number) => void;
  onReset: () => void;
}

function qualitativeLevel(key: SliderKey, value: number): string {
  if (key === "automation") {
    if (value < 20) return "Assistive";
    if (value < 40) return "Limited";
    if (value < 60) return "Transformative";
    if (value < 80) return "Extensive";
    return "Near-total";
  }

  if (value < 20) return "Very low";
  if (value < 40) return "Low";
  if (value < 60) return "Mixed";
  if (value < 80) return "High";
  return "Very high";
}

function groupId(label: string): string {
  return `control-group-${label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}

export function SimulatorControls({
  inputs,
  onChange,
  onReset,
}: SimulatorControlsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const controlsId = useId();

  return (
    <aside
      className={`${styles.controls} ${isOpen ? styles.controlsOpen : ""}`}
      aria-labelledby="controls-heading"
    >
      <div className={styles.controlsIntro}>
        <h2 id="controls-heading">Change the assumptions</h2>
        <p>
          Moving a slider changes one assumption—not a single good/bad score.
        </p>
        <button
          type="button"
          className={styles.controlsToggle}
          aria-expanded={isOpen}
          aria-controls={controlsId}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span>{isOpen ? "Hide" : "Show"}</span>
          <span className={styles.controlsChevron} aria-hidden="true">
            <svg viewBox="0 0 20 20" focusable="false">
              <path d="m5.5 7.5 4.5 4.5 4.5-4.5" />
            </svg>
          </span>
        </button>
      </div>

      <div id={controlsId} className={styles.controlsReveal}>
        <div className={styles.controlsRevealInner}>
          <div className={styles.controlGroups}>
            {inputGroups.map((group) => {
              const headingId = groupId(group.label);

              return (
                <section
                  className={styles.controlGroup}
                  aria-labelledby={headingId}
                  key={group.label}
                >
                  <h3 id={headingId}>{group.label}</h3>
                  <div className={styles.controlList}>
                    {group.keys.map((key) => {
                      const definition = inputDefinitions[key];
                      const value = inputs[key];
                      const controlId = `simulator-${key}`;
                      const descriptionId = `${controlId}-description`;

                      return (
                        <div className={styles.control} key={key}>
                          <div className={styles.controlLabelRow}>
                            <label htmlFor={controlId}>
                              {definition.label}
                            </label>
                            <output
                              htmlFor={controlId}
                              className={styles.controlValue}
                            >
                              <span>{qualitativeLevel(key, value)}</span>
                              <strong>{value}</strong>
                            </output>
                          </div>
                          <input
                            id={controlId}
                            className={styles.range}
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={value}
                            aria-describedby={descriptionId}
                            aria-valuetext={`${value} out of 100, ${qualitativeLevel(key, value)}`}
                            style={
                              {
                                "--range-fill": `${value}%`,
                              } as React.CSSProperties
                            }
                            onChange={(event) =>
                              onChange(key, Number(event.currentTarget.value))
                            }
                          />
                          <div className={styles.endpoints} aria-hidden="true">
                            <span>{definition.left}</span>
                            <span>{definition.right}</span>
                          </div>
                          <p id={descriptionId} className={styles.srOnly}>
                            {definition.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          <button
            type="button"
            className={styles.resetButton}
            onClick={onReset}
            aria-label="Reset all assumptions to Mixed Baseline"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17">
              <path
                d="M4.7 7.8A8 8 0 1 1 4 14h2.1a6 6 0 1 0 1.4-4.6L10 12H3V5l1.7 2.8Z"
                fill="currentColor"
              />
            </svg>
            Reset <span>Mixed Baseline</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
