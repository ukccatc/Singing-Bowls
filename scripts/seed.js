const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vwcorowwnxsluacgprbh.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3Y29yb3d3bnhzbHVhY2dwcmJoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDM0MTU0OSwiZXhwIjoyMDg5OTE3NTQ5fQ.ybxJXhVZr9bYx6F8SvvXPeMZ-pCHZQDnzpJkpctjFnw';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const sampleProducts = [
  {
    slug: 'tibetan-singing-bowl-large',
    name: { en: 'Large Himalayan Bronze Singing Bowl', ru: 'Большая Гималайская Бронзовая Поющая Чаша', uk: 'Велика Гімалайська Бронзова Співаюча Чаша' },
    description: { en: 'Handcrafted from traditional seven-metal bronze alloy. Individually tuned for deep meditation and sound healing.', ru: 'Изготовлена вручную из традиционного семиметаллического бронзового сплава.', uk: 'Виготовлена вручну з традиційного семиметалевого бронзового сплаву.' },
    price: 289.99, currency: 'USD',
    images: [{ id: 'img-1', url: 'https://pixabay.com/get/g8596ea0479f08d66f34521a8147c6c4676ab879f1504a3c2aaf8970a10151e2653262613aff7487f5d58788f4f0ba307_1920.jpg', alt: { en: 'Large Himalayan Bronze Singing Bowl', ru: 'Большая гималайская бронзовая поющая чаша', uk: 'Велика гімалайська бронзова співаюча чаша' }, width: 800, height: 600, isPrimary: true }],
    category: 'SINGING_BOWLS', inventory: 12, sku: 'HSB-LRG-001', weight: 2100, dimensions: { diameter: 25, height: 12, unit: 'cm' }, materials: ['Bronze', 'Copper', 'Tin'], origin: 'Kathmandu Valley, Nepal', craftsman: 'Pemba Sherpa', is_handmade: true, is_featured: true, is_available: true, tags: ['meditation', 'chakra-healing', 'sound-therapy'], seo: {}
  },
  {
    slug: 'crystal-meditation-bell',
    name: { en: 'Crystal Meditation Bell', ru: 'Хрустальный Медитативный Колокольчик', uk: 'Кришталевий Медитативний Дзвіночок' },
    description: { en: 'Beautiful crystal bell producing clear, pure tones for mindfulness practice.', ru: 'Красивый хрустальный колокольчик с чистыми тонами.', uk: 'Красивий кришталевий дзвіночок з чистими тонами.' },
    price: 89.99, currency: 'USD',
    images: [{ id: 'img-2', url: 'https://pixabay.com/get/g1105b72cc7e9cb65c10e06b455b39b02b8810a057e80f3a3742c79870dad9bd554f9236ed8d1505f63b6ac2b660d16ba_1920.jpg', alt: { en: 'Crystal meditation bell', ru: 'Хрустальный медитативный колокольчик', uk: 'Кришталевий медитативний дзвіночок' }, width: 800, height: 600, isPrimary: true }],
    category: 'MEDITATION_BELLS', inventory: 8, sku: 'CMB-CRYSTAL-001', weight: 500, dimensions: { height: 15, unit: 'cm' }, materials: ['Crystal', 'Wood'], origin: 'Kathmandu Valley, Nepal', is_handmade: true, is_featured: false, is_available: true, tags: ['meditation', 'mindfulness', 'crystal'], seo: {}
  },
  {
    slug: 'medium-singing-bowl-bronze',
    name: { en: 'Medium Bronze Singing Bowl', ru: 'Средняя Бронзовая Поющая Чаша', uk: 'Середня Бронзова Співаюча Чаша' },
    description: { en: 'Perfect for personal meditation practice with excellent sound quality and portability.', ru: 'Идеально подходит для личной медитативной практики.', uk: 'Ідеально підходить для особистої медитативної практики.' },
    price: 179.99, currency: 'USD',
    images: [{ id: 'img-3', url: 'https://pixabay.com/get/gbfee393171f080c7823d53b1895012846b78daf3881151acd881e94ac67adff4ccd01b9aa12b266c251fef82e3737569_1920.jpg', alt: { en: 'Medium Bronze Singing Bowl', ru: 'Средняя бронзовая поющая чаша', uk: 'Середня бронзова співаюча чаша' }, width: 800, height: 600, isPrimary: true }],
    category: 'SINGING_BOWLS', inventory: 15, sku: 'MSB-MED-001', weight: 1200, dimensions: { diameter: 18, height: 10, unit: 'cm' }, materials: ['Bronze', 'Copper'], origin: 'Kathmandu Valley, Nepal', craftsman: 'Tenzin Dorje', is_handmade: true, is_featured: true, is_available: true, tags: ['meditation', 'sound-healing', 'portable'], seo: {}
  },
  {
    slug: 'small-singing-bowl-beginner',
    name: { en: 'Small Singing Bowl for Beginners', ru: 'Маленькая Поющая Чаша для Начинающих', uk: 'Маленька Співаюча Чаша для Початківців' },
    description: { en: 'Excellent starter bowl with easy-to-produce tones. Perfect for those new to sound meditation.', ru: 'Отличная поющая чаша для начинающих.', uk: 'Відмінна співаюча чаша для початківців.' },
    price: 59.99, currency: 'USD',
    images: [{ id: 'img-4', url: 'https://pixabay.com/get/g90e20d89abf79cfe664fc71ab838ec8f12c4fece4b86ecd10f512857887af362e8df081676ef21a1a8bdac7d14dd269a_1920.jpg', alt: { en: 'Small Singing Bowl', ru: 'Маленькая поющая чаша', uk: 'Маленька співаюча чаша' }, width: 800, height: 600, isPrimary: true }],
    category: 'SINGING_BOWLS', inventory: 20, sku: 'SSB-SML-001', weight: 600, dimensions: { diameter: 12, height: 8, unit: 'cm' }, materials: ['Bronze'], origin: 'Kathmandu Valley, Nepal', is_handmade: true, is_featured: false, is_available: true, tags: ['beginner', 'meditation', 'affordable'], seo: {}
  },
  {
    slug: 'tibetan-gong-meditation',
    name: { en: 'Tibetan Meditation Gong', ru: 'Тибетский Медитативный Гонг', uk: 'Тибетський Медитативний Гонг' },
    description: { en: 'Powerful gong for deep meditation and sound baths. Creates immersive sonic experiences for healing.', ru: 'Мощный гонг для глубокой медитации и звуковых ванн.', uk: 'Потужний гонг для глибокої медитації та звукових ванн.' },
    price: 349.99, currency: 'USD',
    images: [{ id: 'img-5', url: 'https://pixabay.com/get/g0968e1057907de4a70c4539801ac88a2640da76ad16d8e5fba6bcabc3add81a3e7277328d1ae91be78e6bfef1575a637_1920.jpg', alt: { en: 'Tibetan Meditation Gong', ru: 'Тибетский медитативный гонг', uk: 'Тибетський медитативний гонг' }, width: 800, height: 600, isPrimary: true }],
    category: 'GONGS', inventory: 5, sku: 'TG-MED-001', weight: 3500, dimensions: { diameter: 35, unit: 'cm' }, materials: ['Bronze', 'Copper', 'Tin'], origin: 'Kathmandu Valley, Nepal', craftsman: 'Karma Tenzin', is_handmade: true, is_featured: true, is_available: true, tags: ['gong', 'sound-bath', 'healing'], seo: {}
  },
  {
    slug: 'meditation-cushion-zafu',
    name: { en: 'Meditation Cushion (Zafu)', ru: 'Медитативная Подушка (Дзафу)', uk: 'Медитативна Подушка (Дзафу)' },
    description: { en: 'Premium meditation cushion for comfortable sitting during long meditation sessions. Filled with buckwheat hulls.', ru: 'Премиальная медитативная подушка для удобного сидения.', uk: 'Преміальна медитативна подушка для комфортного сидіння.' },
    price: 49.99, currency: 'USD',
    images: [{ id: 'img-6', url: 'https://pixabay.com/get/gb681e7e0843e54314d7f4b361f2aaef761ca914ec276e13d1983a7a35204d650b9e12e6130ea0767dfa0b562b08c8b68_1920.jpg', alt: { en: 'Meditation Cushion', ru: 'Медитативная подушка', uk: 'Медитативна подушка' }, width: 800, height: 600, isPrimary: true }],
    category: 'ACCESSORIES', inventory: 25, sku: 'MC-ZAFU-001', weight: 800, dimensions: { diameter: 35, height: 15, unit: 'cm' }, materials: ['Cotton', 'Buckwheat Hulls'], origin: 'Nepal', is_handmade: false, is_featured: false, is_available: true, tags: ['cushion', 'meditation', 'comfort'], seo: {}
  },
  {
    slug: 'singing-bowl-striker-mallet',
    name: { en: 'Singing Bowl Striker & Mallet Set', ru: 'Набор Молоточка и Палочки для Поющей Чаши', uk: 'Набір Молоточка та Палички для Співаючої Чаші' },
    description: { en: 'Professional-grade strikers and mallets for playing singing bowls. Includes soft and hard options.', ru: 'Профессиональные молоточки и палочки для игры на поющих чашах.', uk: 'Професійні молоточки та палички для гри на співаючих чашах.' },
    price: 24.99, currency: 'USD',
    images: [{ id: 'img-7', url: 'https://pixabay.com/get/g11cc11ac6aa8fdd8c0415ab5c0632d5eb1873d2d9acbdc1301ff309edb5852976716f33120f3599ee564939c5e0247ae_1920.jpg', alt: { en: 'Singing Bowl Striker Set', ru: 'Набор молоточков для поющей чаши', uk: 'Набір молоточків для співаючої чаші' }, width: 800, height: 600, isPrimary: true }],
    category: 'ACCESSORIES', inventory: 30, sku: 'SBS-STRIKER-001', weight: 200, dimensions: { length: 25, unit: 'cm' }, materials: ['Wood', 'Felt', 'Leather'], origin: 'Nepal', is_handmade: true, is_featured: false, is_available: true, tags: ['accessories', 'striker', 'mallet'], seo: {}
  },
  {
    slug: 'sound-healing-gift-set',
    name: { en: 'Sound Healing Gift Set', ru: 'Подарочный Набор для Звукового Исцеления', uk: 'Подарунковий Набір для Звукового Зцілення' },
    description: { en: 'Complete gift set including medium singing bowl, striker, cushion, and instruction guide. Perfect for beginners.', ru: 'Полный подарочный набор для начинающих.', uk: 'Повний подарунковий набір для початківців.' },
    price: 199.99, currency: 'USD',
    images: [{ id: 'img-8', url: 'https://pixabay.com/get/g2134786ff6625bed84c2cab0fb109eb4385d526773c982bd61dac1c603cbde3e552b4d80c36741532f878a2981eeaefa_1920.jpg', alt: { en: 'Sound Healing Gift Set', ru: 'Подарочный набор для звукового исцеления', uk: 'Подарунковий набір для звукового зцілення' }, width: 800, height: 600, isPrimary: true }],
    category: 'GIFT_SETS', inventory: 10, sku: 'SHGS-001', weight: 2000, dimensions: { unit: 'cm' }, materials: ['Bronze', 'Cotton', 'Wood'], origin: 'Nepal', is_handmade: true, is_featured: true, is_available: true, tags: ['gift-set', 'beginner', 'complete'], seo: {}
  },
  {
    slug: 'chakra-balancing-bowl-set',
    name: { en: 'Chakra Balancing Bowl Set (7 Bowls)', ru: 'Набор Чаш для Балансировки Чакр (7 Чаш)', uk: 'Набір Чаш для Балансування Чакр (7 Чаш)' },
    description: { en: 'Seven singing bowls tuned to the seven chakras. Each bowl corresponds to a specific chakra for energy balancing.', ru: 'Семь поющих чаш, настроенных на семь чакр.', uk: 'Сім співаючих чаш, налаштованих на сім чакр.' },
    price: 599.99, currency: 'USD',
    images: [{ id: 'img-9', url: 'https://pixabay.com/get/g037dc03849983aba193444119c248792b9a78a6916fe407c661d2eda01601fbfe49478f9cc97e59eb0adffb3e4929eec_1920.jpg', alt: { en: 'Chakra Balancing Bowl Set', ru: 'Набор чаш для балансировки чакр', uk: 'Набір чаш для балансування чакр' }, width: 800, height: 600, isPrimary: true }],
    category: 'GIFT_SETS', inventory: 3, sku: 'CBBS-7-001', weight: 5000, dimensions: { unit: 'cm' }, materials: ['Bronze', 'Copper', 'Tin'], origin: 'Kathmandu Valley, Nepal', craftsman: 'Master Artisan Collective', is_handmade: true, is_featured: true, is_available: true, tags: ['chakra', 'healing', 'premium'], seo: {}
  },
  {
    slug: 'sound-bath-experience-kit',
    name: { en: 'Sound Bath Experience Kit', ru: 'Набор для Опыта Звуковой Ванны', uk: 'Набір для Досвіду Звукової Ванни' },
    description: { en: 'Professional sound bath kit with large gong, singing bowls, and complete accessories. For practitioners and therapists.', ru: 'Профессиональный набор для звуковой ванны.', uk: 'Професійний набір для звукової ванни.' },
    price: 899.99, currency: 'USD',
    images: [{ id: 'img-10', url: 'https://pixabay.com/get/g7d029e6d5134495ab9bf294dbcad16fa6c166702870fab0efcb5d18ab8c2aaf2c3caf4cb8a8a7da578813435acf473bf_1920.jpg', alt: { en: 'Sound Bath Experience Kit', ru: 'Набор для опыта звуковой ванны', uk: 'Набір для досвіду звукової ванни' }, width: 800, height: 600, isPrimary: true }],
    category: 'GIFT_SETS', inventory: 2, sku: 'SBEK-PRO-001', weight: 8000, dimensions: { unit: 'cm' }, materials: ['Bronze', 'Copper', 'Tin', 'Wood', 'Cotton'], origin: 'Kathmandu Valley, Nepal', craftsman: 'Master Artisan Collective', is_handmade: true, is_featured: true, is_available: true, tags: ['professional', 'sound-bath', 'complete'], seo: {}
  },
];

async function seedProducts() {
  try {
    console.log('🌱 Starting product seeding...\n');

    console.log('🗑️  Clearing existing products...');
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
      console.warn('⚠️  Warning clearing products:', deleteError.message);
    }

    console.log('📝 Inserting 10 sample products...\n');

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

    console.log('\n✨ Seeding complete! 10 products added.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedProducts();
