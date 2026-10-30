/** auto bank · r8 tips · 20261030r8 · tips = 思路 only, no answer leak */
window.P4_BANK_QUANTIFIERS = [
  {
    "id": "q1",
    "prompt": "Mum bought ______ peanut butter for the picnic sandwiches.",
    "options": [
      {
        "value": "A",
        "label": "A. a jar of"
      },
      {
        "value": "B",
        "label": "B. a bar of"
      },
      {
        "value": "C",
        "label": "C. a bunch of"
      },
      {
        "value": "D",
        "label": "D. a loaf of"
      }
    ],
    "answer": "A",
    "tip": "花生醬係糊狀醬料：超市常見用邊種容器裝？金屬罐、玻璃／塑膠廣口樽、定成條／成串？",
    "teach": "a jar of peanut butter。"
  },
  {
    "id": "q2",
    "prompt": "Please put ______ crisps on the shopping list.",
    "options": [
      {
        "value": "A",
        "label": "A. a carton of"
      },
      {
        "value": "B",
        "label": "B. a packet of"
      },
      {
        "value": "C",
        "label": "C. a loaf of"
      },
      {
        "value": "D",
        "label": "D. a bar of"
      }
    ],
    "answer": "B",
    "tip": "薯片係鬆脆零食：多數用邊種包裝？紙盒飲品、袋裝、定麵包形？",
    "teach": "a packet of crisps。"
  },
  {
    "id": "q3",
    "prompt": "We need ______ soya milk for breakfast.",
    "options": [
      {
        "value": "A",
        "label": "A. a carton of"
      },
      {
        "value": "B",
        "label": "B. a bar of"
      },
      {
        "value": "C",
        "label": "C. a bunch of"
      },
      {
        "value": "D",
        "label": "D. a loaf of"
      }
    ],
    "answer": "A",
    "tip": "豆漿／牛奶類飲品：超市常見係紙盒裝定成條朱古力形？",
    "teach": "a carton of soya milk。"
  },
  {
    "id": "q4",
    "prompt": "Tom wants ______ chocolate after dinner.",
    "options": [
      {
        "value": "A",
        "label": "A. a bar of"
      },
      {
        "value": "B",
        "label": "B. a jar of"
      },
      {
        "value": "C",
        "label": "C. a loaf of"
      },
      {
        "value": "D",
        "label": "D. a bunch of"
      }
    ],
    "answer": "A",
    "tip": "一整條朱古力（唔係盒入面好多粒）：形狀似「長條」定「成串水果」？",
    "teach": "a bar of chocolate（vs a box of chocolates）。"
  },
  {
    "id": "q5",
    "prompt": "Dad bought ______ grapes at the supermarket.",
    "options": [
      {
        "value": "A",
        "label": "A. a bar of"
      },
      {
        "value": "B",
        "label": "B. a bunch of"
      },
      {
        "value": "C",
        "label": "C. a loaf of"
      },
      {
        "value": "D",
        "label": "D. a tin of"
      }
    ],
    "answer": "B",
    "tip": "葡萄通常連枝賣：係成串、定袋裝零食、定紙盒奶？",
    "teach": "a bunch of grapes。"
  },
  {
    "id": "q6",
    "prompt": "Can you get ______ bread for the picnic sandwiches?",
    "options": [
      {
        "value": "A",
        "label": "A. a jar of"
      },
      {
        "value": "B",
        "label": "B. a loaf of"
      },
      {
        "value": "C",
        "label": "C. a bar of"
      },
      {
        "value": "D",
        "label": "D. a carton of"
      }
    ],
    "answer": "B",
    "tip": "麵包成條賣：想緊係麵包形量詞、定醬料樽、定金屬罐？",
    "teach": "a loaf of bread。"
  },
  {
    "id": "q7",
    "prompt": "There is ______ nuts on the picnic table.",
    "options": [
      {
        "value": "A",
        "label": "A. a tin of"
      },
      {
        "value": "B",
        "label": "B. a beans of"
      },
      {
        "value": "C",
        "label": "C. a loaf of"
      },
      {
        "value": "D",
        "label": "D. a bar of"
      }
    ],
    "answer": "A",
    "tip": "堅果常見金屬罐裝；留意有冇明顯唔合英文習慣嘅配對（例如亂用 beans 配堅果）。",
    "teach": "a tin of nuts（唔係 beans of nuts）。"
  },
  {
    "id": "q8",
    "prompt": "Match the container: peanut butter → ______",
    "options": [
      {
        "value": "A",
        "label": "A. a jar of"
      },
      {
        "value": "B",
        "label": "B. a tin of"
      },
      {
        "value": "C",
        "label": "C. a bunch of"
      },
      {
        "value": "D",
        "label": "D. a loaf of"
      }
    ],
    "answer": "A",
    "tip": "糊狀醬料多用廣口玻璃／塑膠樽；同金屬罐（tin）分清楚邊種啱醬。",
    "teach": "peanut butter → a jar of。"
  },
  {
    "id": "q9",
    "prompt": "She opened ______ chocolates to share with Class 4A. (many small ones in a box)",
    "options": [
      {
        "value": "A",
        "label": "A. a bar of"
      },
      {
        "value": "B",
        "label": "B. a box of"
      },
      {
        "value": "C",
        "label": "C. a loaf of"
      },
      {
        "value": "D",
        "label": "D. a bunch of"
      }
    ],
    "answer": "B",
    "tip": "「好多粒細嘅、裝喺盒」——唔係一整條；分清盒裝粒裝同長條形。",
    "teach": "a box of chocolates ≠ a bar of chocolate。"
  },
  {
    "id": "q10",
    "prompt": "Which is correct for metal-can nuts?",
    "options": [
      {
        "value": "A",
        "label": "A. a beans of nuts"
      },
      {
        "value": "B",
        "label": "B. a tin of nuts"
      },
      {
        "value": "C",
        "label": "C. a loaf of nuts"
      },
      {
        "value": "D",
        "label": "D. a bunch of nuts"
      }
    ],
    "answer": "B",
    "tip": "金屬罐裝堅果；beans 亂配係常見錯寫，可先排除。",
    "teach": "a tin of nuts ✓；beans of nuts ✗。"
  },
  {
    "id": "q11",
    "prompt": "We bought ______ biscuits for the country park picnic.",
    "options": [
      {
        "value": "A",
        "label": "A. a packet of"
      },
      {
        "value": "B",
        "label": "B. a loaf of"
      },
      {
        "value": "C",
        "label": "C. a bunch of"
      },
      {
        "value": "D",
        "label": "D. a bar of"
      }
    ],
    "answer": "A",
    "tip": "餅乾鬆脆零食：袋裝定紙盒奶、定麵包形較常見？",
    "teach": "a packet of biscuits。"
  },
  {
    "id": "q12",
    "prompt": "Please buy ______ jam to put on the bread.",
    "options": [
      {
        "value": "A",
        "label": "A. a jar of"
      },
      {
        "value": "B",
        "label": "B. a bar of"
      },
      {
        "value": "C",
        "label": "C. a bunch of"
      },
      {
        "value": "D",
        "label": "D. a loaf of"
      }
    ],
    "answer": "A",
    "tip": "果醬同花生醬一樣係糊狀：廣口樽裝同金屬罐、成串，邊種較啱？",
    "teach": "a jar of jam。"
  },
  {
    "id": "q13",
    "prompt": "Mum put ______ orange juice in the fridge.",
    "options": [
      {
        "value": "A",
        "label": "A. a carton of"
      },
      {
        "value": "B",
        "label": "B. a loaf of"
      },
      {
        "value": "C",
        "label": "C. a bar of"
      },
      {
        "value": "D",
        "label": "D. a bunch of"
      }
    ],
    "answer": "A",
    "tip": "盒裝果汁：紙盒飲品類容器，唔係長條朱古力或成串水果。",
    "teach": "a carton of orange juice。"
  },
  {
    "id": "q14",
    "prompt": "He ate ______ chocolate and felt full. (one long piece)",
    "options": [
      {
        "value": "A",
        "label": "A. a box of"
      },
      {
        "value": "B",
        "label": "B. a bar of"
      },
      {
        "value": "C",
        "label": "C. a jar of"
      },
      {
        "value": "D",
        "label": "D. a tin of"
      }
    ],
    "answer": "B",
    "tip": "「一長條」朱古力——同「一盒好多粒」唔同；先睇形狀再揀。",
    "teach": "a bar of chocolate。"
  },
  {
    "id": "q15",
    "prompt": "There are ______ bananas on the picnic mat. (joined together)",
    "options": [
      {
        "value": "A",
        "label": "A. a bunch of"
      },
      {
        "value": "B",
        "label": "B. a loaf of"
      },
      {
        "value": "C",
        "label": "C. a bar of"
      },
      {
        "value": "D",
        "label": "D. a carton of"
      }
    ],
    "answer": "A",
    "tip": "水果連住一齊賣：串／束類，定袋裝、定麵包形？",
    "teach": "a bunch of bananas。"
  },
  {
    "id": "q16",
    "prompt": "Which pair is wrong?",
    "options": [
      {
        "value": "A",
        "label": "A. a loaf of bread"
      },
      {
        "value": "B",
        "label": "B. a tin of nuts"
      },
      {
        "value": "C",
        "label": "C. a beans of nuts"
      },
      {
        "value": "D",
        "label": "D. a jar of peanut butter"
      }
    ],
    "answer": "C",
    "tip": "搵出唔合英文習慣嘅配對：堅果會用邊種容器？邊個選項明顯亂配？",
    "teach": "beans of nuts ✗ → a tin of nuts ✓。"
  },
  {
    "id": "q17",
    "prompt": "The shopping list says: ______ tuna for the salad.",
    "options": [
      {
        "value": "A",
        "label": "A. a tin of"
      },
      {
        "value": "B",
        "label": "B. a loaf of"
      },
      {
        "value": "C",
        "label": "C. a bunch of"
      },
      {
        "value": "D",
        "label": "D. a bar of"
      }
    ],
    "answer": "A",
    "tip": "吞拿魚超市常見金屬罐；同玻璃廣口樽、袋裝零食分清。",
    "teach": "a tin of tuna。"
  },
  {
    "id": "q18",
    "prompt": "For sandwiches we need ______ bread and ______ peanut butter.",
    "options": [
      {
        "value": "A",
        "label": "A. a loaf of; a jar of"
      },
      {
        "value": "B",
        "label": "B. a bar of; a tin of"
      },
      {
        "value": "C",
        "label": "C. a bunch of; a carton of"
      },
      {
        "value": "D",
        "label": "D. a packet of; a loaf of"
      }
    ],
    "answer": "A",
    "tip": "兩格：麵包用邊種「成條」量詞？花生醬用邊種「糊狀樽裝」？各自對應，唔好互換。",
    "teach": "a loaf of bread；a jar of peanut butter。"
  }
];
