import { LocalizedLegalDocument } from './types';

const LAST_UPDATED = 'July 2, 2026';

export const privacyPolicy: LocalizedLegalDocument = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: LAST_UPDATED,
    intro:
      'Himalayan Sound ("we", "us", or "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and protect personal data when you visit himalayan-sound.com, use our mobile app, or purchase our products. It is designed to comply with the EU General Data Protection Regulation (GDPR), the UK GDPR, the Law of Ukraine "On Personal Data Protection", and other applicable international privacy laws.',
    sections: [
      {
        id: 'controller',
        title: '1. Data Controller',
        paragraphs: [
          'The data controller responsible for your personal data is Himalayan Sound, operating from RC London, Instytutska St., Odesa, 65000, Ukraine.',
          'For privacy-related inquiries, contact us at ukccatc@gmail.com or through our contact form at himalayan-sound.com/contact.',
        ],
      },
      {
        id: 'scope',
        title: '2. Scope and Applicability',
        paragraphs: [
          'This policy applies to all visitors and customers worldwide, including users in Ukraine, the European Union, the United Kingdom, and other jurisdictions.',
          'If you are located in the EEA, UK, or Ukraine, you have additional rights described in Section 10. Where local law grants you greater protections, those protections apply.',
        ],
      },
      {
        id: 'collect',
        title: '3. Information We Collect',
        paragraphs: ['We may collect the following categories of personal data:'],
        listItems: [
          'Identity data: name, billing and shipping address.',
          'Contact data: email address, phone number.',
          'Transaction data: order details, payment status (card details are processed by our payment provider and are not stored by us).',
          'Technical data: IP address, browser type, device information, cookies, and usage data.',
          'Communication data: messages you send via contact forms, customer support, or newsletter sign-up.',
          'Marketing preferences: whether you opted in to receive promotional emails.',
        ],
      },
      {
        id: 'use',
        title: '4. How We Use Your Information',
        paragraphs: ['We use personal data to:'],
        listItems: [
          'Process and fulfil orders, including shipping and customer support.',
          'Communicate about your orders, account, or inquiries.',
          'Improve our website, products, and user experience.',
          'Send marketing communications where you have given consent.',
          'Comply with legal obligations, including tax and accounting requirements.',
          'Prevent fraud and protect the security of our services.',
        ],
      },
      {
        id: 'legal-basis',
        title: '5. Legal Basis for Processing (GDPR & Ukraine)',
        paragraphs: [
          'Under GDPR, we process personal data on the following bases: performance of a contract (order fulfilment), legitimate interests (fraud prevention, analytics, service improvement), legal obligation, and consent (marketing, non-essential cookies).',
          'Under Ukrainian law, processing is carried out with your consent where required, and otherwise where necessary to fulfil contractual obligations or comply with applicable legislation.',
        ],
      },
      {
        id: 'cookies',
        title: '6. Cookies and Similar Technologies',
        paragraphs: [
          'We use essential cookies required for the site to function (e.g. cart, session, language preference). With your consent, we may use analytics cookies (such as Google Analytics) to understand how visitors use our site.',
          'You can manage cookie preferences through your browser settings. Disabling essential cookies may affect site functionality.',
        ],
      },
      {
        id: 'sharing',
        title: '7. Sharing with Third Parties',
        paragraphs: [
          'We share personal data only with trusted service providers who assist us in operating our business:',
        ],
        listItems: [
          'Payment processors (e.g. Stripe) for secure payment processing.',
          'Shipping and logistics partners for order delivery.',
          'Cloud hosting and database providers (e.g. Supabase, Vercel) for data storage and site hosting.',
          'Email and communication services for transactional and marketing emails.',
          'Analytics providers, where you have consented.',
        ],
      },
      {
        id: 'sharing-note',
        title: '',
        paragraphs: [
          'We do not sell your personal data. Service providers are contractually required to protect your data and use it only for specified purposes.',
        ],
      },
      {
        id: 'transfers',
        title: '8. International Data Transfers',
        paragraphs: [
          'Your data may be processed in Ukraine, the European Union, the United States, Nepal (supplier partners), or other countries where our service providers operate.',
          'Where data is transferred outside the EEA, UK, or Ukraine, we implement appropriate safeguards such as Standard Contractual Clauses (SCCs) approved by the European Commission, or equivalent mechanisms required by applicable law.',
        ],
      },
      {
        id: 'retention',
        title: '9. Data Retention',
        paragraphs: [
          'We retain personal data only as long as necessary for the purposes described in this policy, unless a longer retention period is required by law.',
          'Order and transaction records are typically retained for 7 years for tax and accounting purposes. Marketing data is retained until you withdraw consent or unsubscribe.',
        ],
      },
      {
        id: 'rights',
        title: '10. Your Rights',
        paragraphs: [
          'Depending on your location, you may have the following rights regarding your personal data:',
        ],
        listItems: [
          'Right of access — request a copy of your personal data.',
          'Right to rectification — correct inaccurate or incomplete data.',
          'Right to erasure ("right to be forgotten") — request deletion where applicable.',
          'Right to restrict processing — limit how we use your data.',
          'Right to data portability — receive your data in a structured, machine-readable format.',
          'Right to object — object to processing based on legitimate interests or for direct marketing.',
          'Right to withdraw consent — at any time, without affecting prior lawful processing.',
          'Right to lodge a complaint — with the Ukrainian Commissioner for Human Rights, your local EU supervisory authority, or the UK ICO.',
        ],
      },
      {
        id: 'rights-note',
        title: '',
        paragraphs: [
          'To exercise your rights, contact us at ukccatc@gmail.com. We will respond within 30 days, or within the timeframe required by applicable law (e.g. one month under GDPR).',
        ],
      },
      {
        id: 'children',
        title: '11. Children\'s Privacy',
        paragraphs: [
          'Our services are not directed to individuals under 16 years of age. We do not knowingly collect personal data from children. If you believe we have collected data from a child, please contact us and we will delete it promptly.',
        ],
      },
      {
        id: 'security',
        title: '12. Security',
        paragraphs: [
          'We implement appropriate technical and organisational measures to protect personal data, including encryption in transit (HTTPS), secure payment processing, access controls, and regular security reviews.',
          'No method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.',
        ],
      },
      {
        id: 'changes',
        title: '13. Changes to This Policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time. Material changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.',
        ],
      },
      {
        id: 'contact',
        title: '14. Contact Us',
        paragraphs: [
          'For questions about this Privacy Policy or to exercise your data protection rights, contact:',
          'Himalayan Sound — ukccatc@gmail.com — RC London, Instytutska St., Odesa, 65000, Ukraine',
        ],
      },
    ],
  },
  uk: {
    title: 'Політика конфіденційності',
    lastUpdated: '2 липня 2026',
    intro:
      'Himalayan Sound («ми», «нас» або «наш») поважає вашу конфіденційність. Ця Політика конфіденційності пояснює, як ми збираємо, використовуємо, розкриваємо та захищаємо персональні дані, коли ви відвідуєте himalayan-sound.com, користуєтесь нашим мобільним додатком або купуєте наші товари. Вона розроблена відповідно до GDPR (ЄС), UK GDPR, Закону України «Про захист персональних даних» та інших застосовних міжнародних норм.',
    sections: [
      {
        id: 'controller',
        title: '1. Контролер даних',
        paragraphs: [
          'Контролером персональних даних є Himalayan Sound, що працює з Одеси, Україна.',
          'З питань конфіденційності звертайтесь: ukccatc@gmail.com або через форму на himalayan-sound.com/contact.',
        ],
      },
      {
        id: 'scope',
        title: '2. Сфера застосування',
        paragraphs: [
          'Ця політика застосовується до всіх відвідувачів і клієнтів у всьому світі, включно з користувачами в Україні, ЄС, Великобританії та інших юрисдикціях.',
          'Якщо ви перебуваєте в ЄЕЗ, UK або Україні, ви маєте додаткові права, описані в Розділі 10. Застосовуються більші захисти, передбачені місцевим законодавством.',
        ],
      },
      {
        id: 'collect',
        title: '3. Які дані ми збираємо',
        paragraphs: ['Ми можемо збирати такі категорії персональних даних:'],
        listItems: [
          'Ідентифікаційні дані: ім\'я, адреса доставки та оплати.',
          'Контактні дані: електронна пошта, номер телефону.',
          'Дані транзакцій: деталі замовлення, статус оплати (дані картки обробляє платіжний провайдер і не зберігаються нами).',
          'Технічні дані: IP-адреса, тип браузера, інформація про пристрій, cookies, дані використання.',
          'Дані комунікації: повідомлення через контактні форми, підтримку або підписку на розсилку.',
          'Маркетингові налаштування: згода на отримання рекламних листів.',
        ],
      },
      {
        id: 'use',
        title: '4. Як ми використовуємо ваші дані',
        paragraphs: ['Ми використовуємо персональні дані для:'],
        listItems: [
          'Обробки та виконання замовлень, доставки та підтримки клієнтів.',
          'Комунікації щодо замовлень, облікового запису або звернень.',
          'Покращення сайту, товарів та користувацького досвіду.',
          'Маркетингових повідомлень за вашою згодою.',
          'Виконання юридичних зобов\'язань, включно з податковим обліком.',
          'Запобігання шахрайству та захисту безпеки сервісів.',
        ],
      },
      {
        id: 'legal-basis',
        title: '5. Правові підстави обробки (GDPR та Україна)',
        paragraphs: [
          'За GDPR ми обробляємо дані на підставі: виконання договору, законного інтересу (запобігання шахрайству, аналітика), юридичного зобов\'язання та згоди (маркетинг, необов\'язкові cookies).',
          'За законодавством України обробка здійснюється за згодою, де це потрібно, або коли необхідно для виконання договірних зобов\'язань чи дотримання закону.',
        ],
      },
      {
        id: 'cookies',
        title: '6. Cookies та подібні технології',
        paragraphs: [
          'Ми використовуємо необхідні cookies для роботи сайту (кошик, сесія, мова). За вашою згодою — аналітичні cookies (наприклад, Google Analytics).',
          'Керувати cookies можна в налаштуваннях браузера. Вимкнення необхідних cookies може вплинути на функціональність сайту.',
        ],
      },
      {
        id: 'sharing',
        title: '7. Передача третім особам',
        paragraphs: ['Ми передаємо дані лише надійним постачальникам послуг:'],
        listItems: [
          'Платіжні процесори (наприклад, Stripe).',
          'Партнери з доставки.',
          'Хмарний хостинг і бази даних (Supabase, Vercel).',
          'Сервіси електронної пошти.',
          'Провайдери аналітики — за згодою.',
        ],
      },
      {
        id: 'sharing-note',
        title: '',
        paragraphs: [
          'Ми не продаємо ваші персональні дані. Постачальники зобов\'язані захищати дані та використовувати їх лише для вказаних цілей.',
        ],
      },
      {
        id: 'transfers',
        title: '8. Міжнародна передача даних',
        paragraphs: [
          'Ваші дані можуть оброблятися в Україні, ЄС, США, Непалі (партнери-постачальники) або інших країнах, де працюють наші постачальники.',
          'При передачі за межі ЄЕЗ, UK або України ми застосовуємо відповідні гарантії, зокрема Стандартні договірні положення (SCC) Європейської комісії.',
        ],
      },
      {
        id: 'retention',
        title: '9. Зберігання даних',
        paragraphs: [
          'Ми зберігаємо персональні дані лише стільки, скільки потрібно для цілей цієї політики, якщо закон не вимагає довшого терміну.',
          'Записи замовлень зазвичай зберігаються 7 років для податкового обліку. Маркетингові дані — до відкликання згоди або відписки.',
        ],
      },
      {
        id: 'rights',
        title: '10. Ваші права',
        paragraphs: ['Залежно від місця перебування, ви можете мати такі права:'],
        listItems: [
          'Право на доступ до своїх даних.',
          'Право на виправлення неточних даних.',
          'Право на видалення («право бути забутим»).',
          'Право на обмеження обробки.',
          'Право на переносимість даних.',
          'Право на заперечення проти обробки та прямого маркетингу.',
          'Право відкликати згоду в будь-який час.',
          'Право подати скаргу до Уповноваженого ВРУ з прав людини, місцевого наглядового органу ЄС або UK ICO.',
        ],
      },
      {
        id: 'rights-note',
        title: '',
        paragraphs: [
          'Для реалізації прав звертайтесь: ukccatc@gmail.com. Відповімо протягом 30 днів або у строк, передбачений законом (наприклад, один місяць за GDPR).',
        ],
      },
      {
        id: 'children',
        title: '11. Конфіденційність дітей',
        paragraphs: [
          'Наші послуги не призначені для осіб молодше 16 років. Ми свідомо не збираємо дані дітей. Якщо ви вважаєте, що ми отримали такі дані, зв\'яжіться з нами — ми негайно їх видалимо.',
        ],
      },
      {
        id: 'security',
        title: '12. Безпека',
        paragraphs: [
          'Ми застосовуємо технічні та організаційні заходи: шифрування HTTPS, безпечні платежі, контроль доступу, регулярні перевірки.',
          'Жоден спосіб передачі через Інтернет не є абсолютно безпечним, проте ми прагнемо максимально захистити ваші дані.',
        ],
      },
      {
        id: 'changes',
        title: '13. Зміни політики',
        paragraphs: [
          'Ми можемо оновлювати цю Політику. Суттєві зміни публікуємо на цій сторінці з новою датою «Останнє оновлення».',
        ],
      },
      {
        id: 'contact',
        title: '14. Контакти',
        paragraphs: [
          'З питань Політики конфіденційності або реалізації прав:',
          'Himalayan Sound — ukccatc@gmail.com — ЖК «Лондон», вул. Інститутська, Одеса, 65000, Україна',
        ],
      },
    ],
  },
  ru: {
    title: 'Политика конфиденциальности',
    lastUpdated: '2 июля 2026',
    intro:
      'Himalayan Sound («мы», «нас» или «наш») уважает вашу конфиденциальность. Настоящая Политика объясняет, как мы собираем, используем, раскрываем и защищаем персональные данные при посещении himalayan-sound.com, использовании мобильного приложения или покупке товаров. Политика разработана в соответствии с GDPR (ЕС), UK GDPR, Законом Украины «О защите персональных данных» и иными применимыми международными нормами.',
    sections: [
      {
        id: 'controller',
        title: '1. Контролёр данных',
        paragraphs: [
          'Контролёром персональных данных является Himalayan Sound, работающий из Одессы, Украина.',
          'По вопросам конфиденциальности: ukccatc@gmail.com или форма на himalayan-sound.com/contact.',
        ],
      },
      {
        id: 'scope',
        title: '2. Область применения',
        paragraphs: [
          'Политика распространяется на всех посетителей и клиентов по всему миру, включая пользователей в Украине, ЕС, Великобритании и других юрисдикциях.',
          'Если вы находитесь в ЕЭЗ, UK или Украине, у вас есть дополнительные права (раздел 10). Применяются более строгие защиты местного законодательства.',
        ],
      },
      {
        id: 'collect',
        title: '3. Какие данные мы собираем',
        paragraphs: ['Мы можем собирать следующие категории персональных данных:'],
        listItems: [
          'Идентификационные данные: имя, адрес доставки и оплаты.',
          'Контактные данные: email, телефон.',
          'Данные транзакций: детали заказа, статус оплаты (данные карты обрабатывает платёжный провайдер).',
          'Технические данные: IP, браузер, устройство, cookies, данные использования.',
          'Коммуникационные данные: сообщения через формы, поддержку, подписку на рассылку.',
          'Маркетинговые предпочтения: согласие на рекламные письма.',
        ],
      },
      {
        id: 'use',
        title: '4. Как мы используем данные',
        paragraphs: ['Мы используем персональные данные для:'],
        listItems: [
          'Обработки и выполнения заказов, доставки и поддержки.',
          'Коммуникации по заказам, аккаунту и обращениям.',
          'Улучшения сайта, товаров и пользовательского опыта.',
          'Маркетинговых сообщений с вашего согласия.',
          'Соблюдения юридических обязательств, включая налоговый учёт.',
          'Предотвращения мошенничества и защиты безопасности.',
        ],
      },
      {
        id: 'legal-basis',
        title: '5. Правовые основания (GDPR и Украина)',
        paragraphs: [
          'По GDPR обработка осуществляется на основании: исполнения договора, законного интереса, юридической обязанности и согласия.',
          'По украинскому законодательству — с согласия, где требуется, или при необходимости исполнения договора и соблюдения закона.',
        ],
      },
      {
        id: 'cookies',
        title: '6. Cookies и аналогичные технологии',
        paragraphs: [
          'Мы используем необходимые cookies (корзина, сессия, язык). С согласия — аналитические cookies (Google Analytics).',
          'Управление — в настройках браузера. Отключение необходимых cookies может повлиять на работу сайта.',
        ],
      },
      {
        id: 'sharing',
        title: '7. Передача третьим лицам',
        paragraphs: ['Данные передаются только надёжным поставщикам:'],
        listItems: [
          'Платёжные процессоры (Stripe).',
          'Партнёры по доставке.',
          'Облачный хостинг и БД (Supabase, Vercel).',
          'Сервисы email.',
          'Аналитика — с согласия.',
        ],
      },
      {
        id: 'sharing-note',
        title: '',
        paragraphs: [
          'Мы не продаём персональные данные. Поставщики обязаны защищать данные и использовать их только по назначению.',
        ],
      },
      {
        id: 'transfers',
        title: '8. Международная передача',
        paragraphs: [
          'Данные могут обрабатываться в Украине, ЕС, США, Непале (партнёры-поставщики) и других странах.',
          'При передаче за пределы ЕЭЗ, UK или Украины применяются SCC и иные гарантии по применимому праву.',
        ],
      },
      {
        id: 'retention',
        title: '9. Хранение данных',
        paragraphs: [
          'Данные хранятся только столько, сколько необходимо, если закон не требует иного.',
          'Заказы — обычно 7 лет для налогового учёта. Маркетинг — до отзыва согласия.',
        ],
      },
      {
        id: 'rights',
        title: '10. Ваши права',
        paragraphs: ['В зависимости от местоположения вы можете иметь права:'],
        listItems: [
          'Доступ к данным.',
          'Исправление неточных данных.',
          'Удаление («право быть забытым»).',
          'Ограничение обработки.',
          'Переносимость данных.',
          'Возражение против обработки и прямого маркетинга.',
          'Отзыв согласия.',
          'Жалоба в Уполномоченный ВРУ по правам человека, надзорный орган ЕС или UK ICO.',
        ],
      },
      {
        id: 'rights-note',
        title: '',
        paragraphs: [
          'Для реализации прав: ukccatc@gmail.com. Ответ в течение 30 дней или срока по закону.',
        ],
      },
      {
        id: 'children',
        title: '11. Конфиденциальность детей',
        paragraphs: [
          'Услуги не предназначены для лиц младше 16 лет. Мы не собираем данные детей сознательно. При обнаружении — свяжитесь с нами для удаления.',
        ],
      },
      {
        id: 'security',
        title: '12. Безопасность',
        paragraphs: [
          'Применяем HTTPS, безопасные платежи, контроль доступа и регулярные проверки.',
          'Абсолютной безопасности передачи через Интернет не существует, но мы стремимся максимально защитить данные.',
        ],
      },
      {
        id: 'changes',
        title: '13. Изменения политики',
        paragraphs: [
          'Политика может обновляться. Существенные изменения публикуются здесь с новой датой.',
        ],
      },
      {
        id: 'contact',
        title: '14. Контакты',
        paragraphs: [
          'По вопросам Политики и реализации прав:',
          'Himalayan Sound — ukccatc@gmail.com — ЖК «Лондон», ул. Институтская, Одесса, 65000, Украина',
        ],
      },
    ],
  },
};
