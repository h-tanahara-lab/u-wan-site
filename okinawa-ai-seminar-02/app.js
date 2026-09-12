/* =========================================================
   沖縄AIセミナー 第2回 通常LP — app.js
   実装：ルイ（U-WAN 04_システム部）2026-09-12

   実装範囲：
   ・スクロール連動フェードイン（.reveal）
   ・モバイル追従CTAの表示/非表示（最終CTAセクションと重複させない）
   ・計測イベント発火（dataLayer.push のみ。GA4タグ本体の埋め込みは
     リョウの指示待ち。gtag()は呼ばない・タグは読み込まない）
     - cta_click   : [data-cta-apply] クリック時
     - calendar_add: [data-calendar-add] クリック時
     - scroll_depth: 25 / 50 / 75% 到達時（各1回のみ）
   ・申込フォームはこのページに存在しない（外部UTAGE）ため、
     フォーム開始/送信/エラー等のイベントは実装しない。
   ========================================================= */
(function () {
  "use strict";

  window.dataLayer = window.dataLayer || [];

  document.addEventListener("DOMContentLoaded", function () {
    var prefersReducedMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------------------------------------------------------------
       スクロール連動フェードイン（.reveal要素）
    --------------------------------------------------------------- */
    var revealEls = document.querySelectorAll(".reveal");
    if (revealEls.length) {
      if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
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
    }

    /* ---------------------------------------------------------------
       モバイル追従CTAの表示制御
       最終CTAセクション（#final-cta）が画面内に入ったら、
       追従バーと最終CTAの重複を避けるため一時的に隠す。
    --------------------------------------------------------------- */
    var stickyCta = document.querySelector(".sticky-cta");
    var finalCtaSection = document.getElementById("final-cta");
    if (stickyCta && finalCtaSection && typeof IntersectionObserver !== "undefined") {
      var stickyObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            stickyCta.classList.toggle("is-hidden", entry.isIntersecting);
          });
        },
        { root: null, rootMargin: "0px", threshold: 0.15 }
      );
      stickyObserver.observe(finalCtaSection);
    }

    /* ---------------------------------------------------------------
       計測：CTAクリック
    --------------------------------------------------------------- */
    document.querySelectorAll("[data-cta-apply]").forEach(function (el) {
      el.addEventListener("click", function () {
        window.dataLayer.push({
          event: "cta_click",
          cta_location: el.getAttribute("data-cta-location") || "unknown"
        });
      });
    });

    /* ---------------------------------------------------------------
       計測：カレンダー追加
    --------------------------------------------------------------- */
    document.querySelectorAll("[data-calendar-add]").forEach(function (el) {
      el.addEventListener("click", function () {
        window.dataLayer.push({
          event: "calendar_add",
          calendar_type: el.getAttribute("data-calendar-add") || "unknown"
        });
      });
    });

    /* ---------------------------------------------------------------
       計測：スクロール到達率（25/50/75%・各1回のみ）
    --------------------------------------------------------------- */
    var scrollMarks = [25, 50, 75];
    var firedMarks = {};
    function checkScrollDepth() {
      var doc = document.documentElement;
      var scrollTop = window.scrollY || doc.scrollTop;
      var winHeight = window.innerHeight;
      var docHeight = doc.scrollHeight;
      if (docHeight <= winHeight) return;
      var percent = ((scrollTop + winHeight) / docHeight) * 100;
      scrollMarks.forEach(function (mark) {
        if (!firedMarks[mark] && percent >= mark) {
          firedMarks[mark] = true;
          window.dataLayer.push({
            event: "scroll_depth",
            scroll_depth_percent: mark
          });
        }
      });
      if (firedMarks[75]) {
        window.removeEventListener("scroll", onScroll);
      }
    }
    var scrollTicking = false;
    function onScroll() {
      if (scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(function () {
        checkScrollDepth();
        scrollTicking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    checkScrollDepth(); // 読み込み時点で既にスクロール済みのケースに対応
  });
})();
