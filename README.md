# Gartenplaner

Web-App zum Planen des eigenen Gartens: Grundstück aus dem amtlichen Kataster (Sachsen) laden, im 2D-Plan gestalten und in 3D ansehen.

## Starten

`index.html` doppelklicken. Sie öffnet sich im Browser (Chrome, Edge, Firefox, Safari). Eine Installation ist nicht nötig, aber eine Internetverbindung (Karten, Kataster, Bibliotheken).

## Ablauf

1. **Grundstück**: Adresse oder Gemarkung + Flurstücksnummer suchen und das Flurstück in der Karte anklicken. Mehrere Flurstücke sind möglich. Dann auf „Grundstück übernehmen“ klicken.
2. **Plan 2D**: Wege (Breite und Belag), Flächen (Rasen, Beet, Terrasse, Teich …), Hecken, Zäune und Mauern zeichnen; Pflanzen und Objekte aus dem Katalog setzen.
3. **Ansicht 3D**: Garten mit Luftbild-Boden, Gebäuden aus dem Kataster und Schatten nach Tageszeit.

Der Plan wird automatisch im Browser gespeichert. Mit „Speichern“ wird eine `.garten.json` erzeugt (zum Sichern oder Weitergeben), mit „Öffnen“ lädt man sie wieder.

## Bedienung im Plan

| Aktion | Maus / Taste |
|---|---|
| Zoomen | Mausrad, +/- |
| Ansicht verschieben | Rechtsklick + Ziehen, Leertaste + Ziehen, Ziehen auf leerer Fläche |
| Linie/Fläche beenden | Doppelklick oder Enter (Fläche: auch Klick auf den ersten Punkt) |
| Letzten Punkt entfernen | Backspace beim Zeichnen |
| 15°-Winkel | Shift beim Zeichnen |
| Punkt einfügen / löschen | kleinen Kantenpunkt ziehen / Doppelklick auf einen Punkt |
| Löschen, Duplizieren | Entf, Strg+D |
| Drehen (Objekt) | R / Shift+R oder den runden Griff ziehen |
| Verschieben in 10 cm / 1 m | Pfeiltasten / Shift+Pfeiltasten |
| Rückgängig / Wiederholen | Strg+Z / Strg+Y |
| Werkzeuge | V Auswahl · W Weg · F Fläche · H Hecke · P Pflanze · O Objekt · M Messen |

Neue Punkte rasten an Ecken von Grundstück, Gebäuden und Elementen ein, sonst im 10-cm-Raster (abschaltbar mit „Einrasten“).

## Datenquellen

- Flurstücke und Gebäude: ALKIS Sachsen (WFS „ALKIS vereinfacht“), © GeoSN, [dl-de/by-2-0](https://www.govdata.de/dl-de/by-2-0)
- Luftbild: Digitale Orthophotos Sachsen, 20 cm, © GeoSN, dl-de/by-2-0
- Adresssuche: OpenStreetMap (Nominatim / Photon)
- Optional: Google Satellit über die Google Map Tiles API. Den API-Schlüssel unter ⚙︎ eintragen. Die Ebene erscheint dann in Schritt 1.
