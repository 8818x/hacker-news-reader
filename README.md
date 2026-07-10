# Hacker News Reader

A minimal Hacker News reader built with [Next.js](https://nextjs.org) (App Router), [React](https://react.dev) 19, and [Tailwind CSS](https://tailwindcss.com) v4. Fetches live data from the [HN Firebase API](https://github.com/HackerNews/API) — no database, no build-time caching, every request hits the wire fresh.

## Features

- **Top 10 stories** on the home page with title, author, score, and comment count
- **Story detail pages** (`/story/[id]`) with original article link and top 5 comments
- **Dynamic metadata** — per-story `<title>` via `generateMetadata`
- **Skeleton and spinner** loading states on both routes
- **Responsive** — adapts from mobile to desktop

## Getting started

```bash
git clone https://github.com/8818x/hacker-news-reader.git
cd hacker-news-reader
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4, @tailwindcss/typography |
| Fonts | Geist Sans + Geist Mono |
| API | Hacker News Firebase (`hacker-news.firebaseio.com/v0`) |

## Project structure

```
src/
  app/
    page.tsx              # Home — top 10 stories
    loading.tsx           # Skeleton loader
    story/[id]/page.tsx   # Story detail + comments
  app/globals.css         # Tailwind import
lib/
  hnApi.ts                # HN API client (topStoryIds, fetchItem, fetchStories)
types/
  story.ts                # Story interface
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |

## License

[MIT](LICENSE) — © 2025 Amane
