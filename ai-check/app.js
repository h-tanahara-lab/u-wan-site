/**
 * 工務店AI内製化 現在地チェック — メインロジック v4
 *
 * 文言差し替えポイント: CONTENT オブジェクト（最上部）を編集するだけで
 * 全設問・選択肢・結果テキストを一括差し替えできます。
 * フミ確定原稿（20260602 / CTA改訂 20260603 / トーン全面見直し・全CTA個別相談統一 20260603 / C型D型結果文更新 20260604）を反映済み。
 *
 * UTAGE連携ポイント: submitLead() 関数（ファイル末尾）を差し替えてください。
 *
 * ★スコアリングロジック（ScoringEngine）は変更禁止★
 *   7問32点満点、Q5は2倍加重（A=8/B=4/C=2/D=0）
 *   タイプ判定：A≥26 / B 18〜25 / C 10〜17 / D≤9
 *   Q5で「丸投げ」（choiceIndex=3）を選ぶと強制Dタイプ
 */

'use strict';

/* =============================================================
   CONTENT — 文言一元管理（フミ原稿差し替えはここだけ）
   ============================================================= */
const CONTENT = {
  meta: {
    title: '工務店AI内製化 現在地チェック',
    subtitle: '「AI、うちでもできるのかな」と思ったことがあるなら、まずここから。',
    description: [
      '「AIを入れたほうがいい」',
      '',
      'そういう話は聞く。',
      '',
      'でも、何から始めていいか分からない。\n自社に合うのか分からない。\nそもそも、今の状態で入れて意味があるのかも分からない。',
      '',
      '——そういう社長のための診断です。',
      '',
      'この診断でやることは、シンプルです。',
      '',
      '所要時間3〜4分',
      '',
      '自社の「今の状態」を7つの問いで確かめて、\n「今どこにいるか」を整理する。',
      '',
      'それだけです。',
      '',
      '「AIを導入すべきか」「投資をすべきか」を決めるものではありません。\n現在地を知って、次の1歩が何かを考えるための材料にしてもらうものです。',
    ].join('\n'),
  },

  introPoints: [
    '書類業務・属人化の課題が、どのくらいの深刻度か',
    '今のIT活用度・AIへの慣れ度',
    'AI内製化に向けた準備状態のタイプ（自走型・準備型・整理型・観察型）',
    '今の状態に合った「最初の1アクション」',
  ],

  /* ----- 設問（7問）★変更禁止★ ----- */
  questions: [
    {
      id: 'q1',
      theme: 'Q1 / 書類業務にかかる時間',
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
      theme: 'Q2 / 属人化の状況',
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
      id: 'q3',
      theme: 'Q3 / 今使っているツール',
      text: '業務で主に使っているツールは、どれに近いですか？',
      note: '最もあてはまるものを1つ選んでください',
      choices: [
        { label: '主に紙・手書き', score: 1 },
        { label: 'Excel・Wordが中心（クラウドツールは使っていない）', score: 2 },
        { label: 'Googleスプレッドシートやクラウドツールを一部使っている', score: 3 },
        { label: 'kintoneや施工管理ソフトなどのSaaSを業務で活用している', score: 4 },
      ],
    },
    {
      id: 'q4',
      theme: 'Q4 / AIツールの経験',
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
      id: 'q5',
      theme: 'Q5 / やり方のスタイル（重要）',
      text: 'AI内製化を進めるとしたら、どのスタイルが自分に合っていると思いますか？',
      note: '最もあてはまるものを1つ選んでください',
      isQ5: true, // 丸投げ強制D判定フラグ・2倍加重フラグ
      choices: [
        // score は換算前の値。エンジンが ×2 処理する（満点8点）
        // index=0: 自走=8点 / index=1: 段階的=4点 / index=2: 部分委託=2点 / index=3: 丸投げ=0点・強制D
        { label: 'やり方を自分で覚えて、自分で使えるようになりたい（自走）', score: 4 },
        { label: '一緒にやりながら、徐々に自分でできるようになりたい（段階的自走）', score: 2 },
        { label: '基本はプロに任せて、一部だけ関わりたい（部分委託）', score: 1 },
        { label: 'とりあえず全部やってもらえれば', score: 0, isForceD: true }, // index=3: 強制D（表示テキストに注記なし・スコアリングロジック維持）
      ],
    },
    {
      id: 'q6',
      theme: 'Q6 / 新しいことへの姿勢',
      text: '「やったことがないことに挑戦する」ことへの姿勢として、自分に近いものを選んでください。',
      note: '最もあてはまるものを1つ選んでください',
      choices: [
        { label: '苦手。失敗が怖いので、確実なものだけやりたい', score: 1 },
        { label: 'どちらかというと慎重。情報を十分に集めてから動く', score: 2 },
        { label: 'ある程度の見込みがあれば、動いてみる', score: 3 },
        { label: 'うまくいかなくても、試してみることに価値があると思う', score: 4 },
      ],
    },
    {
      id: 'q7',
      theme: 'Q7 / 時間と費用の確保',
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

  /* ----- 結果（4タイプ）— フミ原稿 20260602 / CTA全タイプ個別相談統一・トーン刷新 20260603 ----- */
  results: {
    A: {
      typeLetter: 'A',
      typeName: '自走型',
      heroTitle: '自走型',
      heroDesc: '「今すぐ始められる状態にいます」',
      sections: [
        {
          title: 'あなたの現在地',
          text: '書類業務の負担がはっきりあって、\n「自分でやり方を覚えて、社内に展開したい」という意思もある。\n\n課題も意欲もリソースも、揃っています。\n\nあとは「どこから始めるか」だけです。',
        },
        {
          title: '自走型の方によくある状態',
          text: '現場も経営も、ほぼ全部自分でやっている。\n課題があることは分かっている。でも手が届いていない。\n\n「一度方向が見えれば、自分で動ける」\n——そういう方です。',
        },
        {
          title: '今日、この1問に答えてみてください',
          text: '全部を一気に変えようとしなくていいです。\n\nまず1つだけ聞きます。\n\n「今週、いちばん時間がかかった書類は何ですか？」\n\nその書類名を、紙に書いてみてください。\n\nそれが最初の1ステップです。\n\n「書けた」という状態が、AI内製化の第一歩として完結します。\n次に何をするかは、あなたが決めることです。',
        },
        {
          title: '次の一歩',
          isCta: true,
          ctaType: 'consultation',
          ctaTitle: 'まず「最初の1業務」を一緒に選びましょう',
          ctaText: '「どこから始めるか」は、一人で考えていても答えが出にくいところです。\n\n無料の個別相談で、最初の1業務と進め方を一緒に整理しませんか。\nあなたの業務の状況を聞きながら、会社に合った内製化の入口を一緒に設計します。\n\n気になったら、のぞいてみてください。',
          ctaButtonLabel: '無料個別相談に申し込む',
          ctaButtonNote: '所要時間30分。費用はかかりません。\n相談の場で、AI社員導入支援プログラムの詳細もお伝えします。',
          ctaButtonUrl: 'https://uw.u-wan.jp/event/NzTJUVLszFr8/register', // UTAGE個別相談予約ページ
        },
      ],
    },

    B: {
      typeLetter: 'B',
      typeName: '準備型',
      heroTitle: '準備型',
      heroDesc: '「あと少し整えれば、動ける状態です」',
      sections: [
        {
          title: 'あなたの現在地',
          text: '課題意識はあります。意欲もあります。\n\nただ、「何から整えればいいか」の順番がまだ見えていない状態です。\n\n「やりたいとは思っている。でも、どこから手をつけていいか分からない」\n\n——準備型の方の、よくある現在地です。',
        },
        {
          title: '準備型の方によくある状態',
          text: '情報はある程度持っている。\n「AIを使えばいいのは分かってる」とも思っている。\n\nでも、業務の優先順位がまだ整理できていない。\n最初の設計をどうするか、一緒に考えてくれる人がいれば動ける。',
        },
        {
          title: '最初の1アクション',
          text: '「棚卸しをしてみよう」と思ったとき、多くの社長が最初に詰まるのはここです。\n\n「何から書けばいいか分からない」\n「どの粒度で整理すればいいか分からない」\n\n一人でやろうとすると、そこで止まってしまうことが多い。\n\nそれ自体は、珍しいことではありません。\n「始め方が分からない」は、準備型の方によくある詰まりポイントです。',
        },
        {
          title: '次の一歩',
          isCta: true,
          ctaType: 'consultation',
          ctaTitle: '棚卸しの始め方を、一緒に整理しましょう',
          ctaText: '「棚卸しをしよう」と思っても、一人で始めると詰まることがほとんどです。\n\n何から書けばいいか。どの粒度で整理すればいいか。\nそこから一緒に考えるのが、この相談の使い方です。\n\n「準備ができてから来てください」ではありません。\n「どこから手をつけるか分からない」という状態のまま来てください。\n\nAI社員導入支援プログラムの内容も、ここでお伝えできます。',
          ctaButtonLabel: '無料個別相談に申し込む',
          ctaButtonNote: '所要時間30分。費用はかかりません。\n棚卸しが終わっていなくても構いません。',
          ctaButtonUrl: 'https://uw.u-wan.jp/event/NzTJUVLszFr8/register', // UTAGE個別相談予約ページ
        },
      ],
    },

    C: {
      typeLetter: 'C',
      typeName: '整理型',
      heroTitle: '整理型',
      heroDesc: '「業務の整理をするところから、一緒に取り掛かってみましょう」',
      sections: [
        {
          title: 'あなたの現在地',
          text: '課題は感じています。\n\nAI導入の前に、業務を整理するところから始めると、結果として近道になります。\n\nこれは遅れではありません。\n足元が整っている状態でAIを入れると、効果がずっと出やすくなります。\n今の状態を正直に確かめられたことが、大事な1歩です。',
        },
        {
          title: '整理型の方によくある状態',
          text: 'IT活用がまだ紙・Excelレベル、または業務自体が複雑に属人化している。\n「情報を集めてから動く」慎重なタイプ。\n費用か時間のどちらかに制約がある。\n\n「条件が整ったら動く」という意識はあります。\n今は、その条件を整えていくフェーズです。',
        },
        {
          title: '今できる1アクション',
          text: 'AI導入の話は少し置いて、こっちから始めてみましょう。\n\n「社長しか知らない業務」を1つ書き出す。\n\n業務の名前だけでいいです。\n紙でも、メモ帳でも、Excelでも構いません。\n\n「1つ」でいいです。完璧な一覧を作ろうとしなくていいです。',
        },
        {
          title: '次の一歩',
          isCta: true,
          ctaType: 'consultation',
          ctaTitle: '「社長しか知らない業務」を1つ書き出せたら、作戦会議の準備ができました！',
          ctaText: 'まず「社長しか知らない業務」を1つだけ書き出してみてください。\n\n1つ書けたら、その状態で無料の個別相談にお越しいただけたらと思います。\nAI導入に向けてのディスカッションが、ぐっと進めやすくなります。\n\n「これをどうAIに繋げるか」「次に何を整理すればいいか」——\nその続きを一緒に考えます。',
          ctaButtonLabel: '作戦会議（無料個別相談）に申し込む',
          ctaButtonNote: '所要時間30分。費用はかかりません。\n書けていなくても来ていただけます。一緒に整理するところから始めます。',
          ctaButtonUrl: 'https://uw.u-wan.jp/event/NzTJUVLszFr8/register', // UTAGE個別相談予約ページ
        },
      ],
    },

    D: {
      typeLetter: 'D',
      typeName: '観察型',
      heroTitle: '観察型',
      heroDesc: '「今は、情報を集めながら自分のスタンスを確かめる時期です」',
      sections: [
        {
          title: 'あなたの現在地',
          text: '「AIが流行っているのは分かる。\nでも、自分がやるイメージがまだ持てない」\n\n——今は、そういう時期なのかもしれません。\n\n情報を集めながら、自分のスタンスを確かめている。\n「まだ早い」「もう少し様子を見たい」という感覚があっても、\nそれはごく自然な現在地です。',
        },
        {
          title: '今の心境はもしかして・・・？',
          text: '「AIって、結局どういうものなんだろう」\n\nそういう疑問、まだ持ったままじゃないですか。\n\n「自分がやるかどうか」は、今日決めなくていいです。\nただ、「どういうものか」を知っておくことには、\nそれなりの価値があります。\n\n経営判断の材料が増える、というだけでも十分です。',
        },
        {
          title: '今できること',
          text: '無理に次のステップに進む必要はありません。\n\n他の工務店・中小の建設会社が、実際にどんな書類をAIで自動化しているか。\nどんな順番で始めているか。\n\nそういう事例を、少しずつ見ていくことが今の1アクションです。',
        },
        {
          title: '次の一歩',
          isCta: true,
          ctaType: 'consultation',
          ctaTitle: '「どういうものか、話だけ聞いてみたい」でも大丈夫です',
          ctaText: '今すぐ始める必要はありません。\n\n「どういうものか、話だけ聞いてみたい」という段階でも構いません。\n決める必要はありません。\n\n気になっていることを話していただけたら、僕から見えていることをお伝えします。',
          ctaButtonLabel: '無料の個別相談で話を聞いてみる',
          ctaButtonNote: '所要時間30分。費用はかかりません。\n「情報収集の段階」「まだ始める気はない」という方でも使っていただけます。',
          ctaButtonUrl: 'https://uw.u-wan.jp/event/NzTJUVLszFr8/register', // UTAGE個別相談予約ページ
        },
      ],
    },
  },
};


/* =============================================================
   スコアリングエンジン ★変更禁止★
   - 7問32点満点
   - Q5は2倍加重（A=8/B=4/C=2/D=0）
   - Q5でindex=3（丸投げ）→ 合計スコアに関わらず強制Dタイプ
   - タイプ判定: A≥26 / B 18〜25 / C 10〜17 / D≤9
   ============================================================= */
const ScoringEngine = {
  /**
   * 回答配列からタイプとスコアを返す
   * @param {Array<{questionIndex: number, choiceIndex: number}>} answers
   * @returns {{ type: 'A'|'B'|'C'|'D', totalScore: number, forceD: boolean }}
   */
  calculate(answers) {
    let totalScore = 0;
    let forceD = false;

    answers.forEach(({ questionIndex, choiceIndex }) => {
      const q = CONTENT.questions[questionIndex];
      const choice = q.choices[choiceIndex];

      if (q.isQ5) {
        // Q5: index=3（丸投げ）は isForceD=true で強制D、それ以外は score×2 加重
        if (choice.isForceD) {
          forceD = true;
          // score = 0 なので加算なし
        } else {
          totalScore += choice.score * 2;
        }
      } else {
        totalScore += choice.score;
      }
    });

    // 強制D判定
    if (forceD) {
      return { type: 'D', totalScore, forceD: true };
    }

    // スコアによるタイプ判定
    // A: 26〜32 / B: 18〜25 / C: 10〜17 / D: 9以下
    let type;
    if (totalScore >= 26) {
      type = 'A';
    } else if (totalScore >= 18) {
      type = 'B';
    } else if (totalScore >= 10) {
      type = 'C';
    } else {
      type = 'D';
    }

    return { type, totalScore, forceD: false };
  },
};


/* =============================================================
   リードフォーム送信 — UTAGE連携ポイント
   ============================================================= */
/**
 * submitLead()
 * UTAGEオプトインフォームへ application/x-www-form-urlencoded でPOSTする。
 *
 * @param {{ name: string, email: string, company: string, type: string, score: number, forceD: boolean }} data
 * @returns {Promise<void>}
 *
 * 送信フィールド:
 *   name    ← data.name（お名前）
 *   mail    ← data.email（メールアドレス）
 *   free74  ← data.company（会社名）
 *
 * 将来対応メモ: 診断タイプをUTAGEに送る場合は以下を body に追加してください。
 *   params.append('free75', data.type);  // 診断タイプ（A/B/C/D）
 */
async function submitLead(data) {
  const UTAGE_ENDPOINT = 'https://uw.u-wan.jp/r/hNGkgY333aq8/store';
  const TIMEOUT_MS = 3000;

  const params = new URLSearchParams();
  params.append('name',   data.name);
  params.append('mail',   data.email);
  params.append('free74', data.company);
  // 将来: params.append('free75', data.type); // 診断タイプ（A/B/C/D）をここに追加できます

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
  result: null,      // { type, totalScore, forceD }
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
    this.el.q5Warning     = document.getElementById('q5-warning');

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

      // 対象者フレーズ（——そういう社長のための診断です。）に専用クラス付与
      if (block.indexOf('——そういう社長のための診断です。') !== -1) {
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
        badgeWrap.innerHTML = '<span class="intro-copy__time-badge" aria-label="所要時間">&#9201; 所要時間3〜4分</span>';
        descEl.appendChild(badgeWrap);
        return; // 手動でappend済み
      }
      // 所要時間バッジ段落（CONTENTで「所要時間3〜4分」として定義）
      else if (block.indexOf('所要時間3〜4分') !== -1 && block.length < 20) {
        // divider処理内でバッジを出力済みなので、このブロックはスキップ
        return;
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

    // Q5警告文
    this.el.q5Warning.style.display = 'none';

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

    // Q5警告表示は無効化（強制D判定ロジック自体は ScoringEngine で維持）
    this.el.q5Warning.style.display = 'none';

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
        type:   this.result.type,
        score:  this.result.totalScore,
        forceD: this.result.forceD,
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
    const { type, totalScore, forceD } = this.result;
    const r = CONTENT.results[type];
    const wrap = this.el.resultWrap;
    wrap.innerHTML = '';

    // ヒーロー（data-type属性でCSSの背景文字を制御）
    const hero = document.createElement('div');
    hero.className = `result-hero result-hero--${type}`;
    hero.setAttribute('data-type', r.typeLetter);
    hero.innerHTML = `
      <div class="result-type-label" aria-label="診断タイプ">診断タイプ</div>
      <h2 class="result-type-name">${this.escHtml(r.typeName)}</h2>
      <div class="result-score-badge" aria-label="スコア">スコア：${totalScore}点 / 32点</div>
      <p class="result-hero__desc">${this.escHtml(r.heroDesc)}</p>
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
