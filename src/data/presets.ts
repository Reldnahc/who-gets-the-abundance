import type { FutureInputs } from "../lib/futureModel";
import type { ArchetypeId } from "./scenarios";

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

export const scenarioExamples: Record<ArchetypeId, FutureInputs> = {
  "authoritarian-exclusion": {
    automation: 90,
    ownership: 20,
    workerPower: 15,
    socialDividend: 20,
    democracy: 12,
    civilLiberties: 12,
    universalAccess: 25,
    openInfrastructure: 15,
  },
  "automated-neo-feudalism": {
    automation: 90,
    ownership: 15,
    workerPower: 25,
    socialDividend: 25,
    democracy: 55,
    civilLiberties: 55,
    universalAccess: 35,
    openInfrastructure: 25,
  },
  "corporate-dependency": {
    automation: 85,
    ownership: 25,
    workerPower: 25,
    socialDividend: 65,
    democracy: 40,
    civilLiberties: 45,
    universalAccess: 70,
    openInfrastructure: 20,
  },
  "administered-abundance": {
    automation: 90,
    ownership: 55,
    workerPower: 20,
    socialDividend: 90,
    democracy: 20,
    civilLiberties: 20,
    universalAccess: 95,
    openInfrastructure: 25,
  },
  "unequal-abundance": {
    automation: 80,
    ownership: 25,
    workerPower: 45,
    socialDividend: 32,
    democracy: 78,
    civilLiberties: 80,
    universalAccess: 55,
    openInfrastructure: 55,
  },
  "broad-productivity-boom": {
    automation: 62,
    ownership: 50,
    workerPower: 65,
    socialDividend: 58,
    democracy: 82,
    civilLiberties: 82,
    universalAccess: 65,
    openInfrastructure: 72,
  },
  "shared-prosperity": {
    automation: 80,
    ownership: 75,
    workerPower: 75,
    socialDividend: 80,
    democracy: 85,
    civilLiberties: 85,
    universalAccess: 80,
    openInfrastructure: 75,
  },
  "optional-work-abundance": {
    automation: 95,
    ownership: 90,
    workerPower: 85,
    socialDividend: 95,
    democracy: 90,
    civilLiberties: 95,
    universalAccess: 95,
    openInfrastructure: 85,
  },
};

export const sameCapabilityPresets: readonly SimulatorPreset[] = [
  {
    id: "exclusion",
    name: "Exclusion",
    values: scenarioExamples["authoritarian-exclusion"],
  },
  {
    id: "dependency",
    name: "Dependency",
    values: {
      ...scenarioExamples["corporate-dependency"],
      automation: 90,
    },
  },
  {
    id: "unequal-pluralism",
    name: "Unequal pluralism",
    values: {
      ...scenarioExamples["unequal-abundance"],
      automation: 90,
    },
  },
  {
    id: "shared-abundance",
    name: "Shared abundance",
    values: {
      ...scenarioExamples["shared-prosperity"],
      automation: 90,
    },
  },
];

export const tailRiskExample: FutureInputs = {
  automation: 95,
  ownership: 5,
  workerPower: 6,
  socialDividend: 6,
  democracy: 5,
  civilLiberties: 5,
  universalAccess: 18,
  openInfrastructure: 6,
};
