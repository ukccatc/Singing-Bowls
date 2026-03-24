const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vwcorowwnxsluacgprbh.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3Y29yb3d3bnhzbHVhY2dwcmJoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDM0MTU0OSwiZXhwIjoyMDg5OTE3NTQ5fQ.ybxJXhVZr9bYx6F8SvvXPeMZ-pCHZQDnzpJkpctjFnw';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const sampleProducts = [
  {
    slug: 'tibetan-singing-bowl',
    name: {
      en: 'Large Himalayan Bronze Singing Bowl',
      ru: 'Большая Гималайская Бронзовая Поющая Чаша',
      uk: 'Велика Гімалайська Бронзова Співаюча Чаша',
    },
    description: {
      en: 'This magnificent large singing bowl is handcrafted from traditional seven-metal bronze alloy in the high Himalayas of Nepal. Each bowl is individually tuned and produces rich, harmonious tones perfect for deep meditation, sound healing, and chakra balancing.',
      ru: 'Эта великолепная большая поющая чаша изготовлена вручную из традиционного семиметаллического бронзового сплава в высоких Гималаях Непала.',
      uk: 'Ця чудова велика співаюча чаша виготовлена вручну з традиційного семиметалевого бронзового сплаву у високих Гімалаях Непалу.',
    },
    price: 289.99,
    currency: 'USD',
    images: [
      {
        id: 'img-1',
        url: 'https://images.pexels.com/photos/3997132/pexels-photo-3997132.jpeg',
        alt: { en: 'Large Himalayan Bronze Singing Bowl', ru: 'Большая гималайская бронзовая поющая чаша', uk: 'Велика гімалайська бронзова співаюча чаша' },
        width: 800,
        height: 600,
        isPrimary: true,
      },
    ],
    audio_sample: '/audio/large-bowl-sample.mp3',
    category: 'SINGING_BOWLS',
    specifications: [],
    inventory: 12,
    sku: 'HSB-LRG-BRZ-001',
    weight: 2100,
    dimensions: { diameter: 25, height: 12, unit: 'cm' },
    materials: ['Bronze', 'Copper', 'Tin'],
    origin: 'Kathmandu Valley, Nepal',
    craftsman: 'Pemba Sherpa',
    is_handmade: true,
    is_featured: true,
    is_available: true,
    tags: ['meditation', 'chakra-healing', 'sound-therapy'],
    seo: { title: { en: 'Large Himalayan Bronze Singing Bowl' }, description: { en: 'Authentic large Himalayan singing bowl' }, keywords: ['singing bowl', 'himalayan', 'meditation'] },
  },
  {
    slug: 'crystal-meditation-bell',
    name: {
      en: 'Crystal Meditation Bell',
      ru: 'Хрустальный Медитативный Колокольчик',
      uk: 'Кришталевий Медитативний Дзвіночок',
    },
    description: {
      en: 'A beautiful crystal meditation bell that produces clear, pure tones perfect for mindfulness practice.',
      ru: 'Красивый хрустальный медитативный колокольчик, который производит чистые, ясные тона.',
      uk: 'Красивий кришталевий медитативний дзвіночок, який видає чисті, ясні тони.',
    },
    price: 89.99,
    currency: 'USD',
    images: [
      {
        id: 'img-3',
        url: 'https://images.pexels.com/photos/3997132/pexels-photo-3997132.jpeg',
        alt: { en: 'Crystal meditation bell', ru: 'Хрустальный медитативный колокольчик', uk: 'Кришталевий медитативний дзвіночок' },
        width: 800,
        height: 600,
        isPrimary: true,
      },
    ],
    category: 'MEDITATION_BELLS',
    specifications: [],
    inventory: 8,
    sku: 'CMB-CRYSTAL-001',
    weight: 500,
    dimensions: { height: 15, unit: 'cm' },
    materials: ['Crystal', 'Wood'],
    origin: 'Kathmandu Valley, Nepal',
    is_handmade: true,
    is_featured: false,
    is_available: true,
    tags: ['meditation', 'mindfulness', 'crystal'],
    seo: { title: { en: 'Crystal Meditation Bell' }, description: { en: 'Beautiful crystal meditation bell' }, keywords: ['meditation bell', 'crystal'] },
  },
];

async function seedProducts() {
  try {
    console.log('🌱 Starting product seeding...\n');

    // Clear existing products
    console.log('🗑️  Clearing existing products...');
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
      console.warn('⚠️  Warning clearing products:', deleteError.message);
    }

    // Insert sample products
    console.log('📝 Inserting sample products...\n');

    for (const product of sampleProducts) {
      const { error: insertError } = await supabase
        .from('products')
        .insert(product);

      if (insertError) {
        console.error(`❌ Error inserting ${product.slug}:`, insertError.message);
      } else {
        console.log(`✅ ${product.name.en}`);
      }
    }

    console.log('\n✨ Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedProducts();
