/* ============================================================
   JEDYNE miejsce, które edytujesz przy dodawaniu artykułu.
   1. Dodaj wpis na GÓRZE listy (najnowsze pierwsze).
   2. Utwórz plik /artykuly/<slug>.html (kopiując istniejący).

   STRUKTURA MENU
   --------------
   Serwis dzieli się na dwie gałęzie (BRANCHES), każda z własnymi działami:

   sily-zbrojne      → wg etapu służby:  przed / w-trakcie / po-zakonczeniu
   sluzby-mundurowe  → wg formacji:      policja / straz-graniczna /
                                         sluzba-wiezienna / skw-sww / inne

   Każdy artykuł ma:
     branch  – id gałęzi (musi pasować do BRANCHES)
     section – id działu w tej gałęzi (musi pasować do sections danej gałęzi)

   Blok "Najnowsze artykuły" na stronie głównej bierze artykuły o najnowszej
   dacie — nie trzeba nic dodatkowo oznaczać.
   ============================================================ */

const BRANCHES = [
  {
    id: "sily-zbrojne",
    name: "Siły zbrojne",
    url: "dzialy/sily-zbrojne.html",
    intro: "Prawa i obowiązki żołnierzy zawodowych na każdym etapie służby — od rekrutacji, przez przebieg kariery, po zaopatrzenie emerytalne.",
    sections: [
      {
        id: "przed",
        name: "Przed rozpoczęciem służby",
        url: "dzialy/sily-zbrojne-przed.html",
        intro: "Rekrutacja, kwalifikacja wojskowa, wymogi formalne i zdrowotne oraz przebieg powołania do zawodowej służby wojskowej.",
      },
      {
        id: "w-trakcie",
        name: "W trakcie służby",
        url: "dzialy/sily-zbrojne-w-trakcie.html",
        intro: "Przebieg służby żołnierza zawodowego: opinie służbowe, świadczenia, wypadki na służbie, odpowiedzialność dyscyplinarna.",
      },
      {
        id: "po-zakonczeniu",
        name: "Po zakończeniu służby",
        url: "dzialy/sily-zbrojne-po-zakonczeniu.html",
        intro: "Zwolnienie ze służby, zaopatrzenie emerytalne żołnierzy, odprawy i świadczenia należne po odejściu z wojska.",
      },
    ],
  },
  {
    id: "sluzby-mundurowe",
    name: "Służby mundurowe",
    url: "dzialy/sluzby-mundurowe.html",
    intro: "Poradniki dla funkcjonariuszy służb mundurowych — z podziałem na formacje, z uwzględnieniem odrębnych pragmatyk służbowych.",
    sections: [
      {
        id: "policja",
        name: "Policja",
        url: "dzialy/policja.html",
        intro: "Służba w Policji: nawiązanie i rozwiązanie stosunku służbowego, postępowania dyscyplinarne, opiniowanie, świadczenia.",
      },
      {
        id: "straz-graniczna",
        name: "Straż Graniczna",
        url: "dzialy/straz-graniczna.html",
        intro: "Stosunek służbowy funkcjonariusza Straży Granicznej — powołanie, przebieg służby, zwolnienie i tryb odwoławczy.",
      },
      {
        id: "sluzba-wiezienna",
        name: "Służba Więzienna",
        url: "dzialy/sluzba-wiezienna.html",
        intro: "Prawa i obowiązki funkcjonariuszy Służby Więziennej: pragmatyka służbowa, dyscyplinarki, świadczenia i zwolnienie ze służby.",
      },
      {
        id: "skw-sww",
        name: "SKW i SWW",
        url: "dzialy/skw-sww.html",
        intro: "Służba w Służbie Kontrwywiadu Wojskowego i Służbie Wywiadu Wojskowego — specyfika stosunku służbowego i postępowań.",
      },
      {
        id: "inne",
        name: "Inne służby",
        url: "dzialy/inne-sluzby.html",
        intro: "ABW, AW, CBA, SOP, PSP, KAS i pozostałe formacje — zagadnienia wspólne dla funkcjonariuszy służb mundurowych.",
      },
    ],
  },
];

const ARTICLES = [
  {
    slug: "zwolnienie-ze-sluzby-w-policji-odwolanie",
    title: "Zwolnienie ze służby w Policji — jak i kiedy się odwołać?",
    branch: "sluzby-mundurowe",
    section: "policja",
    date: "2026-07-10",
    excerpt: "Rozkaz personalny o zwolnieniu ze służby nie zamyka drogi do obrony. Terminy, tryb odwołania i najczęstsze błędy formalne po stronie przełożonych.",
  },
  {
    slug: "swiadczenie-mieszkaniowe-zolnierza-zawodowego",
    title: "Świadczenie mieszkaniowe żołnierza zawodowego — komu przysługuje?",
    branch: "sily-zbrojne",
    section: "w-trakcie",
    date: "2026-07-06",
    excerpt: "Zakwaterowanie, świadczenie mieszkaniowe albo odprawa mieszkaniowa — co wybrać i jakie warunki trzeba spełnić według ustawy o zakwaterowaniu Sił Zbrojnych.",
  },
  {
    slug: "emerytura-mundurowa-po-15-i-25-latach",
    title: "Emerytura mundurowa — zasady po 15 i po 25 latach służby",
    branch: "sily-zbrojne",
    section: "po-zakonczeniu",
    date: "2026-06-28",
    excerpt: "Dwa reżimy emerytalne funkcjonariuszy i żołnierzy: kto podlega staremu systemowi, kto nowemu i jak liczy się wysokość świadczenia.",
  },
  {
    slug: "postepowanie-dyscyplinarne-prawa-obwinionego",
    title: "Postępowanie dyscyplinarne — jakie prawa ma obwiniony funkcjonariusz?",
    branch: "sluzby-mundurowe",
    section: "policja",
    date: "2026-06-20",
    excerpt: "Prawo do obrońcy, wgląd w akta, składanie wniosków dowodowych — uprawnienia obwinionego, o których warto pamiętać od pierwszego przesłuchania.",
  },
  {
    slug: "odszkodowanie-za-wypadek-na-sluzbie",
    title: "Wypadek na służbie — odszkodowanie i świadczenia dla mundurowych",
    branch: "sily-zbrojne",
    section: "w-trakcie",
    date: "2026-06-12",
    excerpt: "Jednorazowe odszkodowanie, renta inwalidzka, uszczerbek na zdrowiu — jak wygląda procedura po wypadku pozostającym w związku ze służbą.",
  },
  {
    slug: "opinia-sluzbowa-zolnierza-jak-sie-odwolac",
    title: "Negatywna opinia służbowa żołnierza — tryb odwoławczy krok po kroku",
    branch: "sily-zbrojne",
    section: "w-trakcie",
    date: "2026-06-05",
    excerpt: "Opinia służbowa wpływa na przebieg kariery i może prowadzić do zwolnienia. Jak i w jakim terminie wnieść odwołanie do wyższego przełożonego.",
  },
  {
    slug: "powolanie-do-zawodowej-sluzby-wojskowej",
    title: "Powołanie do zawodowej służby wojskowej — wymogi i przebieg naboru",
    branch: "sily-zbrojne",
    section: "przed",
    date: "2026-05-28",
    excerpt: "Kto może zostać żołnierzem zawodowym, jak wygląda postępowanie rekrutacyjne i co zrobić, gdy decyzja o odmowie powołania jest niekorzystna.",
  },
  {
    slug: "sluzba-w-strazy-granicznej-stosunek-sluzbowy",
    title: "Służba w Straży Granicznej — nawiązanie i ustanie stosunku służbowego",
    branch: "sluzby-mundurowe",
    section: "straz-graniczna",
    date: "2026-05-20",
    excerpt: "Przyjęcie do Straży Granicznej, mianowanie na stopnie, przesłanki zwolnienia ze służby i droga odwoławcza od rozkazu personalnego.",
  },
  {
    slug: "sluzba-wiezienna-odpowiedzialnosc-dyscyplinarna",
    title: "Służba Więzienna — odpowiedzialność dyscyplinarna funkcjonariusza",
    branch: "sluzby-mundurowe",
    section: "sluzba-wiezienna",
    date: "2026-05-14",
    excerpt: "Przewinienie dyscyplinarne w SW, przebieg postępowania, katalog kar i uprawnienia obwinionego funkcjonariusza Służby Więziennej.",
  },
  {
    slug: "skw-i-sww-specyfika-sluzby",
    title: "SKW i SWW — specyfika służby w wojskowych służbach specjalnych",
    branch: "sluzby-mundurowe",
    section: "skw-sww",
    date: "2026-05-08",
    excerpt: "Odrębności stosunku służbowego w SKW i SWW: poświadczenia bezpieczeństwa, ograniczenia jawności postępowań i tryb zaskarżania decyzji.",
  },
  {
    slug: "poswiadczenie-bezpieczenstwa-cofniecie-odwolanie",
    title: "Cofnięcie poświadczenia bezpieczeństwa — jak się bronić?",
    branch: "sluzby-mundurowe",
    section: "inne",
    date: "2026-05-02",
    excerpt: "Odmowa lub cofnięcie poświadczenia bezpieczeństwa potrafi zakończyć karierę w służbie. Postępowanie odwoławcze i kontrola sądowoadministracyjna.",
  },
];
