/* =========================================================
   沖縄AIセミナー 第2回 通常LP — app.js
   実装：ルイ（U-WAN 04_システム部）2026-09-12（計測はリョウ設計に統一）

   実装範囲：
   ・スクロール連動フェードイン（.reveal）
   ・モバイル追従CTAの表示/非表示（最終CTAセクションと重複させない）
   ・計測イベント発火（trackEvent() ヘルパー経由。gtag()が定義されて
     いない現状は console.info にフォールバックし、実際の送信は行わない。
     GA4タグ本体はhead内にコメントアウトで設置済み。測定ID確定後、
     コメントを外せばそのまま計測が有効になる）
     - cta_click       : [data-cta-apply] クリック時
     - add_to_calendar : [data-calendar-add] クリック時
     - scroll_depth    : 25 / 50 / 75% 到達時（各1回のみ）
   ・申込フォームはこのページに存在しない（外部UTAGE）ため、
     フォーム開始/送信/エラー等のイベントは実装しない。
   ========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------------
     計測ヘルパー（リョウ設計）
     gtag()が定義されていればGA4に送信、未定義ならconsole.infoに
     フォールバックする。
  --------------------------------------------------------------- */
  function trackEvent(name, params) {
    params = params || {};
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    } else {
      console.info("[GA4 (dev)]", name, params);
    }
  }

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
        trackEvent("cta_click", {
          cta_location: el.getAttribute("data-cta-location") || "unknown",
          cta_label: (el.textContent || "").trim(),
          destination_url: el.getAttribute("href") || ""
        });
      });
    });

    /* ---------------------------------------------------------------
       計測：カレンダー追加
    --------------------------------------------------------------- */
    document.querySelectorAll("[data-calendar-add]").forEach(function (el) {
      el.addEventListener("click", function () {
        trackEvent("add_to_calendar", {
          calendar_type: el.getAttribute("data-calendar-add") || "unknown",
          seminar_date: "2026-10-26"
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
          trackEvent("scroll_depth", {
            percent_scrolled: mark
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
