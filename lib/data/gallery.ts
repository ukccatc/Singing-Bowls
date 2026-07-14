// Gallery data for past sound healing meditation events
import { GALLERY_STOCK_IMAGES } from '@/lib/images/gallery-image-url';

export interface GalleryImage {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  imageUrl: string;
  thumbnailUrl: string;
  eventDate: string;
  eventName: Record<string, string>;
  category: 'meditation' | 'workshop' | 'retreat' | 'ceremony';
  location: Record<string, string>;
  photographer?: string;
  tags: string[];
}

type LocaleText = { en: string; ru: string; uk: string };

function pexelsUrl(id: number): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;
}

function galleryItem(
  id: string,
  pexelsId: number,
  category: GalleryImage['category'],
  eventDate: string,
  title: LocaleText,
  description: LocaleText,
  eventName: LocaleText,
  location: LocaleText,
  tags: string[],
  photographer?: string
): GalleryImage {
  const imageUrl = pexelsUrl(pexelsId);
  return {
    id,
    title,
    description,
    imageUrl,
    thumbnailUrl: imageUrl,
    eventDate,
    eventName,
    category,
    location,
    photographer,
    tags,
  };
}

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    title: {
      en: 'Morning Meditation Session',
      ru: 'Сеанс утренней медитации',
      uk: 'Сеанс ранкової медитації',
    },
    description: {
      en: 'Participants enjoying a peaceful morning meditation with singing bowls in nature',
      ru: 'Участники наслаждаются спокойной утренней медитацией с поющими чашами на природе',
      uk: 'Учасники насолоджуються спокійною ранковою медитацією зі співаючими чашами на природі',
    },
    imageUrl: GALLERY_STOCK_IMAGES.soundBath,
    thumbnailUrl: GALLERY_STOCK_IMAGES.soundBath,
    eventDate: '2024-03-15',
    eventName: {
      en: 'Spring Meditation Retreat',
      ru: 'Весенний медитативный ретрит',
      uk: 'Весняний медитативний ретрит',
    },
    category: 'retreat',
    location: {
      en: 'Mountain Valley, Nepal',
      ru: 'Горная долина, Непал',
      uk: 'Гірська долина, Непал',
    },
    photographer: 'Sarah Johnson',
    tags: ['meditation', 'nature', 'singing-bowls', 'retreat'],
  },
  {
    id: '2',
    title: {
      en: 'Sound Healing Workshop',
      ru: 'Мастер-класс звукового исцеления',
      uk: 'Майстер-клас звукового зцілення',
    },
    description: {
      en: 'Expert demonstrating sound healing techniques with traditional Himalayan bowls',
      ru: 'Эксперт демонстрирует методы звукового исцеления с традиционными гималайскими чашами',
      uk: 'Експерт демонструє методи звукового зцілення з традиційними гімалайськими чашами',
    },
    imageUrl: GALLERY_STOCK_IMAGES.playingBowl,
    thumbnailUrl: GALLERY_STOCK_IMAGES.playingBowl,
    eventDate: '2024-02-20',
    eventName: {
      en: 'Sound Healing Masterclass',
      ru: 'Мастер-класс звукового исцеления',
      uk: 'Майстер-клас звукового зцілення',
    },
    category: 'workshop',
    location: {
      en: 'Kathmandu, Nepal',
      ru: 'Катманду, Непал',
      uk: 'Катманду, Непал',
    },
    photographer: 'Michael Chen',
    tags: ['workshop', 'sound-healing', 'education'],
  },
  {
    id: '3',
    title: {
      en: 'Group Meditation Circle',
      ru: 'Групповой круг медитации',
      uk: 'Групова медитаційна коло',
    },
    description: {
      en: 'Community gathering for collective sound meditation and healing',
      ru: 'Общественное собрание для коллективной звуковой медитации и исцеления',
      uk: 'Громадське зібрання для колективної звукової медитації та зцілення',
    },
    imageUrl: GALLERY_STOCK_IMAGES.personHolding,
    thumbnailUrl: GALLERY_STOCK_IMAGES.personHolding,
    eventDate: '2024-01-10',
    eventName: {
      en: 'Community Meditation Circle',
      ru: 'Общественный круг медитации',
      uk: 'Громадське медитаційне коло',
    },
    category: 'meditation',
    location: {
      en: 'Pokhara, Nepal',
      ru: 'Покхара, Непал',
      uk: 'Покхара, Непал',
    },
    photographer: 'Emma Wilson',
    tags: ['community', 'meditation', 'group'],
  },
  {
    id: '4',
    title: {
      en: 'Sacred Ceremony',
      ru: 'Священная церемония',
      uk: 'Священна церемонія',
    },
    description: {
      en: 'Traditional sound healing ceremony with ancient Himalayan instruments',
      ru: 'Традиционная церемония звукового исцеления с древними гималайскими инструментами',
      uk: 'Традиційна церемонія звукового зцілення з давніми гімалайськими інструментами',
    },
    imageUrl: GALLERY_STOCK_IMAGES.bowlOutdoor,
    thumbnailUrl: GALLERY_STOCK_IMAGES.bowlOutdoor,
    eventDate: '2023-12-25',
    eventName: {
      en: 'Winter Solstice Ceremony',
      ru: 'Церемония зимнего солнцестояния',
      uk: 'Церемонія зимового сонцестояння',
    },
    category: 'ceremony',
    location: {
      en: 'Bhaktapur, Nepal',
      ru: 'Бхактапур, Непал',
      uk: 'Бхактапур, Непал',
    },
    photographer: 'David Kumar',
    tags: ['ceremony', 'traditional', 'spiritual'],
  },
  {
    id: '5',
    title: {
      en: 'Outdoor Meditation',
      ru: 'Медитация на открытом воздухе',
      uk: 'Медитація на відкритому повітрі',
    },
    description: {
      en: 'Peaceful meditation session surrounded by Himalayan mountains',
      ru: 'Спокойный сеанс медитации в окружении гималайских гор',
      uk: 'Спокійний сеанс медитації в оточенні гімалайських гір',
    },
    imageUrl: GALLERY_STOCK_IMAGES.bowlCloseUp,
    thumbnailUrl: GALLERY_STOCK_IMAGES.bowlCloseUp,
    eventDate: '2023-11-05',
    eventName: {
      en: 'Mountain Retreat',
      ru: 'Горный ретрит',
      uk: 'Гірський ретрит',
    },
    category: 'retreat',
    location: {
      en: 'Nagarkot, Nepal',
      ru: 'Нагаркот, Непал',
      uk: 'Нагаркот, Непал',
    },
    photographer: 'Lisa Anderson',
    tags: ['nature', 'meditation', 'mountains'],
  },
  {
    id: '6',
    title: {
      en: 'Healing Session',
      ru: 'Сеанс исцеления',
      uk: 'Сеанс зцілення',
    },
    description: {
      en: 'Individual sound healing session with personalized bowl selection',
      ru: 'Индивидуальный сеанс звукового исцеления с персональным подбором чаш',
      uk: 'Індивідуальний сеанс звукового зцілення з персональним підбором чаш',
    },
    imageUrl: GALLERY_STOCK_IMAGES.bowlWhite,
    thumbnailUrl: GALLERY_STOCK_IMAGES.bowlWhite,
    eventDate: '2023-10-12',
    eventName: {
      en: 'Personalized Healing',
      ru: 'Персональное исцеление',
      uk: 'Персональне зцілення',
    },
    category: 'meditation',
    location: {
      en: 'Thamel, Kathmandu',
      ru: 'Тамель, Катманду',
      uk: 'Тамель, Катманду',
    },
    photographer: 'James Mitchell',
    tags: ['healing', 'personal', 'wellness'],
  },
  galleryItem(
    '7',
    3544322,
    'meditation',
    '2024-04-08',
    {
      en: 'Healing Hands',
      ru: 'Исцеляющие руки',
      uk: 'Цілющі руки',
    },
    {
      en: 'Close-up of hands cradling a Tibetan singing bowl during a calming sound session',
      ru: 'Крупный план рук, держащих тибетскую поющую чашу во время успокаивающего звукового сеанса',
      uk: 'Крупний план рук, що тримають тибетську співаючу чашу під час заспокійливого звукового сеансу',
    },
    {
      en: 'Sound Bath Evening',
      ru: 'Вечерний звуковой ванны',
      uk: 'Вечірня звукова ванна',
    },
    {
      en: 'Odesa, Ukraine',
      ru: 'Одесса, Украина',
      uk: 'Одеса, Україна',
    },
    ['meditation', 'hands', 'sound-bath']
  ),
  galleryItem(
    '8',
    7077856,
    'ceremony',
    '2024-03-28',
    {
      en: 'Serene Bowl Arrangement',
      ru: 'Спокойная композиция с чашей',
      uk: 'Спокійна композиція з чашею',
    },
    {
      en: 'Tibetan singing bowl surrounded by petals, creating a sacred ceremonial atmosphere',
      ru: 'Тибетская поющая чаша в окружении лепестков, создающая священную церемониальную атмосферу',
      uk: 'Тибетська співаюча чаша в оточенні пелюсток, що створює священну церемоніальну атмосферу',
    },
    {
      en: 'Spring Equinox Ceremony',
      ru: 'Церемония весеннего равноденствия',
      uk: 'Церемонія весняного рівнодення',
    },
    {
      en: 'Lviv, Ukraine',
      ru: 'Львов, Украина',
      uk: 'Львів, Україна',
    },
    ['ceremony', 'flowers', 'sacred']
  ),
  galleryItem(
    '9',
    6997994,
    'meditation',
    '2024-03-02',
    {
      en: 'Floor Meditation Practice',
      ru: 'Медитация на полу',
      uk: 'Медитація на підлозі',
    },
    {
      en: 'Mindful meditation session with Tibetan singing bowls while sitting on the floor',
      ru: 'Осознанная медитация с тибетскими поющими чашами в положении сидя на полу',
      uk: 'Усвідомлена медитація з тибетськими співаючими чашами в положенні сидячи на підлозі',
    },
    {
      en: 'Inner Peace Circle',
      ru: 'Круг внутреннего покоя',
      uk: 'Коло внутрішнього спокою',
    },
    {
      en: 'Kyiv, Ukraine',
      ru: 'Киев, Украина',
      uk: 'Київ, Україна',
    },
    ['meditation', 'floor', 'mindfulness']
  ),
  galleryItem(
    '10',
    3543846,
    'workshop',
    '2024-02-14',
    {
      en: 'Bowl Playing Basics',
      ru: 'Основы игры на чаше',
      uk: 'Основи гри на чаші',
    },
    {
      en: 'Workshop participant learning to hold and play a Tibetan singing bowl indoors',
      ru: 'Участник мастер-класса учится держать и играть на тибетской поющей чаше в помещении',
      uk: 'Учасник майстер-класу вчиться тримати та грати на тибетській співаючій чаші в приміщенні',
    },
    {
      en: 'Beginner Sound Workshop',
      ru: 'Мастер-класс для начинающих',
      uk: 'Майстер-клас для початківців',
    },
    {
      en: 'Odesa, Ukraine',
      ru: 'Одесса, Украина',
      uk: 'Одеса, Україна',
    },
    ['workshop', 'learning', 'beginner']
  ),
  galleryItem(
    '11',
    6013471,
    'ceremony',
    '2024-01-22',
    {
      en: 'Candlelight Sound Ritual',
      ru: 'Звуковой ритуал при свечах',
      uk: 'Звуковий ритуал при свічках',
    },
    {
      en: 'Hands playing singing bowls by candlelight, creating a warm ceremonial ambiance',
      ru: 'Руки играют на поющих чашах при свечах, создавая тёплую церемониальную атмосферу',
      uk: 'Руки грають на співаючих чашах при свічках, створюючи теплу церемоніальну атмосферу',
    },
    {
      en: 'Full Moon Ceremony',
      ru: 'Церемония полнолуния',
      uk: 'Церемонія повного місяця',
    },
    {
      en: 'Patan, Nepal',
      ru: 'Патан, Непал',
      uk: 'Патан, Непал',
    },
    ['ceremony', 'candlelight', 'ritual']
  ),
  galleryItem(
    '12',
    10574239,
    'meditation',
    '2023-12-18',
    {
      en: 'Bowl and Mallet Stillness',
      ru: 'Тишина чаши и палочки',
      uk: 'Тиша чаші та палички',
    },
    {
      en: 'A serene gold Tibetan singing bowl with wooden mallet, ready for meditation',
      ru: 'Спокойная золотая тибетская поющая чаша с деревянной палочкой, готовая к медитации',
      uk: 'Спокійна золота тибетська співаюча чаша з дерев’яною паличкою, готова до медитації',
    },
    {
      en: 'Silent Meditation Hour',
      ru: 'Час тихой медитации',
      uk: 'Година тихої медитації',
    },
    {
      en: 'Boudhanath, Nepal',
      ru: 'Боднатх, Непал',
      uk: 'Боднатх, Непал',
    },
    ['meditation', 'stillness', 'golden-bowl']
  ),
  galleryItem(
    '13',
    5163926,
    'workshop',
    '2023-11-28',
    {
      en: 'Traditional Instrument Demo',
      ru: 'Демонстрация традиционного инструмента',
      uk: 'Демонстрація традиційного інструменту',
    },
    {
      en: 'Hands holding a Tibetan singing bowl, showcasing a traditional meditation instrument',
      ru: 'Руки держат тибетскую поющую чашу, демонстрируя традиционный медитативный инструмент',
      uk: 'Руки тримають тибетську співаючу чашу, демонструючи традиційний медитативний інструмент',
    },
    {
      en: 'Himalayan Instruments Workshop',
      ru: 'Мастер-класс гималайских инструментов',
      uk: 'Майстер-клас гімалайських інструментів',
    },
    {
      en: 'Kathmandu, Nepal',
      ru: 'Катманду, Непал',
      uk: 'Катманду, Непал',
    },
    ['workshop', 'traditional', 'demo']
  ),
  galleryItem(
    '14',
    15240821,
    'retreat',
    '2023-11-12',
    {
      en: 'Sunlit Copper Bowl',
      ru: 'Медная чаша на солнце',
      uk: 'Мідна чаша на сонці',
    },
    {
      en: 'A copper singing bowl glowing in warm sunlight during an outdoor retreat session',
      ru: 'Медная поющая чаша сияет в тёплых солнечных лучах во время ретрита на природе',
      uk: 'Мідна співаюча чаша сяє в теплих сонячних променях під час ретриту на природі',
    },
    {
      en: 'Autumn Mountain Retreat',
      ru: 'Осенний горный ретрит',
      uk: 'Осінній гірський ретрит',
    },
    {
      en: 'Nagarkot, Nepal',
      ru: 'Нагаркот, Непал',
      uk: 'Нагаркот, Непал',
    },
    ['retreat', 'outdoor', 'copper-bowl']
  ),
  galleryItem(
    '15',
    5602461,
    'ceremony',
    '2023-10-30',
    {
      en: 'Bowls and Gong Ritual',
      ru: 'Ритуал с чашами и гонгом',
      uk: 'Ритуал з чашами та гонгом',
    },
    {
      en: 'Tibetan singing bowls and gong arranged for a traditional sound healing ceremony',
      ru: 'Тибетские поющие чаши и гонг, подготовленные для традиционной церемонии звукового исцеления',
      uk: 'Тибетські співаючі чаші та гонг, підготовлені для традиційної церемонії звукового зцілення',
    },
    {
      en: 'Sacred Sound Ceremony',
      ru: 'Церемония священного звука',
      uk: 'Церемонія священного звуку',
    },
    {
      en: 'Bhaktapur, Nepal',
      ru: 'Бхактапур, Непал',
      uk: 'Бхактапур, Непал',
    },
    ['ceremony', 'gong', 'ritual']
  ),
  galleryItem(
    '16',
    4723255,
    'workshop',
    '2023-10-05',
    {
      en: 'Focused Bowl Practice',
      ru: 'Сосредоточенная практика с чашей',
      uk: 'Зосереджена практика з чашею',
    },
    {
      en: 'A practitioner using a singing bowl in a serene indoor setting during a workshop',
      ru: 'Практик использует поющую чашу в спокойной обстановке во время мастер-класса',
      uk: 'Практик використовує співаючу чашу в спокійній обстановці під час майстер-класу',
    },
    {
      en: 'Sound Technique Workshop',
      ru: 'Мастер-класс звуковых техник',
      uk: 'Майстер-клас звукових технік',
    },
    {
      en: 'Odesa, Ukraine',
      ru: 'Одесса, Украина',
      uk: 'Одеса, Україна',
    },
    ['workshop', 'technique', 'practice']
  ),
  galleryItem(
    '17',
    3543711,
    'meditation',
    '2023-09-20',
    {
      en: 'Close-Up Healing Moment',
      ru: 'Момент исцеления крупным планом',
      uk: 'Момент зцілення крупним планом',
    },
    {
      en: 'Intimate close-up of hands holding a Tibetan singing bowl for meditation and healing',
      ru: 'Интимный крупный план рук, держащих тибетскую поющую чашу для медитации и исцеления',
      uk: 'Інтимний крупний план рук, що тримають тибетську співаючу чашу для медитації та зцілення',
    },
    {
      en: 'Evening Meditation',
      ru: 'Вечерняя медитация',
      uk: 'Вечірня медитація',
    },
    {
      en: 'Pokhara, Nepal',
      ru: 'Покхара, Непал',
      uk: 'Покхара, Непал',
    },
    ['meditation', 'close-up', 'healing']
  ),
  galleryItem(
    '18',
    3543716,
    'meditation',
    '2023-09-08',
    {
      en: 'Gentle Bowl Hold',
      ru: 'Нежное удержание чаши',
      uk: 'Ніжне утримання чаші',
    },
    {
      en: 'A hand gently cradling a Tibetan singing bowl, inviting deep relaxation',
      ru: 'Рука нежно держит тибетскую поющую чашу, приглашая к глубокому расслаблению',
      uk: 'Рука ніжно тримає тибетську співаючу чашу, запрошуючи до глибокого розслаблення',
    },
    {
      en: 'Calm Mind Session',
      ru: 'Сеанс спокойного ума',
      uk: 'Сеанс спокійного розуму',
    },
    {
      en: 'Kyiv, Ukraine',
      ru: 'Киев, Украина',
      uk: 'Київ, Україна',
    },
    ['meditation', 'relaxation', 'gentle']
  ),
  galleryItem(
    '19',
    33884011,
    'retreat',
    '2023-08-25',
    {
      en: 'Sound Therapy Session',
      ru: 'Сеанс звуковой терапии',
      uk: 'Сеанс звукової терапії',
    },
    {
      en: 'Tranquil sound therapy session with singing bowls placed around a relaxed participant',
      ru: 'Спокойный сеанс звуковой терапии с поющими чашами вокруг расслабленного участника',
      uk: 'Спокійний сеанс звукової терапії зі співаючими чашами навколо розслабленого учасника',
    },
    {
      en: 'Wellness Retreat',
      ru: 'Ретрит здоровья',
      uk: 'Ретрит здоров’я',
    },
    {
      en: 'Carpathians, Ukraine',
      ru: 'Карпаты, Украина',
      uk: 'Карпати, Україна',
    },
    ['retreat', 'therapy', 'wellness']
  ),
  galleryItem(
    '20',
    6962425,
    'workshop',
    '2023-08-10',
    {
      en: 'Mallet Technique',
      ru: 'Техника работы с палочкой',
      uk: 'Техніка роботи з паличкою',
    },
    {
      en: 'Practitioner demonstrating proper mallet technique on a Tibetan singing bowl',
      ru: 'Практик демонстрирует правильную технику работы с палочкой на тибетской поющей чаше',
      uk: 'Практик демонструє правильну техніку роботи з паличкою на тибетській співаючій чаші',
    },
    {
      en: 'Advanced Playing Workshop',
      ru: 'Мастер-класс продвинутой игры',
      uk: 'Майстер-клас просунутої гри',
    },
    {
      en: 'Odesa, Ukraine',
      ru: 'Одесса, Украина',
      uk: 'Одеса, Україна',
    },
    ['workshop', 'mallet', 'technique']
  ),
  galleryItem(
    '21',
    14466084,
    'retreat',
    '2023-07-22',
    {
      en: 'Bowl Collection on Floor',
      ru: 'Коллекция чаш на полу',
      uk: 'Колекція чаш на підлозі',
    },
    {
      en: 'A serene arrangement of Tibetan singing bowls and mallets on a wooden floor',
      ru: 'Спокойная композиция из тибетских поющих чаш и палочек на деревянном полу',
      uk: 'Спокійна композиція з тибетських співаючих чаш і паличок на дерев’яному підлозі',
    },
    {
      en: 'Summer Sound Retreat',
      ru: 'Летний звуковой ретрит',
      uk: 'Літній звуковий ретрит',
    },
    {
      en: 'Pokhara, Nepal',
      ru: 'Покхара, Непал',
      uk: 'Покхара, Непал',
    },
    ['retreat', 'collection', 'wooden-floor']
  ),
  galleryItem(
    '22',
    10923829,
    'retreat',
    '2023-07-05',
    {
      en: 'Meditation Setup',
      ru: 'Медитативная установка',
      uk: 'Медитативне встановлення',
    },
    {
      en: 'Calming meditation setup with Tibetan singing bowls and cushion on a wooden floor',
      ru: 'Успокаивающая медитативная установка с тибетскими поющими чашами и подушкой на деревянном полу',
      uk: 'Заспокійлива медитативна установка з тибетськими співаючими чашами та подушкою на дерев’яному підлозі',
    },
    {
      en: 'Mindful Living Retreat',
      ru: 'Ретрит осознанной жизни',
      uk: 'Ретрит усвідомленого життя',
    },
    {
      en: 'Lviv, Ukraine',
      ru: 'Львов, Украина',
      uk: 'Львів, Україна',
    },
    ['retreat', 'setup', 'cushion']
  ),
  galleryItem(
    '23',
    5416010,
    'meditation',
    '2023-06-18',
    {
      en: 'Indoor Bowl Playing',
      ru: 'Игра на чаше в помещении',
      uk: 'Гра на чаші в приміщенні',
    },
    {
      en: 'Close-up of a person playing a Tibetan singing bowl indoors for meditation',
      ru: 'Крупный план человека, играющего на тибетской поющей чаше в помещении для медитации',
      uk: 'Крупний план людини, що грає на тибетській співаючій чаші в приміщенні для медитації',
    },
    {
      en: 'Indoor Sound Circle',
      ru: 'Звуковой круг в помещении',
      uk: 'Звукове коло в приміщенні',
    },
    {
      en: 'Kathmandu, Nepal',
      ru: 'Катманду, Непал',
      uk: 'Катманду, Непал',
    },
    ['meditation', 'indoor', 'playing']
  ),
  galleryItem(
    '24',
    3543712,
    'ceremony',
    '2023-06-02',
    {
      en: 'Antique Bowl Collection',
      ru: 'Коллекция антикварных чаш',
      uk: 'Колекція антикварних чаш',
    },
    {
      en: 'Close-up of antique Tibetan singing bowls held during a sacred ceremony',
      ru: 'Крупный план антикварных тибетских поющих чаш во время священной церемонии',
      uk: 'Крупний план антикварних тибетських співаючих чаш під час священної церемонії',
    },
    {
      en: 'Heritage Sound Ceremony',
      ru: 'Церемония наследия звука',
      uk: 'Церемонія спадщини звуку',
    },
    {
      en: 'Boudhanath, Nepal',
      ru: 'Боднатх, Непал',
      uk: 'Боднатх, Непал',
    },
    ['ceremony', 'antique', 'heritage']
  ),
  galleryItem(
    '25',
    6962426,
    'meditation',
    '2023-05-15',
    {
      en: 'Hands and Mallet Serenity',
      ru: 'Спокойствие рук и палочки',
      uk: 'Спокій рук і палички',
    },
    {
      en: 'Hands holding a Tibetan singing bowl and mallet, evoking peace and serenity',
      ru: 'Руки держат тибетскую поющую чашу и палочку, вызывая чувство покоя и безмятежности',
      uk: 'Руки тримають тибетську співаючу чашу та паличку, викликаючи відчуття спокою та безтурботності',
    },
    {
      en: 'Peaceful Vibrations',
      ru: 'Мирные вибрации',
      uk: 'Мирні вібрації',
    },
    {
      en: 'Odesa, Ukraine',
      ru: 'Одесса, Украина',
      uk: 'Одеса, Україна',
    },
    ['meditation', 'serenity', 'vibrations']
  ),
  galleryItem(
    '26',
    6013488,
    'ceremony',
    '2023-05-01',
    {
      en: 'Candle Meditation Circle',
      ru: 'Медитативный круг при свечах',
      uk: 'Медитативне коло при свічках',
    },
    {
      en: 'A meditative scene with singing bowls surrounded by candles during a healing ceremony',
      ru: 'Медитативная сцена с поющими чашами в окружении свечей во время церемонии исцеления',
      uk: 'Медитативна сцена зі співаючими чашами в оточенні свічок під час церемонії зцілення',
    },
    {
      en: 'Candlelight Healing Ceremony',
      ru: 'Церемония исцеления при свечах',
      uk: 'Церемонія зцілення при свічках',
    },
    {
      en: 'Patan, Nepal',
      ru: 'Патан, Непал',
      uk: 'Патан, Непал',
    },
    ['ceremony', 'candles', 'healing']
  ),
];
