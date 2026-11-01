/**
 * 小四英文温習 · 課題清單 + 教學重點
 * r9 weakspot · banks 20261101r9（提示只畀思路；針對考試錯題加練）
 */
window.P4_TOPICS = [
  {
    id: "tenses",
    title: "Tenses（現在＋過去）",
    short: "Tenses",
    enabled: true,
    hasAdvanced: true,
    bankKey: "P4_BANK_TENSES",
    advancedBankKey: "P4_BANK_TENSES_ADVANCED",
    historyTopic: "Tenses",
    historyTopicAdvanced: "Tenses·進階",
    teachHtml: `
      <div class="teach-callout"><div class="lead">點樣分現在同過去</div>
      先搵時間詞：yesterday／last／ago → 過去；every／often／now／habits → 現在。</div>
      <div class="teach-callout" style="margin-top:0.75rem;"><div class="lead">進階</div>
      先搵全文時間詞，再逐格判斷；唔好見第一個時間詞就全程同一時態。</div>
      <h3>現在式</h3>
      <table class="teach-table"><thead><tr><th>用法</th><th>例子</th></tr></thead><tbody>
      <tr><td>習慣／頻率</td><td>She often reads.</td></tr>
      <tr><td>而家狀態</td><td>Mum is busy.</td></tr>
      <tr><td>問句</td><td>Does Sam go…?</td></tr>
      </tbody></table>
      <h3>過去式</h3>
      <table class="teach-table"><thead><tr><th>類型</th><th>例子</th></tr></thead><tbody>
      <tr><td>規則 +ed</td><td>watched／prepared</td></tr>
      <tr><td>不規則</td><td>go→went，eat→ate，make→made</td></tr>
      <tr><td>be</td><td>was／were</td></tr>
      </tbody></table>
      <h3>常見錯</h3>
      <ul class="mistake-list">
      <li><div class="mtitle">過去時間仍寫原形</div>Last Sunday we watch… ✗ → watched ✓</li>
      <li><div class="mtitle">so 句漏過去式</div>I was sick so go… ✗ → so I went… ✓</li>
      <li><div class="mtitle">Does 後再加 -s</div>Does he goes? ✗ → Does he go? ✓</li>
      </ul>`,
  },
  {
    id: "like-ving",
    title: "like / good at + V-ing",
    short: "like / good at + V-ing",
    enabled: true,
    hasAdvanced: false,
    bankKey: "P4_BANK_LIKE_VING",
    historyTopic: "like-ving",
    teachHtml: `
      <div class="teach-callout"><div class="lead">V-ing 喜好同擅長</div>
      like／enjoy／love／hate 後面多數用 V-ing；be good at 後面亦用 V-ing。</div>
      <table class="teach-table"><thead><tr><th>句型</th><th>例子</th></tr></thead><tbody>
      <tr><td>like + V-ing</td><td>I like playing football.</td></tr>
      <tr><td>enjoy + V-ing</td><td>She enjoys reading.</td></tr>
      <tr><td>good at + V-ing</td><td>He is good at drawing.</td></tr>
      </tbody></table>
      <ul class="mistake-list"><li><div class="mtitle">好 at 後用原形</div>good at draw ✗ → good at drawing ✓</li></ul>`,
  },
  {
    id: "do-does",
    title: "do／does 問句",
    short: "do／does 問句",
    enabled: true,
    hasAdvanced: false,
    bankKey: "P4_BANK_DO_DOES",
    historyTopic: "do-does",
    teachHtml: `
      <div class="teach-callout"><div class="lead">Simple Present 問句</div>
      I／you／we／they → Do；he／she／it／名字 → Does。Does 後面動詞要用<strong>原形</strong>。</div>
      <table class="teach-table"><thead><tr><th>主語</th><th>助動詞</th></tr></thead><tbody>
      <tr><td>I／you／we／they</td><td>Do</td></tr>
      <tr><td>he／she／it</td><td>Does</td></tr>
      </tbody></table>
      <ul class="mistake-list"><li><div class="mtitle">Does 後再加 -s</div>Does he goes? ✗ → Does he go? ✓</li></ul>`,
  },
  {
    id: "wh-words",
    title: "疑問詞",
    short: "疑問詞",
    enabled: true,
    hasAdvanced: false,
    bankKey: "P4_BANK_WH_WORDS",
    historyTopic: "wh-words",
    teachHtml: `
      <div class="teach-callout"><div class="lead">揀啱疑問詞</div>
      先想清楚問嘅係人、物、地、時、原因定方式。</div>
      <table class="teach-table"><thead><tr><th>詞</th><th>問咩</th></tr></thead><tbody>
      <tr><td>What</td><td>事物／資料</td></tr>
      <tr><td>Where</td><td>地方</td></tr>
      <tr><td>When／What time</td><td>時間</td></tr>
      <tr><td>Who／Whose</td><td>人／誰的</td></tr>
      <tr><td>Why</td><td>原因</td></tr>
      <tr><td>How／How often／How many／How much</td><td>方式／頻率／數量／價錢</td></tr>
      <tr><td>How about…?</td><td>邀請／建議（唔係問方式）</td></tr>
      <tr><td>Which</td><td>有限選擇</td></tr>
      </tbody></table>`,
  },
  {
    id: "frequency",
    title: "頻率副詞",
    short: "頻率副詞",
    enabled: true,
    hasAdvanced: false,
    bankKey: "P4_BANK_FREQUENCY",
    historyTopic: "frequency",
    teachHtml: `
      <div class="teach-callout"><div class="lead">always → never</div>
      always（總是）／usually（通常）／often（經常）／sometimes（有時）／never（從不）。</div>
      <table class="teach-table"><thead><tr><th>位置</th><th>例子</th></tr></thead><tbody>
      <tr><td>be 動詞後</td><td>She is always late.</td></tr>
      <tr><td>一般動詞前</td><td>They often play football.</td></tr>
      </tbody></table>`,
  },
  {
    id: "too-either",
    title: "too／either",
    short: "too／either",
    enabled: true,
    hasAdvanced: false,
    bankKey: "P4_BANK_TOO_EITHER",
    historyTopic: "too-either",
    teachHtml: `
      <div class="teach-callout"><div class="lead">肯定 too、否定 either</div>
      肯定句尾用 too；否定句尾用 either。唔好喺否定句用 too。</div>
      <table class="teach-table"><thead><tr><th>類型</th><th>例子</th></tr></thead><tbody>
      <tr><td>肯定</td><td>I like mangoes. She likes them too.</td></tr>
      <tr><td>否定</td><td>I don't like spicy food. He doesn't either.</td></tr>
      </tbody></table>`,
  },
  {
    id: "conjunctions",
    title: "連接詞 both…and／or／but／so",
    short: "連接詞",
    enabled: true,
    hasAdvanced: false,
    bankKey: "P4_BANK_CONJUNCTIONS",
    historyTopic: "conjunctions",
    teachHtml: `
      <div class="teach-callout"><div class="lead">連接意思</div>
      both…and（兩者都）、or（或者／否則）、but（但是）、so（所以）。</div>
      <table class="teach-table"><thead><tr><th>連接詞</th><th>用途</th></tr></thead><tbody>
      <tr><td>both A and B</td><td>兩者都</td></tr>
      <tr><td>or</td><td>選擇／否則</td></tr>
      <tr><td>but</td><td>轉折</td></tr>
      <tr><td>so</td><td>結果（後面要有主語）</td></tr>
      </tbody></table>`,
  },
  {
    id: "comparatives",
    title: "比較級／最高級",
    short: "比較級／最高級",
    enabled: true,
    hasAdvanced: false,
    bankKey: "P4_BANK_COMPARATIVES",
    historyTopic: "comparatives",
    teachHtml: `
      <div class="teach-callout"><div class="lead">短詞／長詞／不規則</div>
      短：-er／-est；長：more／most；good→better／best；bad→worse／worst。</div>
      <table class="teach-table"><thead><tr><th>類型</th><th>例子</th></tr></thead><tbody>
      <tr><td>短比較</td><td>taller／thinner／cheaper than</td></tr>
      <tr><td>短最高</td><td>the tallest／cheapest</td></tr>
      <tr><td>y→i</td><td>healthy→healthier；dirty→dirtier</td></tr>
      <tr><td>長比較</td><td>more popular／delicious than</td></tr>
      <tr><td>長最高</td><td>the most expensive／exciting</td></tr>
      <tr><td>不規則</td><td>better／best；worse／worst</td></tr>
      </tbody></table>`,
  },
  {
    id: "would-like",
    title: "would like／What·Which",
    short: "would like",
    enabled: true,
    hasAdvanced: false,
    bankKey: "P4_BANK_WOULD_LIKE",
    historyTopic: "would-like",
    teachHtml: `
      <div class="teach-callout"><div class="lead">想要 vs 喜好</div>
      like＝平時喜好；would like＝禮貌想要。would like + 名詞 或 to + 原形。</div>
      <table class="teach-table"><thead><tr><th>句型</th><th>例子</th></tr></thead><tbody>
      <tr><td>Would you like…?</td><td>Would you like some tea?</td></tr>
      <tr><td>would like to + V</td><td>I would like to rest.</td></tr>
      <tr><td>What／Which … would you like?</td><td>Which dessert would you like?</td></tr>
      </tbody></table>`,
  },
  {
    id: "punctuation",
    title: "標點",
    short: "標點",
    enabled: true,
    hasAdvanced: false,
    bankKey: "P4_BANK_PUNCTUATION",
    historyTopic: "punctuation",
    teachHtml: `
      <div class="teach-callout"><div class="lead">點樣練</div>
      將標點字卡拖去（或先撳標點再撳「＋」位）字後面嘅插入位。</div>
      <div class="teach-callout" style="margin-top:0.75rem;"><div class="lead">句末同撇號</div>
      陳述 . ／疑問 ? ／感嘆 !；所有格 Tom's；縮寫 don't／it's／we're。</div>
      <table class="teach-table"><thead><tr><th>重點</th><th>例子</th></tr></thead><tbody>
      <tr><td>問句</td><td>Where is my bag?</td></tr>
      <tr><td>所有格</td><td>Tom's book；girls' toys</td></tr>
      <tr><td>it's vs its</td><td>it's = it is；its = 它的</td></tr>
      </tbody></table>`,
  },
  {
    id: "quantifiers",
    title: "Quantifiers（量詞／容器）",
    short: "Quantifiers",
    enabled: true,
    hasAdvanced: false,
    bankKey: "P4_BANK_QUANTIFIERS",
    historyTopic: "quantifiers",
    teachHtml: `
      <div class="teach-callout"><div class="lead">a … of …</div>
      用容器／形狀量詞：a jar／packet／carton／bar／bunch／loaf／tin of + 名詞。</div>
      <table class="teach-table"><thead><tr><th>量詞</th><th>常見配對</th></tr></thead><tbody>
      <tr><td>a jar of</td><td>peanut butter／jam</td></tr>
      <tr><td>a packet of</td><td>crisps／biscuits</td></tr>
      <tr><td>a carton of</td><td>soya milk／juice</td></tr>
      <tr><td>a bar of</td><td>chocolate（一條）</td></tr>
      <tr><td>a bunch of</td><td>grapes／bananas</td></tr>
      <tr><td>a loaf of</td><td>bread</td></tr>
      <tr><td>a tin of</td><td>nuts／tuna</td></tr>
      </tbody></table>
      <h3>常見錯</h3>
      <ul class="mistake-list">
      <li><div class="mtitle">tin vs jar</div>金屬罐 tin；玻璃／塑膠樽 jar（花生醬多用 jar）</li>
      <li><div class="mtitle">bar vs box</div>a bar of chocolate（一條）≠ a box of chocolates（一盒）</li>
      <li><div class="mtitle">beans of nuts</div>beans of nuts ✗ → a tin of nuts ✓</li>
      </ul>`,
  },
  {
    id: "sentence-order",
    title: "句子重組",
    short: "句子重組",
    enabled: true,
    hasAdvanced: false,
    bankKey: "P4_BANK_SENTENCE_ORDER",
    historyTopic: "sentence-order",
    teachHtml: `
      <div class="teach-callout"><div class="lead">點樣練</div>
      下面字庫係打亂字卡；撳字卡排入答案列，再撳可退回。標點亦係一格。</div>
      <div class="teach-callout" style="margin-top:0.75rem;"><div class="lead">重組思路</div>
      先搵主語同動詞，再睇疑問詞／助動詞位置；時間詞多數放句末。</div>
      <ul class="mistake-list">
      <li><div class="mtitle">陳述</div>主語 + 動詞 + 其他</li>
      <li><div class="mtitle">Yes/No 問句</div>Do／Does／Did + 主語 + 原形</li>
      <li><div class="mtitle">Wh 問句</div>Wh + 助動詞 + 主語 + 原形</li>
      </ul>`,
  },
];

window.P4_getTopic = function (id) {
  const list = window.P4_TOPICS || [];
  return list.find(function (t) { return t.id === id; }) || list[0];
};
