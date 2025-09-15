import { getRouteDisruptions } from '../../../../../lib/tfl.js';

export async function GET(_req, { params }) {
  const { id } = params;
  const data = await getRouteDisruptions(id);
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}
