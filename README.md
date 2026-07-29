# prawomundurowych.pl

Poradnik prawny dla żołnierzy i funkcjonariuszy — statyczna strona pod GitHub Pages.

## Struktura

```
index.html                  strona główna (lead + najnowsze + losowe polecane)
aktualnosci.html            wszystkie artykuły wg daty publikacji
dzialy/*.html               strony działów i poddziałów
artykuly/*.html             artykuły (pełna treść w HTML — SEO)
data/articles.js            JEDYNE źródło: struktura menu + lista artykułów
js/site.js                  dropdowny + renderowanie list
styles.css                  wspólne style
```

## Struktura menu

Serwis dzieli się na dwie gałęzie, każda z własnymi działami:

| Gałąź (`branch`)   | Podział wg | Działy (`section`)                                                     |
|--------------------|------------|------------------------------------------------------------------------|
| `sily-zbrojne`     | etap służby | `przed`, `w-trakcie`, `po-zakonczeniu`                                 |
| `sluzby-mundurowe` | formacja    | `policja`, `straz-graniczna`, `sluzba-wiezienna`, `skw-sww`, `inne`    |

Pozostałe pozycje w menu to zwykłe linki (bez rozwijania):

- **Aktualności** → `aktualnosci.html` (najnowsze artykuły, bez osobnego typu treści)
- **Pomoc prawna** → `https://adwokatmodzelewski.pl/`

## Dodanie artykułu

1. Skopiuj dowolny plik z `artykuly/` jako `artykuly/<slug>.html`, podmień tytuł,
   meta description, canonical, breadcrumb działu, datę i treść.
2. W artykule ustaw `data-current="<slug>"` na `<ol id="section-toc">` oraz link
   `#section-toc-more` na stronę właściwego działu — na tej podstawie renderuje się
   boczny spis treści działu.
3. Dodaj wpis na górze listy `ARTICLES` w `data/articles.js` (ten sam slug!),
   z polami `branch` i `section` zgodnymi z tabelą powyżej.
4. Dodaj URL do `sitemap.xml`.

„Aktualności" nie wymagają oznaczania — to po prostu artykuły o najnowszej dacie.

## Dodanie nowego działu

Dopisz wpis do `sections` właściwej gałęzi w `BRANCHES` (`data/articles.js`)
i utwórz odpowiadającą mu stronę w `dzialy/` — wystarczy skopiować istniejącą
i podmienić `data-branch` / `data-section` w `<div id="article-listing">`.

## Uwaga

- Teksty artykułów to **szkice do weryfikacji merytorycznej** przez Piotra —
  każdy ma znacznik `[SZKIC...]` na początku treści do usunięcia po akceptacji.
- Link do kancelarii w CTA/stopce wskazuje `https://adwokatmodzelewski.pl/#kontakt` —
  podmień, jeśli kotwica kontaktu jest inna.

## Deploy

GitHub Pages z gałęzi `main`, katalog `/`. Plik `CNAME` już jest.
