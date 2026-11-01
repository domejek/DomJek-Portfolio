import { Link } from 'react-router-dom';
import { personal } from '../../data/personal';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-lighter py-8 text-center text-gray">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} {personal.name} – Softwareentwickler &middot;{' '}
          <a
            href={personal.resumePdf}
            download
            className="text-gray no-underline transition-colors hover:text-primary"
          >
            Lebenslauf als PDF
          </a>
        </p>
        <p className="mt-2 text-sm">
          <Link to="/impressum" className="text-gray no-underline transition-colors hover:text-primary">
            Impressum
          </Link>
          <span className="mx-2" aria-hidden="true">
            &middot;
          </span>
          <Link
            to="/datenschutz"
            className="text-gray no-underline transition-colors hover:text-primary"
          >
            Datenschutz
          </Link>
        </p>
      </div>
    </footer>
  );
}
