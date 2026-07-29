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

  var LAW_FIRM_URL = "https://adwokatmodzelewski.pl/";
  var LAW_FIRM_CONTACT_URL = "https://adwokatmodzelewski.pl/#kontakt";

  // Flat lookup: "branch/section" -> section object (with its branch attached).
  var sectionByKey = {};
  var branchById = {};
  BRANCHES.forEach(function (b) {
    branchById[b.id] = b;
    b.sections.forEach(function (s) {
      sectionByKey[b.id + "/" + s.id] = { section: s, branch: b };
    });
  });

  function sectionOf(a) { return sectionByKey[a.branch + "/" + a.section]; }

  function fmtDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
  }

  function articleUrl(a) { return SITE_BASE + "artykuly/" + a.slug + ".html"; }

  function byDateDesc(a, b) { return a.date < b.date ? 1 : -1; }

  function sortedArticles() { return ARTICLES.slice().sort(byDateDesc); }

  function articlesIn(branchId, sectionId) {
    return ARTICLES.filter(function (a) {
      return a.branch === branchId && (!sectionId || a.section === sectionId);
    }).sort(byDateDesc);
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function metaHtml(a, withSection) {
    var ref = sectionOf(a);
    var html = "";
    if (withSection && ref) {
      html += '<a class="cat" href="' + SITE_BASE + ref.section.url + '">' +
        '<span class="chevrons" aria-hidden="true"></span>' + esc(ref.section.name) + "</a>";
    }
    html += '<time datetime="' + a.date + '">' + fmtDate(a.date) + "</time>";
    return '<div class="meta">' + html + "</div>";
  }

  /* ---------- nav ----------
     Two dropdown branches (sections, not individual articles), plus a plain
     "Aktualności" link and an outbound "Pomoc prawna" link. */
  function buildNav() {
    var navList = document.querySelector("#nav-list");
    if (!navList) return;

    BRANCHES.forEach(function (branch) {
      var li = document.createElement("li");
      var dd = branch.sections.map(function (s) {
        var count = articlesIn(branch.id, s.id).length;
        return '<a href="' + SITE_BASE + s.url + '">' + esc(s.name) +
          '<span class="dropdown-count">' + count + "</span></a>";
      }).join("");
      dd += '<a class="dropdown-all" href="' + SITE_BASE + branch.url + '">Wszystkie artykuły →</a>';

      li.innerHTML =
        '<a href="' + SITE_BASE + branch.url + '" aria-haspopup="true" aria-expanded="false">' +
        esc(branch.name) + "</a>" +
        '<div class="dropdown">' + dd + "</div>";
      navList.appendChild(li);
    });

    // Plain links — no dropdown, so they get .nav-plain to suppress the caret.
    var news = document.createElement("li");
    news.className = "nav-plain";
    news.innerHTML = '<a href="' + SITE_BASE + 'aktualnosci.html">Aktualności</a>';
    navList.appendChild(news);

    var help = document.createElement("li");
    help.className = "nav-plain";
    help.innerHTML = '<a href="' + LAW_FIRM_URL + '" rel="noopener">Pomoc prawna</a>';
    navList.appendChild(help);

    // Desktop: first click/tap opens dropdown, second follows link. Keyboard-friendly.
    navList.querySelectorAll(":scope > li:not(.nav-plain)").forEach(function (li) {
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
    var sorted = sortedArticles();

    // Right column: three most recent articles ("aktualności").
    var latestEl = document.querySelector("#home-latest");
    if (latestEl) {
      latestEl.innerHTML = sorted.slice(0, 3).map(function (a) {
        return '<article><h3><a href="' + articleUrl(a) + '">' + esc(a.title) + "</a></h3>" +
          metaHtml(a, false) + "</article>";
      }).join("");
    }

    // Right column, below: three random guide pages ("Może Cię zainteresować").
    var randomEl = document.querySelector("#home-random");
    if (randomEl) {
      var pool = sorted.slice(3);
      // If there aren't enough articles outside the "latest" three, fall back
      // to the full list rather than rendering a short box.
      if (pool.length < 3) pool = sorted.slice();
      randomEl.innerHTML = pickRandom(pool, 3).map(function (a) {
        return '<article><h3><a href="' + articleUrl(a) + '">' + esc(a.title) + "</a></h3>" +
          metaHtml(a, true) + "</article>";
      }).join("");
    }
  }

  function pickRandom(arr, n) {
    var copy = arr.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = copy[i]; copy[i] = copy[j]; copy[j] = t;
    }
    return copy.slice(0, n);
  }

  /* ---------- section / branch listing pages ---------- */
  function buildListing() {
    var listEl = document.querySelector("#article-listing");
    if (!listEl) return;

    var branchId = listEl.getAttribute("data-branch");
    var sectionId = listEl.getAttribute("data-section"); // optional
    var items;

    if (listEl.getAttribute("data-all") === "true") {
      items = sortedArticles();
    } else {
      items = articlesIn(branchId, sectionId);
    }

    if (!items.length) {
      listEl.innerHTML = "<p>Wkrótce opublikujemy pierwsze artykuły w tym dziale.</p>";
      return;
    }

    var withSection = !sectionId; // branch/all pages show which section each item is in
    listEl.innerHTML = items.map(function (a) {
      return '<article><h2><a href="' + articleUrl(a) + '">' + esc(a.title) + "</a></h2>" +
        "<p>" + esc(a.excerpt) + "</p>" + metaHtml(a, withSection) + "</article>";
    }).join("");
  }

  /* ---------- article page sidebar (spis treści działu) ---------- */
  function buildArticleAside() {
    var asideEl = document.querySelector("#section-toc");
    if (!asideEl) return;

    var slug = asideEl.getAttribute("data-current");
    var current = ARTICLES.filter(function (a) { return a.slug === slug; })[0];
    if (!current) return;

    var ref = sectionOf(current);
    var titleEl = document.querySelector("#section-toc-title");
    if (titleEl && ref) titleEl.textContent = ref.section.name;

    var items = articlesIn(current.branch, current.section);
    var alone = items.length < 2;

    // A numbered "spis treści" listing only the page you're on is dead weight,
    // so a lone article gets the sibling list promoted in its place.
    if (alone) {
      asideEl.innerHTML = "";
      if (titleEl && ref) titleEl.textContent = ref.section.name;
    } else {
      asideEl.innerHTML = items.map(function (a) {
        if (a.slug === slug) {
          return '<li class="is-current"><span aria-current="true">' + esc(a.title) + "</span></li>";
        }
        return '<li><a href="' + articleUrl(a) + '">' + esc(a.title) + "</a></li>";
      }).join("");
    }

    var moreEl = document.querySelector("#section-toc-more");
    if (moreEl && ref) {
      moreEl.setAttribute("href", SITE_BASE + ref.section.url);
    }

    // Siblings from the wider branch — always shown when the current section
    // is thin, so the sidebar never renders as an empty or single-item box.
    if (alone) {
      var extra = ARTICLES.filter(function (a) {
        return a.branch === current.branch && a.slug !== slug;
      }).sort(byDateDesc).slice(0, 5);
      if (extra.length) {
        var branch = branchById[current.branch];
        asideEl.insertAdjacentHTML("afterend",
          '<div class="toc-related">' +
          "<h3>Zobacz też — " + esc(branch ? branch.name : "") + "</h3>" +
          "<ul>" + extra.map(function (a) {
            var r = sectionOf(a);
            return '<li><a href="' + articleUrl(a) + '">' + esc(a.title) + "</a>" +
              (r ? '<span class="toc-related-sec">' + esc(r.section.name) + "</span>" : "") +
              "</li>";
          }).join("") + "</ul></div>");
      }
    }
  }

  buildNav();
  buildHome();
  buildListing();
  buildArticleAside();
})();
