import {cn} from '@/lib/utils';

export function Badge({
  children,
  variant = 'neutral',
  className
}: {
  children: React.ReactNode;
  variant?: 'neutral' | 'accent';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variant === 'accent'
          ? 'border-accent/40 bg-accent/15 text-accent-foreground'
          : 'border-border bg-surface-strong text-muted',
        className
      )}
    >
      {children}
    </span>
  );
}