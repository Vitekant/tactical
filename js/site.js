/* Renders nav dropdowns + article lists from data/articles.js */
(function () {
  "use strict";

  // Absolute URL of the site root, derived from this script's own src, so
  // generated links work at any mount point (domain root, /tactical/, etc.).
  var SITE_BASE = (function () {
    var s = document.currentScript;
    if (!s) { var all = document.getElementsByTagName("script"); s = all[all.length - 1]; }
    var src = (s && s.src) || "";
    return src.replace(/js\/site\.js(?:\?.*)?$/, "");
  })();

  var catById = {};
  CATEGORIES.forEach(function (c) { catById[c.id] = c; });

  function fmtDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
  }

  function articleUrl(a) { return SITE_BASE + "artykuly/" + a.slug + ".html"; }

  function metaHtml(a, withCat) {
    var cat = catById[a.category];
    var html = "";
    if (withCat && cat) {
      html += '<a class="cat" href="' + SITE_BASE + cat.url + '"><span class="chevrons" aria-hidden="true"></span>' + cat.name + "</a>";
    }
    html += "<time datetime=\"" + a.date + '">' + fmtDate(a.date) + "</time>";
    return '<div class="meta">' + html + "</div>";
  }

  /* ---------- nav ---------- */
  function buildNav() {
    var navList = document.querySelector("#nav-list");
    if (!navList) return;

    CATEGORIES.forEach(function (cat) {
      var li = document.createElement("li");
      var items = ARTICLES.filter(function (a) { return a.category === cat.id; }).slice(0, 5);
      var dd = items.map(function (a) {
        return '<a href="' + articleUrl(a) + '">' + a.title + "</a>";
      }).join("");
      if (!dd) dd = '<span class="dropdown-empty">Wkrótce pierwsze artykuły</span>';
      dd += '<a class="dropdown-all" href="' + SITE_BASE + cat.url + '">Wszystkie artykuły →</a>';

      li.innerHTML =
        '<a href="' + SITE_BASE + cat.url + '" aria-haspopup="true" aria-expanded="false">' + cat.name + "</a>" +
        '<div class="dropdown">' + dd + "</div>";
      navList.appendChild(li);
    });

    // Desktop: first click/tap opens dropdown, second follows link. Keyboard-friendly.
    navList.querySelectorAll(":scope > li").forEach(function (li) {
      var link = li.querySelector(":scope > a");
      link.addEventListener("click", function (e) {
        if (!li.classList.contains("open")) {
          e.preventDefault();
          navList.querySelectorAll("li.open").forEach(function (o) { setOpen(o, false); });
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
      if (!e.target.closest(".nav")) {
        navList.querySelectorAll("li.open").forEach(function (o) { setOpen(o, false); });
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        navList.querySelectorAll("li.open").forEach(function (o) { setOpen(o, false); });
      }
    });

    function setOpen(li, open) {
      li.classList.toggle("open", open);
      var a = li.querySelector(":scope > a");
      if (a) a.setAttribute("aria-expanded", open ? "true" : "false");
    }

    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
  }

  /* ---------- homepage ---------- */
  function buildHome() {
    var featEl = document.querySelector("#featured-slot");
    if (!featEl) return;

    var sorted = ARTICLES.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    var featured = sorted.filter(function (a) { return a.promoted; })[0] || sorted[0];

    featEl.innerHTML =
      '<span class="eyebrow"><span class="chevrons" aria-hidden="true"></span>Polecany poradnik</span>' +
      "<h1><a href=\"" + articleUrl(featured) + '">' + featured.title + "</a></h1>" +
      '<p class="lead">' + featured.excerpt + "</p>" +
      metaHtml(featured, true);

    var rest = sorted.filter(function (a) { return a.slug !== featured.slug; });

    var sideEl = document.querySelector("#side-latest");
    if (sideEl) {
      sideEl.innerHTML = rest.slice(0, 3).map(function (a) {
        return "<article><h3><a href=\"" + articleUrl(a) + '">' + a.title + "</a></h3>" + metaHtml(a, false) + "</article>";
      }).join("");
    }

    var gridEl = document.querySelector("#latest-grid");
    if (gridEl) {
      gridEl.innerHTML = sorted.slice(0, 6).map(function (a) {
        return '<div class="card"><h3><a href="' + articleUrl(a) + '">' + a.title + "</a></h3>" +
          "<p>" + a.excerpt + "</p>" + metaHtml(a, true) + "</div>";
      }).join("");
    }
  }

  /* ---------- category page ---------- */
  function buildCategory() {
    var listEl = document.querySelector("#category-list");
    if (!listEl) return;
    var catId = listEl.getAttribute("data-category");
    var items = ARTICLES
      .filter(function (a) { return a.category === catId; })
      .sort(function (a, b) { return a.date < b.date ? 1 : -1; });

    if (!items.length) {
      listEl.innerHTML = "<p>Wkrótce opublikujemy pierwsze artykuły w tej kategorii.</p>";
      return;
    }
    listEl.innerHTML = items.map(function (a) {
      return "<article><h2><a href=\"" + articleUrl(a) + '">' + a.title + "</a></h2>" +
        "<p>" + a.excerpt + "</p>" + metaHtml(a, false) + "</article>";
    }).join("");
  }

  buildNav();
  buildHome();
  buildCategory();
})();
