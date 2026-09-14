import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMobileNav } from '../../hooks/useMobileNav';

const navSections = [
  { label: 'Über mich', target: 'about' },
  { label: 'Werdegang', target: 'timeline' },
  { label: 'Skills', target: 'skills' },
  { label: 'Tech Stack', target: 'tech' },
  { label: 'Projekte', target: 'projects' },
  { label: 'Kontakt', target: 'contact' },
];

export function Navbar() {
  const { isOpen, toggle, close } = useMobileNav();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    close();
  }, [location.pathname, close]);

  const handleSectionClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    }
    close();
  };

  return (
    <nav className="sticky top-0 z-50 bg-navy/95 px-0 py-4 shadow-[0_2px_20px_rgba(0,0,0,0.1)] backdrop-blur-xl">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white no-underline">
          <span className="bg-gradient-to-br from-primary-light to-accent bg-clip-text text-transparent">
            DJ
          </span>{' '}
          Portfolio
        </Link>

        <button
          type="button"
          onClick={toggle}
          className="flex flex-col gap-[5px] bg-transparent p-2 md:hidden"
          aria-label="Navigation umschalten"
          aria-expanded={isOpen}
        >
          <span
            className={`block h-[2px] w-6 rounded-sm bg-gray-light transition-all duration-300 ${
              isOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-6 rounded-sm bg-gray-light transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-6 rounded-sm bg-gray-light transition-all duration-300 ${
              isOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>

        <ul
          className={`flex flex-col gap-6 px-6 pb-6 ${
            isOpen ? 'flex max-h-96' : 'hidden'
          } md:flex md:flex-row md:items-center md:gap-8 md:px-0 md:pb-0 ${
            isOpen
              ? 'absolute left-0 right-0 top-full bg-navy/95 shadow-lg backdrop-blur-xl'
              : ''
          }`}
        >
          {navSections.map((item) => (
            <li key={item.target}>
              <a
                href={`/#${item.target}`}
                onClick={(e) => handleSectionClick(e, item.target)}
                className="group relative text-[0.95rem] font-medium text-gray-light no-underline transition-colors hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary-light transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/blog"
              className="group relative text-[0.95rem] font-medium text-gray-light no-underline transition-colors hover:text-white"
            >
              Blog
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary-light transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}