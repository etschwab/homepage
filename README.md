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

## Admin

Unter `/admin` lassen sich Texte, Projekte und Dokumente direkt auf der
Website ändern. Nach dem Speichern ist die Änderung sofort online, ohne Push.

Der Admin-Bereich hat ein eigenes Login unter `/admin/login` mit eigenen
Zugangsdaten. Das Login für die Dokumente (`/login`) kommt nicht in den Admin,
es kann also gefahrlos weitergegeben werden.

Einmalig einrichten:

1. Einen Hash für das Admin-Passwort erzeugen (ein anderes Passwort als für
   die Dokumente):

   ```bash
   npm run auth:hash -- "ein-anderes-starkes-passwort"
   ```

   In `.env.local` und in Vercel unter **Settings → Environment Variables**
   `EDITOR_USERNAME` und `EDITOR_PASSWORD_HASH` eintragen. In `.env.local`
   jedes `$` im Hash als `\$` schreiben.
2. In Vercel unter **Storage → Create → Blob** einen Store mit Zugriff
   **Private** anlegen und mit diesem Projekt verbinden. Dadurch setzt Vercel
   automatisch `BLOB_STORE_ID` (oder bei älteren Stores `BLOB_READ_WRITE_TOKEN`).
3. Neu deployen.

Hochgeladene Dokumente werden wie die Dateien in `secure-documents` mit
`SESSION_SECRET` verschlüsselt. Wird das Secret geändert, sind sie nicht mehr
lesbar und müssen neu hochgeladen werden.

Ganz unten im Admin gibt es den Bereich **Standard**: «Als Standard festlegen»
sichert den gespeicherten Stand von Texten und Dokumenten, «Auf Standard
zurücksetzen» holt ihn zurück. Beides verlangt das Admin-Passwort. Ohne eigenen
Standard gilt der Ausgangsstand aus `src/data`. Dateien, die zum Standard
gehören, werden beim Ersetzen oder Löschen nicht gelöscht.

Lokal ohne Blob Store speichert der Admin in `.data/cms`.

## Wichtige Befehle

```bash
npm run lint
npm run build
```
