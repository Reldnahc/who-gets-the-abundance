import { presets } from "../data/presets";
import {
  inputKeys,
  type FutureInputs,
  type SliderKey,
} from "../lib/futureModel";
import styles from "./FutureSimulator.module.css";

interface InputDefinition {
  key: SliderKey;
  label: string;
  left: string;
  right: string;
  description: string;
}

const inputDefinitions: readonly InputDefinition[] = [
  {
    key: "automation",
    label: "Automation Capability",
    left: "Assistive tools",
    right: "Near-total automation",
    description:
      "How much economically useful work can automated systems perform without continuous human labor? Capability raises the stakes but has no built-in social direction.",
  },
  {
    key: "ownership",
    label: "Distributed Ownership",
    left: "Owned by a tiny class",
    right: "Broadly distributed ownership",
    description:
      "How widely are claims on automated firms, infrastructure, land, data, and investment returns distributed?",
  },
  {
    key: "workerPower",
    label: "Worker and Citizen Power",
    left: "Negligible bargaining power",
    right: "Strong bargaining institutions",
    description:
      "How much practical leverage do workers and citizens have through organizing, participation, negotiation, and credible alternatives?",
  },
  {
    key: "socialDividend",
    label: "Social Dividend",
    left: "Productivity gains privately captured",
    right: "Strong public dividend and redistribution",
    description:
      "How much of the productivity gain returns to the public through dividends, services, transfers, or other shared claims?",
  },
  {
    key: "democracy",
    label: "Democratic Accountability",
    left: "Authoritarian control",
    right: "Strong democratic accountability",
    description:
      "Can people contest decisions, replace leaders, audit powerful systems, and shape the rules that govern automation?",
  },
  {
    key: "civilLiberties",
    label: "Civil Liberties",
    left: "Pervasive surveillance and coercion",
    right: "Strong privacy and civil-liberties protections",
    description:
      "How strongly do privacy, expression, association, due process, and protection from coercive surveillance operate in practice?",
  },
  {
    key: "universalAccess",
    label: "Universal Access",
    left: "Scarce and conditional necessities",
    right: "Abundant universal access",
    description:
      "How reliably can everyone access housing, healthcare, education, food, energy, compute, and the other foundations of participation?",
  },
  {
    key: "openInfrastructure",
    label: "Open and Competitive Infrastructure",
    left: "Monopoly control",
    right: "Open, interoperable, and competitive systems",
    description:
      "Can people, firms, public bodies, and communities switch providers, interoperate, and build without permission from a single gatekeeper?",
  },
];

interface SimulatorControlsProps {
  inputs: FutureInputs;
  onChange: (key: SliderKey, value: number) => void;
  onApply: (inputs: FutureInputs) => void;
  onReset: () => void;
}

function statesMatch(first: FutureInputs, second: FutureInputs): boolean {
  return inputKeys.every((key) => first[key] === second[key]);
}

function qualitativeLevel(key: SliderKey, value: number): string {
  if (key === "automation") {
    if (value < 20) return "Assistive";
    if (value < 40) return "Limited";
    if (value < 60) return "Transformative";
    if (value < 80) return "Extensive";
    return "Near-total";
  }

  if (value < 20) return "Very weak";
  if (value < 40) return "Weak";
  if (value < 60) return "Mixed";
  if (value < 80) return "Strong";
  return "Very strong";
}

export function SimulatorControls({
  inputs,
  onChange,
  onApply,
  onReset,
}: SimulatorControlsProps) {
  const activePreset = presets.find((preset) =>
    statesMatch(inputs, preset.values),
  )?.id;

  return (
    <aside className={styles.controls} aria-labelledby="controls-heading">
      <div className={styles.controlsIntro}>
        <p className={styles.eyebrow}>Your assumptions</p>
        <h2 id="controls-heading">Shape the institutional setting</h2>
        <p>
          Move right to strengthen a broadly protective institution. Automation
          is different: it changes how consequential the other choices become.
        </p>
      </div>

      <fieldset className={styles.presetGroup}>
        <legend>Starting configurations</legend>
        <div className={styles.presetList}>
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              aria-pressed={activePreset === preset.id}
              className={styles.presetButton}
              onClick={() => onApply(preset.values)}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </fieldset>

      <div className={styles.controlList}>
        {inputDefinitions.map((definition, index) => {
          const value = inputs[definition.key];
          const controlId = `simulator-${definition.key}`;
          const descriptionId = `${controlId}-description`;
          return (
            <div className={styles.control} key={definition.key}>
              <div className={styles.controlLabelRow}>
                <label htmlFor={controlId}>
                  <span className={styles.controlNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {definition.label}
                </label>
                <output htmlFor={controlId} className={styles.controlValue}>
                  <strong>{value}</strong>
                  <span>{qualitativeLevel(definition.key, value)}</span>
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
                aria-valuetext={`${value} out of 100, ${qualitativeLevel(definition.key, value)}`}
                style={{ "--range-fill": `${value}%` } as React.CSSProperties}
                onChange={(event) =>
                  onChange(definition.key, Number(event.currentTarget.value))
                }
              />
              <div className={styles.endpoints} aria-hidden="true">
                <span>{definition.left}</span>
                <span>{definition.right}</span>
              </div>
              <p id={descriptionId} className={styles.controlDescription}>
                {definition.description}
              </p>
            </div>
          );
        })}
      </div>

      <button type="button" className={styles.resetButton} onClick={onReset}>
        <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
          <path
            d="M4.7 7.8A8 8 0 1 1 4 14h2.1a6 6 0 1 0 1.4-4.6L10 12H3V5l1.7 2.8Z"
            fill="currentColor"
          />
        </svg>
        Reset <span>to Business as Usual</span>
      </button>
    </aside>
  );
}
