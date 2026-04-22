# CLAUDE.md – pravidla pro práci na projektu 2048

## Zdroj pravdy

**SPEC.md** je jediný závazný popis chování hry. Před každou implementací si ho přečti a řiď se jím.
Pokud je něco ve SPEC.md nejednoznačné nebo chybí, **zeptej se, neimprovizuj**.
Neimplementuj nic, co SPEC.md neobsahuje, bez předchozího souhlasu.

---

## Technologie

- Vanilla **HTML + CSS + JavaScript** – žádné frameworky (React, Vue, Svelte apod.).
- Oddělené soubory: `index.html`, `styles.css`, `game.js` (případně další rozumně pojmenované JS soubory).
- Žádné build tooly (Webpack, Vite, …), žádné npm závislosti.
- Hra musí jít spustit dvojklikem na `index.html` – žádný lokální server není potřeba.

---

## Pravidla pro práci

- Pracuj **po malých krocích** – jedna funkce nebo jeden feature na jeden commit.
- Před každým commitem **sděl mi, co jsi udělal**, a počkej, až si to ověřím v prohlížeči.
- Commit messages piš **anglicky, v imperativu** (např. `Add empty grid rendering`, `Handle left swipe merge`).
- Neimplementuj nic mimo SPEC.md bez předchozího dotazu.
- Pokud něco není ve SPEC.md jasné, **zeptej se** – nedomýšlej si.

---

## Pravidla pro kód

- Proměnné a funkce pojmenovávej **smysluplně a anglicky** (konzistentní s commit messages a konvencemi oboru).
- Komentáře přidávej **jen tam, kde kód sám o sobě nestačí** – skrytý invariant, netriviální workaround, neočekávané chování.
- **Žádné nepoužité proměnné**, žádný zakomentovaný mrtvý kód.

---

## Workflow pro každý úkol

Podle povahy úkolu zvol jeden ze dvou režimů:

**Lehký režim** (výchozí, pro většinu úkolů):
1. Popiš stručně (1-3 řádky) plán – co uděláš a proč. Žádné dlouhé plánování.
2. Rovnou implementuj.
3. Shrň, co jsi udělal, a čekej na mou kontrolu v prohlížeči.
4. Po schválení navrhni commit message a commitni.

**Těžký režim** (pro rizikové nebo architektonické úkoly):
Použij, když jde o: víc souborů naráz, refaktoring, breaking change signatur, změnu datového modelu, neobvyklou bibliotéku, bezpečnostně citlivou věc.
1. Napiš podrobný plán včetně variant, trade-offs a zdůvodnění.
2. Čekej na schválení plánu.
3. Implementuj.
4. Shrň a čekej na kontrolu.
5. Commitni po schválení.

**Rozhodnutí, který režim použít, je na tobě.** Pokud si nejsi jistý, zvol těžký. Pokud mi jednou za čas projde něco, co jsi měl plánovat podrobněji, řeknu ti to a pro příště se přizpůsobíš.

---

## Komunikace se mnou

- Odpovídej stručně. Shrnutí po implementaci: 3-5 odrážek. Žádné dlouhé preambule.
- Commit messages navrhuj sám, neptej se mě. Jen je ukaž před commitnutím.
- Když narazíš na rozhodnutí, které není v SPEC.md (barvy, pojmenování, drobné UX), vyber podle zdravého rozumu a zmiň to v shrnutí – nezdržuj se dotazem.
- Naopak u věcí, které SPEC mění nebo významně interpretují, vždy ptej se předem.

---

## Meta

- Já (uživatelka) mám paralelně běžící konverzaci s Claude na claude.ai, která zná celý projekt. Občas jí použiju na architektonické otázky nebo review kódu. Nech mě to řídit, ty se soustřeď na implementaci v repu.

---

## Čeho se vyvarovat

- **Nesahej na kód, který jsi neměl/a za úkol upravit** – ani kdybys ho mohl/a „zlepšit".
- **Nepřidávej features, které jsem nezadala** – ani jako bonus.
- **Nedělej velké refaktoringy v rámci feature commitu** – refaktoring je vždy samostatný commit.
- **Nepoužívej knihovny z CDN bez mého souhlasu.**
- **Nevymýšlej si funkce webových API** – když si nejsi jistý/á, řekni to.
- Pokud se při implementaci rozhodneš odchýlit od SPEC.md (jiné barvy, jiná technologie, jiná struktura, cokoli), oznam to **explicitně PŘED implementací** v plánu – ne až po v shrnutí. Uveď, v čem se lišíš a proč.

---

## Testování

- Po každé změně spusť hru v prohlížeči a ověř chování ručně.
- U netriviálních změn zmiň edge case scénáře, které bys testoval/a (plná mřížka, jediná dlaždice, slučování čtyř stejných v řadě apod.).
- Před commitem přemýšlej, jaký test by změnu pokryl – i když teď testy nepíšeme.
