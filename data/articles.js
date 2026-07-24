/* ============================================================
   JEDYNE miejsce, które edytujesz przy dodawaniu artykułu.
   1. Dodaj wpis na GÓRZE listy (najnowsze pierwsze).
   2. Utwórz plik /artykuly/<slug>.html (kopiując istniejący).
   Kategorie (id musi pasować): wojsko, policja, emerytury, dyscyplinarne
   promoted: true  -> artykuł trafia na duże wyróżnienie na stronie głównej
                      (brany jest pierwszy promowany z listy)
   ============================================================ */

const CATEGORIES = [
  { id: "wojsko",        name: "Służba wojskowa",            url: "kategorie/sluzba-wojskowa.html" },
  { id: "policja",       name: "Policja i służby",           url: "kategorie/policja-i-sluzby.html" },
  { id: "emerytury",     name: "Emerytury i świadczenia",    url: "kategorie/emerytury-i-swiadczenia.html" },
  { id: "dyscyplinarne", name: "Postępowania dyscyplinarne", url: "kategorie/postepowania-dyscyplinarne.html" },
];

const ARTICLES = [
  {
    slug: "zwolnienie-ze-sluzby-w-policji-odwolanie",
    title: "Zwolnienie ze służby w Policji — jak i kiedy się odwołać?",
    category: "policja",
    date: "2026-07-10",
    excerpt: "Rozkaz personalny o zwolnieniu ze służby nie zamyka drogi do obrony. Terminy, tryb odwołania i najczęstsze błędy formalne po stronie przełożonych.",
    promoted: true,
  },
  {
    slug: "swiadczenie-mieszkaniowe-zolnierza-zawodowego",
    title: "Świadczenie mieszkaniowe żołnierza zawodowego — komu przysługuje?",
    category: "wojsko",
    date: "2026-07-06",
    excerpt: "Zakwaterowanie, świadczenie mieszkaniowe albo odprawa mieszkaniowa — co wybrać i jakie warunki trzeba spełnić według ustawy o zakwaterowaniu Sił Zbrojnych.",
    promoted: false,
  },
  {
    slug: "emerytura-mundurowa-po-15-i-25-latach",
    title: "Emerytura mundurowa — zasady po 15 i po 25 latach służby",
    category: "emerytury",
    date: "2026-06-28",
    excerpt: "Dwa reżimy emerytalne funkcjonariuszy i żołnierzy: kto podlega staremu systemowi, kto nowemu i jak liczy się wysokość świadczenia.",
    promoted: false,
  },
  {
    slug: "postepowanie-dyscyplinarne-prawa-obwinionego",
    title: "Postępowanie dyscyplinarne — jakie prawa ma obwiniony funkcjonariusz?",
    category: "dyscyplinarne",
    date: "2026-06-20",
    excerpt: "Prawo do obrońcy, wgląd w akta, składanie wniosków dowodowych — uprawnienia obwinionego, o których warto pamiętać od pierwszego przesłuchania.",
    promoted: false,
  },
  {
    slug: "odszkodowanie-za-wypadek-na-sluzbie",
    title: "Wypadek na służbie — odszkodowanie i świadczenia dla mundurowych",
    category: "emerytury",
    date: "2026-06-12",
    excerpt: "Jednorazowe odszkodowanie, renta inwalidzka, uszczerbek na zdrowiu — jak wygląda procedura po wypadku pozostającym w związku ze służbą.",
    promoted: false,
  },
  {
    slug: "opinia-sluzbowa-zolnierza-jak-sie-odwolac",
    title: "Negatywna opinia służbowa żołnierza — tryb odwoławczy krok po kroku",
    category: "wojsko",
    date: "2026-06-05",
    excerpt: "Opinia służbowa wpływa na przebieg kariery i może prowadzić do zwolnienia. Jak i w jakim terminie wnieść odwołanie do wyższego przełożonego.",
    promoted: false,
  },
];
