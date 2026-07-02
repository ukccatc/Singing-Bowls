import { LocalizedLegalDocument } from './types';

const LAST_UPDATED = 'July 2, 2026';

export const returnPolicy: LocalizedLegalDocument = {
  en: {
    title: 'Returns & Refunds',
    lastUpdated: LAST_UPDATED,
    intro:
      'This Return & Refund Policy explains how you can return a product purchased from Himalayan Sound and receive a refund or exchange. For customers in Ukraine, this policy is designed to comply with the Law of Ukraine "On the Protection of Consumer Rights". For customers in the EU and UK, it complies with the applicable consumer distance-selling directives, including the 14-day right of withdrawal.',
    sections: [
      {
        id: 'right',
        title: '1. Your Right to Return',
        paragraphs: [
          'You have the right to return most products within 14 calendar days from the date of delivery, without giving any reason. This is your statutory "right of withdrawal" under EU / UK consumer law and Article 9 of the Law of Ukraine "On the Protection of Consumer Rights".',
          'For customers in Ukraine you additionally have the right, under the same law, to exchange a non-food product of proper quality within 14 days if it did not fit in shape, dimensions, style, colour, size, or for any other reason cannot be used as intended — provided the product has not been used and its presentation, consumer properties, seals and factory labels are preserved.',
        ],
      },
      {
        id: 'conditions',
        title: '2. Return Conditions',
        paragraphs: [
          'To be eligible for a return, the item must meet all of the following conditions:',
        ],
        listItems: [
          'The return is requested within 14 calendar days of delivery.',
          'The product is unused and in the same condition as received.',
          'The product retains its original presentation, consumer properties, seals, factory labels, and packaging.',
          'You provide the order number or the sales receipt.',
        ],
      },
      {
        id: 'non-returnable',
        title: '3. Items That Cannot Be Returned',
        paragraphs: [
          'The following categories cannot be returned for hygiene, custom-made, or legal reasons:',
        ],
        listItems: [
          'Custom-engraved or personalised singing bowls and gongs made specifically for you.',
          'Downloadable digital products (e-books, audio guides) once the download has started.',
          'Gift cards.',
          'Items marked "Final Sale" on the product page.',
        ],
      },
      {
        id: 'how-to',
        title: '4. How to Initiate a Return',
        paragraphs: ['To start a return, please follow these steps:'],
        listItems: [
          'Email us at info@himalayan-sound.com with your order number, the item you wish to return, and the reason (optional).',
          'We will reply within 2 business days with a Return Merchandise Authorisation (RMA) number and the return address.',
          'Pack the item securely in its original packaging with all accessories and enclose a copy of the receipt and the RMA number.',
          'Ship the parcel to the address we provide. For Ukraine we typically accept returns to a Nova Poshta branch address.',
          'Send us the tracking number so we can monitor the return.',
        ],
      },
      {
        id: 'costs',
        title: '5. Return Shipping Costs',
        paragraphs: [
          'If the return is due to our error — wrong, damaged, or defective item — we cover the return shipping cost in full.',
          'If the return is due to a change of mind or the statutory 14-day right of withdrawal, the customer is responsible for the return shipping cost, as permitted by EU / UK / Ukrainian consumer law.',
          'For Ukrainian customers returning via Nova Poshta, we recommend using "Наложений платіж (післяплата)" only when explicitly agreed in writing, otherwise the parcel will be refused.',
        ],
      },
      {
        id: 'refund',
        title: '6. Refunds',
        paragraphs: [
          'Once we receive and inspect the returned item, we will notify you by email. If the return is approved, we will refund the purchase price of the product to your original payment method.',
          'Refund timeframes:',
        ],
        listItems: [
          'Card refunds: 5–10 business days after approval (depends on your bank).',
          'Bank transfers to Ukrainian accounts: up to 7 business days.',
          'PayPal / Wise: within 3 business days.',
          'The original shipping cost is refunded only when the return is due to our error or when the entire order is cancelled within the statutory 14-day withdrawal period.',
        ],
      },
      {
        id: 'exchange',
        title: '7. Exchanges',
        paragraphs: [
          'The fastest way to get a different item is to return the original one for a refund and place a new order for the desired product.',
          'For Ukrainian customers wishing to exchange within the statutory 14-day period, we can also arrange a direct exchange — contact us to confirm availability of the replacement item and the exchange logistics.',
        ],
      },
      {
        id: 'damaged',
        title: '8. Damaged or Defective Items on Arrival',
        paragraphs: [
          'If your item arrives damaged, defective, or does not match the order, contact us within 48 hours of delivery with photos of the item and the outer packaging.',
          'For Ukrainian shipments we strongly recommend inspecting the parcel at the Nova Poshta or Ukrposhta branch before signing the acceptance form. If damage is visible, ask the branch staff to issue a damage report ("акт про пошкодження"). This significantly accelerates the claim.',
          'We will arrange a free replacement, repair, or full refund — at your choice — in accordance with your statutory rights.',
        ],
      },
      {
        id: 'warranty',
        title: '9. Warranty for Manufacturing Defects',
        paragraphs: [
          'All singing bowls, tingsha, and gongs are covered by a 12-month manufacturing-defect warranty from the date of delivery. This warranty is in addition to any statutory rights you have under Ukrainian, EU, or UK consumer law and does not affect them.',
          'The warranty does not cover damage caused by improper use, accidental drops, exposure to moisture, or normal wear of the outer patina.',
        ],
      },
      {
        id: 'contact',
        title: '10. Contact Us',
        paragraphs: [
          'For any return, refund, or warranty question:',
          'Himalayan Sound — info@himalayan-sound.com — Kathmandu Valley, Nepal',
        ],
      },
    ],
  },
  uk: {
    title: 'Повернення та відшкодування',
    lastUpdated: '2 липня 2026',
    intro:
      'Ця Політика повернення та відшкодування пояснює, як повернути товар, придбаний у Himalayan Sound, та отримати відшкодування або обмін. Для клієнтів в Україні політика розроблена відповідно до Закону України «Про захист прав споживачів». Для клієнтів у ЄС та Великій Британії — відповідно до директив щодо дистанційного продажу, включно з правом на відмову протягом 14 днів.',
    sections: [
      {
        id: 'right',
        title: '1. Ваше право на повернення',
        paragraphs: [
          'Ви маєте право повернути більшість товарів протягом 14 календарних днів з дня отримання, без пояснення причин. Це передбачено законодавством ЄС/UK та статтею 9 Закону України «Про захист прав споживачів».',
          'Клієнти в Україні додатково мають право обміняти непродовольчий товар належної якості протягом 14 днів, якщо він не підійшов за формою, габаритами, фасоном, кольором, розміром або з інших причин не може бути використаний за призначенням — за умови, що товар не використовувався, а його товарний вигляд, споживчі властивості, пломби та фабричні ярлики збережено.',
        ],
      },
      {
        id: 'conditions',
        title: '2. Умови повернення',
        paragraphs: ['Товар підлягає поверненню, якщо виконані всі наведені умови:'],
        listItems: [
          'Повернення оформлене протягом 14 календарних днів з моменту отримання.',
          'Товар не використовувався та перебуває у тому ж стані, в якому був отриманий.',
          'Збережено товарний вигляд, споживчі властивості, пломби, фабричні ярлики та упаковку.',
          'Ви надаєте номер замовлення або товарний чек.',
        ],
      },
      {
        id: 'non-returnable',
        title: '3. Товари, які не підлягають поверненню',
        paragraphs: [
          'З гігієнічних, індивідуальних або юридичних причин не підлягають поверненню:',
        ],
        listItems: [
          'Співаючі чаші та гонги з індивідуальним гравіюванням або персоналізацією, виготовлені на замовлення.',
          'Цифрові товари (електронні книги, аудіогіди), завантаження яких вже розпочато.',
          'Подарункові сертифікати.',
          'Товари з позначкою «Фінальний розпродаж» на сторінці товару.',
        ],
      },
      {
        id: 'how-to',
        title: '4. Як оформити повернення',
        paragraphs: ['Щоб оформити повернення:'],
        listItems: [
          'Напишіть на info@himalayan-sound.com з номером замовлення, вкажіть товар для повернення та причину (за бажанням).',
          'Ми відповімо протягом 2 робочих днів, надамо номер RMA (авторизацію повернення) та адресу відправлення.',
          'Надійно запакуйте товар в оригінальну упаковку з усіма аксесуарами, додайте копію чека та номер RMA.',
          'Надішліть посилку на вказану адресу. Для України ми зазвичай приймаємо повернення у відділення Нової Пошти.',
          'Надішліть нам номер ТТН, щоб ми могли відстежувати повернення.',
        ],
      },
      {
        id: 'costs',
        title: '5. Вартість зворотного пересилання',
        paragraphs: [
          'Якщо повернення пов\'язане з нашою помилкою — надіслано не той товар, пошкоджений або з дефектом — ми повністю оплачуємо зворотне пересилання.',
          'Якщо повернення оформлене за бажанням клієнта у межах права 14 днів, вартість зворотного пересилання оплачує клієнт (відповідно до законодавства ЄС/UK/України).',
          'Клієнтам в Україні: не надсилайте посилки «Новою Поштою» з післяплатою без письмового погодження — таку посилку не буде отримано.',
        ],
      },
      {
        id: 'refund',
        title: '6. Відшкодування',
        paragraphs: [
          'Після отримання та перевірки товару ми повідомимо вас електронною поштою. У разі затвердження ми повернемо вартість товару тим самим способом, яким була здійснена оплата.',
          'Терміни повернення коштів:',
        ],
        listItems: [
          'Повернення на банківську картку: 5–10 робочих днів після затвердження (залежить від банку).',
          'Банківський переказ на рахунок в Україні: до 7 робочих днів.',
          'PayPal / Wise: до 3 робочих днів.',
          'Вартість первинної доставки повертається лише у разі нашої помилки або повного скасування замовлення протягом 14 днів.',
        ],
      },
      {
        id: 'exchange',
        title: '7. Обмін',
        paragraphs: [
          'Найшвидший спосіб отримати інший товар — оформити повернення і зробити нове замовлення на потрібний товар.',
          'Клієнтам в Україні у межах 14 днів ми також можемо організувати прямий обмін — напишіть нам, щоб узгодити наявність та логістику.',
        ],
      },
      {
        id: 'damaged',
        title: '8. Пошкоджений або дефектний товар при отриманні',
        paragraphs: [
          'Якщо товар прибув пошкодженим, дефектним або не відповідає замовленню, зв\'яжіться з нами протягом 48 годин після отримання, надіславши фото товару та зовнішньої упаковки.',
          'Для відправлень по Україні наполегливо рекомендуємо перевірити посилку у відділенні Нової Пошти або Укрпошти до підпису у документі про отримання. При виявленні пошкоджень попросіть співробітника оформити «акт про пошкодження» — це значно пришвидшить розгляд претензії.',
          'Ми організуємо безкоштовну заміну, ремонт або повне відшкодування — на ваш вибір, відповідно до ваших законних прав.',
        ],
      },
      {
        id: 'warranty',
        title: '9. Гарантія на виробничі дефекти',
        paragraphs: [
          'На всі співаючі чаші, тінгши та гонги діє гарантія 12 місяців на виробничі дефекти з дати доставки. Ця гарантія є додатковою до ваших законних прав за законодавством України, ЄС або Великої Британії та не обмежує їх.',
          'Гарантія не поширюється на пошкодження внаслідок неправильного використання, випадкових падінь, впливу вологи або природного зношування зовнішнього шару.',
        ],
      },
      {
        id: 'contact',
        title: '10. Контакти',
        paragraphs: [
          'З питань повернення, відшкодування або гарантії:',
          'Himalayan Sound — info@himalayan-sound.com — долина Катманду, Непал',
        ],
      },
    ],
  },
  ru: {
    title: 'Возврат и возмещение',
    lastUpdated: '2 июля 2026',
    intro:
      'Настоящая Политика возврата и возмещения объясняет, как вернуть товар, приобретённый в Himalayan Sound, и получить возмещение или обмен. Для клиентов в Украине политика разработана в соответствии с Законом Украины «О защите прав потребителей». Для клиентов в ЕС и Великобритании — в соответствии с директивами о дистанционной торговле, включая право отказа в течение 14 дней.',
    sections: [
      {
        id: 'right',
        title: '1. Ваше право на возврат',
        paragraphs: [
          'Вы имеете право вернуть большинство товаров в течение 14 календарных дней с момента получения, без объяснения причин. Это гарантировано законодательством ЕС/UK и статьёй 9 Закона Украины «О защите прав потребителей».',
          'Клиенты в Украине дополнительно имеют право обменять непродовольственный товар надлежащего качества в течение 14 дней, если он не подошёл по форме, габаритам, фасону, цвету, размеру или по иным причинам не может использоваться по назначению — при условии, что товар не использовался, а его товарный вид, потребительские свойства, пломбы и фабричные ярлыки сохранены.',
        ],
      },
      {
        id: 'conditions',
        title: '2. Условия возврата',
        paragraphs: ['Товар подлежит возврату при выполнении всех условий:'],
        listItems: [
          'Возврат оформлен в течение 14 календарных дней с момента получения.',
          'Товар не использовался и находится в том же состоянии, в котором был получен.',
          'Сохранены товарный вид, потребительские свойства, пломбы, фабричные ярлыки и упаковка.',
          'Вы предоставляете номер заказа или товарный чек.',
        ],
      },
      {
        id: 'non-returnable',
        title: '3. Товары, не подлежащие возврату',
        paragraphs: [
          'По гигиеническим, индивидуальным или юридическим причинам не подлежат возврату:',
        ],
        listItems: [
          'Поющие чаши и гонги с индивидуальной гравировкой или персонализацией, изготовленные на заказ.',
          'Цифровые товары (электронные книги, аудиогиды), загрузка которых уже начата.',
          'Подарочные сертификаты.',
          'Товары с пометкой «Финальная распродажа» на странице товара.',
        ],
      },
      {
        id: 'how-to',
        title: '4. Как оформить возврат',
        paragraphs: ['Чтобы оформить возврат:'],
        listItems: [
          'Напишите на info@himalayan-sound.com с номером заказа, укажите товар для возврата и причину (по желанию).',
          'Мы ответим в течение 2 рабочих дней, предоставим номер RMA (авторизацию возврата) и адрес отправки.',
          'Надёжно упакуйте товар в оригинальную упаковку со всеми аксессуарами, приложите копию чека и номер RMA.',
          'Отправьте посылку на указанный адрес. Для Украины мы обычно принимаем возвраты в отделение Новой Почты.',
          'Пришлите нам номер ТТН, чтобы мы могли отслеживать возврат.',
        ],
      },
      {
        id: 'costs',
        title: '5. Стоимость обратной пересылки',
        paragraphs: [
          'Если возврат связан с нашей ошибкой — прислан не тот товар, повреждённый или с дефектом — мы полностью оплачиваем обратную пересылку.',
          'Если возврат оформлен по желанию клиента в рамках 14-дневного права отказа, стоимость обратной пересылки оплачивает клиент (в соответствии с законодательством ЕС/UK/Украины).',
          'Клиентам в Украине: не отправляйте посылки «Новой Почтой» с наложенным платежом без письменного согласования — такая посылка не будет получена.',
        ],
      },
      {
        id: 'refund',
        title: '6. Возмещение',
        paragraphs: [
          'После получения и проверки товара мы уведомим вас по электронной почте. При одобрении возврата мы вернём стоимость товара тем же способом, которым была произведена оплата.',
          'Сроки возврата средств:',
        ],
        listItems: [
          'Возврат на банковскую карту: 5–10 рабочих дней после одобрения (зависит от банка).',
          'Банковский перевод на счёт в Украине: до 7 рабочих дней.',
          'PayPal / Wise: до 3 рабочих дней.',
          'Стоимость первоначальной доставки возвращается только при нашей ошибке или полной отмене заказа в течение 14 дней.',
        ],
      },
      {
        id: 'exchange',
        title: '7. Обмен',
        paragraphs: [
          'Самый быстрый способ получить другой товар — оформить возврат и сделать новый заказ на нужный товар.',
          'Клиентам в Украине в рамках 14 дней мы также можем организовать прямой обмен — напишите нам, чтобы согласовать наличие и логистику.',
        ],
      },
      {
        id: 'damaged',
        title: '8. Повреждённый или дефектный товар при получении',
        paragraphs: [
          'Если товар прибыл повреждённым, дефектным или не соответствует заказу, свяжитесь с нами в течение 48 часов после получения, приложив фото товара и внешней упаковки.',
          'Для отправлений по Украине настоятельно рекомендуем проверять посылку в отделении Новой Почты или Укрпочты до подписания документа о получении. При обнаружении повреждений попросите сотрудника оформить «акт о повреждении» — это значительно ускорит рассмотрение претензии.',
          'Мы организуем бесплатную замену, ремонт или полное возмещение — по вашему выбору, в соответствии с вашими законными правами.',
        ],
      },
      {
        id: 'warranty',
        title: '9. Гарантия на производственные дефекты',
        paragraphs: [
          'На все поющие чаши, тингши и гонги действует гарантия 12 месяцев на производственные дефекты с даты доставки. Эта гарантия является дополнительной к вашим законным правам по законодательству Украины, ЕС или Великобритании и не ограничивает их.',
          'Гарантия не распространяется на повреждения из-за неправильного использования, случайных падений, воздействия влаги или естественного износа внешнего слоя.',
        ],
      },
      {
        id: 'contact',
        title: '10. Контакты',
        paragraphs: [
          'По вопросам возврата, возмещения или гарантии:',
          'Himalayan Sound — info@himalayan-sound.com — долина Катманду, Непал',
        ],
      },
    ],
  },
};
