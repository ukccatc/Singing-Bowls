import { Locale } from '@/lib/types';

export interface FaqItem {
  question: string;
  answer: string[];
}

export interface FaqCategory {
  id: string;
  title: string;
  items: FaqItem[];
}

export interface FaqDocument {
  title: string;
  lastUpdated: string;
  intro: string;
  categories: FaqCategory[];
}

export type LocalizedFaqDocument = Record<Locale, FaqDocument>;

const LAST_UPDATED_EN = 'July 2, 2026';
const LAST_UPDATED_UK = '2 липня 2026';
const LAST_UPDATED_RU = '2 июля 2026';

export const faqDocument: LocalizedFaqDocument = {
  en: {
    title: 'Frequently Asked Questions',
    lastUpdated: LAST_UPDATED_EN,
    intro:
      'Answers to the most common questions about our Himalayan singing bowls, orders, delivery to Ukraine and worldwide, payments, returns, and care. If you cannot find your answer here, please contact us at himalayansound.info@gmail.com.',
    categories: [
      {
        id: 'products',
        title: 'Products & Authenticity',
        items: [
          {
            question: 'Are your singing bowls authentic and hand-made?',
            answer: [
              'Yes. Every bowl is hand-hammered by artisans in the Kathmandu Valley, Nepal, from a traditional seven-metal alloy. We personally select each piece for sound quality, sustain, and clarity of the fundamental tone.',
              'Each order includes a certificate of origin listing the artisan workshop, alloy composition, and the fundamental note of the bowl.',
            ],
          },
          {
            question: 'What are singing bowls made of?',
            answer: [
              'Our traditional bowls are made from a seven-metal alloy (Panchaloha+2): copper, tin, iron, silver, gold, nickel, and zinc. This composition is considered classical and gives the bowl a rich, complex overtone spectrum.',
              'We also offer pure quartz crystal bowls, clearly labelled as such on their product pages.',
            ],
          },
          {
            question: 'How do I choose the right bowl for me?',
            answer: [
              'For meditation and personal sound baths, a 15–20 cm bowl in the C–G note range is a great starting point. For sound therapy sessions, a set covering several notes is more useful. For chakra work, look at our chakra sets aligned to the seven main energy centres.',
              'You can filter bowls on the shop page by size, note, and intended use. If you would like a personal recommendation, contact us with a short description of your goals — we reply within one business day.',
            ],
          },
        ],
      },
      {
        id: 'orders',
        title: 'Orders & Payment',
        items: [
          {
            question: 'What payment methods do you accept?',
            answer: [
              'We accept Visa, Mastercard, American Express, Apple Pay, Google Pay, and bank transfer. For customers in Ukraine we additionally support payment in UAH via LiqPay and direct IBAN transfer.',
              'All card payments are processed by PCI-DSS certified providers. We never store full card numbers on our servers.',
            ],
          },
          {
            question: 'Can I pay in Ukrainian hryvnia (UAH)?',
            answer: [
              'Yes. On the checkout page you can switch the currency to UAH, and the total will be converted at the current exchange rate. Payment in UAH is available via LiqPay and Ukrainian bank transfer.',
            ],
          },
          {
            question: 'Is cash on delivery (післяплата) available for Ukraine?',
            answer: [
              'For standard-price items shipped within Ukraine from our Odessa warehouse, we can offer Nova Poshta cash on delivery ("післяплата") on request.',
              'To enable cash on delivery, mention it in the order comment or contact us before placing the order.',
            ],
          },
          {
            question: 'Do I get an invoice for my order?',
            answer: [
              'Yes. An electronic invoice / receipt is automatically emailed to you after payment. For Ukrainian business customers we can issue a commercial invoice with your company details — just reply to the order confirmation email.',
            ],
          },
        ],
      },
      {
        id: 'shipping',
        title: 'Shipping & Delivery',
        items: [
          {
            question: 'Do you deliver to Ukraine?',
            answer: [
              'Yes. We deliver across Ukraine via Nova Poshta (to a branch, parcel locker, or courier) and Ukrposhta (for smaller towns and rural areas).',
              'Typical delivery time to Ukraine is 7–16 business days: 5–14 for the international leg and 1–5 for the local last mile. Detailed conditions are in our Shipping Policy.',
            ],
          },
          {
            question: 'How much does shipping to Ukraine cost?',
            answer: [
              'Shipping cost depends on weight and dimensions. Standard shipping for a single bowl is typically 25–45 USD. The exact cost is shown at checkout before payment. We periodically offer free shipping above a threshold — check the shop banner for the current offer.',
            ],
          },
          {
            question: 'Will I have to pay customs duties in Ukraine?',
            answer: [
              'International parcels to individuals in Ukraine are exempt from import VAT and duty if their declared value is up to 150 EUR. Above 150 EUR, VAT 20% and, where applicable, customs duty 10% are charged on the amount exceeding the threshold.',
              'The recipient is responsible for any duties. We provide all customs documents to the carrier so the process is smooth.',
            ],
          },
          {
            question: 'How can I track my parcel?',
            answer: [
              'After dispatch you receive an email with a tracking number and link. For Ukrainian orders you can also enter this number on novaposhta.ua or ukrposhta.ua to see the real-time status.',
            ],
          },
        ],
      },
      {
        id: 'returns',
        title: 'Returns & Refunds',
        items: [
          {
            question: 'Can I return a bowl if I change my mind?',
            answer: [
              'Yes. You have 14 calendar days from the date of delivery to return a product without giving any reason, in line with the Law of Ukraine "On the Protection of Consumer Rights" and EU/UK consumer law. The item must be unused and in its original packaging.',
            ],
          },
          {
            question: 'What if my bowl arrives damaged?',
            answer: [
              'Please inspect the parcel at the Nova Poshta or Ukrposhta branch before signing the acceptance form. If there is visible damage, ask the branch staff to issue a damage report ("акт про пошкодження") and contact us within 48 hours with photos.',
              'We will arrange a free replacement, repair, or full refund at your choice.',
            ],
          },
          {
            question: 'Who pays for return shipping?',
            answer: [
              'If the return is due to our error (wrong or damaged item), we pay the return shipping. If you are returning for personal reasons within the 14-day window, the return shipping is at your expense.',
            ],
          },
        ],
      },
      {
        id: 'care',
        title: 'Care & Use',
        items: [
          {
            question: 'How do I care for my singing bowl?',
            answer: [
              'Wipe the bowl with a soft dry cloth after each use. Avoid abrasive cleaners and dishwashers. Store on the provided cushion or in a soft pouch to protect the outer patina.',
              'If the bowl becomes dull, you can gently polish it with a cloth and a small amount of natural metal polish, avoiding the striking edge.',
            ],
          },
          {
            question: 'How do I play a singing bowl correctly?',
            answer: [
              'Hold the bowl on an open palm (or place it on a cushion). Strike the rim gently once with the padded end of the mallet to activate it, then run the wooden end along the outer rim in a steady, continuous circular motion with light and even pressure. Speed matters more than force.',
            ],
          },
          {
            question: 'Can I take a singing bowl on a plane?',
            answer: [
              'Yes. Small and medium singing bowls travel well in hand luggage inside a padded pouch. For fragile large bowls we recommend checked luggage with plenty of padding, or shipping them separately.',
            ],
          },
        ],
      },
    ],
  },
  uk: {
    title: 'Питання та відповіді',
    lastUpdated: LAST_UPDATED_UK,
    intro:
      'Відповіді на найпоширеніші питання про наші гімалайські співаючі чаші, замовлення, доставку в Україну та по всьому світу, оплату, повернення та догляд. Якщо ви не знайшли відповіді тут — напишіть на himalayansound.info@gmail.com.',
    categories: [
      {
        id: 'products',
        title: 'Товари та автентичність',
        items: [
          {
            question: 'Ваші співаючі чаші автентичні та ручної роботи?',
            answer: [
              'Так. Кожна чаша викувана вручну майстрами в долині Катманду (Непал) із традиційного сплаву семи металів. Ми особисто відбираємо кожен виріб за якістю звуку, тривалістю резонансу та чистотою основного тону.',
              'До кожного замовлення додається сертифікат походження зі складом сплаву, назвою майстерні та основною нотою чаші.',
            ],
          },
          {
            question: 'З чого зроблені співаючі чаші?',
            answer: [
              'Наші традиційні чаші виготовлені зі сплаву семи металів (Панчалоха+2): мідь, олово, залізо, срібло, золото, нікель і цинк. Такий склад вважається класичним і забезпечує багатий обертоновий спектр.',
              'Ми також пропонуємо чаші з чистого кварцу, які позначені на відповідних сторінках товару.',
            ],
          },
          {
            question: 'Як обрати чашу для себе?',
            answer: [
              'Для медитації та особистих сеансів звукотерапії добре підходить чаша 15–20 см у діапазоні нот C–G. Для терапевтичних сеансів корисніший набір з кількох нот. Для роботи з чакрами — наші набори з семи чаш, налаштовані на основні енергетичні центри.',
              'У магазині можна фільтрувати чаші за розміром, нотою та призначенням. Хочете персональну рекомендацію — напишіть коротко про свою мету, і ми відповімо протягом одного робочого дня.',
            ],
          },
        ],
      },
      {
        id: 'orders',
        title: 'Замовлення та оплата',
        items: [
          {
            question: 'Які способи оплати ви приймаєте?',
            answer: [
              'Ми приймаємо Visa, Mastercard, American Express, Apple Pay, Google Pay та банківський переказ. Для клієнтів в Україні додатково доступна оплата у гривні через LiqPay та переказ на IBAN.',
              'Усі платежі картками обробляються PCI-DSS сертифікованими провайдерами. Ми ніколи не зберігаємо повні номери карток на наших серверах.',
            ],
          },
          {
            question: 'Чи можна оплатити у гривні (UAH)?',
            answer: [
              'Так. На сторінці оформлення можна перемкнути валюту на UAH — сума буде конвертована за поточним курсом. Оплата у гривні доступна через LiqPay та банківський переказ.',
            ],
          },
          {
            question: 'Чи доступна оплата післяплатою по Україні?',
            answer: [
              'Для товарів за стандартною ціною при доставці по Україні з нашого складу в Одесі ми можемо запропонувати післяплату Новою Поштою за запитом.',
              'Щоб оформити післяплату, вкажіть це у коментарі до замовлення або напишіть нам до оплати.',
            ],
          },
          {
            question: 'Чи отримаю я чек/інвойс на замовлення?',
            answer: [
              'Так. Електронний чек надсилається автоматично після оплати. Для бізнес-клієнтів в Україні ми можемо виставити комерційний інвойс з реквізитами компанії — просто дайте відповідь на лист із підтвердженням замовлення.',
            ],
          },
        ],
      },
      {
        id: 'shipping',
        title: 'Доставка',
        items: [
          {
            question: 'Ви доставляєте в Україну?',
            answer: [
              'Так. Ми доставляємо по всій Україні через Нову Пошту (у відділення, поштомат або кур\'єром) та Укрпошту (у невеликі міста та села).',
              'Стандартний термін доставки в Україну — 7–16 робочих днів: 5–14 днів міжнародна ділянка та 1–5 днів по Україні. Деталі — в Політиці доставки.',
            ],
          },
          {
            question: 'Скільки коштує доставка в Україну?',
            answer: [
              'Вартість залежить від ваги та розмірів. Стандартна доставка однієї чаші — зазвичай 25–45 USD. Точна вартість відображається під час оформлення до оплати. Періодично ми проводимо акції з безкоштовною доставкою від певної суми — актуальний поріг у банері магазину.',
            ],
          },
          {
            question: 'Чи потрібно платити мито в Україні?',
            answer: [
              'Міжнародні посилки для фізосіб в Україну звільнені від ПДВ та мита, якщо задекларована вартість до 150 EUR. Понад 150 EUR застосовуються ПДВ 20% та (за необхідності) мито 10% на суму, що перевищує поріг.',
              'Отримувач сплачує мито самостійно. Ми надаємо всі митні документи перевізнику, щоб процес пройшов гладко.',
            ],
          },
          {
            question: 'Як відстежити посилку?',
            answer: [
              'Після відправлення ви отримаєте лист із ТТН та посиланням. Для замовлень по Україні цей номер також працює на novaposhta.ua або ukrposhta.ua — там ви побачите статус у реальному часі.',
            ],
          },
        ],
      },
      {
        id: 'returns',
        title: 'Повернення та відшкодування',
        items: [
          {
            question: 'Чи можу я повернути чашу, якщо передумав?',
            answer: [
              'Так. У вас є 14 календарних днів з моменту отримання, щоб повернути товар без пояснення причин, відповідно до Закону України «Про захист прав споживачів» та законодавства ЄС/UK. Товар має бути невикористаним і в оригінальній упаковці.',
            ],
          },
          {
            question: 'Що робити, якщо чаша прибула пошкодженою?',
            answer: [
              'Перевіряйте посилку у відділенні Нової Пошти або Укрпошти до підпису у документі про отримання. При видимих пошкодженнях попросіть співробітника оформити «акт про пошкодження» та зв\'яжіться з нами протягом 48 годин, надіславши фото.',
              'Ми організуємо безкоштовну заміну, ремонт або повне відшкодування — на ваш вибір.',
            ],
          },
          {
            question: 'Хто оплачує зворотне пересилання?',
            answer: [
              'Якщо повернення пов\'язане з нашою помилкою (не той товар або пошкоджений) — зворотне пересилання оплачуємо ми. Якщо ви повертаєте товар з особистих причин у межах 14 днів — за рахунок клієнта.',
            ],
          },
        ],
      },
      {
        id: 'care',
        title: 'Догляд і використання',
        items: [
          {
            question: 'Як доглядати за співаючою чашею?',
            answer: [
              'Протирайте чашу м\'якою сухою тканиною після кожного використання. Уникайте абразивних засобів і посудомийних машин. Зберігайте на подушці, що додається, або в м\'якому мішечку, щоб зберегти зовнішню патину.',
              'Якщо чаша потьмяніла, можна обережно поліруйте її тканиною з невеликою кількістю натурального засобу для металу, уникаючи ударної кромки.',
            ],
          },
          {
            question: 'Як правильно грати на співаючій чаші?',
            answer: [
              'Тримайте чашу на відкритій долоні (або поставте на подушку). Легко вдарте по краю м\'якою частиною молотка, щоб «активувати» звук, потім проведіть дерев\'яним кінцем по зовнішньому краю рівним безперервним круговим рухом з легким рівномірним натиском. Швидкість важливіша за силу.',
            ],
          },
          {
            question: 'Чи можна брати чашу у літак?',
            answer: [
              'Так. Малі та середні чаші добре переносяться у ручній поклажі в м\'якому чохлі. Для великих крихких чаш рекомендуємо здану багажну поклажу з амортизацією або окреме пересилання.',
            ],
          },
        ],
      },
    ],
  },
  ru: {
    title: 'Часто задаваемые вопросы',
    lastUpdated: LAST_UPDATED_RU,
    intro:
      'Ответы на самые частые вопросы о наших гималайских поющих чашах, заказах, доставке в Украину и по всему миру, оплате, возврате и уходе. Если вы не нашли ответа здесь — напишите на himalayansound.info@gmail.com.',
    categories: [
      {
        id: 'products',
        title: 'Товары и подлинность',
        items: [
          {
            question: 'Ваши поющие чаши подлинные и ручной работы?',
            answer: [
              'Да. Каждая чаша выкована вручную мастерами в долине Катманду (Непал) из традиционного сплава семи металлов. Мы лично отбираем каждое изделие по качеству звука, длительности резонанса и чистоте основного тона.',
              'К каждому заказу прилагается сертификат происхождения с составом сплава, названием мастерской и основной нотой чаши.',
            ],
          },
          {
            question: 'Из чего сделаны поющие чаши?',
            answer: [
              'Наши традиционные чаши изготовлены из сплава семи металлов (Панчалоха+2): медь, олово, железо, серебро, золото, никель и цинк. Такой состав считается классическим и обеспечивает богатый обертоновый спектр.',
              'Мы также предлагаем чаши из чистого кварца — они помечены на страницах товаров.',
            ],
          },
          {
            question: 'Как выбрать чашу для себя?',
            answer: [
              'Для медитации и личных сеансов звукотерапии подходит чаша 15–20 см в диапазоне нот C–G. Для терапевтических сеансов полезнее набор из нескольких нот. Для работы с чакрами — наши наборы из семи чаш, настроенные на основные энергетические центры.',
              'В магазине можно фильтровать чаши по размеру, ноте и назначению. Нужна персональная рекомендация — напишите кратко о цели, ответим в течение одного рабочего дня.',
            ],
          },
        ],
      },
      {
        id: 'orders',
        title: 'Заказы и оплата',
        items: [
          {
            question: 'Какие способы оплаты вы принимаете?',
            answer: [
              'Мы принимаем Visa, Mastercard, American Express, Apple Pay, Google Pay и банковский перевод. Для клиентов в Украине дополнительно доступна оплата в гривне через LiqPay и перевод на IBAN.',
              'Все платежи картами обрабатываются PCI-DSS сертифицированными провайдерами. Мы не храним полные номера карт на наших серверах.',
            ],
          },
          {
            question: 'Можно ли оплатить в гривне (UAH)?',
            answer: [
              'Да. На странице оформления можно переключить валюту на UAH — сумма конвертируется по текущему курсу. Оплата в гривне доступна через LiqPay и банковский перевод.',
            ],
          },
          {
            question: 'Доступна ли оплата наложенным платежом по Украине?',
            answer: [
              'Для товаров по стандартной цене при доставке по Украине со склада в Одессе мы можем предложить наложенный платёж («післяплата») Новой Почтой по запросу.',
              'Чтобы оформить наложенный платёж, укажите это в комментарии к заказу или напишите нам до оплаты.',
            ],
          },
          {
            question: 'Получу ли я чек/инвойс на заказ?',
            answer: [
              'Да. Электронный чек отправляется автоматически после оплаты. Для бизнес-клиентов в Украине мы можем выставить коммерческий инвойс с реквизитами компании — просто ответьте на письмо с подтверждением заказа.',
            ],
          },
        ],
      },
      {
        id: 'shipping',
        title: 'Доставка',
        items: [
          {
            question: 'Вы доставляете в Украину?',
            answer: [
              'Да. Мы доставляем по всей Украине через Новую Почту (в отделение, почтомат или курьером) и Укрпочту (в небольшие города и сёла).',
              'Стандартный срок доставки в Украину — 7–16 рабочих дней: 5–14 дней международный этап и 1–5 дней по Украине. Подробности — в Политике доставки.',
            ],
          },
          {
            question: 'Сколько стоит доставка в Украину?',
            answer: [
              'Стоимость зависит от веса и размеров. Стандартная доставка одной чаши — обычно 25–45 USD. Точная стоимость отображается при оформлении до оплаты. Периодически действуют акции с бесплатной доставкой от определённой суммы — актуальный порог в баннере магазина.',
            ],
          },
          {
            question: 'Нужно ли платить таможенную пошлину в Украине?',
            answer: [
              'Международные посылки для физлиц в Украину освобождены от НДС и пошлины, если задекларированная стоимость до 150 EUR. Свыше 150 EUR применяются НДС 20% и (при необходимости) пошлина 10% на сумму, превышающую порог.',
              'Получатель оплачивает пошлину самостоятельно. Мы предоставляем все таможенные документы перевозчику, чтобы процесс прошёл гладко.',
            ],
          },
          {
            question: 'Как отследить посылку?',
            answer: [
              'После отправки вы получите письмо с ТТН и ссылкой. Для заказов по Украине этот номер работает и на novaposhta.ua или ukrposhta.ua — там вы увидите статус в реальном времени.',
            ],
          },
        ],
      },
      {
        id: 'returns',
        title: 'Возврат и возмещение',
        items: [
          {
            question: 'Могу ли я вернуть чашу, если передумал?',
            answer: [
              'Да. У вас есть 14 календарных дней с момента получения, чтобы вернуть товар без объяснения причин, в соответствии с Законом Украины «О защите прав потребителей» и законодательством ЕС/UK. Товар должен быть неиспользованным и в оригинальной упаковке.',
            ],
          },
          {
            question: 'Что делать, если чаша пришла повреждённой?',
            answer: [
              'Проверяйте посылку в отделении Новой Почты или Укрпочты до подписания документа о получении. При видимых повреждениях попросите сотрудника оформить «акт о повреждении» и свяжитесь с нами в течение 48 часов, приложив фото.',
              'Мы организуем бесплатную замену, ремонт или полное возмещение — по вашему выбору.',
            ],
          },
          {
            question: 'Кто оплачивает обратную пересылку?',
            answer: [
              'Если возврат связан с нашей ошибкой (не тот товар или повреждённый) — обратную пересылку оплачиваем мы. Если вы возвращаете товар по личным причинам в течение 14 дней — за счёт клиента.',
            ],
          },
        ],
      },
      {
        id: 'care',
        title: 'Уход и использование',
        items: [
          {
            question: 'Как ухаживать за поющей чашей?',
            answer: [
              'Протирайте чашу мягкой сухой тканью после каждого использования. Избегайте абразивных средств и посудомоечных машин. Храните на прилагаемой подушке или в мягком мешочке, чтобы сохранить внешнюю патину.',
              'Если чаша потускнела, можно аккуратно полировать её тканью с небольшим количеством натурального средства для металла, избегая ударной кромки.',
            ],
          },
          {
            question: 'Как правильно играть на поющей чаше?',
            answer: [
              'Держите чашу на открытой ладони (или поставьте на подушку). Легко ударьте по краю мягкой частью молотка, чтобы «активировать» звук, затем ведите деревянным концом по внешнему краю ровным непрерывным круговым движением с лёгким равномерным нажимом. Скорость важнее силы.',
            ],
          },
          {
            question: 'Можно ли брать чашу в самолёт?',
            answer: [
              'Да. Малые и средние чаши хорошо переносятся в ручной клади в мягком чехле. Для крупных хрупких чаш рекомендуем сданный багаж с амортизацией или отдельную пересылку.',
            ],
          },
        ],
      },
    ],
  },
};

export function getFaq(locale: Locale): FaqDocument {
  return faqDocument[locale] || faqDocument.en;
}
