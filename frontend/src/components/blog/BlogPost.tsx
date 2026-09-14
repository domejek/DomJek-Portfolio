import { MDXProvider } from '@mdx-js/react';
import { Link, useParams } from 'react-router-dom';
import { getBlogPost } from '../../data/blog';
import { mdxComponents } from './mdxComponents';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold text-navy">Beitrag nicht gefunden</h1>
        <p className="mb-6 text-gray">
          Der gesuchte Blog-Beitrag existiert nicht oder wurde verschoben.
        </p>
        <Link to="/blog" className="font-semibold text-primary no-underline hover:text-primary-dark">
          Zurück zum Blog
        </Link>
      </div>
    );
  }

  const { meta, Content } = post;

  return (
    <div>
      <header className="bg-gradient-to-br from-navy to-navy-light py-12 text-white">
        <div className="container">
          <div className="mx-auto max-w-[720px]">
            <Link to="/blog" className="mb-4 inline-block text-[0.95rem] font-medium text-gray-light no-underline hover:text-primary-light">
              &larr; Zurück zum Blog
            </Link>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight md:text-4xl">{meta.title}</h1>
            <div className="text-sm text-gray-light">
              <span>{meta.date}</span>
              <span className="ml-6">· {meta.readTime}</span>
              <span className="ml-6">· {meta.tags.join(', ')}</span>
            </div>
          </div>
        </div>
      </header>

      <article className="container max-w-[720px] py-10">
        <MDXProvider components={mdxComponents}>
          <Content />
        </MDXProvider>
      </article>
    </div>
  );
}