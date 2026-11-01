/**
 * 小四英文温習 · 成績／錯題紀錄（localStorage）
 * keys: p4-eng-grammar-history · p4-eng-grammar-wrongs
 * r9 · ?v=20261101r9
 */
(function (global) {
  const KEY = "p4-eng-grammar-history";
  const KEY_WRONGS = "p4-eng-grammar-wrongs";
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

  global.P4Storage = {
    KEY: KEY,
    KEY_WRONGS: KEY_WRONGS,
    loadHistory: loadHistory,
    saveHistory: saveHistory,
    loadWrongs: loadWrongs,
    topWrongs: topWrongs,
    addRecord: addRecord,
    clearHistory: clearHistory,
    hkNowString: hkNowString,
  };
})(window);
