<div align="center">

# 🏎️ MILLION MILES

### Premium Car Search & Delivery Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?style=for-the-badge&logo=vercel)](https://vercel.com/)

<br/>

**Live-парсинг корейского авторынка [Encar.com](https://www.encar.com) с автообновлением каждые 6 часов.**
<br/>
Современный каталог автомобилей в стиле premium автосалона — тёмная тема, золотые акценты, адаптивный дизайн.

<br/>

[🚀 **Live Demo**](#) · [📋 Задание](#-тестовое-задание) · [⚡ Быстрый старт](#-быстрый-старт) · [🏗️ Архитектура](#️-архитектура)

</div>

---

## ✨ Превью

<div align="center">

### 🖥️ Desktop

```
┌──────────────────────────────────────────────────────────────┐
│  MILLION MILES      Cars  Services  Expert  About   🇬🇧 USD │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│          PREMIUM SERVICE FOR THE SEARCH                      │
│          AND DELIVERY OF ANY VEHICLES                        │
│                                                              │
│            [ CONTACT US ]                                    │
│                                                              │
│     14,523 Cars sold    19 Experts    from 2 Weeks delivery  │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  🔍 Find your dream car                                     │
│  [Search...] [Sort ▾] [Year From ▾] [Year To ▾]             │
├──────────────────────────────────────────────────────────────┤
│  Found 1,000 vehicles                                       │
│                                                              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                        │
│  │  📷     │ │  📷     │ │  📷     │                        │
│  │ Hyundai │ │ Kia     │ │ Genesis │                        │
│  │ $18,500 │ │ $22,000 │ │ $35,000 │                        │
│  │[DETAILS]│ │[DETAILS]│ │[DETAILS]│                        │
│  └─────────┘ └─────────┘ └─────────┘                        │
│                                                              │
│  ← 1  2  3  4  5  ...  50 →                                 │
├──────────────────────────────────────────────────────────────┤
│              OUR SERVICES                                    │
│  ┌────────┐┌────────┐┌────────┐┌────────┐                   │
│  │Import  ││Logistic││Find Car││Sell Car│                   │
│  │& Export││Services││        ││        │                   │
│  └────────┘└────────┘└────────┘└────────┘                   │
│  ┌────────┐┌────────┐┌────────┐┌────────┐                   │
│  │Insurnce││ Lease  ││Register││Detailng│                   │
│  └────────┘└────────┘└────────┘└────────┘                   │
├──────────────────────────────────────────────────────────────┤
│  MILLION MILES  📷📘🎵▶  © 2026 MILLION MILES               │
└──────────────────────────────────────────────────────────────┘
```

### 📱 Mobile

```
┌────────────────────┐
│ MILLION MILES   ☰  │
├────────────────────┤
│                    │
│  PREMIUM SERVICE   │
│  FOR THE SEARCH    │
│  AND DELIVERY OF   │
│  ANY VEHICLES      │
│                    │
│  [ CONTACT US ]    │
│                    │
│  14,523  19  2wks  │
├────────────────────┤
│ 🔍 Search...       │
│ [Sort ▾] [Year ▾]  │
├────────────────────┤
│ ┌────────────────┐ │
│ │     📷         │ │
│ │ Hyundai Tucson │ │
│ │ $18,500        │ │
│ │ [VIEW DETAILS] │ │
│ └────────────────┘ │
│ ┌────────────────┐ │
│ │     📷         │ │
│ │ Kia Sportage   │ │
│ │ $22,000        │ │
│ │ [VIEW DETAILS] │ │
│ └────────────────┘ │
└────────────────────┘
```

</div>

---

## 📋 Тестовое задание

> **Парсинг ENCAR + Landing Page**
> Собрать данные с encar.com (марка, модель, год, пробег, цена, фото), вывести в виде каталога с карточками.
> Ориентир по UX: [millionmiles.ae](https://millionmiles.ae/)

### ✅ Что реализовано

| Требование | Статус | Детали |
|:---|:---:|:---|
| Парсинг Encar.com | ✅ | API-парсинг + fallback HTML (BeautifulSoup/fetch) |
| Данные: марка, модель, год, пробег, цена, фото | ✅ | + трансмиссия, топливо, badge, URL |
| Хранение данных | ✅ | JSON + in-memory cache |
| Обновление 1 раз в сутки | ✅ | Vercel Cron каждые 6 часов |
| Landing page с карточками | ✅ | Hero + каталог + услуги + footer |
| Адаптивность | ✅ | Desktop / Tablet / Mobile |
| Быстрый отклик | ✅ | SSR + in-memory cache + lazy load |
| Аккуратный код | ✅ | TypeScript, ESLint, модульная архитектура |
| Деплой | ✅ | Vercel (zero-config) |

### 🎁 Бонусы (сверх задания)

- 🎨 **Premium тёмная тема** в стиле millionmiles.ae (золото + чёрный)
- 🔄 **Live-скрейпинг** прямо на Vercel через Serverless Functions
- 🔍 **Поиск + фильтры** (марка, модель, год, сортировка)
- 📄 **Пагинация** с навигацией по страницам
- 🏷️ **Перевод** корейских данных (марки, топливо, КПП → English)
- 💱 **Конвертация цен** KRW → USD
- 📱 **Burger-меню** на мобиле с fullscreen overlay
- ✨ **Анимации** — счётчики, fade-in, hover-эффекты, scale
- 🎯 **8 карточек услуг** с hover-анимациями
- 🌐 **Dropdown-навигация** — Services, About Us
- 🔗 **Соцсети** — Instagram, Facebook, TikTok, YouTube

---

## ⚡ Быстрый старт

```bash
# 1. Клонировать
git clone https://github.com/YOUR_USERNAME/encar-catalog.git
cd encar-catalog/frontend

# 2. Установить зависимости
npm install

# 3. Запустить dev-сервер
npm run dev

# → Открыть http://localhost:3000
```

### 📦 Production build

```bash
npm run build
npm start
```

---

## 🏗️ Архитектура

```
                    ┌─────────────────────────────────┐
                    │          Vercel Cloud            │
                    │                                  │
  Пользователь ────▶│  ┌──────────┐   ┌────────────┐  │
                    │  │ Next.js  │   │  Serverless │  │
                    │  │   SSR    │   │  Functions  │  │
                    │  │  (React) │   │             │  │
                    │  └────┬─────┘   └──────┬──────┘  │
                    │       │                │         │
                    │       ▼                ▼         │
                    │  ┌─────────┐    ┌───────────┐   │
                    │  │/api/cars│    │/api/scrape│   │
                    │  │ Filter  │    │  Парсинг  │   │
                    │  │ Sort    │    │ Encar.com │   │
                    │  │ Search  │    │ каждые 6ч │   │
                    │  └────┬────┘    └─────┬─────┘   │
                    │       │               │         │
                    │       ▼               ▼         │
                    │    ┌──────────────────┐          │
                    │    │   Memory Cache   │          │
                    │    │   + cars.json    │          │
                    │    └──────────────────┘          │
                    └─────────────────────────────────┘
                                    │
                                    ▼
                    ┌─────────────────────────────────┐
                    │      api.encar.com (source)     │
                    │   1000 автомобилей (5 страниц)  │
                    └─────────────────────────────────┘
```

### Как работает парсинг:

1. **`/api/scrape`** — вызывается Vercel Cron каждые 6 часов
2. Делает запросы к `api.encar.com/search/car/list/general` (5 страниц по 200)
3. Переводит корейские данные → English (марки, топливо, КПП)
4. Конвертирует цены: 만원 (10,000 KRW) → USD
5. Сохраняет в memory cache → доступно через `/api/cars`
6. Fallback: `cars.json` (baseline данные, всегда доступны при cold start)

---

## 🛠️ Стек технологий

<div align="center">

| Категория | Технология | Назначение |
|:---|:---|:---|
| ⚛️ **Framework** | Next.js 14 (App Router) | SSR, API Routes, File-based routing |
| 📘 **Language** | TypeScript 5.7 | Строгая типизация |
| 🎨 **Styling** | Tailwind CSS 3.4 | Utility-first CSS |
| 🔄 **State** | Zustand 5 | Lightweight state management |
| 📡 **Data Fetching** | TanStack Query 5 | Cache, refetch, loading states |
| 🕷️ **Scraping** | Native fetch + JSON API | Парсинг Encar.com |
| 🌐 **Fonts** | Montserrat + Lato | Premium типографика |
| 🚀 **Deploy** | Vercel | Serverless, Edge, Cron Jobs |

</div>

---

## 📁 Структура проекта

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + meta + fonts
│   │   ├── page.tsx            # Главная страница
│   │   ├── globals.css         # Тема: золото + чёрный
│   │   └── api/
│   │       ├── cars/route.ts   # GET /api/cars — каталог с фильтрами
│   │       └── scrape/route.ts # GET /api/scrape — парсинг Encar
│   ├── components/
│   │   ├── Header.tsx          # Sticky header + dropdowns + мобиле
│   │   ├── Hero.tsx            # Fullscreen hero + счётчики
│   │   ├── Filters.tsx         # Поиск + сортировка + год
│   │   ├── CarCard.tsx         # Карточка авто + hover-эффекты
│   │   ├── CarGrid.tsx         # Сетка карточек + loading
│   │   ├── Pagination.tsx      # Навигация по страницам
│   │   ├── Services.tsx        # 8 карточек услуг
│   │   ├── Footer.tsx          # Футер + соцсети + контакты
│   │   └── Providers.tsx       # React Query провайдер
│   ├── lib/
│   │   ├── api.ts              # Fetch-функции для клиента
│   │   ├── types.ts            # TypeScript интерфейсы
│   │   ├── scraper.ts          # 🕷️ Парсер Encar API
│   │   ├── translations.ts     # 🇰🇷→🇬🇧 Переводы
│   │   └── store.ts            # Memory cache + JSON fallback
│   └── store/
│       └── useFiltersStore.ts  # Zustand: фильтры каталога
├── public/data/cars.json       # Baseline данные (1000 авто)
├── tailwind.config.ts          # Цвета: gold, card, primary
├── next.config.js              # Images: ci.encar.com
└── package.json
```

---

## 🎨 Дизайн-система

<div align="center">

| Элемент | Цвет | Hex |
|:---|:---|:---|
| 🖤 Фон основной | Почти чёрный | `#0a0a0a` |
| ⬛ Фон карточек | Тёмно-серый | `#141414` |
| 🥇 Акцент | Золотой | `#c9a84c` |
| ⬜ Текст основной | Белый | `#ffffff` |
| 🔘 Текст второстепенный | Серый | `#888888` |
| ➖ Разделители | Тёмный | `#222222` |
| ✨ Hover | Светлое золото | `#d4b55a` |

</div>

**Типографика:**
- Заголовки: **Montserrat 700** — uppercase, letter-spacing 0.05em
- Тело: **Lato 400** — 16px, smooth rendering
- Кнопки: **uppercase** — letter-spacing 0.1em

---

## 🔌 API Endpoints

### `GET /api/cars`

Каталог с фильтрацией, сортировкой, пагинацией.

| Параметр | Тип | По умолчанию | Описание |
|:---|:---|:---|:---|
| `page` | int | 1 | Страница |
| `limit` | int | 20 | Кол-во на странице (max 100) |
| `search` | string | — | Поиск по марке/модели |
| `sort` | string | price_asc | price_asc, price_desc, year_desc, year_asc, mileage_asc |
| `year_from` | int | — | Год от |
| `year_to` | int | — | Год до |
| `price_from` | int | — | Цена от (万원) |
| `price_to` | int | — | Цена до (万원) |

```json
// Response
{
  "total": 1000,
  "page": 1,
  "limit": 20,
  "cars": [
    {
      "id": 41702556,
      "manufacturer": "Hyundai",
      "model": "Tucson",
      "badge": "Modern",
      "year": 2023,
      "mileage": 15000,
      "price": 2800,
      "price_display": "$207,407",
      "fuel": "Gasoline",
      "transmission": "Automatic",
      "photo": "https://ci.encar.com/carpicture/...",
      "url": "https://www.encar.com/dc/dc_cardetailview.do?carid=41702556"
    }
  ]
}
```

### `GET /api/scrape`

Ручной / cron-запуск парсинга Encar.com.

```json
// Response
{ "status": "ok", "count": 1000, "updated_at": "2026-04-01T12:00:00Z" }
```

---

## 🚀 Деплой на Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/encar-catalog&root-directory=frontend)

### Ручной деплой

```bash
# 1. Установить Vercel CLI
npm i -g vercel

# 2. Деплой из папки frontend
cd frontend
vercel

# 3. На вопросы:
#    Root Directory → ./  (мы уже в frontend)
#    Framework → Next.js (автоопределение)
```

### Переменные окружения (опционально)

| Variable | Description |
|:---|:---|
| `CRON_SECRET` | Секрет для защиты /api/scrape от внешних вызовов |

### Cron Jobs

Автоматический парсинг настроен в `vercel.json`:
```json
{ "crons": [{ "path": "/api/scrape", "schedule": "0 */6 * * *" }] }
```
> ⏰ Каждые 6 часов данные обновляются автоматически.

---

## 🎯 Ключевые особенности

<table>
<tr>
<td width="50%">

### 🕷️ Smart Scraping
- Парсинг через API Encar.com (быстрее и надёжнее HTML)
- Автоматический перевод 70+ марок с корейского
- Fallback на HTML-парсинг при сбое API
- Конвертация цен KRW → USD

</td>
<td width="50%">

### ⚡ Performance
- Server-Side Rendering через Next.js
- In-memory cache для мгновенных ответов
- Lazy loading изображений
- Оптимизированная пагинация

</td>
</tr>
<tr>
<td>

### 🎨 Premium Design
- Тёмная тема (millionmiles.ae style)
- Золотые акценты `#c9a84c`
- Montserrat + Lato шрифты
- Animated counters, hover effects
- Sticky header с blur-on-scroll

</td>
<td>

### 📱 Responsive
- Desktop: 3 колонки каталога
- Tablet: 2 колонки
- Mobile: 1 колонка + burger-menu
- Touch-friendly всё

</td>
</tr>
</table>

---

## 📜 Лицензия

MIT © 2026

---

<div align="center">

**Сделано с ❤️ и ☕**

*Тестовое задание • Web-разработчик*

</div>
