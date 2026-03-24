// Gallery data for past sound healing meditation events
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
      uk: 'Учасники насолоджуються спокійною ранковою медитацією з співаючими чашами на природі',
    },
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0d6fcffe7f1f?w=1200&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0d6fcffe7f1f?w=400&h=300&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1516320318423-f06f70504504?w=1200&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516320318423-f06f70504504?w=400&h=300&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop',
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
];
