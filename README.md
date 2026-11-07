# Hochzeitswebsite von Jonathan & Toni

Statische Website zur kirchlichen Hochzeit am 2. Oktober 2027 in Erlangen.

Website: https://tojo-hochzeit.de

## Technik und Veröffentlichung

HTML, CSS und JavaScript ohne Build-Schritt und ohne externe Schriftbibliotheken.
Die Veröffentlichung erfolgt über GitHub Pages: `.github/workflows/deploy-pages.yml`
veröffentlicht bei einem Push auf `main` den Repository-Inhalt. Ein manueller Start
über `workflow_dispatch` ist ebenfalls vorgesehen. Unter Settings → Pages → Build
and deployment muss GitHub Actions ausgewählt sein. `CNAME` enthält die eigene Domain.

## Aufbau

- `index.html`: Onepager mit Trauung und Feier, Ablauf, „Für euere Planung“, Anreise
  und Unterkunft, Rückmeldung sowie anschließend dem Kuchen- und Dessertbuffet.
- `pages/datenschutz.html`: separate Datenschutzhinweise.
- `css/style.css`: Basisgestaltung und wasserblaue Farbflächen.
- `css/onepager.css`: Onepager-Layout, Navigation, Karten, Bildmotive und responsive Regeln.
- `css/privacy.css`: ergänzende Gestaltung der Datenschutzseite.
- `assets/`: Bilder, Blattmotive und Lageplan sowie bewusst erhaltene Originaldateien
  und frühere Varianten. Alle Assets bleiben vorerst unverändert bestehen.

Das Layout des Paarfotos und der Formular-Ladecode stehen derzeit direkt in `index.html`.
Die Navigation bleibt bewusst kompakt; zum Buffet führt zusätzlich ein Link im Ablauf.

Die nicht mehr benötigten Weiterleitungsseiten `pages/infos.html`,
`pages/anreise.html` und `pages/rsvp.html` sowie das alte Rückmeldeskript
`js/rsvp.js` wurden entfernt. Die alten Unterseitenadressen werden nicht mehr
unterstützt; verwendet die Abschnittslinks der Hauptseite.

## Aktuell eingebundene Bilder

- `assets/Otter-rund.png`: Ottermotiv im Einstieg; Groß-/Kleinschreibung beachten.
- `assets/paarfoto-rund.png`: Paarfoto im Rückmeldebereich.
- `assets/lageplan-erlangen-gesamt.webp`: Karte mit Kirche und Hotels.
- Die sechs nummerierten Blatt-SVGs werden im CSS referenziert. Der Selektor für
  das fünfte Blatt passt derzeit nicht auf die verschachtelte Rückmeldungsüberschrift.
- `assets/Otter_isoliert.png` wird zusätzlich als übersteuerte Hintergrunddefinition
  in `css/onepager.css` referenziert.

Weitere Assets, darunter `assets/water-leaves.svg`, bleiben auch dann erhalten,
wenn sie derzeit nicht eingebunden sind. Es ist keine Asset-Löschung vorgesehen.

## Formulare und Daten

Zwei unabhängige Tally-Formulare:

| Zweck | Formular-ID | Direktlink |
| --- | --- | --- |
| Zu- oder Absage | `4a429k` | https://tally.so/r/4a429k |
| Kuchen- und Dessertbuffet | `4aaBvY` | https://tally.so/r/4aaBvY |

Die Einbettungen werden erst nach Klick auf die jeweilige Ladeschaltfläche erzeugt.
Direktlinks und E-Mail-Kontakt stehen als Alternativen bereit. Die Buffetmeldung
ersetzt keine Zu- oder Absage. Die iframe-Höhen sind im Ladecode fest eingestellt;
Änderungen an den Formularen deshalb auch mobil prüfen.

Laut den Datenschutzhinweisen werden Antworten bei Tally gespeichert und in die
private Hochzeitsplanung in Notion übertragen. Die Integrationen werden außerhalb
dieses Repositorys verwaltet; ihre Funktion ist separat zu testen.
Zugangsdaten, Gästeantworten, Exporte und private Planungsunterlagen gehören nicht
in dieses Repository. Maßgeblich für die beschriebenen Datenflüsse und Löschfristen
ist `pages/datenschutz.html`.

## Lokal prüfen

`index.html` lässt sich ohne Build direkt im Browser öffnen. Alternativ im
Repository-Verzeichnis einen lokalen Server starten:

```sh
python -m http.server 8000
```

Anschließend http://localhost:8000 aufrufen. Das Laden der Tally-Formulare benötigt
eine Internetverbindung.

## Änderungen und Abnahme

1. Inhalte in `index.html` ändern; bestehende Abschnitts-IDs für Links erhalten.
2. Bei Inhaltsänderungen das Datum „Zuletzt aktualisiert am“ im Footer bewusst
   aktualisieren; es ist kein automatisch wechselndes Tagesdatum.
3. Bei Änderungen an Datenverarbeitung oder Formularfeldern die Datenschutzhinweise
   prüfen und bei inhaltlichen Änderungen deren Stand aktualisieren.
4. Desktop und Smartphone prüfen: Navigation, Abschnittslinks, Paarfoto, Karte,
   Datenschutzseite, beide Formulare und direkte Ersatzlinks.
5. Testeinsendungen nur bewusst absenden und anschließend in Tally und Notion
   kontrollieren beziehungsweise entfernen; sensible Echtdaten vermeiden.
6. Nach dem Push den Deployment-Status und die veröffentlichte Website prüfen.

## Bereinigung

Stand der Bereinigung vom 7. November 2026: Das alte Rückmeldeskript und die drei
nicht mehr benötigten Weiterleitungsseiten wurden entfernt. Alle Dateien unter
`assets/` bleiben auf ausdrücklichen Wunsch vorerst erhalten, einschließlich
ungenutzter Entwürfe und Originaldateien. Weitere Asset-Bereinigungen nur nach
erneuter ausdrücklicher Freigabe vornehmen.

Vor weiteren Löschungen HTML-, CSS-, JavaScript- und Workflow-Referenzen prüfen.
Änderungen sind über die Git-Historie nachvollziehbar. Das Löschen einer Datei aus
dem aktuellen Stand entfernt sie nicht aus früheren Commits.
