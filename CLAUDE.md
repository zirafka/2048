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

1. Přečti si relevantní část SPEC.md.
2. Pokud je v SPEC.md nejasnost, zeptej se **před začátkem práce**.
3. Popiš krátce plán – co uděláš a jaké soubory změníš.
4. Implementuj.
5. Oznam, co jsi udělal/a, a čekej na mou kontrolu v prohlížeči.
6. Po schválení navrhni commit message a commitni.

---

## Čeho se vyvarovat

- **Nesahej na kód, který jsi neměl/a za úkol upravit** – ani kdybys ho mohl/a „zlepšit".
- **Nepřidávej features, které jsem nezadala** – ani jako bonus.
- **Nedělej velké refaktoringy v rámci feature commitu** – refaktoring je vždy samostatný commit.
- **Nepoužívej knihovny z CDN bez mého souhlasu.**
- **Nevymýšlej si funkce webových API** – když si nejsi jistý/á, řekni to.

---

## Testování

- Po každé změně spusť hru v prohlížeči a ověř chování ručně.
- U netriviálních změn zmiň edge case scénáře, které bys testoval/a (plná mřížka, jediná dlaždice, slučování čtyř stejných v řadě apod.).
- Před commitem přemýšlej, jaký test by změnu pokryl – i když teď testy nepíšeme.
