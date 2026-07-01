import { getSiteUrl } from '../lib/site';

async function ping(url: string, label: string) {
  try {
    const response = await fetch(url);
    console.log(`${label}: ${response.status} ${response.statusText}`);
  } catch (error) {
    console.error(`${label}: failed`, error);
  }
}

async function main() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    console.error('Set NEXT_PUBLIC_APP_URL to your production URL');
    process.exit(1);
  }

  const sitemap = `${siteUrl.replace(/\/$/, '')}/sitemap.xml`;
  console.log(`Pinging search engines for ${sitemap}`);

  await ping(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemap)}`, 'Google');
  await ping(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemap)}`, 'Bing');
}

main();
