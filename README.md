# Hochzeitswebsite

Onepager für die kirchliche Hochzeit am 02.10.2027 in Erlangen.

## Struktur

`index.html` enthält Feier, Ablauf, Hinweise, Anreise und Rückmeldung.
Die Navigation führt zu Abschnitten auf derselben Seite.
`pages/datenschutz.html` bleibt eine eigene Seite.
Die bisherigen Adressen `pages/infos.html`, `pages/anreise.html` und `pages/rsvp.html`
leiten per HTML-Weiterleitung auf die passenden Abschnitte weiter und enthalten einen Ersatzlink.

`css/style.css` enthält die Basisgestaltung, `css/onepager.css` die Onepager-Navigation und Abstände.

## Rückmeldungen

Das Tally-Formular `4a429k` wird erst nach Klick auf „Formular laden“ eingebunden.
Die in Tally eingerichtete Notion-Integration überträgt Antworten in die private Hochzeitsplanung.
Die weitere Prüfung und Übernahme in die Gästeliste erfolgt manuell.
Zugangsdaten und Gästeantworten gehören nicht in dieses Repository.

## Vorschau und Veröffentlichung

`index.html` kann ohne Build-Schritt im Browser geöffnet werden.
Die Veröffentlichung erfolgt über `.github/workflows/deploy-pages.yml` bei einem Push auf `main`.
Unter Settings → Pages → Build and deployment muss GitHub Actions ausgewählt sein.

Website: `https://theyeshir13.github.io/hochzeit-website/`

Nach Veröffentlichung Abschnittslinks, alte Unterseitenadressen, mobile Navigation,
Formularladen und den separaten Datenschutzlink prüfen.
