# NIVRITI — A Little World Made for You

An immersive, story-driven birthday experience built with the MERN stack.
A tiny interactive miniature world where every object tells a little story.

Built by Dhruv for Nivriti · birthday October 14.

---

## What's inside

```
Nivriti Birthday Web/
├── client/        # React + Vite frontend (the experience)
│   ├── src/
│   │   ├── components/   Intro, MiniatureWorld, Character, InteractiveObjects,
│   │   │                 PerfumeBoutique, Tiramisu, Letter, FinalUniverse, UI
│   │   ├── hooks/        useContent, useReducedMotion, useAmbient
│   │   ├── data/         local fallback content (mirrors the server)
│   │   └── styles/       design tokens + global styles
│   └── .env.example
├── server/        # Express + Mongoose REST API
│   ├── src/
│   │   ├── config/       db connection (+ graceful fallback)
│   │   ├── controllers/  content controller
│   │   ├── models/       Birthday, WorldObject, Fragrance
│   │   ├── routes/       /api/*
│   │   ├── data/         canonical content (source of truth)
│   │   └── scripts/      seed.js
│   ├── test/      API route tests (node:test + supertest)
│   └── .env.example
└── README.md
```

## The journey

1. **The Secret Invitation** — terminal-style boot sequence revealing her name.
2. **The Miniature World** — an isometric cozy room + garden under a night sky.
3. **Interactive discoveries** — sunflower, evil eye, earphones, charger, chocolates.
4. **The Perfume Boutique** — three fictional fragrances, with a signature N°14.
5. **The Tiramisu Reveal** — a playful recipe and a warm reveal.
6. **The Letter** — a hand-written note that opens from a sealed envelope.
7. **The Final Universe** — the room drifts into a glowing little world in a globe.
8. **A hidden developer's note** — tucked away for the curious.

---

## Requirements

- Node.js **18+** (built and tested on Node 22)
- npm
- (Optional) A MongoDB connection string — MongoDB Atlas works great.
  Without one, the app runs in **fallback mode** using bundled seed content,
  so you can develop and even deploy the full experience with no database.

## Quick start (local)

Open two terminals.

**1. Backend**

```bash
cd server
npm install
cp .env.example .env        # then edit .env (optional: add MONGODB_URI)
npm run dev                 # http://localhost:5000
```

**2. Frontend**

```bash
cd client
npm install
cp .env.example .env        # leave VITE_API_BASE empty for local dev
npm run dev                 # http://localhost:5173
```

Vite proxies `/api` to the backend, so no CORS setup is needed in dev.

### Seeding MongoDB (optional)

If you set `MONGODB_URI` in `server/.env`:

```bash
cd server
npm run seed
```

The API will then serve content from the database. Check the mode any time:

```bash
curl http://localhost:5000/api/health
# { "status": "ok", "mode": "database" | "fallback", ... }
```

### Running tests

```bash
cd server
npm test        # exercises all API routes in fallback mode
```

---

## API

| Method | Route                | Returns                                  |
| ------ | -------------------- | ---------------------------------------- |
| GET    | `/api/health`        | status + mode (`database` / `fallback`)  |
| GET    | `/api/birthday`      | intro, final, letter, tiramisu, easter   |
| GET    | `/api/world-objects` | the interactive objects + copy           |
| GET    | `/api/fragrances`    | the three fictional fragrances           |
| GET    | `/api/letter`        | the letter content                       |

Every content response includes a `source` field (`database` / `fallback`).
Credentials, connection strings, and stack traces are never exposed.

---

## Editing the content

All copy lives in **one** place per side:

- Server (source of truth): `server/src/data/content.js`
- Client fallback (keep in sync): `client/src/data/content.js`

Change the letter, messages, fragrance notes, etc. there. If using MongoDB,
re-run `npm run seed` after editing the server content.

---

## Deployment

The frontend and backend deploy independently.

### Backend (Render / Railway / Fly / any Node host)

- Root directory: `server`
- Build: `npm install`
- Start: `npm start`
- Environment variables:
  - `MONGODB_URI` — your Atlas connection string (optional but recommended)
  - `CLIENT_ORIGIN` — your deployed frontend URL (for CORS), e.g. `https://nivriti.vercel.app`
  - `NODE_ENV=production`
- After first deploy with a DB, run the seed once (a one-off job / shell):
  `npm run seed`

### Frontend (Vercel / Netlify / Cloudflare Pages)

- Root directory: `client`
- Build: `npm run build`
- Output directory: `dist`
- Environment variable:
  - `VITE_API_BASE` — your deployed backend URL, e.g. `https://nivriti-api.onrender.com`
    (leave empty only if you serve the API from the same origin)

> If you deploy the frontend **without** a backend, the experience still works
> fully via the bundled fallback content.

### MongoDB Atlas

1. Create a free cluster.
2. Add a database user and allow your host's IP (or `0.0.0.0/0` for simplicity).
3. Copy the connection string into the backend's `MONGODB_URI`.
4. Run `npm run seed`.

### QR code

Once the frontend is live, generate a QR code pointing at the URL:

```bash
npx qrcode "https://your-deployed-url" -o nivriti-qr.png
```

Print it on the birthday card. Test it on a fresh mobile browser before the day.

---

## Accessibility & performance notes

- Respects `prefers-reduced-motion` throughout (animations are disabled/instant).
- No autoplay audio; a subtle ambient pad is opt-in via the ♪ toggle.
- Fits narrow mobile screens (360–430px) with no horizontal scrolling.
- Keyboard-accessible objects, dialogs with focus traps and Escape-to-close.
- SVG-based art (crisp, tiny) — no heavy image downloads.

## Privacy

Personal, single-recipient experience. No tracking, analytics, comments, logins,
or social sharing. Keep real credentials in `.env` files only (never committed).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
