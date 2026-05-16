# F1Flow Database Layer

This project is currently a static HTML/CSS/JS app. `database.js` adds a browser database adapter using `localStorage`, so the app has a background data layer now and can later be swapped for a real API.

## Current setup

- `database.js` seeds and persists app data in the browser.
- `app.js` calls `window.F1FlowDatabase.getState(defaults)` and `setState(state)`.
- `database/schema.sql` defines a relational schema for a future hosted backend.

## GitHub path

If you deploy with GitHub Pages, keep `database.js` for local persistence. GitHub Pages cannot run a private server-side database by itself.

For a real shared database, use one of these:

- Supabase or Neon for PostgreSQL using `database/schema.sql`.
- Firebase for a serverless document database.
- A small Node/Express API hosted on Render, Railway, Fly.io, or Vercel.

## Next backend step

Replace the methods inside `F1FlowDatabase`:

- `load()`
- `save(database)`
- `getState(defaults)`
- `setState(state)`

with `fetch()` calls to your backend while keeping the rest of `app.js` mostly unchanged.
