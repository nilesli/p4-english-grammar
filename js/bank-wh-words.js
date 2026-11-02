/** 疑問詞對話填充 · r11 · 20261102r11 · tips = 思路 only, no answer leak
 * 範圍：How／How much／How many／How often／Who／What／Where／Why
 * 每題短對話：問句 + 答句（答句核對前都顯示）
 */
window.P4_BANK_WH_WORDS = [
  // —— How much（價錢）×3 ——
  {
    id: "w1",
    speakerAsk: "A",
    prompt: "______ is this apple?",
    speakerReply: "B",
    reply: "It is ten dollars.",
    options: [
      { value: "A", label: "A. How much" },
      { value: "B", label: "B. How many" },
      { value: "C", label: "C. How often" },
      { value: "D", label: "D. What" }
    ],
    answer: "A",
    tip: "睇答句：講咗價錢／金額。問「幾錢」嗰類。",
    teach: "How much → 問價錢或不可數數量。How much is this apple?"
  },
  {
    id: "w2",
    speakerAsk: "A",
    prompt: "______ are these grapes?",
    speakerReply: "B",
    reply: "They are twenty dollars a bag.",
    options: [
      { value: "A", label: "A. How many" },
      { value: "B", label: "B. How much" },
      { value: "C", label: "C. Where" },
      { value: "D", label: "D. Who" }
    ],
    answer: "B",
    tip: "答句有 dollars／價錢字眼——問金額，唔係問個數。",
    teach: "How much → 問價錢。How much are these grapes?"
  },
  {
    id: "w3",
    speakerAsk: "A",
    prompt: "Excuse me. ______ is that bottle of milk?",
    speakerReply: "B",
    reply: "It is twelve dollars.",
    options: [
      { value: "A", label: "A. How often" },
      { value: "B", label: "B. Why" },
      { value: "C", label: "C. How much" },
      { value: "D", label: "D. How" }
    ],
    answer: "C",
    tip: "店員／顧客對話，答句報價——先諗問價錢。",
    teach: "How much → 問價錢。How much is that bottle of milk?"
  },
  // —— How many（可數數量）×3 ——
  {
    id: "w4",
    speakerAsk: "A",
    prompt: "______ oranges do you want?",
    speakerReply: "B",
    reply: "I want six oranges, please.",
    options: [
      { value: "A", label: "A. How much" },
      { value: "B", label: "B. How many" },
      { value: "C", label: "C. How often" },
      { value: "D", label: "D. What" }
    ],
    answer: "B",
    tip: "答句有數字＋可數嘢（oranges）——問「幾多個」。",
    teach: "How many → 問可數名詞數量。How many oranges…?"
  },
  {
    id: "w5",
    speakerAsk: "A",
    prompt: "______ eggs are in the basket?",
    speakerReply: "B",
    reply: "There are eight eggs.",
    options: [
      { value: "A", label: "A. How" },
      { value: "B", label: "B. How much" },
      { value: "C", label: "C. How many" },
      { value: "D", label: "D. Where" }
    ],
    answer: "C",
    tip: "答句講「有幾多粒／個」可數物品，唔係講價錢。",
    teach: "How many → 問可數數量。How many eggs…?"
  },
  {
    id: "w6",
    speakerAsk: "A",
    prompt: "______ bags of rice do we need?",
    speakerReply: "B",
    reply: "We need two bags.",
    options: [
      { value: "A", label: "A. How many" },
      { value: "B", label: "B. How much" },
      { value: "C", label: "C. Who" },
      { value: "D", label: "D. Why" }
    ],
    answer: "A",
    tip: "答句係數字＋bags——問件數／袋數。",
    teach: "How many → 問可數數量。How many bags…?"
  },
  // —— How often（頻率）×3 ——
  {
    id: "w7",
    speakerAsk: "A",
    prompt: "______ do you go to the supermarket?",
    speakerReply: "B",
    reply: "I go there twice a week.",
    options: [
      { value: "A", label: "A. How much" },
      { value: "B", label: "B. How many" },
      { value: "C", label: "C. How often" },
      { value: "D", label: "D. Where" }
    ],
    answer: "C",
    tip: "答句有 twice a week 之類——講「幾耐去一次」。",
    teach: "How often → 問頻率。How often do you go…?"
  },
  {
    id: "w8",
    speakerAsk: "A",
    prompt: "______ does Mum buy fresh bread?",
    speakerReply: "B",
    reply: "She buys it every morning.",
    options: [
      { value: "A", label: "A. Who" },
      { value: "B", label: "B. How often" },
      { value: "C", label: "C. How much" },
      { value: "D", label: "D. What" }
    ],
    answer: "B",
    tip: "答句 every morning＝規律次數，唔係問邊個或幾錢。",
    teach: "How often → 問頻率。How often does Mum buy…?"
  },
  {
    id: "w9",
    speakerAsk: "A",
    prompt: "______ do you help at the shop?",
    speakerReply: "B",
    reply: "I help once a month.",
    options: [
      { value: "A", label: "A. How" },
      { value: "B", label: "B. Why" },
      { value: "C", label: "C. How many" },
      { value: "D", label: "D. How often" }
    ],
    answer: "D",
    tip: "答句 once a month——講頻率，唔係講方法。",
    teach: "How often → 問頻率。How often do you help…?"
  },
  // —— How（方式）×3 ——
  {
    id: "w10",
    speakerAsk: "A",
    prompt: "______ do you carry the heavy bags?",
    speakerReply: "B",
    reply: "I use a shopping trolley.",
    options: [
      { value: "A", label: "A. How" },
      { value: "B", label: "B. How much" },
      { value: "C", label: "C. Who" },
      { value: "D", label: "D. Where" }
    ],
    answer: "A",
    tip: "答句講用咩工具／方法去做，唔係講價錢或地方。",
    teach: "How → 問方式。How do you carry…?"
  },
  {
    id: "w11",
    speakerAsk: "A",
    prompt: "______ can I pay for the fruit?",
    speakerReply: "B",
    reply: "You can pay by Octopus or cash.",
    options: [
      { value: "A", label: "A. What" },
      { value: "B", label: "B. How" },
      { value: "C", label: "C. How many" },
      { value: "D", label: "D. Why" }
    ],
    answer: "B",
    tip: "答句講付款方式（by…），即「點樣俾錢」。",
    teach: "How → 問方式。How can I pay…?"
  },
  {
    id: "w12",
    speakerAsk: "A",
    prompt: "______ do you keep the eggs fresh?",
    speakerReply: "B",
    reply: "I put them in the fridge.",
    options: [
      { value: "A", label: "A. How often" },
      { value: "B", label: "B. How much" },
      { value: "C", label: "C. How" },
      { value: "D", label: "D. Who" }
    ],
    answer: "C",
    tip: "答句講做法步驟（put…），問「點樣做」。",
    teach: "How → 問方式。How do you keep…?"
  },
  // —— Who（人）×3 ——
  {
    id: "w13",
    speakerAsk: "A",
    prompt: "______ is the shop assistant in the green shirt?",
    speakerReply: "B",
    reply: "She is Miss Chan.",
    options: [
      { value: "A", label: "A. What" },
      { value: "B", label: "B. Where" },
      { value: "C", label: "C. Why" },
      { value: "D", label: "D. Who" }
    ],
    answer: "D",
    tip: "答句係人名——問「邊個」。",
    teach: "Who → 問人。Who is the shop assistant…?"
  },
  {
    id: "w14",
    speakerAsk: "A",
    prompt: "______ helped you find the rice?",
    speakerReply: "B",
    reply: "Uncle Tom helped me.",
    options: [
      { value: "A", label: "A. Who" },
      { value: "B", label: "B. How" },
      { value: "C", label: "C. How much" },
      { value: "D", label: "D. What" }
    ],
    answer: "A",
    tip: "答句講邊個幫手——問人，唔係問方法。",
    teach: "Who → 問人。Who helped you…?"
  },
  {
    id: "w15",
    speakerAsk: "A",
    prompt: "______ is packing the groceries for us?",
    speakerReply: "B",
    reply: "Dad is packing them.",
    options: [
      { value: "A", label: "A. Where" },
      { value: "B", label: "B. Who" },
      { value: "C", label: "C. How often" },
      { value: "D", label: "D. How many" }
    ],
    answer: "B",
    tip: "答句主語係人（Dad）——問邊個喺度做。",
    teach: "Who → 問人。Who is packing…?"
  },
  // —— What（事物／資料）×3 ——
  {
    id: "w16",
    speakerAsk: "A",
    prompt: "______ would you like from the fruit section?",
    speakerReply: "B",
    reply: "I would like some bananas.",
    options: [
      { value: "A", label: "A. Who" },
      { value: "B", label: "B. Where" },
      { value: "C", label: "C. What" },
      { value: "D", label: "D. Why" }
    ],
    answer: "C",
    tip: "答句講想要嘅嘢（bananas）——問事物。",
    teach: "What → 問事物／資料。What would you like…?"
  },
  {
    id: "w17",
    speakerAsk: "A",
    prompt: "______ is on special offer today?",
    speakerReply: "B",
    reply: "The chicken is on special offer.",
    options: [
      { value: "A", label: "A. What" },
      { value: "B", label: "B. How much" },
      { value: "C", label: "C. How many" },
      { value: "D", label: "D. Who" }
    ],
    answer: "A",
    tip: "答句講邊樣貨品特價——問「咩嘢」。",
    teach: "What → 問事物。What is on special offer…?"
  },
  {
    id: "w18",
    speakerAsk: "A",
    prompt: "______ do we need to buy for dinner?",
    speakerReply: "B",
    reply: "We need fish and vegetables.",
    options: [
      { value: "A", label: "A. How" },
      { value: "B", label: "B. Where" },
      { value: "C", label: "C. Why" },
      { value: "D", label: "D. What" }
    ],
    answer: "D",
    tip: "答句列食物名稱——問要買咩。",
    teach: "What → 問事物。What do we need to buy…?"
  },
  // —— Where（地方）×3 ——
  {
    id: "w19",
    speakerAsk: "A",
    prompt: "______ can I find the milk?",
    speakerReply: "B",
    reply: "It is in Aisle 3.",
    options: [
      { value: "A", label: "A. Who" },
      { value: "B", label: "B. Where" },
      { value: "C", label: "C. What" },
      { value: "D", label: "D. How much" }
    ],
    answer: "B",
    tip: "答句講貨架／通道位置——問「喺邊」。",
    teach: "Where → 問地方。Where can I find…?"
  },
  {
    id: "w20",
    speakerAsk: "A",
    prompt: "______ is the checkout?",
    speakerReply: "B",
    reply: "It is near the exit.",
    options: [
      { value: "A", label: "A. How" },
      { value: "B", label: "B. Why" },
      { value: "C", label: "C. Where" },
      { value: "D", label: "D. How often" }
    ],
    answer: "C",
    tip: "答句 near the exit＝位置——問地點。",
    teach: "Where → 問地方。Where is the checkout?"
  },
  {
    id: "w21",
    speakerAsk: "A",
    prompt: "______ did you put the shopping list?",
    speakerReply: "B",
    reply: "I put it on the kitchen table.",
    options: [
      { value: "A", label: "A. Where" },
      { value: "B", label: "B. Who" },
      { value: "C", label: "C. How many" },
      { value: "D", label: "D. What" }
    ],
    answer: "A",
    tip: "答句 on the…＝放咗喺邊——問地方。",
    teach: "Where → 問地方。Where did you put…?"
  },
  // —— Why（原因）×3 ——
  {
    id: "w22",
    speakerAsk: "A",
    prompt: "______ are the strawberries so cheap today?",
    speakerReply: "B",
    reply: "Because they are on sale.",
    options: [
      { value: "A", label: "A. What" },
      { value: "B", label: "B. Where" },
      { value: "C", label: "C. How" },
      { value: "D", label: "D. Why" }
    ],
    answer: "D",
    tip: "答句 Because…——講原因。",
    teach: "Why → 問原因。Why are the strawberries…?"
  },
  {
    id: "w23",
    speakerAsk: "A",
    prompt: "______ is the shop closed now?",
    speakerReply: "B",
    reply: "Because it is a public holiday.",
    options: [
      { value: "A", label: "A. Why" },
      { value: "B", label: "B. Who" },
      { value: "C", label: "C. How much" },
      { value: "D", label: "D. How many" }
    ],
    answer: "A",
    tip: "答句用 Because 解釋——問「點解」。",
    teach: "Why → 問原因。Why is the shop closed…?"
  },
  {
    id: "w24",
    speakerAsk: "A",
    prompt: "______ do we need a bigger trolley?",
    speakerReply: "B",
    reply: "Because we have a lot of things to buy.",
    options: [
      { value: "A", label: "A. How often" },
      { value: "B", label: "B. Where" },
      { value: "C", label: "C. Why" },
      { value: "D", label: "D. What" }
    ],
    answer: "C",
    tip: "答句 Because… 解釋目的／原因。",
    teach: "Why → 問原因。Why do we need…?"
  }
];
