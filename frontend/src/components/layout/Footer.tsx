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
      </div>
    </footer>
  );
}