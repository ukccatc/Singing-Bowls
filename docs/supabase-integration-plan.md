# Supabase Integration Plan

## 🎯 Цель интеграции

Интегрировать Supabase как основную базу данных для хранения продуктов, заказов и пользователей, заменив статические данные на реальную базу данных.

---

## 📋 План интеграции

### **Фаза 1: Настройка Supabase (Foundation)**

#### 1.1 Создание проекта Supabase
- [ ] Создать новый проект на [supabase.com](https://supabase.com)
- [ ] Получить API ключи:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (для серверных операций)
- [ ] Настроить переменные окружения в `.env.local`

#### 1.2 Установка зависимостей
```bash
npm install @supabase/supabase-js
```

#### 1.3 Настройка клиента Supabase
- [ ] Создать `lib/supabase/client.ts` - клиент для браузера
- [ ] Создать `lib/supabase/server.ts` - клиент для сервера
- [ ] Настроить типы TypeScript для Supabase

### **Фаза 2: Схема базы данных**

#### 2.1 Создание таблиц
```sql
-- Таблица продуктов
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name JSONB NOT NULL, -- {en: string, ru: string, uk: string}
  description JSONB NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  inventory INTEGER DEFAULT 0,
  category TEXT NOT NULL,
  images JSONB DEFAULT '[]',
  specifications JSONB DEFAULT '[]',
  tags TEXT[] DEFAULT '[]',
  audio_sample TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица заказов
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES customers(id),
  email TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  billing_address JSONB NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица элементов заказа
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица клиентов
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  addresses JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица статей
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title JSONB NOT NULL,
  excerpt JSONB NOT NULL,
  content JSONB NOT NULL,
  slug JSONB NOT NULL,
  author JSONB NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '[]',
  image JSONB,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2.2 Настройка RLS (Row Level Security)
```sql
-- Включить RLS для всех таблиц
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Политики для продуктов (публичное чтение, админ - полный доступ)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

CREATE POLICY "Products are insertable by admin" ON products
  FOR INSERT WITH CHECK (auth.role() = 'admin');

CREATE POLICY "Products are updatable by admin" ON products
  FOR UPDATE USING (auth.role() = 'admin');

CREATE POLICY "Products are deletable by admin" ON products
  FOR DELETE USING (auth.role() = 'admin');
```

### **Фаза 3: Миграция данных продуктов**

#### 3.1 Создание сервиса продуктов
- [ ] Создать `lib/services/productService.ts`
- [ ] Реализовать CRUD операции:
  - `getProducts()` - получение всех продуктов
  - `getProductBySlug(slug)` - получение продукта по slug
  - `createProduct(data)` - создание продукта
  - `updateProduct(id, data)` - обновление продукта
  - `deleteProduct(id)` - удаление продукта

#### 3.2 Миграция существующих данных
- [ ] Создать скрипт миграции `scripts/migrate-products.ts`
- [ ] Перенести данные из `lib/data/products.ts` в Supabase
- [ ] Обновить компоненты для использования Supabase

#### 3.3 Обновление админ-панели
- [ ] Заменить статические данные на Supabase запросы
- [ ] Добавить обработку ошибок и состояния загрузки
- [ ] Реализовать реальное создание/редактирование/удаление

### **Фаза 4: Система заказов**

#### 4.1 Создание сервиса заказов
- [ ] Создать `lib/services/orderService.ts`
- [ ] Создать `lib/services/customerService.ts`
- [ ] Реализовать CRUD операции для заказов

#### 4.2 Реализация корзины
- [ ] Создать `lib/services/cartService.ts`
- [ ] Интегрировать с Supabase для сохранения корзины
- [ ] Синхронизация между localStorage и Supabase

#### 4.3 Процесс оформления заказа
- [ ] Форма оформления заказа
- [ ] Валидация данных
- [ ] Сохранение заказа в Supabase
- [ ] Email уведомления

### **Фаза 5: Админ-панель заказов**

#### 5.1 Обновление админ-панели
- [ ] Реальные данные заказов из Supabase
- [ ] Управление статусами заказов
- [ ] Фильтрация и поиск заказов

#### 5.2 Аналитика
- [ ] Дашборд с реальными данными
- [ ] Статистика продаж
- [ ] Отчеты по продуктам

### **Фаза 6: Безопасность и оптимизация**

#### 6.1 Аутентификация
- [ ] Интеграция с Supabase Auth
- [ ] Роли и разрешения
- [ ] Защита админ-панели

#### 6.2 Оптимизация
- [ ] Индексы для быстрого поиска
- [ ] Кэширование данных
- [ ] Пагинация для больших списков

---

## 🛠 Технические детали

### **Структура файлов**
```
lib/
├── supabase/
│   ├── client.ts      # Клиент для браузера
│   ├── server.ts      # Клиент для сервера
│   └── types.ts       # Типы Supabase
├── services/
│   ├── productService.ts
│   ├── orderService.ts
│   ├── customerService.ts
│   └── cartService.ts
└── utils/
    └── supabase-helpers.ts
```

### **Переменные окружения**
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### **Типы TypeScript**
```typescript
// lib/supabase/types.ts
export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>;
      };
      orders: {
        Row: Order;
        Insert: Omit<Order, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Order, 'id' | 'created_at' | 'updated_at'>>;
      };
      // ... другие таблицы
    };
  };
}
```

---

## 📊 Ожидаемые результаты

### **После завершения интеграции**
- ✅ Реальные данные в базе данных
- ✅ Полнофункциональная система заказов
- ✅ Админ-панель с реальными данными
- ✅ Масштабируемая архитектура
- ✅ Безопасность и производительность

### **Метрики успеха**
- Время загрузки страниц < 2 секунд
- 99.9% доступность API
- Безопасность данных (RLS, аутентификация)
- Успешная миграция всех существующих данных

---

## 🚀 Следующие шаги

1. **Начать с Фазы 1** - настройка Supabase проекта
2. **Создать схему БД** - таблицы и политики безопасности
3. **Мигрировать продукты** - перенести существующие данные
4. **Обновить админ-панель** - использовать реальные данные
5. **Реализовать заказы** - полноценная система e-commerce

---

*План создан: 11 августа 2024*  
*Статус: Готов к реализации*
