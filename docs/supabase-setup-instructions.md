# Supabase Setup Instructions

## 🚀 Шаг 1: Создание проекта Supabase

1. Перейдите на [supabase.com](https://supabase.com)
2. Войдите в аккаунт или создайте новый
3. Нажмите "New Project"
4. Выберите организацию
5. Введите название проекта (например: "bowls-ecommerce")
6. Выберите регион (ближайший к вашим пользователям)
7. Введите пароль для базы данных
8. Нажмите "Create new project"

## 🔑 Шаг 2: Получение API ключей

1. В вашем проекте Supabase перейдите в **Settings** → **API**
2. Скопируйте следующие значения:

### Переменные окружения
Создайте файл `.env.local` в корне проекта со следующим содержимым:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Другие переменные
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

**Важно:**
- `NEXT_PUBLIC_SUPABASE_URL` - URL вашего проекта
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - публичный ключ (anon key)
- `SUPABASE_SERVICE_ROLE_KEY` - сервисный ключ (service role key) - **НЕ ПУБЛИКУЙТЕ ЕГО**

## 🗄️ Шаг 3: Создание таблиц

После получения ключей, переходите к следующему шагу - созданию схемы базы данных.

## ⚠️ Безопасность

- Никогда не коммитьте `.env.local` в Git
- Добавьте `.env.local` в `.gitignore`
- Сервисный ключ имеет полные права доступа - храните его в секрете

---

*Инструкции созданы: 11 августа 2024*
