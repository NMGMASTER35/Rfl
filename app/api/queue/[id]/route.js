import { getQueueSnapshot, leaveQueue } from '../../../../lib/queue.js';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: JSON_HEADERS
  });
}

export async function DELETE(request, { params }) {
  const { id } = params || {};
  if (!id) {
    return json({ error: 'Queue entry id is required.' }, { status: 400 });
  }

  const url = new URL(request.url);
  const status = url.searchParams.get('status') || 'removed';

  const entry = leaveQueue(id, { status });
  if (!entry) {
    return json({ error: 'Queue entry not found.' }, { status: 404 });
  }

  const snapshot = getQueueSnapshot();
  return json({ entry, snapshot }, { status: 200 });
}
