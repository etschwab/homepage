# Portfolio von Etienne Schwab

Persönliche Portfolio- und Bewerbungswebsite mit den Bereichen Home, Über
mich, Projekte und Dateien. Dokumente und Kontaktangaben werden nur nach dem
Login angezeigt.

## Lokal starten

```bash
npm install
npm run dev
```

Die Website läuft danach unter [http://localhost:3000](http://localhost:3000).

## Login konfigurieren

1. `.env.example` nach `.env.local` kopieren.
2. Einen Passwort-Hash erzeugen:

```bash
npm run auth:hash -- "ein-sehr-starkes-passwort"
```

3. Nutzername, Hash und Session-Secret in `.env.local` eintragen.

Der Login liegt unter `/login`. Nach erfolgreicher Anmeldung zeigt `/dateien`
die geschützten Inhalte. Die Session wird als `httpOnly` Cookie gespeichert.

## Wichtige Befehle

```bash
npm run lint
npm run build
```
