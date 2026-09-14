import { useEffect, useRef } from 'react';

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  observeAllSelector?: string,
  deps: unknown[] = [],
) {
  const containerRef = useRef<T>(null);
  const depsKey = JSON.stringify(deps);

  useEffect(() => {
    const elements = observeAllSelector
      ? containerRef.current?.querySelectorAll<HTMLElement>(observeAllSelector)
      : containerRef.current
        ? [containerRef.current]
        : [];

    if (!elements || elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [observeAllSelector, depsKey]);

  return containerRef;
}