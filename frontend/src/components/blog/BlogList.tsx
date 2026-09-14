import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blog';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export function BlogList() {
  const ref = useScrollAnimation<HTMLDivElement>('.animate-on-scroll');

  return (
    <div className="container py-8 pb-16" ref={ref}>
      <header className="mb-10 pb-8 pt-10 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-navy md:text-[2.8rem]">Blog</h1>
        <p className="mx-auto max-w-[600px] text-lg text-gray">
          Tutorials, Case Studies und Einblicke in meine Arbeit als Softwareentwickler
        </p>
      </header>

      <div className="mx-auto flex max-w-[800px] flex-col gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.meta.slug}
            className="animate-on-scroll overflow-hidden rounded-xl border border-black/5 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="p-8">
              <span className="mb-3 inline-block rounded-full bg-gradient-to-br from-primary-light/10 to-accent/10 px-3 py-1.5 text-[0.8rem] font-medium text-primary">
                {post.meta.category}
              </span>
              <h2 className="mb-3 text-2xl font-bold text-navy">
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