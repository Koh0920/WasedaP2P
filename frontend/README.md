# WasedaP2P

A peer-to-peer note-sharing platform for Waseda University students. Upload, browse, and vote on course notes from your peers.

---

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router v6
- **State**: React Context + Hooks

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:8000
```

---

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── layout/       # AppLayout, Sidebar, Footer
│   ├── notes/        # NoteCard, NoteListItem, ReportButton
│   ├── profile/      # TimetableSection
│   └── ui/           # shadcn/ui components (Button, Card, etc.)
├── context/          # React Context (AuthContext)
├── data/             # Mock data (temporary, for development)
├── hooks/            # Custom hooks
├── lib/              # Utilities
├── pages/            # Route pages
│   ├── auth/         # Login, Signup, PasswordReset, EmailVerification
│   ├── BrowsePage.tsx
│   ├── ForumPage.tsx
│   ├── NoteDetailPage.tsx
│   ├── ProfilePage.tsx
│   └── UploadPage.tsx
├── services/         # API layer (currently mock)
├── types/            # TypeScript interfaces
├── App.tsx           # Root component
├── main.tsx          # Entry point
└── router.tsx        # Route definitions
```

---

## API Integration

Currently, all API functions in `src/services/api.ts` return mock data. When the FastAPI backend is ready:

1. Update `VITE_API_URL` in your `.env` file
2. Replace each mock function with a real fetch call

See `.agent/api-guide.md` for the complete API specification.

---

## Design System

This project follows the **Swiss International Style + Notion Minimalism** design system. See `.agent/design.md` for:

- Color palette (Zinc grayscale + Orange accent)
- Typography (Geist font, size hierarchy)
- Component patterns (no borders, use spacing)
- Accessibility guidelines

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

---

## License

MIT
