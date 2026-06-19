export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface WhoEntry {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type FeatureTier = 'core' | 'addon' | 'enterprise';

export interface ProductExtra {
  /** hex colour used for the product accent (icon boxes, Who It's For bg, etc.) */
  accentHex: string;
  /** light tint hex for icon box backgrounds */
  accentLightHex: string;
  /** short descriptor for eyebrow labels */
  eyebrow: string;
  benefits: Benefit[];
  /** map of feature name (must match seed exactly) → tier */
  featureTiers: Record<string, FeatureTier>;
  whoItsFor: WhoEntry[];
  faq: FaqItem[];
}

export const productExtras: Record<string, ProductExtra> = {
  // ── QuickStart CE ───────────────────────────────────────────────────────────
  'quickstart-ce': {
    accentHex: '#2563eb',
    accentLightHex: '#eff6ff',
    eyebrow: 'CRM · Vertrieb · Microsoft Dynamics 365 Sales',
    benefits: [
      {
        icon: '⚡',
        title: 'Schnellere Abschlüsse',
        description:
          'Strukturierte Pipeline und automatisierte Follow-ups reduzieren Ihren Sales-Zyklus deutlich – weniger manuelle Arbeit, mehr Deals.',
      },
      {
        icon: '📊',
        title: 'Volle Pipeline-Transparenz',
        description:
          'Alle Deals, Phasen und Umsatzprognosen zentral auf einem Dashboard – jederzeit, von überall, für jeden im Vertriebsteam sichtbar.',
      },
      {
        icon: '🤖',
        title: 'KI-gestützte Empfehlungen',
        description:
          'Microsoft Copilot analysiert Ihre Daten und schlägt die jeweils nächste beste Aktion vor – automatisch, ohne Aufwand.',
      },
      {
        icon: '✉️',
        title: 'Automatisierte Kommunikation',
        description:
          'Vordefinierte E-Mail-Vorlagen, automatische Erinnerungen und Aktivitäten-Tracking – professionell und ohne manuellen Aufwand.',
      },
      {
        icon: '🔗',
        title: 'Nahtlose Microsoft-Integration',
        description:
          'Outlook, Teams und Excel sind direkt eingebunden. Kein Systemwechsel, kein doppeltes Eingeben von Daten.',
      },
      {
        icon: '💶',
        title: 'Planbarer Festpreis',
        description:
          'Transparente Kosten, garantierte Implementierungsdauer und ein 30-tägiger Hypercare-Support nach Go-live – keine Überraschungen.',
      },
    ],
    featureTiers: {
      'Microsoft Dynamics 365 Sales (CE) – vorkonfiguriert & sofort einsatzbereit': 'core',
      'Lead-Management: Erfassung, Qualifizierung & automatisierte Zuweisung': 'core',
      'Opportunity-Pipeline mit Gewinnwahrscheinlichkeit & Forecasting': 'core',
      'Angebots- & Auftragserstellung direkt im CRM': 'core',
      '360°-Kundensicht: Kontakte, Aktivitäten, Kommunikationshistorie': 'core',
      'Automatisierte Follow-up-Aufgaben & E-Mail-Vorlagen': 'core',
      'Nahtlose Integration mit Microsoft Outlook & Teams': 'addon',
      'Power BI-Dashboards für Vertriebsperformance & Pipeline-Analyse': 'addon',
      'Microsoft Copilot AI: Gesprächszusammenfassungen & Next-Best-Action': 'enterprise',
      'Mobiler Zugriff über iOS & Android App': 'addon',
      'Fixpreis-Implementierung – keine versteckten Kosten': 'core',
      'Go-live in wenigen Tagen – skalierbar ab 1 User': 'core',
    },
    whoItsFor: [
      {
        title: 'Vertriebsteams im KMU',
        description:
          'Unternehmen mit 10–250 Mitarbeitenden aus Handel und Dienstleistungen, die ihren Vertriebsprozess strukturieren und skalieren möchten.',
      },
      {
        title: 'Unternehmen, die Excel ablösen',
        description:
          'Teams, die Leads, Deals und Kundendaten noch in Tabellen verwalten und auf eine professionelle CRM-Plattform umsteigen wollen.',
      },
      {
        title: 'Microsoft 365-Nutzer',
        description:
          'Organisationen, die bereits Outlook, Teams oder SharePoint einsetzen und ihr CRM nahtlos in dieses Ökosystem integrieren möchten.',
      },
      {
        title: 'Wachsende Vertriebsorganisationen',
        description:
          'Teams, die skalieren und dabei Transparenz über Pipeline, Forecasts und Einzelperformance behalten wollen.',
      },
    ],
    faq: [
      {
        question: 'Wie lange dauert die Implementierung?',
        answer:
          'Dank vordefiniertem Funktionsumfang sind Sie in 5–10 Werktagen produktiv. ITVT-Experten übernehmen Einrichtung, Datenmigration und Key-User-Schulung.',
      },
      {
        question: 'Ist eine Schulung enthalten?',
        answer:
          'Ja. Im Fixpreis enthalten ist eine strukturierte Key-User-Schulung. Auf Wunsch bieten wir ergänzende Trainings für das gesamte Team.',
      },
      {
        question: 'Kann ich das System später erweitern?',
        answer:
          'Absolut. Die Lösung ist modular aufgebaut. Sie können jederzeit weitere Nutzer, Module oder KI-Funktionen hinzubuchen.',
      },
      {
        question: 'Was ist alles im Fixpreis enthalten?',
        answer:
          'Lizenz (1. Monat), vollständige Einrichtung, Migration der Kerndaten (Kontakte, Leads), Key-User-Schulung und 30 Tage Hypercare-Support nach Go-live.',
      },
      {
        question: 'Was passiert nach dem Go-live?',
        answer:
          'ITVT steht mit einem dedizierten Support-Team bereit. Optional bieten wir laufende Managed-Service- und Success-Pakete für kontinuierliche Optimierung.',
      },
    ],
  },

  // ── QuickStart BC ───────────────────────────────────────────────────────────
  'quickstart-bc': {
    accentHex: '#059669',
    accentLightHex: '#ecfdf5',
    eyebrow: 'ERP · Finanzen · Microsoft Dynamics 365 Business Central',
    benefits: [
      {
        icon: '🔄',
        title: 'End-to-End-Prozessintegration',
        description:
          'Einkauf, Verkauf, Lagerhaltung und Finanzbuchhaltung in einem einzigen System – keine Insellösungen, keine Medienbrüche.',
      },
      {
        icon: '📈',
        title: 'Echtzeit-Finanztransparenz',
        description:
          'Monatsabschlüsse in Stunden statt Wochen – durch automatische Buchungsvorschläge, Bank-Abgleich und Live-Dashboards.',
      },
      {
        icon: '🧩',
        title: 'Flexibles Modulsystem',
        description:
          'Starten Sie schlank mit Kern-ERP und erweitern Sie mit Produktion, Serviceverwaltung oder Projektmanagement – exakt dann, wenn Sie es brauchen.',
      },
      {
        icon: '✅',
        title: 'Fehlerfreie Belegketten',
        description:
          'Automatischer Dreiwegabgleich zwischen Bestellung, Wareneingang und Eingangsrechnung eliminiert Buchungsfehler zuverlässig.',
      },
      {
        icon: '🤖',
        title: 'Copilot KI-Unterstützung',
        description:
          'KI-gestützte Anomalie-Erkennung und automatische Buchungsvorschläge direkt in Business Central – Controlling wird zum Kinderspiel.',
      },
      {
        icon: '🏅',
        title: 'Microsoft Solutions Partner',
        description:
          'Als zertifizierter Microsoft Solutions Partner implementieren wir Business Central nach höchsten Qualitäts- und Sicherheitsstandards.',
      },
    ],
    featureTiers: {
      'Microsoft Dynamics 365 Business Central – vorkonfiguriert für KMU': 'core',
      'Finanzbuchhaltung: Hauptbuch, Debitoren, Kreditoren & Bank-Abgleich': 'core',
      'Einkauf: Bestellanforderungen, Lieferantenbestellungen & Wareneingang': 'core',
      'Verkauf: Angebote, Aufträge, Lieferscheine & Rechnungsstellung': 'core',
      'Lagerverwaltung: Artikel, Lagerplätze, Inventur & Chargen-/Seriennummern': 'core',
      'Echtzeit-Finanzreporting & anpassbare Power BI-Dashboards': 'core',
      'Integration mit Microsoft 365: Outlook, Excel & Teams': 'addon',
      'Microsoft Copilot AI: Automatische Buchungsvorschläge & Anomalie-Erkennung': 'enterprise',
      'Optionales Modul: Produktion & Fertigungsaufträge': 'addon',
      'Optionales Modul: Serviceverwaltung & Wartungsverträge': 'addon',
      'Optionales Modul: Projektmanagement & Zeiterfassung': 'addon',
      'Fixpreis-Implementierung – planbar, kostensicher & schnell': 'core',
    },
    whoItsFor: [
      {
        title: 'Handels- & Dienstleistungsunternehmen',
        description:
          'KMU, die Einkauf, Lager und Verkauf in einem zentralen System ohne Medienbrüche abbilden und steuern möchten.',
      },
      {
        title: 'Teams mit Excel-Finanzen',
        description:
          'Unternehmen, die Buchhaltung und Controlling noch in Tabellen betreiben und auf eine GoBD-konforme ERP-Lösung umsteigen wollen.',
      },
      {
        title: 'Fertigungs- und Serviceunternehmen',
        description:
          'Betriebe, die neben Finanzen und Handel auch Produktionsaufträge, Serviceeinsätze oder Projekte verwalten müssen.',
      },
      {
        title: 'Wachsende KMU auf ERP-Einstieg',
        description:
          'Unternehmen ab 10 Mitarbeitenden, die erstmals ein vollständiges ERP einführen und skalierbar in die Cloud starten möchten.',
      },
    ],
    faq: [
      {
        question: 'Was unterscheidet Business Central von FSCM?',
        answer:
          'Business Central ist ideal für KMU (10–250 MA) mit Standardprozessen. Dynamics 365 FSCM richtet sich an größere Unternehmen mit Multi-Entity-Strukturen und komplexer Supply Chain.',
      },
      {
        question: 'Kann ich mit einem Modul starten und später erweitern?',
        answer:
          'Ja. Sie starten mit Finanzen, Einkauf und Verkauf und ergänzen bei Bedarf Produktion, Serviceverwaltung oder Projektmanagement.',
      },
      {
        question: 'Ist eine Datenmigration enthalten?',
        answer:
          'Ja. Die Migration von Stammdaten (Kunden, Lieferanten, Artikel) ist im Fixpreis enthalten. Historische Buchungsdaten können optional migriert werden.',
      },
      {
        question: 'Unterstützt Business Central deutsches Steuerrecht?',
        answer:
          'Ja. BC enthält die vollständige DACH-Lokalisierung: DATEV-Export, ELSTER-Schnittstelle, Umsatzsteuer-Voranmeldung und GoBD-Konformität.',
      },
      {
        question: 'Wie lange dauert die Implementierung?',
        answer:
          'Je nach Datenqualität und Prozessumfang 10–20 Werktage. ITVT liefert einen verbindlichen Projektplan vor Vertragsunterzeichnung.',
      },
    ],
  },

  // ── QuickStart FSCM ─────────────────────────────────────────────────────────
  'quickstart-fscm': {
    accentHex: '#7c3aed',
    accentLightHex: '#f5f3ff',
    eyebrow: 'Enterprise ERP · Finance & Supply Chain Management',
    benefits: [
      {
        icon: '🏢',
        title: 'Multi-Entity-Fähigkeit',
        description:
          'Mehrere Buchungskreise, Gesellschaften und Fremdwährungen in einer konsolidierten Plattform – ideal für wachsende Unternehmensgruppen.',
      },
      {
        icon: '🔮',
        title: 'KI-Bedarfsprognosen',
        description:
          'Azure Machine Learning erkennt Nachfragemuster automatisch und generiert präzise Bestellvorschläge – weniger Überbestand, keine Engpässe.',
      },
      {
        icon: '📦',
        title: 'Advanced Warehouse Management',
        description:
          'Lagerplatz- und Wellensteuerung, Slotting-Optimierung und Barcode-/RFID-Integration für komplexe Lager- und Logistikanforderungen.',
      },
      {
        icon: '📋',
        title: 'Vollständige Compliance',
        description:
          'IFRS, HGB und steuerrechtskonforme Prozesse out-of-the-box – ohne kostspielige Sonderentwicklungen oder manuelle Workarounds.',
      },
      {
        icon: '🚛',
        title: 'Integriertes Transportmanagement',
        description:
          'Frachtplanung, Spediteurbuchung und Sendungsverfolgung direkt aus dem ERP – vollständig in Lager und Verkauf integriert.',
      },
      {
        icon: '⚙️',
        title: 'Fertigungs- & Produktionssteuerung',
        description:
          'MPS, MRP und Fertigungsauftragsverwaltung für produzierende Unternehmen – von der Planung bis zur Rückmeldung.',
      },
    ],
    featureTiers: {
      'Microsoft Dynamics 365 Finance & Supply Chain Management': 'core',
      'Hauptbuch, Kostenrechnung, Budgetierung & Konsolidierung': 'core',
      'Kreditorenbuchhaltung: Automatischer Rechnungsabgleich & Zahlungsläufe': 'core',
      'Debitorenbuchhaltung: Mahnwesen, Forderungsmanagement & Inkasso': 'core',
      'Beschaffung & Sourcing: Rahmenverträge, Lieferantenbewertung & Kataloge': 'core',
      'Erweitertes Warehouse Management (WMS): Lagerplatz- & Wellensteuerung': 'addon',
      'Transportmanagement: Frachtplanung, Spediteurbuchung & Tracking': 'addon',
      'Produktionsplanung: MPS, MRP & Fertigungsauftragssteuerung': 'addon',
      'Multi-Buchungskreis & Mehrwährungsunterstützung (IFRS/HGB)': 'core',
      'KI-gestützte Bedarfsprognosen & automatische Nachbestellvorschläge': 'enterprise',
      'Erweiterte Power BI-Analysen & Echtzeit-Controlling': 'enterprise',
      'Fixpreis-Implementierung mit garantierter Projektlaufzeit': 'core',
    },
    whoItsFor: [
      {
        title: 'Unternehmen ab 50 Mitarbeitenden',
        description:
          'Mittelständler mit komplexen Finanz- und Beschaffungsprozessen, die über die Möglichkeiten von Business Central hinausgewachsen sind.',
      },
      {
        title: 'Multi-Entity & Internationalisierung',
        description:
          'Unternehmensgruppen mit mehreren Gesellschaften, Währungen oder internationalen Standorten, die eine konsolidierte Steuerung benötigen.',
      },
      {
        title: 'Fertigungs- und Handelsunternehmen',
        description:
          'Betriebe mit komplexen Lagerprozessen, Produktionsplanung und einer langen Lieferkette, die ein leistungsstarkes Supply-Chain-System benötigen.',
      },
      {
        title: 'Business-Central-Outgrower',
        description:
          'Unternehmen, die Business Central bereits einsetzen, aber für Wachstum, Compliance oder Komplexität eine skalierbarere Plattform benötigen.',
      },
    ],
    faq: [
      {
        question: 'Ab welcher Unternehmensgröße lohnt sich FSCM?',
        answer:
          'FSCM richtet sich an Unternehmen ab ca. 50–100 Mitarbeitenden oder mit Multi-Entity-Anforderungen. Bei kleineren Unternehmen empfehlen wir zunächst Business Central.',
      },
      {
        question: 'Kann FSCM mehrere Gesellschaften verwalten?',
        answer:
          'Ja. Multi-Buchungskreis und Konzernkonsolidierung sind nativ in Dynamics 365 Finance enthalten – keine Add-Ons, keine Drittpakete erforderlich.',
      },
      {
        question: 'Wie lange dauert die Implementierung?',
        answer:
          'Je nach Prozessumfang und Komplexität 4–12 Wochen. ITVT erstellt vorab einen verbindlichen Projektstrukturplan mit klaren Meilensteinen.',
      },
      {
        question: 'Was bedeutet KI-gestützte Bedarfsplanung?',
        answer:
          'Dynamics 365 Supply Chain Management nutzt Azure Machine Learning-Modelle, um Nachfragemuster zu erkennen und optimale Nachbestellmengen automatisch vorzuschlagen.',
      },
      {
        question: 'Kann FSCM mit SAP integriert werden?',
        answer:
          'Ja. Über Standard-APIs und Azure Integration Services können stabile Schnittstellen zu SAP, Navision oder anderen Legacy-Systemen aufgebaut werden.',
      },
    ],
  },

  // ── QuickStart SW365 ────────────────────────────────────────────────────────
  'quickstart-sw365': {
    accentHex: '#0284c7',
    accentLightHex: '#e0f2fe',
    eyebrow: 'Stadtwerk 365 · Customer Service · Energiewirtschaft',
    benefits: [
      {
        icon: '🏭',
        title: '20+ Jahre EVU-Erfahrung',
        description:
          'Stadtwerk 365 entstand aus über zwei Jahrzehnten Branchenerfahrung in der Energiewirtschaft – tiefes Prozesswissen direkt eingebaut.',
      },
      {
        icon: '👁️',
        title: '360°-Kundensicht',
        description:
          'Vollständige Vertrags-, Zähler- und Kommunikationshistorie für jeden Kunden auf einem Blick – Auskunftsfähigkeit in Sekunden.',
      },
      {
        icon: '⚖️',
        title: 'Regulatorische Compliance',
        description:
          'GasNZV, StromNZV und DSGVO-konforme Prozesse sind vorkonfiguriert und werden durch ITVT regelmäßig aktualisiert.',
      },
      {
        icon: '🌐',
        title: 'Self-Service-Kundenportal',
        description:
          'Kunden melden Zählerstände, wechseln Tarife und verwalten Verträge selbstständig online – Ihr Team wird dauerhaft entlastet.',
      },
      {
        icon: '📞',
        title: 'Omnichannel-Kundenservice',
        description:
          'Telefon, E-Mail, Web und Kundenportal in einem einheitlichen System – keine Silos, keine Doppelarbeit, volle Übersicht.',
      },
      {
        icon: '📊',
        title: 'Transparentes EVU-Reporting',
        description:
          'Echtzeit-KPIs für Servicelevel, Fallvolumen und Bearbeitungszeit – für Management, Regulierungsbehörden und interne Steuerung.',
      },
    ],
    featureTiers: {
      'Stadtwerk 365 – Branchenlösung auf Basis von Microsoft Dynamics 365': 'core',
      'Intelligentes Fallmanagement: Erfassung, Kategorisierung & Priorisierung': 'core',
      'Kundenkontakt-Center: Omnichannel (Telefon, E-Mail, Web, Portal)': 'core',
      'Self-Service-Kundenportal: Zählerstand melden, Verträge verwalten': 'core',
      'Zählerstand-Erfassung & Plausibilitätsprüfung': 'core',
      'Abrechnungsintegration: Übergabe an SAP IS-U, Wilken & Co.': 'addon',
      'Vertragsmanagement: Tarifwechsel, Umzüge & Kündigungen': 'core',
      'Transparente KPI-Dashboards: Servicelevel, Fallvolumen & Bearbeitungszeit': 'addon',
      'Compliance: Prozesse gemäß GasNZV, StromNZV & DSGVO': 'core',
      'Microsoft Copilot AI: Automatische Fallantworten & Wissensartikel': 'enterprise',
      'Nahtlose Integration in Microsoft 365: Outlook & Teams': 'addon',
      'Fixpreis-Implementierung – speziell für EVUs & kommunale Versorger': 'core',
    },
    whoItsFor: [
      {
        title: 'Stadtwerke & kommunale Versorger',
        description:
          'Kommunale Energieversorger, die ihren Kundenservice professionalisieren und ihren Mitarbeitenden moderne, digitale Arbeitsmittel bereitstellen möchten.',
      },
      {
        title: 'Energie-Versorgungsunternehmen (EVU)',
        description:
          'EVUs jeder Größe – von kleinen Stadtwerken mit 10.000 Kunden bis zu regionalen Versorgern – die skalierbar wachsen wollen.',
      },
      {
        title: 'Kundenservice-Teams in der Energiewirtschaft',
        description:
          'Teams, die Kundenvorgänge noch in Excel oder veralteten Ticketsystemen verwalten und auf eine regulierungskonforme Plattform umsteigen möchten.',
      },
      {
        title: 'Digital-Transformatoren im Versorger-Umfeld',
        description:
          'Entscheider, die Digitalisierung und KI-Transformation im EVU schnell, planbar und mit minimalem IT-Aufwand starten möchten.',
      },
    ],
    faq: [
      {
        question: 'Für welche Stadtwerk-Größen ist SW365 geeignet?',
        answer:
          'Stadtwerk 365 skaliert flexibel – von kleineren Versorgern ab ca. 10.000 Kunden bis zu größeren Stadtwerken mit mehreren Hunderttausend Kunden.',
      },
      {
        question: 'Unterstützt SW365 die SAP IS-U-Integration?',
        answer:
          'Ja. Stadtwerk 365 lässt sich über Standard-APIs mit SAP IS-U, Wilken, Powercloud und anderen marktüblichen Abrechnungssystemen verbinden.',
      },
      {
        question: 'Wie wird die Regulatorik (GasNZV, StromNZV) abgebildet?',
        answer:
          'Alle relevanten Netzprozesse, Fristen und Pflichtfelder sind in der Lösung vorkonfiguriert. ITVT aktualisiert die Prozesse regelmäßig bei regulatorischen Änderungen.',
      },
      {
        question: 'Kann das Kundenportal mit unserer Corporate Identity gestaltet werden?',
        answer:
          'Ja. Das Self-Service-Portal ist white-label-fähig und kann vollständig an Ihr Corporate Design (Logo, Farben, Domain) angepasst werden.',
      },
      {
        question: 'Ist die Lösung DSGVO-konform?',
        answer:
          'Ja. Alle Daten werden in deutschen Microsoft Azure-Rechenzentren gespeichert. Sämtliche Prozesse entsprechen den aktuellen DSGVO-Anforderungen.',
      },
    ],
  },
};
