# 🚀 Deployment Guide

## Checklist перед деплоем:

### 1. Изображения
- [ ] Добавить `/public/images/hero-background.jpg`
- [ ] Добавить `/public/images/logo.svg`
- [ ] Добавить `/public/images/app-store-badge.svg`
- [ ] Добавить `/public/images/og-image.jpg` (1200×1200)
- [ ] Добавить `/public/favicon.ico`
- [ ] Добавить `/public/apple-touch-icon.png` (180×180)
- [ ] Добавить `/public/images/icon-192.png`
- [ ] Добавить `/public/images/icon-512.png`

См. инструкцию: `IMAGES_NEEDED.md`

---

### 2. Локальное тестирование

```bash
# Установить зависимости (если еще не установлены)
npm install

# Запустить dev сервер
npm run dev

# Открыть http://localhost:3000
```

**Что проверить:**
- ✅ Главная страница отображается корректно
- ✅ Все ссылки в футере работают (terms, support, FAQ)
- ✅ Страница About открывается
- ✅ 404 страница работает (открой несуществующий URL)
- ✅ Responsive дизайн на мобильных (320px+)
- ✅ Контрастность текста (белый на темном фоне)

---

### 3. Production Build

```bash
# Собрать production версию
npm run build

# Запустить production сервер локально
npm start
```

**Проверить:**
- Нет ошибок при сборке
- Все страницы генерируются корректно
- Sitemap доступен: http://localhost:3000/sitemap.xml
- Manifest доступен: http://localhost:3000/manifest.json

---

### 4. Environment Variables в Vercel

Добавить в Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

### 5. Git & Deploy

```bash
# Создать ветку (если еще не создана)
git checkout -b landing-page

# Добавить все изменения
git add .

# Коммит
git commit -m "feat: add landing page with hero section and subpages"

# Push в GitHub
git push origin landing-page

# Создать Pull Request в GitHub
# Или сразу merge в main для автодеплоя
```

---

### 6. Vercel автодеплой

После push в `main`:
1. Vercel автоматически обнаружит изменения
2. Запустится build
3. Деплой на production: `noto-web.vercel.app`

**Следить за деплоем:**
- Открыть Vercel Dashboard
- Смотреть логи в реальном времени
- Проверить что билд прошел успешно

---

### 7. Настройка домена noto.place

В Vercel Dashboard:
1. Settings → Domains
2. Add Domain: `noto.place` и `www.noto.place`
3. Добавить DNS записи у регистратора домена:

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

4. Дождаться propagation (5-30 минут)
5. Проверить: https://noto.place

---

### 8. Проверка после деплоя

**Open Graph метаданные:**
- https://www.opengraph.xyz/ → ввести `https://noto.place`
- https://cards-dev.twitter.com/validator
- https://developers.facebook.com/tools/debug/

**SEO:**
- https://search.google.com/search-console → добавить сайт
- Отправить sitemap: `https://noto.place/sitemap.xml`

**Universal Links (AASA):**
```bash
curl -I https://noto.place/.well-known/apple-app-site-association
# Должен вернуть: 200 OK
# Content-Type: application/json
```

**Accessibility:**
- https://wave.webaim.org/ → проверить контрастность
- Требование: WCAG AA (контраст > 4.5:1)

---

### 9. Performance оптимизация

После деплоя проверить:
- **Lighthouse** в Chrome DevTools (Performance, SEO, Accessibility)
- Целевые метрики:
  - Performance: 90+
  - Accessibility: 95+
  - SEO: 100

**Если медленно:**
- Оптимизировать hero-background.jpg (сжать с качеством 80-85%)
- Использовать WebP формат для изображений
- Включить Vercel Image Optimization (автоматически)

---

### 10. Мониторинг

Включить в Vercel:
- **Analytics** — посещаемость и Core Web Vitals
- **Speed Insights** — производительность страниц
- **Web Analytics** — поведение пользователей

---

## 🎯 Готово к деплою!

Когда все чекбоксы отмечены:
1. Push в main
2. Дождаться автодеплоя
3. Проверить https://noto.place
4. Тестировать Universal Links на iOS устройстве

---

## 📝 TODO после деплоя:

- [ ] Проверить OG метаданные в соцсетях
- [ ] Отправить сайт в Google Search Console
- [ ] Протестировать Universal Links на реальном iPhone
- [ ] Обновить App Store Review с ссылкой на noto.place
- [ ] Добавить Google Analytics (опционально)









