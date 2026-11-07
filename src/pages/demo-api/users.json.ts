export const prerender = true;
export function GET() {
  return new Response(JSON.stringify({
    ok: true,
    total: 3,
    data: [
      { id: "usr_001", name: "Alex Chen", role: "admin", active: true },
      { id: "usr_002", name: "Morgan Lee", role: "editor", active: true },
      { id: "usr_003", name: "Taylor Kim", role: "viewer", active: false }
    ],
    note: "Public demo data. No real user records.",
  }, null, 2), { headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=300" } });
}
