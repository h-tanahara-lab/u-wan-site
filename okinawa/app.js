/* =========================================================
   沖縄経営者向けFB広告LP — app.js
   実装：ケン（U-WAN 04_システム部）
   役割：
   - FAQアコーディオン開閉
   - 4分岐CTA（A/C）共通モーダルフォームの開閉・選択肢プリセット
   - GA4向けイベント発火（gtag未設置時は console.info に留める暫定実装）
   ========================================================= */
(function () {
  "use strict";

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
  window.__okinawaLpTrack = trackEvent;

  document.addEventListener("DOMContentLoaded", function () {
    /* ---------- FAQ アコーディオン ---------- */
    var faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(function (item) {
      var q = item.querySelector(".faq-q");
      q.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        faqItems.forEach(function (i) { i.classList.remove("is-open"); });
        if (!isOpen) {
          item.classList.add("is-open");
          trackEvent("faq_open", { faq_question: q.textContent.trim() });
        }
      });
    });

    /* ---------- 4分岐CTA トラッキング + モーダル制御 ---------- */
    var modal = document.getElementById("lead-modal");
    var modalTitle = document.getElementById("lead-modal-title");
    var modalDesc = document.getElementById("lead-modal-desc");
    var modalBranchInput = document.getElementById("lead-branch");
    var modalCLink = document.getElementById("lead-modal-c-link");

    var branchCopy = {
      A: {
        title: "実績解説動画を受け取る",
        desc: "業界別の実例を、棚原自身の解説付きスライド動画にまとめました。お名前とメールアドレスをご入力ください。"
      },
      C: {
        title: "動画を見てから相談を予約する",
        desc: "まず実績解説動画をお届けします。あわせて個別相談のご予約もこの画面から行えます。"
      },
      D: {
        title: "メルマガで情報を受け取る",
        desc: "業界別の実例や考え方を、メルマガで継続的にお届けします。"
      }
    };

    function openModal(branch) {
      var copy = branchCopy[branch] || branchCopy.A;
      modalTitle.textContent = copy.title;
      modalDesc.textContent = copy.desc;
      modalBranchInput.value = branch;
      if (modalCLink) {
        modalCLink.style.display = branch === "C" ? "block" : "none";
      }
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
      trackEvent("cta_click", { cta_branch: branch, cta_location: "lp_4branch" });
    }

    function closeModal() {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    document.querySelectorAll("[data-open-lead-form]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal(btn.getAttribute("data-open-lead-form"));
      });
    });

    document.querySelectorAll("[data-close-lead-form]").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });

    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeModal();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
      });
    }

    /* ---------- B（直リンク＝相談予約）／D（直リンク＝メルマガ登録）クリック計測 ----------
       リョウ一次チェック(v1)提案：B（相談予約＝ホット）とD（メルマガ登録＝ミドル）は
       温度感が異なるため、GA4コンバージョンを"cta_click"1本にまとめず分離する。
       実装方針：cta_branchはパラメータとして全イベント共通で送りつつ（カスタムディメンション化用）、
       B/Dはイベント名自体を分けることで、GA4管理画面側でイベント名単位のコンバージョン登録が
       そのまま使える（パラメータ値ごとのコンバージョン分岐はGA4標準機能では不可のため）。
       ------------------------------------------------------------------ */
    var directEventNameByBranch = {
      B: "cta_click_consult",   // 相談予約直リンク＝ホット
      D: "cta_click_newsletter" // メルマガ登録直リンク＝ミドル
    };
    document.querySelectorAll("[data-track-direct]").forEach(function (a) {
      a.addEventListener("click", function () {
        var branch = a.getAttribute("data-track-direct");
        // "B_sticky"のように末尾に位置サフィックスが付く場合があるため、
        // 先頭のA/B/C/D部分（"_"より前）だけを見てイベント名を判定する。
        var branchRoot = branch.split("_")[0];
        var eventName = directEventNameByBranch[branchRoot] || "cta_click";
        trackEvent(eventName, {
          cta_branch: branch,
          cta_location: "lp_4branch",
          outbound_url: a.href
        });
      });
    });

    /* ---------- フォーム送信計測（FormSubmit等の外部送信前にGA4へ記録） ---------- */
    var leadForm = document.getElementById("lead-form");
    if (leadForm) {
      leadForm.addEventListener("submit", function () {
        trackEvent("generate_lead", {
          cta_branch: modalBranchInput.value,
          form_id: "lead-form"
        });
      });
    }

    /* ---------- FVスクロールCTAのアンカー計測 ---------- */
    document.querySelectorAll('a[href="#results"]').forEach(function (a) {
      a.addEventListener("click", function () {
        trackEvent("fv_cta_click", { cta_location: "hero" });
      });
    });
  });
})();
