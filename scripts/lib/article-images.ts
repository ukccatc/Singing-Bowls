/** Curated featured + inline images per article slug (verified royalty-free sources). */
export interface ArticleImageSet {
  url: string;
  alt: {
    en: string;
    ru: string;
    uk: string;
  };
}

function pexels(id: number): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;
}

function unsplash(photoId: string): string {
  return `https://images.unsplash.com/${photoId}?w=1200&h=800&fit=crop`;
}

/** Verified singing-bowl / meditation stock photos (not random Pexels IDs). */
const BOWL_IMAGES = {
  bowlWhite: pexels(10574238),
  bowlCloseUp: pexels(11889659),
  bowlOutdoor: pexels(5416012),
  personHolding: pexels(7970243),
  personHolding2: pexels(6957512),
  soundBath: pexels(6914829),
  playingBowl: pexels(7113296),
  bowlCollection: pexels(10574238),
  yogaIndoor: pexels(3822906),
  meditationUnsplash: unsplash('photo-1599901860904-17e6ed7083a0'),
  yogaUnsplash: unsplash('photo-1545205597-3d1d02fc18dd'),
  relaxation: unsplash('photo-1544367567-0d6fcffe7f1f'),
  mindfulness: unsplash('photo-1506126613408-eca07ce68773'),
  listening: unsplash('photo-1499203533215-0f3e8f4cca25'),
  homeSanctuary: unsplash('photo-1513694203232-719a280e022f'),
  bells: unsplash('photo-1604881988748-fa3a7aadcb5d'),
  temple: unsplash('photo-1528360983277-13d401cdc186'),
  mountains: unsplash('photo-1506905925346-21bda4d32df4'),
  nightSky: unsplash('photo-1419242902214-272b3f66ee7a'),
  cymatics: unsplash('photo-1478737270239-2f02b77fc618'),
  music: unsplash('photo-1511379938543-c1f69419868d'),
  therapy: unsplash('photo-1573497019940-1c28c88b4f3e'),
  heartMeditation: unsplash('photo-1528715471579-1b0a7f3b0a82'),
  path: unsplash('photo-1508672019048-805c876b67e2'),
  planets: unsplash('photo-1462331940025-496dfbfc7564'),
  antiqueMetal: unsplash('photo-1545389336-cf090694435e'),
  meditationPractice: unsplash('photo-1516320318423-f06f70504504'),
  intuitive: unsplash('photo-1459749411175-04bf5292ceea'),
  eastWest: unsplash('photo-1506126613408-eca07ce68773'),
} as const;

export const ARTICLE_IMAGES_BY_SLUG: Record<string, ArticleImageSet> = {
  'what-are-singing-bowls': {
    url: BOWL_IMAGES.personHolding,
    alt: {
      en: 'Person holding a Tibetan singing bowl',
      ru: 'Человек держит тибетскую поющую чашу',
      uk: 'Людина тримає тибетську співаючу чашу',
    },
  },
  'east-meets-west': {
    url: BOWL_IMAGES.eastWest,
    alt: {
      en: 'Meditation practice blending Eastern and Western traditions',
      ru: 'Практика медитации на стыке восточных и западных традиций',
      uk: 'Практика медитації на межі східних і західних традицій',
    },
  },
  'secretive-masters-of-sound': {
    url: BOWL_IMAGES.bowlOutdoor,
    alt: {
      en: 'Tibetan singing bowl used for sound healing outdoors',
      ru: 'Тибетская поющая чаша для звукового исцеления на природе',
      uk: 'Тибетська співаюча чаша для звукового зцілення на природі',
    },
  },
  'ringing-stones-and-fountain-bowls': {
    url: BOWL_IMAGES.antiqueMetal,
    alt: {
      en: 'Ornate resonant metal bowl with historical craftsmanship',
      ru: 'Узорчатая резонансная металлическая чаша',
      uk: 'Вишукана резонансна металева чаша',
    },
  },
  'from-chalices-to-singing-bowls': {
    url: BOWL_IMAGES.bowlCloseUp,
    alt: {
      en: 'Close-up of a bronze Tibetan singing bowl and mallet',
      ru: 'Крупный план бронзовой тибетской поющей чаши и молоточка',
      uk: 'Крупний план бронзової тибетської співаючої чаші та молоточка',
    },
  },
  'sound-as-universal-language': {
    url: BOWL_IMAGES.music,
    alt: {
      en: 'Sound as a universal language of healing',
      ru: 'Звук как универсальный язык исцеления',
      uk: 'Звук як універсальна мова зцілення',
    },
  },
  'sound-is-form-cymatics': {
    url: BOWL_IMAGES.cymatics,
    alt: {
      en: 'Sound vibrations forming visible patterns',
      ru: 'Звуковые вибрации, формирующие видимые узоры',
      uk: 'Звукові вібрації, що формують видимі візерунки',
    },
  },
  'why-every-bowl-sounds-different': {
    url: BOWL_IMAGES.bowlWhite,
    alt: {
      en: 'Tibetan singing bowl on a white surface',
      ru: 'Тибетская поющая чаша на белой поверхности',
      uk: 'Тибетська співаюча чаша на білій поверхності',
    },
  },
  'natural-harmony': {
    url: BOWL_IMAGES.mountains,
    alt: {
      en: 'Mountain landscape reflecting natural harmony',
      ru: 'Горный пейзаж, отражающий природную гармонию',
      uk: 'Гірський пейзаж, що відображає природну гармонію',
    },
  },
  'synchronization-internal-massage': {
    url: BOWL_IMAGES.relaxation,
    alt: {
      en: 'Person in deep relaxation during sound therapy',
      ru: 'Человек в глубоком расслаблении во время звуковой терапии',
      uk: 'Людина в глибокому розслабленні під час звукової терапії',
    },
  },
  'shamanism-and-brainwaves': {
    url: BOWL_IMAGES.meditationPractice,
    alt: {
      en: 'Meditative state induced by rhythmic sound',
      ru: 'Медитативное состояние под воздействием ритмичного звука',
      uk: 'Медитативний стан під впливом ритмічного звуку',
    },
  },
  'seven-metals-seven-planets': {
    url: BOWL_IMAGES.planets,
    alt: {
      en: 'Celestial imagery connected to seven metals tradition',
      ru: 'Небесные образы, связанные с традицией семи металлов',
      uk: 'Небесні образи, пов’язані з традицією семи металів',
    },
  },
  'how-to-choose-your-singing-bowl': {
    url: BOWL_IMAGES.personHolding2,
    alt: {
      en: 'Person holding a brass singing bowl while choosing an instrument',
      ru: 'Человек держит латунную поющую чашу при выборе инструмента',
      uk: 'Людина тримає латунну співаючу чашу під час вибору інструмента',
    },
  },
  'trust-your-intuition': {
    url: BOWL_IMAGES.intuitive,
    alt: {
      en: 'Person listening mindfully to a singing bowl',
      ru: 'Человек внимательно слушает поющую чашу',
      uk: 'Людина уважно слухає співаючу чашу',
    },
  },
  'striking-vs-rimming': {
    url: BOWL_IMAGES.playingBowl,
    alt: {
      en: 'Close-up of a person playing a Tibetan singing bowl',
      ru: 'Крупный план: человек играет на тибетской поющей чаше',
      uk: 'Крупний план: людина грає на тибетській співаючій чаші',
    },
  },
  'essential-mallets-and-strikers': {
    url: BOWL_IMAGES.bowlCloseUp,
    alt: {
      en: 'Singing bowl with wooden mallet for striking and rimming',
      ru: 'Поющая чаша с деревянным молоточком',
      uk: 'Співаюча чаша з дерев’яним молоточком',
    },
  },
  'signposts-in-a-magic-land': {
    url: BOWL_IMAGES.path,
    alt: {
      en: 'Path through a serene landscape for inner journey',
      ru: 'Тропа через безмятежный пейзаж для внутреннего путешествия',
      uk: 'Стежка крізь безтурботний пейзаж для внутрішньої подорожі',
    },
  },
  'the-art-of-listening': {
    url: BOWL_IMAGES.listening,
    alt: {
      en: 'Quiet moment of deep listening',
      ru: 'Тихий момент глубокого слушания',
      uk: 'Тиха мить глибокого слухання',
    },
  },
  'open-heart-open-mind': {
    url: BOWL_IMAGES.heartMeditation,
    alt: {
      en: 'Heart-centered meditation with singing bowls',
      ru: 'Медитация с открытым сердцем и поющими чашами',
      uk: 'Медитація з відкритим серцем і співаючими чашами',
    },
  },
  'therapeutic-applications': {
    url: BOWL_IMAGES.therapy,
    alt: {
      en: 'Sound healing therapy session',
      ru: 'Сеанс звукового исцеления',
      uk: 'Сеанс звукового зцілення',
    },
  },
  'tingsha-explained': {
    url: BOWL_IMAGES.bowlWhite,
    alt: {
      en: 'Traditional Himalayan sound instruments for meditation',
      ru: 'Традиционные гималайские звуковые инструменты для медитации',
      uk: 'Традиційні гімалайські звукові інструменти для медитації',
    },
  },
  'meteoric-metal-sky-iron': {
    url: BOWL_IMAGES.nightSky,
    alt: {
      en: 'Night sky evoking meteoric iron legend',
      ru: 'Ночное небо, напоминающее легенду о метеоритном железе',
      uk: 'Нічне небо, що нагадує легенду про метеоритне залізо',
    },
  },
  'bells-and-dorje': {
    url: BOWL_IMAGES.bells,
    alt: {
      en: 'Ritual bell and dorje in Himalayan tradition',
      ru: 'Ритуальный колокол и дордже в гималайской традиции',
      uk: 'Ритуальний дзвін і дордже в гімалайській традиції',
    },
  },
  'four-noble-truths-bell-dorje': {
    url: BOWL_IMAGES.temple,
    alt: {
      en: 'Buddhist temple atmosphere with ritual instruments',
      ru: 'Атмосфера буддийского храма с ритуальными инструментами',
      uk: 'Атмосфера буддійського храму з ритуальними інструментами',
    },
  },
  'antique-vs-modern-singing-bowls': {
    url: BOWL_IMAGES.bowlOutdoor,
    alt: {
      en: 'Handcrafted Tibetan singing bowl in an outdoor setting',
      ru: 'Ручная тибетская поющая чаша на природе',
      uk: 'Ручна тибетська співаюча чаша на природі',
    },
  },
  'singing-bowls-daily-meditation-practice': {
    url: BOWL_IMAGES.meditationUnsplash,
    alt: {
      en: 'Daily meditation practice with a singing bowl',
      ru: 'Ежедневная практика медитации с поющей чашей',
      uk: 'Щоденна практика медитації зі співаючою чашею',
    },
  },
  'singing-bowls-for-yoga': {
    url: BOWL_IMAGES.yogaUnsplash,
    alt: {
      en: 'Yoga session enhanced with singing bowls',
      ru: 'Занятие йогой с поющими чашами',
      uk: 'Заняття йогою зі співаючими чашами',
    },
  },
  'chakra-balancing-with-singing-bowls': {
    url: BOWL_IMAGES.soundBath,
    alt: {
      en: 'Sound bath with multiple Tibetan singing bowls',
      ru: 'Звуковая ванна с несколькими тибетскими поющими чашами',
      uk: 'Звукова ванна з кількома тибетськими співаючими чашами',
    },
  },
  'how-to-clean-and-care-for-singing-bowl': {
    url: BOWL_IMAGES.bowlWhite,
    alt: {
      en: 'Tibetan singing bowl ready for care and cleaning',
      ru: 'Тибетская поющая чаша, готовая к уходу и чистке',
      uk: 'Тибетська співаюча чаша, готова до догляду та чищення',
    },
  },
  'creating-home-sound-sanctuary': {
    url: BOWL_IMAGES.homeSanctuary,
    alt: {
      en: 'Peaceful home corner for sound meditation',
      ru: 'Уютный домашний уголок для звуковой медитации',
      uk: 'Затишний домашній куточок для звукової медитації',
    },
  },
};

const FALLBACK_IMAGE: ArticleImageSet = {
  url: BOWL_IMAGES.bowlCloseUp,
  alt: {
    en: 'Tibetan singing bowl for sound healing',
    ru: 'Тибетская поющая чаша для звукового исцеления',
    uk: 'Тибетська співаюча чаша для звукового зцілення',
  },
};

export function getArticleImage(slug: string): ArticleImageSet {
  return ARTICLE_IMAGES_BY_SLUG[slug] ?? FALLBACK_IMAGE;
}

/** Default OG / sample article cover — verified singing bowl photo. */
export const DEFAULT_BLOG_COVER_IMAGE = BOWL_IMAGES.personHolding;
