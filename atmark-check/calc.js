/**
 * ＠（一人当たり粗利）簡易診断ツール — 計算ロジック（純関数のみ）
 *
 * ★絶対ルール★
 * - document / window / fetch / localStorage を一切書かない（実演モードと事前診断モードの計算分離が壊れるため）
 * - file:// で開いても動く（import/export は使わない。IIFEでグローバル1つに公開する）
 * - Node で require して単体テストできる（末尾で module.exports を条件付きで出す）
 * - 全経路で NaN / Infinity を返さない。ゼロ割の可能性があるところは必ずガードする
 *
 * 設計出典：`40_Web_Studio/atmark-shindan/03_設計/設計書_v2_20260924.md`「計算ロジック」章
 * [v2.1 2026-09-24 棚原確定] UTAGE連携は全廃止。buildDiagnosticLog は実装しない（結果は encodeState の
 * #s= リンクを棚原さんに送ってもらう運用に一本化）。ツール名「＠診断」／URL `u-wan.jp/atmark-check/` 確定。
 * 変数記号（S, g, N, R, H, E, G, A0, T, W0, ρ0, ＠_be, ＠_keep, A1, G1, P1, R1, W1, S1, W, W2, G2, A2, S2）は
 * 設計書の記号をそのまま変数名に使っている（ブリーフ「★v2差分」指示）。
 *
 * 単位の原則：
 * - 金額の入力・保持・返却はすべて万円
 * - 時給（円）に変換するときだけ ×10000。時給（円）から年収（万円）に戻すときは ÷10000
 *   （×10000箇所は3つ：W0算出／W1算出／欲しい時給→W算出。設計書「単位の原則」参照）
 * - 時給は1円単位で丸める（design v2で「10円単位」から訂正済み。最低賃金と桁を揃える）
 *
 * 参照した既存コード（ゼロから書いていない）：
 * - STRAC_v1.html L1417-1432 computeStracDiffs（→ computeAllocation の按分ロジックの元）
 * - STRAC_v1.html L1521, L1524 onStrategyInput（×10000 換算の先例）
 * - shigoto-mieruka-shindan/app/lib/calc.js L190 WEEKS_PER_YEAR = 48（同値で揃えている）
 */

(function (root, factory) {
  var mod = factory();
  if (typeof module === 'object' && module.exports) {
    // Node（test/calc.test.js から require する経路）
    module.exports = mod;
  }
  // ブラウザ file:// / <script> 経路：グローバル1つに公開
  root.AtmarkCalc = mod;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  /* ============================================================
     定数
     ============================================================ */

  // 見える化診断 calc.js L190 と同値で揃える（両方受けた人の中で数字が矛盾しないように）
  var WEEKS_PER_YEAR = 48;

  // STRAC_v1.html L992 の既定 ratio と同値
  var RATIO = { jinken: 4, kotei: 2, mirai: 2, rieki: 2 };

  /* ============================================================
     内部ユーティリティ
     ============================================================ */

  function isFiniteNum(v) {
    return typeof v === 'number' && isFinite(v);
  }

  function hasValue(v) {
    return v !== undefined && v !== null && v !== '';
  }

  function round(v, decimals) {
    if (!isFiniteNum(v)) return v;
    var factor = Math.pow(10, decimals || 0);
    return Math.round(v * factor) / factor;
  }

  /**
   * 売上高(S)・粗利率(g)を確定する。粗利率(g)を直接受け取るモードと、
   * 売上原価(C)から逆算するモードの2通りに対応する（設計書I2）。
   * 戻り値が ok:false のときは branch に 'invalidInput' | 'invalidMargin' が入る。
   */
  function deriveMargin(inputs) {
    var S = inputs.S;
    if (!isFiniteNum(S) || S <= 0) {
      return { ok: false, branch: 'invalidInput' };
    }

    var g;
    if (isFiniteNum(inputs.C)) {
      // 原価入力モード：G = S - C から逆算した g で以後は統一的に扱う
      if (inputs.C < 0) return { ok: false, branch: 'invalidMargin' };
      g = ((S - inputs.C) / S) * 100;
    } else if (isFiniteNum(inputs.g)) {
      g = inputs.g;
    } else {
      return { ok: false, branch: 'invalidInput' };
    }

    // g <= 0 または g > 100（原価が売上を上回る場合も g <= 0 に落ちるためここで捕捉される）
    if (!(g > 0) || g > 100) {
      return { ok: false, branch: 'invalidMargin' };
    }

    return { ok: true, S: S, g: g };
  }

  /**
   * 人数(N)・週労働時間(H)を確定する。Hは未入力なら60を仮置きする（設計書I5）。
   */
  function validateNH(inputs) {
    var N = inputs.N;
    if (!isFiniteNum(N) || N < 1) {
      return { ok: false, branch: 'invalidInput' };
    }

    var H = inputs.H;
    var assumedH = false;
    if (!hasValue(H)) {
      H = 60;
      assumedH = true;
    } else if (!isFiniteNum(H) || H <= 0 || H > 100) {
      return { ok: false, branch: 'invalidInput' };
    }

    return { ok: true, N: N, H: H, assumedH: assumedH };
  }

  /* ============================================================
     公開関数：現状
     ============================================================ */

  /**
   * computeCurrent(inputs, wageAssumption)
   *
   * inputs: { S, g?, C?, N, R, H? }
   * wageAssumption: resolveWageAssumption() の戻り値（省略可。渡さない場合は
   *                 労働分配率・laborShareHigh・＠_be・＠_keep は計算せず null で返す）
   *
   * 戻り値（branch:'ok' のとき）：
   *   { branch:'ok', S,g,N,H,R,T, G,A0,W0, assumed:{H}, E,wageSource,L0,rho0,
   *     laborShareHigh, atmarkBreakeven(＠_be), atmarkKeep(＠_keep) }
   * 戻り値（入力異常時）： { branch: 'invalidInput' | 'invalidMargin' }
   */
  function computeCurrent(inputs, wageAssumption) {
    var margin = deriveMargin(inputs);
    if (!margin.ok) return { branch: margin.branch };

    var nh = validateNH(inputs);
    if (!nh.ok) return { branch: nh.branch };

    var R = inputs.R;
    if (!isFiniteNum(R) || R < 0) {
      return { branch: 'invalidInput' };
    }

    var S = margin.S;
    var g = margin.g;
    var N = nh.N;
    var H = nh.H;

    var G = (S * g) / 100;
    var A0 = G / N;
    var T = H * WEEKS_PER_YEAR;
    // R = 0 のとき時給は「—」表示。null を返しUI側の表示分岐に委ねる
    var W0 = R > 0 ? (R * 10000) / T : null;

    var result = {
      branch: 'ok',
      S: S,
      g: g,
      N: N,
      H: H,
      R: R,
      T: T,
      G: G,
      A0: A0,
      W0: W0,
      assumed: { H: nh.assumedH },
    };

    if (wageAssumption && wageAssumption.source !== 'unknown' && isFiniteNum(wageAssumption.E)) {
      var E = wageAssumption.E;
      var L0 = E + R;
      var rho0 = G > 0 ? (L0 / G) * 100 : null;

      result.E = E;
      result.wageSource = wageAssumption.source;
      result.L0 = L0;
      result.rho0 = rho0;
      result.laborShareHigh = rho0 !== null ? rho0 > 40 : false;
      result.atmarkBreakeven = N > 0 ? E / (N * 0.4) : null; // ＠_be
      result.atmarkKeep = N > 0 ? L0 / (N * 0.4) : null; // ＠_keep
    } else {
      result.E = null;
      result.wageSource = wageAssumption ? wageAssumption.source : 'unknown';
      result.L0 = null;
      result.rho0 = null;
      result.laborShareHigh = false;
      result.atmarkBreakeven = null;
      result.atmarkKeep = null;
    }

    return result;
  }

  /* ============================================================
     公開関数：社員給与総額 E の解決
     ============================================================ */

  /**
   * resolveWageAssumption(inputs, industry)
   *
   * v1の「現状据え置き」は廃止。solo → input → industry → unknown の4段フォールバック。
   * E不明のときに0を代入して続ける経路は存在しない（source:'unknown' を返し、
   * 呼び出し側はこれを stageOnly 分岐のトリガーとして扱う）。
   *
   * industry: industry.json の industries[] 1エントリ（{ arari: { laborPerEmployee: {value,confidence} } }）。省略可。
   *
   * 戻り値： { E: number|null, source: 'solo'|'input'|'industry'|'unknown', confidence: string|null }
   */
  function resolveWageAssumption(inputs, industry) {
    var N = inputs.N;

    // 優先0：一人社長は自明に0円
    if (N === 1) {
      return { E: 0, source: 'solo', confidence: 'confirmed' };
    }

    // 優先1：入力値
    if (isFiniteNum(inputs.E) && inputs.E >= 0) {
      return { E: inputs.E, source: 'input', confidence: 'confirmed' };
    }

    // 優先2：業界平均の従業員1人当たり人件費 × max(N-1, 0)
    if (
      industry &&
      industry.arari &&
      industry.arari.laborPerEmployee &&
      isFiniteNum(industry.arari.laborPerEmployee.value) &&
      (industry.arari.laborPerEmployee.confidence === 'confirmed' ||
        industry.arari.laborPerEmployee.confidence === 'estimated')
    ) {
      var eInd = industry.arari.laborPerEmployee.value;
      var extraHeads = isFiniteNum(N) ? Math.max(N - 1, 0) : 0;
      return {
        E: eInd * extraHeads,
        source: 'industry',
        confidence: industry.arari.laborPerEmployee.confidence,
      };
    }

    // 優先3：確定も推定もできない → stageOnly 分岐のトリガー
    return { E: null, source: 'unknown', confidence: null };
  }

  /* ============================================================
     公開関数：理想①（ベンチマーク型）
     ============================================================ */

  function normalizeBench(bench) {
    if (typeof bench === 'number') return { atmark: bench };
    return bench || {};
  }

  /**
   * computeIdealByBenchmark(inputs, bench, wageAssumption)
   *
   * bench: 数値（＠のベンチマーク値）または { atmark, id, label } オブジェクト
   * wageAssumption: resolveWageAssumption() の戻り値（必須。stageOnly判定に使う）
   *
   * branch: 'normal' | 'alreadyAbove' | 'belowKeep' | 'stageOnly' | 'invalidInput' | 'invalidMargin'
   */
  function computeIdealByBenchmark(inputs, bench, wageAssumption) {
    var current = computeCurrent(inputs, wageAssumption);
    if (current.branch !== 'ok') return { branch: current.branch };

    var A1 = normalizeBench(bench).atmark;
    if (!isFiniteNum(A1) || A1 <= 0) {
      return { branch: 'invalidInput' };
    }

    var N = current.N;
    var g = current.g;
    var S = current.S;
    var A0 = current.A0;
    var T = current.T;

    // E不明 → stageOnly。A1 > A0 のみで判定し、理想役員報酬・理想時給は出さない
    if (!wageAssumption || wageAssumption.source === 'unknown') {
      var G1s = A1 * N;
      var S1s = (g > 0) ? G1s / (g / 100) : null;
      return {
        branch: 'stageOnly',
        A0: A0,
        A1: A1,
        G1: G1s,
        S1: S1s,
        R1: null,
        W1: null,
        stageOnlyAboveCurrent: A1 > A0,
      };
    }

    var E = wageAssumption.E;
    var atmarkKeep = current.atmarkKeep; // ＠_keep
    var threshold = Math.max(A0, isFiniteNum(atmarkKeep) ? atmarkKeep : A0);

    if (A1 <= A0) {
      return { branch: 'alreadyAbove', A0: A0, A1: A1, atmarkKeep: atmarkKeep };
    }
    if (A1 <= threshold) {
      return { branch: 'belowKeep', A0: A0, A1: A1, atmarkKeep: atmarkKeep };
    }

    var G1 = A1 * N;
    var P1 = G1 * 0.4;
    var R1 = P1 - E;

    // 防御：ガードを通っても R1 < 0 なら belowKeep 扱い（NaN/Infinity/マイナス役員報酬を出さない）
    if (R1 < 0) {
      return { branch: 'belowKeep', A0: A0, A1: A1, atmarkKeep: atmarkKeep };
    }

    var W1 = (R1 * 10000) / T; // ×10000（2箇所目）
    var S1 = g > 0 ? G1 / (g / 100) : null;
    var salesGrowthPct = isFiniteNum(S1) && S > 0 ? ((S1 / S - 1) * 100) : null;

    return {
      branch: 'normal',
      A0: A0,
      A1: A1,
      G1: G1,
      P1: P1,
      R1: R1,
      W1: W1,
      S1: S1,
      salesGrowthPct: salesGrowthPct,
      atmarkKeep: atmarkKeep,
    };
  }

  /**
   * suggestBenchmark(current, benches)
   *
   * current: computeCurrent() の戻り値（A0, atmarkKeep を使う）
   * benches: [{ id, label, atmark }, ...]
   *
   * max(A0, ＠_keep) を超える最小のベンチマークを返す。無ければ null。
   */
  function suggestBenchmark(current, benches) {
    if (!current || !benches || !benches.length) return null;
    var threshold = Math.max(
      current.A0,
      isFiniteNum(current.atmarkKeep) ? current.atmarkKeep : current.A0
    );

    var candidates = benches.filter(function (b) {
      return isFiniteNum(b.atmark) && b.atmark > threshold;
    });
    if (!candidates.length) return null;

    candidates.sort(function (a, b) {
      return a.atmark - b.atmark;
    });
    return candidates[0];
  }

  /* ============================================================
     公開関数：理想②（逆算型）
     ============================================================ */

  /**
   * computeIdealByTarget(inputs, target, wageAssumption)
   *
   * target: { W } （欲しい年収・万円） または { hourlyWage } （欲しい時給・円）
   *   hourlyWage が渡された場合 W = hourlyWage × T ÷ 10000（×10000箇所の3つ目）で年収に変換する
   *
   * branch: 'normal' | 'targetBelowCurrent' | 'reachableNow' | 'stageOnly' | 'invalidInput' | 'invalidMargin'
   */
  function computeIdealByTarget(inputs, target, wageAssumption) {
    var current = computeCurrent(inputs, wageAssumption);
    if (current.branch !== 'ok') return { branch: current.branch };

    var T = current.T;
    var R = current.R;
    var N = current.N;
    var g = current.g;
    var S = current.S;
    var A0 = current.A0;

    var W;
    if (target && isFiniteNum(target.W)) {
      W = target.W;
    } else if (target && isFiniteNum(target.hourlyWage)) {
      W = (target.hourlyWage * T) / 10000;
    } else {
      return { branch: 'invalidInput' };
    }
    if (!isFiniteNum(W) || W < 0) {
      return { branch: 'invalidInput' };
    }

    // stageOnly：Eが確定/推定できないと逆算不可
    if (!wageAssumption || wageAssumption.source === 'unknown') {
      return { branch: 'stageOnly', W: W };
    }

    // ガード：欲しい年収が現在の役員報酬以下
    if (W <= R) {
      return { branch: 'targetBelowCurrent', W: W, R: R };
    }

    var E = wageAssumption.E;
    var W2 = (W * 10000) / T;
    var G2 = (W + E) / 0.4;
    var A2 = G2 / N;
    var S2 = g > 0 ? G2 / (g / 100) : null;
    var salesGrowthPct = isFiniteNum(S2) && S > 0 ? ((S2 / S - 1) * 100) : null;

    if (A2 <= A0) {
      return {
        branch: 'reachableNow',
        W: W,
        W2: W2,
        G2: G2,
        A2: A2,
        S2: S2,
        salesGrowthPct: salesGrowthPct,
      };
    }

    return {
      branch: 'normal',
      W: W,
      W2: W2,
      G2: G2,
      A2: A2,
      S2: S2,
      salesGrowthPct: salesGrowthPct,
    };
  }

  /* ============================================================
     公開関数：差額列
     ============================================================ */

  /**
   * computeDiff(current, ideal)
   *
   * normal 分岐のときだけ呼ぶ想定。current / ideal は下記の汎用形（呼び出し側で
   * computeCurrent / computeIdealByBenchmark|Target の結果からこの形に詰め替える）：
   *   { atmark, grossProfit, officerComp, hourlyWage, requiredSales }
   *   - officerComp: 現状=R、理想（ベンチマーク型）=R1、理想（逆算型）=W（欲しい年収そのもの）
   *   - hourlyWage : 現状=W0、理想（ベンチマーク型）=W1、理想（逆算型）=W2
   *   - requiredSales: 現状=S、理想=S1|S2
   *
   * 戻り値：各指標の diff（理想−現状）。「1人が1年で増やす粗利＝＠差額」は atmark と同じ値。
   */
  function computeDiff(current, ideal) {
    function diffOf(key) {
      var c = current ? current[key] : undefined;
      var i = ideal ? ideal[key] : undefined;
      if (!isFiniteNum(c) || !isFiniteNum(i)) return null;
      return i - c;
    }

    return {
      atmark: diffOf('atmark'),
      grossProfit: diffOf('grossProfit'),
      officerComp: diffOf('officerComp'),
      hourlyWage: diffOf('hourlyWage'),
      requiredSales: diffOf('requiredSales'),
    };
  }

  /* ============================================================
     公開関数：4:2:2:2按分
     ============================================================ */

  /**
   * computeAllocation(arari, ratio)
   *
   * STRAC_v1.html L1417-1432 computeStracDiffs の按分ロジックを、粗利(arari)基準で移植。
   * 4:2:2:2は「粗利」を按分する式。付加価値（人件費込み）ではない（★最重要の地雷）。
   *
   * arari: 按分対象の粗利（万円）
   * ratio: 省略時は RATIO（4:2:2:2）
   *
   * 戻り値： { jinken, kotei, mirai, rieki }（各カテゴリの目標配分額・万円）
   */
  function computeAllocation(arari, ratio) {
    var r = ratio || RATIO;
    var ratioSum = (r.jinken + r.kotei + r.mirai + r.rieki) || 1;
    if (!isFiniteNum(arari)) {
      return { jinken: null, kotei: null, mirai: null, rieki: null };
    }
    return {
      jinken: (arari * r.jinken) / ratioSum,
      kotei: (arari * r.kotei) / ratioSum,
      mirai: (arari * r.mirai) / ratioSum,
      rieki: (arari * r.rieki) / ratioSum,
    };
  }

  /* ============================================================
     公開関数：状態の共有URLエンコード（#s= 用）
     [v2.1 2026-09-24 棚原確定] UTAGE連携（リードフォーム・外部送信・buildDiagnosticLog）は
     全廃止。事前診断モードは「結果リンク（#s=）をコピーして棚原さんに送ってもらう」で完結する。
     encodeState/decodeStateがその唯一の受け渡し手段になるため、ここは残す。
     ============================================================ */

  // フィールド順を固定（バージョンprefix付き。将来フィールド追加時はv2以降で拡張する）
  var STATE_FIELDS_V1 = ['S', 'g', 'C', 'N', 'R', 'H', 'E', 'ind', 'pref'];

  /**
   * encodeState(inputs)
   *
   * 数値（と業種・都道府県コード）のみを #s= に積む。氏名・メールは対象外＝このエンコーダには
   * そもそも渡してはいけない（app.js側の責務）。
   */
  function encodeState(inputs) {
    inputs = inputs || {};
    var parts = STATE_FIELDS_V1.map(function (key) {
      var v = inputs[key];
      if (!hasValue(v)) return '';
      return encodeURIComponent(String(v));
    });
    return 'v1~' + parts.join('~');
  }

  /**
   * decodeState(hash)
   *
   * encodeState() の逆変換。壊れた文字列を渡されても例外を投げず null を返す。
   */
  function decodeState(hash) {
    if (typeof hash !== 'string' || hash.indexOf('v1~') !== 0) return null;
    try {
      var parts = hash.slice(3).split('~');
      var result = {};
      STATE_FIELDS_V1.forEach(function (key, idx) {
        var raw = parts[idx];
        if (raw === undefined || raw === '') return;
        var decoded = decodeURIComponent(raw);
        if (key === 'ind' || key === 'pref') {
          result[key] = decoded;
        } else {
          var num = parseFloat(decoded);
          if (isFiniteNum(num)) result[key] = num;
        }
      });
      return result;
    } catch (e) {
      return null;
    }
  }

  /* ============================================================
     公開関数：丸め・表示フォーマット
     ============================================================ */

  // 金額は万円整数
  function fmtManyen(v) {
    if (!isFiniteNum(v)) return '—';
    return Math.round(v).toLocaleString('ja-JP') + '万円';
  }

  // 時給は1円単位（v2で「10円単位」から訂正。最低賃金と桁を揃える）
  function fmtHourly(v) {
    if (!isFiniteNum(v)) return '—';
    return Math.round(v).toLocaleString('ja-JP') + '円';
  }

  // 率は小数1位
  function fmtPct(v, digits) {
    if (!isFiniteNum(v)) return '—';
    var d = isFiniteNum(digits) ? digits : 1;
    return v.toFixed(d) + '%';
  }

  // fmtManyen のエイリアス（ブリーフ記載の `fmt` 名を残す。STRAC_v1.html の fmt() に相当）
  var fmt = fmtManyen;

  /* ============================================================
     エクスポート
     ============================================================ */

  return {
    WEEKS_PER_YEAR: WEEKS_PER_YEAR,
    RATIO: RATIO,

    computeCurrent: computeCurrent,
    resolveWageAssumption: resolveWageAssumption,
    computeIdealByBenchmark: computeIdealByBenchmark,
    suggestBenchmark: suggestBenchmark,
    computeIdealByTarget: computeIdealByTarget,
    computeDiff: computeDiff,
    computeAllocation: computeAllocation,
    encodeState: encodeState,
    decodeState: decodeState,

    fmt: fmt,
    fmtManyen: fmtManyen,
    fmtHourly: fmtHourly,
    fmtPct: fmtPct,

    // テスト・内部検証用に公開（app.js は使わない想定だが隠す理由もないため公開しておく）
    round: round,
  };
});
