(function () {
  "use strict";

  // Accordion: 業界カード開閉
  var cards = document.querySelectorAll(".industry-card");
  cards.forEach(function (card) {
    var toggle = card.querySelector(".industry-toggle");
    var panel = card.querySelector(".industry-panel");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", function () {
      var isOpen = card.getAttribute("data-open") === "true";
      card.setAttribute("data-open", isOpen ? "false" : "true");
      toggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });
  });
})();
