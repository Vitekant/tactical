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

| Gałąź              | Podział wg  | Działy                                                                            |
|--------------------|-------------|-----------------------------------------------------------------------------------|
| `sily-zbrojne`     | etap służby | `przed`, `w-trakcie`, `po-zakonczeniu`, `karne-dyscyplinarne`, `dla-cywila`       |
| `sluzby-mundurowe` | formacja    | `policja`, `straz-graniczna`, `sluzba-wiezienna`, `skw-sww`, `abw`, `inne`        |

**Artykuł podaje tylko działy**, np. `sections: [w-trakcie, policja]`.
Gałąź wylicza się automatycznie, a artykuł może należeć do kilku działów —
także z różnych gałęzi. Pojawi się wtedy na wszystkich odpowiednich listach.

Pierwszy dział z listy jest **wiodący**: jego nazwa trafia nad tytuł artykułu
i to jego spis treści widać z boku.

### Tytuły w wynikach wyszukiwania

Google pokazuje ok. 60 znaków tytułu. Dlatego artykuł ma dwa pola:

- `title` — pełny tytuł, widoczny jako nagłówek na stronie,
- `seo_title` — krótszy wariant trafiający do `<title>` (opcjonalny;
  gdy go brak, używany jest `title`).

Meta description przycinana jest automatycznie do ~157 znaków, więc pole
`summary` może być dłuższe — na listach artykułów czyta się lepiej.

## Dodanie nowego działu

1. Dopisz wpis do `sections` właściwej gałęzi w `_data/dzialy.yml`
   (pola: `id`, `page`, `label`, `intro`).
2. Utwórz plik `dzialy/<page>.html` o treści:

   ```
   ---
   layout: dzial
   section: <id-nowego-dzialu>
   ---
   ```

3. Dopisz dział do `kategorie.json`, żeby ściąga dla autora pozostała aktualna.

> `id` to identyfikator używany w polu `sections` artykułów, `page` to nazwa
> pliku w `dzialy/`. Trzymamy je osobno, bo adresy stron pochodzą sprzed
> migracji na Jekylla i nie wolno ich zmieniać.

## Testowanie lokalne (opcjonalne)

Nie jest potrzebne do dodawania treści. Jeśli jednak chcesz zobaczyć zmiany
przed publikacją, wystarczy Docker:

```bash
docker run --rm -v "${PWD}:/srv/jekyll" -p 4000:4000 jekyll/jekyll:4.2.2 \
  jekyll serve --host 0.0.0.0
```

Strona pod `http://localhost:4000`.

## SEO — stan obecny

Serwis jest uruchomiony i indeksowany (`preview: false` w `_config.yml`).
Zrobione:

- unikalny `title` i `description` na każdej stronie, `canonical`, `lang="pl"`,
  dokładnie jeden `<h1>`, tytuły mieszczące się w wynikach wyszukiwania,
- `sitemap.xml` i `robots.txt` — sitemap generuje się sam, z datami `lastmod`,
- dane strukturalne JSON-LD: `Article` (wpisy), `CollectionPage` + `ItemList`
  (działy), `WebSite` + `LegalService` (strona główna) oraz `BreadcrumbList`
  wszędzie — to z niej Google buduje ścieżkę nawigacji w wynikach,
- Open Graph i Twitter Card z obrazkiem `assets/og-image.jpg`,
- favikona (SVG + PNG + `favicon.ico`),
- HTTPS z przekierowaniem z `http://` (Enforce HTTPS w ustawieniach Pages).

Do rozważenia w przyszłości: własne obrazki OG dla pojedynczych wpisów,
schema `FAQPage` w artykułach o strukturze pytań i odpowiedzi oraz
wzajemne linkowanie pokrewnych artykułów między formacjami.

## Deploy

GitHub Pages z gałęzi `main`, katalog `/` (Settings → Pages → Source: main).
Publikacja trwa zwykle 1–2 minuty od pushu.
