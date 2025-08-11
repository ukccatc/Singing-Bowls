# 🚀 Быстрый деплой на Netlify - Пошаговая инструкция

## Шаг 1: Войдите в Netlify
1. Откройте [app.netlify.com](https://app.netlify.com)
2. Нажмите "Log in with GitHub"
3. Авторизуйтесь через GitHub

## Шаг 2: Создайте новый сайт
1. Нажмите кнопку **"New site from Git"** (большая зеленая кнопка)
2. Выберите **"GitHub"** как провайдер
3. Выберите репозиторий **"ukccatc/Singing-Bowls"**

## Шаг 3: Настройте сборку
В полях ввода укажите:
- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Base directory:** (оставьте пустым)

## Шаг 4: Нажмите "Deploy site"
Netlify начнет сборку и деплой вашего сайта.

## Шаг 5: Дождитесь завершения
Сборка займет 2-3 минуты. Вы увидите:
- ✅ Build successful
- 🌐 Ваш сайт будет доступен по URL типа: `https://random-name.netlify.app`

## Шаг 6: Настройте переменные окружения (опционально)
Если у вас есть Supabase:
1. Перейдите в **Site settings** → **Environment variables**
2. Добавьте:
   ```
   NEXT_PUBLIC_SUPABASE_URL=ваш_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_ключ
   ```

## 🎉 Готово!
Ваш сайт теперь доступен по адресу, который покажет Netlify.

### 📱 Что можно посмотреть:
- Главная: `https://your-site.netlify.app/en`
- Магазин: `https://your-site.netlify.app/en/shop`
- Блог: `https://your-site.netlify.app/en/blog`
- Админка: `https://your-site.netlify.app/admin`

### 🔄 Автоматические обновления
Каждый push в main ветку будет автоматически деплоить обновления.
