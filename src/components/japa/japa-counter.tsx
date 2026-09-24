'use client';

import Image from 'next/image';
import {useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore} from 'react';
import {mantras, getMantra} from '@/content/mantras';
import {pickLocalizedText} from '@/lib/localized';

const COUNT_KEY = 'sd-japa-counts-v1';
const IMAGE_KEY = 'sd-japa-image-v1';
const DEFAULT_IMAGE = '/images/temple-dawn.webp';
const PRESETS = [
  {id: 'none', label: 'None', src: ''},
  {id: 'temple', label: 'Temple', src: DEFAULT_IMAGE},
  {id: 'diya', label: 'Diya', src: '/images/diya-evening.webp'},
  {id: 'quiet', label: 'Quiet', src: '/images/quiet-study.webp'}
];

const TARGETS = [11, 21, 27, 54, 108, 1008];

function subscribe(callback: () => void): () => void {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function useStoredRaw(key: string): string | null {
  return useSyncExternalStore(
    subscribe,
    () => {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => null
  );
}

function writeStored(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event('storage'));
  } catch {
    /* storage unavailable */
  }
}

interface Counts {
  [mantraId: string]: {total: number; today: string; todayCount: number};
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadCounts(): Counts {
  try {
    return JSON.parse(localStorage.getItem(COUNT_KEY) ?? '{}') as Counts;
  } catch {
    return {};
  }
}

async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* fall through to legacy path */
    }
  }
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

export function JapaCounter({
  locale,
  initialMantra
}: {
  locale: string;
  initialMantra: string;
}) {
  const validInitial = getMantra(initialMantra) ? initialMantra : 'sita-ram';
  const [mantraId, setMantraId] = useState(validInitial);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(108);
  const [sound, setSound] = useState(true);
  const [flash, setFlash] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<AudioContext | null>(null);

  const mantra = getMantra(mantraId) ?? mantras[0];

  const imageRaw = useStoredRaw(IMAGE_KEY);
  const countsRaw = useStoredRaw(COUNT_KEY);

  const {src: image, preset: presetId} = useMemo(() => {
    try {
      if (imageRaw) {
        const saved = JSON.parse(imageRaw) as {src?: string; preset?: string};
        if (typeof saved.src === 'string')
          return {
            src: saved.src,
            preset: typeof saved.preset === 'string' ? saved.preset : 'custom'
          };
      }
    } catch {
      /* corrupt entry — fall back to default */
    }
    return {src: DEFAULT_IMAGE, preset: 'temple'};
  }, [imageRaw]);

  const {lifetime, todayCount} = useMemo(() => {
    const tk = todayKey();
    try {
      const all = countsRaw ? (JSON.parse(countsRaw) as Counts) : {};
      const entry = all[mantraId];
      return {
        lifetime: entry?.total ?? 0,
        todayCount: entry && entry.today === tk ? entry.todayCount : 0
      };
    } catch {
      return {lifetime: 0, todayCount: 0};
    }
  }, [countsRaw, mantraId]);

  const selectMantra = (id: string) => {
    setMantraId(id);
    setCount(0);
  };

  const persist = useCallback(
    (delta: number) => {
      try {
        const all = loadCounts();
        const tk = todayKey();
        const prev = all[mantraId] ?? {total: 0, today: tk, todayCount: 0};
        const base = prev.today === tk ? prev.todayCount : 0;
        const next = {
          total: Math.max(0, prev.total + delta),
          today: tk,
          todayCount: Math.max(0, base + delta)
        };
        all[mantraId] = next;
        localStorage.setItem(COUNT_KEY, JSON.stringify(all));
      } catch {
        /* storage unavailable */
      }
    },
    [mantraId]
  );

  const tick = useCallback(() => {
    if (!sound) return;
    try {
      audioRef.current ??= new window.AudioContext();
      const ctx = audioRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 528;
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      /* audio unavailable */
    }
    try {
      navigator.vibrate?.(12);
    } catch {
      /* noop */
    }
  }, [sound]);

  const increment = useCallback(() => {
    setCount((c) => c + 1);
    persist(1);
    tick();
    setFlash(true);
    setTimeout(() => setFlash(false), 120);
  }, [persist, tick]);

  // Space / Enter to count
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') return;
      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        increment();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [increment]);

  const decrement = () => {
    if (count <= 0) return;
    setCount((c) => c - 1);
    persist(-1);
  };

  const reset = () => {
    persist(-count);
    setCount(0);
  };

  const onFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    if (file.size > 2_500_000) {
      alert(
        locale === 'hi'
          ? 'कृपया 2.5MB से छोटी छवि चुनें।'
          : 'Please choose an image smaller than 2.5MB.'
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const src = String(reader.result ?? '');
      writeStored(IMAGE_KEY, JSON.stringify({src, preset: 'custom'}));
    };
    reader.readAsDataURL(file);
  };

  const choosePreset = (id: string, src: string) => {
    writeStored(IMAGE_KEY, JSON.stringify({src, preset: id}));
  };

  const removeImage = () => choosePreset('none', '');

  const malas = Math.floor(count / 108);
  const progress = target > 0 ? Math.min(100, (count / target) * 100) : 0;
  const complete = target > 0 && count >= target;

  const en = locale !== 'hi';

  const shareText = useMemo(
    () =>
      en
        ? `I completed ${count} japa of ${mantra.transliteration} today. 🙏`
        : `आज मैंने ${mantra.devanagari} के ${count} जप पूरे किए। 🙏`,
    [count, en, mantra]
  );

  const copy = useCallback(async () => {
    const ok = await copyText(shareText);
    setCopied(ok);
    setTimeout(() => setCopied(false), 2000);
    if (!ok) {
      alert(
        en
          ? 'Copying failed in this browser. Copy manually: ' + shareText.slice(0, 120)
          : 'इस ब्राउज़र में प्रतिलिपि असफल रही। स्वयं प्रतिलिपि करें: ' +
              shareText.slice(0, 120)
      );
    }
  }, [en, shareText]);

  return (
    <div className="japa-wrap">
      {/* Focus image */}
      <div className="japa-focus">
        <div className={`japa-photo ${flash ? 'japa-photo-flash' : ''}`}>
          {image ? (
            image.startsWith('data:') ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={en ? 'Your chosen focus image' : 'आपकी चुनी छवि'} />
            ) : (
              <Image
                src={image}
                alt={en ? 'Focus image for japa' : 'जप के लिए छवि'}
                fill
                sizes="(max-width: 640px) 100vw, 420px"
              />
            )
          ) : (
            <div className="japa-photo-empty" aria-hidden="true">
              ॐ
            </div>
          )}
        </div>

        <div className="japa-mantra-line">
          <p lang="sa" className="japa-devanagari">
            {mantra.devanagari}
          </p>
          <p className="japa-translit">{mantra.transliteration}</p>
          <p className="japa-meaning">
            {pickLocalizedText(locale, mantra.meaning.en, mantra.meaning.hi)}
          </p>
        </div>

        {/* Custom image controls */}
        <details className="japa-image-picker">
          <summary>
            {en ? '🖼 Change focus image (add your own)' : '🖼 छवि बदलें (अपनी जोड़ें)'}
          </summary>
          <div className="japa-presets">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => choosePreset(p.id, p.src)}
                data-active={presetId === p.id}
                className="japa-preset"
              >
                {p.src ? (
                  <Image src={p.src} alt={p.label} width={64} height={64} />
                ) : (
                  <span className="japa-preset-none">ॐ</span>
                )}
                <small>{p.id === 'none' ? (en ? 'None' : 'नहीं') : p.label}</small>
              </button>
            ))}
            <button
              onClick={() => fileRef.current?.click()}
              data-active={presetId === 'custom'}
              className="japa-preset japa-upload"
            >
              <span aria-hidden="true">＋</span>
              <small>{en ? 'Your photo' : 'आपकी फोटो'}</small>
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => onFile(e.target.files?.[0])}
          />
          <div className="japa-image-actions">
            <button onClick={() => fileRef.current?.click()} className="mantra-btn">
              {en ? 'Upload your own image' : 'अपनी छवि अपलोड करें'}
            </button>
            {image && (
              <button onClick={removeImage} className="mantra-btn">
                {en ? 'Remove' : 'हटाएँ'}
              </button>
            )}
          </div>
          <p className="japa-hint">
            {en
              ? 'Your image stays in this browser only (under ~2.5MB). Ideal: your Ishta-devata, guru or temple photo.'
              : 'आपकी छवि केवल इसी ब्राउज़र में रहती है (~2.5MB तक)। इष्टदेव, गुरु या मंदिर की फोटो उत्तम।'}
          </p>
        </details>
      </div>

      {/* Counter */}
      <div className="japa-panel">
        <div className="japa-selects">
          <label>
            <span>{en ? 'Mantra / Naam' : 'मंत्र / नाम'}</span>
            <select value={mantraId} onChange={(e) => selectMantra(e.target.value)}>
              {mantras.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.transliteration.slice(0, 32)} · {m.devanagari.slice(0, 12)}…
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>{en ? 'Sankalpa (target)' : 'संकल्प (लक्ष्य)'}</span>
            <select value={target} onChange={(e) => setTarget(Number(e.target.value))}>
              {TARGETS.map((n) => (
                <option key={n} value={n}>
                  {n} {n === 108 ? (en ? '(1 mala)' : '(1 माला)') : ''}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="japa-progress" aria-hidden="true">
          <div className="japa-progress-bar" style={{width: `${progress}%`}} />
        </div>
        <p className="japa-progress-text" role="status">
          {en
            ? `${count} / ${target} · ${malas} mala${malas === 1 ? '' : 's'} · ${Math.round(progress)}%`
            : `${count} / ${target} · ${malas} माला · ${Math.round(progress)}%`}
        </p>

        {complete && (
          <p className="japa-complete" role="status">
            {en
              ? `🙏 Sankalpa complete! ${count} japa. Keep going or reset.`
              : `🙏 संकल्प पूर्ण! ${count} जप। आगे बढ़ें या रीसेट करें।`}
          </p>
        )}

        <button
          onClick={increment}
          className={`japa-big-btn ${flash ? 'japa-big-btn-flash' : ''}`}
          aria-label={en ? 'Count one japa' : 'एक जप गिनें'}
        >
          <span className="japa-big-count">{count}</span>
          <span className="japa-big-hint">
            {en ? 'Tap · Space' : 'स्पर्श · स्पेस'} 👆
          </span>
        </button>

        <div className="japa-row">
          <button onClick={decrement} disabled={count <= 0} className="mantra-btn">
            {en ? '−1 Undo' : '−1 वापस'}
          </button>
          <button onClick={reset} disabled={count <= 0} className="mantra-btn">
            {en ? 'Reset' : 'रीसेट'}
          </button>
          <button
            onClick={() => setSound((s) => !s)}
            className="mantra-btn"
            aria-pressed={sound}
          >
            {sound ? (en ? '🔔 Sound on' : '🔔 ध्वनि चालू') : en ? '🔕 Muted' : '🔕 मौन'}
          </button>
        </div>

        <dl className="japa-stats">
          <div>
            <dt>{en ? 'Today (this naam)' : 'आज (यह नाम)'}</dt>
            <dd>{todayCount}</dd>
          </div>
          <div>
            <dt>{en ? 'Lifetime (this naam)' : 'कुल (यह नाम)'}</dt>
            <dd>{lifetime}</dd>
          </div>
          <div>
            <dt>{en ? 'Malas (session)' : 'माला (सत्र)'}</dt>
            <dd>{malas}</dd>
          </div>
        </dl>

        <button onClick={copy} className="mantra-btn">
          {copied
            ? en
              ? 'Copied ✓'
              : 'प्रतिलिपि ✓'
            : en
              ? 'Copy progress to share'
              : 'प्रगति प्रतिलिपि करें'}
        </button>
        <p className="japa-hint">
          {en
            ? 'Counts are saved in this browser. For mala practice: 108 = 1 mala. Traditionally the sumeru bead is not crossed — turn the mala around.'
            : 'गिनती इसी ब्राउज़र में सहेजी जाती है। माला विधि: 108 = 1 माला। परंपरा से सुमेरु नहीं लाँघते — माला घुमा लें।'}
        </p>
      </div>
    </div>
  );
}
