import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
export async function EditorialBanner({
  title,
  description,
  image = 'quiet-study',
  eyebrow
}: {
  title: string;
  description: string;
  image?: 'quiet-study' | 'diya-evening' | 'temple-dawn';
  eyebrow: string;
}) {
  const t = await getTranslations('visual');
  return (
    <header className="editorial-banner">
      <div className="editorial-banner-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <figure className="editorial-banner-image">
        <Image
          src={`/images/${image}.webp`}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 45vw"
        />
        <figcaption>{t('art')}</figcaption>
      </figure>
    </header>
  );
}
