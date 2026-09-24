/**
 * ＠診断 — app.js（UI制御・状態管理・モード分岐・localStorage）
 *
 * ★重要：このファイルは外部送信を一切行わない（[v2.1] UTAGE連携は廃止済み）。
 * 結果は #s= リンク（AtmarkCalc.encodeState/decodeState）をコピーして手動で送ってもらう運用。
 * 将来 GA4 等の計測タグを入れる場合、#s= は売上・役員報酬の実額を含むため
 * page_location からは除外すること（社内限定共有の前提を崩さない）。
 *
 * 依存：calc.js（AtmarkCalc）／data/industry.js（INDUSTRY_DATA）／content.js（t, tpl, ATMARK_CONTENT）
 * 参照した既存コード：
 * - STRAC_v1.html L1473-1528（双方向同期スライダー・activeElement判定）
 * - STRAC_v1.html L1417-1432 / L1531-1610（4:2:2:2の考え方。本ファイルではSVGでなくdivの横バーとして新規実装）
 */
(function () {
  'use strict';

  /* ============================================================
     ユーティリティ
     ============================================================ */

  function isFiniteNum(v) { return typeof v === 'number' && isFinite(v); }

  /**
   * calc.js の branch:'invalidInput' は S<=0／N<1／H範囲外／欠損マージンをまとめて
   * 返すため、実際にどの入力が原因かを同じ優先順位（deriveMargin→validateNH）で
   * 判定し、content.js の validation.* から正しい文言キーを選ぶ。
   * marginInvalid（branch:'invalidMargin'）はこの関数を通さず呼び出し側で直接分岐する。
   */
  function inferInvalidInputKey(inputs) {
    if (!isFiniteNum(inputs.S) || inputs.S <= 0) return 'salesRequired';
    if (!isFiniteNum(inputs.N) || inputs.N < 1) return 'countTooLow';
    var hProvided = inputs.H !== undefined && inputs.H !== null && inputs.H !== '';
    if (hProvided && (!isFiniteNum(inputs.H) || inputs.H <= 0 || inputs.H > 100)) return 'hoursOutOfRange';
    return 'salesRequired';
  }

  function fmtNum(v) { return isFiniteNum(v) ? Math.round(v).toLocaleString('ja-JP') : '—'; }
  function fmtSigned(v) {
    if (!isFiniteNum(v)) return '—';
    return (v >= 0 ? '+' : '') + Math.round(v).toLocaleString('ja-JP');
  }
  function fmtPct1(v) { return isFiniteNum(v) ? v.toFixed(1) : '—'; }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function on(el, evt, fn) { if (el) el.addEventListener(evt, fn); }

  /* localStorage は必ず try/catch（設計書：無効環境で止まらない） */
  function lsGet(key) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function lsSet(key, val) {
    try { window.localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* 無視 */ }
  }
  function lsRemove(key) {
    try { window.localStorage.removeItem(key); } catch (e) { /* 無視 */ }
  }

  function getQueryParams() {
    var params = {};
    var qsPart = location.search.replace(/^\?/, '');
    if (!qsPart) return params;
    qsPart.split('&').forEach(function (p) {
      if (!p) return;
      var kv = p.split('=');
      var k = decodeURIComponent(kv[0]);
      var v = kv[1] !== undefined ? decodeURIComponent(kv[1].replace(/\+/g, ' ')) : '';
      params[k] = v;
    });
    return params;
  }

  /* ============================================================
     JSエラー・noscript（未記載状態7番）
     ============================================================ */
  window.onerror = function () {
    var banner = document.getElementById('js-error-banner');
    if (banner) {
      banner.textContent = (typeof t === 'function') ? t('state.jsError') : '表示に失敗しました。ページを再読み込みしてください';
      banner.classList.add('is-visible');
    }
    return false;
  };

  /* ============================================================
     業界・都道府県データヘルパ
     ============================================================ */
  var DATA = (typeof INDUSTRY_DATA !== 'undefined') ? INDUSTRY_DATA : { industries: [], stages: [], minWage: [], partWage: [], sources: [] };

  function getIndustryList() {
    var seen = {};
    var list = [];
    (DATA.industries || []).forEach(function (e) {
      if (e.capitalClass !== '1000to5000') return;
      if (seen[e.industryCode]) return;
      seen[e.industryCode] = true;
      list.push({ code: e.industryCode, name: e.industryName });
    });
    return list;
  }
  function findIndustry(code) {
    if (!code) return null;
    return (DATA.industries || []).filter(function (e) {
      return e.industryCode === code && e.capitalClass === '1000to5000';
    })[0] || null;
  }
  function getPrefList() {
    return (DATA.minWage || []).map(function (m) { return m.pref; });
  }
  function findMinWage(pref) {
    return (DATA.minWage || []).filter(function (m) { return m.pref === pref; })[0] || null;
  }
  function findPartWage(pref) {
    return (DATA.partWage || []).filter(function (m) { return m.pref === pref; })[0] || null;
  }
  function findSource(id) {
    return (DATA.sources || []).filter(function (s) { return s.id === id; })[0] || null;
  }

  function buildBenches(industryEntry) {
    var benches = [];
    if (industryEntry && industryEntry.arari && industryEntry.arari.atmark &&
        isFiniteNum(industryEntry.arari.atmark.value) && industryEntry.arari.atmark.confidence !== 'unavailable') {
      benches.push({
        id: 'industry',
        kind: 'industry',
        label: t('common.benchmarkIndustryLabel'),
        atmark: industryEntry.arari.atmark.value,
        industryName: industryEntry.industryName,
        confidence: industryEntry.arari.atmark.confidence,
        sourceId: industryEntry.arari.atmark.sourceId,
        computeFormula: industryEntry.arari.atmark.computeFormula,
      });
    }
    (DATA.stages || []).forEach(function (s) {
      if (!s.atmark || !isFiniteNum(s.atmark.value)) return;
      benches.push({
        id: 'stage' + s.stageNumber,
        kind: 'stage',
        stageNumber: s.stageNumber,
        label: s.label,
        atmark: s.atmark.value,
        basis: s.basis,
        confidence: s.atmark.confidence,
        sourceId: s.atmark.sourceId,
      });
    });
    return benches;
  }

  /* ============================================================
     計算オーケストレーション（calc.js のラッパー）
     ============================================================ */

  /**
   * computeAll(inputs, idealMode, benchOrTarget)
   * idealMode: 'benchmark' | 'target'
   * benchOrTarget: 'benchmark'なら{atmark,id,label}、'target'なら{W}|{hourlyWage}
   */
  function computeAll(inputs, idealMode, benchOrTarget) {
    var industryEntry = inputs.ind ? findIndustry(inputs.ind) : null;
    var wageAssumption = AtmarkCalc.resolveWageAssumption(inputs, industryEntry);
    var current = AtmarkCalc.computeCurrent(inputs, wageAssumption);
    if (current.branch !== 'ok') {
      return { branch: current.branch, current: current, wageAssumption: wageAssumption, mode: idealMode };
    }

    // 理想がまだ選ばれていない状態（Stage2a未入力／Stage2bベンチマーク未選択）は、
    // 入力異常（invalidInput/invalidMargin）とは別物として扱う。Stage0/1は現状の
    // 数値で問題なく表示できるため、ここで早期に区別する（現状データを主語に
    // 「売上高を入れてください」を誤表示しないためのガード）。
    var hasTarget = benchOrTarget && (isFiniteNum(benchOrTarget.W) || isFiniteNum(benchOrTarget.hourlyWage));
    var hasBench = benchOrTarget && isFiniteNum(benchOrTarget.atmark);
    if (idealMode === 'target' && !hasTarget) {
      return { branch: 'noTarget', current: current, wageAssumption: wageAssumption, mode: idealMode };
    }
    if (idealMode === 'benchmark' && !hasBench) {
      return { branch: 'noBenchmark', current: current, wageAssumption: wageAssumption, mode: idealMode };
    }

    var ideal;
    if (idealMode === 'target') {
      ideal = AtmarkCalc.computeIdealByTarget(inputs, benchOrTarget || {}, wageAssumption);
    } else {
      ideal = AtmarkCalc.computeIdealByBenchmark(inputs, benchOrTarget, wageAssumption);
    }

    var diff = null;
    var allocation = null;

    if (ideal.branch === 'normal') {
      var currentGeneric = {
        atmark: current.A0, grossProfit: current.G, officerComp: current.R,
        hourlyWage: current.W0, requiredSales: current.S,
      };
      var idealGeneric;
      var gForAlloc;
      if (idealMode === 'target') {
        idealGeneric = { atmark: ideal.A2, grossProfit: ideal.G2, officerComp: ideal.W, hourlyWage: ideal.W2, requiredSales: ideal.S2 };
        gForAlloc = ideal.G2;
      } else {
        idealGeneric = { atmark: ideal.A1, grossProfit: ideal.G1, officerComp: ideal.R1, hourlyWage: ideal.W1, requiredSales: ideal.S1 };
        gForAlloc = ideal.G1;
      }
      diff = AtmarkCalc.computeDiff(currentGeneric, idealGeneric);
      allocation = AtmarkCalc.computeAllocation(gForAlloc);
    } else if (ideal.branch === 'stageOnly' && idealMode === 'benchmark') {
      // stageOnly（ベンチマーク型）：＠・粗利・必要売上の差額は出す。役員報酬・時給は出さない
      var currentGeneric2 = { atmark: current.A0, grossProfit: current.G, requiredSales: current.S };
      var idealGeneric2 = { atmark: ideal.A1, grossProfit: ideal.G1, requiredSales: ideal.S1 };
      diff = AtmarkCalc.computeDiff(currentGeneric2, idealGeneric2);
      if (isFiniteNum(ideal.G1)) allocation = AtmarkCalc.computeAllocation(ideal.G1);
    }

    return {
      branch: ideal.branch, current: current, wageAssumption: wageAssumption,
      ideal: ideal, diff: diff, allocation: allocation, mode: idealMode,
    };
  }

  /* ============================================================
     出典ボトムシート
     ============================================================ */
  function openSourceSheet(sourceId, confidence, computeFormula, mode) {
    var overlay = document.getElementById('source-sheet-overlay');
    var body = document.getElementById('source-sheet-body');
    if (!overlay || !body) return;
    var src = findSource(sourceId);
    var lines = [];
    if (src) {
      var label = confidence === 'estimated'
        ? tpl(t('common.sourceChip.estimated', mode), { sourceName: src.name, sourceYear: src.surveyYear })
        : tpl(t('common.sourceChip.confirmed', mode), { sourceName: src.name, sourceYear: src.surveyYear });
      lines.push('<p>' + esc(label) + '</p>');
      lines.push('<p style="margin-top:8px;color:var(--color-text-muted)">' + esc(t('common.sourceChip.publisherLabel', mode)) + esc(src.publisher) + '</p>');
    }
    if (computeFormula) {
      lines.push('<p style="margin-top:8px;">' + esc(tpl(t('common.sourceChip.formula', mode), { computeFormula: computeFormula })) + '</p>');
    }
    if (confidence === 'estimated') {
      lines.push('<p style="margin-top:10px;"><span class="badge badge--gold">' + esc(t('common.estimatedBadge', mode)) + '</span></p>');
    }
    body.innerHTML = lines.join('');
    overlay.classList.add('is-open');
  }
  function closeSourceSheet() {
    var overlay = document.getElementById('source-sheet-overlay');
    if (overlay) overlay.classList.remove('is-open');
  }
  on(document.getElementById('source-sheet-close'), 'click', closeSourceSheet);
  on(document.getElementById('source-sheet-overlay'), 'click', function (e) {
    if (e.target.id === 'source-sheet-overlay') closeSourceSheet();
  });

  function sourceChipHtml(valueWrapper, mode) {
    if (!valueWrapper || valueWrapper.confidence === 'unavailable') return '';
    return '<button type="button" class="source-chip" data-action="source-open" ' +
      'data-source-id="' + esc(valueWrapper.sourceId || '') + '" ' +
      'data-source-conf="' + esc(valueWrapper.confidence || '') + '" ' +
      'data-source-formula="' + esc(valueWrapper.computeFormula || '') + '">' +
      esc(t('common.sourceChip.label', mode)) + '</button>';
  }

  /* ============================================================
     4:2:2:2 横バー（div）
     ============================================================ */
  function allocationBarHtml(allocation, current, mode) {
    if (!allocation) return '';
    var jinken = allocation.jinken, kotei = allocation.kotei, mirai = allocation.mirai, rieki = allocation.rieki;
    var total = (jinken || 0) + (kotei || 0) + (mirai || 0) + (rieki || 0);
    var pct = function (v) { return total > 0 ? (v / total) * 100 : 0; };
    var rho0 = current && isFiniteNum(current.rho0) ? Math.min(Math.max(current.rho0, 0), 100) : null;

    var legend = '<div class="alloc-legend">' +
      '<span class="alloc-legend__item"><span class="alloc-legend__dot" style="background:var(--color-labor)"></span>' + esc(t('self.stage3.labelLabor', mode)) + '</span>' +
      '<span class="alloc-legend__item"><span class="alloc-legend__dot" style="background:var(--color-fixed)"></span>' + esc(t('self.stage3.labelFixed', mode)) + '</span>' +
      '<span class="alloc-legend__item"><span class="alloc-legend__dot" style="background:var(--color-future)"></span>' + esc(t('self.stage3.labelFuture', mode)) + '</span>' +
      '<span class="alloc-legend__item"><span class="alloc-legend__dot" style="background:var(--color-profit)"></span>' + esc(t('self.stage3.labelProfit', mode)) + '</span>' +
      '</div>';

    var bar = '<div class="alloc-bar-label">' + esc(t('common.allocationBarLabel', mode)) + '</div>' +
      '<div class="alloc-bar">' +
      '<div class="alloc-bar__seg alloc-bar__seg--labor" style="width:' + pct(jinken) + '%">40%</div>' +
      '<div class="alloc-bar__seg alloc-bar__seg--fixed" style="width:' + pct(kotei) + '%">20%</div>' +
      '<div class="alloc-bar__seg alloc-bar__seg--future" style="width:' + pct(mirai) + '%">20%</div>' +
      '<div class="alloc-bar__seg alloc-bar__seg--profit" style="width:' + pct(rieki) + '%">20%</div>' +
      '</div>';

    var currentBar = '';
    if (rho0 !== null) {
      currentBar = '<div class="alloc-bar-label">' + esc(tpl(t('common.allocationCurrentLabel', mode), { rho0: fmtPct1(rho0) })) + '</div>' +
        '<div class="alloc-bar-current">' +
        '<div class="alloc-bar-current__labor" style="width:' + rho0 + '%"></div>' +
        '<div class="alloc-bar-current__rest" style="width:' + (100 - rho0) + '%"></div>' +
        '</div>';
    }

    var detail = '<div class="alloc-detail">' +
      '<div class="alloc-detail__item"><div class="alloc-detail__name">' + esc(t('self.stage3.labelLabor', mode).split('｜')[0]) + '</div><div class="alloc-detail__amount">' + esc(AtmarkCalc.fmtManyen(jinken)) + '</div></div>' +
      '<div class="alloc-detail__item"><div class="alloc-detail__name">' + esc(t('self.stage3.labelFixed', mode).split('｜')[0]) + '</div><div class="alloc-detail__amount">' + esc(AtmarkCalc.fmtManyen(kotei)) + '</div></div>' +
      '<div class="alloc-detail__item"><div class="alloc-detail__name">' + esc(t('self.stage3.labelFuture', mode).split('｜')[0]) + '</div><div class="alloc-detail__amount">' + esc(AtmarkCalc.fmtManyen(mirai)) + '</div></div>' +
      '<div class="alloc-detail__item"><div class="alloc-detail__name">' + esc(t('self.stage3.labelProfit', mode).split('｜')[0]) + '</div><div class="alloc-detail__amount">' + esc(AtmarkCalc.fmtManyen(rieki)) + '</div></div>' +
      '</div>';

    return legend + bar + currentBar + detail;
  }

  /* ============================================================
     ガード分岐メッセージ
     ============================================================ */
  function guardBoxHtml(branch, mode, ctx, hideButton) {
    var key = 'guard.' + branch;
    var msg = t(key, mode);
    if (branch === 'laborShareHigh') {
      msg = tpl(msg, {
        rho0: fmtPct1(ctx.current.rho0),
        atmarkBe: fmtNum(ctx.current.atmarkBreakeven),
        fortyN: fmtNum(40 * ctx.current.N),
      });
    }
    var btnLabel = t(key + '.button', mode);
    var actionMap = {
      alreadyAbove: 'guard-suggest', belowKeep: 'guard-suggest', laborShareHigh: 'guard-suggest',
      targetBelowCurrent: 'guard-reinput', reachableNow: 'guard-view-allocation', stageOnly: 'guard-focus-e',
    };
    var action = hideButton ? '' : (actionMap[branch] || '');
    return '<div class="guard-box"><p class="guard-box__text">' + esc(msg) + '</p>' +
      (action ? '<button type="button" class="btn btn--ghost btn--sm" data-action="' + action + '">' + esc(btnLabel) + '</button>' : '') +
      '</div>';
  }

  /* ============================================================
     共通：社員給与の前提1行
     ============================================================ */
  function wageAssumptionLineHtml(wageAssumption, mode) {
    if (!wageAssumption) return '';
    var key = 'common.wageAssumption.' + wageAssumption.source;
    var txt = tpl(t(key, mode), { E: fmtNum(wageAssumption.E) });
    var badge = wageAssumption.confidence === 'estimated' ? ' <span class="badge badge--gold">' + esc(t('common.estimatedBadge', mode)) + '</span>' : '';
    return '<p class="hint-row">' + esc(txt) + badge + '</p>';
  }

  function weeklyHoursAssumedHtml(current, mode) {
    if (!current || !current.assumed || !current.assumed.H) return '';
    return '<p class="hint-row"><span class="badge">' + esc(t('common.weeklyHoursAssumedBadge', mode)) + '</span> ' + esc(t('common.weeklyHoursAssumed', mode)) + '</p>';
  }

  /* ================================================================================
     ============================  事前診断モード（self）  ==========================
     ================================================================================ */

  var SELF_LS_KEY = 'atmark_v1_self_state';
  var SELF_STAGE_ORDER = ['0', '1', '2a', '2b', '3', '4'];
  var SELF_Q_ORDER = ['q1', 'q6', 'q2', 'q3', 'q4', 'q5', 'q7'];
  // 補足：I1〜I7の順番から Q6（業種/都道府県）をQ2（粗利率）より前に出す。
  // 理由：Q2の「分からない→業界平均で進む」を機能させるには業種が先に必要（ルイ判断／納品報告に明記）。

  function defaultSelfState() {
    return {
      inputs: { S: null, g: null, C: null, N: null, R: null, H: null, E: null, ind: '', pref: '' },
      qIndex: 0,
      phase: 'intro', // intro | question | result
      stageIndex: 0,
      idealMode: 'target', // self既定：まず「あなたはいくら欲しいですか」（Stage2a）
      benchmarkId: null,
      target: { W: null, hourlyWage: null },
    };
  }

  var selfState = defaultSelfState();

  function persistSelf() { lsSet(SELF_LS_KEY, selfState); }

  /* ---------- intro ---------- */
  function renderSelfIntro() {
    qs('#self-intro-title').textContent = t('self.intro.title');
    qs('#self-intro-whatyouget').textContent = t('self.intro.whatYouGet');
    var durationEl = document.createElement('div');
    durationEl.className = 'self-intro__block';
    var container = qs('#self-intro-duration');
    container.textContent = t('self.intro.duration');
    qs('#self-intro-privacy').textContent = t('self.intro.privacyNote');
    qs('#btn-self-start').textContent = t('self.intro.startButton');

    var saved = lsGet(SELF_LS_KEY);
    var freshParam = getQueryParams().fresh === '1';
    var returningWrap = qs('#self-returning');
    if (saved && !freshParam && saved.phase && saved.phase !== 'intro') {
      returningWrap.style.display = 'flex';
      qs('#btn-returning-continue').textContent = t('state.returningContinue');
      qs('#btn-returning-restart').textContent = t('state.returningRestart');
    } else {
      returningWrap.style.display = 'none';
      if (freshParam) lsRemove(SELF_LS_KEY);
    }
  }

  function showSelfPhase(phase, skipPersist) {
    selfState.phase = phase;
    qs('#self-intro').style.display = phase === 'intro' ? 'block' : 'none';
    qs('#self-question').style.display = phase === 'question' ? 'block' : 'none';
    qs('#self-result').style.display = phase === 'result' ? 'block' : 'none';
    // skipPersist: 初回起動時（boot()）の intro 表示では保存済み状態を上書きしない。
    // ここで persistSelf() すると、renderSelfIntro() が読んだ「前回の続きから」用の
    // 保存状態が空のintro状態で即座に上書きされ、続きボタンが機能しなくなるため。
    if (!skipPersist) persistSelf();
  }

  /* ---------- Q1〜Q7 ---------- */
  function currentQKey() { return SELF_Q_ORDER[selfState.qIndex]; }

  function isQuestionValid(qkey) {
    var i = selfState.inputs;
    switch (qkey) {
      case 'q1': return isFiniteNum(i.S) && i.S > 0;
      case 'q6': return true; // 任意
      case 'q2': {
        if (isFiniteNum(i.C)) return i.C >= 0 && i.C < i.S;
        return isFiniteNum(i.g) && i.g > 0 && i.g <= 100;
      }
      case 'q3': return isFiniteNum(i.N) && i.N >= 1;
      case 'q4': return isFiniteNum(i.R) && i.R >= 0;
      case 'q5': return true; // 任意（未入力は60仮置き）
      case 'q7': return true; // 任意
      default: return false;
    }
  }

  function renderQuestion() {
    var qkey = currentQKey();
    var total = SELF_Q_ORDER.length;
    qs('#q-progress-label').textContent = t('self.' + qkey + '.text');
    qs('#q-progress-count').textContent = (selfState.qIndex + 1) + ' / ' + total;
    qs('#q-progress-fill').style.width = (((selfState.qIndex) / total) * 100) + '%';
    qs('#q-text').textContent = t('self.' + qkey + '.text');
    qs('#q-note').textContent = t('self.' + qkey + '.note');

    var body = qs('#q-body');
    var i = selfState.inputs;
    var html = '';

    if (qkey === 'q1') {
      html += fieldInputHtml('field-s', 'number', i.S, t('common.unit.manyen'));
      html += chipRowHtml('s', [1000, 3000, 5000, 10000, 30000], i.S, ATMARK_CONTENT.self.q1.chipLabels);
      html += hintRowHtml();
    } else if (qkey === 'q2') {
      var usingCost = isFiniteNum(i.C);
      html += '<div class="field-group">' +
        '<label class="field-label" for="field-g">' + esc(usingCost ? t('self.q2.costLabel') : t('self.q2.marginLabel')) + '</label>' +
        '<input class="field-input" id="field-g" type="number" step="0.1" data-bind="' + (usingCost ? 'C' : 'g') + '" value="' + (usingCost ? (i.C == null ? '' : i.C) : (i.g == null ? '' : i.g)) + '">' +
        '</div>';
      html += '<button type="button" class="link-btn" data-action="q2-toggle-mode">' + esc(usingCost ? t('self.q2.toggleToPercent') : t('self.q2.toggleToCost')) + '</button><br>';
      html += '<button type="button" class="link-btn" data-action="q2-unknown">' + esc(t('self.q2.unknownButton')) + '</button>';
      if (!i.ind) {
        html += '<div id="q2-inline-industry" class="field-group" style="display:none;margin-top:10px;">' +
          '<label class="field-label">' + esc(t('self.q2.industryFirst')) + '</label>' +
          industrySelectHtml('q2-inline-ind', '') + '</div>';
      }
      html += hintRowHtml();
    } else if (qkey === 'q3') {
      html += '<div class="field-group"><label class="field-label" for="field-n">' + esc(t('self.q3.countLabel')) + '</label>' +
        '<input class="field-input" id="field-n" type="number" step="0.5" min="1" data-bind="N" value="' + (i.N == null ? '' : i.N) + '"></div>' +
        '<span class="help-icon" data-action="q3-help-toggle">' + esc(t('self.q3.helpIcon')) + '</span>' +
        '<p class="help-text" id="q3-help-text">' + esc(t('self.q3.helpText')) + '</p>';
    } else if (qkey === 'q4') {
      html += fieldInputHtml('field-r', 'number', i.R, t('common.unit.manyen'));
      html += chipRowHtml('r', [300, 600, 1000, 1500, 2000], i.R, ['300', '600', '1,000', '1,500', '2,000']);
      html += hintRowHtml();
    } else if (qkey === 'q5') {
      html += '<div class="chip-row">' + [40, 50, 60, 70, 80, 90].map(function (h) {
        return '<button type="button" class="chip' + (i.H === h ? ' is-selected' : '') + '" data-action="q5-pick" data-value="' + h + '">' + esc(tpl(t('self.q5.hoursChip'), { h: h })) + '</button>';
      }).join('') + '<button type="button" class="chip' + (i.H == null ? ' is-selected' : '') + '" data-action="q5-pick" data-value="">' + esc(t('self.q5.noAnswer')) + '</button></div>';
    } else if (qkey === 'q6') {
      html += '<div class="field-group"><label class="field-label">' + esc(t('self.q6.industryLabel')) + '</label>' + industrySelectHtml('field-ind', i.ind) + '</div>';
      html += '<div class="field-group"><label class="field-label">' + esc(t('self.q6.prefLabel')) + '</label>' + prefSelectHtml('field-pref', i.pref) + '</div>';
    } else if (qkey === 'q7') {
      html += fieldInputHtml('field-e', 'number', i.E, t('common.unit.manyen'));
      html += hintRowHtml();
    }

    body.innerHTML = html;
    updateQNextState();

    var prevBtn = qs('#btn-q-prev');
    prevBtn.style.display = selfState.qIndex > 0 ? 'inline-flex' : 'none';
    qs('#btn-q-next').textContent = (selfState.qIndex === total - 1) ? t('common.button.seeResult') : t('common.button.next');
  }

  function fieldInputHtml(id, type, val, unit) {
    var bindKey = id.replace('field-', '');
    var map = { s: 'S', r: 'R', e: 'E' };
    bindKey = map[bindKey] || bindKey;
    return '<div class="field-group"><label class="field-label" for="' + id + '">' + esc(unit) + '</label>' +
      '<input class="field-input" id="' + id + '" type="' + type + '" data-bind="' + bindKey + '" value="' + (val == null ? '' : val) + '"></div>';
  }
  function chipRowHtml(field, values, current, labels) {
    var bindMap = { s: 'S', r: 'R' };
    var bindKey = bindMap[field] || field;
    return '<div class="chip-row">' + values.map(function (v, idx) {
      return '<button type="button" class="chip' + (current === v ? ' is-selected' : '') + '" data-action="chip-pick" data-bind="' + bindKey + '" data-value="' + v + '">' + labels[idx] + '</button>';
    }).join('') + '</div>';
  }
  function hintRowHtml() {
    return '<p class="hint-row">' + esc(t('common.inputHintRough')) + '　' + esc(t('common.inputHintEditable')) + '</p>';
  }
  function industrySelectHtml(id, selected) {
    var opts = '<option value="">' + esc(t('common.notSelected')) + '</option>' + getIndustryList().map(function (x) {
      return '<option value="' + esc(x.code) + '"' + (x.code === selected ? ' selected' : '') + '>' + esc(x.name) + '</option>';
    }).join('');
    return '<select class="field-select" id="' + id + '" data-bind="ind">' + opts + '</select>';
  }
  function prefSelectHtml(id, selected) {
    var opts = '<option value="">' + esc(t('common.notSelected')) + '</option>' + getPrefList().map(function (p) {
      return '<option value="' + esc(p) + '"' + (p === selected ? ' selected' : '') + '>' + esc(p) + '</option>';
    }).join('');
    return '<select class="field-select" id="' + id + '" data-bind="pref">' + opts + '</select>';
  }

  function updateQNextState() {
    var valid = isQuestionValid(currentQKey());
    qs('#btn-q-next').disabled = !valid;
  }

  function goQuestion(step) {
    selfState.qIndex = Math.max(0, Math.min(SELF_Q_ORDER.length - 1, selfState.qIndex + step));
    renderQuestion();
    persistSelf();
  }

  function finishQuestions() {
    selfState.stageIndex = 0;
    showSelfPhase('result');
    renderSelfStages();
  }

  /* ---------- Stage0〜4 ---------- */
  function selfComputation() {
    var benchOrTarget;
    if (selfState.idealMode === 'target') {
      benchOrTarget = selfState.target;
    } else {
      var benches = buildBenches(selfState.inputs.ind ? findIndustry(selfState.inputs.ind) : null);
      var chosen = null;
      for (var k = 0; k < benches.length; k++) if (benches[k].id === selfState.benchmarkId) chosen = benches[k];
      benchOrTarget = chosen ? { atmark: chosen.atmark, id: chosen.id, label: chosen.label } : null;
    }
    return computeAll(selfState.inputs, selfState.idealMode, benchOrTarget);
  }

  function renderSelfStages() {
    var ctx = selfComputation();
    var mode = 'self';

    if (ctx.current.branch !== 'ok') {
      var invalidKey = ctx.current.branch === 'invalidMargin' ? 'marginInvalid' : inferInvalidInputKey(selfState.inputs);
      qs('#self-stage0').innerHTML = '<p class="guard-box__text">' + esc(t('validation.' + invalidKey)) + '</p>';
      qs('#self-stage0').style.display = 'block';
      ['#self-stage1', '#self-stage2a', '#self-stage2b', '#self-stage3', '#self-stage4'].forEach(function (s) { qs(s).style.display = 'none'; });
      return;
    }

    var current = ctx.current;

    // Stage0
    var s0 = qs('#self-stage0');
    s0.innerHTML = '<div class="stage-heading">' + esc(t('self.stage0.heading')) + '</div>' +
      '<div class="big-number">' + fmtNum(current.A0) + '<span class="big-number__unit">' + esc(t('common.unit.manyen')) + '</span></div>' +
      '<p class="stage-subtext">' + esc(tpl(t('self.stage0.subtext'), { A0: fmtNum(current.A0) })) + '</p>' +
      '<div class="q-nav"><button type="button" class="btn btn--primary" data-action="self-stage-to1">' + esc(t('common.button.next')) + '</button></div>';
    s0.style.display = 'block';

    if (selfState.stageIndex < 1) { hideFrom(['#self-stage1', '#self-stage2a', '#self-stage2b', '#self-stage3', '#self-stage4']); return; }

    // Stage1
    var s1 = qs('#self-stage1');
    var w0html = current.W0 == null
      ? '<div class="big-number">—</div><p class="stage-subtext">' + esc(t('self.stage1.zeroCompNote')) + '</p>'
      : '<div class="big-number">' + fmtNum(current.W0) + '<span class="big-number__unit">' + esc(t('common.unit.yenPerHour')) + '</span></div>';
    s1.innerHTML = '<div class="stage-heading">' + esc(t('self.stage1.heading')) + '</div>' +
      w0html + '<p class="stage-subtext">' + esc(t('self.stage1.subtext')) + '</p>' +
      weeklyHoursAssumedHtml(current, mode) +
      '<div class="q-nav"><button type="button" class="btn btn--primary" data-action="self-stage-to2">' + esc(t('common.button.next')) + '</button></div>';
    s1.style.display = selfState.stageIndex >= 1 ? 'block' : 'none';

    if (selfState.stageIndex < 2) { hideFrom(['#self-stage2a', '#self-stage2b', '#self-stage3', '#self-stage4']); return; }

    // Stage2a
    var s2a = qs('#self-stage2a');
    var incomeVal = selfState.target.W;
    var hourlyVal = selfState.target.hourlyWage;
    s2a.innerHTML = '<div class="stage-heading">' + esc(t('self.stage2a.heading')) + '</div>' +
      '<p class="stage-subtext">' + esc(t('self.stage2a.subtext')) + '</p>' +
      '<div class="field-group"><label class="field-label">' + esc(t('self.stage2a.inputLabelIncome')) + '</label>' +
      '<input class="field-input" type="number" data-bind-target="W" value="' + (incomeVal == null ? '' : incomeVal) + '"></div>' +
      '<div class="field-group"><label class="field-label">' + esc(t('self.stage2a.inputLabelHourly')) + '</label>' +
      '<input class="field-input" type="number" data-bind-target="hourlyWage" value="' + (hourlyVal == null ? '' : hourlyVal) + '"></div>' +
      '<div class="q-nav">' +
      '<button type="button" class="btn btn--ghost btn--sm" data-action="stage2a-skip">' + esc(t('self.stage2a.skipButton')) + '</button>' +
      '<button type="button" class="btn btn--primary" data-action="stage2a-use-target">' + esc(t('self.stage2a.useTargetButton')) + '</button>' +
      '</div>';
    s2a.style.display = selfState.stageIndex >= 2 ? 'block' : 'none';

    if (selfState.stageIndex < 2) { hideFrom(['#self-stage2b', '#self-stage3', '#self-stage4']); return; }

    // Stage2b（参考ベンチマーク）
    var s2b = qs('#self-stage2b');
    var benches = buildBenches(selfState.inputs.ind ? findIndustry(selfState.inputs.ind) : null);
    var threshold = current ? Math.max(current.A0, isFiniteNum(current.atmarkKeep) ? current.atmarkKeep : current.A0) : null;
    var benchCards = benches.map(function (b) {
      var guarded = threshold != null && !(b.atmark > threshold);
      var desc = b.kind === 'industry'
        ? tpl(t('self.stage2b.benchmarkIndustry'), { industryName: b.industryName })
        : t('self.stage2b.benchmarkStage' + b.stageNumber);
      var active = selfState.idealMode === 'benchmark' && selfState.benchmarkId === b.id;
      return '<button type="button" class="bench-card' + (guarded ? ' is-guarded' : '') + (active ? ' is-active' : '') + '" data-action="bench-select" data-bench-id="' + esc(b.id) + '">' +
        '<span class="bench-card__body"><span class="bench-card__label">' + esc(b.label) + '</span>' +
        '<span class="bench-card__desc">' + esc(desc) + '</span></span>' +
        '<span class="bench-card__value">' + fmtNum(b.atmark) + esc(t('common.unit.manyen')) + ' ' + sourceChipHtml(b, mode) + '</span>' +
        '</button>';
    }).join('');
    s2b.innerHTML = '<div class="stage-heading">' + esc(t('self.stage2b.heading')) + '</div>' +
      '<p class="stage-subtext">' + esc(t('self.stage2b.subtext')) + '</p>' +
      '<div class="bench-list">' + benchCards + '</div>' +
      '<div class="q-nav"><button type="button" class="btn btn--primary" data-action="self-stage-to3">' + esc(t('common.button.next')) + '</button></div>';
    s2b.style.display = selfState.stageIndex >= 2 ? 'block' : 'none';

    if (selfState.stageIndex < 3) { hideFrom(['#self-stage3', '#self-stage4']); return; }

    // Stage3
    var s3 = qs('#self-stage3');
    var s3html = '<div class="stage-heading">' + esc(t('self.stage3.heading')) + '</div>';
    // laborShareHighとbelowKeepが同時に立つと同文言のボタンが2つ並ぶため、belowKeep側にのみボタンを残す（fix2 item5）
    if (current.laborShareHigh) s3html += guardBoxHtml('laborShareHigh', mode, ctx, ctx.branch === 'belowKeep').replace('guard-box', 'labor-share-box');
    if (ctx.branch === 'alreadyAbove' || ctx.branch === 'belowKeep' || ctx.branch === 'targetBelowCurrent' || ctx.branch === 'reachableNow' || ctx.branch === 'stageOnly') {
      s3html += guardBoxHtml(ctx.branch, mode, ctx);
    }
    if (ctx.branch === 'noTarget' || ctx.branch === 'noBenchmark') {
      s3html += '<p class="guard-box__text">' + esc(ctx.branch === 'noTarget'
        ? t('self.stage3.guardNoTarget')
        : t('self.stage3.guardNoBenchmark')) + '</p>';
    }
    if (ctx.allocation) {
      s3html += allocationBarHtml(ctx.allocation, current, mode);
      if (ctx.branch === 'normal') {
        var R1orW = selfState.idealMode === 'target' ? ctx.ideal.W : ctx.ideal.R1;
        var W1orW2 = selfState.idealMode === 'target' ? ctx.ideal.W2 : ctx.ideal.W1;
        s3html += '<p class="stage-subtext">' + esc(tpl(t('self.stage3.idealComp'), { R1: fmtNum(R1orW) })) + '</p>';
        s3html += '<p class="stage-subtext">' + esc(tpl(t('self.stage3.idealHourly'), { W1: fmtNum(W1orW2) })) + '</p>';
      }
    }
    s3html += wageAssumptionLineHtml(ctx.wageAssumption, mode);
    if (ctx.branch === 'normal' || (ctx.branch === 'stageOnly' && ctx.diff)) {
      s3html += '<div class="q-nav"><button type="button" class="btn btn--primary" data-action="self-stage-to4">' + esc(t('self.stage3.nextButton')) + '</button></div>';
    }
    s3.innerHTML = s3html;
    s3.style.display = selfState.stageIndex >= 3 ? 'block' : 'none';

    if (selfState.stageIndex < 4) { hideFrom(['#self-stage4']); return; }

    // Stage4
    var s4 = qs('#self-stage4');
    var s4html = '<div class="stage-heading">' + esc(t('self.stage4.heading')) + '</div>';
    if (ctx.diff) {
      var rows = [];
      if (isFiniteNum(ctx.diff.atmark)) rows.push(diffRow(t('self.stage4.diffAtmark'), 'diffA', ctx.diff.atmark, false));
      if (isFiniteNum(ctx.diff.grossProfit)) rows.push(diffRow(t('self.stage4.diffGrossProfit'), 'diffG', ctx.diff.grossProfit, false));
      if (isFiniteNum(ctx.diff.officerComp)) rows.push(diffRow(t('self.stage4.diffComp'), 'diffR', ctx.diff.officerComp, false));
      if (isFiniteNum(ctx.diff.hourlyWage)) rows.push(diffRow(t('self.stage4.diffHourly'), 'diffW', ctx.diff.hourlyWage, true));
      if (isFiniteNum(ctx.diff.requiredSales)) rows.push(diffRow(t('self.stage4.diffSales'), 'diffS', ctx.diff.requiredSales, false));
      s4html += '<div class="diff-list">' + rows.join('') + '</div>';
      if (isFiniteNum(ctx.diff.atmark)) {
        s4html += '<p class="stage-subtext">' + esc(tpl(t('self.stage4.diffLead'), { diffA: fmtSigned(ctx.diff.atmark) })) + '</p>';
      }
      var reqSales = selfState.idealMode === 'target' ? ctx.ideal.S2 : ctx.ideal.S1;
      if (isFiniteNum(reqSales)) s4html += '<p class="stage-subtext">' + esc(tpl(t('self.stage4.requiredSales'), { S1: fmtNum(reqSales) })) + '</p>';
      // 棚原確定：参考「必要売上の増加率」は表示しない（content.jsのキーcommon.salesGrowthNoteは残すが描画しない）
      if (ctx.branch === 'normal') {
        var w1 = selfState.idealMode === 'target' ? ctx.ideal.W2 : ctx.ideal.W1;
        s4html += '<p class="stage-subtext">' + esc(tpl(t('self.stage4.nextStep'), { diffA: fmtSigned(ctx.diff.atmark), W1: fmtNum(w1) })) + '</p>';
      }
    }

    s4html += '<div class="cta-box">' +
      '<div class="cta-box__heading">' + esc(t('self.stage4.ctaHeading')) + '</div>' +
      '<div class="cta-box__text">' + esc(t('self.stage4.ctaText')) + '</div>' +
      '<button type="button" class="btn btn--cta" data-action="self-cta">' + esc(t('self.stage4.ctaButton')) + '</button>' +
      '</div>';

    s4html += '<div class="copy-link-box">' +
      '<p>' + esc(t('self.stage4.copyLink')) + '</p>' +
      '<button type="button" class="btn btn--primary" data-action="copy-link">' + esc(t('self.stage4.copyLinkButton')) + '</button>' +
      '<span class="copy-link-toast" id="copy-link-toast" style="display:none;">' + esc(t('self.stage4.copyLinkDone')) + '</span>' +
      '<p class="copy-link-box__note">' + esc(t('self.stage4.copyLinkSendNote')) + '</p>' +
      '</div>';

    s4html += sourcesListHtml(mode);

    s4.innerHTML = s4html;
    s4.style.display = 'block';
  }

  function diffRow(label, key, v, isHourly) {
    var cls = v > 0 ? 'diff-value--pos' : (v < 0 ? 'diff-value--neg' : '');
    var valStr = isHourly ? fmtSigned(v) + t('common.unit.yen') : fmtSigned(v) + t('common.unit.manyen');
    return '<div class="diff-row"><span class="diff-row__label">' + esc(label.replace(/\s*[\d{{].*/, '')) + '</span>' +
      '<span class="diff-value ' + cls + '">' + valStr + '</span></div>';
  }

  function sourcesListHtml(mode) {
    if (!DATA.sources || !DATA.sources.length) return '';
    var items = DATA.sources.map(function (s) {
      return '<li>' + esc(s.name) + '（' + esc(s.publisher) + '・' + esc(String(s.surveyYear)) + '）</li>';
    }).join('');
    return '<ul class="sources-list">' + items + '</ul>';
  }

  function hideFrom(ids) { ids.forEach(function (id) { var el = qs(id); if (el) el.style.display = 'none'; }); }

  /* ---------- self イベント処理 ---------- */
  document.addEventListener('input', function (e) {
    var t2 = e.target;
    if (currentMode !== 'self') return;

    var bind = t2.getAttribute('data-bind');
    if (bind && qs('#self-question').style.display !== 'none') {
      var val = t2.type === 'number' ? (t2.value === '' ? null : parseFloat(t2.value)) : t2.value;
      selfState.inputs[bind] = val;
      if (bind === 'g') selfState.inputs.C = null;
      if (bind === 'C') selfState.inputs.g = null;
      updateQNextState();
      persistSelf();
    }
    var bindTarget = t2.getAttribute('data-bind-target');
    if (bindTarget) {
      var v2 = t2.value === '' ? null : parseFloat(t2.value);
      selfState.target[bindTarget] = v2;
      if (bindTarget === 'W') selfState.target.hourlyWage = null;
      if (bindTarget === 'hourlyWage') selfState.target.W = null;
      persistSelf();
    }
  });
  document.addEventListener('change', function (e) {
    if (currentMode !== 'self') return;
    var t2 = e.target;
    if (t2.id === 'field-ind') { selfState.inputs.ind = t2.value; renderQuestion(); persistSelf(); }
    if (t2.id === 'field-pref') { selfState.inputs.pref = t2.value; persistSelf(); }
    if (t2.id === 'q2-inline-ind') {
      var entry = findIndustry(t2.value);
      selfState.inputs.ind = t2.value;
      if (entry && entry.arari.grossMarginRate && isFiniteNum(entry.arari.grossMarginRate.value)) {
        selfState.inputs.g = entry.arari.grossMarginRate.value;
        selfState.inputs.C = null;
      }
      renderQuestion();
      persistSelf();
    }
  });

  document.addEventListener('click', function (e) {
    if (currentMode !== 'self') return;
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var action = el.getAttribute('data-action');

    if (action === 'self-start') { showSelfPhase('question'); renderQuestion(); }
    if (action === 'self-returning-continue') {
      var saved = lsGet(SELF_LS_KEY);
      if (saved) {
        selfState = saved;
        if (selfState.phase === 'question') { showSelfPhase('question'); renderQuestion(); }
        else if (selfState.phase === 'result') { showSelfPhase('result'); renderSelfStages(); }
        else { showSelfPhase('intro'); renderSelfIntro(); }
      }
    }
    if (action === 'self-returning-restart') {
      lsRemove(SELF_LS_KEY);
      selfState = defaultSelfState();
      showSelfPhase('question');
      renderQuestion();
    }

    if (action === 'chip-pick') {
      var bind = el.getAttribute('data-bind');
      selfState.inputs[bind] = parseFloat(el.getAttribute('data-value'));
      renderQuestion(); persistSelf();
    }
    if (action === 'q2-toggle-mode') {
      if (isFiniteNum(selfState.inputs.C)) { selfState.inputs.C = null; } else { selfState.inputs.g = null; selfState.inputs.C = 0; }
      renderQuestion();
    }
    if (action === 'q2-unknown') {
      var entry = selfState.inputs.ind ? findIndustry(selfState.inputs.ind) : null;
      if (entry && entry.arari.grossMarginRate && isFiniteNum(entry.arari.grossMarginRate.value)) {
        selfState.inputs.g = entry.arari.grossMarginRate.value;
        selfState.inputs.C = null;
        renderQuestion(); persistSelf();
      } else {
        var inline = qs('#q2-inline-industry');
        if (inline) inline.style.display = 'block';
      }
    }
    if (action === 'q3-help-toggle') { qs('#q3-help-text').classList.toggle('is-open'); }
    if (action === 'q5-pick') {
      var v = el.getAttribute('data-value');
      selfState.inputs.H = v === '' ? null : parseFloat(v);
      renderQuestion(); persistSelf();
    }

    if (action === 'self-stage-to1') { selfState.stageIndex = Math.max(selfState.stageIndex, 1); renderSelfStages(); persistSelf(); flashNewStage('self-stage1'); }
    if (action === 'self-stage-to2') { selfState.stageIndex = Math.max(selfState.stageIndex, 2); renderSelfStages(); persistSelf(); flashNewStage('self-stage2a'); }
    if (action === 'stage2a-skip') { selfState.idealMode = 'benchmark'; selfState.stageIndex = Math.max(selfState.stageIndex, 2); renderSelfStages(); persistSelf(); flashNewStage('self-stage2b'); }
    if (action === 'stage2a-use-target') {
      if (!isFiniteNum(selfState.target.W) && !isFiniteNum(selfState.target.hourlyWage)) return;
      selfState.idealMode = 'target';
      selfState.stageIndex = Math.max(selfState.stageIndex, 2);
      renderSelfStages(); persistSelf();
    }
    if (action === 'bench-select') {
      selfState.idealMode = 'benchmark';
      selfState.benchmarkId = el.getAttribute('data-bench-id');
      renderSelfStages(); persistSelf();
    }
    if (action === 'self-stage-to3') { selfState.stageIndex = Math.max(selfState.stageIndex, 3); renderSelfStages(); persistSelf(); flashNewStage('self-stage3'); }
    if (action === 'self-stage-to4') { selfState.stageIndex = Math.max(selfState.stageIndex, 4); renderSelfStages(); persistSelf(); flashNewStage('self-stage4'); }

    if (action === 'guard-suggest') {
      var ctx = selfComputation();
      var benches = buildBenches(selfState.inputs.ind ? findIndustry(selfState.inputs.ind) : null);
      var sug = AtmarkCalc.suggestBenchmark(ctx.current, benches);
      if (sug) { selfState.idealMode = 'benchmark'; selfState.benchmarkId = sug.id; renderSelfStages(); persistSelf(); }
    }
    if (action === 'guard-reinput') { selfState.stageIndex = 2; renderSelfStages(); }
    if (action === 'guard-view-allocation') { selfState.stageIndex = 3; renderSelfStages(); }
    if (action === 'guard-focus-e') {
      var q7idx = SELF_Q_ORDER.indexOf('q7');
      selfState.qIndex = q7idx;
      showSelfPhase('question');
      renderQuestion();
    }

    if (action === 'source-open') {
      openSourceSheet(el.getAttribute('data-source-id'), el.getAttribute('data-source-conf'), el.getAttribute('data-source-formula'), 'self');
    }

    if (action === 'copy-link') { doCopyLink(); }
    if (action === 'self-cta') { /* 個別相談導線：外部送信なし。リンクコピーで案内 */ doCopyLink(); }
  });

  on(qs('#btn-q-next'), 'click', function () {
    if (selfState.qIndex === SELF_Q_ORDER.length - 1) { finishQuestions(); return; }
    goQuestion(1);
  });
  on(qs('#btn-q-prev'), 'click', function () { goQuestion(-1); });

  function flashNewStage(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('js-just-appeared');
    void el.offsetWidth;
    el.classList.add('js-just-appeared');
  }

  function doCopyLink() {
    var hash = '#s=' + AtmarkCalc.encodeState(selfState.inputs);
    var url = location.origin + location.pathname + hash;
    var toast = qs('#copy-link-toast');
    function showToast() { if (toast) { toast.style.display = 'inline-block'; setTimeout(function () { toast.style.display = 'none'; }, 2500); } }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(showToast, function () { fallbackCopy(url); showToast(); });
    } else {
      fallbackCopy(url); showToast();
    }
  }
  function fallbackCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
    } catch (e) { /* 無視 */ }
  }

  /* ================================================================================
     ============================  実演モード（demo）  ==============================
     ================================================================================ */

  var DEMO_LS_KEY = 'atmark_v1_demo_state';
  var DEMO_STAGES = [0, 1, 2, 3, 4];

  function defaultDemoState() {
    return {
      inputs: { S: 5000, g: 40, C: null, N: 3, R: 600, H: 60, E: null, ind: '', pref: '' },
      idealMode: 'benchmark',
      benchmarkId: 'stage1',
      target: { W: null, hourlyWage: null },
      stage: 0,
      lastField: 'S',
    };
  }
  var demoState = defaultDemoState();
  function persistDemo() { lsSet(DEMO_LS_KEY, demoState); }

  var demoFieldConfig = {
    S: { min: 100, max: 50000, step: 100 },
    g: { min: 1, max: 100, step: 1 },
    N: { min: 1, max: 50, step: 0.5 },
    R: { min: 0, max: 5000, step: 10 },
    H: { min: 1, max: 100, step: 1 },
  };
  var demoRefs = {};

  function buildDemoInputBar() {
    var bar = qs('#demo-inputbar');
    var html = '';
    ['S', 'g', 'N', 'R', 'H'].forEach(function (f) {
      var cfg = demoFieldConfig[f];
      html += '<div class="demo-inputbar__item">' +
        '<label class="demo-inputbar__label">' + esc(t('demo.inputLabels.' + { S: 'sales', g: 'margin', N: 'count', R: 'comp', H: 'hours' }[f])) + '</label>' +
        '<div class="demo-inputbar__row">' +
        '<input type="number" class="demo-inputbar__number" id="demo-num-' + f + '" min="' + cfg.min + '" max="' + cfg.max + '" step="' + cfg.step + '">' +
        '</div>' +
        '<input type="range" class="demo-inputbar__slider" id="demo-slider-' + f + '" min="' + cfg.min + '" max="' + cfg.max + '" step="' + cfg.step + '">' +
        '</div>';
    });
    html += '<div class="demo-inputbar__item"><label class="demo-inputbar__label">' + esc(t('demo.inputLabels.industry')) + '</label>' + industrySelectHtml('demo-select-ind', demoState.inputs.ind) + '</div>';
    html += '<div class="demo-inputbar__item"><label class="demo-inputbar__label">' + esc(t('demo.inputLabels.pref')) + '</label>' + prefSelectHtml('demo-select-pref', demoState.inputs.pref) + '</div>';
    bar.innerHTML = html;

    ['S', 'g', 'N', 'R', 'H'].forEach(function (f) {
      demoRefs[f + 'num'] = qs('#demo-num-' + f);
      demoRefs[f + 'slider'] = qs('#demo-slider-' + f);
      on(demoRefs[f + 'num'], 'input', function () { onDemoFieldChange(f, this.value === '' ? null : parseFloat(this.value)); });
      on(demoRefs[f + 'slider'], 'input', function () { onDemoFieldChange(f, parseFloat(this.value)); });
      on(demoRefs[f + 'num'], 'focus', function () { demoState.lastField = f; });
      on(demoRefs[f + 'slider'], 'focus', function () { demoState.lastField = f; });
    });
    on(qs('#demo-select-ind'), 'change', function () { demoState.inputs.ind = this.value; persistDemo(); renderDemoAll(); });
    on(qs('#demo-select-pref'), 'change', function () { demoState.inputs.pref = this.value; persistDemo(); renderDemoAll(); });

    var dotsWrap = qs('#demo-stage-dots');
    dotsWrap.innerHTML = DEMO_STAGES.map(function (i) {
      return '<button type="button" class="demo-stage-dot" data-action="demo-goto-stage" data-stage="' + i + '" role="tab">' + i + '</button>';
    }).join('');

    var toggleWrap = qs('#demo-mode-toggle');
    toggleWrap.innerHTML =
      '<button type="button" class="btn btn--ghost btn--sm" data-action="demo-toggle-mode" data-mode="benchmark">' + esc(t('demo.modeToggle.benchmark', 'demo')) + '</button>' +
      '<button type="button" class="btn btn--ghost btn--sm" data-action="demo-toggle-mode" data-mode="target">' + esc(t('demo.modeToggle.target', 'demo')) + '</button>';

    qs('#demo-keyboard-help').textContent = t('demo.keyboardHelp', 'demo');
  }

  function onDemoFieldChange(field, value) {
    demoState.inputs[field] = value;
    if (field === 'g') demoState.inputs.C = null;
    persistDemo();
    renderDemoAll();
  }

  function syncDemoInputBar() {
    var i = demoState.inputs;
    ['S', 'g', 'N', 'R', 'H'].forEach(function (f) {
      var numEl = demoRefs[f + 'num'], sliderEl = demoRefs[f + 'slider'];
      var v = i[f];
      if (numEl && document.activeElement !== numEl) numEl.value = v == null ? '' : v;
      if (sliderEl && document.activeElement !== sliderEl) sliderEl.value = isFiniteNum(v) ? v : demoFieldConfig[f].min;
    });
    var indEl = qs('#demo-select-ind'); if (indEl && document.activeElement !== indEl) indEl.value = i.ind || '';
    var prefEl = qs('#demo-select-pref'); if (prefEl && document.activeElement !== prefEl) prefEl.value = i.pref || '';

    qsa('#demo-stage-dots .demo-stage-dot').forEach(function (dot) {
      dot.classList.toggle('is-active', parseInt(dot.getAttribute('data-stage'), 10) === demoState.stage);
    });
    qsa('#demo-mode-toggle button').forEach(function (b) {
      b.classList.toggle('btn--primary', b.getAttribute('data-mode') === demoState.idealMode);
      b.classList.toggle('btn--ghost', b.getAttribute('data-mode') !== demoState.idealMode);
    });
  }

  function demoComputation() {
    var benchOrTarget;
    if (demoState.idealMode === 'target') {
      benchOrTarget = demoState.target;
    } else {
      var benches = buildBenches(demoState.inputs.ind ? findIndustry(demoState.inputs.ind) : null);
      var chosen = null;
      for (var k = 0; k < benches.length; k++) if (benches[k].id === demoState.benchmarkId) chosen = benches[k];
      if (!chosen && benches.length) chosen = benches[0];
      benchOrTarget = chosen ? { atmark: chosen.atmark, id: chosen.id, label: chosen.label } : null;
    }
    return computeAll(demoState.inputs, demoState.idealMode, benchOrTarget);
  }

  function renderDemoAll() {
    syncDemoInputBar();
    var panel = qs('#demo-stage-panel');
    var ctx = demoComputation();
    var mode = 'demo';

    if (ctx.branch === 'invalidInput' || ctx.branch === 'invalidMargin') {
      var demoInvalidKey = ctx.branch === 'invalidMargin' ? 'marginInvalid' : inferInvalidInputKey(demoState.inputs);
      panel.innerHTML = '<p class="guard-box__text">' + esc(t('validation.' + demoInvalidKey)) + '</p>';
      return;
    }

    var current = ctx.current;
    var html = '';
    var stage = demoState.stage;

    if (stage === 0) {
      html += '<div class="demo-stage-heading">' + esc(t('demo.stage0.heading', mode)) + '</div>' +
        '<div class="big-number">' + fmtNum(current.A0) + '<span class="big-number__unit">' + esc(t('common.unit.manyen')) + '</span></div>' +
        '<p class="hint-row">' + esc(t('common.atmarkDefinition', mode)) + '</p>';
    } else if (stage === 1) {
      html += '<div class="demo-stage-heading">' + esc(t('demo.stage1.heading', mode)) + '</div>';
      var minW = demoState.inputs.pref ? findMinWage(demoState.inputs.pref) : null;
      var partW = demoState.inputs.pref ? findPartWage(demoState.inputs.pref) : null;
      if (!demoState.inputs.pref) {
        html += '<div class="big-number">' + (current.W0 == null ? '—' : fmtNum(current.W0)) + '<span class="big-number__unit">' + esc(t('common.unit.yenPerHour')) + '</span></div>';
        html += '<p class="hint-row">' + esc(t('demo.stage1.hintPrefSelect', mode)) + '</p>';
      } else {
        html += '<div class="wage-compare">' +
          '<div class="wage-compare__item"><div class="wage-compare__label">' + esc(t('demo.stage1.presidentWageLabel', mode)) + '</div><div class="wage-compare__value">' + (current.W0 == null ? '—' : fmtNum(current.W0) + esc(t('common.unit.yen'))) + '</div></div>' +
          '<div class="wage-compare__item"><div class="wage-compare__label">' + (minW ? esc(tpl(t('common.minWageLabel', mode), { pref: minW.pref, amount: fmtNum(minW.amount.value), effectiveDate: minW.effectiveDate })) : esc(t('demo.stage1.minWageUnavailable', mode))) + '</div><div class="wage-compare__value">' + (minW ? fmtNum(minW.amount.value) + esc(t('common.unit.yen')) : '—') + ' ' + (minW ? sourceChipHtml(minW.amount, mode) : '') + '</div></div>' +
          '<div class="wage-compare__item"><div class="wage-compare__label">' + esc(t('common.partWageLabel', mode)) + '</div><div class="wage-compare__value">' + (partW ? fmtNum(partW.amount.value) + esc(t('common.unit.yen')) : '—') + ' ' + (partW ? sourceChipHtml(partW.amount, mode) : '') + '</div></div>' +
          '</div>';
      }
      if (current.W0 == null) html += '<p class="hint-row">' + esc(t('validation.zeroCompNoHourly')) + '</p>';
      html += weeklyHoursAssumedHtml(current, mode);
    } else if (stage === 2) {
      html += '<div class="demo-stage-heading">' + esc(t('demo.stage2.heading', mode)) + '</div>';
      if (demoState.idealMode === 'benchmark') {
        var benches = buildBenches(demoState.inputs.ind ? findIndustry(demoState.inputs.ind) : null);
        var threshold = Math.max(current.A0, isFiniteNum(current.atmarkKeep) ? current.atmarkKeep : current.A0);
        html += '<div class="bench-list">' + benches.map(function (b) {
          var guarded = !(b.atmark > threshold);
          var active = demoState.benchmarkId === b.id;
          return '<button type="button" class="bench-card' + (guarded ? ' is-guarded' : '') + (active ? ' is-active' : '') + '" data-action="demo-bench-select" data-bench-id="' + esc(b.id) + '">' +
            '<span class="bench-card__body"><span class="bench-card__label">' + esc(b.label) + '</span></span>' +
            '<span class="bench-card__value">' + fmtNum(b.atmark) + esc(t('common.unit.manyen')) + ' ' + sourceChipHtml(b, mode) + '</span></button>';
        }).join('') + '</div>';
      } else {
        html += '<div class="demo-idealmode-inputs">' +
          '<div class="field-group"><label class="field-label">' + esc(t('demo.stage2.targetIncomeLabel', mode)) + '</label><input class="field-input" type="number" id="demo-target-w" value="' + (demoState.target.W == null ? '' : demoState.target.W) + '"></div>' +
          '<div class="field-group"><label class="field-label">' + esc(t('demo.stage2.targetHourlyLabel', mode)) + '</label><input class="field-input" type="number" id="demo-target-hourly" value="' + (demoState.target.hourlyWage == null ? '' : demoState.target.hourlyWage) + '"></div>' +
          '</div>';
      }
      if (ctx.branch !== 'normal') html += guardBoxHtml(ctx.branch, mode, ctx);
    } else if (stage === 3) {
      html += '<div class="demo-stage-heading">' + esc(t('demo.stage3.heading', mode)) + '</div>';
      // laborShareHighとbelowKeepが同時に立つと同文言のボタンが2つ並ぶため、belowKeep側にのみボタンを残す（fix2 item5）
      if (current.laborShareHigh) html += guardBoxHtml('laborShareHigh', mode, ctx, ctx.branch === 'belowKeep').replace('guard-box', 'labor-share-box');
      if (['alreadyAbove', 'belowKeep', 'targetBelowCurrent', 'reachableNow', 'stageOnly'].indexOf(ctx.branch) !== -1) html += guardBoxHtml(ctx.branch, mode, ctx);
      if (ctx.branch === 'noTarget' || ctx.branch === 'noBenchmark') {
        html += '<p class="guard-box__text">' + esc(ctx.branch === 'noTarget' ? t('demo.stage2.guardNoTarget', mode) : t('demo.stage2.guardNoBenchmark', mode)) + '</p>';
      }
      if (ctx.allocation) {
        html += allocationBarHtml(ctx.allocation, current, mode);
        if (ctx.branch === 'normal') {
          var r1 = demoState.idealMode === 'target' ? ctx.ideal.W : ctx.ideal.R1;
          var w1 = demoState.idealMode === 'target' ? ctx.ideal.W2 : ctx.ideal.W1;
          html += '<p class="stage-subtext">' + esc(tpl(t('self.stage3.idealComp'), { R1: fmtNum(r1) })) + '</p>';
          html += '<p class="stage-subtext">' + esc(tpl(t('self.stage3.idealHourly'), { W1: fmtNum(w1) })) + '</p>';
        }
      }
      html += wageAssumptionLineHtml(ctx.wageAssumption, mode);
    } else if (stage === 4) {
      html += '<div class="demo-stage-heading">' + esc(t('demo.stage4.heading', mode)) + '</div>';
      if (ctx.diff) {
        html += '<div class="demo-columns">';
        html += colHtml(t('demo.columnHeaders.current', mode), current, 'current');
        html += colHtml(t('demo.columnHeaders.ideal', mode), demoIdealGeneric(ctx), 'ideal');
        html += diffColHtml(t('demo.columnHeaders.diff', mode), ctx.diff);
        html += '</div>';
        // 棚原確定：参考「必要売上の増加率」は表示しない（content.jsのキーcommon.salesGrowthNoteは残すが描画しない）
      } else if (ctx.branch === 'noTarget' || ctx.branch === 'noBenchmark') {
        html += '<p class="guard-box__text">' + esc(t('demo.stage4.guardStage2Required', mode)) + '</p>';
      } else {
        html += guardBoxHtml(ctx.branch, mode, ctx);
      }
      html += sourcesListHtml(mode);
    }

    panel.innerHTML = html;

    if (stage === 2 && demoState.idealMode === 'target') {
      on(qs('#demo-target-w'), 'change', function () { demoState.target.W = this.value === '' ? null : parseFloat(this.value); demoState.target.hourlyWage = null; persistDemo(); renderDemoAll(); });
      on(qs('#demo-target-hourly'), 'change', function () { demoState.target.hourlyWage = this.value === '' ? null : parseFloat(this.value); demoState.target.W = null; persistDemo(); renderDemoAll(); });
    }
  }

  function demoIdealGeneric(ctx) {
    if (ctx.branch !== 'normal') return {};
    if (demoState.idealMode === 'target') {
      return { atmark: ctx.ideal.A2, grossProfit: ctx.ideal.G2, officerComp: ctx.ideal.W, hourlyWage: ctx.ideal.W2, requiredSales: ctx.ideal.S2 };
    }
    return { atmark: ctx.ideal.A1, grossProfit: ctx.ideal.G1, officerComp: ctx.ideal.R1, hourlyWage: ctx.ideal.W1, requiredSales: ctx.ideal.S1 };
  }

  function colHtml(header, v, colType) {
    // colType: 'current'（現状列＝実績の売上高） | 'ideal'（理想列＝到達に必要な売上高）
    // 現状列に「必要売上」ラベルを使い回すと、既に達成済みの実績を「これから必要な数字」
    // であるかのように誤読させるため、列種別でラベルを出し分ける（T14バグ④/T15指摘対応）。
    var salesLabel = colType === 'current'
      ? t('demo.rowLabels.currentSales', 'demo')
      : t('demo.rowLabels.requiredSales', 'demo');
    return '<div><div class="demo-col-header">' + esc(header) + '</div>' +
      '<div class="diff-list">' +
      '<div class="diff-row"><span class="diff-row__label">' + esc(t('demo.rowLabels.atmark', 'demo')) + '</span><span class="diff-value">' + fmtNum(v.atmark != null ? v.atmark : v.A0) + esc(t('common.unit.manyen')) + '</span></div>' +
      '<div class="diff-row"><span class="diff-row__label">' + esc(t('demo.rowLabels.grossProfit', 'demo')) + '</span><span class="diff-value">' + fmtNum(v.grossProfit != null ? v.grossProfit : v.G) + esc(t('common.unit.manyen')) + '</span></div>' +
      '<div class="diff-row"><span class="diff-row__label">' + esc(t('demo.rowLabels.officerComp', 'demo')) + '</span><span class="diff-value">' + fmtNum(v.officerComp != null ? v.officerComp : v.R) + esc(t('common.unit.manyen')) + '</span></div>' +
      '<div class="diff-row"><span class="diff-row__label">' + esc(t('demo.rowLabels.hourlyWage', 'demo')) + '</span><span class="diff-value">' + (isFiniteNum(v.hourlyWage != null ? v.hourlyWage : v.W0) ? fmtNum(v.hourlyWage != null ? v.hourlyWage : v.W0) + esc(t('common.unit.yen')) : '—') + '</span></div>' +
      '<div class="diff-row"><span class="diff-row__label">' + esc(salesLabel) + '</span><span class="diff-value">' + fmtNum(v.requiredSales != null ? v.requiredSales : v.S) + esc(t('common.unit.manyen')) + '</span></div>' +
      '</div></div>';
  }
  function diffColHtml(header, diff) {
    return '<div><div class="demo-col-header">' + esc(header) + '</div>' +
      '<div class="diff-list">' +
      diffRowRaw(t('demo.rowLabels.atmark', 'demo'), diff.atmark, false) + diffRowRaw(t('demo.rowLabels.grossProfit', 'demo'), diff.grossProfit, false) +
      diffRowRaw(t('demo.rowLabels.officerComp', 'demo'), diff.officerComp, false) + diffRowRaw(t('demo.rowLabels.hourlyWage', 'demo'), diff.hourlyWage, true) +
      diffRowRaw(t('demo.rowLabels.requiredSales', 'demo'), diff.requiredSales, false) +
      '</div></div>';
  }
  function diffRowRaw(label, v, isHourly) {
    if (!isFiniteNum(v)) return '<div class="diff-row"><span class="diff-row__label">' + esc(label) + '</span><span class="diff-value">—</span></div>';
    var cls = v > 0 ? 'diff-value--pos' : (v < 0 ? 'diff-value--neg' : '');
    return '<div class="diff-row"><span class="diff-row__label">' + esc(label) + '</span><span class="diff-value ' + cls + '">' + fmtSigned(v) + (isHourly ? t('common.unit.yen') : t('common.unit.manyen')) + '</span></div>';
  }

  document.addEventListener('click', function (e) {
    if (currentMode !== 'demo') return;
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var action = el.getAttribute('data-action');
    if (action === 'demo-goto-stage') { demoState.stage = parseInt(el.getAttribute('data-stage'), 10); persistDemo(); renderDemoAll(); }
    if (action === 'demo-toggle-mode') { demoState.idealMode = el.getAttribute('data-mode'); persistDemo(); renderDemoAll(); }
    if (action === 'demo-bench-select') { demoState.benchmarkId = el.getAttribute('data-bench-id'); persistDemo(); renderDemoAll(); }
    if (action === 'source-open') { openSourceSheet(el.getAttribute('data-source-id'), el.getAttribute('data-source-conf'), el.getAttribute('data-source-formula'), 'demo'); }
    if (action === 'guard-suggest') {
      var ctx = demoComputation();
      var benches = buildBenches(demoState.inputs.ind ? findIndustry(demoState.inputs.ind) : null);
      var sug = AtmarkCalc.suggestBenchmark(ctx.current, benches);
      if (sug) { demoState.idealMode = 'benchmark'; demoState.benchmarkId = sug.id; persistDemo(); renderDemoAll(); }
    }
    if (action === 'guard-reinput' || action === 'guard-focus-e') { demoState.stage = 2; persistDemo(); renderDemoAll(); }
    if (action === 'guard-view-allocation') { demoState.stage = 3; persistDemo(); renderDemoAll(); }
  });

  /* デモ：キーボード操作（フォーカスがフォーム要素にあるときはネイティブ動作を優先） */
  document.addEventListener('keydown', function (e) {
    if (currentMode !== 'demo') return;
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;

    if (e.key === 'ArrowRight') { demoState.stage = Math.min(4, demoState.stage + 1); persistDemo(); renderDemoAll(); }
    else if (e.key === 'ArrowLeft') { demoState.stage = Math.max(0, demoState.stage - 1); persistDemo(); renderDemoAll(); }
    else if (['0', '1', '2', '3', '4'].indexOf(e.key) !== -1) { demoState.stage = parseInt(e.key, 10); persistDemo(); renderDemoAll(); }
    else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      var f = demoState.lastField || 'S';
      var cfg = demoFieldConfig[f];
      var cur = isFiniteNum(demoState.inputs[f]) ? demoState.inputs[f] : cfg.min;
      var next = cur + (e.key === 'ArrowUp' ? cfg.step : -cfg.step);
      next = Math.max(cfg.min, Math.min(cfg.max, next));
      onDemoFieldChange(f, next);
      e.preventDefault();
    } else if (e.key === 'b' || e.key === 'B') {
      var benches = buildBenches(demoState.inputs.ind ? findIndustry(demoState.inputs.ind) : null);
      if (benches.length) {
        var idx = benches.findIndex(function (b) { return b.id === demoState.benchmarkId; });
        idx = (idx + 1) % benches.length;
        demoState.idealMode = 'benchmark'; demoState.benchmarkId = benches[idx].id;
        persistDemo(); renderDemoAll();
      }
    } else if (e.key === 'm' || e.key === 'M') {
      demoState.idealMode = demoState.idealMode === 'benchmark' ? 'target' : 'benchmark';
      persistDemo(); renderDemoAll();
    } else if (e.key === 'r' || e.key === 'R') {
      if (window.confirm(t('demo.resetConfirm', 'demo'))) { demoState = defaultDemoState(); persistDemo(); syncDemoInputBar(); renderDemoAll(); }
    } else if (e.key === 'f' || e.key === 'F') {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
    }
  });

  /* ================================================================================
     ============================  起動  ============================================
     ================================================================================ */

  var currentMode = 'self';

  function applyStateFromHash(inputs) {
    if (!location.hash || location.hash.indexOf('#s=') !== 0) return;
    var decoded = AtmarkCalc.decodeState(location.hash.slice(3));
    if (!decoded) return;
    Object.keys(decoded).forEach(function (k) { inputs[k] = decoded[k]; });
  }

  function boot() {
    var params = getQueryParams();
    currentMode = params.mode === 'demo' ? 'demo' : 'self';
    var display = params.display;
    var fresh = params.fresh === '1';

    if (display === 'projector') document.documentElement.setAttribute('data-display', 'projector');

    document.getElementById('mode-badge').textContent = t('common.modeBadge', currentMode);
    document.getElementById('view-self').classList.toggle('is-active', currentMode === 'self');
    document.getElementById('view-demo').classList.toggle('is-active', currentMode === 'demo');

    if (currentMode === 'demo') {
      var savedDemo = !fresh ? lsGet(DEMO_LS_KEY) : null;
      demoState = savedDemo || defaultDemoState();
      applyStateFromHash(demoState.inputs);
      buildDemoInputBar();
      renderDemoAll();
    } else {
      if (fresh) lsRemove(SELF_LS_KEY);
      selfState = defaultSelfState();
      applyStateFromHash(selfState.inputs);
      renderSelfIntro();
      showSelfPhase('intro', true);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
