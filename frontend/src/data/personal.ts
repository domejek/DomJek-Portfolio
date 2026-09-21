import type { PersonalInfo } from '../types';
import profileImage from '../assets/profile.webp';

export const personal: PersonalInfo = {
  name: 'Dominik Jeksties',
  role: 'Softwareentwickler aus Hagen',
  subtitle: 'PHP, JavaScript, Python, Monitoring · NRW',
  location: 'Hagen, Deutschland',
  country: 'Deutschland',
  availability: 'Offen für neue Chancen und Herausforderungen',
  email: 'dominik@jeksties.de',
  phone: '+49 175 9310672',
  phoneHref: 'tel:+491759310672',
  languages: ['Deutsch (Muttersprache) · Englisch (gut)'],
  githubUrl: 'https://github.com/domejek',
  linkedinUrl: 'https://www.linkedin.com/in/dominik-jeksties-0162a7216/',
  resumePdf: '/lebenslauf.pdf',
  profileImage,
  description:
    'Softwareentwickler mit Erfahrung in Backend-Systemen, Frontend-Design, Datenverarbeitungen und Monitoring-Infrastrukturen.',
};

export const aboutHighlights: string[] = [
  'PHP & Laravel',
  'Python',
  'JavaScript, React & NodeJS',
  'PostgreSQL & InfluxDB',
  'Grafana & Monitoring',
  'Docker & Portainer',
  'REST APIs',
  'Kirby CMS',
];

export const contactLinks = [
  { label: 'E-Mail', href: 'mailto:dominik@jeksties.de', icon: 'mail' },
  { label: 'Telefon', href: 'tel:+491759310672', icon: 'phone' },
  {
    label: 'GitHub',
    href: 'https://github.com/domejek',
    icon: 'github',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dominik-jeksties-0162a7216/',
    icon: 'linkedin',
    external: true,
  },
];