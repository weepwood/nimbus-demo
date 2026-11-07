#!/usr/bin/env node
/**
 * Verify deployable Astro/Nimbus output rather than just source types.
 * No third-party test dependency: runs on Node.js 22+.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, relative, join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const base = "/nimbus-demo";
const failures = [];

function checkFile(file) {
  if (!existsSync(join(dist, file))) {
    failures.push("Missing build output: " + file);
    return false;
  }
  return true;
}
const required = [
  "index.html",
  "quickstart/index.html",
  "components/index.html",
  "theme/index.html",
  "writing-pages/index.html",
  "architecture/index.html",
  "deploy/index.html",
  "configurator/index.html",
  "llms.txt",
  "llms-full.txt",
  "robots.txt",
  "sitemap-index.xml",
  "pagefind/pagefind.js",
  "quickstart/index.md",
  "showcase/index.html",
  "playground/index.html",
  "api-lab/index.html",
  "patterns/index.html",
  "search-guide/index.html",
  "demo-api/status.json",
  "demo-api/users.json",
  "demo-api/projects.json",
  "social.svg",
  "favicon.svg",
  "reading-list/index.html",
  "reading-list-guide/index.html",
  "api-reference/index.html",
  "changelog/index.html",
  "research/index.html",
  "tutorial/index.html",
  "openapi.json",
];
for (const item of required) checkFile(item);

function* allHtml(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const file = join(dir, entry);
    if (statSync(file).isDirectory()) yield* allHtml(file);
    else if (file.endsWith(".html")) yield file;
  }
}

function resolveLocal(href, originFile) {
  const text = href.replace(/&amp;/g, "&").trim();
  if (!text || /^(?:#|\?|mailto:|tel:|data:|javascript:|\/\/)/i.test(text)) return null;
  let url;
  try {
    const page = relative(dist, originFile).split("\\").join("/");
    const sitePath = base + "/" + page.replace(/index\.html$/, "");
    url = new URL(text, "https://weepwood.github.io" + sitePath);
  } catch {
    failures.push("Malformed URL in " + relative(dist, originFile) + ": " + href);
    return null;
  }
  if (url.origin !== "https://weepwood.github.io") return null;
  let path = decodeURI(url.pathname);
  if (path !== base && !path.startsWith(base + "/")) {
    failures.push("Link outside project base in " + relative(dist, originFile) + ": " + href);
    return null;
  }
  path = path.slice(base.length).replace(/^\/+/, "");
  if (!path || path.endsWith("/")) path += "index.html";
  else if (!extname(path)) path += "/index.html";
  return path;
}

let pages = 0, links = 0;
for (const file of allHtml(dist)) {
  pages += 1;
  const content = readFileSync(file, "utf8");
  const page = relative(dist, file).split("\\").join("/");
  if (!/<html\b/i.test(content) || !/<main\b/i.test(content)) {
    failures.push("Invalid HTML shell: " + page);
  }
  if (!/<link\s+rel="canonical"|<link[^>]+rel="canonical"/i.test(content)) {
    failures.push("Missing canonical tag: " + page);
  }
  for (const match of content.matchAll(/<a\b[^>]*\bhref=(?:"([^"]+)"|'([^']+)')/gi)) {
    const href = match[1] ?? match[2] ?? "";
    const target = resolveLocal(href, file);
    if (!target) continue;
    links += 1;
    if (!existsSync(join(dist, target))) {
      failures.push("Broken local link in " + page + ": " + href + " -> " + target);
    }
  }
}
if (pages < 20) failures.push("Expected at least twenty pages; only found " + pages);
if (links < 100) failures.push("Expected navigable local links; found " + links);

for (const endpoint of ["status", "users", "projects"]) {
  const file = "demo-api/" + endpoint + ".json";
  if (!checkFile(file)) continue;
  try {
    const body = JSON.parse(readFileSync(join(dist, file), "utf8"));
    if (body.ok !== true) failures.push("Demo endpoint must report ok: " + file);
  } catch {
    failures.push("Demo endpoint is not valid JSON: " + file);
  }
}

if (checkFile("robots.txt")) {
  const robots = readFileSync(join(dist, "robots.txt"), "utf8");
  if (!robots.includes(base + "/sitemap-index.xml")) failures.push("robots.txt has incorrect sitemap URL");
}
if (checkFile("llms.txt")) {
  const llms = readFileSync(join(dist, "llms.txt"), "utf8");
  if (!llms.includes("Nimbus Studio")) failures.push("LLM index has unexpected title");
}


// Keep the machine-readable contract in sync with the generated fixture files.
// This intentionally checks stable fixture examples: it does not claim to
// validate arbitrary API payloads or external network services.
if (checkFile("openapi.json")) {
  try {
    const spec = JSON.parse(readFileSync(join(dist, "openapi.json"), "utf8"));
    if (spec.openapi !== "3.1.0") failures.push("OpenAPI must use version 3.1.0");
    if (spec.servers?.[0]?.url !== "https://weepwood.github.io/nimbus-demo") {
      failures.push("OpenAPI server URL does not match the deployed base");
    }
    const contractPaths = Object.keys(spec.paths ?? {});
    const expectedPaths = ["status", "users", "projects"].map(name => "/demo-api/" + name + ".json");
    if (JSON.stringify([...contractPaths].sort()) !== JSON.stringify([...expectedPaths].sort())) {
      failures.push("OpenAPI endpoints do not match expected static fixtures");
    }
    for (const path of expectedPaths) {
      const operation = spec.paths?.[path]?.get;
      const response = operation?.responses?.["200"]?.content?.["application/json"];
      const schemaRef = response?.schema?.["$ref"];
      if (!schemaRef || !schemaRef.startsWith("#/components/schemas/")) {
        failures.push("Missing 200 JSON Schema for " + path);
        continue;
      }
      const schemaName = schemaRef.split("/").at(-1);
      const schema = spec.components?.schemas?.[schemaName];
      const target = path.replace(/^\//, "");
      if (!checkFile(target)) continue;
      const fixture = JSON.parse(readFileSync(join(dist, target), "utf8"));
      if (!schema || !Array.isArray(schema.required)) {
        failures.push("Missing required field schema for " + path);
        continue;
      }
      for (const key of schema.required) {
        if (!(key in fixture)) failures.push("Missing " + key + " in " + target);
      }
      if (JSON.stringify(fixture) !== JSON.stringify(response.example)) {
        failures.push("OpenAPI example differs from built fixture " + target);
      }
      if (path.includes("users") || path.includes("projects")) {
        if (!Array.isArray(fixture.data) || fixture.total !== fixture.data.length) {
          failures.push("Invalid list total or data in " + target);
        }
      }
    }
  } catch (error) {
    failures.push("Invalid OpenAPI or fixture JSON: " + String(error));
  }
}

const sampleDocument = join(dist, "quickstart/index.html");
if (existsSync(sampleDocument)) {
  const documentHtml = readFileSync(sampleDocument, "utf8");
  if (!documentHtml.includes("data-nd-reading-actions")) failures.push("Document reading actions not rendered");
  if (!documentHtml.includes("data-nd-reading-progress")) failures.push("Document progress indicator not rendered");
}
const libraryPage = join(dist, "reading-list/index.html");
if (existsSync(libraryPage) && !readFileSync(libraryPage, "utf8").includes("data-nd-bookmark-library")) {
  failures.push("Bookmark library root not rendered");
}

console.log("Checked " + pages + " rendered pages, " + links + " local links and " + required.length + " artifacts.");
if (failures.length) {
  for (const failure of failures) console.error("✗ " + failure);
  process.exitCode = 1;
} else {
  console.log("✓ Static site integrity checks passed");
}
