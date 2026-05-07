# Training Plan App — Claude Reference

## What this is
An 11-week cycling training plan tracker for a 117-mile ride on 25 July 2026 (Dunwich Dynamo). Built as a PWA so it can be saved to the phone home screen and used like a native app.

## Tech stack
- **Vite + React** (JSX, no TypeScript)
- All styles are **inline styles + a `<style>` tag** injected in the component — no CSS files, no Tailwind
- Fonts: `Syne` (headings, via Google Fonts) + `DM Sans` (body, via Google Fonts)
- Single component: `training-calendar.jsx` in the project root (not in `src/`)
- `src/main.jsx` just mounts the component

## Key npm scripts
```
npm run dev          # local dev server
npm run dev:host     # exposes on local network (for testing on phone)
npm run build        # production build
npm run generate-icons  # regenerates PWA icons from scripts/generate-icons.mjs
```

## Project structure
```
training-calendar.jsx   # the entire app lives here
src/main.jsx            # entry point, just mounts TrainingCalendar
public/
  manifest.webmanifest  # PWA manifest
  icon-192.png          # PWA icon (Android)
  icon-512.png          # PWA icon (Android large)
  apple-touch-icon.png  # iOS home screen icon
scripts/
  generate-icons.mjs    # regenerates PNGs using @resvg/resvg-js
index.html              # includes all PWA meta tags
```

## PWA setup
- Manifest is at `/manifest.webmanifest`, linked from `index.html`
- Icons are white bike silhouette on Strava orange (#FC4C02), generated as SVG paths (no emoji font needed)
- `apple-touch-icon.png` is 180×180, used by iOS Safari "Add to Home Screen"
- `display: standalone` — no browser chrome when launched from home screen
- To install on iPhone: open in Safari → Share → Add to Home Screen
- To test on phone: `npm run dev:host` then open the network URL in Safari

## Design system
- **Page background:** `#F2F1ED` (warm off-white)
- **Card background:** `#FFFFFF`
- **Card border:** `#E4E2DD`
- **Primary text:** `#1A1917`
- **Secondary text:** `#6B6860`
- **Muted text:** `#A09D96`
- **Zwift/bike sessions:** `#1D4ED8` (blue)
- **Outdoor rides:** `#16A34A` (green)
- **Running:** `#7C3AED` (purple)
- **Race day:** `#DC2626` (red)
- **Rest:** `#B45309` (amber)

## Features built so far
1. **Week cards** — collapsible, show session dot indicators (filled = done, outlined = todo)
2. **Session completion** — tap any session row to mark done/undone, persisted to `localStorage`
3. **Progress bar** — shows overall % complete across all sessions
4. **Current week detection** — uses `start`/`end` dates on each week object, compared against `new Date()`. Current week gets a blue "THIS WEEK" banner + border and auto-expands on load. Past weeks are dimmed to 55% opacity but remain fully interactive.
5. **PWA** — installable to phone home screen with custom icon

## Data shape
Each week in the `weeks` array has:
```js
{
  week: 1,
  start: "2026-05-05",  // ISO date — used for current week detection
  end: "2026-05-11",
  dates: "5–11 May",    // display string
  theme: "Wake Up the Legs",
  sessions: [
    { day: "Tue", type: "bike"|"run"|"ride"|"rest"|"event", label: "...", detail: "..." }
  ]
}
```

## Deployment
- Hosted via Coolify, deployed from GitHub (`main` branch)
- Current branch for in-progress work: `feature/pwa`
- Uncommitted changes from this session still need to be committed and pushed
