import { ArticleCategory, Locale } from './types';

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
    en: 'Himalayan Sound was born from a deep reverence for the ancient art of sound healing and a commitment to preserving traditional Nepalese craftsmanship.',
    ru: 'Himalayan Sound родился из глубокого почтения к древнему искусству звукового исцеления и приверженности сохранению традиционного непальского мастерства.',
    uk: 'Himalayan Sound народився з глибокої пошани до стародавнього мистецтва звукового зцілення та прихильності до збереження традиційної непальської майстерності.',
  },
  'about.journey.title': {
    en: 'Our Journey',
    ru: 'Наш Путь',
    uk: 'Наш Шлях',
  },
  'about.values.title': {
    en: 'Our Values',
    ru: 'Наши Ценности',
    uk: 'Наші Цінності',
  },
  'about.values.subtitle': {
    en: 'These principles guide everything we do, from selecting materials to nurturing relationships with our artisan partners.',
    ru: 'Эти принципы направляют все, что мы делаем, от выбора материалов до развития отношений с нашими партнерами-ремесленниками.',
    uk: 'Ці принципи керують усім, що ми робимо, від вибору матеріалів до розвитку відносин з нашими партнерами-ремісниками.',
  },
  'about.team.title': {
    en: 'Meet Our Team',
    ru: 'Познакомьтесь с Нашей Командой',
    uk: 'Познайомтеся з Нашою Командою',
  },
  'about.team.subtitle': {
    en: 'Passionate individuals dedicated to sharing the healing power of sound with the world.',
    ru: 'Увлеченные люди, посвятившие себя распространению целительной силы звука по всему миру.',
    uk: 'Захоплені люди, присвячені поширенню цілющої сили звуку по всьому світу.',
  },
  'about.mission.title': {
    en: 'Our Mission',
    ru: 'Наша Миссия',
    uk: 'Наша Місія',
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
    en: 'Mon-Fri, 9AM-6PM NPT',
    ru: 'Пн-Пт, 9:00-18:00 NPT',
    uk: 'Пн-Пт, 9:00-18:00 NPT',
  },
  'contact.info.visit.title': {
    en: 'Visit Us',
    ru: 'Посетите Нас',
    uk: 'Відвідайте Нас',
  },
  'contact.info.visit.description': {
    en: 'Workshop tours available',
    ru: 'Доступны экскурсии по мастерской',
    uk: 'Доступні екскурсії по майстерні',
  },
  'contact.info.hours.title': {
    en: 'Business Hours',
    ru: 'Часы Работы',
    uk: 'Години Роботи',
  },
  'contact.info.hours.description': {
    en: 'Nepal Time (NPT)',
    ru: 'Время Непала (NPT)',
    uk: 'Час Непалу (NPT)',
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
    en: 'Made with love in Nepal',
    ru: 'Сделано с любовью в Непале',
    uk: 'Зроблено з любов\'ю в Непалі',
  },
  'footer.tagline': {
    en: 'Authentic Himalayan singing bowls and sound healing instruments',
    ru: 'Аутентичные гималайские поющие чаши и инструменты для звукового исцеления',
    uk: 'Автентичні гімалайські співаючі чаші та інструменти для звукового зцілення',
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
};

// Translation function
export function t(key: string, locale: Locale = 'en', params?: Record<string, any>): string {
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
  
  // Default to English
  return 'en';
}

// Get available locales
export function getAvailableLocales(): Locale[] {
  return ['en', 'ru', 'uk'];
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