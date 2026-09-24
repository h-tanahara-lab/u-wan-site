/**
 * ＠診断 — 画面文言（content.js）
 *
 * 出典：`40_Web_Studio/atmark-shindan/03_設計/T7_content文言_サキ_v1_2026-09-24.md`
 * 全キーをサキ納品どおりに転記した。ここで新しく文言を足す場合も加法トーン厳守
 * （禁止：下回って／足りない／マズい／危険）。
 *
 * ツール名は棚原確定により「＠診断」に固定（マッチョ指示・設計書v2.1ヘッダ）。
 * サキ納品0章の3案はH1周辺の補助コピー選定に使う（サキ推しB案ではなくA案の
 * サブコピーを採用＝「＠診断」というH1と直結するため。理由はT8-T9納品報告に記載）。
 *
 * 使い方：t('self.stage0.heading') / t('demo.stage0.heading', 'demo')
 *   - 値が {demo, self} オブジェクトのときは mode 引数で出し分け
 *   - 値が文字列のときは共通（mode 引数は無視）
 *   - tpl(str, vars) で {{key}} プレースホルダを置換する
 *
 * file:// でも動くよう <script> 読み込み前提。グローバル ATMARK_CONTENT / t / tpl を公開する。
 */
(function (root) {
  'use strict';

  var CONTENT = {
    toolName: '＠診断',
    titleTag: '＠診断｜社長の時給が見える2分ツール',
    metaDescription: '売上・粗利率・人数・役員報酬だけで、一人当たり粗利（＠）と社長の時給を2分で見る診断ツールです。',
    h1: '＠診断',
    h1Sub: '一人当たり粗利と、社長の時給を2分で見る',

    common: {
      unit: {
        manyen: '万円',
        yen: '円',
        yenPerHour: '円/時',
      },
      notSelected: '選ばない',
      benchmarkIndustryLabel: '業界平均',
      allocationBarLabel: '目安（4:2:2:2）',
      allocationCurrentLabel: '今の実配分（人件費 {{rho0}}%）',
      modeBadge: { demo: '実演モード', self: '事前診断' },
      button: {
        next: '次へ',
        seeResult: '結果を見る',
      },
      atmarkDefinition: {
        demo: '＠＝粗利 ÷ 人数（社長を含む）',
        self: '＠（アットマーク）は、粗利を人数で割った数字です。人数には社長自身も含みます。',
      },
      sourceChip: {
        label: { demo: 'ⓘ', self: 'ⓘ 出典を見る' },
        confirmed: '出典：{{sourceName}}（{{sourceYear}}）',
        confirmedSelf: '出典：{{sourceName}}（{{sourceYear}}）。確定値です。',
        estimated: '出典：{{sourceName}}（{{sourceYear}}）｜推計',
        estimatedSelf: '出典：{{sourceName}}（{{sourceYear}}）をもとにした推計値です。',
        formula: '算式：{{computeFormula}}',
        publisherLabel: '発行元：',
      },
      estimatedBadge: '推計',
      fukakachiNote: {
        demo: '参考：一人当たり付加価値額｜人件費を含む別の物差し',
        self: '参考：一人当たり付加価値額は、人件費を含んだ別の物差しです。＠より大きく出ますが、この診断の計算には使っていません。',
      },
      wageAssumption: {
        solo: {
          demo: '社員給与：0円（一人社長）',
          self: '一人社長なので、社員給与は0円で計算しています。',
        },
        input: {
          demo: '社員給与：入力値 {{E}}万円',
          self: '社員給与総額は、入力いただいた {{E}}万円 で計算しています。',
        },
        industry: {
          demo: '社員給与：業界平均から推定 {{E}}万円（推計）',
          self: '社員給与総額は、業種の平均データから {{E}}万円 と見積もって計算しています（推計）。',
        },
        unknown: {
          demo: '社員給与：未入力（理想の役員報酬は次のステップで）',
          self: '社員給与を入れると、社長の理想報酬まで出せます。まずはステージだけ見てみましょう。',
        },
      },
      weeklyHoursAssumedBadge: '仮置き',
      weeklyHoursAssumed: {
        demo: '週60時間で仮置き計算',
        self: '週の労働時間が未入力のため、週60時間として仮に計算しています。あとで入力し直すと、時給も更新されます。',
      },
      salesGrowthNote: {
        demo: '参考：必要売上の増加率',
        self: '参考値です。粗利率や人数配分が変われば、この増加率も変わります。',
      },
      minWageLabel: '{{pref}}の最低賃金　{{amount}}円（{{effectiveDate}}〜）',
      minWageLabelBeforeEffective: '{{pref}}の最低賃金　{{prevAmount}}円（{{nextEffectiveDate}}〜{{amount}}円に改定予定）',
      partWageLabel: 'パート・アルバイトの平均時給（短時間労働者）',
      inputHintRough: 'だいたいで大丈夫です',
      inputHintEditable: 'あとで直せます',
    },

    self: {
      intro: {
        title: '＠（一人当たり粗利）と、社長の時給を見る診断',
        whatYouGet: '分かるのはこの2つです。\n・今の＠（一人当たり粗利）\n・社長ご自身の時給\n\n加えて、理想の水準まで見えたときの差額と、次の一歩の目安も出ます。',
        duration: '所要時間は2分ほどです。入力は4つだけ（任意の項目も少しあります）。',
        privacyNote: '売上高と役員報酬の実額を入力いただきます。これは＠と時給を正確に出すために必要な数字で、個別相談以外の目的では使いません。',
        startButton: '診断をはじめる',
      },
      q1: {
        text: '年間の売上高は、だいたいいくらくらいですか？',
        note: 'だいたいで大丈夫です。あとで直せます。',
        chipLabels: ['1,000', '3,000', '5,000', '1億', '3億'],
      },
      q2: {
        text: '粗利率（売上に対して、原価を引いた残りの割合）は、どれくらいですか？',
        note: '原価の金額で入力することもできます。分からない場合は、業種の平均値で進められます。',
        unknownButton: '分からない → 業界平均で進む',
        costLabel: '売上原価（万円）',
        marginLabel: '粗利率（%）',
        toggleToPercent: '％で入力する',
        toggleToCost: '原価の金額で入力する',
        industryFirst: '先に業種を選んでください',
      },
      q3: {
        text: '社長を含めて、何人で今の粗利を作っていますか？',
        note: 'パートは0.5人としてカウントしてください。AI社員や外注は人数に含めません。',
        helpIcon: '？',
        helpText: 'パートは0.5人／AI社員や外注は人数に含めません',
        countLabel: '人数（社長を含む）',
      },
      q4: {
        text: '社長ご自身の、年間の役員報酬はいくらですか？',
        note: 'だいたいで大丈夫です。あとで直せます。',
      },
      q5: {
        text: '社長の、1週間あたりの労働時間はどれくらいですか？',
        note: '分からない場合は、あとの結果で週60時間として仮に計算します。',
        hoursChip: '週{{h}}時間',
        noAnswer: '未回答',
      },
      q6: {
        text: '業種と都道府県を教えてください（任意）',
        note: '選んでいただくと、業界の数字と比べられるようになります。都道府県は選ばなくても進められます。',
        industryLabel: '業種',
        prefLabel: '都道府県',
      },
      q7: {
        text: '社員の給与総額（役員報酬は除く）が分かれば、教えてください（任意）',
        note: 'だいたいで大丈夫です。分からない場合は、業種の平均から見積もって進めます。',
      },
      stage0: {
        heading: '今の＠（一人当たり粗利）',
        subtext: '{{A0}}万円。これが、今の会社を1人あたりで見たときの粗利です。会社を回して、人を雇って、この粗利を作っているということです。',
      },
      stage1: {
        heading: '社長の時給',
        subtext: 'この数字は、社長には誰も教えてくれません。まず自分の実数で見えたことが一歩です。',
        zeroCompNote: '役員報酬が0円のため、時給は「—」と表示しています。',
      },
      stage2a: {
        heading: 'あなたは、いくら欲しいですか',
        subtext: '年収でも、時給でもかまいません。今の社長の報酬と比べて、ご自身が納得できる数字を入れてみてください。',
        inputLabelIncome: '欲しい年収（万円）',
        inputLabelHourly: '欲しい時給（円）',
        skipButton: 'まだ決めていない → 参考を見る',
        useTargetButton: 'この金額で見る',
      },
      stage2b: {
        heading: '参考：理想の＠の目安',
        subtext: 'ここからは、他の会社の数字や、生活費から逆算した目安を参考として出します。選ばなくても進められます。',
        benchmarkIndustry: '業界平均｜{{industryName}}の会社が、実際に作っている一人当たり粗利の平均です。',
        benchmarkStage1: 'ステージ1｜月35万円の生活費から逆算した水準です。',
        benchmarkStage2: 'ステージ2｜ステージ1のさらに一つ上、月70万円の生活費水準です。',
        benchmarkStage3: 'ステージ3｜さらに一つ上、月105万円の生活費水準です。',
      },
      stage3: {
        heading: '粗利の配分（4:2:2:2）',
        labelLabor: '人件費｜働く人（社長を含む）への報酬',
        labelFixed: '固定費｜家賃や設備など、会社を維持する費用',
        labelFuture: '未来費｜採用・投資など、次に向けた費用',
        labelProfit: '利益｜会社に残す利益',
        idealComp: '理想の役員報酬　{{R1}}万円',
        idealHourly: '理想の時給　{{W1}}円',
        guardNoTarget: 'Stage2で、欲しい年収・時給を入力するか「参考を見る」から水準を選んでください。',
        guardNoBenchmark: 'Stage2の参考カードから、比べたい水準を選んでください。',
        nextButton: '差額を見る',
      },
      stage4: {
        heading: '差額',
        diffAtmark: '＠　{{diffA}}万円',
        diffGrossProfit: '年間粗利　{{diffG}}万円',
        diffComp: '役員報酬　{{diffR}}万円',
        diffHourly: '時給　{{diffW}}円',
        diffSales: '必要売上　{{diffS}}万円',
        diffLead: '1人が1年で増やす粗利　{{diffA}}万円',
        requiredSales: '必要売上　{{S1}}万円',
        nextStep: 'ここに伸びしろがあります。＠があと{{diffA}}万円動くと、社長の時給は{{W1}}円になります。',
        ctaHeading: '次の一歩',
        ctaText: 'この数字をもとに、個別相談で次の一歩を一緒に整理できます。',
        ctaButton: '個別相談で次の一歩を聞く',
        copyLink: 'この結果のリンクをコピー — 個別相談で、この数字からそのまま話を続けられます（お名前・メールは含まれません）',
        copyLinkButton: '結果のリンクをコピー',
        copyLinkDone: 'リンクをコピーしました',
        copyLinkSendNote: 'コピーしたリンクを、LINE・メール・Chatworkのいずれかで棚原に送ってください。',
      },
      idealMode2: {
        resultHeading: 'あなたが決めた理想の＠',
        resultSubtext: '{{A2}}万円。ここまで粗利を作れれば、欲しい年収・時給に届きます。',
        requiredSalesNote: 'そのために必要な売上は、{{S2}}万円です。',
      },
    },

    demo: {
      inputLabels: {
        sales: '売上高（万円）',
        margin: '粗利率（%）',
        count: '人数（社長を含む）',
        comp: '役員報酬（万円）',
        hours: '週労働時間',
        industry: '業種',
        pref: '都道府県',
      },
      columnHeaders: { current: '現状', ideal: '理想', diff: '差額' },
      rowLabels: {
        atmark: '＠',
        grossProfit: '粗利',
        officerComp: '役員報酬',
        hourlyWage: '時給',
        currentSales: '売上高',
        requiredSales: '必要売上',
      },
      stage0: { heading: '今の＠' },
      stage1: {
        heading: '社長の時給',
        hintPrefSelect: '都道府県を選ぶと、最低賃金・パート時給と並べて表示します。',
        presidentWageLabel: '社長の時給',
        minWageUnavailable: '最低賃金（データなし）',
      },
      stage2: {
        heading: '理想の＠',
        guardNoTarget: '欲しい年収・時給を入力してください。',
        guardNoBenchmark: '目安を選んでください（Bキーで切替）。',
        targetIncomeLabel: '欲しい年収（万円）',
        targetHourlyLabel: '欲しい時給（円）',
      },
      stage3: { heading: '粗利の配分（4:2:2:2）' },
      stage4: {
        heading: '差額と次の一歩',
        guardStage2Required: 'Stage2で理想の水準を選んでください。',
      },
      modeToggle: { benchmark: '目安から選ぶ', target: '欲しい年収から逆算' },
      modeToggleHint: {
        benchmark: '業界平均やステージの＠を選ぶと、そこから社長の理想の報酬・時給が出ます',
        target: '社長が欲しい年収（または時給）を入れると、それに必要な＠・粗利・売上が出ます',
      },
      keyboardHelp: '←/→でステージ移動、0〜4で直接ジャンプ、↑/↓で数値調整、Bで目安の候補を切替、Mで「目安から選ぶ⇄欲しい年収から逆算」を切替、Rでリセット、Fでフルスクリーン',
      resetConfirm: '入力をリセットしますか？',
    },

    guard: {
      alreadyAbove: {
        demo: '＠はすでにこの水準を超えています',
        self: '＠は、すでにこの水準を超えています。今選んでいる目安より、もう少し上を見てみましょう。',
        button: { demo: '一つ上の水準を見る', self: '一つ上の水準を見る' },
      },
      belowKeep: {
        demo: '＠はこの水準を超えますが、社長の報酬は今の水準に届きません',
        self: '＠はこの水準を超えますが、4:2:2:2で配分すると、社長の報酬は今より下がる計算になります。もう一段上の目安で見てみましょう。',
        button: { demo: '一つ上の水準を提案する', self: '一つ上の水準を提案する' },
      },
      targetBelowCurrent: {
        demo: '今の報酬と同じか、それ以下の目標です',
        self: '入力いただいた金額は、今の役員報酬と同じか、それより低い金額です。もう一度、欲しい金額を入れてみてください。',
        button: { demo: '金額を入れ直す', self: '金額を入れ直す' },
      },
      reachableNow: {
        demo: '今の＠のままで、配分を4:2:2:2に近づけると届く水準です',
        self: 'この金額は、＠を今より増やさなくても、粗利の配分を4:2:2:2に近づけるだけで届く水準です。まずは配分から見てみましょう。',
        button: { demo: '4:2:2:2の配分を見る', self: '4:2:2:2の配分を見る' },
      },
      stageOnly: {
        demo: '社員給与を入れると、社長の理想報酬まで出ます',
        self: '社員給与総額を入れていただくと、社長の理想の役員報酬・時給まで計算できます。今は、＠とステージの目安だけをお見せしています。',
        button: { demo: '社員給与を入力する', self: '社員給与を入力する' },
      },
      laborShareHigh: {
        demo: '人件費が粗利の{{rho0}}%を占めています。＠が{{atmarkBe}}万円を超えると、100万円上がるごとに{{fortyN}}万円の余裕が生まれます。',
        self: '今は粗利のうち人件費が{{rho0}}%を占めています。つまり、この会社は人に投資している会社です。＠が{{atmarkBe}}万円を超えると、人件費枠に余裕が生まれ始めます。そこから先は、＠が100万円上がるごとに{{fortyN}}万円の余裕が生まれます。伸びしろが一番大きいのはここです。',
        button: { demo: '一つ上の水準を提案する', self: '一つ上の水準を提案する' },
      },
    },

    validation: {
      salesRequired: '売上高を入れてください',
      marginInvalid: '原価が売上を上回っているため試算できません',
      zeroCompNoHourly: '役員報酬が0円のため時給は出しません',
      countTooLow: '人数は1人以上で入力してください',
      hoursOutOfRange: '労働時間は1〜100の範囲で入力してください',
    },

    state: {
      returningContinue: '前回の続きから',
      returningRestart: '最初から',
      jsError: '表示に失敗しました。ページを再読み込みしてください',
      noscript: 'このツールの表示にはJavaScriptが必要です。ブラウザの設定でJavaScriptを有効にしてください。',
      loading: '計算しています…',
    },
  };

  /**
   * t(path, mode)
   * path: ドット区切り（例 'self.stage0.heading' / 'guard.alreadyAbove'）
   * mode: 'demo' | 'self'（省略時 'self'）。値が {demo,self} オブジェクトのときに使う。
   */
  function t(path, mode) {
    mode = mode === 'demo' ? 'demo' : 'self';
    var parts = path.split('.');
    var node = CONTENT;
    for (var i = 0; i < parts.length; i++) {
      if (node == null) return '';
      node = node[parts[i]];
    }
    if (node == null) return '';
    if (typeof node === 'string') return node;
    if (typeof node === 'object') {
      if (typeof node[mode] === 'string') return node[mode];
      if (typeof node.self === 'string') return node.self;
      if (typeof node.demo === 'string') return node.demo;
    }
    return '';
  }

  /**
   * tpl(str, vars) — {{key}} を vars[key] で置換する。未定義キーは空文字。
   */
  function tpl(str, vars) {
    if (typeof str !== 'string') return '';
    vars = vars || {};
    return str.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, function (m, key) {
      var v = vars[key];
      return v === undefined || v === null ? '' : String(v);
    });
  }

  root.ATMARK_CONTENT = CONTENT;
  root.t = t;
  root.tpl = tpl;

  if (typeof module === 'object' && module.exports) {
    module.exports = { CONTENT: CONTENT, t: t, tpl: tpl };
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
