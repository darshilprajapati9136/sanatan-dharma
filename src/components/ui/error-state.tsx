import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';

export function ErrorState({
  title,
  description,
  actionLabel,
  onRetry,
  className
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="status"
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-xl border border-danger/40 bg-danger/5 px-6 py-16 text-center',
        className
      )}
    >
      <h2 className="font-serif text-xl font-semibold text-danger">{title}</h2>
      <p className="max-w-md text-sm text-muted">{description}</p>
      {actionLabel && onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}