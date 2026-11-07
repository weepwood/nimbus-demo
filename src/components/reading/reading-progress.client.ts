import { mount } from "@cloudflare/nimbus-docs/client";

mount("[data-nd-reading-progress]", (root: HTMLElement) => {
  const bar = root.querySelector<HTMLElement>("[data-nd-reading-progress-fill]");
  const article = document.querySelector<HTMLElement>("article.docs-content");
  if (!bar || !article) return () => {};
  const controller = new AbortController();
  let frame = 0;
  const update = () => {
    frame = 0;
    const top = article.getBoundingClientRect().top;
    const distance = Math.max(1, article.scrollHeight - window.innerHeight + 180);
    const progress = Math.min(100, Math.max(0, ((-top + 100) / distance) * 100));
    bar.style.width = progress.toFixed(1) + "%";
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  window.addEventListener("scroll", schedule, { passive: true, signal: controller.signal });
  window.addEventListener("resize", schedule, { passive: true, signal: controller.signal });
  schedule();
  return () => { controller.abort(); if (frame) cancelAnimationFrame(frame); };
});
