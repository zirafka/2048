# Specifikace hry 2048 (vlastní varianta)

## Přehled

Webová hra založená na klasickém 2048, ale s upravenými pravidly a vizuálním stylem.
Hrací plocha je mřížka 4×4. Hráč posouvá dlaždice čtyřmi směry; při nárazu dvou dlaždic se stejnou
hodnotou se slučují v dlaždici dvojnásobnou.

## Cíl hry

**Vyplnit celou hrací plochu tak, aby každé z 16 políček obsahovalo jinou mocninu dvou – konkrétně
hodnoty 2¹ až 2¹⁶** (2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536),
každou právě jednou.

Dosažení tohoto stavu = výhra.

## Pravidla pohybu a slučování

- Hráč volí jeden ze čtyř směrů (nahoru, dolů, vlevo, vpravo).
- Všechny dlaždice se posunou ve zvoleném směru tak daleko, jak to jde.
- Dvě sousední dlaždice se stejnou hodnotou se při nárazu sloučí v jednu s dvojnásobnou hodnotou.
- **Jedna dlaždice se může v rámci jednoho tahu sloučit jen jednou.** Tj. sloupec `[2, 2, 2, 2]`
  po stisku "dolů" dá `[0, 0, 4, 4]`, nikoli `[0, 0, 0, 8]`.
- **Tah, který nezmění stav mřížky, se nepočítá** – nepřidá se nová dlaždice, neuloží se do historie.

## Spawnování dlaždic

- **Na začátku hry** jsou na náhodných pozicích umístěny dvě dlaždice.
- **Po každém platném tahu** (který změnil stav mřížky) se na náhodné prázdné pole přidá nová dlaždice.
- **Hodnoty nových dlaždic:** 2 s pravděpodobností 90 %, 4 s pravděpodobností 10 %.

## Skóre

- Při každém sloučení dvou dlaždic se ke skóre přičte **hodnota vzniklé dlaždice**
  (např. sloučení dvou osmiček → +16 bodů).
- Skóre se zobrazuje v horní části obrazovky.
- Skóre je součástí uloženého stavu.

## Konec hry

- Pokud **nelze provést žádný tah** (žádný směr nezmění stav mřížky), hra tiše stojí.
  Žádná zpráva, žádný overlay, žádný zásah do UI.
- Hráč se může kdykoli vrátit tlačítkem Zpět a zkusit jinou cestu.
- **Zpráva se zobrazí pouze při splnění výherní podmínky** (všech 16 unikátních mocnin).

## Výhra

- Po splnění výherní podmínky se zobrazí gratulační overlay.
- Po zavření overlaye **hra zůstane ve výherním stavu** (aby se hráč mohl pokochat).
- Po výhře se v UI **objeví tlačítko "Nová hra"**, které hru resetuje. Před výhrou toto tlačítko
  neexistuje (aby nedošlo k náhodnému smazání rozehrané partie).

## Undo (Zpět)

- **Neomezená historie tahů** – hráč se může vrátit na samý začátek hry.
- Tlačítko **Zpět** s počtem dostupných kroků v závorce, např. `Zpět (23)`.
- Klávesová zkratka **Ctrl+Z**.
- Undo vrací **kompletní stav** (mřížka, skóre), nikoli jen posun dlaždic.
- Undo historie je součástí uloženého stavu – přenáší se mezi zařízeními.

## Ovládání

- **Klávesnice:** šipky ↑ ↓ ← → nebo klávesy W A S D.
- **Mobil:** swipe gesta ve čtyřech směrech.
- **Undo:** tlačítko "Zpět" nebo klávesová zkratka Ctrl+Z.
- Při swipování je **zakázán scroll stránky i zoom**, aby nedocházelo k nechtěným gestům při hraní.

## Vizuální design

### Styl dlaždic – šrafování místo barev

Místo tradičních barevných dlaždic jsou použity **černobílé šrafované vzory**. Hustota šrafování
roste s hodnotou dlaždice ve čtyřech skupinách:

| Hodnoty           | Styl šrafování                 |
|-------------------|--------------------------------|
| 2                 | bez šrafování                  |
| 4, 8, 16          | jednosměrné šrafování (45°)    |
| 32, 64, 128, 256  | křížové šrafování              |
| 512, 1024, 2048, 4096 | trojité šrafování          |
| 8192, 16384, 32768, 65536 | čtyřnásobné šrafování  |

Každá hodnota v rámci skupiny má vyšší hustotu šrafování než předchozí (postupně houstne).

**Důvod:** Kontrast je čistě jasový, takže hra zůstane čitelná i pod barevným filtrem displeje.

### Barvy ploch

- **Pozadí stránky:** světle šedé
- **Pozadí hrací plochy (mřížky):** tmavě šedé
- **Prázdná políčka:** šedé pozadí
- **Políčka s číslem:** bílé pozadí + šrafování + text s hodnotou

### Text na dlaždici

- **Barva textu:** černá.
- **Okraj textu:** bílý (text-stroke nebo bílý stín), aby se číslo vizuálně oddělilo od šrafovaného
  pozadí a zůstalo čitelné i v místech, kde šrafy procházejí přes text.

### Velikost mřížky

- Responzivní – velikost dlaždic se přizpůsobí velikosti obrazovky.
- Na desktopu velikost obvyklá u 2048 her (cca 400–500 px šířka mřížky).
- Na mobilu mřížka zabere většinu šířky obrazovky s malými okraji.

## Ukládání stavu

### Cloud přes JSONBin.io

- Hra má tlačítka **Uložit** a **Načíst**, která pracují s cloudovým úložištěm JSONBin.io.
- Ukládá se **celý stav hry:** aktuální mřížka, skóre, kompletní undo historie.
- Používá se **jeden pevný bin** – při každém uložení se přepíše.
- Při načtení se obnoví stav včetně undo historie (hráč může i po načtení dělat undo tahy).

### Bezpečnost – vědomé rozhodnutí

- API klíč JSONBin.io bude umístěn přímo v JavaScriptu.
- **Toto je vědomé rozhodnutí** pro osobní projekt: hra má jen jednoho uživatele, riziko zneužití
  je nízké, přínosy (jednoduchost, rychlé spuštění) převažují.
- V reálné produkční aplikaci by klíč patřil na server (tenký backend), ne do klientského kódu.

## Technologie

- **HTML + CSS + vanilla JavaScript** – žádné frameworky.
- Jeden HTML soubor, oddělené CSS a JS soubory.
- Žádné build tooly, žádné npm závislosti – stačí otevřít `index.html` v prohlížeči.

## Out of scope (nedělá se)

- Zvuky, hudba.
- Animace slučování a posunů (statické vykreslení po každém tahu stačí).
  *Poznámka: Pokud by byly animace jednoduché, je možné je přidat jako bonus.*
- Žebříček skóre, účty, přihlašování.
- Vícejazyčná lokalizace (hra bude česky).
- Offline / PWA funkcionalita.
