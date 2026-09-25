'use client';

import { useEffect } from 'react';

/** One-shot entrances leave server-rendered content visible without JavaScript. */
export function ScrollDetails() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );
    document
      .querySelectorAll('[data-reveal]')
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
