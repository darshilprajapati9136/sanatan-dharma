import {gitaChapters, type GitaChapterDetail, type GitaVerse} from './chapters';
import {chapter1Meta, chapter1Verses} from './chapter-01';
import {chapter2Meta, chapter2Verses} from './chapter-02';
import {chapter3Meta, chapter3Verses} from './chapter-03';
import {chapter4Meta, chapter4Verses} from './chapter-04';
import {chapter5Meta, chapter5Verses} from './chapter-05';
import {chapter6Meta, chapter6Verses} from './chapter-06';
import {chapter7Meta, chapter7Verses} from './chapter-07';
import {chapter8Meta, chapter8Verses} from './chapter-08';
import {chapter9Meta, chapter9Verses} from './chapter-09';
import {chapter10Meta, chapter10Verses} from './chapter-10';
import {chapter11Meta, chapter11Verses} from './chapter-11';
import {chapter12Meta, chapter12Verses} from './chapter-12';
import {chapter13Meta, chapter13Verses} from './chapter-13';
import {chapter14Meta, chapter14Verses} from './chapter-14';
import {chapter15Meta, chapter15Verses} from './chapter-15';
import {chapter16Meta, chapter16Verses} from './chapter-16';
import {chapter17Meta, chapter17Verses} from './chapter-17';
import {chapter18Meta, chapter18Verses} from './chapter-18';

export * from './chapters';

const chapterData: Record<string, {meta: GitaChapterDetail; verses: GitaVerse[]} | undefined> = {
  'chapter-1': {meta: chapter1Meta, verses: chapter1Verses},
  'chapter-2': {meta: chapter2Meta, verses: chapter2Verses},
  'chapter-3': {meta: chapter3Meta, verses: chapter3Verses},
  'chapter-4': {meta: chapter4Meta, verses: chapter4Verses},
  'chapter-5': {meta: chapter5Meta, verses: chapter5Verses},
  'chapter-6': {meta: chapter6Meta, verses: chapter6Verses},
  'chapter-7': {meta: chapter7Meta, verses: chapter7Verses},
  'chapter-8': {meta: chapter8Meta, verses: chapter8Verses},
  'chapter-9': {meta: chapter9Meta, verses: chapter9Verses},
  'chapter-10': {meta: chapter10Meta, verses: chapter10Verses},
  'chapter-11': {meta: chapter11Meta, verses: chapter11Verses},
  'chapter-12': {meta: chapter12Meta, verses: chapter12Verses},
  'chapter-13': {meta: chapter13Meta, verses: chapter13Verses},
  'chapter-14': {meta: chapter14Meta, verses: chapter14Verses},
  'chapter-15': {meta: chapter15Meta, verses: chapter15Verses},
  'chapter-16': {meta: chapter16Meta, verses: chapter16Verses},
  'chapter-17': {meta: chapter17Meta, verses: chapter17Verses},
  'chapter-18': {meta: chapter18Meta, verses: chapter18Verses}
};

export function getGitaChapter(slug: string) {
  const meta = gitaChapters.find((ch) => ch.slug === slug);
  if (!meta || !meta.available) return null;
  const data = chapterData[slug];
  if (!data) return null;
  return {meta: data.meta, verses: data.verses};
}

export function getAvailableGitaChapters() {
  return gitaChapters.filter((ch) => ch.available && chapterData[ch.slug]);
}
