/* Skrypty strony. Treść (menu, listy, spisy) renderuje Jekyll — tutaj tylko
   interakcja: rozwijane menu oraz wybór wpisów w "Może Cię zainteresować". */
(function () {
  "use strict";

  /* ---------- nawigacja ---------- */
  function initNav() {
    var navList = document.querySelector("#nav-list");
    if (!navList) return;

    function setOpen(li, open) {
      li.classList.toggle("open", open);
      var a = li.querySelector(":scope > a");
      if (a) a.setAttribute("aria-expanded", open ? "true" : "false");
    }

    function closeAll() {
      navList.querySelectorAll("li.open").forEach(function (o) { setOpen(o, false); });
    }

    // Desktop: pierwsze kliknięcie otwiera listę, drugie przechodzi do działu.
    navList.querySelectorAll(":scope > li:not(.nav-plain)").forEach(function (li) {
      var link = li.querySelector(":scope > a");
      if (!link) return;

      link.addEventListener("click", function (e) {
        if (!li.classList.contains("open")) {
          e.preventDefault();
          closeAll();
          setOpen(li, true);
        }
      });
      li.addEventListener("mouseenter", function () {
        if (window.matchMedia("(min-width: 861px)").matches) setOpen(li, true);
      });
      li.addEventListener("mouseleave", function () {
        if (window.matchMedia("(min-width: 861px)").matches) setOpen(li, false);
      });
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".nav")) closeAll();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll();
    });

    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
  }

  /* ---------- "Może Cię zainteresować" ----------
     Jekyll wypisuje wszystkich kandydatów; tutaj zostawiamy trzy.
     Kolejność: najpierw wpisy dzielące dział z "Najnowszymi", potem reszta.
     Wśród pozycji o tym samym wyniku losujemy, więc zestaw bywa inny przy
     kolejnych wejściach, ale zawsze jest tematycznie sensowny. */
  function initPick() {
    var box = document.querySelector("#home-pick");
    if (!box) return;

    var howMany = parseInt(box.getAttribute("data-pick"), 10) || 3;
    var seed = (box.getAttribute("data-seed") || "").split(/\s+/).filter(Boolean);
    var items = Array.prototype.slice.call(box.querySelectorAll("article"));

    if (items.length <= howMany) {
      box.classList.add("is-picked"); // nie ma czego wybierać, pokaż wszystko
      return;
    }

    var scored = items.map(function (el, i) {
      var secs = (el.getAttribute("data-sections") || "").split(/\s+/).filter(Boolean);
      var shared = 0;
      secs.forEach(function (s) { if (seed.indexOf(s) !== -1) shared++; });
      return { el: el, score: shared, rnd: Math.random(), order: i };
    });

    scored.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score; // trafniejsze najpierw
      return a.rnd - b.rnd;                              // remis -> losowo
    });

    var keep = scored.slice(0, howMany);
    var keepEls = keep.map(function (s) { return s.el; });

    // Zachowaj pierwotną (chronologiczną) kolejność wśród wybranych.
    keep.sort(function (a, b) { return a.order - b.order; });

    var parent = items[0].parentNode;
    scored.forEach(function (s) {
      if (keepEls.indexOf(s.el) === -1 && s.el.parentNode) s.el.parentNode.removeChild(s.el);
    });
    keep.forEach(function (s) { parent.appendChild(s.el); });

    // JS zadziałał — zdejmij awaryjne ukrywanie nadmiarowych pozycji.
    box.classList.add("is-picked");
  }

  initNav();
  initPick();
})();
