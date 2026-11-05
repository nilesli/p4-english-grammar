/**
 * 小四英文温習 · on-screen keyboard (iPad fill) · r13
 * Keys: a–z, space, 刪除, 清除; optional than / the shortcuts for comparatives.
 */
(function (global) {
  "use strict";

  var ROWS = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  function create(opts) {
    opts = opts || {};
    var root = opts.root;
    if (!root) throw new Error("P4Osk: root required");

    var onInsert = typeof opts.onInsert === "function" ? opts.onInsert : null;
    var onBackspace = typeof opts.onBackspace === "function" ? opts.onBackspace : null;
    var onClear = typeof opts.onClear === "function" ? opts.onClear : null;
    var shortcuts = Array.isArray(opts.shortcuts) ? opts.shortcuts.slice() : [];
    var disabled = false;

    function makeBtn(label, className, handler, aria) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "osk-key" + (className ? " " + className : "");
      b.textContent = label;
      b.setAttribute("aria-label", aria || label);
      b.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (disabled) return;
        handler();
      });
      // Prevent iOS focus steal / system keyboard
      b.addEventListener("mousedown", function (e) {
        e.preventDefault();
      });
      b.addEventListener("touchstart", function (e) {
        // keep passive false only if needed; preventDefault on touchstart can help
      }, { passive: true });
      return b;
    }

    function paint() {
      root.innerHTML = "";
      root.className = (root.id === "osk-dock" ? "osk-dock " : "") + "osk";
      root.setAttribute("role", "group");
      root.setAttribute("aria-label", "畫面鍵盤");

      if (shortcuts.length) {
        var scRow = document.createElement("div");
        scRow.className = "osk-row osk-row-shortcuts";
        shortcuts.forEach(function (word) {
          scRow.appendChild(
            makeBtn(word, "osk-key-shortcut", function () {
              if (onInsert) onInsert(word, { shortcut: true });
            }, "插入 " + word)
          );
        });
        root.appendChild(scRow);
      }

      ROWS.forEach(function (row, ri) {
        var rowEl = document.createElement("div");
        rowEl.className = "osk-row";
        row.forEach(function (ch) {
          rowEl.appendChild(
            makeBtn(ch, "", function () {
              if (onInsert) onInsert(ch, { shortcut: false });
            })
          );
        });
        if (ri === 2) {
          rowEl.appendChild(
            makeBtn("刪除", "osk-key-wide osk-key-back", function () {
              if (onBackspace) onBackspace();
            }, "刪除")
          );
        }
        root.appendChild(rowEl);
      });

      var bottom = document.createElement("div");
      bottom.className = "osk-row osk-row-bottom";
      bottom.appendChild(
        makeBtn("空白", "osk-key-space", function () {
          if (onInsert) onInsert(" ", { shortcut: false });
        }, "空白")
      );
      bottom.appendChild(
        makeBtn("清除", "osk-key-wide osk-key-clear", function () {
          if (onClear) onClear();
        }, "清除")
      );
      root.appendChild(bottom);
    }

    paint();

    return {
      setShortcuts: function (list) {
        shortcuts = Array.isArray(list) ? list.slice() : [];
        paint();
      },
      setDisabled: function (v) {
        disabled = !!v;
        root.classList.toggle("osk-disabled", disabled);
        root.querySelectorAll(".osk-key").forEach(function (btn) {
          btn.disabled = disabled;
        });
      },
      destroy: function () {
        root.innerHTML = "";
      },
    };
  }

  global.P4Osk = { create: create };
})(typeof window !== "undefined" ? window : this);
