export type Bookmark = { path: string; title: string; savedAt: string };
export const BOOKMARK_KEY = "nimbus-studio:reading-list:v1";

export function getBookmarks(base: string): Bookmark[] {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
    if (!Array.isArray(data)) return [];
    const prefix = base.endsWith("/") ? base.slice(0, -1) : base;
    return data.filter((x): x is Bookmark => {
      if (!x || typeof x !== "object") return false;
      const o = x as Partial<Bookmark>;
      return typeof o.path === "string" &&
        (o.path === prefix || o.path.startsWith(prefix + "/")) &&
        !o.path.startsWith("//") &&
        !/[?#]/.test(o.path) &&
        typeof o.title === "string" &&
        o.title.length > 0 && o.title.length <= 200 &&
        typeof o.savedAt === "string";
    }).slice(0, 100);
  } catch { return []; }
}

export function putBookmarks(bookmarks: Bookmark[]): boolean {
  try {
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks.slice(0, 100)));
    return true;
  } catch { return false; }
}

