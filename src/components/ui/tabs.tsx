'use client';

import {cn} from '@/lib/utils';

export function Tabs({
  items,
  defaultValue,
  value,
  onChange,
  className
}: {
  items: Array<{value: string; label: string}>;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}) {
  const active = value ?? defaultValue;

  return (
    <div role="tablist" className={cn('flex items-center gap-1 border-b border-border', className)}>
      {items.map((item) => (
        <button
          key={item.value}
          role="tab"
          aria-selected={active === item.value}
          type="button"
          onClick={() => onChange?.(item.value)}
          className={cn(
            'relative -mb-px inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium transition-colors',
            active === item.value
              ? 'text-primary'
              : 'text-muted hover:text-foreground'
          )}
        >
          {item.label}
          {active === item.value ? (
            <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />
          ) : null}
        </button>
      ))}
    </div>
  );
}