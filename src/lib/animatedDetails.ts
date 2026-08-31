const closeTimers = new WeakMap<HTMLDetailsElement, number>();

function setDetailsOpen(entry: HTMLDetailsElement, shouldOpen: boolean) {
  const reveal = entry.querySelector<HTMLElement>(
    ":scope > [data-disclosure-reveal]",
  );
  const summary = entry.querySelector<HTMLElement>(":scope > summary");
  const previousTimer = closeTimers.get(entry);

  if (previousTimer !== undefined) {
    window.clearTimeout(previousTimer);
    closeTimers.delete(entry);
  }

  summary?.setAttribute("aria-expanded", String(shouldOpen));
  reveal?.setAttribute("aria-hidden", String(!shouldOpen));

  if (shouldOpen) {
    entry.dataset.expanded = "false";
    entry.open = true;
    reveal?.removeAttribute("inert");

    // Render the collapsed grid before moving it to its expanded state.
    reveal?.getBoundingClientRect();
    entry.dataset.expanded = "true";
    return;
  }

  entry.dataset.expanded = "false";
  reveal?.setAttribute("inert", "");
  const closeDelay = window.matchMedia("(prefers-reduced-motion: reduce)")
    .matches
    ? 0
    : 300;
  const timer = window.setTimeout(() => {
    if (entry.dataset.expanded === "false") entry.open = false;
    closeTimers.delete(entry);
  }, closeDelay);
  closeTimers.set(entry, timer);
}

export function initializeAnimatedDetails(root: ParentNode = document) {
  root
    .querySelectorAll<HTMLDetailsElement>("[data-animated-details]")
    .forEach((entry) => {
      if (entry.dataset.enhanced === "true") return;

      const summary = entry.querySelector<HTMLElement>(":scope > summary");
      const reveal = entry.querySelector<HTMLElement>(
        ":scope > [data-disclosure-reveal]",
      );
      if (!summary || !reveal) return;

      const initiallyOpen = entry.open;
      entry.dataset.enhanced = "true";
      entry.dataset.expanded = String(initiallyOpen);
      summary.setAttribute("aria-expanded", String(initiallyOpen));
      reveal.setAttribute("aria-hidden", String(!initiallyOpen));
      if (!initiallyOpen) reveal.setAttribute("inert", "");

      summary.addEventListener("click", (event) => {
        event.preventDefault();
        setDetailsOpen(entry, entry.dataset.expanded !== "true");
      });
    });
}
