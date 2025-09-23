import { getQueueSnapshot, joinQueue } from '../../../lib/queue.js';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: JSON_HEADERS
  });
}

export async function GET() {
  const snapshot = getQueueSnapshot();
  return json(snapshot, { status: 200 });
}

function normaliseFormData(formData) {
  const payload = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string' && value.trim() === '') continue;
    payload[key] = value;
  }
  return payload;
}

export async function POST(request) {
  let payload = {};
  const contentType = request.headers.get('content-type') || '';

  try {
    if (contentType.includes('application/json')) {
      payload = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      payload = normaliseFormData(formData);
    } else if (request.body) {
      // attempt JSON parse as a fallback
      const text = await request.text();
      if (text) {
        try {
          payload = JSON.parse(text);
        } catch (error) {
          return json({ error: 'Unsupported content type. Use JSON or form encoded data.' }, { status: 415 });
        }
      }
    }
  } catch (error) {
    return json({ error: 'Unable to read queue submission payload.' }, { status: 400 });
  }

  try {
    const entry = joinQueue(payload);
    const snapshot = getQueueSnapshot();
    return json({ entry, snapshot }, { status: 201 });
  } catch (error) {
    return json({ error: error.message || 'Unable to join queue.' }, { status: 400 });
  }
}
