import { ArticleCategory, Locale } from './types';

export const DEFAULT_LOCALE: Locale = 'uk';

/** Fallback when geo/cookie are unavailable (e.g. static generation). */
export function getDefaultLocale(): Locale {
  return DEFAULT_LOCALE;
}

// Translation object structure
interface Translations {
  [key: string]: {
    [locale: string]: string;
  };
}

// Translation data
const translations: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home',
    ru: 'Главная',
    uk: 'Головна',
  },
  'nav.shop': {
    en: 'Shop',
    ru: 'Магазин',
    uk: 'Магазин',
  },
  'nav.about': {
    en: 'About',
    ru: 'О нас',
    uk: 'Про нас',
  },
  'nav.blog': {
    en: 'Blog',
    ru: 'Блог',
    uk: 'Блог',
  },
  'nav.contact': {
    en: 'Contact',
    ru: 'Контакты',
    uk: 'Контакти',
  },
  'header.tagline': {
    en: 'Authentic Sound Healing',
    ru: 'Аутентичное звуковое исцеление',
    uk: 'Автентичне звукове зцілення',
  },
  'nav.cart': {
    en: 'Cart',
    ru: 'Корзина',
    uk: 'Кошик',
  },
  'nav.more': {
    en: 'More',
    ru: 'Ещё',
    uk: 'Ще',
  },
  'nav.moreDescription': {
    en: 'About, blog, contact and language',
    ru: 'О нас, блог, контакты и язык',
    uk: 'Про нас, блог, контакти та мова',
  },
  'nav.language': {
    en: 'Language',
    ru: 'Язык',
    uk: 'Мова',
  },
  'native.tagline': {
    en: 'Authentic Nepali singing bowls',
    ru: 'Аутентичные непальские поющие чаши',
    uk: 'Автентичні непальські співаючі чаші',
  },
  'native.searchPlaceholder': {
    en: 'Search bowls, instruments…',
    ru: 'Поиск чаш, инструментов…',
    uk: 'Пошук чаш, інструментів…',
  },

  // Home page - Main keys
  'home.title': {
    en: 'Authentic Himalayan Sound Healing',
    ru: 'Аутентичное Гималайское Звуковое Исцеление',
    uk: 'Автентичне Гімалайське Звукове Зцілення',
  },
  'home.subtitle': {
    en: 'Discover the transformative power of handcrafted Nepali singing bowls and meditation instruments',
    ru: 'Откройте для себя преобразующую силу рукотворных непальских поющих чаш и медитативных инструментов',
    uk: 'Відкрийте для себе перетворюючу силу рукотворних непальських співаючих чаш та медитативних інструментів',
  },
  'home.shopNow': {
    en: 'Shop Now',
    ru: 'Магазин',
    uk: 'Магазин',
  },
  'home.learnMore': {
    en: 'Learn More',
    ru: 'Узнать Больше',
    uk: 'Дізнатися Більше',
  },
  'home.featuredProducts': {
    en: 'Featured Products',
    ru: 'Рекомендуемые Товары',
    uk: 'Рекомендовані Товари',
  },
  'home.featuredProductsSubtitle': {
    en: 'Handpicked authentic instruments for your sound healing journey',
    ru: 'Тщательно отобранные аутентичные инструменты для вашего путешествия в звуковое исцеление',
    uk: 'Ретельно відібрані автентичні інструменти для вашої подорожі в звукове зцілення',
  },
  'home.viewAllProducts': {
    en: 'View All Products',
    ru: 'Посмотреть Все Товары',
    uk: 'Переглянути Всі Товари',
  },

  // Home page - Hero section (existing)
  'home.hero.badge': {
    en: 'Authentic Himalayan Instruments',
    ru: 'Аутентичные Гималайские Инструменты',
    uk: 'Автентичні Гімалайські Інструменти',
  },
  'home.hero.title': {
    en: 'Authentic Himalayan Sound Healing',
    ru: 'Аутентичное Гималайское Звуковое Исцеление',
    uk: 'Автентичне Гімалайське Звукове Зцілення',
  },
  'home.hero.subtitle': {
    en: 'Discover the transformative power of handcrafted Nepali singing bowls and meditation instruments',
    ru: 'Откройте для себя преобразующую силу рукотворных непальских поющих чаш и медитативных инструментов',
    uk: 'Відкрийте для себе перетворюючу силу рукотворних непальських співаючих чаш та медитативних інструментів',
  },
  'home.hero.exploreCollection': {
    en: 'Explore Collection',
    ru: 'Изучить Коллекцию',
    uk: 'Дослідити Колекцію',
  },
  'home.hero.learnMore': {
    en: 'Learn More',
    ru: 'Узнать Больше',
    uk: 'Дізнатися Більше',
  },
  'home.features.title': {
    en: 'Why Choose Himalayan Sound',
    ru: 'Почему Выбирают Himalayan Sound',
    uk: 'Чому Обирають Himalayan Sound',
  },
  'home.features.subtitle': {
    en: "We're committed to bringing you the most authentic and highest quality sound healing instruments.",
    ru: 'Мы стремимся предоставить вам самые аутентичные и высококачественные инструменты для звукового исцеления.',
    uk: 'Ми прагнемо надати вам найбільш автентичні та високоякісні інструменти для звукового зцілення.',
  },
  'home.features.authenticity.title': {
    en: 'Authentic Craftsmanship',
    ru: 'Аутентичное Мастерство',
    uk: 'Автентична Майстерність',
  },
  'home.features.authenticity.description': {
    en: 'Handmade by master artisans in the Himalayas using traditional techniques.',
    ru: 'Изготовлено вручную мастерами-ремесленниками в Гималаях с использованием традиционных техник.',
    uk: 'Виготовлено вручну майстрами-ремісниками в Гімалаях з використанням традиційних технік.',
  },
  'home.features.shipping.title': {
    en: 'Worldwide Shipping',
    ru: 'Доставка по Всему Миру',
    uk: 'Доставка по Всьому Світу',
  },
  'home.features.shipping.description': {
    en: 'Free shipping on orders over $200. Carefully packaged for safe delivery.',
    ru: 'Бесплатная доставка при заказе свыше $200. Тщательно упаковано для безопасной доставки.',
    uk: 'Безкоштовна доставка при замовленні понад $200. Ретельно упаковано для безпечної доставки.',
  },
  'home.features.guarantee.title': {
    en: '30-Day Guarantee',
    ru: '30-дневная Гарантия',
    uk: '30-денна Гарантія',
  },
  'home.features.guarantee.description': {
    en: 'Not satisfied? Return your purchase within 30 days for a full refund.',
    ru: 'Не удовлетворены? Верните покупку в течение 30 дней для полного возврата средств.',
    uk: 'Не задоволені? Поверніть покупку протягом 30 днів для повного повернення коштів.',
  },

  // Shop page
  'shop.title': {
    en: 'Our Collection',
    ru: 'Наша Коллекция',
    uk: 'Наша Колекція',
  },
  'shop.subtitle': {
    en: 'Discover authentic Himalayan singing bowls and meditation instruments',
    ru: 'Откройте для себя аутентичные гималайские поющие чаши и медитативные инструменты',
    uk: 'Відкрийте для себе автентичні гімалайські співаючі чаші та медитативні інструменти',
  },
  'shop.search.placeholder': {
    en: 'Search products...',
    ru: 'Поиск товаров...',
    uk: 'Пошук товарів...',
  },
  'shop.filters': {
    en: 'Filters',
    ru: 'Фильтры',
    uk: 'Фільтри',
  },
  'shop.sort.popularity': {
    en: 'Most Popular',
    ru: 'Самые Популярные',
    uk: 'Найпопулярніші',
  },
  'shop.sort.priceLowHigh': {
    en: 'Price: Low to High',
    ru: 'Цена: По Возрастанию',
    uk: 'Ціна: За Зростанням',
  },
  'shop.sort.priceHighLow': {
    en: 'Price: High to Low',
    ru: 'Цена: По Убыванию',
    uk: 'Ціна: За Спаданням',
  },
  'shop.sort.nameAZ': {
    en: 'Name: A to Z',
    ru: 'Название: А-Я',
    uk: 'Назва: А-Я',
  },
  'shop.sort.nameZA': {
    en: 'Name: Z to A',
    ru: 'Название: Я-А',
    uk: 'Назва: Я-А',
  },
  'shop.sort.newest': {
    en: 'Newest First',
    ru: 'Сначала Новые',
    uk: 'Спочатку Нові',
  },
  'shop.filters.categories': {
    en: 'Categories',
    ru: 'Категории',
    uk: 'Категорії',
  },
  'shop.filters.priceRange': {
    en: 'Price Range',
    ru: 'Диапазон Цен',
    uk: 'Діапазон Цін',
  },
  'shop.filters.materials': {
    en: 'Materials',
    ru: 'Материалы',
    uk: 'Матеріали',
  },
  'shop.filters.inStockOnly': {
    en: 'In Stock Only',
    ru: 'Только в Наличии',
    uk: 'Тільки в Наявності',
  },
  'shop.filters.handmadeOnly': {
    en: 'Handmade Only',
    ru: 'Только Ручная Работа',
    uk: 'Тільки Ручна Робота',
  },
  'shop.filters.clear': {
    en: 'Clear',
    ru: 'Очистить',
    uk: 'Очистити',
  },
  'shop.results.showing': {
    en: 'Showing {count} of {total} products',
    ru: 'Показано {count} из {total} товаров',
    uk: 'Показано {count} з {total} товарів',
  },
  'shop.noResults.title': {
    en: 'No products found',
    ru: 'Товары не найдены',
    uk: 'Товари не знайдені',
  },
  'shop.noResults.description': {
    en: 'No products found matching your criteria.',
    ru: 'Не найдено товаров, соответствующих вашим критериям.',
    uk: 'Не знайдено товарів, що відповідають вашим критеріям.',
  },

  // Product page additional translations
  'product.addToWishlist': {
    en: 'Add to Wishlist',
    ru: 'Добавить в Избранное',
    uk: 'Додати в Обране',
  },
  'product.removeFromWishlist': {
    en: 'Remove from Wishlist',
    ru: 'Удалить из Избранного',
    uk: 'Видалити з Обраного',
  },
  'product.share': {
    en: 'Share',
    ru: 'Поделиться',
    uk: 'Поділитися',
  },
  'product.quantity': {
    en: 'Quantity',
    ru: 'Количество',
    uk: 'Кількість',
  },
  'product.audioSample': {
    en: 'Audio Sample',
    ru: 'Аудио Образец',
    uk: 'Аудіо Зразок',
  },
  'product.playSample': {
    en: 'Play Sample',
    ru: 'Воспроизвести Образец',
    uk: 'Відтворити Зразок',
  },
  'product.relatedProducts': {
    en: 'Related Products',
    ru: 'Похожие Товары',
    uk: 'Схожі Товари',
  },
  'product.relatedProductsDescription': {
    en: 'Discover more authentic Himalayan instruments',
    ru: 'Откройте для себя больше аутентичных гималайских инструментов',
    uk: 'Відкрийте для себе більше автентичних гімалайських інструментів',
  },
  'product.relatedProductsComingSoon': {
    en: 'Related products coming soon...',
    ru: 'Похожие товары скоро появятся...',
    uk: 'Схожі товари незабаром з\'являться...',
  },
  'product.writeReview': {
    en: 'Write Review',
    ru: 'Написать Отзыв',
    uk: 'Написати Відгук',
  },
  'product.ratingBreakdown': {
    en: 'Rating Breakdown',
    ru: 'Распределение Оценок',
    uk: 'Розподіл Оцінок',
  },
  'product.sortBy': {
    en: 'Sort by',
    ru: 'Сортировать по',
    uk: 'Сортувати за',
  },
  'product.sortByDate': {
    en: 'Date',
    ru: 'Дате',
    uk: 'Датою',
  },
  'product.sortByRating': {
    en: 'Rating',
    ru: 'Оценке',
    uk: 'Оцінкою',
  },
  'product.sortByHelpful': {
    en: 'Helpful',
    ru: 'Полезности',
    uk: 'Корисності',
  },
  'product.clearFilter': {
    en: 'Clear Filter',
    ru: 'Очистить Фильтр',
    uk: 'Очистити Фільтр',
  },
  'product.verified': {
    en: 'Verified',
    ru: 'Подтверждено',
    uk: 'Підтверджено',
  },
  'product.helpful': {
    en: 'Helpful',
    ru: 'Полезно',
    uk: 'Корисно',
  },
  'product.notHelpful': {
    en: 'Not Helpful',
    ru: 'Не Полезно',
    uk: 'Не Корисно',
  },
  'product.noReviews': {
    en: 'No reviews yet. Be the first to share your experience!',
    ru: 'Пока нет отзывов. Будьте первым, кто поделится своим опытом!',
    uk: 'Поки немає відгуків. Будьте першим, хто поділиться своїм досвідом!',
  },
  'product.noReviewsForRating': {
    en: 'No reviews found for this rating.',
    ru: 'Отзывы с такой оценкой не найдены.',
    uk: 'Відгуки з такою оцінкою не знайдені.',
  },
  'shop.noResults.clearFilters': {
    en: 'Clear Filters',
    ru: 'Очистить Фильтры',
    uk: 'Очистити Фільтри',
  },
  'product.categories.singing_bowls': {
    en: 'Singing Bowls',
    ru: 'Поющие Чаши',
    uk: 'Співаючі Чаші',
  },
  'product.categories.meditation_bells': {
    en: 'Meditation Bells',
    ru: 'Медитативные Колокольчики',
    uk: 'Медитативні Дзвіночки',
  },
  'product.categories.tibetan_bowls': {
    en: 'Tibetan Bowls',
    ru: 'Тибетские Чаши',
    uk: 'Тибетські Чаші',
  },
  'product.categories.crystal_bowls': {
    en: 'Crystal Bowls',
    ru: 'Хрустальные Чаши',
    uk: 'Кришталеві Чаші',
  },

  // About page
  'about.hero.badge': {
    en: 'Our Story',
    ru: 'Наша История',
    uk: 'Наша Історія',
  },
  'about.hero.title': {
    en: 'Ancient Wisdom, Modern Healing',
    ru: 'Древняя Мудрость, Современное Исцеление',
    uk: 'Стародавня Мудрість, Сучасне Зцілення',
  },
  'about.hero.subtitle': {
    en: 'Himalayan Sound brings authentic Nepalese singing bowls and sound healing practices from the Himalayas to Ukraine — and to people seeking stillness anywhere in the world.',
    ru: 'Himalayan Sound привозит подлинные непальские поющие чаши и практики звукового исцеления из Гималаев в Украину — и к людям, ищущим тишину в любой точке мира.',
    uk: 'Himalayan Sound привозить автентичні непальські співаючі чаші та практики звукового зцілення з Гімалаїв в Україну — і до людей, які шукають тишу будь-де у світі.',
  },
  'about.hero.ctaShop': {
    en: 'Explore the shop',
    ru: 'Смотреть магазин',
    uk: 'Переглянути магазин',
  },
  'about.hero.ctaContact': {
    en: 'Visit or write us',
    ru: 'Приехать или написать',
    uk: 'Завітати або написати',
  },
  'about.mission.title': {
    en: 'Our Mission',
    ru: 'Наша Миссия',
    uk: 'Наша Місія',
  },
  'about.mission.p1': {
    en: 'We exist to make the living tradition of Himalayan singing bowls accessible without diluting it. Every bowl we offer is chosen for tone, craftsmanship, and the integrity of the makers who cast and hammer it by hand.',
    ru: 'Мы существуем, чтобы сделать живую традицию гималайских поющих чаш доступной — без упрощения. Каждую чашу мы выбираем по звуку, мастерству и честности тех, кто отливает и выковывает её вручную.',
    uk: 'Ми існуємо, щоб зробити живу традицію гімалайських співаючих чаш доступною — без спрощень. Кожну чашу ми обираємо за звучанням, майстерністю та чесністю тих, хто відливає й виковує її вручну.',
  },
  'about.mission.p2': {
    en: 'Beyond commerce, we host sound meditations, workshops, and quiet gatherings in Odesa — spaces where people can feel vibration in the body, not only read about it online.',
    ru: 'Помимо магазина мы проводим звуковые медитации, мастер-классы и тихие встречи в Одессе — пространства, где вибрацию можно почувствовать телом, а не только прочитать о ней онлайн.',
    uk: 'Окрім магазину ми проводимо звукові медитації, майстер-класи та тихі зустрічі в Одесі — простори, де вібрацію можна відчути тілом, а не лише прочитати про неї онлайн.',
  },
  'about.journey.title': {
    en: 'Our Journey',
    ru: 'Наш Путь',
    uk: 'Наш Шлях',
  },
  'about.journey.subtitle': {
    en: 'From first encounters with Himalayan metalwork to a home for sound healing in Odesa.',
    ru: 'От первой встречи с гималайским металлом до дома звукового исцеления в Одессе.',
    uk: 'Від першої зустрічі з гімалайським металом до дому звукового зцілення в Одесі.',
  },
  'about.journey.step1.title': {
    en: 'Listening first',
    ru: 'Сначала — слушать',
    uk: 'Спочатку — слухати',
  },
  'about.journey.step1.body': {
    en: 'It began with travel, study, and long hours in workshops — learning how alloy, shape, and the maker’s hand shape a bowl’s voice.',
    ru: 'Всё началось с путешествий, учёбы и долгих часов в мастерских — понимание того, как сплав, форма и рука мастера формируют голос чаши.',
    uk: 'Усе почалося з подорожей, навчання та довгих годин у майстернях — розуміння того, як сплав, форма й рука майстра формують голос чаші.',
  },
  'about.journey.step2.title': {
    en: 'Trusted makers',
    ru: 'Доверенные мастера',
    uk: 'Довірені майстри',
  },
  'about.journey.step2.body': {
    en: 'We built lasting relationships with artisan families in Nepal who still cast singing bowls using traditional methods — not mass factory runs.',
    ru: 'Мы выстроили долгие отношения с семьями мастеров в Непале, которые по-прежнему отливают поющие чаши традиционными методами — не на фабричном потоке.',
    uk: 'Ми вибудували тривалі стосунки з родинами майстрів у Непалі, які й досі відливають співаючі чаші традиційними методами — не на фабричному потоці.',
  },
  'about.journey.step3.title': {
    en: 'Rooted in Odesa',
    ru: 'Корни в Одессе',
    uk: 'Коріння в Одесі',
  },
  'about.journey.step3.body': {
    en: 'Himalayan Sound found a home in Odesa: a showroom, a practice space, and a community for people discovering sound as a path to calm.',
    ru: 'Himalayan Sound обрёл дом в Одессе: шоурум, пространство практики и сообщество людей, открывающих звук как путь к покою.',
    uk: 'Himalayan Sound знайшов дім в Одесі: шоурум, простір практики та спільнота людей, які відкривають звук як шлях до спокою.',
  },
  'about.journey.step4.title': {
    en: 'Shared practice',
    ru: 'Общая практика',
    uk: 'Спільна практика',
  },
  'about.journey.step4.body': {
    en: 'Today we combine careful curation with live sessions, retreats, and writing — so the bowls leave the shelf and enter daily life.',
    ru: 'Сегодня мы соединяем бережный отбор с живыми сессиями, ретритами и текстами — чтобы чаши сходили с полки и входили в повседневную жизнь.',
    uk: 'Сьогодні ми поєднуємо дбайливий відбір із живими сесіями, ретритами й текстами — щоб чаші сходили з полиці й входили в щоденне життя.',
  },
  'about.values.title': {
    en: 'Our Values',
    ru: 'Наши Ценности',
    uk: 'Наші Цінності',
  },
  'about.values.subtitle': {
    en: 'These principles guide everything we do — from selecting a single bowl to hosting an evening meditation.',
    ru: 'Эти принципы направляют всё, что мы делаем — от выбора одной чаши до вечерней медитации.',
    uk: 'Ці принципи керують усім, що ми робимо — від вибору однієї чаші до вечірньої медитації.',
  },
  'about.values.authenticity.title': {
    en: 'Authenticity',
    ru: 'Подлинность',
    uk: 'Автентичність',
  },
  'about.values.authenticity.body': {
    en: 'Handcrafted Himalayan bowls with character in the tone — never anonymous factory copies dressed up as tradition.',
    ru: 'Ручная гималайская работа с характером в звуке — не анонимные фабричные копии под видом традиции.',
    uk: 'Ручна гімалайська робота з характером у звучанні — не анонімні фабричні копії під виглядом традиції.',
  },
  'about.values.care.title': {
    en: 'Careful curation',
    ru: 'Бережный отбор',
    uk: 'Дбайливий відбір',
  },
  'about.values.care.body': {
    en: 'We listen before we list. Each instrument is checked for clarity, overtones, and how it feels in the hands.',
    ru: 'Мы слушаем, прежде чем предлагать. Каждый инструмент проверяем на ясность, обертона и то, как он лежит в руках.',
    uk: 'Ми слухаємо, перш ніж пропонувати. Кожен інструмент перевіряємо на ясність, обертони і те, як він лягає в руки.',
  },
  'about.values.presence.title': {
    en: 'Lived presence',
    ru: 'Живое присутствие',
    uk: 'Жива присутність',
  },
  'about.values.presence.body': {
    en: 'Sound healing is not only a product page. We practice together — in circles, workshops, and one-to-one sessions.',
    ru: 'Звуковое исцеление — это не только страница товара. Мы практикуем вместе — в кругах, мастер-классах и индивидуальных сессиях.',
    uk: 'Звукове зцілення — це не лише сторінка товару. Ми практикуємо разом — у колах, майстер-класах та індивідуальних сесіях.',
  },
  'about.offer.title': {
    en: 'What you will find here',
    ru: 'Что вы найдёте у нас',
    uk: 'Що ви знайдете у нас',
  },
  'about.offer.subtitle': {
    en: 'Instruments, practice, and knowledge — woven into one place.',
    ru: 'Инструменты, практика и знания — в одном месте.',
    uk: 'Інструменти, практика й знання — в одному місці.',
  },
  'about.offer.bowls.title': {
    en: 'Singing bowls & instruments',
    ru: 'Поющие чаши и инструменты',
    uk: 'Співаючі чаші та інструменти',
  },
  'about.offer.bowls.body': {
    en: 'A curated selection of Himalayan singing bowls and related instruments, ready for home practice or professional work.',
    ru: 'Отобранная коллекция гималайских поющих чаш и сопутствующих инструментов — для домашней практики или профессиональной работы.',
    uk: 'Відібрана колекція гімалайських співаючих чаш і супутніх інструментів — для домашньої практики чи професійної роботи.',
  },
  'about.offer.sessions.title': {
    en: 'Sessions & gatherings',
    ru: 'Сессии и встречи',
    uk: 'Сесії та зустрічі',
  },
  'about.offer.sessions.body': {
    en: 'Sound meditations, healing sessions, and seasonal events in Odesa — see our gallery for glimpses of recent gatherings.',
    ru: 'Звуковые медитации, исцеляющие сессии и сезонные события в Одессе — загляните в галерею, чтобы увидеть недавние встречи.',
    uk: 'Звукові медитації, цілющі сесії та сезонні події в Одесі — зазирніть у галерею, щоб побачити нещодавні зустрічі.',
  },
  'about.offer.knowledge.title': {
    en: 'Guides & articles',
    ru: 'Гайды и статьи',
    uk: 'Гайди та статті',
  },
  'about.offer.knowledge.body': {
    en: 'Practical writing on history, technique, and care — so you can choose and use a bowl with confidence.',
    ru: 'Практичные тексты об истории, технике и уходе — чтобы выбирать и использовать чашу уверенно.',
    uk: 'Практичні тексти про історію, техніку й догляд — щоб обирати й користуватися чашею впевнено.',
  },
  'about.place.title': {
    en: 'Based in Odesa',
    ru: 'Мы в Одессе',
    uk: 'Ми в Одесі',
  },
  'about.place.body': {
    en: 'Visit our showroom at RC London on Instytutska Street to hear bowls in person, ask questions, and find the instrument that resonates with you. Prefer to write first? We are happy to help remotely.',
    ru: 'Приходите в наш шоурум в ЖК «Лондон» на улице Институтской — услышать чаши вживую, задать вопросы и найти инструмент, который отзовётся вам. Удобнее сначала написать? Поможем и удалённо.',
    uk: 'Завітайте до нашого шоуруму в ЖК «Лондон» на вулиці Інститутській — почути чаші наживо, поставити питання й знайти інструмент, що відгукнеться вам. Зручніше спочатку написати? Допоможемо й дистанційно.',
  },
  'about.cta.title': {
    en: 'Ready to listen?',
    ru: 'Готовы слушать?',
    uk: 'Готові слухати?',
  },
  'about.cta.body': {
    en: 'Browse the collection, explore event photos, or reach out — we will help you take the next step.',
    ru: 'Смотрите коллекцию, фото встреч или напишите нам — поможем сделать следующий шаг.',
    uk: 'Переглядайте колекцію, фото зустрічей або напишіть нам — допоможемо зробити наступний крок.',
  },
  'about.cta.gallery': {
    en: 'View gallery',
    ru: 'Смотреть галерею',
    uk: 'Дивитися галерею',
  },
  'about.cta.blog': {
    en: 'Read the blog',
    ru: 'Читать блог',
    uk: 'Читати блог',
  },

  // Blog page
  'blog.title': {
    en: 'Sound Healing Blog',
    ru: 'Блог о Звуковом Исцелении',
    uk: 'Блог про Звукове Зцілення',
  },
  'blog.subtitle': {
    en: 'Explore the ancient wisdom of sound healing, meditation practices, and wellness insights from our expert practitioners.',
    ru: 'Исследуйте древнюю мудрость звукового исцеления, практики медитации и идеи благополучия от наших экспертов-практиков.',
    uk: 'Досліджуйте стародавню мудрість звукового зцілення, практики медитації та ідеї благополуччя від наших експертів-практиків.',
  },
  'blog.search.placeholder': {
    en: 'Search articles...',
    ru: 'Поиск статей...',
    uk: 'Пошук статей...',
  },
  'blog.category.all': {
    en: 'All Articles',
    ru: 'Все Статьи',
    uk: 'Всі Статті',
  },
  'blog.category.soundHealing': {
    en: 'Sound Healing',
    ru: 'Звуковое Исцеление',
    uk: 'Звукове Зцілення',
  },
  'blog.category.meditation': {
    en: 'Meditation',
    ru: 'Медитация',
    uk: 'Медитація',
  },
  'blog.category.wellness': {
    en: 'Wellness',
    ru: 'Благополучие',
    uk: 'Благополуччя',
  },
  'blog.category.culture': {
    en: 'Culture',
    ru: 'Культура',
    uk: 'Культура',
  },
  'blog.category.tutorials': {
    en: 'Tutorials',
    ru: 'Уроки',
    uk: 'Уроки',
  },
  'blog.sort.newest': {
    en: 'Newest First',
    ru: 'Сначала Новые',
    uk: 'Спочатку Нові',
  },
  'blog.sort.oldest': {
    en: 'Oldest First',
    ru: 'Сначала Старые',
    uk: 'Спочатку Старі',
  },
  'blog.sort.title': {
    en: 'Title A-Z',
    ru: 'Заголовок А-Я',
    uk: 'Заголовок А-Я',
  },
  'blog.results.showing': {
    en: 'Showing {count} {count, plural, one {article} other {articles}}',
    ru: 'Показано {count} {count, plural, one {статья} few {статьи} other {статей}}',
    uk: 'Показано {count} {count, plural, one {стаття} few {статті} other {статей}}',
  },
  'blog.featured': {
    en: 'Featured Article',
    ru: 'Рекомендуемая Статья',
    uk: 'Рекомендована Стаття',
  },
  'blog.latest': {
    en: 'Latest Articles',
    ru: 'Последние Статьи',
    uk: 'Останні Статті',
  },
  'blog.readMore': {
    en: 'Read More',
    ru: 'Читать Далее',
    uk: 'Читати Далі',
  },
  'blog.readArticle': {
    en: 'Read Article',
    ru: 'Читать Статью',
    uk: 'Читати Статтю',
  },
  'blog.minRead': {
    en: 'min read',
    ru: 'мин чтения',
    uk: 'хв читання',
  },
  'blog.noResults.title': {
    en: 'No articles found',
    ru: 'Статьи не найдены',
    uk: 'Статті не знайдені',
  },
  'blog.noResults.description': {
    en: 'Try adjusting your search or filters to find what you\'re looking for.',
    ru: 'Попробуйте изменить поиск или фильтры, чтобы найти то, что вы ищете.',
    uk: 'Спробуйте змінити пошук або фільтри, щоб знайти те, що ви шукаєте.',
  },

  // Contact page
  'contact.title': {
    en: 'Get in Touch',
    ru: 'Свяжитесь с Нами',
    uk: 'Зв\'яжіться з Нами',
  },
  'contact.subtitle': {
    en: 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
    ru: 'Мы будем рады услышать от вас. Отправьте нам сообщение, и мы ответим как можно скорее.',
    uk: 'Ми будемо раді почути від вас. Надішліть нам повідомлення, і ми відповімо якомога швидше.',
  },
  'contact.info.title': {
    en: 'Contact Information',
    ru: 'Контактная Информация',
    uk: 'Контактна Інформація',
  },
  'contact.info.email.title': {
    en: 'Email Us',
    ru: 'Напишите Нам',
    uk: 'Напишіть Нам',
  },
  'contact.info.email.description': {
    en: 'Send us a message anytime',
    ru: 'Отправьте нам сообщение в любое время',
    uk: 'Надішліть нам повідомлення в будь-який час',
  },
  'contact.info.phone.title': {
    en: 'Call Us',
    ru: 'Позвоните Нам',
    uk: 'Зателефонуйте Нам',
  },
  'contact.info.phone.description': {
    en: 'Mon–Fri, 9AM–6PM (Kyiv time)',
    ru: 'Пн–Пт, 9:00–18:00 (по киевскому времени)',
    uk: 'Пн–Пт, 9:00–18:00 (за київським часом)',
  },
  'contact.info.visit.title': {
    en: 'Showroom',
    ru: 'Шоурум',
    uk: 'Шоурум',
  },
  'contact.info.visit.description': {
    en: 'RC London, Instytutska St. — visit by appointment',
    ru: 'ЖК «Лондон», ул. Институтская — по предварительной записи',
    uk: 'ЖК «Лондон», вул. Інститутська — за попереднім записом',
  },
  'contact.info.visit.address': {
    en: 'RC London, Instytutska St., Odesa, Odesa Oblast, 65000',
    ru: 'ЖК «Лондон», ул. Институтская, Одесса, Одесская область, 65000',
    uk: 'ЖК «Лондон», вул. Інститутська, Одеса, Одеська область, 65000',
  },
  'contact.info.visit.maps': {
    en: 'Open in Google Maps',
    ru: 'Открыть в Google Картах',
    uk: 'Відкрити в Google Картах',
  },
  'contact.info.hours.title': {
    en: 'Business Hours',
    ru: 'Часы Работы',
    uk: 'Години Роботи',
  },
  'contact.info.hours.description': {
    en: 'Eastern European Time (Kyiv)',
    ru: 'Восточноевропейское время (Киев)',
    uk: 'Східноєвропейський час (Київ)',
  },
  'contact.info.hours.schedule': {
    en: 'Monday – Friday: 9:00 AM – 6:00 PM',
    ru: 'Понедельник – пятница: 9:00 – 18:00',
    uk: 'Понеділок – п\'ятниця: 9:00 – 18:00',
  },
  'contact.form.title': {
    en: 'Send us a Message',
    ru: 'Отправьте нам Сообщение',
    uk: 'Надішліть нам Повідомлення',
  },
  'contact.form.subject.general': {
    en: 'General Inquiry',
    ru: 'Общий Запрос',
    uk: 'Загальний Запит',
  },
  'contact.form.subject.product': {
    en: 'Product Question',
    ru: 'Вопрос о Товаре',
    uk: 'Питання про Товар',
  },
  'contact.form.subject.order': {
    en: 'Order Support',
    ru: 'Поддержка Заказа',
    uk: 'Підтримка Замовлення',
  },
  'contact.form.subject.shipping': {
    en: 'Shipping & Returns',
    ru: 'Доставка и Возврат',
    uk: 'Доставка та Повернення',
  },
  'contact.form.subject.wholesale': {
    en: 'Wholesale Inquiry',
    ru: 'Оптовый Запрос',
    uk: 'Оптовий Запит',
  },
  'contact.form.subject.custom': {
    en: 'Custom Order',
    ru: 'Индивидуальный Заказ',
    uk: 'Індивідуальне Замовлення',
  },
  'contact.form.customSubject': {
    en: 'Custom Subject',
    ru: 'Пользовательская Тема',
    uk: 'Користувацька Тема',
  },
  'contact.form.customSubject.placeholder': {
    en: 'Brief description of your inquiry',
    ru: 'Краткое описание вашего запроса',
    uk: 'Короткий опис вашого запиту',
  },
  'contact.form.message': {
    en: 'Message',
    ru: 'Сообщение',
    uk: 'Повідомлення',
  },
  'contact.form.message.placeholder': {
    en: 'Tell us how we can help you...',
    ru: 'Расскажите, как мы можем вам помочь...',
    uk: 'Розкажіть, як ми можемо вам допомогти...',
  },
  'contact.form.send': {
    en: 'Send Message',
    ru: 'Отправить Сообщение',
    uk: 'Надіслати Повідомлення',
  },
  'contact.form.sending': {
    en: 'Sending Message...',
    ru: 'Отправка Сообщения...',
    uk: 'Надсилання Повідомлення...',
  },
  'contact.form.success': {
    en: 'Message sent! We will reply within 24–48 hours.',
    ru: 'Сообщение отправлено! Мы ответим в течение 24–48 часов.',
    uk: 'Повідомлення надіслано! Ми відповімо протягом 24–48 годин.',
  },
  'contact.form.error': {
    en: 'Failed to send message. Please try again or email us directly.',
    ru: 'Не удалось отправить сообщение. Попробуйте снова или напишите нам на email.',
    uk: 'Не вдалося надіслати повідомлення. Спробуйте ще раз або напишіть нам на email.',
  },
  'contact.form.privacy': {
    en: 'We respect your privacy and will never share your information with third parties.',
    ru: 'Мы уважаем вашу конфиденциальность и никогда не передадим вашу информацию третьим лицам.',
    uk: 'Ми поважаємо вашу конфіденційність і ніколи не передамо вашу інформацію третім особам.',
  },
  'contact.success.title': {
    en: 'Thank You for Your Message!',
    ru: 'Спасибо за Ваше Сообщение!',
    uk: 'Дякуємо за Ваше Повідомлення!',
  },
  'contact.success.description': {
    en: 'We\'ve received your inquiry and will respond within 24 hours. In the meantime, feel free to explore our collection or read our latest blog posts.',
    ru: 'Мы получили ваш запрос и ответим в течение 24 часов. Тем временем, не стесняйтесь изучить нашу коллекцию или прочитать наши последние статьи в блоге.',
    uk: 'Ми отримали ваш запит і відповімо протягом 24 годин. Тим часом, не соромтеся дослідити нашу колекцію або прочитати наші останні статті в блозі.',
  },
  'contact.success.browseProducts': {
    en: 'Browse Products',
    ru: 'Просмотреть Товары',
    uk: 'Переглянути Товари',
  },
  'contact.success.readBlog': {
    en: 'Read Our Blog',
    ru: 'Читать Наш Блог',
    uk: 'Читати Наш Блог',
  },
  'contact.faq.title': {
    en: 'Frequently Asked Questions',
    ru: 'Часто Задаваемые Вопросы',
    uk: 'Часто Задавані Питання',
  },
  'contact.faq.description': {
    en: 'Find quick answers to common questions about our products, shipping, and sound healing practices.',
    ru: 'Найдите быстрые ответы на распространенные вопросы о наших продуктах, доставке и практиках звукового исцеления.',
    uk: 'Знайдіть швидкі відповіді на поширені питання про наші продукти, доставку та практики звукового зцілення.',
  },
  'contact.faq.view': {
    en: 'View FAQ',
    ru: 'Посмотреть FAQ',
    uk: 'Переглянути FAQ',
  },

  // Cart translations
  'cart.empty': {
    en: 'Your cart is empty',
    ru: 'Ваша корзина пуста',
    uk: 'Ваш кошик порожній',
  },
  'cart.title': {
    en: 'Shopping Cart',
    ru: 'Корзина покупок',
    uk: 'Кошик покупок',
  },
  'cart.subtotal': {
    en: 'Subtotal',
    ru: 'Промежуточный итог',
    uk: 'Проміжний підсумок',
  },
  'cart.shipping': {
    en: 'Shipping',
    ru: 'Доставка',
    uk: 'Доставка',
  },
  'cart.tax': {
    en: 'Tax',
    ru: 'Налог',
    uk: 'Податок',
  },
  'cart.total': {
    en: 'Total',
    ru: 'Итого',
    uk: 'Всього',
  },
  'cart.checkout': {
    en: 'Proceed to Checkout',
    ru: 'Перейти к оформлению',
    uk: 'Перейти до оформлення',
  },
  'cart.continueShopping': {
    en: 'Continue Shopping',
    ru: 'Продолжить покупки',
    uk: 'Продовжити покупки',
  },
  'cart.clearCart': {
    en: 'Clear Cart',
    ru: 'Очистить Корзину',
    uk: 'Очистити Кошик',
  },

  // Product translations
  'product.addToCart': {
    en: 'Add to Cart',
    ru: 'Добавить в корзину',
    uk: 'Додати до кошика',
  },
  'product.playAudio': {
    en: 'Play Audio',
    ru: 'Воспроизвести аудио',
    uk: 'Відтворити аудіо',
  },
  'product.pauseAudio': {
    en: 'Pause Audio',
    ru: 'Пауза аудио',
    uk: 'Пауза аудіо',
  },
  'product.inStock': {
    en: 'In Stock',
    ru: 'В наличии',
    uk: 'В наявності',
  },
  'product.outOfStock': {
    en: 'Out of Stock',
    ru: 'Нет в наличии',
    uk: 'Немає в наявності',
  },
  'product.limitedStock': {
    en: 'Only {count} left',
    ru: 'Осталось только {count}',
    uk: 'Залишилося лише {count}',
  },
  'product.craftsman': {
    en: 'Craftsman',
    ru: 'Мастер',
    uk: 'Майстер',
  },
  'product.description': {
    en: 'Description',
    ru: 'Описание',
    uk: 'Опис',
  },
  'product.specifications': {
    en: 'Specifications',
    ru: 'Характеристики',
    uk: 'Характеристики',
  },
  'product.shipping': {
    en: 'Shipping',
    ru: 'Доставка',
    uk: 'Доставка',
  },
  'product.reviews': {
    en: 'Reviews',
    ru: 'Отзывы',
    uk: 'Відгуки',
  },
  'product.featured': {
    en: 'Featured',
    ru: 'Рекомендуемый',
    uk: 'Рекомендований',
  },
  'product.handmade': {
    en: 'Handmade',
    ru: 'Ручная работа',
    uk: 'Ручна робота',
  },
  'product.notFound': {
    en: 'Product Not Found',
    ru: 'Товар Не Найден',
    uk: 'Товар Не Знайдено',
  },
  'product.freeShipping': {
    en: 'Free Shipping',
    ru: 'Бесплатная Доставка',
    uk: 'Безкоштовна Доставка',
  },
  'product.fastDelivery': {
    en: 'Fast Delivery',
    ru: 'Быстрая Доставка',
    uk: 'Швидка Доставка',
  },
  'product.warranty': {
    en: '30-Day Warranty',
    ru: '30-дневная Гарантия',
    uk: '30-денна Гарантія',
  },
  'product.quickInfo': {
    en: 'Quick Info',
    ru: 'Быстрая Информация',
    uk: 'Швидка Інформація',
  },
  'product.sku': {
    en: 'SKU',
    ru: 'Артикул',
    uk: 'Артикул',
  },
  'product.category': {
    en: 'Category',
    ru: 'Категория',
    uk: 'Категорія',
  },
  'product.availability': {
    en: 'Availability',
    ru: 'Наличие',
    uk: 'Наявність',
  },
  // Footer translations
  'footer.newsletter': {
    en: 'Newsletter',
    ru: 'Рассылка',
    uk: 'Розсилка',
  },
  'footer.newsletterDescription': {
    en: 'Get updates about new products and sound healing insights',
    ru: 'Получайте обновления о новых продуктах и идеях звукового исцеления',
    uk: 'Отримуйте оновлення про нові продукти та ідеї звукового зцілення',
  },
  'footer.newsletterPlaceholder': {
    en: 'Enter your email',
    ru: 'Введите ваш email',
    uk: 'Введіть ваш email',
  },
  'footer.subscribe': {
    en: 'Subscribe',
    ru: 'Подписаться',
    uk: 'Підписатися',
  },
  'footer.quickLinks': {
    en: 'Quick Links',
    ru: 'Быстрые Ссылки',
    uk: 'Швидкі Посилання',
  },
  'footer.customerService': {
    en: 'Customer Service',
    ru: 'Служба Поддержки',
    uk: 'Служба Підтримки',
  },
  'footer.followUs': {
    en: 'Follow Us',
    ru: 'Подписывайтесь',
    uk: 'Слідкуйте за Нами',
  },
  'footer.copyright': {
    en: '© 2025 Himalayan Sound. All rights reserved.',
    ru: '© 2025 Himalayan Sound. Все права защищены.',
    uk: '© 2025 Himalayan Sound. Всі права захищені.',
  },
  'footer.madeWithLove': {
    en: 'Based in Odessa, Ukraine',
    ru: 'Базируемся в Одессе, Украина',
    uk: 'Базуємось в Одесі, Україна',
  },
  'footer.tagline': {
    en: 'Authentic Himalayan singing bowls and sound healing instruments',
    ru: 'Аутентичные гималайские поющие чаши и инструменты для звукового исцеления',
    uk: 'Автентичні гімалайські співаючі чаші та інструменти для звукового зцілення',
  },
  'footer.shippingInfo': {
    en: 'Shipping Info',
    ru: 'Доставка',
    uk: 'Доставка',
  },
  'footer.returns': {
    en: 'Returns',
    ru: 'Возврат',
    uk: 'Повернення',
  },
  'footer.faq': {
    en: 'FAQ',
    ru: 'Частые вопросы',
    uk: 'Питання та відповіді',
  },
  'footer.privacyPolicy': {
    en: 'Privacy Policy',
    ru: 'Политика конфиденциальности',
    uk: 'Політика конфіденційності',
  },
  'footer.termsOfService': {
    en: 'Terms of Service',
    ru: 'Условия использования',
    uk: 'Умови використання',
  },
  'legal.lastUpdated': {
    en: 'Last updated',
    ru: 'Последнее обновление',
    uk: 'Останнє оновлення',
  },
  'legal.tableOfContents': {
    en: 'Table of Contents',
    ru: 'Содержание',
    uk: 'Зміст',
  },
  'legal.questions': {
    en: 'Questions about this document?',
    ru: 'Вопросы по этому документу?',
    uk: 'Питання щодо цього документа?',
  },
  'legal.privacyDescription': {
    en: 'How Himalayan Sound collects, uses, and protects your personal data under GDPR and Ukrainian law.',
    ru: 'Как Himalayan Sound собирает, использует и защищает ваши персональные данные в соответствии с GDPR и украинским законодательством.',
    uk: 'Як Himalayan Sound збирає, використовує та захищає ваші персональні дані відповідно до GDPR та законодавства України.',
  },
  'legal.termsDescription': {
    en: 'Terms and conditions for using Himalayan Sound and purchasing our products worldwide.',
    ru: 'Условия использования Himalayan Sound и покупки наших товаров по всему миру.',
    uk: 'Умови використання Himalayan Sound та покупки наших товарів у всьому світі.',
  },
  'legal.shippingDescription': {
    en: 'Shipping and delivery times, costs, customs, and packaging — including Nova Poshta and Ukrposhta delivery for Ukraine.',
    ru: 'Сроки и стоимость доставки, таможня и упаковка — включая доставку Новой Почтой и Укрпочтой по Украине.',
    uk: 'Терміни та вартість доставки, митниця та пакування — включно з доставкою Новою Поштою та Укрпоштою по Україні.',
  },
  'legal.returnsDescription': {
    en: 'Your 14-day right of return, refund procedure, and warranty — compliant with the Law of Ukraine on Consumer Rights and EU/UK law.',
    ru: '14-дневное право на возврат, порядок возмещения и гарантия — в соответствии с Законом Украины о защите прав потребителей и правом ЕС/UK.',
    uk: '14-денне право на повернення, порядок відшкодування та гарантія — відповідно до Закону України «Про захист прав споживачів» та законодавства ЄС/UK.',
  },
  'legal.faqDescription': {
    en: 'Answers to frequently asked questions about singing bowls, orders, delivery to Ukraine, payments, returns, and care.',
    ru: 'Ответы на частые вопросы о поющих чашах, заказах, доставке в Украину, оплате, возврате и уходе.',
    uk: 'Відповіді на поширені питання про співаючі чаші, замовлення, доставку в Україну, оплату, повернення та догляд.',
  },
  'faq.stillHaveQuestions': {
    en: 'Still have questions? Get in touch — we usually reply within one business day.',
    ru: 'Остались вопросы? Свяжитесь с нами — обычно отвечаем в течение одного рабочего дня.',
    uk: 'Залишилися питання? Напишіть нам — зазвичай відповідаємо протягом одного робочого дня.',
  },
  'checkout.acceptTerms': {
    en: 'I accept the',
    ru: 'Я принимаю',
    uk: 'Я приймаю',
  },
  'checkout.and': {
    en: 'and',
    ru: 'и',
    uk: 'та',
  },
  'checkout.orderAgreement': {
    en: 'By placing your order, you agree to our Terms of Service and Privacy Policy.',
    ru: 'Оформляя заказ, вы соглашаетесь с Условиями использования и Политикой конфиденциальности.',
    uk: 'Оформлюючи замовлення, ви погоджуєтесь з Умовами використання та Політикою конфіденційності.',
  },

  // Checkout translations
  'checkout.shippingAddress': {
    en: 'Shipping Address',
    ru: 'Адрес доставки',
    uk: 'Адреса доставки',
  },
  'checkout.paymentMethod': {
    en: 'Payment Method',
    ru: 'Способ оплаты',
    uk: 'Спосіб оплати',
  },
  'checkout.orderSummary': {
    en: 'Order Summary',
    ru: 'Сводка заказа',
    uk: 'Підсумок замовлення',
  },
  'checkout.placeOrder': {
    en: 'Place Order',
    ru: 'Оформить заказ',
    uk: 'Оформити замовлення',
  },
  'checkout.processing': {
    en: 'Processing...',
    ru: 'Обработка...',
    uk: 'Обробка...',
  },
  'checkout.sameAsShipping': {
    en: 'Same as shipping address',
    ru: 'Такой же, как адрес доставки',
    uk: 'Такий же, як адреса доставки',
  },

  // Form translations
  'form.firstName': {
    en: 'First Name',
    ru: 'Имя',
    uk: 'Ім\'я',
  },
  'form.lastName': {
    en: 'Last Name',
    ru: 'Фамилия',
    uk: 'Прізвище',
  },
  'form.fullName': {
    en: 'Full Name',
    ru: 'Полное Имя',
    uk: 'Повне Ім\'я',
  },
  'form.email': {
    en: 'Email Address',
    ru: 'Адрес Электронной Почты',
    uk: 'Адреса Електронної Пошти',
  },
  'form.address': {
    en: 'Address',
    ru: 'Адрес',
    uk: 'Адреса',
  },
  'form.address2': {
    en: 'Address Line 2 (Optional)',
    ru: 'Адрес строка 2 (необязательно)',
    uk: 'Адреса рядок 2 (необов\'язково)',
  },
  'form.city': {
    en: 'City',
    ru: 'Город',
    uk: 'Місто',
  },
  'form.state': {
    en: 'State/Province',
    ru: 'Штат/Область',
    uk: 'Штат/Область',
  },
  'form.zipCode': {
    en: 'ZIP Code',
    ru: 'Почтовый индекс',
    uk: 'Поштовий індекс',
  },
  'form.country': {
    en: 'Country',
    ru: 'Страна',
    uk: 'Країна',
  },
  'form.phone': {
    en: 'Phone Number',
    ru: 'Номер Телефона',
    uk: 'Номер Телефону',
  },
  'form.subject': {
    en: 'Subject',
    ru: 'Тема',
    uk: 'Тема',
  },
  'form.required': {
    en: 'Required',
    ru: 'Обязательно',
    uk: 'Обов\'язково',
  },

  // Messages
  'messages.subscribed': {
    en: 'Thank you for subscribing to our newsletter!',
    ru: 'Спасибо за подписку на нашу рассылку!',
    uk: 'Дякуємо за підписку на нашу розсилку!',
  },
  'messages.addedToCart': {
    en: 'Added to cart successfully!',
    ru: 'Успешно добавлено в корзину!',
    uk: 'Успішно додано до кошика!',
  },
  'messages.addedToWishlist': {
    en: 'Added to wishlist!',
    ru: 'Добавлено в список желаний!',
    uk: 'Додано до списку бажань!',
  },
  'messages.removedFromWishlist': {
    en: 'Removed from wishlist!',
    ru: 'Удалено из списка желаний!',
    uk: 'Видалено зі списку бажань!',
  },

  // Article translations
  'article.notFound': {
    en: 'Article Not Found',
    ru: 'Статья Не Найдена',
    uk: 'Стаття Не Знайдена',
  },
  'article.minRead': {
    en: 'min read',
    ru: 'мин чтения',
    uk: 'хв читання',
  },
  'article.views': {
    en: 'views',
    ru: 'просмотров',
    uk: 'переглядів',
  },
  'article.like': {
    en: 'Like',
    ru: 'Нравится',
    uk: 'Подобається',
  },
  'article.comment': {
    en: 'Comment',
    ru: 'Комментировать',
    uk: 'Коментувати',
  },
  'article.share': {
    en: 'Share',
    ru: 'Поделиться',
    uk: 'Поділитися',
  },
  'article.aboutAuthor': {
    en: 'About the Author',
    ru: 'Об Авторе',
    uk: 'Про Автора',
  },
  'article.relatedArticles': {
    en: 'Related Articles',
    ru: 'Похожие Статьи',
    uk: 'Схожі Статті',
  },
  'article.tableOfContents': {
    en: 'Table of Contents',
    ru: 'Содержание',
    uk: 'Зміст',
  },
  'article.popularArticles': {
    en: 'Popular Articles',
    ru: 'Популярные Статьи',
    uk: 'Популярні Статті',
  },
  'article.categories': {
    en: 'Categories',
    ru: 'Категории',
    uk: 'Категорії',
  },

  // Common
  'common.loading': {
    en: 'Loading...',
    ru: 'Загрузка...',
    uk: 'Завантаження...',
  },
  'common.error': {
    en: 'Error',
    ru: 'Ошибка',
    uk: 'Помилка',
  },
  'common.success': {
    en: 'Success',
    ru: 'Успех',
    uk: 'Успіх',
  },
  'common.cancel': {
    en: 'Cancel',
    ru: 'Отмена',
    uk: 'Скасувати',
  },
  'common.save': {
    en: 'Save',
    ru: 'Сохранить',
    uk: 'Зберегти',
  },
  'common.close': {
    en: 'Close',
    ru: 'Закрыть',
    uk: 'Закрити',
  },
  'common.back': {
    en: 'Back',
    ru: 'Назад',
    uk: 'Назад',
  },
  'common.next': {
    en: 'Next',
    ru: 'Далее',
    uk: 'Далі',
  },
  'common.previous': {
    en: 'Previous',
    ru: 'Предыдущий',
    uk: 'Попередній',
  },
  'common.search': {
    en: 'Search',
    ru: 'Поиск',
    uk: 'Пошук',
  },
  'common.filter': {
    en: 'Filter',
    ru: 'Фильтр',
    uk: 'Фільтр',
  },
  'common.sort': {
    en: 'Sort',
    ru: 'Сортировать',
    uk: 'Сортувати',
  },
  'common.quantity': {
    en: 'Quantity',
    ru: 'Количество',
    uk: 'Кількість',
  },
  'common.price': {
    en: 'Price',
    ru: 'Цена',
    uk: 'Ціна',
  },
  'common.free': {
    en: 'Free',
    ru: 'Бесплатно',
    uk: 'Безкоштовно',
  },
  'common.notNow': {
    en: 'Not Now',
    ru: 'Не Сейчас',
    uk: 'Не Зараз',
  },
  'common.tryAgain': {
    en: 'Try Again',
    ru: 'Попробовать Снова',
    uk: 'Спробувати Знову',
  },

  // Gallery translations
  'gallery.title': {
    en: 'Gallery',
    ru: 'Галерея',
    uk: 'Галерея',
  },
  'gallery.subtitle': {
    en: 'Explore moments from our past sound healing meditation events and retreats',
    ru: 'Исследуйте моменты из наших прошлых событий звукового исцеления и медитации',
    uk: 'Дослідіть моменти з наших минулих подій звукового зцілення та медитації',
  },
  'gallery.allEvents': {
    en: 'All Events',
    ru: 'Все события',
    uk: 'Всі події',
  },
  'gallery.meditation': {
    en: 'Meditation',
    ru: 'Медитация',
    uk: 'Медитація',
  },
  'gallery.workshops': {
    en: 'Workshops',
    ru: 'Мастер-классы',
    uk: 'Майстер-класи',
  },
  'gallery.retreats': {
    en: 'Retreats',
    ru: 'Ретриты',
    uk: 'Ретрити',
  },
  'gallery.ceremonies': {
    en: 'Ceremonies',
    ru: 'Церемонии',
    uk: 'Церемонії',
  },
  'gallery.event': {
    en: 'Event',
    ru: 'Событие',
    uk: 'Подія',
  },
  'gallery.location': {
    en: 'Location',
    ru: 'Место',
    uk: 'Місце',
  },
  'gallery.date': {
    en: 'Date',
    ru: 'Дата',
    uk: 'Дата',
  },
  'gallery.image': {
    en: 'Image',
    ru: 'Изображение',
    uk: 'Зображення',
  },
  'gallery.photographer': {
    en: 'Photographer',
    ru: 'Фотограф',
    uk: 'Фотограф',
  },
  'gallery.noImages': {
    en: 'No images found',
    ru: 'Изображения не найдены',
    uk: 'Зображення не знайдені',
  },
  'gallery.viewMore': {
    en: 'View Gallery',
    ru: 'Просмотреть Галерею',
    uk: 'Переглянути Галерею',
  },
  'gallery.pastEvents': {
    en: 'Past Sound Healing Events',
    ru: 'Прошлые события звукового исцеления',
    uk: 'Минулі події звукового зцілення',
  },
  'gallery.eventsCaptured': {
    en: 'Events Captured',
    ru: 'Событий Запечатлено',
    uk: 'Подій Запечатлено',
  },
  'gallery.momentsShared': {
    en: 'Moments Shared',
    ru: 'Моментов поделено',
    uk: 'Моментів поділено',
  },
  'gallery.joinNext': {
    en: 'Join Our Next Event',
    ru: 'Присоединитесь к Нашему Следующему Событию',
    uk: 'Приєднайтеся до Нашої Наступної Події',
  },
  'gallery.joinDescription': {
    en: 'Experience the transformative power of sound healing with our community. Check back soon for upcoming events and retreats.',
    ru: 'Испытайте преобразующую силу звукового исцеления с нашим сообществом. Проверьте позже предстоящие события и ретриты.',
    uk: 'Відчуйте перетворюючу силу звукового зцілення з нашою спільнотою. Перевіряйте пізніше майбутні події та ретрити.',
  },
  'gallery.getInTouch': {
    en: 'Get in Touch',
    ru: 'Свяжитесь с Нами',
    uk: "Зв'яжіться з Нами",
  },
  'gallery.photos': {
    en: 'All Photos',
    ru: 'Все фото',
    uk: 'Усі фото',
  },
  'gallery.albums': {
    en: 'Albums',
    ru: 'Альбомы',
    uk: 'Альбоми',
  },
  'gallery.albumsTitle': {
    en: 'Event Albums',
    ru: 'Альбомы событий',
    uk: 'Альбоми подій',
  },
  'gallery.albumsSubtitle': {
    en: 'Browse photo albums grouped by event date and activity',
    ru: 'Просматривайте фотоальбомы, сгруппированные по дате и типу мероприятия',
    uk: 'Переглядайте фотоальбоми, згруповані за датою та типом події',
  },
  'gallery.noAlbums': {
    en: 'No albums found',
    ru: 'Альбомы не найдены',
    uk: 'Альбоми не знайдено',
  },
  'gallery.backToAlbums': {
    en: 'Back to albums',
    ru: 'Назад к альбомам',
    uk: 'Назад до альбомів',
  },
  'gallery.photoCount': {
    en: '{count} photos',
    ru: '{count} фото',
    uk: '{count} фото',
  },
};

// Translation function
export function t(key: string, locale: Locale = DEFAULT_LOCALE, params?: Record<string, any>): string {
  const translation = translations[key]?.[locale] || translations[key]?.['en'] || key;
  
  // Replace parameters in translation
  if (params) {
    return Object.keys(params).reduce((str, param) => {
      return str.replace(new RegExp(`{${param}}`, 'g'), String(params[param]));
    }, translation);
  }
  
  return translation;
}

// Function to extract locale from pathname
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  // Check if first segment is a valid locale
  if (firstSegment && ['en', 'ru', 'uk'].includes(firstSegment)) {
    return firstSegment as Locale;
  }
  
  return DEFAULT_LOCALE;
}

// Get available locales
export function getAvailableLocales(): Locale[] {
  return ['uk', 'en', 'ru'];
}

// Get locale display name
export function getLocaleDisplayName(locale: Locale): string {
  const displayNames: Record<Locale, string> = {
    en: 'English',
    ru: 'Русский',
    uk: 'Українська',
  };
  
  return displayNames[locale] || locale;
}

// Get locale flag
export function getLocaleFlag(locale: Locale): string {
  const flags: Record<Locale, string> = {
    en: '🇺🇸',
    ru: '🇷🇺',
    uk: '🇺🇦',
  };
  
  return flags[locale] || '🌐';
}

// Get article category translation key
export function getArticleCategoryTranslationKey(category: ArticleCategory): string {
  switch (category) {
    case ArticleCategory.SOUND_HEALING:
      return 'blog.category.soundHealing';
    case ArticleCategory.MEDITATION:
      return 'blog.category.meditation';
    case ArticleCategory.WELLNESS:
      return 'blog.category.wellness';
    case ArticleCategory.CULTURE:
      return 'blog.category.culture';
    case ArticleCategory.TUTORIALS:
      return 'blog.category.tutorials';
    default:
      return 'blog.category.all';
  }
}