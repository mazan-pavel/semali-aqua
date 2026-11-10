# SEMALI AQUA

Лендинг детейлинг-студии и мойки автомобилей в Минске (ООО «Авто Семали»).

- Сайт: [semali-aqua.by](https://semali-aqua.by/)
- Адрес: Минск, ул. Могилёвская, 39Б
- Телефон: +375 (29) 317-08-08

## Стек

- Vue 3 + TypeScript
- Vite 6
- Статический деплой (`npm run build` → `dist/`)

## Быстрый старт

```bash
npm install
npm run dev
```

Сборка и локальный просмотр продакшен-бандла:

```bash
npm run build
npm run preview
```

## Структура

```
src/
  components/   # секции страницы (Hero, VIP, услуги, до/после, контакты…)
  data/         # контент и цены: brand, services, beforeAfter
  style.css     # дизайн-токены и глобальные стили
public/         # статичные ассеты, robots.txt, sitemap.xml
index.html      # SEO meta, Open Graph, JSON-LD
```

Контент и цены правятся в `src/data/`:

| Файл | Что внутри |
|------|------------|
| `brand.ts` | название, адрес, телефон, соцсети, карты |
| `services.ts` | услуги, цены по типу кузова |
| `beforeAfter.ts` | кейсы «до / после» и пути к изображениям |

Изображения и видео лежат в `public/assets/images/`.

## Индексация

Сейчас сайт **закрыт** для поисковиков до запуска:

- `public/robots.txt` — `Disallow: /`
- `index.html` — `<meta name="robots" content="noindex, nofollow" />`

Перед открытием индексации:

1. В `robots.txt` заменить на `Allow: /` и раскомментировать Sitemap.
2. Убрать meta `noindex, nofollow` из `index.html`.

## Деплой

1. `npm run build`
2. Отдать содержимое `dist/` на хостинг (nginx, Cloudflare Pages, Netlify и т.п.).
3. Домен: `https://semali-aqua.by/`

`dist/` в git не коммитится.
