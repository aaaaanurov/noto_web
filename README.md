# Noto Web

Web frontend для Noto - система Deep Links и OG метаданных.

## 🚀 Связанные проекты

- [noto-ios](https://github.com/antonyanurov/noto) - iOS приложение

## 🏗️ Технологии

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (публичный доступ к данным)
- **Vercel OG** (генерация OG изображений)

## 📋 Функциональность

1. **Universal Links** - автоматическое открытие iOS приложения
2. **OG метаданные** - красивый preview в мессенджерах
3. **Динамические страницы**:
   - `/profile/[username]` - просмотр профиля
   - `/wishlist/[token]` - просмотр вишлиста
4. **Apple App Site Association** (AASA)

## 🛠️ Setup

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка переменных окружения

Скопируйте `.env.example` в `.env.local`:

```bash
cp .env.example .env.local
```

Заполните значения из Supabase Dashboard:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Запуск dev сервера

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## 📁 Структура проекта

```
noto-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Главная страница
│   │   ├── profile/
│   │   │   └── [username]/
│   │   │       └── page.tsx        # Динамическая страница профиля
│   │   ├── wishlist/
│   │   │   └── [token]/
│   │   │       └── page.tsx        # Динамическая страница вишлиста
│   │   └── api/
│   │       └── og/
│   │           ├── profile/
│   │           │   └── route.ts    # API генерации OG для профиля
│   │           └── wishlist/
│   │               └── route.ts    # API генерации OG для вишлиста
│   └── lib/
│       └── supabase.ts             # Supabase клиент
├── public/
│   └── .well-known/
│       └── apple-app-site-association  # AASA для Universal Links
└── package.json
```

## 🔗 Deep Links

### Custom URL Scheme (iOS)
```
noto://profile/username
noto://wishlist/token
```

### Universal Links
```
https://noto.space/profile/username
https://noto.space/wishlist/token
```

## 🧪 Тестирование OG метаданных

1. **Open Graph Validator**: https://www.opengraph.xyz/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **Facebook Debugger**: https://developers.facebook.com/tools/debug/

## 🚀 Деплой на Vercel

### Автоматический деплой

1. Создайте репозиторий на GitHub
2. Подключите к Vercel: https://vercel.com/new
3. Добавьте Environment Variables (`.env.local`)
4. Каждый push в `main` → автоматический деплой

### Настройка домена

1. Vercel → Settings → Domains
2. Добавьте `noto.space`
3. Настройте DNS записи

## 📝 TODO

- [x] Базовая структура Next.js
- [x] Supabase клиент
- [ ] Динамические страницы (profile, wishlist)
- [ ] OG метаданные (generateMetadata)
- [ ] API для генерации OG изображений
- [ ] AASA файл для Universal Links
- [ ] Деплой на Vercel
- [ ] Настройка домена noto.space

## 📄 Лицензия

Private project

