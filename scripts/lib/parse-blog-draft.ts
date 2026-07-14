import { ArticleCategory } from '../../lib/types';

export type DraftLocale = 'en' | 'ru' | 'uk';

export interface ParsedBlogDraft {
  fileName: string;
  index: number;
  slug: string;
  category: ArticleCategory;
  tags: string[];
  imageUrl?: string;
  title: Record<DraftLocale, string>;
  excerpt: Record<DraftLocale, string>;
  content: Record<DraftLocale, string>;
  readingTime: number;
}

const LOCALE_HEADERS: Record<DraftLocale, RegExp> = {
  en: /^## EN — (.+)$/,
  ru: /^## RU — (.+)$/,
  uk: /^## UK — (.+)$/,
};

const CATEGORY_MAP: Record<string, ArticleCategory> = {
  CULTURE: ArticleCategory.CULTURE,
  SOUND_HEALING: ArticleCategory.SOUND_HEALING,
  TUTORIALS: ArticleCategory.TUTORIALS,
  MEDITATION: ArticleCategory.MEDITATION,
  WELLNESS: ArticleCategory.WELLNESS,
};

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function parseHeader(lines: string[]): {
  category: string;
  tags: string[];
  imageUrl?: string;
} {
  let category = 'CULTURE';
  let tags: string[] = [];
  let imageUrl: string | undefined;

  for (const line of lines) {
    if (line.startsWith('category:')) {
      category = line.replace('category:', '').trim();
    }
    if (line.startsWith('tags:')) {
      tags = line
        .replace('tags:', '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }
    if (line.startsWith('image:')) {
      imageUrl = line.replace('image:', '').trim();
    }
    if (line.trim() === '---') break;
  }

  return { category, tags, imageUrl };
}

function parseLocaleSection(
  lines: string[],
  startIndex: number
): { title: string; excerpt: string; content: string; endIndex: number } | null {
  const headerLine = lines[startIndex];
  let title = '';

  for (const locale of Object.keys(LOCALE_HEADERS) as DraftLocale[]) {
    const match = headerLine.match(LOCALE_HEADERS[locale]);
    if (match) {
      title = match[1].trim();
      break;
    }
  }

  if (!title) return null;

  let excerpt = '';
  const bodyLines: string[] = [];
  let i = startIndex + 1;

  while (i < lines.length) {
    const line = lines[i];

    if (line.match(/^## (EN|RU|UK) — /)) break;
    if (line.trim() === '---') break;

    const excerptMatch = line.match(/^\*\*Excerpt:\*\*\s*(.+)$/);
    if (excerptMatch && !excerpt) {
      excerpt = excerptMatch[1].trim();
      i += 1;
      continue;
    }

    if (line.trim() === '' && !bodyLines.length && !excerpt) {
      i += 1;
      continue;
    }

    bodyLines.push(line);
    i += 1;
  }

  while (bodyLines.length && bodyLines[bodyLines.length - 1].trim() === '') {
    bodyLines.pop();
  }

  return {
    title,
    excerpt,
    content: bodyLines.join('\n').trim(),
    endIndex: i,
  };
}

export function parseBlogDraftFile(
  fileName: string,
  raw: string
): ParsedBlogDraft {
  const indexMatch = fileName.match(/^(\d{2})-/);
  if (!indexMatch) {
    throw new Error(`Invalid draft filename (expected NN-slug.md): ${fileName}`);
  }

  const index = Number(indexMatch[1]);
  const slug = fileName.replace(/^\d{2}-/, '').replace(/\.md$/, '');
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  const { category, tags, imageUrl } = parseHeader(lines);

  const title: Record<DraftLocale, string> = { en: '', ru: '', uk: '' };
  const excerpt: Record<DraftLocale, string> = { en: '', ru: '', uk: '' };
  const content: Record<DraftLocale, string> = { en: '', ru: '', uk: '' };

  let i = 0;
  while (i < lines.length) {
    if (lines[i].match(/^## (EN|RU|UK) — /)) {
      const section = parseLocaleSection(lines, i);
      if (!section) {
        i += 1;
        continue;
      }

      const localeHeader = lines[i].match(/^## (EN|RU|UK) — /);
      const localeKey = localeHeader![1].toLowerCase() as DraftLocale;

      title[localeKey] = section.title;
      excerpt[localeKey] = section.excerpt;
      content[localeKey] = section.content;
      i = section.endIndex;
      continue;
    }
    i += 1;
  }

  if (!title.en) {
    throw new Error(`Missing EN section in ${fileName}`);
  }

  const mappedCategory =
    CATEGORY_MAP[category.toUpperCase()] ?? ArticleCategory.CULTURE;

  return {
    fileName,
    index,
    slug,
    category: mappedCategory,
    tags,
    imageUrl,
    title,
    excerpt,
    content,
    readingTime: Math.max(1, Math.ceil(countWords(content.en) / 200)),
  };
}

export function publishedAtForDraftIndex(
  index: number,
  startDate = new Date()
): string {
  const date = new Date(
    Date.UTC(
      startDate.getUTCFullYear(),
      startDate.getUTCMonth(),
      startDate.getUTCDate(),
      9,
      0,
      0,
      0
    )
  );
  date.setUTCDate(date.getUTCDate() + (index - 1));
  return date.toISOString();
}
