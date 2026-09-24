'use client';

import {useState} from 'react';

export function GitaVerseIndex({
  total,
  locale
}: {
  total: number;
  locale: string;
}) {
  const [open, setOpen] = useState(false);
  const en = locale !== 'hi';

  return (
    <div className="gita-verse-index">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="gita-verse-toggle"
      >
        <span className="gita-verse-toggle-label">
          <span aria-hidden="true" className="gita-verse-toggle-icon">
            ॥
          </span>
          {en ? `Jump to verse · ${total} shlokas` : `श्लोक पर जाएँ · ${total} श्लोक`}
        </span>
        <span
          className="gita-verse-chevron"
          data-open={open}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>
      {open ? (
        <nav
          aria-label={en ? 'Verses' : 'श्लोक'}
          className="gita-verse-grid"
        >
          {Array.from({length: total}).map((_, i) => (
            <a
              key={i + 1}
              href={`#verse-${i + 1}`}
              onClick={() => setOpen(false)}
              className="gita-verse-dot"
            >
              {i + 1}
            </a>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
