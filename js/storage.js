/**
 * 小四英文温習 · 成績／錯題／暱稱（localStorage）
 * keys: p4-eng-grammar-history · p4-eng-grammar-wrongs · nickname · device-id
 * r10 · ?v=20261101r10
 */
(function (global) {
  const KEY = "p4-eng-grammar-history";
  const KEY_WRONGS = "p4-eng-grammar-wrongs";
  const KEY_NICK = "p4-eng-grammar-nickname";
  const KEY_DEVICE = "p4-eng-grammar-device-id";
  const DEFAULT_NICK = "細妹";
  const MAX = 100;

  function loadHistory() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return [];
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }

  function saveHistory(list) {
    try {
      localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)));
      return true;
    } catch (e) {
      return false;
    }
  }

  function loadWrongs() {
    try {
      const raw = localStorage.getItem(KEY_WRONGS);
      if (!raw) return {};
      const data = JSON.parse(raw);
      return data && typeof data === "object" && !Array.isArray(data) ? data : {};
    } catch (e) {
      return {};
    }
  }

  function saveWrongs(map) {
    try {
      localStorage.setItem(KEY_WRONGS, JSON.stringify(map || {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function bumpWrongs(rec) {
    if (!rec) return loadWrongs();
    const ids = Array.isArray(rec.wrongIds) ? rec.wrongIds : [];
    if (!ids.length) return loadWrongs();
    const snipMap = {};
    (Array.isArray(rec.wrongSnips) ? rec.wrongSnips : []).forEach(function (s) {
      if (s && s.id) snipMap[s.id] = s.text || "";
    });
    const map = loadWrongs();
    const when = rec.when || "";
    const topic = rec.topic || "";
    ids.forEach(function (id) {
      if (!id) return;
      const prev = map[id] || { topic: topic, count: 0, lastWhen: "", text: "" };
      prev.count = (prev.count || 0) + 1;
      prev.lastWhen = when || prev.lastWhen;
      if (topic) prev.topic = topic;
      if (snipMap[id]) prev.text = snipMap[id];
      else if (!prev.text) prev.text = "";
      map[id] = prev;
    });
    saveWrongs(map);
    return map;
  }

  function addRecord(rec) {
    const list = loadHistory();
    list.unshift(rec);
    saveHistory(list);
    bumpWrongs(rec);
    return list;
  }

  function clearHistory() {
    try {
      localStorage.removeItem(KEY);
      localStorage.removeItem(KEY_WRONGS);
    } catch (e) {}
    return [];
  }

  function topWrongs(n) {
    const limit = typeof n === "number" && n > 0 ? n : 5;
    const map = loadWrongs();
    return Object.keys(map)
      .map(function (id) {
        const row = map[id] || {};
        return {
          id: id,
          topic: row.topic || "",
          count: row.count || 0,
          lastWhen: row.lastWhen || "",
          text: row.text || "",
        };
      })
      .filter(function (r) {
        return r.count > 0;
      })
      .sort(function (a, b) {
        if (b.count !== a.count) return b.count - a.count;
        return String(b.lastWhen).localeCompare(String(a.lastWhen));
      })
      .slice(0, limit);
  }

  function hkNowString() {
    return new Date().toLocaleString("zh-HK", {
      timeZone: "Asia/Hong_Kong",
      hour12: false,
    });
  }

  function getNickname() {
    try {
      const v = localStorage.getItem(KEY_NICK);
      if (v != null && String(v).trim()) return String(v).trim().slice(0, 40);
    } catch (e) {}
    return DEFAULT_NICK;
  }

  function setNickname(raw) {
    const s = String(raw == null ? "" : raw).trim().slice(0, 40) || DEFAULT_NICK;
    try {
      localStorage.setItem(KEY_NICK, s);
    } catch (e) {}
    return s;
  }

  function uuid() {
    try {
      if (global.crypto && typeof global.crypto.randomUUID === "function") {
        return global.crypto.randomUUID();
      }
    } catch (e) {}
    return "d-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
  }

  function getDeviceId() {
    try {
      var id = localStorage.getItem(KEY_DEVICE);
      if (id && String(id).length >= 8) return String(id).slice(0, 64);
      id = uuid();
      localStorage.setItem(KEY_DEVICE, id);
      return id;
    } catch (e) {
      return uuid();
    }
  }

  global.P4Storage = {
    KEY: KEY,
    KEY_WRONGS: KEY_WRONGS,
    KEY_NICK: KEY_NICK,
    KEY_DEVICE: KEY_DEVICE,
    DEFAULT_NICK: DEFAULT_NICK,
    loadHistory: loadHistory,
    saveHistory: saveHistory,
    loadWrongs: loadWrongs,
    topWrongs: topWrongs,
    addRecord: addRecord,
    clearHistory: clearHistory,
    hkNowString: hkNowString,
    getNickname: getNickname,
    setNickname: setNickname,
    getDeviceId: getDeviceId,
  };
})(window);
