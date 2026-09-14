import { useCallback, useEffect, useState } from 'react';

export function useMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) close();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [close]);

  return { isOpen, toggle: () => setIsOpen((v) => !v), close };
}