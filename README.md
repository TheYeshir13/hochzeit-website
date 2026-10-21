# Hochzeitswebsite

Statische Informationsseite für die kirchliche Hochzeit am 02.10.2027 in Erlangen.

## Lokale Vorschau

`index.html` direkt im Browser öffnen. Es gibt keinen Build-Schritt.

## Rückmeldungen

Die RSVP-Seite bindet das Tally-Formular `4a429k` erst nach Klick auf „Formular laden“ ein.
Die Antworten werden über die in Tally eingerichtete Notion-Integration in die private
Hochzeitsplanung übertragen. Die weitere Prüfung und Übernahme in die Gästeliste erfolgt manuell.
Zugangsdaten und Gästeantworten gehören nicht in dieses Repository.

## Veröffentlichung über GitHub Pages

Die Veröffentlichung erfolgt über `.github/workflows/deploy-pages.yml`.
Ein Push auf `main` startet den Deployment-Workflow. Unter **Actions → Deploy to GitHub Pages → Run workflow**
kann er auch manuell gestartet werden.

Unter **Settings → Pages → Build and deployment** muss **GitHub Actions** als Quelle ausgewählt sein.

Website: `https://theyeshir13.github.io/hochzeit-website/`

Nach Änderungen Navigation, Formularladen und Datenschutzhinweise auf der veröffentlichten Website prüfen.
