/**
 * 小四英文温習 · 成績紀錄（localStorage）
 * key: p4-eng-grammar-history
 */
(function (global) {
  const KEY = "p4-eng-grammar-history";
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

  function addRecord(rec) {
    const list = loadHistory();
    list.unshift(rec);
    saveHistory(list);
    return list;
  }

  function clearHistory() {
    try {
      localStorage.removeItem(KEY);
    } catch (e) {}
    return [];
  }

  function hkNowString() {
    return new Date().toLocaleString("zh-HK", {
      timeZone: "Asia/Hong_Kong",
      hour12: false,
    });
  }

  global.P4Storage = {
    KEY,
    loadHistory,
    saveHistory,
    addRecord,
    clearHistory,
    hkNowString,
  };
})(window);
