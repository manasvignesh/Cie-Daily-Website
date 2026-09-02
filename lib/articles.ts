'use client';

import {
  collection,
  doc,
  onSnapshot,
  type DocumentData,
  type FirestoreError,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';

export const ARTICLES_COLLECTION = 'posts';

export interface StorySection {
  heading: string;
  content: string;
}
export interface StoryNumber {
  value: string;
  label: string;
}
export interface StoryQuote {
  text: string;
  author: string;
}

export interface Article {
  id: string;
  headline: string;
  hook: string;
  category: string;
  imageUrl: string;
  authorName: string;
  authorAvatar: string;
  readTime: number;
  publishedAt: Date | null;
  dateLabel: string;
  isFeatured: boolean;
  quickSummary: string;
  threeThings: string[];
  keyNumber: StoryNumber | null;
  whatHappened: string;
  whyThisMatters: string;
  biggerPicture: string;
  sections: StorySection[];
  numbers: StoryNumber[];
  takeaways: string[];
  quote: StoryQuote | null;
  blocks: Array<{ type?: string; content?: string }>;
  deckCards: unknown[];
}

type Listener<T> = {
  next: (value: T) => void;
  error: (error: FirestoreError) => void;
};

const text = (...values: unknown[]) =>
  values.find((value) => typeof value === 'string' && value.trim()) as
    | string
    | undefined;
const array = (...values: unknown[]) =>
  values.find(Array.isArray) as unknown[] | undefined;
const object = (...values: unknown[]) =>
  values.find(
    (value) => value && typeof value === 'object' && !Array.isArray(value),
  ) as Record<string, unknown> | undefined;

function asDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof (value as { toDate?: unknown }).toDate === 'function')
    return (value as { toDate: () => Date }).toDate();
  if (typeof (value as { seconds?: unknown }).seconds === 'number')
    return new Date((value as { seconds: number }).seconds * 1000);
  if (typeof value === 'number' || typeof value === 'string') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
}

function labelDate(date: Date | null) {
  return date
    ? new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(date)
    : 'Recently';
}

export function normalizeCategory(value: unknown): string {
  const raw = typeof value === 'string' ? value.trim() : '';
  const key = raw.toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ');
  const aliases: Record<string, string> = {
    tech: 'Technology',
    technology: 'Technology',
    telecom: 'Technology',
    startup: 'Startups',
    startups: 'Startups',
    engineering: 'Engineering',
    infrastructure: 'Infrastructure',
    energy: 'Energy',
    science: 'Science',
    'ai & ml': 'AI & ML',
    'ai and ml': 'AI & ML',
    ai: 'AI & ML',
    'artificial intelligence': 'AI & ML',
    india: 'India',
    news: 'News',
    general: 'News',
    article: 'News',
  };
  return (
    aliases[key] ||
    (raw ? raw.replace(/\b\w/g, (letter) => letter.toUpperCase()) : 'News')
  );
}

export function categorySlug(category: string) {
  return normalizeCategory(category)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeSections(value: unknown): StorySection[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const source = item as Record<string, unknown>;
      const heading = text(source.heading, source.title) || 'The detail';
      const content =
        text(source.content, source.body, source.description, source.summary) ||
        '';
      return content ? { heading, content } : null;
    })
    .filter(Boolean) as StorySection[];
}

function normalizeNumbers(value: unknown): StoryNumber[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const source = item as Record<string, unknown>;
      const numberValue = text(source.value, source.number) || '';
      const label =
        text(source.label, source.context, source.description) || '';
      return numberValue ? { value: numberValue, label } : null;
    })
    .filter(Boolean) as StoryNumber[];
}

function isPublished(data: DocumentData) {
  const status =
    typeof data.status === 'string' ? data.status.toLowerCase().trim() : '';
  if (
    ['draft', 'review', 'processing', 'scheduled', 'rejected'].includes(status)
  )
    return false;
  return (
    !status ||
    status === 'approved' ||
    status === 'published' ||
    data.published === true
  );
}

export function normalizeArticle(
  id: string,
  data: DocumentData,
): Article | null {
  if (
    !isPublished(data) ||
    String(data.category || '').toLowerCase() === 'reel' ||
    (data.videoUrl && !data.full_article && !data.fullArticle)
  )
    return null;
  const quick = object(data.quick_brief, data.quickBrief) || {};
  const full = object(data.full_article, data.fullArticle) || {};
  const headline = text(
    data.title,
    data.headline,
    quick.headline,
    full.headline,
  );
  if (!headline) return null;
  const categoryValue = text(
    data.articleCategory,
    data.topicCategory,
    quick.category,
    data.category,
  );
  const publishedAt =
    asDate(data.publishedAt) ||
    asDate(data.createdAt) ||
    asDate(data.updatedAt);
  const threeThings = (
    array(
      quick.three_things_to_know,
      quick.threeThingsToKnow,
      data.three_things_to_know,
      data.threeThingsToKnow,
      data.threeThings,
    ) || []
  ).filter((item): item is string => typeof item === 'string' && !!item.trim());
  const keyNumberSource = object(
    quick.key_number,
    quick.keyNumber,
    quick.key_stat,
    quick.keyStat,
  );
  const numbers = normalizeNumbers(
    array(
      full.key_numbers,
      full.keyNumbers,
      full.key_stats,
      full.keyStats,
      data.numbersThatMatter,
      data.numbers_that_matter,
      data.keyNumbers,
      data.key_numbers,
    ),
  );
  const keyNumber = keyNumberSource
    ? {
        value: text(keyNumberSource.value, keyNumberSource.number) || '',
        label: text(keyNumberSource.label, keyNumberSource.context) || '',
      }
    : numbers[0] || null;
  const quoteSource = object(full.quote, data.quote);
  const media = array(data.mediaUrls) || [];
  return {
    id,
    headline,
    hook:
      text(
        data.hook,
        data.description,
        full.hook,
        quick.quick_summary,
        quick.quickSummary,
        data.quick_summary,
        data.quickSummary,
      ) || '',
    category: normalizeCategory(categoryValue),
    imageUrl:
      text(data.coverImage, data.imageUrl, data.thumbnailUrl, media[0]) || '',
    authorName:
      text(
        data.authorName,
        (data.author as Record<string, unknown> | undefined)?.name,
        (data.author as Record<string, unknown> | undefined)?.fullName,
      ) || 'CIE Daily Desk',
    authorAvatar:
      text(
        data.authorAvatar,
        (data.author as Record<string, unknown> | undefined)?.avatarUrl,
      ) || '',
    readTime: Number(data.estimatedReadTime || data.readTime || 4),
    publishedAt,
    dateLabel: labelDate(publishedAt),
    isFeatured: data.isFeatured === true || data.isTodaysDrop === true,
    quickSummary:
      text(
        quick.quick_summary,
        quick.quickSummary,
        data.in20Seconds,
        data.in_20_seconds,
        data.quick_summary,
        data.quickSummary,
        full.in20Seconds,
        full.in_20_seconds,
        full.quick_summary,
        data.description,
      ) || '',
    threeThings,
    keyNumber: keyNumber?.value ? keyNumber : null,
    whatHappened:
      text(
        full.whatHappened,
        full.what_happened,
        data.whatHappened,
        data.what_happened,
        data.keyStoryBreakdown,
        data.key_story_breakdown,
        (array(data.blocks)?.[0] as Record<string, unknown> | undefined)
          ?.content,
      ) || '',
    whyThisMatters:
      text(
        full.whyThisMatters,
        full.why_this_matters,
        full.why_it_matters,
        data.whyThisMatters,
        data.why_this_matters,
        data.whyItMatters,
        data.why_it_matters,
      ) || '',
    biggerPicture:
      text(
        full.biggerPicture,
        full.bigger_picture,
        data.biggerPicture,
        data.bigger_picture,
      ) || '',
    sections: normalizeSections(
      array(
        full.explore_sections,
        full.exploreSections,
        full.keySections,
        full.key_sections,
        data.exploreSections,
        data.explore_sections,
        data.keySections,
        data.key_sections,
      ),
    ),
    numbers,
    takeaways: (
      array(
        full.takeaways,
        full.youNowKnow,
        full.you_now_know,
        data.takeaways,
        data.youNowKnow,
        data.you_now_know,
      ) || []
    ).filter(
      (item): item is string => typeof item === 'string' && !!item.trim(),
    ),
    quote:
      quoteSource && text(quoteSource.text)
        ? {
            text: text(quoteSource.text)!,
            author:
              text(quoteSource.author, quoteSource.speaker) ||
              'CIE Daily source',
          }
        : null,
    blocks: (array(data.blocks) || []) as Array<{
      type?: string;
      content?: string;
    }>,
    deckCards: array(data.deckCards, data.deck_cards) || [],
  };
}

export function subscribeToArticles(listener: Listener<Article[]>) {
  return onSnapshot(
    collection(db, ARTICLES_COLLECTION),
    (snapshot) => {
      const articles = snapshot.docs
        .map((snapshotDoc: QueryDocumentSnapshot<DocumentData>) =>
          normalizeArticle(snapshotDoc.id, snapshotDoc.data()),
        )
        .filter(Boolean) as Article[];
      articles.sort(
        (a, b) =>
          (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0),
      );
      listener.next(articles);
    },
    listener.error,
  );
}

export function subscribeToArticle(
  id: string,
  listener: Listener<Article | null>,
) {
  return onSnapshot(
    doc(db, ARTICLES_COLLECTION, id),
    (snapshot) =>
      listener.next(
        snapshot.exists()
          ? normalizeArticle(snapshot.id, snapshot.data())
          : null,
      ),
    listener.error,
  );
}
