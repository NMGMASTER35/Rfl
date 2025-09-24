import { createTebexCheckout, listTebexPackages } from '../../../../lib/tebex.js';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: JSON_HEADERS
  });
}

function normaliseFormData(formData) {
  const payload = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string' && value.trim() === '') continue;
    payload[key] = value;
  }
  return payload;
}

export async function GET() {
  const packages = listTebexPackages();
  return json({ packages }, { status: 200 });
}

export async function POST(request) {
  let payload = {};
  const contentType = request.headers.get('content-type') || '';

  try {
    if (contentType.includes('application/json')) {
      payload = await request.json();
    } else if (
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data')
    ) {
      const formData = await request.formData();
      payload = normaliseFormData(formData);
    } else if (request.body) {
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
    return json({ error: 'Unable to read checkout payload.' }, { status: 400 });
  }

  try {
    const checkout = createTebexCheckout({
      packageId: payload.packageId ?? payload.id ?? payload.package,
      username: payload.username ?? payload.playerName ?? payload.ign,
      email: payload.email ?? payload.contact,
      quantity: payload.quantity,
      returnUrl: payload.returnUrl ?? payload.successUrl,
      reference: payload.reference ?? payload.notes
    });

    return json({ checkout }, { status: 201 });
  } catch (error) {
    return json({ error: error.message || 'Unable to create Tebex checkout.' }, { status: 400 });
  }
}
