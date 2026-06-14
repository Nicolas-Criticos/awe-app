# AWE App

A 30-day guided cohort experience app — participants move through daily content, track check-ins, and complete intentions across a structured programme.

## Quick Start

```bash
npm install
cp .env.example .env.local   # fill in Supabase credentials
npm run dev
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | ✅ | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | ✅ | Supabase anon key |

## Project Structure

```
src/
  pages/
    Landing.jsx      # Entry point — participant enters their name/code
    Onboarding.jsx   # Sets up their 30-day journey
    Day.jsx          # Daily content page (intentions, check-ins)
    Complete.jsx     # Shown when the programme is finished
    Dissolved.jsx    # Shown when a cohort is dissolved
    Missed.jsx       # Shown when a day is missed
  components/
    DailyCard.jsx    # Card for daily content display
    IntentionForm.jsx  # Form to set daily intentions
    StreakDisplay.jsx   # Visual streak tracker
    ui/              # ErrorBoundary, LoadingSpinner, ErrorState
  lib/
    supabase.js      # Supabase client
  data/              # Static content / seed data
```

## Key Concepts

- **Cohorts**: Groups of participants sharing a start date and programme
- **Daily content**: Each day has themed content, an intention prompt, and a check-in
- **Streak tracking**: Participants build momentum through daily engagement
- **Supabase tables**: `cohorts`, `participants`, `daily_content`, `check_ins`

## Tech Stack

- React 18 (JSX)
- Vite
- React Router v6
- Tanstack React Query
- Supabase (database)

## Deploy

```bash
npm run build
# Deploy dist/ to Vercel or any static host
vercel --token $VERCEL_TOKEN
```
