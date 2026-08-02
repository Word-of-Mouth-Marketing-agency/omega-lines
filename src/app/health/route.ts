export function GET() {
  return Response.json({
    ok: true,
    service: "omega-lines",
    timestamp: new Date().toISOString(),
  });
}
