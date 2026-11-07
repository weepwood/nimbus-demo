export const prerender = true;
export function GET() {
  return new Response(JSON.stringify({
    ok: true,
    service: "nimbus-demo",
    version: "1.0",
    mode: "static-fixture",
    features: ["MDX", "Pagefind", "Themes", "Interactive demos"],
  }, null, 2), { headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=300" } });
}
