import { mount } from "@cloudflare/nimbus-docs/client";

mount("[data-nd-back-to-top]", root => {
  if (!(root instanceof HTMLButtonElement)) return () => {};
  const button = root;
  const controller = new AbortController();
  let frame = 0;

  function update() {
    frame = 0;
    const visible = window.scrollY > Math.max(480, window.innerHeight * .6);
    if (button.hidden !== !visible) button.hidden = !visible;
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, { signal: controller.signal });
  window.addEventListener("scroll", schedule, { passive: true, signal: controller.signal });
  window.addEventListener("resize", schedule, { passive: true, signal: controller.signal });
  update();

  return () => {
    controller.abort();
    if (frame) cancelAnimationFrame(frame);
  };
});
