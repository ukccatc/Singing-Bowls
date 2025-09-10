-- Sample data for products table
-- Run this after creating the table structure

INSERT INTO products (
  slug, name, description, price, currency, inventory, category, 
  images, specifications, tags, sku, weight, dimensions, materials, 
  origin, is_handmade, is_featured, is_available, seo
) VALUES 
(
  'tibetan-singing-bowl-large',
  '{"en": "Tibetan Singing Bowl - Large", "ru": "Тибетская поющая чаша - Большая", "uk": "Тибетська співаюча чаша - Велика"}',
  '{"en": "Authentic Tibetan singing bowl made by skilled craftsmen in Nepal. Perfect for meditation and sound healing.", "ru": "Аутентичная тибетская поющая чаша, изготовленная опытными мастерами в Непале. Идеальна для медитации и звукотерапии.", "uk": "Автентична тибетська співаюча чаша, виготовлена досвідченими майстрами в Непалі. Ідеальна для медитації та звукотерапії."}',
  89.99,
  'USD',
  15,
  'singing_bowls',
  '[{"id": "img1", "url": "/images/bowl-large-1.jpg", "alt": {"en": "Large singing bowl front view", "ru": "Большая поющая чаша вид спереди", "uk": "Велика співаюча чаша вид спереду"}, "width": 800, "height": 600, "isPrimary": true, "is360": false}]'::jsonb,
  '[{"name": {"en": "Diameter", "ru": "Диаметр", "uk": "Діаметр"}, "value": {"en": "20 cm", "ru": "20 см", "uk": "20 см"}, "unit": "cm"}, {"name": {"en": "Height", "ru": "Высота", "uk": "Висота"}, "value": {"en": "8 cm", "ru": "8 см", "uk": "8 см"}, "unit": "cm"}, {"name": {"en": "Weight", "ru": "Вес", "uk": "Вага"}, "value": {"en": "1.2 kg", "ru": "1.2 кг", "uk": "1.2 кг"}, "unit": "kg"}]'::jsonb,
  ARRAY['meditation', 'sound-healing', 'tibetan', 'handmade'],
  'SKU-TSB-L-001',
  1200,
  '{"diameter": 20, "height": 8, "unit": "cm"}'::jsonb,
  ARRAY['Bronze', 'Copper', 'Tin'],
  'Nepal',
  true,
  true,
  true,
  '{"title": {"en": "Tibetan Singing Bowl - Large | Himalayan Sound", "ru": "Тибетская поющая чаша - Большая | Himalayan Sound", "uk": "Тибетська співаюча чаша - Велика | Himalayan Sound"}, "description": {"en": "Authentic Tibetan singing bowl for meditation and sound healing", "ru": "Аутентичная тибетская поющая чаша для медитации и звукотерапии", "uk": "Автентична тибетська співаюча чаша для медитації та звукотерапії"}, "keywords": ["singing bowl", "meditation", "sound healing", "tibetan"]}'::jsonb
),
(
  'crystal-singing-bowl-set',
  '{"en": "Crystal Singing Bowl Set", "ru": "Набор кристальных поющих чаш", "uk": "Набір кристальних співаючих чаш"}',
  '{"en": "Beautiful set of crystal singing bowls in different sizes. Perfect for chakra healing and meditation.", "ru": "Красивый набор кристальных поющих чаш разных размеров. Идеален для чакра-терапии и медитации.", "uk": "Красивий набір кристальних співаючих чаш різних розмірів. Ідеальний для чакра-терапії та медитації."}',
  199.99,
  'USD',
  8,
  'singing_bowls',
  '[{"id": "img2", "url": "/images/crystal-set-1.jpg", "alt": {"en": "Crystal singing bowl set", "ru": "Набор кристальных поющих чаш", "uk": "Набір кристальних співаючих чаш"}, "width": 800, "height": 600, "isPrimary": true, "is360": false}]'::jsonb,
  '[{"name": {"en": "Set includes", "ru": "В набор входит", "uk": "В набір входить"}, "value": {"en": "3 bowls (small, medium, large)", "ru": "3 чаши (малая, средняя, большая)", "uk": "3 чаші (мала, середня, велика)"}, "unit": ""}, {"name": {"en": "Material", "ru": "Материал", "uk": "Матеріал"}, "value": {"en": "Quartz Crystal", "ru": "Кварцевый кристалл", "uk": "Кварцовий кристал"}, "unit": ""}]'::jsonb,
  ARRAY['crystal', 'chakra', 'healing', 'set'],
  'SKU-CSB-SET-001',
  2500,
  '{"length": 30, "width": 20, "height": 15, "unit": "cm"}'::jsonb,
  ARRAY['Quartz Crystal'],
  'Brazil',
  false,
  true,
  true,
  '{"title": {"en": "Crystal Singing Bowl Set | Himalayan Sound", "ru": "Набор кристальных поющих чаш | Himalayan Sound", "uk": "Набір кристальних співаючих чаш | Himalayan Sound"}, "description": {"en": "Beautiful crystal singing bowl set for chakra healing", "ru": "Красивый набор кристальных поющих чаш для чакра-терапии", "uk": "Красивий набір кристальних співаючих чаш для чакра-терапії"}, "keywords": ["crystal", "singing bowl", "chakra", "healing"]}'::jsonb
);
