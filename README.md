# Hochzeitswebsite

Statische Informationsseite für die kirchliche Hochzeit am 02.10.2027 in Erlangen.

## Lokale Vorschau

`index.html` direkt im Browser öffnen. Es gibt keinen Build-Schritt.

## RSVP

Das Formular sendet Rückmeldungen über einen gesicherten Cloudflare-Worker an die private
Notion-Datenbank `📥 RSVP-Eingang`. Es werden keine Notion-Token oder personenbezogenen
Daten in dieses Repository committed.

## Veröffentlichung über GitHub Pages

Die Website wird durch [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) automatisch
auf GitHub Pages veröffentlicht. Jeder Push auf `main` startet den Deployment-Workflow; zusätzlich kann er
unter **Actions → Deploy to GitHub Pages → Run workflow** manuell gestartet werden.

Einmalige Einrichtung im Repository:

1. Unter **Settings → Pages** bei **Build and deployment** als Quelle **GitHub Actions** auswählen.
2. Nach dem ersten erfolgreichen Lauf ist die Website unter
   `https://theyeshir13.github.io/hochzeit-website/` erreichbar.
3. Die Cloudflare-Variable `ALLOWED_ORIGIN` muss auf
   `https://theyeshir13.github.io` gesetzt sein.

Vor der Veröffentlichung: Datenschutzhinweise prüfen und den RSVP-Versand über die echte Pages-URL testen.
