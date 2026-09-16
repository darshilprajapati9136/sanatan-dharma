import Image from 'next/image';
import {cn} from '@/lib/utils';

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0]?.[0] ?? '?';
  return letters.toUpperCase();
}

export function Avatar({
  name,
  src,
  size = 'md',
  className
}: {
  name: string;
  src?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-primary/15 text-primary',
        size === 'sm' && 'h-8 w-8 text-xs',
        size === 'md' && 'h-10 w-10 text-sm',
        size === 'lg' && 'h-14 w-14 text-lg',
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes={size === 'lg' ? '56px' : size === 'sm' ? '32px' : '40px'}
          className="object-cover"
        />
      ) : (
        initials(name)
      )}
    </span>
  );
}