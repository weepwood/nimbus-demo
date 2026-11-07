export const prerender = true;
export function GET() {
  return new Response(JSON.stringify({
    ok: true,
    total: 3,
    data: [
      { id: "prj_docs", name: "Documentation", stack: ["Astro", "MDX"], status: "active" },
      { id: "prj_ui", name: "Component Library", stack: ["Astro", "CSS"], status: "active" },
      { id: "prj_api", name: "API Explorer", stack: ["TypeScript"], status: "preview" }
    ],
    note: "Static fixture generated during build.",
  }, null, 2), { headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=300" } });
}
