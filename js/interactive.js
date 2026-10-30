/**
 * Interactive renderers: sentence-order (word tiles) + punctuation (mark slots)
 * r8 · ?v=20261030r8
 */
(function (global) {
  function shuffle(arr, rand) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function mulberry32(a) {
    return function () {
      var t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function isSentence(q) {
    return q && Array.isArray(q.tokens);
  }
  function isPunct(q) {
    return q && Array.isArray(q.words) && Array.isArray(q.slots);
  }

  function topicKind(topicId) {
    if (topicId === "sentence-order") return "sentence";
    if (topicId === "punctuation") return "punct";
    return null;
  }

  /** Prepare per-question interactive state after pick */
  function prepareQuestions(questions, seed) {
    var rand = mulberry32((seed || 1) >>> 0);
    return questions.map(function (q, idx) {
      var meta = { id: q.id, index: idx };
      if (isSentence(q)) {
        meta.kind = "sentence";
        meta.pool = shuffle(q.tokens, rand).map(function (tok, i) {
          return { uid: q.id + "-p" + i + "-" + tok, text: tok };
        });
        // re-shuffle if identical to answer (rare for short)
        var same = meta.pool.map(function (x) { return x.text; }).join("\0") === q.tokens.join("\0");
        if (same && meta.pool.length > 1) {
          meta.pool = shuffle(meta.pool, rand);
        }
        meta.answerLine = []; // {uid,text}[]
      } else if (isPunct(q)) {
        meta.kind = "punct";
        meta.placed = q.slots.map(function () { return null; }); // string|null
        meta.selectedMark = null;
      }
      return meta;
    });
  }

  function getMeta(ixState, qid) {
    return (ixState || []).find(function (m) { return m.id === qid; });
  }

  function sentenceCorrect(q, meta) {
    if (!meta || !meta.answerLine) return false;
    if (meta.answerLine.length !== q.tokens.length) return false;
    for (var i = 0; i < q.tokens.length; i++) {
      if (meta.answerLine[i].text !== q.tokens[i]) return false;
    }
    return true;
  }

  function punctCorrect(q, meta) {
    if (!meta || !meta.placed) return false;
    for (var i = 0; i < q.slots.length; i++) {
      var expect = q.slots[i] == null ? null : String(q.slots[i]);
      var got = meta.placed[i] == null ? null : String(meta.placed[i]);
      if (expect !== got) return false;
    }
    return true;
  }

  function isAnswered(q, meta) {
    if (!meta) return false;
    if (meta.kind === "sentence") return meta.answerLine && meta.answerLine.length > 0;
    if (meta.kind === "punct") {
      return meta.placed.some(function (x) { return x != null && x !== ""; });
    }
    return false;
  }

  function isCorrect(q, meta) {
    if (isSentence(q)) return sentenceCorrect(q, meta);
    if (isPunct(q)) return punctCorrect(q, meta);
    return false;
  }

  function correctSentenceText(q) {
    return joinTokens(q.tokens);
  }

  function joinTokens(tokens) {
    var s = "";
    tokens.forEach(function (tok, i) {
      if (i === 0) {
        s = tok;
        return;
      }
      if (/^['']/.test(tok) || tok === "'" || /^[.,?!]$/.test(tok)) {
        s += tok;
      } else if (/['']$/.test(s) || s.endsWith("'")) {
        s += tok;
      } else {
        s += " " + tok;
      }
    });
    return s;
  }

  function punctDisplay(words, slots) {
    var s = "";
    words.forEach(function (w, i) {
      s += w;
      var mark = slots[i];
      if (mark) {
        if (mark === "'") s += mark;
        else s += mark;
      }
      var nextNeedsSpace = i < words.length - 1;
      if (nextNeedsSpace) {
        // glue Tom + ' + s → Tom's; but girls' + bags needs a space
        if (mark === "'") {
          var nxt = words[i + 1];
          if (!(nxt && /^(s|t|nt|m|re|ve|ll|d)$/i.test(nxt))) {
            s += " ";
          }
        } else {
          s += " ";
        }
      }
    });
    return s;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderSentenceCard(q, meta, i, ctx) {
    var card = document.createElement("article");
    card.className = "q-card ix-card";
    card.id = "q-" + q.id;

    var head = document.createElement("div");
    head.className = "q-head";
    head.innerHTML =
      '<span class="q-idx">' +
      (i + 1) +
      '</span><p class="q-prompt">將下面字卡排成正確句子</p>';
    card.appendChild(head);

    var answerRow = document.createElement("div");
    answerRow.className = "ix-answer-row";
    answerRow.setAttribute("aria-label", "答案列");
    if (!meta.answerLine.length) {
      var ph = document.createElement("span");
      ph.className = "ix-placeholder";
      ph.textContent = "撳下面字卡排入呢度";
      answerRow.appendChild(ph);
    } else {
      meta.answerLine.forEach(function (item, idx) {
        var tile = document.createElement("button");
        tile.type = "button";
        tile.className = "ix-tile ix-tile-placed";
        tile.textContent = item.text;
        tile.disabled = !!ctx.checked;
        tile.addEventListener("click", function () {
          if (ctx.checked) return;
          // return to pool
          meta.answerLine.splice(idx, 1);
          meta.pool.push(item);
          ctx.rerender();
        });
        answerRow.appendChild(tile);
      });
    }
    card.appendChild(answerRow);

    var poolLab = document.createElement("div");
    poolLab.className = "ix-label";
    poolLab.textContent = "字庫（打亂）";
    card.appendChild(poolLab);

    var pool = document.createElement("div");
    pool.className = "ix-pool";
    meta.pool.forEach(function (item, pidx) {
      var tile = document.createElement("button");
      tile.type = "button";
      tile.className = "ix-tile";
      tile.textContent = item.text;
      tile.disabled = !!ctx.checked;
      tile.draggable = !ctx.checked;
      tile.addEventListener("click", function () {
        if (ctx.checked) return;
        meta.pool.splice(pidx, 1);
        meta.answerLine.push(item);
        ctx.rerender();
      });
      // HTML5 drag into answer row
      tile.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("text/plain", item.uid);
        e.dataTransfer.effectAllowed = "move";
      });
      pool.appendChild(tile);
    });
    card.appendChild(pool);

    answerRow.addEventListener("dragover", function (e) {
      e.preventDefault();
    });
    answerRow.addEventListener("drop", function (e) {
      e.preventDefault();
      if (ctx.checked) return;
      var uid = e.dataTransfer.getData("text/plain");
      var ix = meta.pool.findIndex(function (x) { return x.uid === uid; });
      if (ix < 0) return;
      var item = meta.pool.splice(ix, 1)[0];
      meta.answerLine.push(item);
      ctx.rerender();
    });

    var actions = document.createElement("div");
    actions.className = "q-actions";
    var clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "btn-secondary";
    clearBtn.textContent = "清答案列";
    clearBtn.disabled = !!ctx.checked || !meta.answerLine.length;
    clearBtn.addEventListener("click", function () {
      if (ctx.checked) return;
      meta.pool = meta.pool.concat(meta.answerLine);
      meta.answerLine = [];
      ctx.rerender();
    });
    actions.appendChild(clearBtn);

    var tipBtn = document.createElement("button");
    tipBtn.type = "button";
    tipBtn.className = "btn-tip";
    tipBtn.textContent = ctx.tipOpen[q.id] ? "已顯示提示" : "小提示";
    tipBtn.disabled = !!ctx.tipOpen[q.id];
    tipBtn.addEventListener("click", function () {
      ctx.onTip(q.id);
    });
    actions.appendChild(tipBtn);
    card.appendChild(actions);

    if (ctx.tipOpen[q.id]) {
      var tip = document.createElement("div");
      tip.className = "tip-box";
      tip.innerHTML = "<strong>提示</strong>" + escapeHtml(q.tip);
      card.appendChild(tip);
    }

    if (ctx.checked) {
      card.appendChild(buildResultBox(q, meta, ctx));
    }
    return card;
  }

  function renderPunctCard(q, meta, i, ctx) {
    var card = document.createElement("article");
    card.className = "q-card ix-card";
    card.id = "q-" + q.id;

    var head = document.createElement("div");
    head.className = "q-head";
    head.innerHTML =
      '<span class="q-idx">' +
      (i + 1) +
      '</span><p class="q-prompt">將標點放到適當位置（可先撳標點，再撳插入位）</p>';
    card.appendChild(head);

    var preview = document.createElement("div");
    preview.className = "ix-punct-preview";
    preview.textContent = "而家： " + punctDisplay(q.words, meta.placed);
    card.appendChild(preview);

    var row = document.createElement("div");
    row.className = "ix-punct-row";
    q.words.forEach(function (w, wi) {
      var wordEl = document.createElement("span");
      wordEl.className = "ix-word";
      wordEl.textContent = w;
      row.appendChild(wordEl);

      var slot = document.createElement("button");
      slot.type = "button";
      slot.className = "ix-slot" + (meta.placed[wi] ? " filled" : "");
      if (meta.selectedMark) slot.classList.add("armed");
      slot.textContent = meta.placed[wi] || "＋";
      slot.disabled = !!ctx.checked;
      slot.title = "插入標點位置（喺「" + w + "」後面）";
      slot.addEventListener("click", function () {
        if (ctx.checked) return;
        if (meta.placed[wi]) {
          // clear slot
          meta.placed[wi] = null;
          ctx.rerender();
          return;
        }
        if (meta.selectedMark) {
          meta.placed[wi] = meta.selectedMark;
          meta.selectedMark = null;
          ctx.rerender();
        }
      });
      slot.addEventListener("dragover", function (e) {
        e.preventDefault();
        slot.classList.add("drag-over");
      });
      slot.addEventListener("dragleave", function () {
        slot.classList.remove("drag-over");
      });
      slot.addEventListener("drop", function (e) {
        e.preventDefault();
        slot.classList.remove("drag-over");
        if (ctx.checked) return;
        var mark = e.dataTransfer.getData("text/plain");
        if (!mark) return;
        meta.placed[wi] = mark;
        meta.selectedMark = null;
        ctx.rerender();
      });
      row.appendChild(slot);
    });
    card.appendChild(row);

    var palLab = document.createElement("div");
    palLab.className = "ix-label";
    palLab.textContent =
      "標點字卡" +
      (meta.selectedMark ? "（已選「" + meta.selectedMark + "」——再撳插入位）" : "");
    card.appendChild(palLab);

    var palette = document.createElement("div");
    palette.className = "ix-palette";
    (q.palette || [".", "?", "!", ","]).forEach(function (mark) {
      var tile = document.createElement("button");
      tile.type = "button";
      tile.className =
        "ix-tile ix-punct-tile" +
        (meta.selectedMark === mark ? " selected" : "");
      tile.textContent = mark;
      tile.disabled = !!ctx.checked;
      tile.draggable = !ctx.checked;
      tile.addEventListener("click", function () {
        if (ctx.checked) return;
        meta.selectedMark = meta.selectedMark === mark ? null : mark;
        ctx.rerender();
      });
      tile.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("text/plain", mark);
        e.dataTransfer.effectAllowed = "copy";
      });
      palette.appendChild(tile);
    });
    card.appendChild(palette);

    var actions = document.createElement("div");
    actions.className = "q-actions";
    var clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "btn-secondary";
    clearBtn.textContent = "清除標點";
    clearBtn.disabled = !!ctx.checked;
    clearBtn.addEventListener("click", function () {
      if (ctx.checked) return;
      meta.placed = q.slots.map(function () { return null; });
      meta.selectedMark = null;
      ctx.rerender();
    });
    actions.appendChild(clearBtn);

    var tipBtn = document.createElement("button");
    tipBtn.type = "button";
    tipBtn.className = "btn-tip";
    tipBtn.textContent = ctx.tipOpen[q.id] ? "已顯示提示" : "小提示";
    tipBtn.disabled = !!ctx.tipOpen[q.id];
    tipBtn.addEventListener("click", function () {
      ctx.onTip(q.id);
    });
    actions.appendChild(tipBtn);
    card.appendChild(actions);

    if (ctx.tipOpen[q.id]) {
      var tip = document.createElement("div");
      tip.className = "tip-box";
      tip.innerHTML = "<strong>提示</strong>" + escapeHtml(q.tip);
      card.appendChild(tip);
    }
    if (ctx.checked) {
      card.appendChild(buildResultBox(q, meta, ctx));
    }
    return card;
  }

  function buildResultBox(q, meta, ctx) {
    var box = document.createElement("div");
    var answered = isAnswered(q, meta);
    var ok = isCorrect(q, meta);
    if (!answered) {
      box.className = "result-box miss";
      box.innerHTML =
        '<div class="lead">未作答</div>正確：' +
        escapeHtml(
          isSentence(q) ? correctSentenceText(q) : punctDisplay(q.words, q.slots),
        ) +
        "。" +
        escapeHtml(q.teach);
    } else if (ok) {
      box.className = "result-box ok";
      box.innerHTML = '<div class="lead">正確</div>' + escapeHtml(q.teach);
    } else {
      box.className = "result-box bad";
      box.innerHTML =
        '<div class="lead">再睇睇</div>正確：' +
        escapeHtml(
          isSentence(q) ? correctSentenceText(q) : punctDisplay(q.words, q.slots),
        ) +
        "。" +
        escapeHtml(q.teach);
    }
    return box;
  }

  function renderQuestion(q, meta, i, ctx) {
    if (meta.kind === "sentence") return renderSentenceCard(q, meta, i, ctx);
    if (meta.kind === "punct") return renderPunctCard(q, meta, i, ctx);
    return document.createElement("div");
  }

  global.P4Interactive = {
    topicKind: topicKind,
    prepareQuestions: prepareQuestions,
    getMeta: getMeta,
    isCorrect: isCorrect,
    isAnswered: isAnswered,
    renderQuestion: renderQuestion,
    correctSentenceText: correctSentenceText,
    punctDisplay: punctDisplay,
    isSentence: isSentence,
    isPunct: isPunct,
  };
})(window);
