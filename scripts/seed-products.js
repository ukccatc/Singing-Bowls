const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const sampleProducts = [
  {
    id: 'himalayan-bronze-bowl-large',
    slug: 'tibetan-singing-bowl',
    name: {
      en: 'Large Himalayan Bronze Singing Bowl',
      ru: 'Большая Гималайская Бронзовая Поющая Чаша',
      uk: 'Велика Гімалайська Бронзова Співаюча Чаша',
    },
    description: {
      en: 'This magnificent large singing bowl is handcrafted from traditional seven-metal bronze alloy in the high Himalayas of Nepal.',
      ru: 'Эта великолепная большая поющая чаша изготовлена вручную из традиционного семиметаллического бронзового сплава в высоких Гималаях Непала.',
      uk: 'Ця чудова велика співаюча чаша виготовлена вручну з традиційного семиметалевого бронзового сплаву у високих Гімалаях Непалу.',
    },
    price: 289.99,
    currency: 'USD',
    images: [
      {
        id: 'img-1',
      