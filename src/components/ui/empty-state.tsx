import {cn} from '@/lib/utils';
import {Icon, type IconName} from '@/components/ui/icon';

export function EmptyState({
  icon = 'book',
  title,
  description,
  action,
  className
}: {
  icon?: IconName;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center',
        className
      )}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-strong text-muted">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <h2 className="font-serif text-xl font-semibold text-foreground">{title}</h2>
      {description ? <p className="max-w-md text-sm text-muted">{description}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}