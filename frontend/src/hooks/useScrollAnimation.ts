import { useEffect, useRef } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

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

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const revealAll = () => {
      elements.forEach((element) => element.classList.add('visible'));
    };

    let observer: IntersectionObserver | null = null;

    const startObserving = () => {
      if (observer) return;

      const newObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
      );

      observer = newObserver;

      elements.forEach((element) => {
        if (!element.classList.contains('visible')) {
          newObserver.observe(element);
        }
      });
    };

    const applyPreference = () => {
      if (mediaQuery.matches) {
        observer?.disconnect();
        observer = null;
        revealAll();
      } else {
        startObserving();
      }
    };

    applyPreference();
    mediaQuery.addEventListener('change', applyPreference);

    return () => {
      mediaQuery.removeEventListener('change', applyPreference);
      observer?.disconnect();
    };
  }, [observeAllSelector, depsKey]);

  return containerRef;
}
