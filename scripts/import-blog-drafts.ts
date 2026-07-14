import { createClient } from '@supabase/supabase-js';
import { readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { getArticleImage } from './lib/article-images';
import {
  parseBlogDraftFile,
  publishedAtForDraftIndex,
  type DraftLocale,
  type ParsedBlogDraft,
} from './lib/parse-blog-draft';

function loadEnvFile(filename: string) {
  const path = resolve(process.cwd(), filename);
  const content = readFileSync(path, 'utf8');

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

loadEnvFile('.env.local');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const DRAFTS_DIR = resolve(
  process.cwd(),
  'content/blog-drafts/singing-bowls-book'
);

const DEFAULT_AUTHOR = {
  id: 'himalayan-sound',
  name: 'Himalayan Sound',
  bio: {
    en: 'Sound healing practitioners sharing wisdom from Himalayan singing bowl traditions.',
    ru: 'Практики звукового исцеления, делящиеся мудростью гималайских поющих чаш.',
    uk: 'Практики звукового зцілення, що діляться мудрістю гімалайських співаючих чаш.',
  },
};

function listDraftFiles(): string[] {
  return readdirSync(DRAFTS_DIR)
    .filter((name) => /^(0[1-9]|[12][0-9]|30)-.+\.md$/.test(name))
    .sort();
}

function injectInlineImage(
  content: string,
  imageUrl: string,
  alt: string
): string {
  const withoutImages = content
    .split('\n\n')
    .filter((block) => !/^!\[[^\]]*\]\([^)]+\)$/.test(block.trim()))
    .join('\n\n');

  const paragraphs = withoutImages.split('\n\n').filter(Boolean);
  if (paragraphs.length === 0) {
    return `![${alt}](${imageUrl})`;
  }

  const imageBlock = `![${alt}](${imageUrl})`;
  return [paragraphs[0], imageBlock, ...paragraphs.slice(1)].join('\n\n');
}

function resolveImageSet(draft: ParsedBlogDraft) {
  const mapped = getArticleImage(draft.slug);
  if (!draft.imageUrl) {
    return mapped;
  }

  return {
    url: draft.imageUrl,
    alt: mapped.alt,
  };
}

function buildContentWithImages(
  draft: ParsedBlogDraft,
  imageUrl: string,
  alt: Record<DraftLocale, string>
) {
  return {
    en: injectInlineImage(draft.content.en, imageUrl, alt.en),
    ru: injectInlineImage(draft.content.ru, imageUrl, alt.ru),
    uk: injectInlineImage(draft.content.uk, imageUrl, alt.uk),
  };
}

function buildSeo(draft: ParsedBlogDraft) {
  return {
    title: {
      en: `${draft.title.en} | Himalayan Sound Blog`,
      ru: `${draft.title.ru} | Блог Himalayan Sound`,
      uk: `${draft.title.uk} | Блог Himalayan Sound`,
    },
    description: {
      en: draft.excerpt.en,
      ru: draft.excerpt.ru,
      uk: draft.excerpt.uk,
    },
    keywords: draft.tags,
  };
}

function buildPayload(draft: ParsedBlogDraft) {
  const now = new Date().toISOString();
  const publishedAt = publishedAtForDraftIndex(draft.index);
  const imageSet = resolveImageSet(draft);
  const slug = { en: draft.slug, ru: draft.slug, uk: draft.slug };

  return {
    title: draft.title,
    excerpt: draft.excerpt,
    content: buildContentWithImages(draft, imageSet.url, imageSet.alt),
    slug,
    author: DEFAULT_AUTHOR,
    category: draft.category,
    tags: draft.tags,
    image: {
      url: imageSet.url,
      alt: imageSet.alt,
      width: 1200,
      height: 800,
      caption: draft.excerpt,
    },
    is_published: true,
    published_at: publishedAt,
    reading_time: draft.readingTime,
    seo: buildSeo(draft),
    updated_at: now,
  };
}

async function upsertDraft(draft: ParsedBlogDraft) {
  const payload = buildPayload(draft);

  const { data: existing, error: selectError } = await supabase
    .from('articles')
    .select('id')
    .eq('slug->>en', draft.slug)
    .maybeSingle();

  if (selectError) {
    throw new Error(`${draft.slug} select: ${selectError.message}`);
  }

  if (existing?.id) {
    const { error } = await supabase
      .from('articles')
      .update(payload)
      .eq('id', existing.id);

    if (error) {
      throw new Error(`${draft.slug} update: ${error.message}`);
    }

    return { action: 'updated' as const, publishedAt: payload.published_at };
  }

  const { error } = await supabase.from('articles').insert({
    ...payload,
    created_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(`${draft.slug} insert: ${error.message}`);
  }

  return { action: 'inserted' as const, publishedAt: payload.published_at };
}

async function main() {
  const files = listDraftFiles();
  console.log(`Importing ${files.length} drafts from ${DRAFTS_DIR}`);
  console.log('Schedule: 1 article per day starting today (UTC 09:00)\n');

  let ok = 0;
  let failed = 0;

  for (const fileName of files) {
    const raw = readFileSync(resolve(DRAFTS_DIR, fileName), 'utf8');
    const draft = parseBlogDraftFile(fileName, raw);

    try {
      const result = await upsertDraft(draft);
      console.log(
        `  [${String(draft.index).padStart(2, '0')}] ${result.action} ${draft.slug} → ${result.publishedAt}`
      );
      ok += 1;
    } catch (error) {
      console.error(`  [${String(draft.index).padStart(2, '0')}] FAIL ${draft.slug}:`, error);
      failed += 1;
    }
  }

  console.log(`\nDone: ${ok} ok, ${failed} failed`);

  const { count: publicCount } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true)
    .lte('published_at', new Date().toISOString());

  const { count: totalCount } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true });

  console.log(`Public blog (published_at <= now): ${publicCount ?? 0}`);
  console.log(`Total articles in DB: ${totalCount ?? 0}`);

  if (failed > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
