# prawomundurowych.pl

Poradnik prawny dla żołnierzy i funkcjonariuszy — strona statyczna
budowana przez **Jekyll** na GitHub Pages.

> **Dodajesz artykuł?** Wszystko opisane jest w [DODAWANIE-ARTYKULU.md](DODAWANIE-ARTYKULU.md).
> W skrócie: dodaj plik `.md` w katalogu `_artykuly/` — reszta zrobi się sama.

## Struktura

```
_artykuly/*.md          TREŚĆ — tu dodajesz artykuły (jedyne, co edytujesz na co dzień)
_data/dzialy.yml        struktura menu: gałęzie i działy (źródło prawdy)
kategorie.json          ściąga z identyfikatorami działów (dla autora)

_layouts/artykul.html   szablon strony artykułu
_layouts/dzial.html     szablon listy artykułów (gałąź i dział)
_includes/              wspólne fragmenty: head, nav, footer, data
dzialy/*.html           puste "zaczepy" — każdy wskazuje branch albo section
index.html              strona główna
styles.css              style
js/site.js              tylko obsługa rozwijanych menu
_config.yml             konfiguracja Jekylla
```

Nie ma katalogu `_site/` w repozytorium — GitHub Pages buduje stronę sam
przy każdym pushu na `main`. Nie trzeba nic instalować lokalnie.

## Jak to działa

**Struktura menu** pochodzi w całości z `_data/dzialy.yml`. Dwie gałęzie:

| Gałąź              | Podział wg  | Działy                                                              |
|--------------------|-------------|---------------------------------------------------------------------|
| `sily-zbrojne`     | etap służby | `przed`, `w-trakcie`, `po-zakonczeniu`                              |
| `sluzby-mundurowe` | formacja    | `policja`, `straz-graniczna`, `sluzba-wiezienna`, `skw-sww`, `inne` |

**Artykuł podaje tylko działy**, np. `sections: [w-trakcie, policja]`.
Gałąź wylicza się automatycznie, a artykuł może należeć do kilku działów —
także z różnych gałęzi. Pojawi się wtedy na wszystkich odpowiednich listach.

Pierwszy dział z listy jest **wiodący**: jego nazwa trafia nad tytuł artykułu
i to jego spis treści widać z boku.

**Adresy stron nie zmieniły się** przy migracji na Jekylla —
`/artykuly/<slug>.html` i `/dzialy/<slug>.html` działają jak wcześniej.

## Testowanie lokalne (opcjonalne)

Nie jest potrzebne do dodawania treści. Jeśli jednak chcesz zobaczyć zmiany
przed publikacją, wystarczy Docker:

```bash
docker run --rm -v "${PWD}:/srv/jekyll" -p 4000:4000 jekyll/jekyll:4.2.2 \
  jekyll serve --host 0.0.0.0
```

Strona pod `http://localhost:4000`.

## Uwaga — przed startem

1. **Odblokuj indeksowanie.** W `_config.yml` zmień `preview: true`
   na `preview: false`. To jedyna zmiana — znika wtedy `noindex` ze
   wszystkich stron (poza 404, która ma zostać nieindeksowana).
2. **Zweryfikuj szkice.** Teksty oznaczone `[SZKIC...]` czekają na
   potwierdzenie podstaw prawnych i terminów.
3. **Zgłoś serwis** w Google Search Console i wyślij
   `https://prawomundurowych.pl/sitemap.xml`.

## SEO — co jest zrobione

- unikalny `title` i `description` na każdej stronie, `canonical`, `lang="pl"`,
  dokładnie jeden `<h1>`,
- `sitemap.xml` i `robots.txt` (sitemap generuje się sam, z datami `lastmod`),
- dane strukturalne JSON-LD: `Article` (wpisy), `CollectionPage` + `ItemList`
  (działy), `WebSite` + `LegalService` (strona główna) oraz `BreadcrumbList`
  wszędzie — to z niej Google buduje ścieżkę nawigacji w wynikach,
- Open Graph i Twitter Card z obrazkiem `assets/og-image.jpg` (podgląd linku
  na Facebooku, LinkedInie, WhatsAppie),
- favikona (SVG + PNG + `favicon.ico`),
- adresy stron nie zmieniły się od czasu migracji na Jekylla.

Zostaje do rozważenia w przyszłości: własne obrazki OG dla pojedynczych
wpisów oraz schema `FAQPage` w artykułach o strukturze pytań i odpowiedzi.

## Deploy

GitHub Pages z gałęzi `main`, katalog `/` (Settings → Pages → Source: main).
Publikacja trwa zwykle 1–2 minuty od pushu.
