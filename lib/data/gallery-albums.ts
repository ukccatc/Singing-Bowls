import { GalleryCategory } from '@/lib/supabase/gallery';

type LocaleText = { en: string; ru: string; uk: string };

export interface GalleryAlbumSeed {
  slug: string;
  title: LocaleText;
  description: LocaleText;
  eventDate: string;
  category: GalleryCategory;
  location: LocaleText;
  /** Maps to gallery.display_order in the database */
  imageDisplayOrders: number[];
  coverImageDisplayOrder?: number;
}

export const galleryAlbumSeeds: GalleryAlbumSeed[] = [
  {
    slug: 'spring-retreat-2024',
    title: {
      en: 'Spring Meditation Retreat',
      ru: 'Весенний медитативный ретрит',
      uk: 'Весняний медитативний ретрит',
    },
    description: {
      en: 'A peaceful spring retreat with singing bowls, nature, and guided sound meditation',
      ru: 'Спокойный весенний ретрит с поющими чашами, природой и звуковой медитацией',
      uk: 'Спокійний весняний ретрит зі співаючими чашами, природою та звуковою медитацією',
    },
    eventDate: '2024-03-15',
    category: 'retreat',
    location: {
      en: 'Mountain Valley, Nepal',
      ru: 'Горная долина, Непал',
      uk: 'Гірська долина, Непал',
    },
    imageDisplayOrders: [1, 5, 14, 21],
    coverImageDisplayOrder: 1,
  },
  {
    slug: 'sound-healing-workshops-2024',
    title: {
      en: 'Sound Healing Workshops',
      ru: 'Мастер-классы звукового исцеления',
      uk: 'Майстер-класи звукового зцілення',
    },
    description: {
      en: 'Hands-on workshops teaching traditional Himalayan bowl techniques and sound therapy',
      ru: 'Практические мастер-классы по традиционным техникам гималайских чаш и звуковой терапии',
      uk: 'Практичні майстер-класи з традиційних технік гімалайських чаш і звукової терапії',
    },
    eventDate: '2024-02-20',
    category: 'workshop',
    location: {
      en: 'Kathmandu, Nepal',
      ru: 'Катманду, Непал',
      uk: 'Катманду, Непал',
    },
    imageDisplayOrders: [2, 10, 13, 16, 20],
    coverImageDisplayOrder: 2,
  },
  {
    slug: 'meditation-circles-2024',
    title: {
      en: 'Community Meditation Circles',
      ru: 'Групповые круги медитации',
      uk: 'Громадські медитаційні кола',
    },
    description: {
      en: 'Group gatherings for collective sound meditation, mindfulness, and inner peace',
      ru: 'Групповые встречи для коллективной звуковой медитации, осознанности и внутреннего покоя',
      uk: 'Групові зустрічі для колективної звукової медитації, усвідомленості та внутрішнього спокою',
    },
    eventDate: '2024-01-10',
    category: 'meditation',
    location: {
      en: 'Pokhara, Nepal',
      ru: 'Покхара, Непал',
      uk: 'Покхара, Непал',
    },
    imageDisplayOrders: [3, 9, 17, 18, 23, 25],
    coverImageDisplayOrder: 3,
  },
  {
    slug: 'sacred-ceremonies-2023',
    title: {
      en: 'Sacred Sound Ceremonies',
      ru: 'Священные звуковые церемонии',
      uk: 'Священні звукові церемонії',
    },
    description: {
      en: 'Traditional ceremonies with singing bowls, gongs, and candlelight healing rituals',
      ru: 'Традиционные церемонии с поющими чашами, гонгами и исцеляющими ритуалами при свечах',
      uk: 'Традиційні церемонії зі співаючими чашами, гонгами та цілющими ритуалами при свічках',
    },
    eventDate: '2023-12-25',
    category: 'ceremony',
    location: {
      en: 'Bhaktapur, Nepal',
      ru: 'Бхактапур, Непал',
      uk: 'Бхактапур, Непал',
    },
    imageDisplayOrders: [4, 8, 11, 15, 24, 26],
    coverImageDisplayOrder: 4,
  },
  {
    slug: 'odesa-sound-events',
    title: {
      en: 'Odesa Sound Healing Events',
      ru: 'События звукового исцеления в Одессе',
      uk: 'Події звукового зцілення в Одесі',
    },
    description: {
      en: 'Local sound healing sessions and workshops held in Odesa, Ukraine',
      ru: 'Местные сеансы звукового исцеления и мастер-классы в Одессе, Украина',
      uk: 'Місцеві сеанси звукового зцілення та майстер-класи в Одесі, Україна',
    },
    eventDate: '2024-04-08',
    category: 'workshop',
    location: {
      en: 'Odesa, Ukraine',
      ru: 'Одесса, Украина',
      uk: 'Одеса, Україна',
    },
    imageDisplayOrders: [7, 10, 16, 20, 25],
    coverImageDisplayOrder: 7,
  },
  {
    slug: 'nepal-retreat-journey',
    title: {
      en: 'Nepal Retreat Journey',
      ru: 'Ретритное путешествие по Непалу',
      uk: 'Ретритна подорож Непалом',
    },
    description: {
      en: 'A journey through Himalayan retreats with outdoor meditation and singing bowl practice',
      ru: 'Путешествие по гималайским ретритам с медитацией на природе и практикой поющих чаш',
      uk: 'Подорож гімалайськими ретритами з медитацією на природі та практикою співаючих чаш',
    },
    eventDate: '2023-11-05',
    category: 'retreat',
    location: {
      en: 'Nagarkot, Nepal',
      ru: 'Нагаркот, Непал',
      uk: 'Нагаркот, Непал',
    },
    imageDisplayOrders: [5, 14, 21, 22],
    coverImageDisplayOrder: 5,
  },
  {
    slug: 'ukraine-wellness-retreat',
    title: {
      en: 'Ukraine Wellness Retreat',
      ru: 'Ретрит здоровья в Украине',
      uk: 'Ретрит здоров’я в Україні',
    },
    description: {
      en: 'Wellness retreat in the Ukrainian Carpathians with sound therapy and meditation',
      ru: 'Ретрит здоровья в украинских Карпатах со звуковой терапией и медитацией',
      uk: 'Ретрит здоров’я в українських Карпатах зі звуковою терапією та медитацією',
    },
    eventDate: '2023-08-25',
    category: 'retreat',
    location: {
      en: 'Carpathians, Ukraine',
      ru: 'Карпаты, Украина',
      uk: 'Карпати, Україна',
    },
    imageDisplayOrders: [19, 22],
    coverImageDisplayOrder: 19,
  },
  {
    slug: 'individual-healing-sessions',
    title: {
      en: 'Individual Healing Sessions',
      ru: 'Индивидуальные сеансы исцеления',
      uk: 'Індивідуальні сеанси зцілення',
    },
    description: {
      en: 'Personalized one-on-one sound healing sessions with tailored bowl selection',
      ru: 'Персональные индивидуальные сеансы звукового исцеления с подбором чаш',
      uk: 'Персональні індивідуальні сеанси звукового зцілення з підбором чаш',
    },
    eventDate: '2023-10-12',
    category: 'meditation',
    location: {
      en: 'Thamel, Kathmandu',
      ru: 'Тамель, Катманду',
      uk: 'Тамель, Катманду',
    },
    imageDisplayOrders: [6, 12, 19],
    coverImageDisplayOrder: 6,
  },
];
