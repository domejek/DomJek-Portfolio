import type { ComponentProps } from 'react';
import { HighlightBox } from './HighlightBox';

const preClass =
  'my-6 overflow-x-auto rounded-lg bg-navy p-5 text-sm leading-relaxed text-slate-100';

const inlineCodeClass =
  'rounded bg-light px-1.5 py-0.5 font-mono text-sm text-primary';

const pClass = 'mb-5 leading-relaxed text-slate';

const h2Class = 'mb-4 mt-10 text-2xl font-bold text-navy';
const h3Class = 'mb-3 mt-8 text-xl font-semibold text-navy';

const ulClass = 'mb-6 ml-6 list-disc leading-relaxed text-slate';
const olClass = 'mb-6 ml-6 list-decimal leading-relaxed text-slate';
const liClass = 'mb-2';

export const mdxComponents = {
  h2: (props: ComponentProps<'h2'>) => <h2 className={h2Class} {...props} />,
  h3: (props: ComponentProps<'h3'>) => <h3 className={h3Class} {...props} />,
  p: (props: ComponentProps<'p'>) => <p className={pClass} {...props} />,
  ul: (props: ComponentProps<'ul'>) => <ul className={ulClass} {...props} />,
  ol: (props: ComponentProps<'ol'>) => <ol className={olClass} {...props} />,
  li: (props: ComponentProps<'li'>) => <li className={liClass} {...props} />,
  strong: (props: ComponentProps<'strong'>) => <strong className="font-semibold text-navy" {...props} />,
  a: ({ href, children }: ComponentProps<'a'>) => (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener nofollow' : undefined}
      className="text-primary hover:text-primary-dark"
    >
      {children}
    </a>
  ),
  code: (props: ComponentProps<'code'>) => <code className={inlineCodeClass} {...props} />,
  pre: (props: ComponentProps<'pre'>) => <pre className={preClass} {...props} />,
  div: ({ className, children, ...props }: ComponentProps<'div'>) => {
    if (className === 'highlight-box') {
      return <HighlightBox>{children}</HighlightBox>;
    }
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  },
};