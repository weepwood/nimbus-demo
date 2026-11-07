import { mount } from "@cloudflare/nimbus-docs/client";

/** Close the native details menu on outside pointer activation or Escape. */
mount("[data-nd-mobile-menu]", (root: HTMLElement) => {
  if (!(root instanceof HTMLDetailsElement)) return () => {};
  const controller = new AbortController();
  const summary = root.querySelector<HTMLElement>("summary");
  document.addEventListener("pointerdown", event => {
    if (root.open && !root.contains(event.target as Node)) root.open = false;
  }, { signal: controller.signal });
  document.addEventListener("keydown", event => {
    if (event.key !== "Escape" || !root.open) return;
    event.preventDefault();
    root.open = false;
    summary?.focus();
  }, { signal: controller.signal });
  return () => controller.abort();
});
