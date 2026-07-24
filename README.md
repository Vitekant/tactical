# prawomundurowych.pl

Poradnik prawny dla żołnierzy i funkcjonariuszy — statyczna strona pod GitHub Pages.

## Struktura

```
index.html                  strona główna (wyróżniony + najnowsze)
kategorie/*.html            strony kategorii
artykuly/*.html             artykuły (pełna treść w HTML — SEO)
data/articles.js            JEDYNA lista artykułów (menu, główna, kategorie)
js/site.js                  dropdowny + renderowanie list
styles.css                  wspólne style
```

## Dodanie artykułu

1. Skopiuj dowolny plik z `artykuly/` jako `artykuly/<slug>.html`, podmień tytuł,
   meta description, canonical, kategorię, datę i treść.
2. Dodaj wpis na górze listy `ARTICLES` w `data/articles.js` (ten sam slug!).
3. Dodaj URL do `sitemap.xml`.
4. `promoted: true` = artykuł ląduje w dużym wyróżnieniu na stronie głównej
   (brany jest pierwszy promowany z listy).

## Uwaga

- Teksty artykułów to **szkice do weryfikacji merytorycznej** przez Piotra —
  każdy ma znacznik `[SZKIC...]` na początku treści do usunięcia po akceptacji.
- Link do kancelarii w CTA/stopce wskazuje `https://adwokatmodzelewski.pl/` —
  podmień, jeśli domena główna jest inna.

## Deploy

GitHub Pages z gałęzi `main`, katalog `/`. Plik `CNAME` już jest.
