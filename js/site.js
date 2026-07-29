/* Interakcja nawigacji. Całą treść (menu, listy, spisy) renderuje Jekyll —
   ten plik odpowiada tylko za rozwijanie dropdownów i menu mobilne. */
(function () {
  "use strict";

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
})();
