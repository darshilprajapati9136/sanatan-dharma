import {getTranslations} from 'next-intl/server';
import {EmptyState} from '@/components/ui/empty-state';

export default async function PlaceholderPage({title}: {title: string}) {
  const t = await getTranslations('placeholder');

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 lg:px-8">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">{title}</h1>
        <p className="text-muted">{t('description')}</p>
      </div>
      <EmptyState icon="book" title={t('heading')} description={t('section')} />
    </section>
  );
}