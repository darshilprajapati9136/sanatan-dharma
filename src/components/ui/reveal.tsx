'use client';
import {useEffect, useRef} from 'react';
/** Content remains visible without JavaScript and when reduced motion is requested. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 20
}: {
  children: React.ReactNode;
  className?: string;
  /** Delay before the reveal plays, in milliseconds. */
  delay?: number;
  /** Vertical travel distance in pixels. */
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (
      !node ||
      matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            node.classList.add('reveal-active');
            node.animate(
              [
                {opacity: 0, transform: `translateY(${y}px)`},
                {opacity: 1, transform: 'translateY(0)'}
              ],
              {
                duration: 650,
                easing: 'cubic-bezier(.22,1,.36,1)',
                delay,
                fill: 'backwards'
              }
            );
            observer.unobserve(node);
          }
      },
      {threshold: 0.08}
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay, y]);
  return (
    <div ref={ref} className={className} data-reveal-root="">
      {children}
    </div>
  );
}
