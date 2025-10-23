# 🚀 Настройка Vercel для Noto Web

## Шаг 1: Привязать репозиторий (✅ Сделано)

Вы уже привязали GitHub репозиторий к Vercel - отлично!

---

## Шаг 2: Настроить Environment Variables

В Vercel Dashboard:

1. Перейдите в **Settings** → **Environment Variables**
2. Добавьте следующие переменные:

### Production + Preview + Development:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
```
Где взять: Supabase Dashboard → Settings → API → Project URL

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```
Где взять: Supabase Dashboard → Settings → API → Project API keys → anon public

```
NEXT_PUBLIC_APP_URL=https://noto.space
```
Для production. Для preview можно оставить как есть.

**Важно:** Выберите все три окружения (Production, Preview, Development) для каждой переменной!

---

## Шаг 3: Redeploy проекта

После добавления переменных:

1. Перейдите в **Deployments**
2. Нажмите на последний деплой
3. Нажмите три точки (⋯) → **Redeploy**
4. Подтвердите

---

## Шаг 4: Настроить домен `noto.space`

### Вариант A: Домен уже куплен

1. В Vercel → **Settings** → **Domains**
2. Нажмите **Add Domain**
3. Введите `noto.space`
4. Vercel покажет DNS записи для настройки

### DNS записи (пример):

Перейдите в панель управления вашего регистратора (например, Namecheap, GoDaddy):

```
Type: A
Name: @
Value: 76.76.21.21
```

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Важно:** Также настройте:
```
Type: CNAME
Name: _acme-challenge
Value: [значение от Vercel для SSL]
```

### Вариант B: Домен еще не куплен

Рекомендуемые регистраторы:
- **Namecheap** (дешево)
- **Cloudflare** (лучший DNS)
- **Google Domains** (удобно)

Цена: ~$10-15/год

---

## Шаг 5: Настроить SSL (автоматически)

Vercel автоматически создаст SSL сертификат через Let's Encrypt после настройки DNS.

Это может занять 5-30 минут.

---

## Шаг 6: Обновить AASA файл

В файле `public/.well-known/apple-app-site-association` замените:

```json
"appID": "YOUR_TEAM_ID.com.noto.app"
```

На ваш реальный App ID:

1. Откройте Xcode → Проект Noto
2. Перейдите в **Signing & Capabilities**
3. Найдите **Team ID** (например, `AB1CD2EF34`)
4. Найдите **Bundle Identifier** (например, `com.noto.app`)
5. Соедините: `AB1CD2EF34.com.noto.app`

Обновите файл и закоммитьте:

```bash
cd /Users/antonyanurov/Documents/noto-web
git add public/.well-known/apple-app-site-association
git commit -m "Update AASA with real App ID"
git push
```

Vercel автоматически передеплоит.

---

## Шаг 7: Проверить AASA файл

После деплоя проверьте:

```bash
curl -I https://noto.space/.well-known/apple-app-site-association
```

**Должно быть:**
- Status: `200 OK`
- Content-Type: `application/json`

Или проверьте в браузере: https://noto.space/.well-known/apple-app-site-association

---

## Шаг 8: Добавить домен в iOS приложение

В Xcode:

1. Откройте проект Noto
2. **Target Noto** → **Signing & Capabilities**
3. Нажмите **+ Capability** → **Associated Domains**
4. Добавьте домены:
   ```
   applinks:noto.space
   applinks:www.noto.space
   ```

5. Пересоберите и запустите приложение

---

## Шаг 9: Тестирование

### Тест 1: Проверить Web страницы

```
https://noto.space/
https://noto.space/profile/testuser
https://noto.space/wishlist/ABC123
```

### Тест 2: Проверить OG изображения

```
https://noto.space/api/og/profile?username=testuser
https://noto.space/api/og/wishlist?token=ABC123
```

### Тест 3: Проверить Universal Links (на устройстве)

1. Отправьте себе ссылку в Messages:
   ```
   https://noto.space/profile/testuser
   ```
2. Кликните → должно открыться iOS приложение

### Тест 4: Проверить OG метаданные

https://www.opengraph.xyz/ → вставьте ссылку

---

## 🎉 Готово!

Теперь у вас работает:

- ✅ Web frontend на `noto.space`
- ✅ OG метаданные для красивого preview
- ✅ Universal Links для автоматического открытия приложения
- ✅ AASA файл для iOS
- ✅ SSL сертификат
- ✅ Автоматический деплой при push в GitHub

---

## 🐛 Troubleshooting

### AASA не работает

1. Проверьте что файл доступен без редиректов (301/302)
2. Проверьте Content-Type: application/json
3. Подождите 24 часа (iOS кэширует AASA)
4. Удалите и переустановите приложение

### OG изображения не показываются

1. Проверьте что URL публичный (200 OK)
2. Проверьте размер < 5MB
3. Очистите кэш в валидаторах
4. Проверьте CORS headers

### Environment Variables не работают

1. Проверьте что переменные начинаются с `NEXT_PUBLIC_`
2. Redeploy после добавления переменных
3. Проверьте в логах деплоя

---

## 📞 Полезные ссылки

- Vercel Dashboard: https://vercel.com/dashboard
- Supabase Dashboard: https://supabase.com/dashboard
- OG Validator: https://www.opengraph.xyz/
- AASA Validator: https://branch.io/resources/aasa-validator/
- Twitter Card Validator: https://cards-dev.twitter.com/validator

