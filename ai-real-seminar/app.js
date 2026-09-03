/* =========================================================
   AIリアル体験セミナー（松本さん共催）LP — app.js
   実装：ケン（U-WAN 04_システム部）／デザイン全面バージョンアップ：ルイ（v5）
   → 松本さん個人ブランド改訂（部署数の単一定義・GUEST統計カード対応）：ルイ（v6）
   ========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------------
     UTAGE申込みURL（差し替え用・単一定義）
     2026-09-03 確定・反映（UTAGE決済フォーム・公開済み／決済モードはテストモード）
  --------------------------------------------------------------- */
  var UTAGE_URL = "https://uw.u-wan.jp/p/ojWjkb22XESw";

  /* ---------------------------------------------------------------
     松本さんの組織「Re-Systems」部署数（単一定義・v6）
     2026-09-03時点、一次情報が資料により食い違う（akihisa.netトップ年表＝
     16部署／aishain.akihisa.net＝15部門）。棚原さん確認中のため暫定的に
     16を採用。確定後はこの数字を書き換えるだけで、ページ内の該当箇所
     （[data-org-stat="dept-count"]）に自動反映される。
  --------------------------------------------------------------- */
  var ORG_DEPT_COUNT = 16;

  /* ---------- GA4 計測ヘルパー（暫定） -----------------------------
     本番でGA4計測タグ（gtag.js）を <head> に設置後、
     window.gtag が存在すればそのままイベント送信される。
     未設置の間はconsole.infoにログを出すだけの安全な暫定実装。
  ------------------------------------------------------------------ */
  function trackEvent(name, params) {
    params = params || {};
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    } else {
      // eslint-disable-next-line no-console
      console.info("[GA4 (dev)]", name, params);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    /* ---------- 部署数の単一定義をDOMへ反映（カウントアップ初期化より前に実行） ---------- */
    var deptStatEls = document.querySelectorAll('[data-org-stat="dept-count"]');
    deptStatEls.forEach(function (el) {
      el.textContent = ORG_DEPT_COUNT + "部署";
    });

    /* ---------- CTAボタンにUTAGE URLを反映 ---------- */
    var ctaLinks = document.querySelectorAll("[data-cta-utage]");
    ctaLinks.forEach(function (el) {
      el.setAttribute("href", UTAGE_URL);
      if (UTAGE_URL.indexOf("#") !== 0) {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      }
      el.addEventListener("click", function () {
        trackEvent("cta_click_utage", { cta_position: el.dataset.ctaUtage || "unknown" });
      });
    });

    /* ---------- FAQ アコーディオン ---------- */
    var faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(function (item) {
      var q = item.querySelector(".faq-q");
      var qText = item.querySelector(".faq-q-text");
      q.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        faqItems.forEach(function (i) { i.classList.remove("is-open"); });
        if (!isOpen) {
          item.classList.add("is-open");
          trackEvent("faq_open", { faq_question: qText ? qText.textContent.trim() : q.textContent.trim() });
        }
      });
    });

    /* ---------------------------------------------------------------
       数字バーのカウントアップ演出
       - 「60分」「3,300円」のように【数字＋単位のみ】の要素だけを対象にする
       - 「1名＋1名」のように数字が複数含まれる文字列は対象外（誤動作防止のため
         安全側に倒し、そのまま表示する）
       - prefers-reduced-motionでは即座に最終値を表示（アニメーションしない）
    --------------------------------------------------------------- */
    function countUp(el, targetNumber, suffix, duration) {
      var start = null;
      function step(ts) {
        if (start === null) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        var current = Math.round(targetNumber * eased);
        el.textContent = current.toLocaleString("ja-JP") + suffix;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = targetNumber.toLocaleString("ja-JP") + suffix;
        }
      }
      window.requestAnimationFrame(step);
    }

    function initNumberCountUp(prefersReducedMotion, selector) {
      var numEls = document.querySelectorAll(selector);
      if (!numEls.length) return;
      numEls.forEach(function (el) {
        var raw = el.textContent.trim();
        var match = raw.match(/^([\d,]+)(\D*)$/); // 数字（カンマ可）＋残りが非数字のみの場合だけ対象
        if (!match) return; // 「1名＋1名」等、複数の数字を含む文字列は対象外
        var targetNumber = parseInt(match[1].replace(/,/g, ""), 10);
        if (!targetNumber || isNaN(targetNumber)) return;
        var suffix = match[2] || "";
        el.dataset.countTarget = String(targetNumber);
        el.dataset.countSuffix = suffix;
        if (prefersReducedMotion) return; // reduced-motionでは最終値のまま何もしない
        el.textContent = "0" + suffix;
      });

      if (prefersReducedMotion || typeof IntersectionObserver === "undefined") return;

      var countObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            var target = Number(el.dataset.countTarget);
            if (target) {
              countUp(el, target, el.dataset.countSuffix || "", 1100);
            }
            countObserver.unobserve(el);
          });
        },
        { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.4 }
      );
      numEls.forEach(function (el) {
        if (el.dataset.countTarget) countObserver.observe(el);
      });
    }

    /* ---------------------------------------------------------------
       スクロール連動フェードイン／スライドイン（.reveal要素）
       - prefers-reduced-motionを尊重（CSS側の@mediaで無効化される前提で、
         JS側でも余分なobserve負荷をかけないよう分岐する）
       - IntersectionObserver非対応ブラウザでは即時表示にフォールバック
    --------------------------------------------------------------- */
    var revealEls = document.querySelectorAll(".reveal");
    var prefersReducedMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    initNumberCountUp(prefersReducedMotion, ".numbers .num");
    initNumberCountUp(prefersReducedMotion, ".guest-stats .stat-num");

    if (!revealEls.length) {
      // reveal対象なし（何もしない）
    } else if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
      );
      revealEls.forEach(function (el) { revealObserver.observe(el); });
    }
  });
})();
