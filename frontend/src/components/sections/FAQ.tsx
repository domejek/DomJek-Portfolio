import { useState } from 'react';
import { faqItems } from '../../data/faq';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon } from '../ui/Icons';
import { SectionTitle } from '../ui/SectionTitle';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useScrollAnimation<HTMLDivElement>('.animate-on-scroll');

  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section id="faq" className="py-20 md:py-24">
      <div className="container" ref={ref}>
        <SectionTitle title="Antworten auf die wichtigsten Fragen" kicker="Details" />
        <div className="mx-auto max-w-[700px]">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="animate-on-scroll mb-3 overflow-hidden rounded-md border border-slate-200 transition-shadow hover:shadow-sm-custom"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 bg-white p-5 text-left text-base font-semibold text-navy transition-colors hover:bg-lighter"
                >
                  {item.question}
                  <Icon
                    name="chevron-down"
                    width={18}
                    height={18}
                    className={`shrink-0 text-gray transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ease-out ${
                    isOpen ? 'max-h-[300px]' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 pb-5 text-sm leading-relaxed text-gray">{item.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}