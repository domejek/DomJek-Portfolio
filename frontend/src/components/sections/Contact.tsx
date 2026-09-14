import { contactLinks } from '../../data/personal';
import { Icon, type IconName } from '../ui/Icons';
import { SectionTitle } from '../ui/SectionTitle';

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-light py-20 text-white md:py-24"
    >
      <div className="pointer-events-none absolute -bottom-1/3 -left-1/10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.1),transparent_70%)]" />
      <div className="container relative z-10">
        <SectionTitle title="Kontakt" subtitle="Interessiert an einer Zusammenarbeit? Ich freue mich auf Ihre Nachricht!" dark />
        <div className="mx-auto flex max-w-[600px] flex-wrap justify-center gap-4">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener nofollow' } : {})}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-light px-8 py-4 font-semibold text-white no-underline transition-all hover:-translate-y-0.5 hover:bg-primary hover:shadow-[0_8px_24px_rgba(59,130,246,0.4)]"
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