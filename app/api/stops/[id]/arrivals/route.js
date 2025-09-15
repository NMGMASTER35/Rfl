import { getStopArrivals } from '../../../../../lib/tfl.js';

export async function GET(request, { params }) {
  const data = await getStopArrivals(params.id);
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
