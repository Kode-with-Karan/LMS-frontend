# SkillSphere Frontend

React + Vite frontend for the SkillSphere landing page.

## Setup

1. Install deps:

```bash
cd frontend
npm install
```

2. Set API URL in `.env`:

VITE_API_URL=http://localhost:5000/api

3. Run dev server:

```bash
npm run dev
```

Open http://localhost:5174/ (or the terminal URL) and visit:

- `/courses` – catalog with filters, pagination, and URL-sync.
- `/course/<slug>` (e.g., `/course/mastering-react-0`) – full course detail with syllabus, reviews, and purchase CTA.
- `/about`, `/contact`, `/teach` – new marketing funnel pages with glassmorphism cards, counters, and contact/instructor forms.
- `/login`, `/register`, `/forgot-password`, `/reset-password/:token` – auth stack with JWT-powered forms, validation, and forgot/reset flows.

Notes & Performance:
- Images are lazy-loaded using native `loading="lazy"`.
- Filters and search state are synced to the URL for shareable links.
- Pages use skeleton loaders while fetching.

Build for production:

```bash
npm run build
npm run preview
```
