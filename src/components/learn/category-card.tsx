import {Link} from '@/i18n/navigation';
import {Icon, type IconName} from '@/components/ui/icon';
import {Reveal} from '@/components/ui/reveal';

/**
 * Editorial index row for one Learn category on the landing page.
 * Numbered rows communicate suggested reading order better than a
 * uniform card grid, and tolerate long Hindi descriptions.
 */
export function CategoryCard({
  href,
  icon,
  index,
  title,
  description,
  topicsLabel
}: {
  href: string;
  icon: IconName;
  index: number;
  title: string;
  description: string;
  topicsLabel: string;
}) {
  return (
    <li>
      <Reveal>
        <Link
          href={href}
          className="group flex items-start gap-4 rounded-xl border border-border bg-surface px-5 py-5 transition-colors hover:border-primary sm:items-center sm:gap-6 sm:px-6"
        >
          <span aria-hidden="true" className="font-serif text-lg font-semibold text-muted">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon name={icon} className="h-5 w-5" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="font-serif text-lg font-semibold tracking-tight text-foreground group-hover:text-primary">
              {title}
            </span>
            <span className="text-sm leading-relaxed text-muted">{description}</span>
            <span className="text-xs font-medium text-muted">{topicsLabel}</span>
          </span>
          <Icon
            name="arrowRight"
            className="mt-1 h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary sm:mt-0"
          />
        </Link>
      </Reveal>
    </li>
  );
}
