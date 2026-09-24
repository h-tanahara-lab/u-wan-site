/**
 * calc.js 単体テスト（Node標準assertのみ。ビルド不要）
 *
 * 実行： node test/calc.test.js
 *
 * 設計書v2「検証」章の期待値表をそのまま固定する（ブリーフ指示）。
 * ★1件だけ訂正あり：②一人社長の ＠_keep（報酬維持＠）。
 *   設計書の値表は 1,500 と書かれているが、設計書自身が定義する式
 *   「＠_keep = (E + R) ÷ (N × 0.4)」に②の数値（E=0, R=400, N=1）を代入すると
 *   (0+400)/(1*0.4) = 1000 になる。同じ設計書内の「ステージ1ガード」表・laborShareHigh節など
 *   他の全数値は式どおりに再計算して一致したため、1,500は転記時の計算ミスと判断し、
 *   式から導出した正しい値（1000）でテストを固定した（設計書が同種の誤り＝②のW0の桁誤りを
 *   自己訂正している前例に倣う）。詳細は納品報告の「判断した点」に記載。
 */

'use strict';

var assert = require('assert');
var calc = require('../calc.js');

var failures = [];
var passCount = 0;

function test(name, fn) {
  try {
    fn();
    passCount++;
    console.log('  ok - ' + name);
  } catch (e) {
    failures.push({ name: name, error: e });
    console.log('  FAIL - ' + name);
    console.log('    ' + e.message);
  }
}

function approx(actual, expected, tolerance, msg) {
  var tol = tolerance === undefined ? 0.01 : tolerance;
  assert.ok(
    typeof actual === 'number' && isFinite(actual),
    (msg || '') + ' actual is not a finite number: ' + actual
  );
  var diff = Math.abs(actual - expected);
  assert.ok(
    diff <= tol,
    (msg || '') + ' expected ' + expected + ' +/- ' + tol + ', got ' + actual + ' (diff ' + diff + ')'
  );
}

/* ============================================================
   3ケースの入力（設計書「検証」章の表そのまま）
   ============================================================ */

var CASE1 = { S: 12000, g: 40, N: 5, R: 600, E: 1800, H: 60 }; // ①普通の会社
var CASE2 = { S: 2000, g: 70, N: 1, R: 400, E: 0, H: 70 }; // ②一人社長（Eはsolo自明）
var CASE3 = { S: 8000, g: 50, N: 8, R: 500, E: 3000, H: 50 }; // ③人件費が重い会社

function wageOf(caseInputs) {
  // solo(N=1)はresolveWageAssumptionが自動でE=0にするので industry 無しで解決できる。
  // ①③はE入力値ありなのでこれも industry 無しで 'input' 経路になる。
  return calc.resolveWageAssumption(caseInputs, null);
}

/* ============================================================
   1. 手計算突合（ブリーフ検証1：売上1.2億・粗利率40%・5人・役員報酬600万・週60時間）
   ============================================================ */

console.log('--- 1. 手計算突合（①） ---');
test('①G=4800, A0=960, T=2880, W0=2083.33', function () {
  var wage = wageOf(CASE1);
  var cur = calc.computeCurrent(CASE1, wage);
  assert.strictEqual(cur.branch, 'ok');
  approx(cur.G, 4800, 0.01);
  approx(cur.A0, 960, 0.01);
  approx(cur.T, 2880, 0.01);
  approx(cur.W0, 2083.33, 0.5, 'W0=600万÷(60×48時間)÷万円換算');
});

/* ============================================================
   2. 一人社長（人数=1）で分母が1になる
   ============================================================ */

console.log('--- 2. 一人社長 ---');
test('②solo: N=1で分母1, E=0(solo), A0=G/1', function () {
  var wage = wageOf(CASE2);
  assert.strictEqual(wage.source, 'solo');
  assert.strictEqual(wage.E, 0);
  var cur = calc.computeCurrent(CASE2, wage);
  assert.strictEqual(cur.branch, 'ok');
  approx(cur.G, 1400, 0.01);
  approx(cur.A0, 1400, 0.01); // G/1 = G
  approx(cur.T, 3360, 0.01);
  approx(cur.W0, 1190.48, 0.5, '②のW0=400×10000÷3360（設計書の訂正値。旧「11,905円」は桁誤り）');
});

/* ============================================================
   現状の全指標（3ケース×G,A0,T,W0,rho0,laborShareHigh,＠_be,＠_keep）
   ============================================================ */

console.log('--- 現状：全指標（3ケース） ---');

test('①現状指標一式', function () {
  var wage = wageOf(CASE1);
  var cur = calc.computeCurrent(CASE1, wage);
  approx(cur.G, 4800, 0.01);
  approx(cur.A0, 960, 0.01);
  approx(cur.T, 2880, 0.01);
  approx(cur.W0, 2083.33, 0.5);
  approx(cur.rho0, 50.0, 0.05);
  assert.strictEqual(cur.laborShareHigh, true);
  approx(cur.atmarkBreakeven, 900, 0.01);
  approx(cur.atmarkKeep, 1200, 0.01);
});

test('②現状指標一式', function () {
  var wage = wageOf(CASE2);
  var cur = calc.computeCurrent(CASE2, wage);
  approx(cur.G, 1400, 0.01);
  approx(cur.A0, 1400, 0.01);
  approx(cur.T, 3360, 0.01);
  approx(cur.W0, 1190.48, 0.5);
  approx(cur.rho0, 28.6, 0.05);
  assert.strictEqual(cur.laborShareHigh, false);
  approx(cur.atmarkBreakeven, 0, 0.01);
  // ★訂正値：設計書の1,500ではなく式どおりの1000（ヘッダコメント参照）
  approx(cur.atmarkKeep, 1000, 0.01, '②＠_keep（訂正値。設計書は1500と誤記）');
});

test('③現状指標一式', function () {
  var wage = wageOf(CASE3);
  var cur = calc.computeCurrent(CASE3, wage);
  approx(cur.G, 4000, 0.01);
  approx(cur.A0, 500, 0.01);
  approx(cur.T, 2400, 0.01);
  approx(cur.W0, 2083.33, 0.5);
  approx(cur.rho0, 87.5, 0.05);
  assert.strictEqual(cur.laborShareHigh, true);
  approx(cur.atmarkBreakeven, 937.5, 0.01);
  approx(cur.atmarkKeep, 1093.75, 0.01);
});

/* ============================================================
   3. laborShareHigh 分岐（社員給与総額 > 人件費枠）
   ============================================================ */

console.log('--- 3. laborShareHigh分岐 ---');
test('①③はlaborShareHigh=true、②はfalse', function () {
  assert.strictEqual(calc.computeCurrent(CASE1, wageOf(CASE1)).laborShareHigh, true);
  assert.strictEqual(calc.computeCurrent(CASE2, wageOf(CASE2)).laborShareHigh, false);
  assert.strictEqual(calc.computeCurrent(CASE3, wageOf(CASE3)).laborShareHigh, true);
});

/* ============================================================
   理想①：ステージ1（A1=1000）→ 全ケースでガード発火
   ============================================================ */

console.log('--- 理想①ステージ1（A1=1000）ガード発火 ---');

test('①ステージ1(1000) → belowKeep、差額列なし', function () {
  var wage = wageOf(CASE1);
  var ideal = calc.computeIdealByBenchmark(CASE1, 1000, wage);
  assert.strictEqual(ideal.branch, 'belowKeep');
  assert.strictEqual(ideal.G1, undefined);
  assert.strictEqual(ideal.R1, undefined);
});

test('②ステージ1(1000) → alreadyAbove、差額列なし', function () {
  var wage = wageOf(CASE2);
  var ideal = calc.computeIdealByBenchmark(CASE2, 1000, wage);
  assert.strictEqual(ideal.branch, 'alreadyAbove');
});

test('③ステージ1(1000) → belowKeep、差額列なし', function () {
  var wage = wageOf(CASE3);
  var ideal = calc.computeIdealByBenchmark(CASE3, 1000, wage);
  assert.strictEqual(ideal.branch, 'belowKeep');
});

test('3ケースとも自動提案はステージ2(2000)', function () {
  var stages = [
    { id: 'stage1', atmark: 1000 },
    { id: 'stage2', atmark: 2000 },
    { id: 'stage3', atmark: 3000 },
  ];
  [CASE1, CASE2, CASE3].forEach(function (c) {
    var wage = wageOf(c);
    var cur = calc.computeCurrent(c, wage);
    var suggestion = calc.suggestBenchmark(cur, stages);
    assert.strictEqual(suggestion.id, 'stage2');
  });
});

/* ============================================================
   理想①：自動提案後（A1=2000）→ normal
   ============================================================ */

console.log('--- 理想①自動提案後（A1=2000）normal ---');

test('①A1=2000 → normal、G1/P1/R1/W1/S1/差額/増加率', function () {
  var wage = wageOf(CASE1);
  var cur = calc.computeCurrent(CASE1, wage);
  var ideal = calc.computeIdealByBenchmark(CASE1, 2000, wage);
  assert.strictEqual(ideal.branch, 'normal');
  approx(ideal.G1, 10000, 0.01);
  approx(ideal.P1, 4000, 0.01);
  approx(ideal.R1, 2200, 0.01);
  approx(ideal.W1, 7638.89, 0.5);
  approx(ideal.S1, 25000, 0.01);
  approx(ideal.A1 - cur.A0, 1040, 0.01);
  approx(ideal.R1 - cur.R, 1600, 0.01);
  approx(ideal.W1 - cur.W0, 5555.56, 0.5);
  approx(ideal.salesGrowthPct, 108.3, 0.1);
  // 実装者への注意（設計書）：Tが共通なので時給差額の符号は役員報酬差額の符号と一致するはず
  assert.strictEqual(Math.sign(ideal.R1 - cur.R), Math.sign(ideal.W1 - cur.W0));
});

test('②A1=2000 → normal', function () {
  var wage = wageOf(CASE2);
  var cur = calc.computeCurrent(CASE2, wage);
  var ideal = calc.computeIdealByBenchmark(CASE2, 2000, wage);
  assert.strictEqual(ideal.branch, 'normal');
  approx(ideal.G1, 2000, 0.01);
  approx(ideal.P1, 800, 0.01);
  approx(ideal.R1, 800, 0.01);
  approx(ideal.W1, 2380.95, 0.5);
  approx(ideal.S1, 2857.14, 0.05);
  approx(ideal.A1 - cur.A0, 600, 0.01);
  approx(ideal.R1 - cur.R, 400, 0.01);
  approx(ideal.W1 - cur.W0, 1190.48, 0.5);
  approx(ideal.salesGrowthPct, 42.9, 0.1);
});

test('③A1=2000 → normal', function () {
  var wage = wageOf(CASE3);
  var cur = calc.computeCurrent(CASE3, wage);
  var ideal = calc.computeIdealByBenchmark(CASE3, 2000, wage);
  assert.strictEqual(ideal.branch, 'normal');
  approx(ideal.G1, 16000, 0.01);
  approx(ideal.P1, 6400, 0.01);
  approx(ideal.R1, 3400, 0.01);
  approx(ideal.W1, 14166.67, 0.5);
  approx(ideal.S1, 32000, 0.01);
  approx(ideal.A1 - cur.A0, 1500, 0.01);
  approx(ideal.R1 - cur.R, 2900, 0.01);
  approx(ideal.W1 - cur.W0, 12083.33, 0.5);
  approx(ideal.salesGrowthPct, 300.0, 0.1);
});

/* ============================================================
   4. 逆算モード：欲しい年収から必要＠・必要売上が出る
   ============================================================ */

console.log('--- 4. 理想②逆算（W=1000） ---');

test('①W=1000 → normal', function () {
  var wage = wageOf(CASE1);
  var cur = calc.computeCurrent(CASE1, wage);
  var ideal = calc.computeIdealByTarget(CASE1, { W: 1000 }, wage);
  assert.strictEqual(ideal.branch, 'normal');
  approx(ideal.W2, 3472.22, 0.5);
  approx(ideal.G2, 7000, 0.01);
  approx(ideal.A2, 1400, 0.01);
  approx(ideal.S2, 17500, 0.01);
  approx(ideal.A2 - cur.A0, 440, 0.01);
});

test('②W=1000 → normal', function () {
  var wage = wageOf(CASE2);
  var cur = calc.computeCurrent(CASE2, wage);
  var ideal = calc.computeIdealByTarget(CASE2, { W: 1000 }, wage);
  assert.strictEqual(ideal.branch, 'normal');
  approx(ideal.W2, 2976.19, 0.5);
  approx(ideal.G2, 2500, 0.01);
  approx(ideal.A2, 2500, 0.01);
  approx(ideal.S2, 3571.43, 0.05);
  approx(ideal.A2 - cur.A0, 1100, 0.01);
});

test('③W=1000 → normal', function () {
  var wage = wageOf(CASE3);
  var cur = calc.computeCurrent(CASE3, wage);
  var ideal = calc.computeIdealByTarget(CASE3, { W: 1000 }, wage);
  assert.strictEqual(ideal.branch, 'normal');
  approx(ideal.W2, 4166.67, 0.5);
  approx(ideal.G2, 10000, 0.01);
  approx(ideal.A2, 1250, 0.01);
  approx(ideal.S2, 20000, 0.01);
  approx(ideal.A2 - cur.A0, 750, 0.01);
});

console.log('--- 理想②ガード発火例 ---');

test('②W=300 → targetBelowCurrent（W<=R=400）', function () {
  var wage = wageOf(CASE2);
  var ideal = calc.computeIdealByTarget(CASE2, { W: 300 }, wage);
  assert.strictEqual(ideal.branch, 'targetBelowCurrent');
});

test('②W=500 → reachableNow（A2=1250<=A0=1400）', function () {
  var wage = wageOf(CASE2);
  var ideal = calc.computeIdealByTarget(CASE2, { W: 500 }, wage);
  assert.strictEqual(ideal.branch, 'reachableNow');
  approx(ideal.A2, 1250, 0.01);
});

test('①欲しい時給3000円 → W=864, A2=1332 → normal, W2=3000.00', function () {
  var wage = wageOf(CASE1);
  var ideal = calc.computeIdealByTarget(CASE1, { hourlyWage: 3000 }, wage);
  approx(ideal.W, 864, 0.01);
  assert.strictEqual(ideal.branch, 'normal');
  approx(ideal.A2, 1332, 0.01);
  approx(ideal.W2, 3000.0, 0.01);
});

/* ============================================================
   laborShareHighの数値（③で業界平均600を選んだ場合）
   ============================================================ */

console.log('--- laborShareHigh数値（③業界平均600） ---');

test('③A1=600 → belowKeep、ρ0=87.5、＠_be=937.5、自動提案=ステージ2', function () {
  var wage = wageOf(CASE3);
  var cur = calc.computeCurrent(CASE3, wage);
  approx(cur.rho0, 87.5, 0.05);
  approx(cur.atmarkBreakeven, 937.5, 0.01);

  var ideal = calc.computeIdealByBenchmark(CASE3, 600, wage);
  assert.strictEqual(ideal.branch, 'belowKeep');

  var stages = [
    { id: 'industryAvg', atmark: 600 },
    { id: 'stage2', atmark: 2000 },
  ];
  var suggestion = calc.suggestBenchmark(cur, stages);
  assert.strictEqual(suggestion.id, 'stage2');

  // 100万円あたりの余裕額 = 40 × N
  approx(40 * cur.N, 320, 0.01);
});

/* ============================================================
   境界・異常系（NaN/Infinityを返さない）
   ============================================================ */

console.log('--- 境界・異常系 ---');

test('g=0 → invalidMargin', function () {
  var r = calc.computeCurrent({ S: 1000, g: 0, N: 3, R: 300, H: 40 }, null);
  assert.strictEqual(r.branch, 'invalidMargin');
});

test('C>S(原価が売上超過) → invalidMargin', function () {
  var r = calc.computeCurrent({ S: 1000, C: 1500, N: 3, R: 300, H: 40 }, null);
  assert.strictEqual(r.branch, 'invalidMargin');
});

test('g=120 → invalidMargin', function () {
  var r = calc.computeCurrent({ S: 1000, g: 120, N: 3, R: 300, H: 40 }, null);
  assert.strictEqual(r.branch, 'invalidMargin');
});

test('N=0.5 → invalidInput', function () {
  var r = calc.computeCurrent({ S: 1000, g: 40, N: 0.5, R: 300, H: 40 }, null);
  assert.strictEqual(r.branch, 'invalidInput');
});

test('H=0 → invalidInput', function () {
  var r = calc.computeCurrent({ S: 1000, g: 40, N: 3, R: 300, H: 0 }, null);
  assert.strictEqual(r.branch, 'invalidInput');
});

test('N=1.5・業種あり → E = e_ind × 0.5', function () {
  var industry = { arari: { laborPerEmployee: { value: 400, confidence: 'confirmed' } } };
  var wage = calc.resolveWageAssumption({ N: 1.5 }, industry);
  assert.strictEqual(wage.source, 'industry');
  approx(wage.E, 200, 0.01); // 400 * max(1.5-1,0) = 400*0.5=200
});

test('H未入力 → 60で計算、assumed.H=true', function () {
  var r = calc.computeCurrent({ S: 1000, g: 40, N: 3, R: 300 }, null);
  assert.strictEqual(r.branch, 'ok');
  approx(r.H, 60, 0.01);
  assert.strictEqual(r.assumed.H, true);
  approx(r.T, 2880, 0.01);
});

test('R=0 → W0はnull（表示「—」）', function () {
  var r = calc.computeCurrent({ S: 1000, g: 40, N: 3, R: 0, H: 40 }, null);
  assert.strictEqual(r.branch, 'ok');
  assert.strictEqual(r.W0, null);
  assert.strictEqual(calc.fmtHourly(r.W0), '—');
});

test('業種未選択・E未入力・N=3 → stageOnly（E=0で計算した値を返してはならない）', function () {
  var wage = calc.resolveWageAssumption({ N: 3 }, null);
  assert.strictEqual(wage.source, 'unknown');
  assert.strictEqual(wage.E, null);

  var cur = calc.computeCurrent({ S: 1000, g: 40, N: 3, R: 300, H: 40 }, wage);
  assert.strictEqual(cur.branch, 'ok');
  // E不明のときはL0/rho0/laborShareHigh/＠_be/＠_keepを一切出さない（0で埋めない）
  assert.strictEqual(cur.E, null);
  assert.strictEqual(cur.L0, null);
  assert.strictEqual(cur.rho0, null);
  assert.strictEqual(cur.laborShareHigh, false);
  assert.strictEqual(cur.atmarkBreakeven, null);
  assert.strictEqual(cur.atmarkKeep, null);

  var ideal = calc.computeIdealByBenchmark({ S: 1000, g: 40, N: 3, R: 300, H: 40 }, 2000, wage);
  assert.strictEqual(ideal.branch, 'stageOnly');
  assert.strictEqual(ideal.R1, null);
  assert.strictEqual(ideal.W1, null);

  var idealTarget = calc.computeIdealByTarget({ S: 1000, g: 40, N: 3, R: 300, H: 40 }, { W: 800 }, wage);
  assert.strictEqual(idealTarget.branch, 'stageOnly');
});

/* ============================================================
   5. encode→decodeの往復で入力が一致
   ============================================================ */

console.log('--- 5. encodeState/decodeState往復 ---');

test('数値フィールドの往復一致', function () {
  var inputs = { S: 12000, g: 40, N: 5, R: 600, H: 60, E: 1800, ind: 'construction', pref: '沖縄' };
  var hash = calc.encodeState(inputs);
  var decoded = calc.decodeState(hash);
  approx(decoded.S, 12000, 0.001);
  approx(decoded.g, 40, 0.001);
  approx(decoded.N, 5, 0.001);
  approx(decoded.R, 600, 0.001);
  approx(decoded.H, 60, 0.001);
  approx(decoded.E, 1800, 0.001);
  assert.strictEqual(decoded.ind, 'construction');
  assert.strictEqual(decoded.pref, '沖縄');
});

test('氏名・メールに相当するキーはSTATE_FIELDSに存在しない（encodeStateに渡しても出力に含まれない）', function () {
  var hash = calc.encodeState({ S: 1000, g: 40, N: 3, R: 300, H: 40, name: '棚原秀樹', email: 'test@example.com' });
  assert.ok(hash.indexOf('棚原') === -1);
  assert.ok(hash.indexOf('example.com') === -1);
});

test('壊れた文字列を渡しても例外を投げずnullを返す', function () {
  assert.strictEqual(calc.decodeState('garbage'), null);
  assert.strictEqual(calc.decodeState(''), null);
  assert.strictEqual(calc.decodeState(undefined), null);
});

/* ============================================================
   6. ゼロ割・未入力（週労働時間なし→60の仮置き）は上のテストで検証済み
      ここでは computeAllocation / fmt系 の追加テスト
   ============================================================ */

console.log('--- computeAllocation（4:2:2:2按分） ---');

test('既定RATIO(4:2:2:2)で按分', function () {
  var alloc = calc.computeAllocation(1000);
  approx(alloc.jinken, 400, 0.01);
  approx(alloc.kotei, 200, 0.01);
  approx(alloc.mirai, 200, 0.01);
  approx(alloc.rieki, 200, 0.01);
  approx(alloc.jinken + alloc.kotei + alloc.mirai + alloc.rieki, 1000, 0.01);
});

test('カスタムratioで按分', function () {
  var alloc = calc.computeAllocation(900, { jinken: 3, kotei: 2, mirai: 2, rieki: 2 });
  approx(alloc.jinken, 300, 0.01);
  approx(alloc.kotei, 200, 0.01);
});

test('arariが不正ならnullを返す（NaN/Infinityを出さない）', function () {
  var alloc = calc.computeAllocation(NaN);
  assert.strictEqual(alloc.jinken, null);
});

console.log('--- computeDiff（汎用形） ---');

test('normal分岐の差額を計算', function () {
  var current = { atmark: 960, grossProfit: 4800, officerComp: 600, hourlyWage: 2083.33, requiredSales: 12000 };
  var ideal = { atmark: 2000, grossProfit: 10000, officerComp: 2200, hourlyWage: 7638.89, requiredSales: 25000 };
  var diff = calc.computeDiff(current, ideal);
  approx(diff.atmark, 1040, 0.01);
  approx(diff.officerComp, 1600, 0.01);
  approx(diff.hourlyWage, 5555.56, 0.5);
  approx(diff.requiredSales, 13000, 0.01);
});

test('数値が欠けているキーはnullを返す（NaN化しない）', function () {
  var diff = calc.computeDiff({ atmark: 960 }, {});
  assert.strictEqual(diff.atmark, null);
});

console.log('--- fmt系 ---');

test('fmtManyen/fmtHourly/fmtPct', function () {
  assert.strictEqual(calc.fmtManyen(959.6), '960万円');
  assert.strictEqual(calc.fmtHourly(2083.33), '2,083円'); // 1円単位丸め
  assert.strictEqual(calc.fmtPct(42.857), '42.9%');
  assert.strictEqual(calc.fmtManyen(null), '—');
  assert.strictEqual(calc.fmtHourly(undefined), '—');
});

console.log('--- T6追加：境界ケース（ユウキ） ---');

test('追加1: E入力あり＋業種あり → 入力値が業界平均より優先される（優先1>優先2）', function () {
  var industry = { arari: { laborPerEmployee: { value: 999, confidence: 'confirmed' } } };
  var wage = calc.resolveWageAssumption({ N: 5, E: 1800 }, industry);
  assert.strictEqual(wage.source, 'input');
  approx(wage.E, 1800, 0.01, '業種データ(999×4=3996)ではなく入力値1800が採用されること');
});

test('追加2: ρ0がちょうど40%ちょうど → laborShareHigh=false（境界は>40の厳密不等号）', function () {
  // S=2500, g=40 → G=1000。E=200,R=200 → L0=400 → rho0=400/1000*100=40ちょうど
  var wage = { E: 200, source: 'input', confidence: 'confirmed' };
  var cur = calc.computeCurrent({ S: 2500, g: 40, N: 3, R: 200, H: 40 }, wage);
  approx(cur.rho0, 40, 0.01);
  assert.strictEqual(cur.laborShareHigh, false, 'rho0=40ちょうどはlaborShareHigh対象外（>40のみtrue）');
});

test('追加3: A1が＠_keepとちょうど等しい境界 → belowKeep（<=なのでnormalには入らない）', function () {
  // ①のケース：E=1800,R=600,N=5 → atmarkKeep=(1800+600)/(5*0.4)=1200
  var wage = { E: 1800, source: 'input', confidence: 'confirmed' };
  var inputs = { S: 12000, g: 40, N: 5, R: 600, H: 60 };
  var cur = calc.computeCurrent(inputs, wage);
  approx(cur.atmarkKeep, 1200, 0.01);
  var ideal = calc.computeIdealByBenchmark(inputs, cur.atmarkKeep, wage);
  assert.strictEqual(ideal.branch, 'belowKeep', 'A1===＠_keepちょうどはnormalではなくbelowKeep（境界を含むガード）');
});

test('追加4: N=1.5・業種ありをcomputeCurrent経由のフルフローで確認（resolveWageAssumption単体テストだけでなく現状計算まで通す）', function () {
  var industry = { arari: { laborPerEmployee: { value: 400, confidence: 'confirmed' } } };
  var wage = calc.resolveWageAssumption({ N: 1.5 }, industry);
  var cur = calc.computeCurrent({ S: 3000, g: 40, N: 1.5, R: 300, H: 40 }, wage);
  assert.strictEqual(cur.branch, 'ok');
  approx(cur.E, 200, 0.01, '400 × max(1.5-1,0) = 200が現状計算まで正しく伝播すること');
  approx(cur.G, 1200, 0.01);
  approx(cur.rho0, 41.6666667, 0.01);
});

test('追加5: A1がA0とちょうど等しい境界 → alreadyAbove（<=なのでnormalには入らない）', function () {
  var wage = { E: 1800, source: 'input', confidence: 'confirmed' };
  var inputs = { S: 12000, g: 40, N: 5, R: 600, H: 60 };
  var cur = calc.computeCurrent(inputs, wage);
  var ideal = calc.computeIdealByBenchmark(inputs, cur.A0, wage);
  assert.strictEqual(ideal.branch, 'alreadyAbove', 'A1===A0ちょうどはalreadyAbove（差額0を「理想」として見せない）');
});

/* ============================================================
   結果サマリー
   ============================================================ */

console.log('');
console.log('=== ' + passCount + ' passed, ' + failures.length + ' failed ===');
if (failures.length > 0) {
  process.exitCode = 1;
}
