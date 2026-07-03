import { LocalizedLegalDocument } from './types';

const LAST_UPDATED = 'July 2, 2026';

export const shippingPolicy: LocalizedLegalDocument = {
  en: {
    title: 'Shipping & Delivery',
    lastUpdated: LAST_UPDATED,
    intro:
      'This Shipping Policy explains how Himalayan Sound processes, packages, and delivers your order worldwide, with dedicated options for customers in Ukraine via Nova Poshta and Ukrposhta. We are based in RC London, Instytutska St., Odesa, 65000, Ukraine. Our singing bowls are hand-selected from artisan workshops in Nepal and shipped from our Odessa warehouse for Ukrainian orders, or via partner fulfilment centres for other destinations.',
    sections: [
      {
        id: 'processing',
        title: '1. Order Processing',
        paragraphs: [
          'Orders placed before 14:00 (Kyiv time, UTC+2/+3) on a business day are processed the same day. Orders placed later, on weekends, or on public holidays are processed on the next business day.',
          'You will receive an order confirmation email immediately after checkout, and a separate shipping confirmation with a tracking number once your parcel leaves our warehouse.',
        ],
      },
      {
        id: 'destinations',
        title: '2. Destinations We Ship To',
        paragraphs: [
          'We ship worldwide. Ukraine, the European Union, the United Kingdom, Switzerland, Norway, the United States, Canada, and most other countries are supported.',
          'If your country is not available at checkout, please contact us at himalayansound.info@gmail.com and we will arrange a custom quote.',
        ],
      },
      {
        id: 'ukraine',
        title: '3. Delivery in Ukraine',
        paragraphs: [
          'For Ukrainian customers we use the two most trusted national carriers:',
        ],
        listItems: [
          'Nova Poshta — delivery to a branch (відділення), parcel locker (поштомат), or courier to your address. Typical last-mile time: 1–2 business days within Ukraine after the parcel arrives.',
          'Ukrposhta — economy option for delivery to a branch in smaller towns and rural areas not covered by Nova Poshta. Typical last-mile time: 2–5 business days.',
          'Domestic dispatch from our Odessa warehouse via Nova Poshta or Ukrposhta: typically 1–5 business days within Ukraine.',
          'International orders (from Nepal or our EU fulfilment hub): 5–14 business days depending on route and customs.',
        ],
      },
      {
        id: 'ukraine-customs',
        title: '4. Customs, VAT and Import Duties (Ukraine)',
        paragraphs: [
          'Parcels sent to individuals in Ukraine are subject to Ukrainian customs rules. As of the date of this policy, personal international parcels with a declared value up to EUR 150 are generally exempt from import VAT and customs duty. Parcels above this threshold are subject to 20% VAT and, where applicable, 10% customs duty on the amount exceeding EUR 150.',
          'When required, we prepare the commercial invoice and CN22/CN23 customs declaration and provide it to the carrier. If additional documents are requested by Ukrainian customs, we will contact you by email.',
          'The recipient is the importer of record and is responsible for any import taxes, duties, and brokerage fees charged by Ukrposhta, Nova Poshta International, or customs. These fees are not included in the product price or shipping cost shown at checkout.',
        ],
      },
      {
        id: 'international',
        title: '5. International Delivery (EU, UK, Rest of World)',
        paragraphs: [
          'For the European Union and the United Kingdom, we typically ship via DHL Express, UPS, or a comparable tracked service.',
          'Estimated transit times after dispatch:',
        ],
        listItems: [
          'European Union: 3–7 business days.',
          'United Kingdom: 4–8 business days.',
          'United States and Canada: 5–10 business days.',
          'Rest of the world: 7–21 business days.',
        ],
      },
      {
        id: 'costs',
        title: '6. Shipping Costs',
        paragraphs: [
          'Shipping cost is calculated at checkout based on the destination, weight, and dimensions of the parcel. The exact amount is shown before payment.',
          'From time to time we run free-shipping promotions for orders above a certain amount — the current threshold is displayed on the shop and product pages.',
        ],
      },
      {
        id: 'packaging',
        title: '7. Packaging of Fragile Items',
        paragraphs: [
          'Singing bowls, tingsha, and gongs are fragile hand-made items. Every order is packed in double-walled cardboard, wrapped in bubble wrap and shock-absorbing foam, and marked as fragile.',
          'If your parcel arrives visibly damaged, please refuse delivery or open it in front of the courier and request a damage report. Then contact us within 48 hours with photos so we can start the claim and replacement process.',
        ],
      },
      {
        id: 'tracking',
        title: '8. Order Tracking',
        paragraphs: [
          'Once shipped, you will receive an email with a tracking number and a link. For Ukrainian orders you can also track your parcel directly on novaposhta.ua or ukrposhta.ua using the same number (Track & Trace / TTH).',
          'If the tracking has not updated for more than 5 business days, please contact us and we will investigate with the carrier.',
        ],
      },
      {
        id: 'delayed',
        title: '9. Delayed, Lost, or Undelivered Parcels',
        paragraphs: [
          'Occasional delays may occur due to customs clearance, weather, strikes, or force majeure. If your parcel is significantly delayed, contact himalayansound.info@gmail.com and we will open an investigation with the carrier.',
          'A parcel is officially considered lost after 30 calendar days from dispatch for international shipments (or 21 days for domestic Ukrainian shipments). In this case we will either resend the order at no extra cost or issue a full refund, at your choice.',
          'Parcels returned to us as "undelivered" because of an incorrect address, no pickup within the storage period, or refusal to pay customs fees can be resent at the customer\'s expense, or refunded minus the actual shipping and return-shipping cost.',
        ],
      },
      {
        id: 'address',
        title: '10. Correct Address and Contact Details',
        paragraphs: [
          'Please double-check your delivery address, city, postal/ZIP code, and phone number before confirming the order. For Ukraine we recommend using the format: Full name, city, Nova Poshta branch number or full street address, phone number in international format (+380...).',
          'We are not responsible for parcels lost due to an incorrect or incomplete address provided by the customer.',
        ],
      },
      {
        id: 'contact',
        title: '11. Contact Us',
        paragraphs: [
          'For any shipping question, tracking issue, or delivery change request, contact:',
          'Himalayan Sound — himalayansound.info@gmail.com — RC London, Instytutska St., Odesa, 65000, Ukraine',
        ],
      },
    ],
  },
  uk: {
    title: 'Доставка',
    lastUpdated: '2 липня 2026',
    intro:
      'Ця Політика доставки пояснює, як Himalayan Sound обробляє, пакує та доставляє ваше замовлення по всьому світу, з окремими опціями для клієнтів в Україні через Нову Пошту та Укрпошту. Ми базуємось в Одесі, Україна. Співаючі чаші відбираються вручну в майстернях Непалу та відправляються з нашого складу в Одесі для замовлень по Україні або через партнерські центри для інших країн.',
    sections: [
      {
        id: 'processing',
        title: '1. Обробка замовлення',
        paragraphs: [
          'Замовлення, оформлені до 14:00 за київським часом у робочий день, обробляються цього ж дня. Замовлення після 14:00, у вихідні та святкові дні обробляються у наступний робочий день.',
          'Одразу після оформлення ви отримаєте лист із підтвердженням замовлення. Окремим листом ми надішлемо номер для відстеження (ТТН) після передачі посилки перевізнику.',
        ],
      },
      {
        id: 'destinations',
        title: '2. Куди ми доставляємо',
        paragraphs: [
          'Ми доставляємо по всьому світу. Доступні Україна, країни ЄС, Велика Британія, Швейцарія, Норвегія, США, Канада та більшість інших країн.',
          'Якщо вашої країни немає у формі оформлення замовлення, напишіть на himalayansound.info@gmail.com — підготуємо індивідуальний розрахунок.',
        ],
      },
      {
        id: 'ukraine',
        title: '3. Доставка по Україні',
        paragraphs: [
          'Для клієнтів в Україні ми використовуємо двох найнадійніших національних перевізників:',
        ],
        listItems: [
          'Нова Пошта — доставка у відділення, поштомат або кур\'єром за адресою. Термін по Україні після прибуття посилки: зазвичай 1–2 робочі дні.',
          'Укрпошта — економний варіант для доставки у відділення в невеликих містах та селах, де немає Нової Пошти. Термін по Україні: 2–5 робочих днів.',
          'Відправлення з нашого складу в Одесі через Нову Пошту або Укрпошту: зазвичай 1–5 робочих днів по Україні.',
          'Міжнародні замовлення (з Непалу або європейського хабу): 5–14 робочих днів залежно від маршруту та митного оформлення.',
        ],
      },
      {
        id: 'ukraine-customs',
        title: '4. Митниця, ПДВ та мито (Україна)',
        paragraphs: [
          'Посилки для фізичних осіб в Україну проходять митне оформлення відповідно до законодавства України. Станом на дату цієї політики, міжнародні посилки з задекларованою вартістю до 150 EUR зазвичай звільнені від ПДВ та мита. Понад цю межу застосовуються ПДВ 20% та, у відповідних випадках, мито 10% на суму, що перевищує 150 EUR.',
          'За потреби ми готуємо комерційний інвойс і митну декларацію CN22/CN23 та передаємо їх перевізнику. Якщо митниця України запросить додаткові документи, ми зв\'яжемось з вами електронною поштою.',
          'Отримувач є імпортером і несе відповідальність за сплату митних платежів, ПДВ та брокерських зборів, які нараховують Укрпошта, Нова Пошта Інтернешнл або митниця. Ці збори не включені у вартість товару та доставки, вказану під час оформлення замовлення.',
        ],
      },
      {
        id: 'international',
        title: '5. Міжнародна доставка (ЄС, UK, інші країни)',
        paragraphs: [
          'До ЄС та Великої Британії ми зазвичай надсилаємо посилки через DHL Express, UPS або аналогічну службу з відстеженням.',
          'Орієнтовний час у дорозі після відправлення:',
        ],
        listItems: [
          'Європейський Союз: 3–7 робочих днів.',
          'Велика Британія: 4–8 робочих днів.',
          'США та Канада: 5–10 робочих днів.',
          'Інші країни: 7–21 робочий день.',
        ],
      },
      {
        id: 'costs',
        title: '6. Вартість доставки',
        paragraphs: [
          'Вартість доставки розраховується під час оформлення замовлення на основі країни, ваги та розмірів посилки. Точна сума відображається до оплати.',
          'Періодично діють акції безкоштовної доставки при замовленні від певної суми — актуальний поріг вказано на сторінці магазину та товару.',
        ],
      },
      {
        id: 'packaging',
        title: '7. Пакування крихких товарів',
        paragraphs: [
          'Співаючі чаші, тінгши та гонги — крихкі вироби ручної роботи. Кожне замовлення пакується у двошаровий гофрокартон, з обгортанням у бульбашкову плівку та амортизуючий поролон, з маркуванням «крихке».',
          'Якщо посилка прибула з видимими пошкодженнями, відмовтеся від отримання або відкрийте її при кур\'єрі та вимагайте акт про пошкодження. Протягом 48 годин надішліть нам фото — ми відкриємо претензію та замінимо товар.',
        ],
      },
      {
        id: 'tracking',
        title: '8. Відстеження замовлення',
        paragraphs: [
          'Після відправлення ви отримаєте лист із ТТН та посиланням для відстеження. Для замовлень по Україні також можна відстежувати посилку напряму на novaposhta.ua або ukrposhta.ua за тим самим номером.',
          'Якщо статус не оновлюється більше 5 робочих днів, зв\'яжіться з нами — ми ініціюємо перевірку у перевізника.',
        ],
      },
      {
        id: 'delayed',
        title: '9. Затримки, втрачені або недоставлені посилки',
        paragraphs: [
          'Можливі затримки через митне оформлення, погоду, страйки або форс-мажор. Якщо посилка суттєво затримується, напишіть на himalayansound.info@gmail.com — ми відкриємо розслідування у перевізника.',
          'Посилка офіційно вважається втраченою через 30 календарних днів з дня відправлення для міжнародних замовлень (або 21 день для внутрішніх українських). У такому разі ми або повторно відправляємо замовлення без доплати, або повертаємо повну суму — на ваш вибір.',
          'Посилки, повернуті до нас як «недоставлені» через неправильну адресу, неотримання у термін зберігання або відмову від сплати митних зборів, можуть бути повторно відправлені коштом клієнта або повернуті у сумі за вирахуванням фактичних витрат на доставку та зворотне пересилання.',
        ],
      },
      {
        id: 'address',
        title: '10. Правильна адреса та контактні дані',
        paragraphs: [
          'Будь ласка, перевіряйте адресу доставки, місто, поштовий індекс та номер телефону перед підтвердженням замовлення. Для України рекомендуємо формат: ПІБ, місто, номер відділення Нової Пошти або повна адреса, номер телефону у міжнародному форматі (+380...).',
          'Ми не несемо відповідальності за посилки, втрачені через неправильну або неповну адресу, вказану клієнтом.',
        ],
      },
      {
        id: 'contact',
        title: '11. Контакти',
        paragraphs: [
          'З будь-яких питань щодо доставки, відстеження або зміни адреси звертайтесь:',
          'Himalayan Sound — himalayansound.info@gmail.com — ЖК «Лондон», вул. Інститутська, Одеса, 65000, Україна',
        ],
      },
    ],
  },
  ru: {
    title: 'Доставка',
    lastUpdated: '2 июля 2026',
    intro:
      'Настоящая Политика доставки объясняет, как Himalayan Sound обрабатывает, упаковывает и доставляет ваш заказ по всему миру, с отдельными опциями для клиентов в Украине через Новую Почту и Укрпочту. Мы базируемся в Одессе, Украина. Поющие чаши отбираются вручную в мастерских Непала и отправляются со склада в Одессе для заказов по Украине или через партнёрские центры для других стран.',
    sections: [
      {
        id: 'processing',
        title: '1. Обработка заказа',
        paragraphs: [
          'Заказы, оформленные до 14:00 по киевскому времени в рабочий день, обрабатываются в тот же день. Заказы после 14:00, в выходные и праздничные дни обрабатываются на следующий рабочий день.',
          'Сразу после оформления вы получите письмо с подтверждением заказа. Отдельным письмом мы отправим номер для отслеживания (ТТН) после передачи посылки перевозчику.',
        ],
      },
      {
        id: 'destinations',
        title: '2. Куда мы доставляем',
        paragraphs: [
          'Мы доставляем по всему миру. Доступны Украина, страны ЕС, Великобритания, Швейцария, Норвегия, США, Канада и большинство других стран.',
          'Если вашей страны нет в форме оформления, напишите на himalayansound.info@gmail.com — подготовим индивидуальный расчёт.',
        ],
      },
      {
        id: 'ukraine',
        title: '3. Доставка по Украине',
        paragraphs: [
          'Для клиентов в Украине мы используем двух самых надёжных национальных перевозчиков:',
        ],
        listItems: [
          'Новая Почта — доставка в отделение, почтомат или курьером по адресу. Срок по Украине после прибытия посылки: обычно 1–2 рабочих дня.',
          'Укрпочта — экономный вариант для доставки в отделение в небольших городах и сёлах, где нет Новой Почты. Срок по Украине: 2–5 рабочих дней.',
          'Отправка со склада в Одессе через Новую Почту или Укрпочту: обычно 1–5 рабочих дней по Украине.',
          'Международные заказы (из Непала или европейского хаба): 5–14 рабочих дней в зависимости от маршрута и таможни.',
        ],
      },
      {
        id: 'ukraine-customs',
        title: '4. Таможня, НДС и пошлина (Украина)',
        paragraphs: [
          'Посылки для физических лиц в Украину проходят таможенное оформление в соответствии с законодательством Украины. На дату этой политики международные посылки с задекларированной стоимостью до 150 EUR обычно освобождены от НДС и пошлины. Свыше этого порога применяются НДС 20% и, при необходимости, пошлина 10% на сумму, превышающую 150 EUR.',
          'При необходимости мы готовим коммерческий инвойс и таможенную декларацию CN22/CN23 и передаём их перевозчику. Если таможня Украины запросит дополнительные документы, мы свяжемся с вами по электронной почте.',
          'Получатель является импортёром и несёт ответственность за уплату таможенных платежей, НДС и брокерских сборов, начисляемых Укрпочтой, Новой Почтой Интернешнл или таможней. Эти сборы не включены в стоимость товара и доставки, указанную при оформлении.',
        ],
      },
      {
        id: 'international',
        title: '5. Международная доставка (ЕС, UK, другие страны)',
        paragraphs: [
          'В ЕС и Великобританию мы обычно отправляем посылки через DHL Express, UPS или аналогичную службу с отслеживанием.',
          'Ориентировочное время в пути после отправки:',
        ],
        listItems: [
          'Европейский Союз: 3–7 рабочих дней.',
          'Великобритания: 4–8 рабочих дней.',
          'США и Канада: 5–10 рабочих дней.',
          'Остальные страны: 7–21 рабочий день.',
        ],
      },
      {
        id: 'costs',
        title: '6. Стоимость доставки',
        paragraphs: [
          'Стоимость доставки рассчитывается при оформлении заказа на основании страны, веса и размеров посылки. Точная сумма отображается до оплаты.',
          'Периодически действуют акции бесплатной доставки при заказе от определённой суммы — актуальный порог указан на страницах магазина и товара.',
        ],
      },
      {
        id: 'packaging',
        title: '7. Упаковка хрупких товаров',
        paragraphs: [
          'Поющие чаши, тингши и гонги — хрупкие изделия ручной работы. Каждый заказ упаковывается в двухслойный гофрокартон, с обёртыванием в пузырчатую плёнку и амортизирующий поролон, с маркировкой «хрупкое».',
          'Если посылка пришла с видимыми повреждениями, откажитесь от получения или вскройте её при курьере и потребуйте акт о повреждении. В течение 48 часов пришлите нам фото — мы откроем претензию и заменим товар.',
        ],
      },
      {
        id: 'tracking',
        title: '8. Отслеживание заказа',
        paragraphs: [
          'После отправки вы получите письмо с ТТН и ссылкой для отслеживания. Для заказов по Украине также можно отслеживать посылку напрямую на novaposhta.ua или ukrposhta.ua по тому же номеру.',
          'Если статус не обновляется более 5 рабочих дней, свяжитесь с нами — мы инициируем проверку у перевозчика.',
        ],
      },
      {
        id: 'delayed',
        title: '9. Задержки, потерянные или недоставленные посылки',
        paragraphs: [
          'Возможны задержки из-за таможенного оформления, погоды, забастовок или форс-мажора. Если посылка значительно задерживается, напишите на himalayansound.info@gmail.com — мы откроем расследование у перевозчика.',
          'Посылка официально считается потерянной через 30 календарных дней с даты отправки для международных заказов (или 21 день для внутренних украинских). В этом случае мы либо повторно отправляем заказ без доплаты, либо возвращаем полную сумму — на ваш выбор.',
          'Посылки, вернувшиеся к нам как «недоставленные» из-за неверного адреса, неполучения в срок хранения или отказа от уплаты таможенных сборов, могут быть повторно отправлены за счёт клиента или возвращены за вычетом фактических расходов на доставку и обратную пересылку.',
        ],
      },
      {
        id: 'address',
        title: '10. Правильный адрес и контактные данные',
        paragraphs: [
          'Пожалуйста, проверяйте адрес доставки, город, почтовый индекс и номер телефона перед подтверждением заказа. Для Украины рекомендуем формат: ФИО, город, номер отделения Новой Почты или полный адрес, номер телефона в международном формате (+380...).',
          'Мы не несём ответственности за посылки, потерянные из-за неверного или неполного адреса, указанного клиентом.',
        ],
      },
      {
        id: 'contact',
        title: '11. Контакты',
        paragraphs: [
          'По любым вопросам доставки, отслеживания или изменения адреса обращайтесь:',
          'Himalayan Sound — himalayansound.info@gmail.com — ЖК «Лондон», ул. Институтская, Одесса, 65000, Украина',
        ],
      },
    ],
  },
};
