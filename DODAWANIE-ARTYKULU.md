# Jak dodać artykuł

Nie trzeba niczego instalować ani uruchamiać. Wystarczy dodać **jeden plik**
przez stronę GitHuba — reszta (menu, listy działów, spisy treści, sitemap)
zrobi się sama.

---

## Krok po kroku (przez przeglądarkę)

1. Wejdź na repozytorium → katalog **`_artykuly`**.
2. Kliknij **Add file → Create new file**.
3. Nazwij plik: `nazwa-artykulu.md`
   — małe litery, myślniki zamiast spacji, bez polskich znaków.
   **Ta nazwa staje się adresem strony**, np. `emerytura-mundurowa.md`
   → `prawomundurowych.pl/artykuly/emerytura-mundurowa.html`
4. Wklej szablon (niżej) i uzupełnij.
5. Na dole strony: **Commit changes**.

Po ok. 1–2 minutach artykuł jest na stronie.

---

## Szablon

```markdown
---
title: "Tytuł artykułu — pełne brzmienie"
seo_title: "Krótszy tytuł do Google"
date: 2026-08-15
sections: [policja]
summary: "Jedno–dwa zdania streszczenia. Pojawia się na listach artykułów i w Google."
---

Pierwszy akapit — wprowadzenie do tematu.

## Pierwszy śródtytuł

Treść akapitu. **Pogrubienie** robi się dwiema gwiazdkami, *kursywa* jedną.

## Drugi śródtytuł

Lista wypunktowana:

- pierwszy punkt,
- drugi punkt,
- trzeci punkt.

Lista numerowana:

1. pierwszy krok,
2. drugi krok,
3. trzeci krok.

> Tak wygląda wyróżniony cytat lub ważna uwaga.
```

---

## Pola nagłówka (między `---`)

| Pole        | Obowiązkowe | Opis |
|-------------|-------------|------|
| `title`     | tak | Pełny tytuł w cudzysłowie. Wyświetla się jako nagłówek na stronie. |
| `seo_title` | nie | Krótszy wariant (do 60 znaków) trafiający do wyników Google. Gdy go brak, używany jest `title`. |
| `date`      | tak | Format `RRRR-MM-DD`. Decyduje o kolejności („Najnowsze artykuły"). |
| `sections`  | tak | Lista działów w nawiasach kwadratowych — patrz niżej. |
| `summary`   | tak | Streszczenie na listy artykułów i do opisu w Google. |

### Dlaczego dwa tytuły?

Google pokazuje w wynikach około **60 znaków** tytułu — dłuższe są ucinane
w połowie słowa. Pełne, opisowe tytuły dobrze czyta się na stronie, ale
w wyszukiwarce bywają za długie. Dlatego:

- `title` — pełny, widoczny jako nagłówek artykułu,
- `seo_title` — skrót, który zmieści się w wynikach wyszukiwania.

Jeśli tytuł artykułu i tak jest krótki, `seo_title` można pominąć.

Opis (`summary`) przycinany jest automatycznie do ~157 znaków w meta
description, więc może być dłuższy — na listach artykułów czyta się lepiej.

---

## Działy (`sections`) — najważniejsze pole

Artykuł może należeć do **jednego lub kilku** działów, także z różnych gałęzi.
Wystarczy wypisać identyfikatory:

```yaml
sections: [policja]                              # tylko Policja
sections: [w-trakcie, policja]                   # żołnierze i policjanci
sections: [policja, straz-graniczna, w-trakcie]  # trzy działy naraz
```

**Gałęzi (Siły zbrojne / Służby mundurowe) NIE podaje się** — wylicza się sama
z działu. Artykuł pojawi się automatycznie na wszystkich odpowiednich stronach
i w odpowiednich rozwijanych menu.

Pierwszy dział z listy jest **wiodący** — jego nazwa pojawia się nad tytułem
artykułu, i to jego spis treści widać z boku. Warto więc na pierwszym miejscu
wpisać dział najlepiej pasujący do tematu.

### Dostępne identyfikatory

**Siły zbrojne**

| id | dział |
|----|-------|
| `przed` | Przed rozpoczęciem służby |
| `w-trakcie` | W trakcie służby |
| `po-zakonczeniu` | Po zakończeniu służby |
| `karne-dyscyplinarne` | Sprawy karne i dyscyplinarne |
| `dla-cywila` | Dla cywila (obowiązki wojskowe osób niebędących żołnierzami) |

**Służby mundurowe**

| id | dział |
|----|-------|
| `policja` | Policja |
| `straz-graniczna` | Straż Graniczna |
| `sluzba-wiezienna` | Służba Więzienna |
| `skw-sww` | SKW i SWW |
| `abw` | ABW |
| `inne` | Inne służby (Straż Miejska, SOP, SOK, PSP, KAS, Służba Leśna) |

> Ta sama lista, w formie do skopiowania, jest w pliku **`kategorie.json`**
> w katalogu głównym repozytorium.

---

## Publikacja z wyprzedzeniem (harmonogram)

Artykuł można przygotować dziś, a opublikować w wybranym dniu.
Wystarczy wpisać **przyszłą datę** w polu `date`:

```yaml
date: 2026-09-15
```

Taki artykuł można spokojnie wypchnąć do repozytorium — **do 15 września
nie będzie widoczny na stronie**. Nie pojawi się w menu, na listach
działów ani w mapie strony. Wejdzie sam, w dniu wskazanym w dacie.

Jak to działa: w `_config.yml` ustawione jest `future: false`, a automat
(GitHub Actions) co godzinę prosi GitHuba o przebudowę strony i wpuszcza
to, co dojrzało.

**Artykuł pojawi się w ciągu kilku godzin od północy w dniu wskazanym
w dacie — nie co do minuty.** GitHub nie gwarantuje punktualności zadań
cyklicznych: przy dużym obciążeniu uruchomienie potrafi się opóźnić
o kilka godzin. Dlatego automat chodzi co godzinę — żeby ewentualne
opóźnienie kosztowało godziny, a nie cały dzień.

Jeśli tekst ma się ukazać dokładnie o wyznaczonej porze, trzeba
uruchomić publikację ręcznie (poniżej).

**Chcesz opublikować coś od razu, nie czekając na automat?**
Actions → „Publikacja zaplanowanych artykulow" → *Run workflow*.
Strona przebuduje się w ciągu 1–2 minut.

**Chcesz przesunąć termin?** Zmień datę i wypchnij ponownie.

---

## Formatowanie treści (Markdown)

| Zapis | Efekt |
|-------|-------|
| `## Tekst` | śródtytuł (duży) |
| `### Tekst` | śródtytuł (mniejszy) |
| `**tekst**` | **pogrubienie** |
| `*tekst*` | *kursywa* |
| `- punkt` | lista wypunktowana |
| `1. punkt` | lista numerowana |
| `> tekst` | wyróżniony cytat |
| `[opis](https://adres)` | link |

Akapity oddziela się **pustą linią**. Pojedyncze złamanie wiersza nie tworzy
nowego akapitu.

---

## Dodanie nowego działu

Rzadsza operacja, wymaga dwóch kroków:

1. W pliku **`_data/dzialy.yml`** dopisz wpis w `sections` właściwej gałęzi
   (`id`, `label`, `intro`).
2. W katalogu **`dzialy/`** utwórz plik `nazwa.html` o treści:

   ```
   ---
   layout: dzial
   section: <id-nowego-dzialu>
   ---
   ```

Menu, liczniki i listy zaktualizują się same. Warto też dopisać nowy dział
do `kategorie.json`, żeby ściąga pozostała aktualna.

---

## Częste pytania

**Czy mogę edytować opublikowany artykuł?**
Tak — otwórz plik w `_artykuly/`, kliknij ikonę ołówka, popraw, zapisz.

**Jak usunąć artykuł?**
Otwórz plik → menu „…" → **Delete file** → Commit.

**Zmieniłem nazwę pliku — co z linkami?**
Zmiana nazwy zmienia adres strony. Jeśli artykuł był już w Google, lepiej
nazwy nie zmieniać.

**Czy trzeba aktualizować `sitemap.xml`?**
Nie. Generuje się automatycznie.

**Artykuł się nie pojawił.**
Sprawdź: czy plik jest w `_artykuly/`, ma rozszerzenie `.md`, a nagłówek
zaczyna się i kończy linią `---`. Najczęstszy błąd to literówka w `sections`
albo brak cudzysłowu w `title`.
