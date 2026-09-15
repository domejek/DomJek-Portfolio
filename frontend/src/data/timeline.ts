import type { TimelineEntry } from '../types';

export const timeline: TimelineEntry[] = [
  {
    date: '07/2026 – aktuell',
    title: 'Full-Stack Entwickler',
    company: 'Centeo GmbH & Co. KG (TELiAS Gruppe)',
    descriptions: [
      'Effizienzsteigerung der Kundenbesuchsbearbeitung (Postbearbeitung) um 30 % durch Entwicklung eines neuen Besucherbereichs.',
      'Umsetzung von Responsive Design für die TELiAS-Webseite sowie Kommunikation und Projektplanung zwischen Unternehmen und externem Dienstleister.',
    ],
    techTags: ['PHP', 'Laravel', 'JavaScript', 'HTML', 'CSS', 'Docker', 'PostgreSQL', 'Ubuntu', 'Kirby CMS'],
  },
  {
    date: '07/2024 – 02/2026',
    title: 'IT- und Softwareentwicklung',
    company: 'Upside Consulting GmbH, Dülmen',
    descriptions: [
      'Entwicklung und Pflege PHP-basierter Datenschnittstellen und Steuerungsprogramme inkl. automatisierter Tests und Dokumentation. Betrieb und Optimierung von PostgreSQL-Datenbanken mit Fokus auf Performance und Datenstabilität.',
      'Ausbau der Monitoring-Infrastruktur: Integration neuer Batterie-Container-Standorte in Grafana/InfluxDB via Telegraf, MQTT & Modbus. Python-Skripting zur Datenauswertung & Analysen.',
    ],
    techTags: ['PHP', 'PostgreSQL', 'Python', 'Grafana', 'InfluxDB'],
  },
  {
    date: '04/2021 – 06/2024',
    title: 'Fachinformatiker für Anwendungsentwicklung',
    company: 'ISL Internet Sicherheitslösungen GmbH, Bochum',
    descriptions: [
      'Mit-Entwicklung der Engine des NAC-Produkts ARP-GUARD in Perl und JavaScript. Third-Level-Support für Netzwerksicherheitsprodukte.',
      'Abschlussprojekt: Automatisiertes Netzwerkreport-System mit PDF-Generierung (PDF::API2), Diagrammerstellung (Gnuplot), E-Mail-Versand und Cron-basierter Planung auf PostgreSQL-Basis.',
    ],
    techTags: ['Perl', 'JavaScript', 'PostgreSQL'],
  },
  {
    date: '09/2018 – 08/2020',
    title: 'Fachhochschulreife',
    company: 'Cuno-Berufskolleg I, Hagen',
    descriptions: ['Informations- & Telekommunikationstechnik'],
  },
];