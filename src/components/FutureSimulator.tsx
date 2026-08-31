import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { businessAsUsual } from "../data/presets";
import { scenarioById } from "../data/scenarios";
import {
  clamp,
  evaluateFuture,
  inputKeys,
  type FutureInputs,
  type SliderKey,
} from "../lib/futureModel";
import { buildShareUrl, parseState } from "../lib/shareState";
import { FutureSpectrum } from "./FutureSpectrum";
import styles from "./FutureSimulator.module.css";
import { OutcomeDetails, OutcomePanel } from "./OutcomePanel";
import { SimulatorControls } from "./SimulatorControls";

const TRANSITION_DURATION = 260;

export default function FutureSimulator() {
  const [inputs, setInputs] = useState<FutureInputs>({ ...businessAsUsual });
  const [hasHydrated, setHasHydrated] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const animationFrame = useRef<number | null>(null);
  const evaluation = useMemo(() => evaluateFuture(inputs), [inputs]);
  const scenario = scenarioById[evaluation.scenarioId];

  const cancelAnimation = useCallback(() => {
    if (animationFrame.current !== null) {
      window.cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }
  }, []);

  const applyInputs = useCallback(
    (target: FutureInputs) => {
      cancelAnimation();
      const safeTarget = Object.fromEntries(
        inputKeys.map((key) => [key, Math.round(clamp(target[key]))]),
      ) as unknown as FutureInputs;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        setInputs(safeTarget);
        return;
      }

      const startingInputs = { ...inputs };
      const startedAt = performance.now();
      const animate = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / TRANSITION_DURATION);
        const eased = 1 - Math.pow(1 - progress, 3);
        const next = Object.fromEntries(
          inputKeys.map((key) => [
            key,
            Math.round(
              startingInputs[key] +
                (safeTarget[key] - startingInputs[key]) * eased,
            ),
          ]),
        ) as unknown as FutureInputs;

        setInputs(next);
        if (progress < 1) {
          animationFrame.current = window.requestAnimationFrame(animate);
        } else {
          animationFrame.current = null;
        }
      };

      animationFrame.current = window.requestAnimationFrame(animate);
    },
    [cancelAnimation, inputs],
  );

  const changeInput = useCallback(
    (key: SliderKey, value: number) => {
      cancelAnimation();
      setInputs((current) => ({ ...current, [key]: Math.round(clamp(value)) }));
    },
    [cancelAnimation],
  );

  useEffect(() => {
    setInputs(parseState(window.location.search, businessAsUsual));
    setHasHydrated(true);
    return cancelAnimation;
  }, [cancelAnimation]);

  useEffect(() => {
    if (!hasHydrated) return;

    const shareUrl = buildShareUrl(window.location.href, inputs);
    document.documentElement.style.setProperty(
      "--active-accent",
      scenario.accent.color,
    );
    document.documentElement.style.setProperty(
      "--active-soft",
      scenario.accent.soft,
    );
    document.documentElement.style.setProperty(
      "--active-ink",
      scenario.accent.ink,
    );
    document.documentElement.dataset.scenario = scenario.id;
    window.dispatchEvent(
      new CustomEvent("abundance:statechange", {
        detail: { scenarioId: scenario.id, url: shareUrl },
      }),
    );

    const urlTimer = window.setTimeout(() => {
      const browserUrl = new URL(shareUrl);
      browserUrl.hash = window.location.hash;
      window.history.replaceState(null, "", browserUrl);
    }, 220);
    const announcementTimer = window.setTimeout(() => {
      setAnnouncement(`Current illustrative outcome: ${scenario.name}.`);
    }, 360);

    return () => {
      window.clearTimeout(urlTimer);
      window.clearTimeout(announcementTimer);
    };
  }, [hasHydrated, inputs, scenario]);

  const themeStyle = {
    "--scenario-accent": scenario.accent.color,
    "--scenario-soft": scenario.accent.soft,
    "--scenario-ink": scenario.accent.ink,
  } as React.CSSProperties;

  return (
    <div
      className={styles.simulator}
      data-active-scenario={scenario.id}
      style={themeStyle}
    >
      <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
      <div className={styles.simulatorGrid}>
        <SimulatorControls
          inputs={inputs}
          onChange={changeInput}
          onReset={() => applyInputs(businessAsUsual)}
        />
        <section
          className={styles.outcome}
          aria-label="Current simulated outcome"
        >
          <FutureSpectrum
            outcomePosition={evaluation.outcomePosition}
            scenarioId={scenario.id}
            onSelect={applyInputs}
          />
          <OutcomePanel scenario={scenario} evaluation={evaluation} />
        </section>
      </div>
      <div className={styles.outcomeDetailsSlot}>
        <OutcomeDetails scenario={scenario} />
      </div>
    </div>
  );
}
