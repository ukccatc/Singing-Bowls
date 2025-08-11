import { Product, ProductCategory } from '../types';

export const sampleProducts: Product[] = [
  {
    id: 'himalayan-bronze-bowl-large',
    slug: 'tibetan-singing-bowl',
    name: {
      en: 'Large Himalayan Bronze Singing Bowl',
      ru: 'Большая Гималайская Бронзовая Поющая Чаша',
      uk: 'Велика Гімалайська Бронзова Співаюча Чаша',
    },
    description: {
      en: 'This magnificent large singing bowl is handcrafted from traditional seven-metal bronze alloy in the high Himalayas of Nepal. Each bowl is individually tuned and produces rich, harmonious tones perfect for deep meditation, sound healing, and chakra balancing. The intricate hand-etched patterns around the rim represent ancient Tibetan mantras and symbols of protection and wisdom.\n\nCrafted by master artisan Pemba Sherpa, who learned this ancient art from his grandfather, this bowl carries the spiritual energy of generations of skilled craftspeople. The bowl\'s deep, resonant tone promotes relaxation, reduces stress, and enhances spiritual practice.\n\nEach purchase includes a premium leather striker and silk cushion, beautifully packaged in a traditional Nepalese gift box.',
      ru: 'Эта великолепная большая поющая чаша изготовлена вручную из традиционного семиметаллического бронзового сплава в высоких Гималаях Непала. Каждая чаша индивидуально настроена и производит богатые, гармоничные тона, идеальные для глубокой медитации, звукового исцеления и балансировки чакр. Замысловатые ручные узоры вокруг края представляют древние тибетские мантры и символы защиты и мудрости.\n\nИзготовлена мастером-ремесленником Пемба Шерпа, который изучил это древнее искусство у своего деда, эта чаша несет духовную энергию поколений умелых мастеров. Глубокий, резонансный тон чаши способствует расслаблению, уменьшает стресс и усиливает духовную практику.\n\nКаждая покупка включает премиальный кожаный молоточек и шелковую подушку, красиво упакованные в традиционную непальскую подарочную коробку.',
      uk: 'Ця чудова велика співаюча чаша виготовлена вручну з традиційного семиметалевого бронзового сплаву у високих Гімалаях Непалу. Кожна чаша індивідуально налаштована і видає багаті, гармонійні тони, ідеальні для глибокої медитації, звукового зцілення та балансування чакр. Складні ручні візерунки навколо краю представляють стародавні тибетські мантри та символи захисту і мудрості.\n\nВиготовлена майстром-ремісником Пемба Шерпа, який вивчив це стародавнє мистецтво у свого діда, ця чаша несе духовну енергію поколінь умілих майстрів. Глибокий, резонансний тон чаші сприяє розслабленню, зменшує стрес та посилює духовну практику.\n\nКожна покупка включає преміальний шкіряний молоточок та шовкову подушку, красиво упаковані в традиційну непальську подарункову коробку.',
    },
    price: 289.99,
    currency: 'USD',
    images: [
      {
        id: 'img-1',
        url: 'https://images.pexels.com/photos/3997132/pexels-photo-3997132.jpeg',
        alt: {
          en: 'Large Himalayan Bronze Singing Bowl with intricate patterns',
          ru: 'Большая гималайская бронзовая поющая чаша с замысловатыми узорами',
          uk: 'Велика гімалайська бронзова співаюча чаша зі складними візерунками',
        },
        width: 800,
        height: 600,
        isPrimary: true,
      },
      {
        id: 'img-2',
        url: 'https://images.pexels.com/photos/4022092/pexels-photo-4022092.jpeg',
        alt: {
          en: 'Side view of the singing bowl showing craftsmanship details',
          ru: 'Вид сбоку поющей чаши, показывающий детали мастерства',
          uk: 'Вид збоку співаючої чаші, що показує деталі майстерності',
        },
        width: 800,
        height: 600,
        isPrimary: false,
      },
    ],
    audioSample: '/audio/large-bowl-sample.mp3',
    category: ProductCategory.SINGING_BOWLS,
    specifications: [
      {
        name: {
          en: 'Diameter',
          ru: 'Диаметр',
          uk: 'Діаметр',
        },
        value: {
          en: '25 cm',
          ru: '25 см',
          uk: '25 см',
        },
        unit: 'cm',
      },
      {
        name: {
          en: 'Height',
          ru: 'Высота',
          uk: 'Висота',
        },
        value: {
          en: '12 cm',
          ru: '12 см',
          uk: '12 см',
        },
        unit: 'cm',
      },
      {
        name: {
          en: 'Weight',
          ru: 'Вес',
          uk: 'Вага',
        },
        value: {
          en: '2.1 kg',
          ru: '2,1 кг',
          uk: '2,1 кг',
        },
        unit: 'kg',
      },
      {
        name: {
          en: 'Material',
          ru: 'Материал',
          uk: 'Матеріал',
        },
        value: {
          en: 'Seven-metal bronze alloy',
          ru: 'Семиметаллический бронзовый сплав',
          uk: 'Семиметалевий бронзовий сплав',
        },
      },
      {
        name: {
          en: 'Note',
          ru: 'Нота',
          uk: 'Нота',
        },
        value: {
          en: 'C# (Root Chakra)',
          ru: 'C# (Корневая чакра)',
          uk: 'C# (Коренева чакра)',
        },
      },
    ],
    inventory: 12,
    sku: 'HSB-LRG-BRZ-001',
    weight: 2100, // grams
    dimensions: {
      diameter: 25,
      height: 12,
      unit: 'cm',
    },
    materials: ['Bronze', 'Copper', 'Tin', 'Silver', 'Gold', 'Iron', 'Lead'],
    origin: 'Kathmandu Valley, Nepal',
    craftsman: 'Pemba Sherpa',
    isHandmade: true,
    isFeatured: true,
    isAvailable: true,
    tags: ['meditation', 'chakra-healing', 'sound-therapy', 'handcrafted', 'traditional'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-12-15T00:00:00Z',
    seo: {
      title: {
        en: 'Large Himalayan Bronze Singing Bowl - Handcrafted in Nepal | Himalayan Sound',
        ru: 'Большая Гималайская Бронзовая Поющая Чаша - Ручная Работа из Непала | Himalayan Sound',
        uk: 'Велика Гімалайська Бронзова Співаюча Чаша - Ручна Робота з Непалу | Himalayan Sound',
      },
      description: {
        en: 'Authentic large Himalayan singing bowl handcrafted from seven-metal bronze. Perfect for meditation, sound healing, and chakra balancing. Includes striker and cushion.',
        ru: 'Аутентичная большая гималайская поющая чаша, изготовленная вручную из семиметаллической бронзы. Идеальна для медитации, звукового исцеления и балансировки чакр. Включает молоточек и подушку.',
        uk: 'Автентична велика гімалайська співаюча чаша, виготовлена вручну з семиметалевої бронзи. Ідеальна для медитації, звукового зцілення та балансування чакр. Включає молоточок та подушку.',
      },
      keywords: [
        'singing bowl',
        'himalayan',
        'bronze',
        'meditation',
        'sound healing',
        'chakra',
        'handcrafted',
        'nepal',
        'authentic',
        'traditional'
      ],
    },
  },
  {
    id: 'meditation-bell-crystal',
    slug: 'crystal-meditation-bell',
    name: {
      en: 'Crystal Meditation Bell',
      ru: 'Хрустальный Медитативный Колокольчик',
      uk: 'Кришталевий Медитативний Дзвіночок',
    },
    description: {
      en: 'A beautiful crystal meditation bell that produces clear, pure tones perfect for mindfulness practice and meditation sessions.',
      ru: 'Красивый хрустальный медитативный колокольчик, который производит чистые, ясные тона, идеальные для практики осознанности и медитативных сессий.',
      uk: 'Красивий кришталевий медитативний дзвіночок, який видає чисті, ясні тони, ідеальні для практики усвідомленості та медитативних сесій.',
    },
    price: 89.99,
    currency: 'USD',
    images: [
      {
        id: 'img-3',
        url: 'https://images.pexels.com/photos/3997132/pexels-photo-3997132.jpeg',
        alt: {
          en: 'Crystal meditation bell with wooden stand',
          ru: 'Хрустальный медитативный колокольчик с деревянной подставкой',
          uk: 'Кришталевий медитативний дзвіночок з дерев\'яною підставкою',
        },
        width: 800,
        height: 600,
        isPrimary: true,
      },
    ],
    category: ProductCategory.MEDITATION_BELLS,
    specifications: [
      {
        name: {
          en: 'Height',
          ru: 'Высота',
          uk: 'Висота',
        },
        value: {
          en: '15 cm',
          ru: '15 см',
          uk: '15 см',
        },
        unit: 'cm',
      },
      {
        name: {
          en: 'Material',
          ru: 'Материал',
          uk: 'Матеріал',
        },
        value: {
          en: 'Lead-free crystal',
          ru: 'Безсвинцовый хрусталь',
          uk: 'Безсвинцевий кришталь',
        },
      },
    ],
    inventory: 8,
    sku: 'CMB-CRYSTAL-001',
    weight: 500,
    dimensions: {
      height: 15,
      unit: 'cm',
    },
    materials: ['Crystal', 'Wood'],
    origin: 'Kathmandu Valley, Nepal',
    isHandmade: true,
    isFeatured: false,
    isAvailable: true,
    tags: ['meditation', 'mindfulness', 'crystal', 'bell', 'zen'],
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-12-15T00:00:00Z',
    seo: {
      title: {
        en: 'Crystal Meditation Bell - Mindfulness Practice | Himalayan Sound',
        ru: 'Хрустальный Медитативный Колокольчик - Практика Осознанности | Himalayan Sound',
        uk: 'Кришталевий Медитативний Дзвіночок - Практика Усвідомленості | Himalayan Sound',
      },
      description: {
        en: 'Beautiful crystal meditation bell for mindfulness practice and meditation. Produces clear, pure tones.',
        ru: 'Красивый хрустальный медитативный колокольчик для практики осознанности и медитации. Производит чистые, ясные тона.',
        uk: 'Красивий кришталевий медитативний дзвіночок для практики усвідомленості та медитації. Видає чисті, ясні тони.',
      },
      keywords: [
        'meditation bell',
        'crystal',
        'mindfulness',
        'zen',
        'meditation',
        'bell',
        'nepal'
      ],
    },
  },
];

// Product categories with translations
export const productCategories = [
  {
    id: ProductCategory.SINGING_BOWLS,
    name: {
      en: 'Singing Bowls',
      ru: 'Поющие Чаши',
      uk: 'Співаючі Чаші',
    },
    description: {
      en: 'Handcrafted singing bowls for meditation and sound healing',
      ru: 'Рукотворные поющие чаши для медитации и звукового исцеления',
      uk: 'Рукотворні співаючі чаші для медитації та звукового зцілення',
    },
  },
  {
    id: ProductCategory.MEDITATION_BELLS,
    name: {
      en: 'Meditation Bells',
      ru: 'Медитативные Колокольчики',
      uk: 'Медитативні Дзвіночки',
    },
    description: {
      en: 'Traditional bells for mindfulness and meditation practice',
      ru: 'Традиционные колокольчики для практики осознанности и медитации',
      uk: 'Традиційні дзвіночки для практики усвідомленості та медитації',
    },
  },
  {
    id: ProductCategory.GONGS,
    name: {
      en: 'Gongs',
      ru: 'Гонги',
      uk: 'Гонги',
    },
    description: {
      en: 'Ceremonial gongs for sound baths and healing sessions',
      ru: 'Церемониальные гонги для звуковых ванн и сеансов исцеления',
      uk: 'Церемоніальні гонги для звукових ванн та сеансів зцілення',
    },
  },
  {
    id: ProductCategory.ACCESSORIES,
    name: {
      en: 'Accessories',
      ru: 'Аксессуары',
      uk: 'Аксесуари',
    },
    description: {
      en: 'Mallets, cushions, and other meditation accessories',
      ru: 'Молоточки, подушки и другие аксессуары для медитации',
      uk: 'Молоточки, подушки та інші аксесуари для медитації',
    },
  },
  {
    id: ProductCategory.GIFT_SETS,
    name: {
      en: 'Gift Sets',
      ru: 'Подарочные Наборы',
      uk: 'Подарункові Набори',
    },
    description: {
      en: 'Curated gift sets for sound healing enthusiasts',
      ru: 'Курируемые подарочные наборы для энтузиастов звукового исцеления',
      uk: 'Куровані подарункові набори для ентузіастів звукового зцілення',
    },
  },
];

// Function to get products by category
export function getProductsByCategory(category: ProductCategory): Product[] {
  return sampleProducts.filter(product => product.category === category);
}

// Function to get featured products
export function getFeaturedProducts(): Product[] {
  return sampleProducts.filter(product => product.isFeatured);
}

// Function to search products
export function searchProducts(query: string, locale: string = 'en'): Product[] {
  const lowercaseQuery = query.toLowerCase();
  
  return sampleProducts.filter(product => {
    const name = product.name[locale]?.toLowerCase() || '';
    const description = product.description[locale]?.toLowerCase() || '';
    const tags = product.tags.join(' ').toLowerCase();
    const materials = product.materials.join(' ').toLowerCase();
    
    return name.includes(lowercaseQuery) ||
           description.includes(lowercaseQuery) ||
           tags.includes(lowercaseQuery) ||
           materials.includes(lowercaseQuery) ||
           product.sku.toLowerCase().includes(lowercaseQuery);
  });
}