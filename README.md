# Bewerbungs-Onepager

Next.js-Onepager fuer eine Bewerbungsseite mit dunklem Plus-Raster,
Anker-Navigation und sicherer Login-Grundstruktur.

## Getting Started

Installieren und starten:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Login konfigurieren

1. `.env.example` nach `.env.local` kopieren.
2. Einen Passwort-Hash erzeugen:

```bash
npm run auth:hash -- "ein-sehr-starkes-passwort"
```

3. Den ausgegebenen Hash in `ADMIN_PASSWORD_HASH` eintragen.
4. `SESSION_SECRET` mit einem zufaelligen Secret von mindestens 32 Bytes setzen.

Der Admin-Bereich liegt unter `/admin`. Login und Logout laufen ueber Server
Actions, die Session wird als `httpOnly` Cookie gespeichert.

## Struktur

- `src/app/page.tsx` setzt den Onepager zusammen.
- `src/components/sections` enthaelt die einzelnen Bereiche.
- `src/components/site` enthaelt Header und Hintergrund.
- `src/lib/auth` enthaelt Session, Passwortpruefung, Rate Limit und Actions.
- `src/data/profile.ts` enthaelt die editierbaren Inhalte.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```
