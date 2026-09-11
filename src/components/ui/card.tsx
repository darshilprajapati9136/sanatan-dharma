import type {HTMLAttributes, ReactNode} from 'react';
import {cn} from '@/lib/utils';

export function Card({className, ...props}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-surface shadow-sm transition-colors hover:bg-surface/80',
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({className, ...props}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1 p-6 pb-4', className)} {...props} />;
}

export function CardTitle({children, className}: {children: ReactNode; className?: string}) {
  return <h3 className={cn('font-serif text-xl font-semibold tracking-tight text-foreground', className)}>{children}</h3>;
}

export function CardDescription({children, className}: {children: ReactNode; className?: string}) {
  return <p className={cn('text-sm text-muted', className)}>{children}</p>;
}

export function CardContent({className, ...props}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-2', className)} {...props} />;
}