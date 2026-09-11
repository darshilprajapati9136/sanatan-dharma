import {cn} from '@/lib/utils';
import {Link} from '@/i18n/navigation';

export function Breadcrumb({
  items,
  className
}: {
  items: Array<{label: string; href?: string}>;
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex flex-wrap items-center gap-1.5 text-sm text-muted', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {index > 0 ? <span className="text-muted/60">/</span> : null}
            {isLast || !item.href ? (
              <span className={cn(isLast && 'font-medium text-foreground')}>{item.label}</span>
            ) : (
              <Link href={item.href} className="transition-colors hover:text-primary">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}