// A corrupted or partially-written localStorage value (a browser extension touching storage, a
// tab closed mid-write, a stale schema from an older build) makes JSON.parse throw. Every call
// site that did `JSON.parse(localStorage.getItem(key) || fallback)` directly, with no try/catch,
// would let that throw straight out of a render/effect and blank the whole page for the user -
// there's no way to recover except manually clearing storage. This wraps that pattern so a bad
// value degrades to the fallback instead of crashing.
export function safeJsonParse(raw, fallback) {
  if (raw == null) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function readJsonFromLocalStorage(key, fallback) {
  let raw;
  try {
    raw = localStorage.getItem(key);
  } catch {
    // localStorage itself can throw (private browsing quota limits, disabled storage, etc.)
    return fallback;
  }
  return safeJsonParse(raw, fallback);
}
