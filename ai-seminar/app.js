/* =========================================================
   採用難がチャンスになる AI社員活用セミナー LP — app.js
   実装：ルイ（U-WAN 04_システム部）
   2026-09-03 モーション追加（参考：ai-real-seminar/app.js の実装パターンを移植）
   ・スクロール連動フェードイン（.reveal）
   ・数字バーのカウントアップ（.stats .stat-after）
   ・MYTHS & FACTS カードスライダー（スマホのみ／[data-slider]）
   カラー・フォント・レイアウトは変更していません。動きのみ追加。
   ========================================================= */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var prefersReducedMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------------------------------------------------------------
       数字バーのカウントアップ演出
       - 「2時間」「3時間」「0分」「3分」のように【数字＋単位のみ】の
         要素だけを対象にする（.stats .stat-after）
       - prefers-reduced-motionでは即座に最終値を表示（アニメーションしない）
       - 「0分」のように数値が0の要素はアニメーションせずそのまま表示する
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

    function initNumberCountUp(selector) {
      var numEls = document.querySelectorAll(selector);
      if (!numEls.length) return;
      numEls.forEach(function (el) {
        var raw = el.textContent.trim();
        var match = raw.match(/^([\d,]+)(\D*)$/); // 数字（カンマ可）＋残りが非数字のみの場合だけ対象
        if (!match) return;
        var targetNumber = parseInt(match[1].replace(/,/g, ""), 10);
        if (!targetNumber || isNaN(targetNumber)) return; // 0はそのまま表示（アニメーション不要）
        var suffix = match[2] || "";
        el.dataset.countTarget = String(targetNumber);
        el.dataset.countSuffix = suffix;
        if (prefersReducedMotion) return;
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
              countUp(el, target, el.dataset.countSuffix || "", 1000);
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
    initNumberCountUp(".stats .stat-after");

    /* ---------------------------------------------------------------
       スクロール連動フェードイン／スライドイン（.reveal要素）
       - prefers-reduced-motionを尊重
       - IntersectionObserver非対応ブラウザでは即時表示にフォールバック
    --------------------------------------------------------------- */
    var revealEls = document.querySelectorAll(".reveal");
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

    /* ---------------------------------------------------------------
       カードスライダー（MYTHS & FACTS・スマホ幅のみCSSで有効化）
       - [data-slider] 内の .slider-track の子要素をカードとして扱う
       - ドット・矢印を動的生成し、スクロール位置に応じて現在地を更新
       - PC幅では .slider-track が通常のブロック表示のまま（従来どおり）
    --------------------------------------------------------------- */
    function initCardSlider(root) {
      var track = root.querySelector(".slider-track");
      var nav = root.querySelector(".slider-nav");
      if (!track || !nav) return;
      var cards = Array.prototype.slice.call(track.children);
      var dotsWrap = nav.querySelector(".slider-dots");
      var prevBtn = nav.querySelector(".slider-arrow--prev");
      var nextBtn = nav.querySelector(".slider-arrow--next");
      if (!cards.length || !dotsWrap) return;

      cards.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "slider-dot";
        dot.setAttribute("aria-label", (i + 1) + "枚目のカードへ移動");
        if (i === 0) dot.classList.add("is-active");
        dot.addEventListener("click", function () { scrollToIndex(i); });
        dotsWrap.appendChild(dot);
      });
      var dots = Array.prototype.slice.call(dotsWrap.children);

      function currentIndex() {
        var idx = 0;
        dots.forEach(function (d, i) { if (d.classList.contains("is-active")) idx = i; });
        return idx;
      }

      function scrollToIndex(i) {
        i = Math.max(0, Math.min(cards.length - 1, i));
        cards[i].scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", inline: "center", block: "nearest" });
      }

      function setActive(i) {
        dots.forEach(function (d, di) { d.classList.toggle("is-active", di === i); });
        if (prevBtn) prevBtn.disabled = i === 0;
        if (nextBtn) nextBtn.disabled = i === cards.length - 1;
      }
      setActive(0);

      if (prevBtn) prevBtn.addEventListener("click", function () { scrollToIndex(currentIndex() - 1); });
      if (nextBtn) nextBtn.addEventListener("click", function () { scrollToIndex(currentIndex() + 1); });

      if (typeof IntersectionObserver !== "undefined") {
        var sliderObserver = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                var idx = cards.indexOf(entry.target);
                if (idx > -1) setActive(idx);
              }
            });
          },
          { root: track, threshold: 0.6 }
        );
        cards.forEach(function (c) { sliderObserver.observe(c); });
      }
    }

    document.querySelectorAll("[data-slider]").forEach(initCardSlider);
  });
})();
