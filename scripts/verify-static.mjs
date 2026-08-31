import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = await readFile(path.join(root, "dist", "index.html"), "utf8");

const requiredContent = [
  "Unequal Abundance",
  "Broad Productivity Boom",
  "Shared Prosperity",
  "Optional-Work Abundance",
  "Automated Neo-Feudalism",
  "Corporate Dependency",
  "Administered Abundance",
  "Authoritarian Exclusion",
  "Eliminationist Regime",
  "Extreme tail risk",
  "Two coordinates",
  "Archetype matching",
];

const missing = requiredContent.filter((text) => !html.includes(text));

if (missing.length > 0) {
  throw new Error(
    `Static build is missing required indexable content: ${missing.join(", ")}`,
  );
}

if (!html.includes('id="eliminationist-regime"')) {
  throw new Error("Static build is missing the tail-risk scenario anchor.");
}

console.log(
  "Static archive verified: eight ordinary archetypes, tail-risk essay, and methodology are present in dist/index.html.",
);
