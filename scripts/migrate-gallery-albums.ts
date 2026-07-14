import { readFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';

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

const migrationPath = resolve(
  process.cwd(),
  'supabase/migrations/20260714_create_gallery_albums.sql'
);

async function main() {
  const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

  if (!databaseUrl) {
    console.error('Missing DATABASE_URL in .env.local');
    console.error('');
    console.error('Add your Supabase Postgres connection string:');
    console.error('Supabase Dashboard → Project Settings → Database → Connection string (URI)');
    console.error('Example: DATABASE_URL=postgresql://postgres.[ref]:[password]@...pooler.supabase.com:6543/postgres');
    process.exit(1);
  }

  const sql = readFileSync(migrationPath, 'utf8');
  const client = new pg.Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('Applying gallery albums migration...\n');
    await client.query(sql);
    console.log('Migration applied successfully.');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('already exists')) {
      console.log('Migration already applied (objects exist).');
    } else {
      console.error('Migration failed:', message);
      process.exit(1);
    }
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
