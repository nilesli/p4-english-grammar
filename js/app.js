/**
 * 小四英文温習 · Practice app
 * r10 · ?v=20261101r10 · wrong tracking + Firebase session upload
 */
(function () {
  const ROUND_SIZE = 8;

  function mulberry32(a) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pickQuestions(bank, seed, n) {
    const rand = mulberry32(seed >>> 0);
    const copy = bank.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy.slice(0, Math.min(n, copy.length));
  }

  function pickPassage(bank, seed) {
    const rand = mulberry32(seed >>> 0);
    if (!bank || !bank.length) return null;
    return bank[Math.floor(rand() * bank.length)];
  }

  function blanksFromPassage(passage) {
    if (!passage) return [];
    return passage.segments.filter(function (s) {
      return s.type === "blank";
    });
  }

  function newSeed() {
    return (Date.now() ^ (Math.floor(Math.random() * 0x7fffffff))) >>> 0;
  }

  function getQuery() {
    try {
      return new URLSearchParams(window.location.search);
    } catch (e) {
      return new URLSearchParams();
    }
  }

  /** Parse #topic=like-ving&mode=advanced (preferred on file://) */
  function getHashParams() {
    try {
      var raw = (window.location.hash || "").replace(/^#/, "");
      if (!raw) return new URLSearchParams();
      // support #topic=x&mode=y or #like-ving
      if (raw.indexOf("=") === -1 && raw.indexOf("&") === -1) {
        return new URLSearchParams("topic=" + encodeURIComponent(raw));
      }
      return new URLSearchParams(raw);
    } catch (e) {
      return new URLSearchParams();
    }
  }

  function readRoute() {
    var h = getHashParams();
    var q = getQuery();
    var topic = h.get("topic") || q.get("topic") || "";
    var mode = h.get("mode") || q.get("mode") || "";
    return { topic: topic, mode: mode };
  }

  function writeHash(topicId, mode) {
    try {
      var parts = ["topic=" + encodeURIComponent(topicId || "tenses")];
      if (mode === "advanced") parts.push("mode=advanced");
      var next = "#" + parts.join("&");
      if (window.location.hash !== next) {
        if (history.replaceState) {
          history.replaceState(null, "", next);
        } else {
          window.location.hash = next;
        }
      }
    } catch (e) {}
  }

  function clearHash() {
    try {
      if (history.replaceState) {
        var url = window.location.pathname + window.location.search;
        history.replaceState(null, "", url || window.location.href.split("#")[0]);
      } else if (window.location.hash) {
        window.location.hash = "";
      }
    } catch (e) {}
  }

  function isSpa() {
    return !!(document.getElementById("view-home") && document.getElementById("view-practice"));
  }

  var practiceBound = false;

  const state = {
    topicId: "tenses",
    topic: null,
    mode: "basic",
    seed: newSeed(),
    questions: [],
    passage: null,
    answers: {},
    tipOpen: {},
    tipCounted: {},
    tipCount: 0,
    checked: false,
    ixMeta: [],
    lastWrongs: [],
    lastUploadStatus: "",
  };

  const el = {};
  function $(id) {
    return document.getElementById(id);
  }

  function historyTopic() {
    const t = state.topic;
    if (!t) return "Tenses";
    if (state.mode === "advanced" && t.historyTopicAdvanced) {
      return t.historyTopicAdvanced;
    }
    return t.historyTopic || t.id;
  }

  function getBank() {
    const t = state.topic;
    if (!t) return [];
    return window[t.bankKey] || [];
  }

  function getAdvancedBank() {
    const t = state.topic;
    if (!t || !t.advancedBankKey) return [];
    return window[t.advancedBankKey] || [];
  }

  function interactiveKind() {
    if (!window.P4Interactive || !state.topic) return null;
    return window.P4Interactive.topicKind(state.topic.id);
  }

  function rerenderInteractive() {
    if (!el.qList) return;
    const IX = window.P4Interactive;
    const frag = document.createDocumentFragment();
    const ctx = {
      checked: state.checked,
      tipOpen: state.tipOpen,
      onTip: showTip,
      rerender: rerenderInteractive,
    };
    state.questions.forEach(function (q, i) {
      var meta = IX.getMeta(state.ixMeta, q.id);
      frag.appendChild(IX.renderQuestion(q, meta, i, ctx));
    });
    el.qList.innerHTML = "";
    el.qList.appendChild(frag);
  }

  function makeTopicCard(t, i, mode) {
    const spa = isSpa();
    const isAdv = mode === "advanced";
    const elCard = document.createElement(spa ? "button" : "a");
    elCard.type = spa ? "button" : undefined;
    elCard.className =
      "topic-card enabled" + (isAdv ? " topic-card-adv" : "");
    elCard.setAttribute("data-topic", t.id);
    if (isAdv) elCard.setAttribute("data-mode", "advanced");
    if (spa) {
      elCard.addEventListener("click", function () {
        openTopic(t.id, isAdv ? "advanced" : "basic");
      });
    } else {
      elCard.href =
        "practice.html?topic=" +
        encodeURIComponent(t.id) +
        (isAdv ? "&mode=advanced" : "");
    }
    if (isAdv) {
      elCard.innerHTML =
        '<span class="num">1+</span><span class="name">' +
        escapeHtml(t.short) +
        " · 進階短文</span>" +
        '<span class="badge badge-adv">直達進階</span>';
    } else {
      elCard.innerHTML =
        '<span class="num">' +
        (i + 1) +
        '</span><span class="name">' +
        escapeHtml(t.title) +
        '</span><span class="badge">' +
        (t.hasAdvanced ? "基礎／進階" : "可練習") +
        "</span>";
    }
    return elCard;
  }

  function initHome() {
    const grid = $("topic-grid");
    if (!grid || !window.P4_TOPICS) return;
    grid.innerHTML = "";
    window.P4_TOPICS.forEach(function (t, i) {
      if (!t.enabled) {
        const div = document.createElement("div");
        div.className = "topic-card disabled";
        div.setAttribute("aria-disabled", "true");
        div.innerHTML =
          '<span class="num">' +
          (i + 1) +
          '</span><span class="name">' +
          escapeHtml(t.title) +
          '</span><span class="badge">即將推出</span>';
        grid.appendChild(div);
        return;
      }
      grid.appendChild(makeTopicCard(t, i, "basic"));
      if (t.hasAdvanced) {
        grid.appendChild(makeTopicCard(t, i, "advanced"));
      }
    });
    renderTopWrongs();
    bindNickname();
    bindTeacherPanel();
  }

  function cachePracticeEls() {
    el.qList = $("q-list");
    el.passageWrap = $("passage-wrap");
    el.tipChip = $("tip-chip");
    el.scoreBody = $("score-body");
    el.histBody = $("hist-body");
    el.btnCheck = $("btn-check");
    el.btnNew = $("btn-new");
    el.btnClearHist = $("btn-clear-hist");
    el.modeBasic = $("mode-basic");
    el.modeAdvanced = $("mode-advanced");
    el.modeBar = $("mode-bar");
    el.modeHint = $("mode-hint");
    el.practiceIntro = $("practice-intro");
    el.teachBody = $("teach-body");
    el.pageTitle = $("page-title");
    el.pageSub = $("page-sub");
    el.histMeta = $("hist-meta");
  }

  function bindPracticeControls() {
    if (practiceBound) return;
    if (!el.qList && !el.passageWrap) return;
    if (el.btnCheck) el.btnCheck.addEventListener("click", onCheck);
    if (el.btnNew) el.btnNew.addEventListener("click", onNewRound);
    if (el.btnClearHist)
      el.btnClearHist.addEventListener("click", onClearHist);
    if (el.modeBasic)
      el.modeBasic.addEventListener("click", function () {
        setMode("basic");
      });
    if (el.modeAdvanced)
      el.modeAdvanced.addEventListener("click", function () {
        setMode("advanced");
      });
    practiceBound = true;
  }

  function openTopic(topicId, mode) {
    cachePracticeEls();
    if (!el.qList && !el.passageWrap) return;

    const topic = window.P4_getTopic
      ? window.P4_getTopic(topicId)
      : (window.P4_TOPICS || [])[0];
    state.topic = topic || (window.P4_TOPICS || [])[0];
    state.topicId = state.topic ? state.topic.id : "tenses";
    state.mode =
      mode === "advanced" && state.topic && state.topic.hasAdvanced
        ? "advanced"
        : "basic";
    state.seed = newSeed();

    if (isSpa()) {
      var home = $("view-home");
      var practice = $("view-practice");
      if (home) home.hidden = true;
      if (practice) practice.hidden = false;
      writeHash(state.topicId, state.mode);
    }

    bindPracticeControls();
    applyTopicChrome();
    syncModeUI();
    startRound();
    renderHistory();
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }

  function showHome() {
    if (!isSpa()) {
      window.location.href = "index.html";
      return;
    }
    var home = $("view-home");
    var practice = $("view-practice");
    if (home) home.hidden = false;
    if (practice) practice.hidden = true;
    clearHash();
    document.title = "小四英文温習 · 預覽";
    renderTopWrongs();
    bindNickname();
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }

  function initPractice() {
    cachePracticeEls();
    if (!el.qList && !el.passageWrap) return;

    // SPA: only auto-start if route already has a topic; otherwise wait for card click
    if (isSpa()) {
      bindPracticeControls();
      var route = readRoute();
      if (route.topic) {
        openTopic(route.topic, route.mode === "advanced" ? "advanced" : "basic");
      }
      return;
    }

    var route = readRoute();
    openTopic(route.topic || "tenses", route.mode === "advanced" ? "advanced" : "basic");
  }

  function applyTopicChrome() {
    const t = state.topic;
    if (!t) return;
    document.title = "小四英文温習 · " + t.short;
    if (el.pageTitle) el.pageTitle.textContent = "小四英文温習 · " + t.short;
    if (el.pageSub) {
      if (t.hasAdvanced) {
        el.pageSub.textContent = "基礎 MC／進階短文（小四程度）";
      } else if (t.id === "sentence-order") {
        el.pageSub.textContent = "字卡拼句 · 每回合隨機 8 題";
      } else if (t.id === "punctuation") {
        el.pageSub.textContent = "標點插入 · 每回合隨機 8 題";
      } else {
        el.pageSub.textContent = "每回合隨機 8 題（小四程度）";
      }
    }
    if (el.teachBody) el.teachBody.innerHTML = t.teachHtml || "";
    if (el.modeBar) {
      el.modeBar.hidden = !t.hasAdvanced;
    }
    if (el.histMeta) {
      el.histMeta.textContent =
        "關閉瀏覽器都會留低（本機儲存）。時間以香港時區顯示。本課成績記作「" +
        (t.historyTopic || t.id) +
        "」" +
        (t.hasAdvanced
          ? "；進階記作「" + t.historyTopicAdvanced + "」。"
          : "。");
    }
  }

  function setMode(mode) {
    if (!state.topic || !state.topic.hasAdvanced) return;
    if (mode === state.mode) return;
    state.mode = mode;
    state.seed = newSeed();
    if (isSpa()) writeHash(state.topicId, state.mode);
    syncModeUI();
    startRound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function syncModeUI() {
    const adv = state.mode === "advanced";
    if (el.modeBasic) {
      el.modeBasic.classList.toggle("active", !adv);
      el.modeBasic.setAttribute("aria-pressed", String(!adv));
    }
    if (el.modeAdvanced) {
      el.modeAdvanced.classList.toggle("active", adv);
      el.modeAdvanced.setAttribute("aria-pressed", String(adv));
    }
    if (el.modeHint) {
      el.modeHint.textContent = adv
        ? "進階：一篇短文／對話，約 8–10 格填時態（小四程度）。"
        : "基礎：隨機 8 題四選一。";
      el.modeHint.hidden = !(state.topic && state.topic.hasAdvanced);
    }
    if (el.practiceIntro) {
      var ik = interactiveKind();
      if (adv) {
        el.practiceIntro.textContent =
          "先掃全文時間詞，再逐格判斷而家定過去。未諗到先撳「小提示」；每格第一次撳先計一次。";
      } else if (ik === "sentence") {
        el.practiceIntro.textContent =
          "將打亂字卡排成正確句子（撳字卡放入答案列；再撳可退回）。可用「清答案列」。提示唔會講出全句。";
      } else if (ik === "punct") {
        el.practiceIntro.textContent =
          "先撳標點字卡，再撳字後面嘅「＋」插入位；亦可拖曳標點到插入位。再撳已放標點可清除。";
      } else {
        el.practiceIntro.textContent =
          "睇清題目再揀。未諗到先撳「小提示」；每題第一次撳先計一次。提示只畀思路，唔會直接講答案。";
      }
    }
    document.body.classList.toggle("mode-advanced", adv);
    document.body.classList.toggle("mode-basic", !adv);
  }

  function startRound() {
    state.answers = {};
    state.tipOpen = {};
    state.tipCounted = {};
    state.tipCount = 0;
    state.checked = false;
    state.passage = null;
    state.questions = [];
    state.ixMeta = [];
    state.lastWrongs = [];

    if (state.mode === "advanced" && state.topic && state.topic.hasAdvanced) {
      state.passage = pickPassage(getAdvancedBank(), state.seed);
      state.questions = blanksFromPassage(state.passage);
      if (!state.questions.length) {
        if (el.passageWrap) {
          el.passageWrap.hidden = false;
          el.passageWrap.innerHTML =
            '<p class="empty-note">進階題庫未載入。</p>';
        }
        if (el.qList) {
          el.qList.hidden = true;
          el.qList.innerHTML = "";
        }
        return;
      }
    } else {
      const bank = getBank();
      if (!bank.length) {
        if (el.qList) {
          el.qList.hidden = false;
          el.qList.innerHTML =
            '<p class="empty-note">題庫未載入。</p>';
        }
        return;
      }
      state.questions = pickQuestions(bank, state.seed, ROUND_SIZE);
      if (interactiveKind() && window.P4Interactive) {
        state.ixMeta = window.P4Interactive.prepareQuestions(
          state.questions,
          state.seed,
        );
      }
    }

    renderPractice();
    updateTipChip();
    renderScore();
    if (el.btnCheck) el.btnCheck.disabled = false;
  }

  function updateTipChip() {
    if (el.tipChip)
      el.tipChip.textContent = "今次已用提示：" + state.tipCount + " 次";
  }

  function renderPractice() {
    if (state.mode === "advanced" && state.passage) {
      if (el.qList) {
        el.qList.hidden = true;
        el.qList.innerHTML = "";
      }
      if (el.passageWrap) {
        el.passageWrap.hidden = false;
        renderPassage();
      }
    } else {
      if (el.passageWrap) {
        el.passageWrap.hidden = true;
        el.passageWrap.innerHTML = "";
      }
      if (el.qList) {
        el.qList.hidden = false;
        if (interactiveKind()) rerenderInteractive();
        else renderQuestions();
      }
    }
  }

  function renderQuestions() {
    if (!el.qList) return;
    const frag = document.createDocumentFragment();
    state.questions.forEach(function (q, i) {
      frag.appendChild(buildCard(q, i));
    });
    el.qList.innerHTML = "";
    el.qList.appendChild(frag);
  }

  function renderPassage() {
    if (!el.passageWrap || !state.passage) return;
    const p = state.passage;
    const wrap = document.createElement("div");
    wrap.className = "passage-card";

    const head = document.createElement("div");
    head.className = "passage-head";
    const genreLabel =
      p.genre === "email"
        ? "電郵"
        : p.genre === "dialogue"
          ? "對話"
          : p.genre === "diary"
            ? "日記"
            : p.genre || "";
    head.innerHTML =
      "<h2>" +
      escapeHtml(p.title) +
      '</h2><span class="passage-genre">' +
      escapeHtml(genreLabel) +
      "</span>";
    wrap.appendChild(head);

    if (p.intro) {
      const intro = document.createElement("p");
      intro.className = "passage-intro";
      intro.textContent = p.intro;
      wrap.appendChild(intro);
    }

    const body = document.createElement("div");
    body.className = "passage-body";
    let blankIdx = 0;
    p.segments.forEach(function (seg) {
      if (seg.type === "text") {
        const span = document.createElement("span");
        span.className = "passage-text";
        span.textContent = seg.text;
        body.appendChild(span);
      } else if (seg.type === "blank") {
        blankIdx += 1;
        body.appendChild(buildInlineBlank(seg, blankIdx));
      }
    });
    wrap.appendChild(body);

    const panels = document.createElement("div");
    panels.className = "blank-panels";
    state.questions.forEach(function (q, i) {
      panels.appendChild(buildBlankPanel(q, i));
    });
    wrap.appendChild(panels);

    el.passageWrap.innerHTML = "";
    el.passageWrap.appendChild(wrap);
  }

  function buildInlineBlank(q, num) {
    const box = document.createElement("span");
    box.className = "inline-blank";
    box.id = "blank-" + q.id;
    const label = document.createElement("span");
    label.className = "blank-num";
    label.textContent = "(" + num + ")";
    box.appendChild(label);
    const opts = document.createElement("span");
    opts.className = "blank-options";
    opts.setAttribute("role", "group");
    opts.setAttribute("aria-label", "第" + num + "格");
    q.options.forEach(function (opt) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "blank-opt";
      btn.setAttribute("data-value", opt.value);
      btn.textContent = opt.label;
      if (state.answers[q.id] === opt.value) btn.classList.add("selected");
      if (state.checked) {
        btn.disabled = true;
        if (opt.value === q.answer) btn.classList.add("correct");
        else if (
          state.answers[q.id] === opt.value &&
          opt.value !== q.answer
        )
          btn.classList.add("wrong");
      } else {
        btn.addEventListener("click", function () {
          selectAnswer(q.id, opt.value);
        });
      }
      opts.appendChild(btn);
    });
    box.appendChild(opts);
    return box;
  }

  function buildBlankPanel(q, i) {
    const panel = document.createElement("div");
    panel.className = "blank-panel";
    panel.id = "q-" + q.id;
    const title = document.createElement("div");
    title.className = "blank-panel-title";
    title.textContent = "第 " + (i + 1) + " 格";
    panel.appendChild(title);
    const actions = document.createElement("div");
    actions.className = "q-actions";
    const tipBtn = document.createElement("button");
    tipBtn.type = "button";
    tipBtn.className = "btn-tip";
    tipBtn.textContent = state.tipOpen[q.id] ? "已顯示提示" : "小提示";
    tipBtn.disabled = !!state.tipOpen[q.id];
    tipBtn.addEventListener("click", function () {
      showTip(q.id);
    });
    actions.appendChild(tipBtn);
    panel.appendChild(actions);
    if (state.tipOpen[q.id]) {
      const tip = document.createElement("div");
      tip.className = "tip-box";
      tip.innerHTML = "<strong>提示</strong>" + escapeHtml(q.tip);
      panel.appendChild(tip);
    }
    if (state.checked) panel.appendChild(buildResult(q));
    return panel;
  }

  function buildCard(q, i) {
    const card = document.createElement("article");
    card.className = "q-card";
    card.id = "q-" + q.id;
    const head = document.createElement("div");
    head.className = "q-head";
    head.innerHTML =
      '<span class="q-idx">' +
      (i + 1) +
      '</span><p class="q-prompt">' +
      escapeHtml(q.prompt) +
      "</p>";
    card.appendChild(head);
    const opts = document.createElement("div");
    opts.className = "options";
    opts.setAttribute("role", "group");
    q.options.forEach(function (opt) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "opt-btn";
      btn.setAttribute("data-value", opt.value);
      btn.textContent = opt.label;
      if (state.answers[q.id] === opt.value) btn.classList.add("selected");
      if (state.checked) {
        btn.disabled = true;
        if (opt.value === q.answer) btn.classList.add("correct");
        else if (
          state.answers[q.id] === opt.value &&
          opt.value !== q.answer
        )
          btn.classList.add("wrong");
      } else {
        btn.addEventListener("click", function () {
          selectAnswer(q.id, opt.value);
        });
      }
      opts.appendChild(btn);
    });
    card.appendChild(opts);
    const actions = document.createElement("div");
    actions.className = "q-actions";
    const tipBtn = document.createElement("button");
    tipBtn.type = "button";
    tipBtn.className = "btn-tip";
    tipBtn.textContent = state.tipOpen[q.id] ? "已顯示提示" : "小提示";
    tipBtn.disabled = !!state.tipOpen[q.id];
    tipBtn.addEventListener("click", function () {
      showTip(q.id);
    });
    actions.appendChild(tipBtn);
    card.appendChild(actions);
    if (state.tipOpen[q.id]) {
      const tip = document.createElement("div");
      tip.className = "tip-box";
      tip.innerHTML = "<strong>提示</strong>" + escapeHtml(q.tip);
      card.appendChild(tip);
    }
    if (state.checked) card.appendChild(buildResult(q));
    return card;
  }

  function buildResult(q) {
    const picked = state.answers[q.id] || "";
    const box = document.createElement("div");
    const ok = picked === q.answer;
    if (!picked) {
      box.className = "result-box miss";
      box.innerHTML =
        '<div class="lead">未作答</div>正確係 ' +
        escapeHtml(q.answer) +
        "。" +
        escapeHtml(q.teach);
    } else if (ok) {
      box.className = "result-box ok";
      box.innerHTML = '<div class="lead">正確</div>' + escapeHtml(q.teach);
    } else {
      box.className = "result-box bad";
      box.innerHTML =
        '<div class="lead">再睇睇</div>正確係 ' +
        escapeHtml(q.answer) +
        "。" +
        escapeHtml(q.teach);
    }
    return box;
  }

  function selectAnswer(qid, value) {
    if (state.checked) return;
    state.answers[qid] = value;
    if (state.mode === "advanced") {
      const blank = document.getElementById("blank-" + qid);
      if (blank) {
        blank.querySelectorAll(".blank-opt").forEach(function (btn) {
          btn.classList.toggle(
            "selected",
            btn.getAttribute("data-value") === value,
          );
        });
      }
    } else {
      const card = document.getElementById("q-" + qid);
      if (!card) return;
      card.querySelectorAll(".opt-btn").forEach(function (btn) {
        btn.classList.toggle(
          "selected",
          btn.getAttribute("data-value") === value,
        );
      });
    }
  }

  function showTip(qid) {
    if (state.tipOpen[qid]) return;
    state.tipOpen[qid] = true;
    if (!state.tipCounted[qid]) {
      state.tipCounted[qid] = true;
      state.tipCount += 1;
      updateTipChip();
    }
    if (state.mode === "advanced") renderPassage();
    else if (interactiveKind()) rerenderInteractive();
    else {
      const idx = state.questions.findIndex(function (q) {
        return q.id === qid;
      });
      if (idx < 0) return;
      const old = document.getElementById("q-" + qid);
      if (old) old.replaceWith(buildCard(state.questions[idx], idx));
    }
  }

  function trimSnip(s, n) {
    var t = String(s || "").replace(/\s+/g, " ").trim();
    if (!t) return "";
    var max = typeof n === "number" ? n : 40;
    if (t.length <= max) return t;
    return t.slice(0, max - 1) + "…";
  }

  function snipForQuestion(q) {
    if (!q) return "";
    if (q.prompt) return trimSnip(q.prompt, 40);
    if (Array.isArray(q.tokens) && q.tokens.length) {
      return trimSnip(q.tokens.join(" "), 40);
    }
    if (Array.isArray(q.words) && q.words.length) {
      return trimSnip(q.words.join(" "), 40);
    }
    // advanced blank: no prompt — use passage title + blank id
    if (state.passage && state.passage.title) {
      return trimSnip(state.passage.title + " · " + q.id, 40);
    }
    if (q.tip) return trimSnip(q.tip, 40);
    return trimSnip(q.id || "", 40);
  }

  function collectRoundWrongs() {
    var wrongs = [];
    var ik = interactiveKind();
    state.questions.forEach(function (q) {
      var ok = false;
      if (ik && window.P4Interactive) {
        var meta = window.P4Interactive.getMeta(state.ixMeta, q.id);
        ok = window.P4Interactive.isCorrect(q, meta);
      } else {
        ok = state.answers[q.id] === q.answer;
      }
      if (!ok) {
        wrongs.push({ id: q.id, text: snipForQuestion(q) });
      }
    });
    return wrongs;
  }

  function calcScore() {
    if (interactiveKind() && window.P4Interactive) {
      return state.questions.reduce(function (n, q) {
        var meta = window.P4Interactive.getMeta(state.ixMeta, q.id);
        return n + (window.P4Interactive.isCorrect(q, meta) ? 1 : 0);
      }, 0);
    }
    return state.questions.reduce(function (n, q) {
      return n + (state.answers[q.id] === q.answer ? 1 : 0);
    }, 0);
  }

  function onCheck() {
    if (state.checked) return;
    state.checked = true;
    const score = calcScore();
    const total = state.questions.length;
    const wrongs = collectRoundWrongs();
    state.lastWrongs = wrongs;
    var whenStr = window.P4Storage ? window.P4Storage.hkNowString() : "";
    var sessionRec = {
      when: whenStr,
      whenIso: new Date().toISOString(),
      topic: historyTopic(),
      mode: state.mode,
      score: score,
      total: total,
      tips: state.tipCount,
      wrongIds: wrongs.map(function (w) {
        return w.id;
      }),
      wrongSnips: wrongs,
      nickname: window.P4Storage ? window.P4Storage.getNickname() : "細妹",
      deviceId: window.P4Storage ? window.P4Storage.getDeviceId() : "",
    };
    if (window.P4Storage) {
      window.P4Storage.addRecord({
        when: sessionRec.when,
        topic: sessionRec.topic,
        mode: sessionRec.mode,
        score: sessionRec.score,
        total: sessionRec.total,
        tips: sessionRec.tips,
        wrongIds: sessionRec.wrongIds,
        wrongSnips: sessionRec.wrongSnips,
      });
    }
    state.lastUploadStatus = "pending";
    queueCloudSession(sessionRec);
    renderPractice();
    renderScore();
    renderHistory();
    if (el.btnCheck) el.btnCheck.disabled = true;
    const panel = $("score-panel");
    if (panel) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function onNewRound() {
    state.seed = newSeed();
    startRound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onClearHist() {
    if (!window.confirm("確定清空全部成績紀錄同常錯統計？")) return;
    if (window.P4Storage) window.P4Storage.clearHistory();
    renderHistory();
    renderTopWrongs();
  }

  function renderScore() {
    if (!el.scoreBody) return;
    if (!state.checked) {
      el.scoreBody.innerHTML =
        '<p class="score-msg">核對後先有分數。</p>';
      return;
    }
    const score = calcScore();
    const total = state.questions.length;
    const pass = Math.ceil(total * 0.75);
    const mid = Math.ceil(total * 0.5);
    let cls = "low";
    let msg = "再睇教學重點，對住弱項多練幾組。";
    if (score >= pass) {
      cls = "good";
      msg = "今組表現不錯！";
    } else if (score >= mid) cls = "mid";
    let html =
      '<p class="score-big ' +
      cls +
      '">' +
      score +
      " / " +
      total +
      '</p><p class="score-msg">用咗 ' +
      state.tipCount +
      " 次提示。" +
      msg +
      "</p>";
    const wrongs = state.lastWrongs || [];
    if (wrongs.length) {
      html +=
        '<div class="round-wrongs"><p class="round-wrongs-title">今輪錯題（' +
        wrongs.length +
        "）</p><ul class=\"wrong-snip-list\">";
      wrongs.forEach(function (w) {
        html +=
          "<li><code>" +
          escapeHtml(w.id) +
          "</code> " +
          escapeHtml(w.text || "") +
          "</li>";
      });
      html += "</ul></div>";
    }
    var up = state.lastUploadStatus;
    if (up === "cloud") {
      html += '<p class="upload-status ok">已上傳雲端（方便分析錯題）</p>';
    } else if (up === "local" || up === "error") {
      html += '<p class="upload-status warn">雲端未通；成績仍留本機，稍後會再試</p>';
    } else if (up === "pending") {
      html += '<p class="upload-status">上傳雲端中…</p>';
    }
    el.scoreBody.innerHTML = html;
  }

  function formatHistWrongs(h) {
    const snips = Array.isArray(h.wrongSnips) ? h.wrongSnips : null;
    const ids = Array.isArray(h.wrongIds) ? h.wrongIds : null;
    if ((!snips || !snips.length) && (!ids || !ids.length)) {
      return "—";
    }
    const items = snips && snips.length
      ? snips.map(function (s) {
          return {
            id: s.id || "",
            text: s.text || "",
          };
        })
      : ids.map(function (id) {
          return { id: id, text: "" };
        });
    if (!items.length) return "—";
    function itemHtml(it) {
      return (
        "<span class=\"hist-wrong-item\"><code>" +
        escapeHtml(it.id) +
        "</code>" +
        (it.text
          ? " " + escapeHtml(trimSnip(it.text, 28))
          : "") +
        "</span>"
      );
    }
    if (items.length <= 2) {
      return items.map(itemHtml).join("<br>");
    }
    var head = items
      .slice(0, 2)
      .map(itemHtml)
      .join("<br>");
    var rest = items
      .slice(2)
      .map(itemHtml)
      .join("<br>");
    return (
      head +
      '<details class="hist-wrong-more"><summary>仲有 ' +
      (items.length - 2) +
      " 題</summary>" +
      rest +
      "</details>"
    );
  }

  function renderHistory() {
    if (!el.histBody) return;
    const list = window.P4Storage ? window.P4Storage.loadHistory() : [];
    if (!list.length) {
      el.histBody.innerHTML = '<p class="empty-note">未有紀錄。</p>';
      return;
    }
    let html =
      '<div class="hist-table-wrap"><table class="hist"><thead><tr>' +
      "<th>時間（香港）</th><th>課題</th><th>分數</th><th>提示次數</th><th>錯題</th>" +
      "</tr></thead><tbody>";
    list.forEach(function (h) {
      html +=
        "<tr><td>" +
        escapeHtml(h.when || "") +
        "</td><td>" +
        escapeHtml(h.topic || "") +
        "</td><td>" +
        escapeHtml(String(h.score) + "/" + String(h.total)) +
        "</td><td>" +
        escapeHtml(String(h.tips != null ? h.tips : 0)) +
        '</td><td class="hist-wrongs">' +
        formatHistWrongs(h) +
        "</td></tr>";
    });
    html += "</tbody></table></div>";
    el.histBody.innerHTML = html;
  }

  function renderTopWrongs() {
    var panel = $("wrongs-panel");
    var body = $("wrongs-body");
    if (!panel || !body) return;
    var rows =
      window.P4Storage && window.P4Storage.topWrongs
        ? window.P4Storage.topWrongs(5)
        : [];
    if (!rows.length) {
      panel.hidden = true;
      body.innerHTML = "";
      return;
    }
    panel.hidden = false;
    var html = '<ul class="top-wrongs-list">';
    rows.forEach(function (r) {
      html +=
        "<li><span class=\"tw-topic\">" +
        escapeHtml(r.topic || "—") +
        '</span><span class="tw-count">×' +
        escapeHtml(String(r.count)) +
        '</span><span class="tw-snip"><code>' +
        escapeHtml(r.id) +
        "</code> " +
        escapeHtml(trimSnip(r.text, 36)) +
        "</span></li>";
    });
    html += "</ul>";
    body.innerHTML = html;
  }

  function queueCloudSession(rec) {
    function applyStatus(st) {
      state.lastUploadStatus = st;
      renderScore();
    }
    function doSave(api) {
      api
        .saveSession(rec)
        .then(function (st) {
          applyStatus(st || "local");
        })
        .catch(function () {
          applyStatus("error");
        });
    }
    if (window.P4EngCloud && typeof window.P4EngCloud.saveSession === "function") {
      doSave(window.P4EngCloud);
      return;
    }
    var settled = false;
    var once = function () {
      if (settled) return;
      settled = true;
      window.removeEventListener("p4engcloud-ready", once);
      if (window.P4EngCloud) doSave(window.P4EngCloud);
      else applyStatus("local");
    };
    window.addEventListener("p4engcloud-ready", once);
    // Module may have finished between the check and addEventListener
    if (window.P4EngCloud) once();
    setTimeout(function () {
      if (state.lastUploadStatus === "pending") {
        settled = true;
        window.removeEventListener("p4engcloud-ready", once);
        applyStatus("local");
      }
    }, 8000);
  }

  function bindNickname() {
    var input = $("nick-input");
    if (!input || input._p4Bound) return;
    if (window.P4Storage) input.value = window.P4Storage.getNickname();
    input.addEventListener("change", function () {
      if (window.P4Storage) {
        input.value = window.P4Storage.setNickname(input.value);
      }
    });
    input.addEventListener("blur", function () {
      if (window.P4Storage) {
        input.value = window.P4Storage.setNickname(input.value);
      }
    });
    input._p4Bound = true;
  }

  function isTeacherMode() {
    try {
      return getQuery().get("teacher") === "1";
    } catch (e) {
      return false;
    }
  }

  function bindTeacherPanel() {
    var panel = $("teacher-panel");
    if (!panel) return;
    if (isTeacherMode()) {
      panel.open = true;
      panel.hidden = false;
    }
    var btn = $("btn-teacher-refresh");
    if (btn && !btn._p4Bound) {
      btn.addEventListener("click", function () {
        loadTeacherSessions(true);
      });
      btn._p4Bound = true;
    }
    if (!panel._p4Bound) {
      panel.addEventListener("toggle", function () {
        if (panel.open) loadTeacherSessions(false);
      });
      panel._p4Bound = true;
    }
    if (isTeacherMode() || panel.open) loadTeacherSessions(false);
  }

  function loadTeacherSessions(force) {
    var body = $("teacher-body");
    var meta = $("teacher-meta");
    if (!body) return;
    if (!force && body.getAttribute("data-loaded") === "1") return;
    body.innerHTML = '<p class="empty-note">載入雲端場次中…</p>';
    if (meta) meta.textContent = "讀取 Firestore…";

    function render(result) {
      var sessions = (result && result.sessions) || [];
      body.setAttribute("data-loaded", "1");
      if (meta) {
        meta.textContent =
          (result && result.source === "cloud"
            ? "雲端 · 最近 " + sessions.length + " 場"
            : "未能讀雲端") +
          (result && result.error ? "（" + result.error + "）" : "") +
          " · 路徑 p4_english_grammar/sessions/entries";
      }
      if (!sessions.length) {
        body.innerHTML =
          '<p class="empty-note">未有雲端場次。若剛上線，請確認 Firestore 規則已加入 p4 路徑；本機練習仍會累積 pending。</p>';
        return;
      }
      var agg =
        window.P4EngCloud && window.P4EngCloud.aggregateWrongs
          ? window.P4EngCloud.aggregateWrongs(sessions)
          : [];
      var html = "";
      if (agg.length) {
        html += '<h3 class="teacher-h3">常錯合計（今批場次）</h3><ul class="top-wrongs-list">';
        agg.slice(0, 15).forEach(function (r) {
          html +=
            "<li><span class=\"tw-topic\">" +
            escapeHtml(r.topic || "—") +
            '</span><span class="tw-count">×' +
            escapeHtml(String(r.count)) +
            '</span><span class="tw-snip"><code>' +
            escapeHtml(r.id) +
            "</code> " +
            escapeHtml(trimSnip(r.text, 36)) +
            "</span></li>";
        });
        html += "</ul>";
      }
      html += '<h3 class="teacher-h3">最近場次</h3>';
      html +=
        '<div class="hist-table-wrap"><table class="hist teacher-hist"><thead><tr>' +
        "<th>時間（香港）</th><th>暱稱</th><th>課題</th><th>分數</th><th>提示</th><th>錯題</th>" +
        "</tr></thead><tbody>";
      sessions.forEach(function (s) {
        html +=
          "<tr><td>" +
          escapeHtml(s.when || s.whenIso || "") +
          "</td><td>" +
          escapeHtml(s.nickname || "") +
          "</td><td>" +
          escapeHtml(s.topic || "") +
          (s.mode === "advanced" ? " ·進階" : "") +
          "</td><td>" +
          escapeHtml(String(s.score) + "/" + String(s.total)) +
          "</td><td>" +
          escapeHtml(String(s.tips != null ? s.tips : 0)) +
          '</td><td class="hist-wrongs">' +
          formatHistWrongs(s) +
          "</td></tr>";
      });
      html += "</tbody></table></div>";
      body.innerHTML = html;
    }

    function run(api) {
      api.loadSessions(50).then(render).catch(function (err) {
        render({ source: "none", sessions: [], error: String(err && err.message) });
      });
    }

    if (window.P4EngCloud && window.P4EngCloud.loadSessions) {
      run(window.P4EngCloud);
    } else {
      var once = function () {
        window.removeEventListener("p4engcloud-ready", once);
        if (window.P4EngCloud) run(window.P4EngCloud);
        else render({ source: "none", sessions: [], error: "cloud module not loaded" });
      };
      window.addEventListener("p4engcloud-ready", once);
      setTimeout(function () {
        if (body.getAttribute("data-loaded") !== "1") {
          render({ source: "none", sessions: [], error: "timeout" });
        }
      }, 10000);
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function boot() {
    if ($("topic-grid")) initHome();
    if ($("q-list") || $("passage-wrap")) initPractice();
    bindNickname();
    bindTeacherPanel();

    if (isSpa()) {
      var goHomeBtn = $("go-home");
      if (goHomeBtn && !goHomeBtn._p4Bound) {
        goHomeBtn.addEventListener("click", function (e) {
          e.preventDefault();
          showHome();
        });
        goHomeBtn._p4Bound = true;
      }
      // hashchange support (back/forward)
      window.addEventListener("hashchange", function () {
        var route = readRoute();
        if (route.topic) openTopic(route.topic, route.mode === "advanced" ? "advanced" : "basic");
        else showHome();
      });
    }
  }

  window.P4_openTopic = openTopic;
  window.P4_showHome = showHome;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
