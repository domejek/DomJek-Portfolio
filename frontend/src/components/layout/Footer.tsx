import { personal } from '../../data/personal';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy py-8 text-center text-gray-light">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} {personal.name} – Softwareentwickler &middot;{' '}
          <a
            href={personal.resumePdf}
            download
            className="text-gray-light no-underline transition-colors hover:text-primary-light"
          >
            Lebenslauf als PDF
          </a>
        </p>
      </div>
    </footer>
  );
}