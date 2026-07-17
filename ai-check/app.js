/**
 * 工務店AI内製化 現在地チェック — メインロジック v5
 *
 * 文言差し替えポイント: CONTENT オブジェクト（最上部）を編集するだけで
 * 全設問・選択肢・結果テキストを一括差し替えできます。
 * 4問化・結果3パターン化（属人化/様子見/先行タイプ）レン設計・フミ確定原稿を反映済み（20260717）。
 * ヒーロー・導入文・meta情報を広告（工務店の書類作成、AIで片付ける無料診断）との痛みの連続性を軸にフミが再改訂（20260717）。旧版バックアップ: app_v15.js / index_v10.html
 * リコ一次チェック差し戻し（H1×サブコピー問い重複／導入部が広告文の逐語反復／書類・仕事の表記ゆれ）を受けフミが再修正（20260717）。旧版バックアップ: app_v16.js / index_v11.html
 * 棚原さん直接指示（導入文末尾のタイプ名先出し削除／「答えに正解はありません」削除／CTA先出し文削除／ーーー区切り削除、結果画面「ご案内するプログラム」セクションA/B/Cのトーン修正）を受けフミが再修正（20260717）。旧版バックアップ: app_v17.js
 * リコ一次チェック差し戻し（Cのタイトルと本文の不一致／C1文目の断定口調／体言止め／類義語並列）を受けフミが再修正（20260717）。旧版バックアップ: app_v18.js
 *
 * UTAGE連携ポイント: submitLead() 関数（ファイル末尾）を差し替えてください。
 *
 * ★スコアリングロジック（ScoringEngine）は変更禁止★
 *   Q1・Q2の回答値（1〜4）のみで判定。Q4・Q7は判定に使用しない（UTAGE送信のみ）。
 *   Q1==4 or Q2==4 or (Q1>=3 and Q2>=3) → A（属人化タイプ）
 *   Q1<=2 and Q2<=2 → C（先行タイプ）
 *   それ以外 → B（様子見タイプ）
 */

'use strict';

/* =============================================================
   CONTENT — 文言一元管理（フミ原稿差し替えはここだけ）
   ============================================================= */
const CONTENT = {
  meta: {
    title: '工務店AI内製化 現在地チェック',
    subtitle: '本当は、現場や商談にもっと時間を使いたいはずなんですよね。',
    description: [
      'でも実際は、見積書や工程表の作成に、時間を取られている。',
      '',
      'しっかり働いているからこそ、そのぶん削られていく時間がある。',
      '',
      '——そう感じているなら、この診断が、今の現在地を確かめる材料になります。',
      '',
      'この診断でやることは、シンプルです。',
      '',
      '所要時間　体感2分',
      '',
      '自社の「今の状態」を、4つの問いで確かめて、\n「今どこにいるか」を整理する。',
      '',
      'それだけです。',
      '',
      '「AIを導入すべきか」「投資をすべきか」を決めるものではありません。\n現在地を知って、次の1歩が何かを考えるための材料にしてもらうものです。',
      '',
      'これらの回答をもとに、',
      '',
      '今のあなたの状態を分析します。',
      '',
      'そして、次に取るべき「最初の1アクション」も、あわせてお伝えします。',
      '',
      '率直に選んでもらえると、より精度の高いフィードバックが届きます。',
      '',
      'まずは今の状態を確かめるところから、始めてもらえたらと思います。',
    ].join('\n'),
  },

  /* 「この診断でわかること」カード用（本文中の【この診断でわかること】箇条書きと同一内容をUIリストで表示） */
  introPoints: [
    '書類業務（見積書・工程表など）に、どれくらい時間を取られているか',
    '属人化（社長・ベテラン頼み）が、どれくらい深刻か',
    'AI（ChatGPTやClaude）に、今どれくらい慣れているか',
    'AI内製化に、どれくらいの時間・費用を投資できそうか',
  ],

  /* ----- 設問（4問：Q1・Q2・Q4・Q7）★変更禁止★ ----- */
  questions: [
    {
      id: 'q1',
      theme: 'Q1 / 書類作成にかける時間',
      text: '見積書・工程表・施工計画書などの書類作成に、週どのくらい時間をかけていますか？',
      note: '最もあてはまるものを1つ選んでください',
      choices: [
        { label: 'ほぼかからない（週1時間以内）', score: 1 },
        { label: '週2〜3時間程度', score: 2 },
        { label: '週4〜8時間程度', score: 3 },
        { label: '週8時間以上（または多すぎて把握できていない）', score: 4 },
      ],
    },
    {
      id: 'q2',
      theme: 'Q2 / 属人化の深刻度',
      text: '社長またはベテランにしか作れない書類・見積・段取りが、社内にどのくらいありますか？',
      note: '最もあてはまるものを1つ選んでください',
      choices: [
        { label: 'ほとんどない（だいたい誰でも対応できる）', score: 1 },
        { label: '少しあるが、何とかなっている', score: 2 },
        { label: 'かなりある。社長しかできない仕事が多い', score: 3 },
        { label: '深刻。自分が倒れたら、会社が止まると思う', score: 4 },
      ],
    },
    {
      id: 'q4',
      theme: 'Q3 / AIリテラシーの現在地',
      text: 'ChatGPTやClaude（AI）を、業務で試したことはありますか？',
      note: '最もあてはまるものを1つ選んでください',
      choices: [
        { label: 'まだ使ったことがない', score: 1 },
        { label: '個人的に少し触ったことがある（業務では使っていない）', score: 2 },
        { label: 'メールや書類の下書きなど、業務で使っている', score: 3 },
        { label: '社内でルールを決めて、チームで活用している', score: 4 },
      ],
    },
    {
      id: 'q7',
      theme: 'Q4 / 投資意欲',
      text: 'AI内製化のために、月どのくらいの時間と費用を使える想定ですか？',
      note: '最もあてはまるものを1つ選んでください',
      choices: [
        { label: '時間も費用も、今は難しい', score: 1 },
        { label: '費用は厳しいが、自分の時間は使える', score: 2 },
        { label: '月に数万円の費用は出せる。時間も確保できる', score: 3 },
        { label: 'しっかり投資して、確実に進めたい。費用も時間も確保できる', score: 4 },
      ],
    },
  ],

  /* ----- 結果（3パターン）— レン判定ロジック確定・フミ原稿確定 20260717 ----- */
  results: {
    A: {
      typeLetter: 'A',
      typeName: '属人化タイプ',
      heroTitle: '属人化タイプ',
      heroDesc: '',
      sections: [
        {
          title: 'あなたの現在地',
          text: '診断の結果からすると、あなたの会社は、社長の頭の中にある知識が、まだ書類になっていないことが一番のリスクになっているようです。\n見積も、工程表も、施工計画書も、気づけば全部自分の頭の中。\n書類作成に追われて、現場や営業に使いたい時間がどんどん削られている感覚、ありませんか。\n本当は自分が休んでも会社が回る状態を作りたいのに、任せられる形になっていない、、、\nそのプレッシャーを、ずっと一人で抱えてこられたんじゃないかと思います。',
        },
        {
          title: 'AIでできること',
          text: '実はこの状態、僕から見ると、AIで解決できる部分がかなりあります。\n頭の中にあるノウハウを、AIと一緒に言葉にしていく。\nそのプロセス自体が、属人化を解いていく最初の一歩になるんですよね。\n一気に全部変える必要はなくて、まずは一番負担になっている書類から、で大丈夫です。',
        },
        {
          title: 'まずはここから',
          text: '施工計画書・日報・お客様報告書、この3つをAIで作れる状態を体験してみませんか？\n3ヶ月あれば、十分その快適さを体感できます。',
        },
        {
          title: '次の一歩',
          isCta: true,
          ctaType: 'consultation',
          ctaTitle: '次の一歩',
          ctaText: 'ここまで読んで、「自分ごと」として重く感じすぎる必要はなくて。\nまずは無料の個別相談で、今どこが一番苦しいか、AIでどこまで楽になりそうか、一緒に確認できたらと思っています。',
          ctaButtonLabel: '無料相談で今の状況を話してみる',
          ctaButtonNote: '所要時間30分。費用はかかりません。',
          ctaButtonUrl: 'https://uw.u-wan.jp/event/NzTJUVLszFr8/register', // UTAGE個別相談予約ページ
        },
      ],
    },

    B: {
      typeLetter: 'B',
      typeName: '様子見タイプ',
      heroTitle: '様子見タイプ',
      heroDesc: '',
      sections: [
        {
          title: 'あなたの現在地',
          text: '診断の結果からすると、あなたの会社は、今のところは何とか回っているけれど、繁忙期や特定の案件で急に負荷が跳ね上がる、そういう不安を抱えていらっしゃるように見えます。\nもし今のメンバーの誰かが急に抜けたら、、、と不安になる瞬間もあるんじゃないでしょうか。\n規模が大きくなったら今のやり方のままで本当に回るんだろうか、という漠然とした不安もあるかもしれません。\n「今はまだ大丈夫」と感じているタイミングだからこそ、一度立ち止まって見ておく価値があるのかもしれません。',
        },
        {
          title: 'AIでできること',
          text: 'この段階だからこそ、僕としてはAIでできることがあると思っています。\n痛みが本格化する前に、書類まわりの型を作っておく。\nそうすることで、繁忙期や規模拡大が来ても、今の体制のまま踏ん張らずに済むようになっていきます。\n先に整えておく、というだけなので、そこまで気負う必要もないかなと思います。',
        },
        {
          title: 'ご案内するプログラム',
          text: 'AIを使うことで、施工計画書・日報・お客様報告書などの書類を効率よく作成できるようにします。\n今困っていないからこそ、低いコストとリスクで試せるタイミングでもあるんですよね。',
        },
        {
          title: '次の一歩',
          isCta: true,
          ctaType: 'consultation',
          ctaTitle: '次の一歩',
          ctaText: '今すぐ何かを変えなきゃいけない、という話ではなくて。\nまずは無料の個別相談で、今の状態と、先々どんなリスクが見えているかを、一緒に整理できたらと思っています。',
          ctaButtonLabel: '無料相談で今のうちに整理してみる',
          ctaButtonNote: '所要時間30分。費用はかかりません。',
          ctaButtonUrl: 'https://uw.u-wan.jp/event/NzTJUVLszFr8/register', // UTAGE個別相談予約ページ
        },
      ],
    },

    C: {
      typeLetter: 'C',
      typeName: '先行タイプ',
      heroTitle: '先行タイプ',
      heroDesc: '',
      sections: [
        {
          title: 'あなたの現在地',
          text: '診断の結果からすると、あなたの会社は、書類作成の負担も属人化も、今のところそこまで大きくないようです。\nその意味では、無理に変える必要はないタイミングだと思います。\n一方で、この診断に目を通してくださったということは、人手不足や後継者のことなど、この先の会社のあり方について、どこかで気になっている部分があるのかもしれません。',
        },
        {
          title: 'AIでできること',
          text: '今の段階でAIを取り入れるとしたら、それは「困っているから」ではなく、「先に試しておく」という位置づけになると思います。\n急ぐ話ではないので、僕としても無理に勧めるつもりはなくて、、、\nただ、早いうちに触れておいた会社とそうでない会社とでは、数年後に差が出てくる領域だとは感じています。',
        },
        {
          title: '参考までに',
          text: '施工計画書・日報・お客様報告書も、AIを使えば効率化できる余地はあると思います。\nただ、それが今の御社に必要かどうかを判断できるのは御社だけで、僕から一律に「やった方がいい」とは言えないところです。',
        },
        {
          title: '次の一歩',
          isCta: true,
          ctaType: 'consultation',
          ctaTitle: '次の一歩',
          ctaText: 'もし少しでも気になる部分があれば、無料の個別相談で、今の状況や気になっていることを聞かせていただけたらと思います。\n無理にご提案する場ではなく、一緒に考える場だと思っていただけたら嬉しいです。',
          ctaButtonLabel: '無料相談で気軽に話してみる',
          ctaButtonNote: '所要時間30分。費用はかかりません。',
          ctaButtonUrl: 'https://uw.u-wan.jp/event/NzTJUVLszFr8/register', // UTAGE個別相談予約ページ
        },
      ],
    },
  },
};


/* =============================================================
   スコアリングエンジン ★変更禁止★
   - 判定に使うのはQ1（書類作成にかける時間）・Q2（属人化の深刻度）の回答値（1〜4）のみ
   - Q1==4 or Q2==4 or (Q1>=3 and Q2>=3) → A（属人化タイプ）
   - Q1<=2 and Q2<=2 → C（先行タイプ）
   - それ以外 → B（様子見タイプ）
   ============================================================= */
const ScoringEngine = {
  /**
   * 回答配列からタイプを返す
   * @param {Array<{questionIndex: number, choiceIndex: number}>} answers
   * @returns {{ type: 'A'|'B'|'C', q1Score: number, q2Score: number }}
   */
  calculate(answers) {
    const getScore = (id) => {
      const qIndex = CONTENT.questions.findIndex((q) => q.id === id);
      const answer = answers[qIndex];
      return CONTENT.questions[qIndex].choices[answer.choiceIndex].score;
    };

    const q1Score = getScore('q1');
    const q2Score = getScore('q2');

    let type;
    if (q1Score === 4 || q2Score === 4 || (q1Score >= 3 && q2Score >= 3)) {
      type = 'A';
    } else if (q1Score <= 2 && q2Score <= 2) {
      type = 'C';
    } else {
      type = 'B';
    }

    return { type, q1Score, q2Score };
  },
};


/* =============================================================
   リードフォーム送信 — UTAGE連携ポイント
   ============================================================= */
/**
 * submitLead()
 * UTAGEオプトインフォームへ application/x-www-form-urlencoded でPOSTする。
 *
 * @param {{ name: string, email: string, company: string, type: string, q4Score: number, q7Score: number }} data
 * @returns {Promise<void>}
 *
 * 送信フィールド:
 *   name    ← data.name（お名前）
 *   mail    ← data.email（メールアドレス）
 *   free74  ← data.company（会社名）
 *   free75  ← data.type（診断結果パターン：A=属人化タイプ/B=様子見タイプ/C=先行タイプ）
 *   free76  ← data.q4Score（AIリテラシーの回答値 1〜4。個別相談担当が事前参照）
 *   free77  ← data.q7Score（投資意欲の回答値 1〜4。個別相談担当が事前参照）
 */
async function submitLead(data) {
  const UTAGE_ENDPOINT = 'https://uw.u-wan.jp/r/hNGkgY333aq8/store';
  const TIMEOUT_MS = 3000;

  const params = new URLSearchParams();
  params.append('name',   data.name);
  params.append('mail',   data.email);
  params.append('free74', data.company);
  params.append('free75', data.type);
  params.append('free76', String(data.q4Score));
  params.append('free77', String(data.q7Score));

  const controller = new AbortController();
  const timerId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    await fetch(UTAGE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      mode: 'no-cors',   // UTAGEはCORSヘッダーを返さないためno-cors。レスポンスはopaqueで読めないがPOSTは通る
      signal: controller.signal,
    });
    console.log('[submitLead] UTAGEへのPOST完了（no-cors / レスポンス内容は読めません）');
  } catch (err) {
    // AbortError（タイムアウト）含むすべてのエラーをここで吸収する。
    // throwしないことで sendAndShowResult の「送信失敗でも結果を表示」設計を維持する。
    console.error('[submitLead] POST失敗（診断結果は引き続き表示します）:', err);
  } finally {
    clearTimeout(timerId);
  }
}


/* =============================================================
   アプリ本体
   ============================================================= */
const App = {
  currentPage: 'intro',
  answers: [],       // { questionIndex, choiceIndex }[]
  currentQ: 0,       // 現在の設問インデックス
  result: null,      // { type, q1Score, q2Score }
  leadData: null,    // { name, email, company }
  _leadSubmitted: false, // 二重送信防止フラグ

  // DOM参照
  el: {},

  init() {
    this.bindElements();
    this.renderIntro();
    this.showPage('intro');
  },

  bindElements() {
    this.el.intro     = document.getElementById('page-intro');
    this.el.question  = document.getElementById('page-question');
    this.el.form      = document.getElementById('page-form');
    this.el.result    = document.getElementById('page-result');
    this.el.loading   = document.getElementById('loading-overlay');

    this.el.startBtn  = document.getElementById('btn-start');
    this.el.nextBtn   = document.getElementById('btn-next');
    this.el.prevBtn   = document.getElementById('btn-prev');
    this.el.submitBtn = document.getElementById('btn-submit');

    this.el.progressFill  = document.getElementById('progress-fill');
    this.el.progressLabel = document.getElementById('progress-label');
    this.el.progressCount = document.getElementById('progress-count');

    this.el.questionBadge = document.getElementById('question-badge');
    this.el.questionText  = document.getElementById('question-text');
    this.el.questionNote  = document.getElementById('question-note');
    this.el.choicesWrap   = document.getElementById('choices-wrap');

    this.el.resultWrap = document.getElementById('result-wrap');

    this.el.startBtn.addEventListener('click', () => this.startQuiz());
    this.el.nextBtn.addEventListener('click', () => this.goNext());
    this.el.prevBtn.addEventListener('click', () => this.goPrev());
    this.el.submitBtn.addEventListener('click', () => this.handleFormSubmit());
  },

  showPage(name) {
    const pages = ['intro', 'question', 'form', 'result'];
    pages.forEach((p) => {
      const el = document.getElementById(`page-${p}`);
      if (el) el.classList.toggle('active', p === name);
    });
    this.currentPage = name;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /* ----- イントロ ----- */
  renderIntro() {
    document.getElementById('intro-subtitle').textContent = CONTENT.meta.subtitle;

    // description を空行区切りの段落配列に分解して <p> タグでレンダリング
    const descEl = document.getElementById('intro-desc');
    const paragraphs = CONTENT.meta.description
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter((block) => block.length > 0);

    descEl.innerHTML = '';
    paragraphs.forEach((block) => {
      const p = document.createElement('p');
      // 段落内の改行は <br> に
      const innerHtml = this.escHtml(block).replace(/\n/g, '<br>');

      // 対象者フレーズ（——そう感じているなら、この診断が、今の現在地を確かめる材料になります。）に専用クラス付与
      if (block.indexOf('——そう感じているなら、この診断が、今の現在地を確かめる材料になります。') !== -1) {
        p.className = 'intro-copy__target';
      }
      // 節目の見出し段落（この診断でやることは、シンプルです。）
      else if (block.indexOf('この診断でやることは、シンプルです。') !== -1) {
        p.className = 'intro-copy__divider';
        p.innerHTML = innerHtml;
        descEl.appendChild(p);
        // divider直後にバッジを挿入
        const badgeWrap = document.createElement('p');
        badgeWrap.className = 'intro-copy__time-badge-wrap';
        badgeWrap.innerHTML = '<span class="intro-copy__time-badge" aria-label="所要時間">&#9201; 所要時間　体感2分</span>';
        descEl.appendChild(badgeWrap);
        return; // 手動でappend済み
      }
      // 所要時間バッジ段落（CONTENTで「所要時間　体感2分」として定義）
      else if (block.indexOf('体感2分') !== -1 && block.length < 20) {
        // divider処理内でバッジを出力済みなので、このブロックはスキップ
        return;
      }
      // セクション区切り線（ーーー）は控えめな罫線として表示（読み上げ対象外）
      else if (block === 'ーーー') {
        p.className = 'intro-copy__rule';
        p.setAttribute('aria-hidden', 'true');
      }

      p.innerHTML = innerHtml;
      descEl.appendChild(p);
    });

    const list = document.getElementById('intro-points');
    list.innerHTML = '';
    CONTENT.introPoints.forEach((point) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="intro-points__icon" aria-hidden="true">&#10003;</span><span>${this.escHtml(point)}</span>`;
      list.appendChild(li);
    });
  },

  startQuiz() {
    this.answers = [];
    this.currentQ = 0;
    this.renderQuestion(0);
    this.showPage('question');
  },

  /* ----- 設問 ----- */
  renderQuestion(index) {
    const q = CONTENT.questions[index];
    const total = CONTENT.questions.length;

    // プログレスバー
    const pct = Math.round(((index) / total) * 100);
    this.el.progressFill.style.width = `${pct}%`;
    this.el.progressFill.setAttribute('aria-valuenow', pct);
    this.el.progressLabel.textContent = q.theme;
    this.el.progressCount.textContent = `${index + 1} / ${total}`;

    // 設問テキスト
    this.el.questionBadge.textContent = `Q${index + 1}`;
    this.el.questionText.textContent = q.text;

    if (q.note) {
      this.el.questionNote.textContent = q.note;
      this.el.questionNote.style.display = 'block';
    } else {
      this.el.questionNote.style.display = 'none';
    }

    // 選択肢
    this.el.choicesWrap.innerHTML = '';
    const savedAnswer = this.answers[index];

    q.choices.forEach((choice, ci) => {
      const id = `choice-${index}-${ci}`;
      const label = document.createElement('label');
      label.className = 'choice-label';
      label.setAttribute('for', id);

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `q${index}`;
      radio.id = id;
      radio.value = ci;
      if (savedAnswer && savedAnswer.choiceIndex === ci) {
        radio.checked = true;
      }

      radio.addEventListener('change', () => this.onChoiceSelect(index, ci, choice));

      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice.label));
      this.el.choicesWrap.appendChild(label);
    });

    // ナビゲーション
    this.el.prevBtn.style.display = index === 0 ? 'none' : 'inline-flex';
    this.updateNextBtn(index);
  },

  onChoiceSelect(qIndex, choiceIndex, choice) {
    this.answers[qIndex] = { questionIndex: qIndex, choiceIndex };
    this.updateNextBtn(qIndex);
  },

  updateNextBtn(qIndex) {
    const hasAnswer = this.answers[qIndex] !== undefined;
    this.el.nextBtn.disabled = !hasAnswer;

    const isLast = qIndex === CONTENT.questions.length - 1;
    this.el.nextBtn.textContent = isLast ? '結果を確認する' : '次の質問へ';
  },

  goNext() {
    const isLast = this.currentQ === CONTENT.questions.length - 1;
    if (isLast) {
      // 全問回答完了 → フォームへ
      this.result = ScoringEngine.calculate(this.answers);
      this.showPage('form');
    } else {
      this.currentQ++;
      this.renderQuestion(this.currentQ);
    }
  },

  goPrev() {
    if (this.currentQ > 0) {
      this.currentQ--;
      this.renderQuestion(this.currentQ);
    }
  },

  /* ----- リードフォーム ----- */
  handleFormSubmit() {
    const nameEl    = document.getElementById('field-name');
    const emailEl   = document.getElementById('field-email');
    const companyEl = document.getElementById('field-company');

    const nameErr    = document.getElementById('err-name');
    const emailErr   = document.getElementById('err-email');
    const companyErr = document.getElementById('err-company');

    let valid = true;

    // バリデーション（名前・会社名）
    [
      { el: nameEl,    errEl: nameErr,    msg: 'お名前を入力してください' },
      { el: companyEl, errEl: companyErr, msg: '会社名を入力してください' },
    ].forEach(({ el, errEl, msg }) => {
      if (!el.value.trim()) {
        el.classList.add('error');
        errEl.textContent = msg;
        errEl.classList.add('visible');
        valid = false;
      } else {
        el.classList.remove('error');
        errEl.classList.remove('visible');
      }
    });

    // メールアドレス検証
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailEl.value.trim() || !emailRegex.test(emailEl.value.trim())) {
      emailEl.classList.add('error');
      emailErr.textContent = 'メールアドレスを正しく入力してください';
      emailErr.classList.add('visible');
      valid = false;
    } else {
      emailEl.classList.remove('error');
      emailErr.classList.remove('visible');
    }

    if (!valid) return;

    this.leadData = {
      name:    nameEl.value.trim(),
      email:   emailEl.value.trim(),
      company: companyEl.value.trim(),
    };

    this.sendAndShowResult();
  },

  async sendAndShowResult() {
    // 二重送信防止
    if (this._leadSubmitted) return;
    this._leadSubmitted = true;

    // ローディング表示
    this.el.loading.classList.add('active');
    this.el.submitBtn.disabled = true;

    try {
      await submitLead({
        ...this.leadData,
        type:    this.result.type,
        q4Score: this.getScoreByQuestionId('q4'),
        q7Score: this.getScoreByQuestionId('q7'),
      });

      this.renderResult();
      this.showPage('result');
    } catch (err) {
      console.error('[App] submitLead エラー:', err);
      // エラーでも結果は表示する（送信失敗でUXを壊さない方針）
      this.renderResult();
      this.showPage('result');
    } finally {
      this.el.loading.classList.remove('active');
      this.el.submitBtn.disabled = false;
    }
  },

  /* ----- 結果表示 ----- */
  renderResult() {
    const { type } = this.result;
    const r = CONTENT.results[type];
    const wrap = this.el.resultWrap;
    wrap.innerHTML = '';

    // ヒーロー（data-type属性でCSSの背景文字を制御）
    const hero = document.createElement('div');
    hero.className = `result-hero result-hero--${type}`;
    hero.setAttribute('data-type', r.typeLetter);
    const descHtml = r.heroDesc
      ? `<p class="result-hero__desc">${this.escHtml(r.heroDesc)}</p>`
      : '';
    hero.innerHTML = `
      <div class="result-type-label" aria-label="診断タイプ">診断タイプ</div>
      <h2 class="result-type-name">${this.escHtml(r.typeName)}</h2>
      ${descHtml}
    `;
    wrap.appendChild(hero);

    // ボディ
    const body = document.createElement('div');
    body.className = 'result-body';

    r.sections.forEach((section) => {
      if (section.isCta) {
        // CTAブロック
        const cta = document.createElement('div');
        cta.className = 'result-cta';
        const noteHtml = section.ctaButtonNote
          ? `<p class="result-cta__note">${this.escHtml(section.ctaButtonNote).replace(/\n/g, '<br>')}</p>`
          : '';
        cta.innerHTML = `
          <h3 class="result-cta__title">${this.escHtml(section.ctaTitle)}</h3>
          <p class="result-cta__text">${this.escHtml(section.ctaText).replace(/\n/g, '<br>')}</p>
          <a href="${this.escHtml(section.ctaButtonUrl)}"
             class="btn btn--cta"
             role="button">${this.escHtml(section.ctaButtonLabel)}</a>
          ${noteHtml}
        `;
        body.appendChild(cta);
      } else {
        // 通常セクション
        const sec = document.createElement('div');
        sec.className = 'result-section';

        let inner = `<h3 class="result-section__title">${this.escHtml(section.title)}</h3>`;
        inner += `<p class="result-section__text">${this.escHtml(section.text).replace(/\n/g, '<br>')}</p>`;

        if (section.steps && section.steps.length) {
          inner += '<ol class="result-steps" aria-label="具体的なステップ">';
          section.steps.forEach((step) => {
            inner += `<li>${this.escHtml(step)}</li>`;
          });
          inner += '</ol>';
        }

        sec.innerHTML = inner;
        body.appendChild(sec);
      }
    });

    wrap.appendChild(body);
  },

  /* ----- ユーティリティ ----- */
  getScoreByQuestionId(id) {
    const qIndex = CONTENT.questions.findIndex((q) => q.id === id);
    const answer = this.answers[qIndex];
    return CONTENT.questions[qIndex].choices[answer.choiceIndex].score;
  },

  escHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },
};


/* DOMContentLoaded で起動 */
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
