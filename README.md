# WanderWise

Planning a trip shouldn't feel like a chore. WanderWise is a personal project I built to make travel planning a little more enjoyable — create trips, build out itineraries, and get activity suggestions for your destination, all in one place.

**[Live Demo](#)** · **[Report a Bug](https://github.com/AdityaShetty/wanderwise/issues)**

---

## What it does

- **Sign in and get started** — Firebase Auth handles authentication, so your trips are always tied to your account
- **Create and manage trips** — Add trips, set destinations, and keep everything organized in one dashboard
- **Activity suggestions** — Browse curated activity ideas for 6+ cities to help build out your itinerary
- **Real-time sync** — Everything saves instantly via Firestore, so nothing gets lost if you close the tab
- **Works on any screen** — Responsive UI that doesn't feel like an afterthought on mobile

> Activity suggestions currently cover a handpicked set of cities. Broader destination support is on the roadmap.

---

## Built with

- **React 18** + **TypeScript** — component-driven UI with full type safety
- **Firebase** — Auth for login, Firestore for real-time data
- **Tailwind CSS** — utility-first styling
- **Vite** — fast dev server and build tooling
- **React Router v6** — client-side routing

---

## Running it locally

You'll need Node.js 16+ and a Firebase project with Authentication and Firestore enabled.

```bash
# 1. Clone the repo
git clone https://github.com/AdityaShetty/wanderwise.git
cd wanderwise

# 2. Install dependencies
npm install

# 3. Set up your Firebase credentials
cp .env.example .env.local
# Fill in .env.local with your Firebase project values

# 4. Start the dev server
npm run dev
```

### Environment variables

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## Project structure

```
src/
├── auth/          # Firebase config and auth helpers
├── components/    # UI and feature components
│   ├── ui/        # Shared, reusable components
│   ├── trips/     # Trip management views
│   └── auth/      # Login and signup flows
├── context/       # Global state via React Context
├── pages/         # Top-level page components
├── services/      # Firebase and suggestion service logic
├── types/         # Shared TypeScript types
├── data/          # City activity data
├── hooks/         # Custom React hooks
└── utils/         # Helper functions
```

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## License

MIT — see [LICENSE](LICENSE) for details.
