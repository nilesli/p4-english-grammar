/**
 * 小四英文温習 — Firebase cloud（練習場次＋錯題）
 * ES module; exposes window.P4EngCloud when ready.
 * Path: artifacts/p4-english-grammar-default/public/data/p4_english_grammar/sessions/entries/{id}
 * r10 · ?v=20261101r10
 */
import { initializeApp, getApp, getApps } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

const APP_ID = 'p4-english-grammar-default';
const LS_PENDING = 'p4-eng-grammar-pending-sessions';
const FIREBASE_APP_NAME = 'p4-english-grammar';

let app = null;
let auth = null;
let db = null;
let ready = false;
let initPromise = null;

function getFirebaseConfig() {
  if (
    typeof window.P4_ENG_FIREBASE_CONFIG === 'object' &&
    window.P4_ENG_FIREBASE_CONFIG &&
    window.P4_ENG_FIREBASE_CONFIG.apiKey
  ) {
    return window.P4_ENG_FIREBASE_CONFIG;
  }
  return null;
}

function isConfigured() {
  const c = getFirebaseConfig();
  return !!(c && c.apiKey && c.projectId && c.apiKey !== 'demo');
}

function readJsonArray(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    return [];
  }
}

function writeJsonArray(key, arr) {
  try {
    localStorage.setItem(key, JSON.stringify(arr.slice(-200)));
  } catch (e) { /* quota */ }
}

function appendPending(record) {
  const all = readJsonArray(LS_PENDING);
  all.push(record);
  writeJsonArray(LS_PENDING, all);
}

function sessionsPath() {
  // Mirror fraction: .../{app}/public/data/{name}/{bucket}/entries/{id}
  // Bucket doc id fixed as "sessions" (no teacher codes for family app).
  return collection(
    db,
    'artifacts',
    APP_ID,
    'public',
    'data',
    'p4_english_grammar',
    'sessions',
    'entries'
  );
}

function formatHkTime(isoOrDate) {
  try {
    const d = isoOrDate instanceof Date ? isoOrDate : new Date(isoOrDate || Date.now());
    if (Number.isNaN(d.getTime())) return String(isoOrDate || '');
    return new Intl.DateTimeFormat('zh-HK', {
      timeZone: 'Asia/Hong_Kong',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(d);
  } catch (e) {
    return String(isoOrDate || '');
  }
}

function normalizeSession(partial) {
  const whenHk =
    partial.when ||
    (window.P4Storage && window.P4Storage.hkNowString
      ? window.P4Storage.hkNowString()
      : formatHkTime(new Date()));
  const nickname =
    partial.nickname != null
      ? String(partial.nickname).slice(0, 40)
      : window.P4Storage && window.P4Storage.getNickname
        ? window.P4Storage.getNickname()
        : '細妹';
  const deviceId =
    partial.deviceId ||
    (window.P4Storage && window.P4Storage.getDeviceId
      ? window.P4Storage.getDeviceId()
      : '');
  const wrongIds = Array.isArray(partial.wrongIds)
    ? partial.wrongIds.map((id) => String(id).slice(0, 40)).slice(0, 80)
    : [];
  const wrongSnips = Array.isArray(partial.wrongSnips)
    ? partial.wrongSnips
        .map((s) => ({
          id: String((s && s.id) || '').slice(0, 40),
          text: String((s && s.text) || '').slice(0, 120),
        }))
        .filter((s) => s.id)
        .slice(0, 80)
    : [];
  return {
    when: whenHk,
    whenIso: partial.whenIso || new Date().toISOString(),
    nickname,
    deviceId: String(deviceId || '').slice(0, 64),
    topic: String(partial.topic || '').slice(0, 80),
    mode: partial.mode === 'advanced' ? 'advanced' : 'basic',
    score: Number(partial.score) || 0,
    total: Number(partial.total) || 0,
    tips: Number(partial.tips) || 0,
    wrongIds,
    wrongSnips,
    createdAtClient: new Date().toISOString(),
  };
}

async function ensureInit() {
  if (ready && db) return true;
  if (initPromise) return initPromise;
  initPromise = (async () => {
    const cfg = getFirebaseConfig();
    if (!cfg || !cfg.apiKey || !cfg.projectId || cfg.apiKey === 'demo') {
      ready = false;
      return false;
    }
    try {
      if (getApps().some((a) => a.name === FIREBASE_APP_NAME)) {
        app = getApp(FIREBASE_APP_NAME);
      } else {
        app = initializeApp(cfg, FIREBASE_APP_NAME);
      }
      auth = getAuth(app);
      db = getFirestore(app);
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }
      ready = !!(auth.currentUser && db);
      return ready;
    } catch (err) {
      console.warn('[P4EngCloud] init failed', err);
      ready = false;
      db = null;
      return false;
    }
  })();
  try {
    return await initPromise;
  } finally {
    if (!ready) initPromise = null;
  }
}

/**
 * Upload one practice session. Fail soft → pending localStorage.
 * @returns {'cloud'|'local'|'error'|'skipped'}
 */
async function saveSession(partial) {
  const record = normalizeSession(partial || {});
  const ok = await ensureInit();
  if (!ok) {
    appendPending(record);
    return 'local';
  }
  try {
    const payload = Object.assign({}, record, { createdAt: serverTimestamp() });
    await addDoc(sessionsPath(), payload);
    return 'cloud';
  } catch (err) {
    console.warn('[P4EngCloud] upload failed', err);
    appendPending(record);
    return 'error';
  }
}

async function flushPending() {
  const pending = readJsonArray(LS_PENDING);
  if (!pending.length) return { flushed: 0, left: 0 };
  const ok = await ensureInit();
  if (!ok) return { flushed: 0, left: pending.length };
  const left = [];
  let flushed = 0;
  for (const rec of pending) {
    try {
      const payload = Object.assign({}, rec, { createdAt: serverTimestamp() });
      await addDoc(sessionsPath(), payload);
      flushed += 1;
    } catch (e) {
      left.push(rec);
    }
  }
  writeJsonArray(LS_PENDING, left);
  return { flushed, left: left.length };
}

/**
 * Load recent sessions (last ~50). Soft-fail to [].
 */
async function loadSessions(max = 50) {
  const ok = await ensureInit();
  if (!ok) return { source: 'none', sessions: [], error: 'not configured / offline' };
  try {
    const q = query(sessionsPath(), orderBy('whenIso', 'desc'), limit(max));
    const snap = await getDocs(q);
    const sessions = [];
    snap.forEach((d) => sessions.push({ id: d.id, ...d.data() }));
    return { source: 'cloud', sessions };
  } catch (err) {
    console.warn('[P4EngCloud] load orderBy failed', err);
    try {
      const snap = await getDocs(query(sessionsPath(), limit(max)));
      const sessions = [];
      snap.forEach((d) => sessions.push({ id: d.id, ...d.data() }));
      sessions.sort((a, b) => String(b.whenIso || '').localeCompare(String(a.whenIso || '')));
      return { source: 'cloud', sessions: sessions.slice(0, max) };
    } catch (err2) {
      console.warn('[P4EngCloud] load failed', err2);
      return { source: 'none', sessions: [], error: String(err2 && err2.message) };
    }
  }
}

function aggregateWrongs(sessions) {
  const map = {};
  (sessions || []).forEach((s) => {
    const snipMap = {};
    (Array.isArray(s.wrongSnips) ? s.wrongSnips : []).forEach((x) => {
      if (x && x.id) snipMap[x.id] = x.text || '';
    });
    (Array.isArray(s.wrongIds) ? s.wrongIds : []).forEach((id) => {
      if (!id) return;
      const prev = map[id] || { id, count: 0, text: '', topic: s.topic || '' };
      prev.count += 1;
      if (snipMap[id]) prev.text = snipMap[id];
      if (s.topic) prev.topic = s.topic;
      map[id] = prev;
    });
  });
  return Object.keys(map)
    .map((k) => map[k])
    .sort((a, b) => b.count - a.count || a.id.localeCompare(b.id));
}

function drainBootQueue() {
  const q = window.__p4EngPendingSessions;
  if (!Array.isArray(q) || !q.length) return;
  window.__p4EngPendingSessions = [];
  q.forEach((rec) => {
    saveSession(rec).catch(() => {});
  });
}

const api = {
  APP_ID,
  SESSIONS_COLLECTION: 'p4_english_grammar/sessions/entries',
  PATH_PREFIX: `artifacts/${APP_ID}/public/data/p4_english_grammar/sessions/entries`,
  isConfigured,
  ensureInit,
  saveSession,
  flushPending,
  loadSessions,
  aggregateWrongs,
  formatHkTime,
};

window.P4EngCloud = api;
window.dispatchEvent(new Event('p4engcloud-ready'));
drainBootQueue();

ensureInit().then((ok) => {
  if (ok) flushPending();
});
