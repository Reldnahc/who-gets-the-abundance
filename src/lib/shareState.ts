import {
  clamp,
  clampInputs,
  inputKeys,
  type FutureInputs,
  type SliderKey,
} from "./futureModel";

const queryKeys: Readonly<Record<SliderKey, string>> = {
  automation: "a",
  ownership: "o",
  workerPower: "w",
  socialDividend: "s",
  democracy: "d",
  civilLiberties: "c",
  universalAccess: "u",
  openInfrastructure: "i",
};

export function serializeState(inputs: FutureInputs): string {
  const safe = clampInputs(inputs);
  const parameters = new URLSearchParams();

  inputKeys.forEach((key) => {
    parameters.set(queryKeys[key], String(Math.round(safe[key])));
  });

  return parameters.toString();
}

export function parseState(
  search: string | URLSearchParams,
  fallback: FutureInputs,
): FutureInputs {
  let parameters: URLSearchParams;

  try {
    parameters =
      typeof search === "string" ? new URLSearchParams(search) : search;
  } catch {
    return clampInputs(fallback);
  }

  const result = { ...clampInputs(fallback) };

  inputKeys.forEach((key) => {
    const rawValue = parameters.get(queryKeys[key]);
    if (rawValue === null || rawValue.trim() === "") return;

    const parsed = Number(rawValue);
    if (!Number.isFinite(parsed)) return;

    result[key] = Math.round(clamp(parsed));
  });

  return result;
}

export function buildShareUrl(
  currentUrl: string,
  inputs: FutureInputs,
): string {
  const url = new URL(currentUrl);
  url.search = serializeState(inputs);
  url.hash = "";
  return url.toString();
}

export function hasSharedState(search: string | URLSearchParams): boolean {
  const parameters =
    typeof search === "string" ? new URLSearchParams(search) : search;
  return Object.values(queryKeys).some((key) => parameters.has(key));
}
