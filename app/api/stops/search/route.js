import { searchStops } from '../../../../lib/tfl.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  if (!q) {
    return new Response(JSON.stringify({ error: 'Missing q' }), { status: 400 });
  }
  const data = await searchStops(q);
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
