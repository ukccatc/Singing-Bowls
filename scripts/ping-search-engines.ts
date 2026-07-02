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
  const siteUrl = getSiteUrl();
  const sitemap = `${siteUrl}/sitemap.xml`;
  console.log(`Pinging search engines for ${sitemap}`);

  await ping(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemap)}`, 'Google');
  await ping(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemap)}`, 'Bing');
}

main();
