import type { FutureInputs } from "../lib/futureModel";
import type { ScenarioId } from "./scenarios";

export interface SimulatorPreset {
  id: string;
  name: string;
  values: FutureInputs;
}

export const businessAsUsual: FutureInputs = {
  automation: 65,
  ownership: 45,
  workerPower: 40,
  socialDividend: 40,
  democracy: 65,
  civilLiberties: 65,
  universalAccess: 50,
  openInfrastructure: 45,
};

export const presets: readonly SimulatorPreset[] = [
  {
    id: "democratic-abundance",
    name: "Democratic Abundance",
    values: {
      automation: 90,
      ownership: 85,
      workerPower: 78,
      socialDividend: 82,
      democracy: 88,
      civilLiberties: 90,
      universalAccess: 82,
      openInfrastructure: 72,
    },
  },
  {
    id: "social-market-automation",
    name: "Social-Market Automation",
    values: {
      automation: 75,
      ownership: 58,
      workerPower: 62,
      socialDividend: 68,
      democracy: 78,
      civilLiberties: 82,
      universalAccess: 70,
      openInfrastructure: 65,
    },
  },
  {
    id: "business-as-usual",
    name: "Mixed Baseline",
    values: businessAsUsual,
  },
  {
    id: "corporate-oligarchy",
    name: "Corporate Oligarchy",
    values: {
      automation: 85,
      ownership: 10,
      workerPower: 15,
      socialDividend: 15,
      democracy: 40,
      civilLiberties: 35,
      universalAccess: 35,
      openInfrastructure: 10,
    },
  },
  {
    id: "automated-authoritarianism",
    name: "Automated Authoritarianism",
    values: {
      automation: 92,
      ownership: 8,
      workerPower: 5,
      socialDividend: 8,
      democracy: 8,
      civilLiberties: 5,
      universalAccess: 25,
      openInfrastructure: 8,
    },
  },
] as const;

/** Representative configurations used when a spectrum label is activated. */
export const scenarioExamples: Record<ScenarioId, FutureInputs> = {
  "eliminationist-regime": {
    automation: 95,
    ownership: 5,
    workerPower: 6,
    socialDividend: 6,
    democracy: 5,
    civilLiberties: 5,
    universalAccess: 18,
    openInfrastructure: 6,
  },
  "authoritarian-exclusion": {
    automation: 90,
    ownership: 20,
    workerPower: 18,
    socialDividend: 18,
    democracy: 16,
    civilLiberties: 18,
    universalAccess: 28,
    openInfrastructure: 18,
  },
  "automated-neo-feudalism": {
    automation: 90,
    ownership: 28,
    workerPower: 25,
    socialDividend: 30,
    democracy: 42,
    civilLiberties: 45,
    universalAccess: 40,
    openInfrastructure: 25,
  },
  "corporate-dependency": {
    automation: 82,
    ownership: 32,
    workerPower: 35,
    socialDividend: 40,
    democracy: 58,
    civilLiberties: 52,
    universalAccess: 52,
    openInfrastructure: 28,
  },
  "unequal-abundance": {
    automation: 70,
    ownership: 38,
    workerPower: 42,
    socialDividend: 45,
    democracy: 68,
    civilLiberties: 68,
    universalAccess: 58,
    openInfrastructure: 48,
  },
  "broad-productivity-boom": {
    automation: 72,
    ownership: 58,
    workerPower: 63,
    socialDividend: 60,
    democracy: 72,
    civilLiberties: 76,
    universalAccess: 65,
    openInfrastructure: 64,
  },
  "shared-prosperity": {
    automation: 80,
    ownership: 73,
    workerPower: 72,
    socialDividend: 76,
    democracy: 82,
    civilLiberties: 84,
    universalAccess: 76,
    openInfrastructure: 72,
  },
  "optional-work-abundance": {
    automation: 92,
    ownership: 90,
    workerPower: 84,
    socialDividend: 88,
    democracy: 92,
    civilLiberties: 94,
    universalAccess: 90,
    openInfrastructure: 82,
  },
};
