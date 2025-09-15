import test from 'node:test';
import assert from 'node:assert';
import { getStopArrivals, searchStops, listRoutes, _clearCache } from '../lib/tfl.js';

// Mock fetch for tests
const originalFetch = global.fetch;

function mockResponse(data) {
  return Promise.resolve(new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  }));
}

test('getStopArrivals caches data for 10 seconds', async () => {
  let calls = 0;
  global.fetch = () => { calls++; return mockResponse([]); };
  _clearCache();
  await getStopArrivals('123');
  await getStopArrivals('123');
  assert.strictEqual(calls, 1, 'second call uses cache');
  const realNow = Date.now;
  Date.now = () => realNow() + 11000; // advance time 11s
  await getStopArrivals('123');
  assert.strictEqual(calls, 2, 'after ttl fetch called again');
  Date.now = realNow;
  global.fetch = originalFetch;
});

test('searchStops caches data for 12 hours', async () => {
  let calls = 0;
  global.fetch = () => { calls++; return mockResponse({ matches: [] }); };
  _clearCache();
  await searchStops('oxford');
  await searchStops('oxford');
  assert.strictEqual(calls, 1, 'second search uses cache');
  const realNow = Date.now;
  Date.now = () => realNow() + 13 * 60 * 60 * 1000; // +13h
  await searchStops('oxford');
  assert.strictEqual(calls, 2, 'after ttl fetch called again');
  Date.now = realNow;
  global.fetch = originalFetch;
});

test('listRoutes caches data for 24 hours', async () => {
  let calls = 0;
  global.fetch = () => { calls++; return mockResponse([]); };
  _clearCache();
  await listRoutes();
  await listRoutes();
  assert.strictEqual(calls, 1, 'second list uses cache');
  const realNow = Date.now;
  Date.now = () => realNow() + 25 * 60 * 60 * 1000; // +25h
  await listRoutes();
  assert.strictEqual(calls, 2, 'after ttl fetch called again');
  Date.now = realNow;
  global.fetch = originalFetch;
});
