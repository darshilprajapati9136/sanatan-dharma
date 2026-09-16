import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Breadcrumb} from '@/components/ui/breadcrumb';
import {getScriptureStructure} from '@/server/services/content';
import {pickLocalizedText} from '@/lib/localized';

export const dynamic = 'force-dynamic';

type Section = {
  id: string;
  parentId: string | null;
  sectionNumber: string | null;
  slug: string;
  titleEn: string | null;
  titleHi: string | null;
  descriptionEn: string | null;
  descriptionHi: string | null;
  sortOrder: string | null;
};

function SectionTree({
  sections,
  parentId,
  slug,
  locale
}: {
  sections: Section[];
  parentId: string | null;
  slug: string;
  locale: string;
}) {
  const children = sections.filter((section) => section.parentId === parentId);

  if (children.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-3">
      {children.map((section) => {
        const title = pickLocalizedText(locale, section.titleEn, section.titleHi);

        return (
          <li key={section.id}>
            <Link
              href={`/scriptures/${slug}/${section.slug}`}
              className="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary"
            >
              <p className="font-serif text-lg font-semibold text-foreground">
                {title || section.slug}
              </p>
              {section.sectionNumber ? (
                <p className="mt-1 text-sm text-muted">{section.sectionNumber}</p>
              ) : null}
            </Link>
            {sections.some((child) => child.parentId === section.id) ? (
              <div className="ml-4 mt-3 border-l border-border pl-4">
                <SectionTree sections={sections} parentId={section.id} slug={slug} locale={locale} />
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export default async function ScriptureDetailPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('scriptures');
  const navT = await getTranslations({locale, namespace: 'nav'});
  const scripture = await getScriptureStructure(slug);

  if (!scripture) {
    notFound();
  }

  const title = pickLocalizedText(locale, scripture.titleEn, scripture.titleHi);
  const description = pickLocalizedText(locale, scripture.descriptionEn, scripture.descriptionHi);

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 lg:px-8">
      <Breadcrumb
        items={[
          {label: navT('scriptures'), href: '/scriptures'},
          {label: title || scripture.slug}
        ]}
      />

      <div className="mb-8 mt-4 flex flex-col gap-2">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
          {title || scripture.slug}
        </h1>
        {description ? <p className="text-muted">{description}</p> : null}
      </div>

      <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">{t('chapters')}</h2>
      <SectionTree sections={scripture.sections} parentId={null} slug={scripture.slug} locale={locale} />
    </section>
  );
}
