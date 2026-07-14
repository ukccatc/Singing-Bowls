import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

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
  console.error('Missing Supabase env vars in .env.local');
  process.exit(1);
}

async function main() {
  const { syncGalleryAlbumSeeds } = await import('../lib/admin/gallery-albums-sync');
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const result = await syncGalleryAlbumSeeds(supabase);

    for (const line of result.details) {
      console.log(`  ${line}`);
    }

    console.log(`\nDone: ${result.ok} ok, ${result.failed} failed`);
    if (result.failed > 0) process.exit(1);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('gallery_albums')) {
      console.error(
        '\nAlbum tables are missing. Run: npm run migrate:gallery-albums'
      );
    } else {
      console.error(message);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
