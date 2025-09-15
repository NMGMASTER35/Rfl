import { listRoutes } from '../../../lib/tfl.js';

export async function GET() {
  const data = await listRoutes();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}
