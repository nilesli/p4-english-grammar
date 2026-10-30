/** auto bank · r8 tips · 20261030r8 · tips = 思路 only, no answer leak */
window.P4_BANK_TENSES = [
  {
    "id": "t1",
    "prompt": "Mum ______ busy and will not join us at the cinema. (now)",
    "options": [
      {
        "value": "A",
        "label": "A. is"
      },
      {
        "value": "B",
        "label": "B. was"
      },
      {
        "value": "C",
        "label": "C. are"
      },
      {
        "value": "D",
        "label": "D. were"
      }
    ],
    "answer": "A",
    "tip": "括號 now：講而家狀態 → 現在式 be；主語 Mum 單數定複數？",
    "teach": "現在式：講而家狀態用 is／am／are。"
  },
  {
    "id": "t2",
    "prompt": "Last night many customers ______ the special on the menu. (order)",
    "options": [
      {
        "value": "A",
        "label": "A. order"
      },
      {
        "value": "B",
        "label": "B. orders"
      },
      {
        "value": "C",
        "label": "C. ordered"
      },
      {
        "value": "D",
        "label": "D. ordering"
      }
    ],
    "answer": "C",
    "tip": "有 Last night：事先發生 → 過去式；規則動詞多數加邊種字尾？",
    "teach": "過去式：有 last night／yesterday／ago。"
  },
  {
    "id": "t3",
    "prompt": "We ______ fish at the picnic yesterday afternoon. (eat)",
    "options": [
      {
        "value": "A",
        "label": "A. eat"
      },
      {
        "value": "B",
        "label": "B. eats"
      },
      {
        "value": "C",
        "label": "C. ate"
      },
      {
        "value": "D",
        "label": "D. eating"
      }
    ],
    "answer": "C",
    "tip": "有 yesterday afternoon：清楚過去；eat 唔係加 -ed 嗰類——記不規則過去形。",
    "teach": "不規則動詞：eat 嘅過去式唔係 eated。"
  },
  {
    "id": "t4",
    "prompt": "I ______ like red meat on the shopping list. (not)",
    "options": [
      {
        "value": "A",
        "label": "A. don't"
      },
      {
        "value": "B",
        "label": "B. doesn't"
      },
      {
        "value": "C",
        "label": "C. didn't"
      },
      {
        "value": "D",
        "label": "D. wasn't"
      }
    ],
    "answer": "A",
    "tip": "講而家喜好用現在式否定；主語係 I（唔係 he／she）→ 否定助動詞點揀？",
    "teach": "I／you／we／they → don't；he／she／it → doesn't。"
  },
  {
    "id": "t5",
    "prompt": "Yesterday we ______ home alone all day before the show. (be)",
    "options": [
      {
        "value": "A",
        "label": "A. are"
      },
      {
        "value": "B",
        "label": "B. is"
      },
      {
        "value": "C",
        "label": "C. were"
      },
      {
        "value": "D",
        "label": "D. was"
      }
    ],
    "answer": "C",
    "tip": "有 Yesterday：過去 be；主語 we＝複數 → 單數／複數過去 be 分清。",
    "teach": "be 過去：I／he／she／it → was；you／we／they → were。"
  },
  {
    "id": "t6",
    "prompt": "Last Sunday morning, we ______ to the radio. (listen)",
    "options": [
      {
        "value": "A",
        "label": "A. listen"
      },
      {
        "value": "B",
        "label": "B. listens"
      },
      {
        "value": "C",
        "label": "C. listened"
      },
      {
        "value": "D",
        "label": "D. listening"
      }
    ],
    "answer": "C",
    "tip": "有 Last Sunday morning：過去；規則動詞加 -ed。",
    "teach": "規則動詞過去式加 -ed。"
  },
  {
    "id": "t7",
    "prompt": "She often ______ magazines on Mondays in her spare time. (read)",
    "options": [
      {
        "value": "A",
        "label": "A. read"
      },
      {
        "value": "B",
        "label": "B. reads"
      },
      {
        "value": "C",
        "label": "C. reading"
      },
      {
        "value": "D",
        "label": "D. readed"
      }
    ],
    "answer": "B",
    "tip": "often／on Mondays＝習慣 → 現在式；主語 She → 動詞要唔要加 -s？",
    "teach": "習慣 → 現在式；he／she／it 加 -s。"
  },
  {
    "id": "t8",
    "prompt": "I was sick so I ______ to the doctor. (go)",
    "options": [
      {
        "value": "A",
        "label": "A. go"
      },
      {
        "value": "B",
        "label": "B. goes"
      },
      {
        "value": "C",
        "label": "C. went"
      },
      {
        "value": "D",
        "label": "D. going"
      }
    ],
    "answer": "C",
    "tip": "前面 I was…，so 後面都要跟過去；go 係不規則。",
    "teach": "so 連接兩件過去事。"
  },
  {
    "id": "t9",
    "prompt": "______ Sam go to the library at weekends?",
    "options": [
      {
        "value": "A",
        "label": "A. Do"
      },
      {
        "value": "B",
        "label": "B. Does"
      },
      {
        "value": "C",
        "label": "C. Did"
      },
      {
        "value": "D",
        "label": "D. Is"
      }
    ],
    "answer": "B",
    "tip": "at weekends＝習慣；主語 Sam＝單數 → 現在式助動詞？後面 go 原形。",
    "teach": "he／she／名字 → Does + 原形。"
  },
  {
    "id": "t10",
    "prompt": "What ______ you do on your birthday last year?",
    "options": [
      {
        "value": "A",
        "label": "A. do"
      },
      {
        "value": "B",
        "label": "B. does"
      },
      {
        "value": "C",
        "label": "C. did"
      },
      {
        "value": "D",
        "label": "D. are"
      }
    ],
    "answer": "C",
    "tip": "有 last year：過去問句用邊個助動詞？後面動詞保持原形。",
    "teach": "Did + 主語 + 動詞原形。"
  },
  {
    "id": "t11",
    "prompt": "Last Sunday we ______ a film at the cinema for hours. (watch)",
    "options": [
      {
        "value": "A",
        "label": "A. watch"
      },
      {
        "value": "B",
        "label": "B. watches"
      },
      {
        "value": "C",
        "label": "C. watched"
      },
      {
        "value": "D",
        "label": "D. watching"
      }
    ],
    "answer": "C",
    "tip": "有 Last Sunday：唔好用原形；規則動詞變過去。",
    "teach": "細妹常見錯：見到過去時間詞仍寫現在式。"
  },
  {
    "id": "t12",
    "prompt": "How much ______ the beef curry on the menu? (be, now)",
    "options": [
      {
        "value": "A",
        "label": "A. is"
      },
      {
        "value": "B",
        "label": "B. was"
      },
      {
        "value": "C",
        "label": "C. are"
      },
      {
        "value": "D",
        "label": "D. were"
      }
    ],
    "answer": "A",
    "tip": "括號 now：問而家價錢；curry 單數 → be 現在式邊個？",
    "teach": "問而家事實用現在式。"
  },
  {
    "id": "t13",
    "prompt": "He ______ his friends every day about hobbies. (text)",
    "options": [
      {
        "value": "A",
        "label": "A. text"
      },
      {
        "value": "B",
        "label": "B. texts"
      },
      {
        "value": "C",
        "label": "C. texted"
      },
      {
        "value": "D",
        "label": "D. texting"
      }
    ],
    "answer": "B",
    "tip": "every day＝習慣：現在式；主語 He → 加 -s。",
    "teach": "第三人稱單數加 -s／-es。"
  },
  {
    "id": "t14",
    "prompt": "I was hungry so I ______ a cake for dessert. (make)",
    "options": [
      {
        "value": "A",
        "label": "A. make"
      },
      {
        "value": "B",
        "label": "B. makes"
      },
      {
        "value": "C",
        "label": "C. made"
      },
      {
        "value": "D",
        "label": "D. making"
      }
    ],
    "answer": "C",
    "tip": "前面 I was…，so 跟過去；make 係不規則。",
    "teach": "make 嘅過去式唔係 makked。"
  },
  {
    "id": "t15",
    "prompt": "Ken ______ to Peter when he hurt his leg at the picnic. (run)",
    "options": [
      {
        "value": "A",
        "label": "A. run"
      },
      {
        "value": "B",
        "label": "B. runs"
      },
      {
        "value": "C",
        "label": "C. ran"
      },
      {
        "value": "D",
        "label": "D. running"
      }
    ],
    "answer": "C",
    "tip": "故事已發生：過去式；run 係不規則。",
    "teach": "寫作故事多數用過去式。"
  },
  {
    "id": "t16",
    "prompt": "I ______ playing tennis at weekends. (like)",
    "options": [
      {
        "value": "A",
        "label": "A. like"
      },
      {
        "value": "B",
        "label": "B. likes"
      },
      {
        "value": "C",
        "label": "C. liked"
      },
      {
        "value": "D",
        "label": "D. liking"
      }
    ],
    "answer": "A",
    "tip": "講平時喜好：現在式；主語 I → 原形（唔加 -s）。",
    "teach": "喜好／習慣通常用現在式。"
  },
  {
    "id": "t17",
    "prompt": "She ______ a picture of me last Sunday in the country park. (paint)",
    "options": [
      {
        "value": "A",
        "label": "A. paint"
      },
      {
        "value": "B",
        "label": "B. paints"
      },
      {
        "value": "C",
        "label": "C. painted"
      },
      {
        "value": "D",
        "label": "D. painting"
      }
    ],
    "answer": "C",
    "tip": "有 last Sunday：規則動詞變過去。",
    "teach": "規則動詞加 -ed。"
  },
  {
    "id": "t18",
    "prompt": "______ you like swimming? (habit)",
    "options": [
      {
        "value": "A",
        "label": "A. Do"
      },
      {
        "value": "B",
        "label": "B. Does"
      },
      {
        "value": "C",
        "label": "C. Did"
      },
      {
        "value": "D",
        "label": "D. Are"
      }
    ],
    "answer": "A",
    "tip": "括號 habit：而家習慣；主語 you → 助動詞？",
    "teach": "I／you／we／they 問句用 Do。"
  },
  {
    "id": "t19",
    "prompt": "Yesterday Grandma ______ eighteen in the photo. She said she ______ eighteen then. (be)",
    "options": [
      {
        "value": "A",
        "label": "A. is / is"
      },
      {
        "value": "B",
        "label": "B. was / was"
      },
      {
        "value": "C",
        "label": "C. is / was"
      },
      {
        "value": "D",
        "label": "D. was / is"
      }
    ],
    "answer": "B",
    "tip": "講舊時 then：兩格都係過去 be；主語 she 單數。",
    "teach": "講過去年齡用 was／were。"
  },
  {
    "id": "t20",
    "prompt": "Mum ______ fish curry well. We can compare it to hers. (cook, habit)",
    "options": [
      {
        "value": "A",
        "label": "A. cook"
      },
      {
        "value": "B",
        "label": "B. cooks"
      },
      {
        "value": "C",
        "label": "C. cooked"
      },
      {
        "value": "D",
        "label": "D. cooking"
      }
    ],
    "answer": "B",
    "tip": "括號 habit：平時；主語 Mum → 動詞加 -s。",
    "teach": "一般事實／能力用現在式。"
  },
  {
    "id": "t21",
    "prompt": "I was bored so I ______ funny videos. (watch)",
    "options": [
      {
        "value": "A",
        "label": "A. watch"
      },
      {
        "value": "B",
        "label": "B. watches"
      },
      {
        "value": "C",
        "label": "C. watched"
      },
      {
        "value": "D",
        "label": "D. watching"
      }
    ],
    "answer": "C",
    "tip": "前面 I was…，so 跟過去；規則動詞加 -ed。",
    "teach": "so I + 過去式。"
  },
  {
    "id": "t22",
    "prompt": "Where ______ we ______ now? (go)",
    "options": [
      {
        "value": "A",
        "label": "A. do / go"
      },
      {
        "value": "B",
        "label": "B. are / going"
      },
      {
        "value": "C",
        "label": "C. did / go"
      },
      {
        "value": "D",
        "label": "D. does / go"
      }
    ],
    "answer": "B",
    "tip": "有 now：而家正在發生 → be + V-ing；主語複數用邊個 be？",
    "teach": "而家正在做：be + V-ing。"
  },
  {
    "id": "t23",
    "prompt": "He ______ a football last year for his hobby. (buy)",
    "options": [
      {
        "value": "A",
        "label": "A. buy"
      },
      {
        "value": "B",
        "label": "B. buys"
      },
      {
        "value": "C",
        "label": "C. bought"
      },
      {
        "value": "D",
        "label": "D. buying"
      }
    ],
    "answer": "C",
    "tip": "有 last year：過去式；buy 係不規則。",
    "teach": "buy 嘅過去式唔係 buyed。"
  },
  {
    "id": "t24",
    "prompt": "The rooms here ______ large. (be, now)",
    "options": [
      {
        "value": "A",
        "label": "A. is"
      },
      {
        "value": "B",
        "label": "B. are"
      },
      {
        "value": "C",
        "label": "C. was"
      },
      {
        "value": "D",
        "label": "D. were"
      }
    ],
    "answer": "B",
    "tip": "括號 now；主語 rooms 複數 → be 現在式邊個？",
    "teach": "複數主語用 are／were。"
  }
];
