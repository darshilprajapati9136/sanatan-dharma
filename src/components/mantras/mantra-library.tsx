'use client';

import {useMemo, useState} from 'react';
import {Link} from '@/i18n/navigation';
import {mantras, mantraCategories, type MantraCategory} from '@/content/mantras';
import {pickLocalizedText} from '@/lib/localized';

export function MantraLibrary({locale}: {locale: string}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<MantraCategory | 'all'>('all');
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mantras.filter((m) => {
      if (category !== 'all' && m.category !== category) return false;
      if (!q) return true;
      return (
        m.devanagari.includes(query.trim()) ||
        m.transliteration.toLowerCase().includes(q) ||
        m.meaning.en.toLowerCase().includes(q) ||
        m.meaning.hi.includes(query.trim()) ||
        m.deity.en.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="mantra-library">
      <div className="mantra-toolbar">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            locale === 'hi' ? 'मंत्र, देवता खोजें…' : 'Search mantra, deity…'
          }
          aria-label={locale === 'hi' ? 'मंत्र खोजें' : 'Search mantras'}
          className="mantra-search"
        />
        <div className="mantra-filters" role="tablist" aria-label="Categories">
          <button
            onClick={() => setCategory('all')}
            data-active={category === 'all'}
            className="mantra-chip"
          >
            {locale === 'hi' ? 'सभी' : 'All'} · {mantras.length}
          </button>
          {(
            Object.entries(mantraCategories) as [
              MantraCategory,
              {en: string; hi: string}
            ][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              data-active={category === key}
              className="mantra-chip"
            >
              {pickLocalizedText(locale, label.en, label.hi)}
            </button>
          ))}
        </div>
      </div>

      <p className="mantra-count" role="status">
        {filtered.length === 0
          ? locale === 'hi'
            ? 'कोई मंत्र नहीं मिला।'
            : 'No mantras found.'
          : locale === 'hi'
            ? `${filtered.length} मंत्र`
            : `${filtered.length} mantras`}
      </p>

      <ul className="mantra-grid">
        {filtered.map((m) => (
          <li key={m.id} className="mantra-card">
            <div className="mantra-card-top">
              <span className="mantra-deity">
                {pickLocalizedText(locale, m.deity.en, m.deity.hi)}
              </span>
              <span className="mantra-source">
                {pickLocalizedText(locale, m.source.en, m.source.hi)}
              </span>
            </div>
            <p className="mantra-devanagari" lang="sa">
              {m.devanagari}
            </p>
            <p className="mantra-translit">{m.transliteration}</p>
            <p className="mantra-meaning">
              {pickLocalizedText(locale, m.meaning.en, m.meaning.hi)}
            </p>
            <div className="mantra-actions">
              <button
                onClick={() => copy(m.id, `${m.devanagari}\n${m.transliteration}`)}
                className="mantra-btn"
              >
                {copied === m.id
                  ? locale === 'hi'
                    ? '✓ प्रतिलिपि'
                    : '✓ Copied'
                  : locale === 'hi'
                    ? 'प्रतिलिपि'
                    : 'Copy'}
              </button>
              <Link
                href={`/japa?mantra=${m.id}`}
                className="mantra-btn mantra-btn-primary"
              >
                {locale === 'hi' ? 'जप करें →' : 'Start japa →'}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
