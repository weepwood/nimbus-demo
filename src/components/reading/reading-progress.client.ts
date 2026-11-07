import { mount } from "@cloudflare/nimbus-docs/client";

/** Paint-efficient scroll progress; transform avoids a layout-affecting width write. */
mount("[data-nd-reading-progress]", (root: HTMLElement) => {
  const bar = root.querySelector<HTMLElement>("[data-nd-reading-progress-fill]");
  const article = document.querySelector<HTMLElement>("article.docs-content");
  if (!bar || !article) return () => {};
  const controller = new AbortController();
  let frame = 0;
  const update = () => {
    frame = 0;
    const rect = article.getBoundingClientRect();
    const top = window.scrollY + rect.top - 78;
    const bottom = window.scrollY + rect.bottom - Math.min(window.innerHeight * .7, 540);
    const fraction = Math.max(0, Math.min(1, (window.scrollY - top) / Math.max(1, bottom - top)));
    bar.style.transform = "scaleX(" + fraction.toFixed(4) + ")";
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  const observer = new ResizeObserver(schedule);
  observer.observe(article);
  window.addEventListener("scroll", schedule, { passive: true, signal: controller.signal });
  window.addEventListener("resize", schedule, { passive: true, signal: controller.signal });
  window.addEventListener("pageshow", schedule, { signal: controller.signal });
  update();
  return () => {
    controller.abort();
    observer.disconnect();
    if (frame) cancelAnimationFrame(frame);
  };
});
