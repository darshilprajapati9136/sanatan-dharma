import {Link} from '@/i18n/navigation';
import {pickLocalizedText} from '@/lib/localized';
import type {TopicDiagram as TopicDiagramData} from '@/content/learn/types';

/**
 * Data-driven sequence diagram for a Learn topic.
 *
 * A semantic ordered list styled as a vertical journey: numbered markers
 * joined by a decorative rail (aria-hidden). Screen readers hear the same
 * content as numbered steps; sighted readers see the flow. No client
 * JavaScript, no animation — readable at 320px and inert under
 * reduced-motion by construction.
 */
export function TopicDiagram({diagram, locale}: {diagram: TopicDiagramData; locale: string}) {
  if (diagram.kind !== 'sequence' || diagram.steps.length === 0) {
    return null;
  }

  const title = pickLocalizedText(locale, diagram.title.en, diagram.title.hi);

  return (
    <section aria-label={title} className="rounded-xl border border-border bg-surface px-5 py-5 sm:px-6">
      <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      <ol className="mt-4 flex flex-col">
        {diagram.steps.map((step, index) => {
          const label = pickLocalizedText(locale, step.label.en, step.label.hi);
          const detail = step.detail
            ? pickLocalizedText(locale, step.detail.en, step.detail.hi)
            : null;
          const isLast = index === diagram.steps.length - 1;
          return (
            <li key={`${index}-${step.label.en}`} className="relative flex gap-4 pb-6 last:pb-0">
              <span aria-hidden="true" className="flex flex-col items-center">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-serif text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                {isLast ? null : <span className="mt-1 w-px flex-1 bg-border" />}
              </span>
              <span className="flex flex-col gap-0.5 pb-1 pt-1">
                {step.href ? (
                  <Link
                    href={step.href}
                    className="text-sm font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                  >
                    {label} →
                  </Link>
                ) : (
                  <span className="text-sm font-semibold text-foreground">{label}</span>
                )}
                {detail ? <span className="text-sm leading-relaxed text-muted">{detail}</span> : null}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
