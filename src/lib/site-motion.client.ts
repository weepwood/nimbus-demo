import { mount } from "@cloudflare/nimbus-docs/client";

/**
 * Progressive viewport reveal. Content is visible until JS has positively
 * identified an offscreen element; reduced motion and missing IO are no-ops.
 */
mount("[data-nd-reveal-root]", (root: HTMLElement) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)) return () => {};

  const targets = Array.from(root.querySelectorAll<HTMLElement>(
    ".nd-section-head, .nd-capability, .nd-demo-card, .nd-step, .nd-hub-card, .nd-hub-feature"
  ));
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const element = entry.target as HTMLElement;
      element.dataset.ndEnter = "visible";
      observer.unobserve(element);
    }
  }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });

  for (const [index, el] of targets.entries()) {
    if (el.getBoundingClientRect().top <= window.innerHeight * .85) continue;
    el.dataset.ndEnter = "pending";
    el.style.setProperty("--nd-enter-delay", ((index % 3) * 55) + "ms");
    observer.observe(el);
  }

  return () => {
    observer.disconnect();
    for (const el of targets) {
      el.removeAttribute("data-nd-enter");
      el.style.removeProperty("--nd-enter-delay");
    }
  };
});
