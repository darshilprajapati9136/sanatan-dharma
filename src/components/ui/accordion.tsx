import type {ReactNode} from 'react';
import {cn} from '@/lib/utils';

export function Accordion({
  items,
  className
}: {
  items: Array<{title: string | ReactNode; content: ReactNode; defaultOpen?: boolean}>;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((item, index) => (
        <details
          key={index}
          open={item.defaultOpen}
          className="group rounded-xl border border-border bg-surface transition-colors open:bg-surface-strong/60 hover:bg-surface-strong/60"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
            {item.title}
            <span className="text-muted transition-transform group-open:rotate-180">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </summary>
          <div className="border-t border-border px-5 py-4 text-sm text-muted">{item.content}</div>
        </details>
      ))}
    </div>
  );
}