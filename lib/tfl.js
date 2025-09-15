/**
 * Minimal TfL API client with in-memory caching.
 * Uses the public TfL API (https://api.tfl.gov.uk) and caches results
 * for a short time to reduce repeated calls.
 */

const BASE_URL = 'https://api.tfl.gov.uk';
const cache = new Map();

function getCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (entry.exp < Date.now()) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data, ttlMs) {
  cache.set(key, { data, exp: Date.now() + ttlMs });
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
}

export async function searchStops(query) {
  const key = `search:${query}`;
  const cached = getCache(key);
  if (cached) return cached;
  const data = await fetchJson(`${BASE_URL}/StopPoint/Search?query=${encodeURIComponent(query)}`);
  setCache(key, data, 12 * 60 * 60 * 1000); // 12h
  return data;
}

export async function getStopArrivals(id) {
  const key = `arrivals:${id}`;
  const cached = getCache(key);
  if (cached) return cached;
  const data = await fetchJson(`${BASE_URL}/StopPoint/${id}/Arrivals`);
  setCache(key, data, 10 * 1000); // 10s
  return data;
}

export function _cacheSize() {
  return cache.size;
}

export function _clearCache() {
  cache.clear();
}
