import { contactLinks } from '../../data/personal';
import { Icon, type IconName } from '../ui/Icons';
import { SectionTitle } from '../ui/SectionTitle';

export function Contact() {
  return (
    <section id="contact" className="bg-light py-20 md:py-24">
      <div className="container">
        <SectionTitle
          title="Interessiert an einer Zusammenarbeit? Ich freue mich auf Ihre Nachricht!"
          kicker="Kontakt"
        />
        <div className="mx-auto flex max-w-[600px] flex-wrap justify-start gap-4">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener nofollow' } : {})}
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-7 py-3.5 font-semibold text-navy no-underline shadow-sm-custom transition-all hover:-translate-y-0.5 hover:border-primary-light hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Icon name={link.icon as IconName} width={18} height={18} />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}