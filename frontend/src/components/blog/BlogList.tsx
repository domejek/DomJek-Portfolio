import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blog';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export function BlogList() {
  const ref = useScrollAnimation<HTMLDivElement>('.animate-on-scroll');

  return (
    <div className="container py-8 pb-16" ref={ref}>
      <header className="mb-10 pb-8 pt-10">
        <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Blog</span>
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-navy md:text-[2.8rem]">
          Tutorials, Case Studies &amp; Einblicke
        </h1>
        <div className="mt-4 h-px w-12 bg-primary" />
      </header>

      <div className="mx-auto flex max-w-[800px] flex-col gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.meta.slug}
            className="animate-on-scroll rounded-lg border border-slate-200 bg-white shadow-sm-custom transition-colors hover:border-primary-light/60"
          >
            <div className="p-8">
              <span className="mb-3 inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[0.8rem] font-medium text-slate">
                {post.meta.category}
              </span>
              <h2 className="mb-3 font-serif text-2xl font-semibold leading-snug text-navy">
                <Link to={`/blog/${post.meta.slug}`} className="no-underline hover:text-primary-light">
                  {post.meta.title}
                </Link>
              </h2>
              <p className="mb-4 leading-relaxed text-gray">{post.meta.excerpt}</p>
              <div className="text-sm text-gray-light">
                <span>{post.meta.date}</span>
                <span className="ml-4">· {post.meta.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}