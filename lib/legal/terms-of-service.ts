import { LocalizedLegalDocument } from './types';

const LAST_UPDATED = 'July 2, 2026';

export const termsOfService: LocalizedLegalDocument = {
  en: {
    title: 'Terms of Service',
    lastUpdated: LAST_UPDATED,
    intro:
      'These Terms of Service ("Terms") govern your use of the Himalayan Sound website (himalayan-sound.com), mobile application, and purchase of our products. By accessing our services or placing an order, you agree to these Terms. Please read them carefully. If you do not agree, do not use our services.',
    sections: [
      {
        id: 'about',
        title: '1. About Us',
        paragraphs: [
          'Himalayan Sound is an e-commerce business specialising in authentic Himalayan singing bowls and meditation instruments, operated from Kathmandu Valley, Nepal.',
          'We sell to customers worldwide, including Ukraine, the European Union, the United Kingdom, and other jurisdictions.',
        ],
      },
      {
        id: 'eligibility',
        title: '2. Eligibility',
        paragraphs: [
          'You must be at least 18 years old (or the age of majority in your jurisdiction) to place an order. By using our services, you represent that you meet this requirement and have the legal capacity to enter into a binding contract.',
        ],
      },
      {
        id: 'products',
        title: '3. Products and Descriptions',
        paragraphs: [
          'We strive to display accurate product descriptions, images, and prices. Singing bowls and handmade instruments may vary slightly in appearance, tone, and dimensions due to their artisanal nature — this is a characteristic of authentic craftsmanship, not a defect.',
          'We reserve the right to limit quantities, refuse orders, or discontinue products at any time. Prices are listed in USD unless otherwise stated and may change without notice; the price at checkout applies to your order.',
        ],
      },
      {
        id: 'orders',
        title: '4. Orders and Contract Formation',
        paragraphs: [
          'Placing an order constitutes an offer to purchase. A binding contract is formed when we send an order confirmation email. We may cancel orders due to pricing errors, stock unavailability, suspected fraud, or other legitimate reasons, with a full refund.',
          'You are responsible for providing accurate shipping and billing information. Delays or failed deliveries due to incorrect information are your responsibility.',
        ],
      },
      {
        id: 'payment',
        title: '5. Payment',
        paragraphs: [
          'Payment is processed securely through our payment provider (e.g. Stripe). We accept major credit and debit cards and other methods displayed at checkout.',
          'You authorise us to charge the total order amount, including product price, shipping, and applicable taxes or duties. All payments must be completed before dispatch.',
        ],
      },
      {
        id: 'shipping',
        title: '6. Shipping and Delivery',
        paragraphs: [
          'We ship internationally from Nepal. Delivery times are estimates and vary by destination, customs processing, and carrier. Free shipping may apply to orders over the threshold stated on our website.',
          'Import duties, VAT, and customs fees for international shipments are the responsibility of the recipient unless otherwise stated. For deliveries to Ukraine and the EU, applicable consumer protection laws regarding delivery times may apply.',
          'Risk of loss passes to you upon delivery to the carrier. Please inspect packages upon receipt and report damage within 48 hours.',
        ],
      },
      {
        id: 'returns',
        title: '7. Returns and Refunds',
        paragraphs: [
          'We offer a 30-day satisfaction guarantee. If you are not satisfied with your purchase, you may return unused items in original condition within 30 days of delivery for a full refund of the product price.',
          'Return shipping costs are borne by the customer unless the item is defective or we shipped the wrong product. To initiate a return, contact info@himalayan-sound.com with your order number.',
          'Refunds are processed to the original payment method within 14 business days of receiving the returned item. This policy does not affect your statutory rights under Ukrainian consumer law, EU Consumer Rights Directive, or other applicable legislation.',
        ],
      },
      {
        id: 'ip',
        title: '8. Intellectual Property',
        paragraphs: [
          'All content on our website — including text, images, logos, audio samples, and design — is owned by Himalayan Sound or our licensors and protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our written permission.',
        ],
      },
      {
        id: 'conduct',
        title: '9. Acceptable Use',
        paragraphs: ['You agree not to:'],
        listItems: [
          'Use our services for unlawful purposes or in violation of applicable laws.',
          'Attempt to gain unauthorised access to our systems or other users\' accounts.',
          'Submit false or misleading information.',
          'Interfere with the proper functioning of the website or mobile app.',
          'Use automated systems to scrape content or place fraudulent orders.',
        ],
      },
      {
        id: 'warranties',
        title: '10. Disclaimer of Warranties',
        paragraphs: [
          'Our products and services are provided "as is" to the fullest extent permitted by law. We disclaim all warranties, express or implied, except those that cannot be excluded under Ukrainian law, EU consumer law, or other mandatory consumer protection legislation.',
          'Nothing in these Terms limits your statutory rights as a consumer in Ukraine, the EU, UK, or other jurisdictions where such rights cannot be waived.',
        ],
      },
      {
        id: 'liability',
        title: '11. Limitation of Liability',
        paragraphs: [
          'To the maximum extent permitted by law, Himalayan Sound shall not be liable for indirect, incidental, special, or consequential damages arising from your use of our services or products.',
          'Our total liability for any claim shall not exceed the amount you paid for the relevant order. This limitation does not apply to liability for death or personal injury caused by negligence, fraud, or any liability that cannot be excluded by applicable law.',
        ],
      },
      {
        id: 'indemnity',
        title: '12. Indemnification',
        paragraphs: [
          'You agree to indemnify and hold harmless Himalayan Sound from claims arising from your breach of these Terms, misuse of our services, or violation of third-party rights, except where prohibited by law.',
        ],
      },
      {
        id: 'law',
        title: '13. Governing Law and Disputes',
        paragraphs: [
          'For customers in Ukraine: these Terms are governed by the laws of Ukraine. Disputes shall first be resolved through good-faith negotiation. If unresolved within 30 days, disputes may be submitted to the competent courts of Ukraine or, at your choice as a consumer, to the courts of your place of residence.',
          'For customers in the EU/EEA: mandatory consumer protection laws of your country of residence apply. You may use the EU Online Dispute Resolution platform (ec.europa.eu/odr).',
          'For other customers: these Terms are governed by the laws of Nepal, without regard to conflict-of-law principles, subject to mandatory consumer protections in your jurisdiction.',
        ],
      },
      {
        id: 'changes',
        title: '14. Changes to Terms',
        paragraphs: [
          'We may update these Terms at any time. Material changes will be posted on this page with an updated date. Continued use of our services after changes constitutes acceptance. Orders placed before changes are governed by the Terms in effect at the time of purchase.',
        ],
      },
      {
        id: 'contact',
        title: '15. Contact',
        paragraphs: [
          'For questions about these Terms, contact:',
          'Himalayan Sound — info@himalayan-sound.com — Kathmandu Valley, Nepal',
        ],
      },
    ],
  },
  uk: {
    title: 'Умови використання',
    lastUpdated: '2 липня 2026',
    intro:
      'Ці Умови використання («Умови») регулюють користування сайтом Himalayan Sound (himalayan-sound.com), мобільним додатком та покупку наших товарів. Отримуючи доступ до сервісів або оформлюючи замовлення, ви погоджуєтесь з цими Умовами. Якщо ви не згодні — не користуйтесь нашими сервісами.',
    sections: [
      {
        id: 'about',
        title: '1. Про нас',
        paragraphs: [
          'Himalayan Sound — інтернет-магазин автентичних гімалайських співаючих чаш та медитативних інструментів, що працює з долини Катманду, Непал.',
          'Ми продаємо клієнтам у всьому світі, включно з Україною, ЄС, Великобританією та іншими країнами.',
        ],
      },
      {
        id: 'eligibility',
        title: '2. Право на користування',
        paragraphs: [
          'Оформлювати замовлення можуть лише особи від 18 років (або досягли повноліття за законодавством вашої країни). Ви підтверджуєте, що маєте правоздатність укладати договір.',
        ],
      },
      {
        id: 'products',
        title: '3. Товари та описи',
        paragraphs: [
          'Ми прагнемо надавати точні описи, зображення та ціни. Ручна робота може трохи відрізнятися за зовнішнім виглядом, тоном і розмірами — це особливість автентичного виробництва, а не дефект.',
          'Ми можемо обмежувати кількість, відмовляти в замовленнях або знімати товари з продажу. Ціни в USD, якщо не вказано інше; на момент оформлення замовлення діє ціна в кошику.',
        ],
      },
      {
        id: 'orders',
        title: '4. Замовлення та договір',
        paragraphs: [
          'Оформлення замовлення є пропозицією купівлі. Договір укладається після підтвердження замовлення електронною поштою. Ми можемо скасувати замовлення через помилку в ціні, відсутність товару, підозру на шахрайство — з повним поверненням коштів.',
          'Ви відповідаєте за точність адреси доставки та оплати.',
        ],
      },
      {
        id: 'payment',
        title: '5. Оплата',
        paragraphs: [
          'Оплата здійснюється через безпечного платіжного провайдера (наприклад, Stripe). Приймаємо основні картки та інші способи на сторінці оформлення.',
          'Ви дозволяєте списання повної суми замовлення. Відправка після завершення оплати.',
        ],
      },
      {
        id: 'shipping',
        title: '6. Доставка',
        paragraphs: [
          'Міжнародна доставка з Непалу. Терміни є орієнтовними. Безкоштовна доставка може застосовуватись від порогу, зазначеного на сайті.',
          'Мито, ПДВ та митні збори — на одержувача, якщо не вказано інше. Для України та ЄС застосовуються відповідні норми захисту споживачів щодо термінів доставки.',
          'Ризик втрати переходить при передачі перевізнику. Повідомте про пошкодження протягом 48 годин.',
        ],
      },
      {
        id: 'returns',
        title: '7. Повернення та відшкодування',
        paragraphs: [
          '30-денна гарантія задоволення. Невикористаний товар у оригінальному стані можна повернути протягом 30 днів для повного повернення вартості товару.',
          'Витрати на зворотну доставку несе покупець, якщо товар не бракований. Звертайтесь: info@himalayan-sound.com з номером замовлення.',
          'Повернення коштів протягом 14 робочих днів після отримання товару. Це не обмежує ваші законні права споживача в Україні, ЄС та інших юрисдикціях.',
        ],
      },
      {
        id: 'ip',
        title: '8. Інтелектуальна власність',
        paragraphs: [
          'Весь контент сайту — текст, зображення, логотипи, аудіо, дизайн — належить Himalayan Sound або ліцензіарам і захищений авторським правом. Заборонено копіювати без письмової згоди.',
        ],
      },
      {
        id: 'conduct',
        title: '9. Допустиме використання',
        paragraphs: ['Ви погоджуєтесь не:'],
        listItems: [
          'Використовувати сервіси незаконно.',
          'Отримувати несанкціонований доступ до систем.',
          'Надавати неправдиву інформацію.',
          'Порушувати роботу сайту або додатку.',
          'Використовувати автоматизовані системи для шахрайських замовлень.',
        ],
      },
      {
        id: 'warranties',
        title: '10. Відмова від гарантій',
        paragraphs: [
          'Товари та сервіси надаються «як є» в межах, дозволених законом. Не обмежуємо обов\'язкові права споживачів України, ЄС та інших країн.',
        ],
      },
      {
        id: 'liability',
        title: '11. Обмеження відповідальності',
        paragraphs: [
          'У межах, дозволених законом, Himalayan Sound не відповідає за непрямі збитки. Загальна відповідальність не перевищує суму відповідного замовлення.',
          'Не застосовується до відповідальності за смерть, травми через недбалість, шахрайство та інші випадки, що не можуть бути виключені законом.',
        ],
      },
      {
        id: 'indemnity',
        title: '12. Відшкодування збитків',
        paragraphs: [
          'Ви зобов\'язуєтесь відшкодувати збитки Himalayan Sound у разі порушення цих Умов, якщо це не заборонено законом.',
        ],
      },
      {
        id: 'law',
        title: '13. Застосовне право та спори',
        paragraphs: [
          'Для клієнтів в Україні: застосовується право України. Спочатку — переговори; якщо не вирішено за 30 днів — суди України або за вашим вибором як споживача — суди за місцем проживання.',
          'Для клієнтів ЄС/ЄЕЗ: застосовуються обов\'язкові норми захисту споживачів вашої країни. Платформа ODR: ec.europa.eu/odr.',
          'Для інших клієнтів: право Непалу з урахуванням обов\'язкового захисту споживачів у вашій юрисдикції.',
        ],
      },
      {
        id: 'changes',
        title: '14. Зміни Умов',
        paragraphs: [
          'Умови можуть оновлюватись. Суттєві зміни публікуються на цій сторінці. Замовлення до змін регулюються Умовами на момент покупки.',
        ],
      },
      {
        id: 'contact',
        title: '15. Контакти',
        paragraphs: [
          'З питань Умов:',
          'Himalayan Sound — info@himalayan-sound.com — долина Катманду, Непал',
        ],
      },
    ],
  },
  ru: {
    title: 'Условия использования',
    lastUpdated: '2 июля 2026',
    intro:
      'Настоящие Условия использования («Условия») регулируют использование сайта Himalayan Sound (himalayan-sound.com), мобильного приложения и покупку товаров. Получая доступ к сервисам или оформляя заказ, вы соглашаетесь с Условиями. Если вы не согласны — не используйте наши сервисы.',
    sections: [
      {
        id: 'about',
        title: '1. О нас',
        paragraphs: [
          'Himalayan Sound — интернет-магазин аутентичных гималайских поющих чаш и медитативных инструментов из долины Катманду, Непал.',
          'Мы продаём клиентам по всему миру, включая Украину, ЕС, Великобританию и другие страны.',
        ],
      },
      {
        id: 'eligibility',
        title: '2. Право на использование',
        paragraphs: [
          'Заказы могут оформлять лица от 18 лет (или достигшие совершеннолетия по законодательству вашей страны). Вы подтверждаете правоспособность заключать договор.',
        ],
      },
      {
        id: 'products',
        title: '3. Товары и описания',
        paragraphs: [
          'Мы стремимся предоставлять точные описания и цены. Ручная работа может незначительно отличаться — это особенность аутентичного производства.',
          'Мы можем ограничивать количество или снимать товары с продажи. Цены в USD; при оформлении действует цена в корзине.',
        ],
      },
      {
        id: 'orders',
        title: '4. Заказы и договор',
        paragraphs: [
          'Оформление заказа — оферта. Договор заключается после подтверждения по email. Отмена возможна при ошибке цены, отсутствии товара, мошенничестве — с полным возвратом.',
          'Вы отвечаете за точность адреса доставки и оплаты.',
        ],
      },
      {
        id: 'payment',
        title: '5. Оплата',
        paragraphs: [
          'Оплата через безопасного провайдера (Stripe). Принимаем основные карты и другие способы на странице оформления.',
          'Вы разрешаете списание полной суммы. Отправка после оплаты.',
        ],
      },
      {
        id: 'shipping',
        title: '6. Доставка',
        paragraphs: [
          'Международная доставка из Непала. Сроки ориентировочные. Бесплатная доставка от порога на сайте.',
          'Пошлины и НДС — на получателя. Для Украины и ЕС применяются нормы защиты потребителей.',
          'Риск переходит при передаче перевозчику. Сообщите о повреждении в течение 48 часов.',
        ],
      },
      {
        id: 'returns',
        title: '7. Возврат и возмещение',
        paragraphs: [
          '30-дневная гарантия удовлетворения. Неиспользованный товар в оригинальном состоянии можно вернуть в течение 30 дней.',
          'Расходы на обратную доставку несёт покупатель, если товар не бракованный. info@himalayan-sound.com с номером заказа.',
          'Возврат средств в течение 14 рабочих дней. Не ограничивает законные права потребителя в Украине, ЕС и др.',
        ],
      },
      {
        id: 'ip',
        title: '8. Интеллектуальная собственность',
        paragraphs: [
          'Весь контент сайта принадлежит Himalayan Sound или лицензиарам. Копирование без письменного согласия запрещено.',
        ],
      },
      {
        id: 'conduct',
        title: '9. Допустимое использование',
        paragraphs: ['Вы соглашаетесь не:'],
        listItems: [
          'Использовать сервисы незаконно.',
          'Получать несанкционированный доступ.',
          'Предоставлять ложную информацию.',
          'Нарушать работу сайта.',
          'Использовать автоматизацию для мошеннических заказов.',
        ],
      },
      {
        id: 'warranties',
        title: '10. Отказ от гарантий',
        paragraphs: [
          'Товары и сервисы предоставляются «как есть» в пределах закона. Обязательные права потребителей не ограничиваются.',
        ],
      },
      {
        id: 'liability',
        title: '11. Ограничение ответственности',
        paragraphs: [
          'В пределах закона Himalayan Sound не отвечает за косвенные убытки. Ответственность не превышает сумму заказа.',
          'Не применяется к ответственности, которую нельзя исключить по закону.',
        ],
      },
      {
        id: 'indemnity',
        title: '12. Возмещение убытков',
        paragraphs: [
          'Вы обязуетесь возместить убытки при нарушении Условий, если это не запрещено законом.',
        ],
      },
      {
        id: 'law',
        title: '13. Применимое право и споры',
        paragraphs: [
          'Для клиентов в Украине: право Украины. Сначала переговоры; затем суды Украины или по выбору потребителя — по месту жительства.',
          'Для клиентов ЕС/ЕЭЗ: обязательные нормы защиты потребителей вашей страны. ODR: ec.europa.eu/odr.',
          'Для остальных: право Непала с учётом обязательной защиты потребителей.',
        ],
      },
      {
        id: 'changes',
        title: '14. Изменения Условий',
        paragraphs: [
          'Условия могут обновляться. Заказы до изменений регулируются Условиями на момент покупки.',
        ],
      },
      {
        id: 'contact',
        title: '15. Контакты',
        paragraphs: [
          'По вопросам Условий:',
          'Himalayan Sound — info@himalayan-sound.com — долина Катманду, Непал',
        ],
      },
    ],
  },
};
