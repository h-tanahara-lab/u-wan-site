/* =========================================================
   AIリアル体験セミナー（松本さん共催）LP — app.js
   実装：ケン（U-WAN 04_システム部）／デザイン全面バージョンアップ：ルイ（v5）
   ========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------------
     UTAGE申込みURL（差し替え用・単一定義）
     棚原さんが松本さんへリクエスト中のため、現状はプレースホルダー。
     URL確定後、マッチョはこの1行の値だけを差し替えれば
     ページ内のCTAボタン（FV／料金セクション／追伸）すべてに反映される。
  --------------------------------------------------------------- */
  var UTAGE_URL = "#UTAGE_URL_TBD";

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
       スクロール連動フェードイン／スライドイン（.reveal要素）
       - prefers-reduced-motionを尊重（CSS側の@mediaで無効化される前提で、
         JS側でも余分なobserve負荷をかけないよう分岐する）
       - IntersectionObserver非対応ブラウザでは即時表示にフォールバック
    --------------------------------------------------------------- */
    var revealEls = document.querySelectorAll(".reveal");
    var prefersReducedMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
