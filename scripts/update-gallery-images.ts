import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { galleryImages } from '../lib/data/gallery';

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

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  const { data: rows, error } = await supabase
    .from('gallery')
    .select('id, display_order')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Failed to load gallery:', error.message);
    process.exit(1);
  }

  const rowByOrder = new Map(
    (rows ?? []).map((row) => [row.display_order ?? 0, row.id] as const)
  );

  console.log(
    `Syncing ${galleryImages.length} gallery items (${rows?.length ?? 0} existing rows)...\n`
  );

  let updated = 0;
  let inserted = 0;
  let failed = 0;

  for (const [index, image] of galleryImages.entries()) {
    const displayOrder = index + 1;
    const payload = {
      image_url: image.imageUrl,
      title: image.title,
      description: image.description,
      category: image.category,
      display_order: displayOrder,
      is_active: true,
      updated_at: new Date().toISOString(),
    };

    const existingId = rowByOrder.get(displayOrder);

    if (existingId) {
      const { error: updateError } = await supabase
        .from('gallery')
        .update(payload)
        .eq('id', existingId);

      if (updateError) {
        console.error(`  [${displayOrder}] UPDATE FAIL:`, updateError.message);
        failed += 1;
        continue;
      }

      console.log(`  [${displayOrder}] updated → ${image.imageUrl}`);
      updated += 1;
      continue;
    }

    const { error: insertError } = await supabase.from('gallery').insert(payload);

    if (insertError) {
      console.error(`  [${displayOrder}] INSERT FAIL:`, insertError.message);
      failed += 1;
      continue;
    }

    console.log(`  [${displayOrder}] inserted → ${image.imageUrl}`);
    inserted += 1;
  }

  console.log(`\nDone: ${updated} updated, ${inserted} inserted, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
