import { mount } from "@cloudflare/nimbus-docs/client";

import { getBookmarks, putBookmarks, BOOKMARK_KEY } from "@/lib/reading-list";

function mountReadingActions(root: HTMLElement): () => void {
  const controller = new AbortController();
  const { signal } = controller;
  const bookmarkButton = root.querySelector<HTMLButtonElement>("[data-nd-bookmark]");
  const bookmarkLabel = root.querySelector<HTMLElement>("[data-nd-bookmark-label]");
  const shareButton = root.querySelector<HTMLButtonElement>("[data-nd-share]");
  const status = root.querySelector<HTMLElement>("[data-nd-reading-status]");
  const path = root.dataset.pagePath || "";
  const title = root.dataset.pageTitle || "";
  const base = root.dataset.pageBase || "/";
  if (!bookmarkButton || !bookmarkLabel || !shareButton || !status || !path) return () => {};

  function sync() {
    const saved = getBookmarks(base).some(b => b.path === path);
    bookmarkButton!.setAttribute("aria-pressed", String(saved));
    bookmarkLabel!.textContent = saved ? "已收藏" : "收藏本页";
  }

  bookmarkButton.addEventListener("click", () => {
    const all = getBookmarks(base);
    const saved = all.some(b => b.path === path);
    const updated = saved
      ? all.filter(b => b.path !== path)
      : [{ path, title, savedAt: new Date().toISOString() }, ...all];
    if (putBookmarks(updated)) {
      sync();
      status.textContent = saved ? "已从阅读清单移除。" : "已收藏到当前浏览器的阅读清单。";
    } else {
      status.textContent = "浏览器未允许本地存储，无法保存。";
    }
  }, { signal });

  shareButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      status.textContent = "当前页面链接已复制。";
    } catch { status.textContent = "无法访问剪贴板，请从地址栏复制链接。"; }
  }, { signal });

  window.addEventListener("storage", (e) => {
    if (e.key === BOOKMARK_KEY) sync();
  }, { signal });
  sync();
  return () => controller.abort();
}

mount("[data-nd-reading-actions]", mountReadingActions);
