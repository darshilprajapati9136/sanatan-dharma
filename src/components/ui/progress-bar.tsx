import {cn} from '@/lib/utils';

export function ProgressBar({
  value,
  max = 100,
  className,
  label
}: {
  value: number;
  max?: number;
  className?: string;
  label?: string;
}) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label ? (
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground">{label}</span>
          <span className="text-muted">{Math.round(percent)}%</span>
        </div>
      ) : null}
      <div role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} className="h-2 w-full overflow-hidden rounded-full bg-surface-strong">
        <div className="h-full rounded-full bg-primary transition-all" style={{width: `${percent}%`}} />
      </div>
    </div>
  );
}