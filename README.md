# Nexium UsmanNazeer Project

A modern mood tracking and AI-powered insights web application built with Next.js, Prisma, Supabase, and shadcn/ui. Users can log daily moods, tag emotions, and receive AI-generated summaries and trends.

## Features

- User authentication (Supabase)
- Mood entry with emoji selector and tags
- AI-generated daily summaries and insights
- Calendar heatmap and trend visualizations
- Responsive, modern UI with shadcn/ui and Framer Motion animations

## Tech Stack

- Next.js (App Router)
- Prisma ORM
- Supabase (auth & database)
- shadcn/ui (UI components)
- Framer Motion (animations)
- Tailwind CSS

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/usmannazeer72/Nexium_UsmanNazeer_Project.git
   cd Nexium_UsmanNazeer_Project/Internship/Code/project
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your Supabase/Prisma credentials.
4. **Run database migrations:**
   ```sh
   npx prisma migrate dev
   ```
5. **Start the development server:**
   ```sh
   npm run dev
   ```
6. **Try it now:**

   <a href="https://nexium-usman-nazeer-project.vercel.app" target="_blank"><img src="https://img.shields.io/badge/Try%20Now-Live%20Demo-brightgreen?style=for-the-badge" alt="Try Now"/></a>

---

## Folder Structure

- `src/app/` — Main Next.js app pages and API routes
- `src/components/` — UI and chart components
- `src/utils/` — Utility and client code (Supabase, Prisma, etc.)
- `prisma/` — Prisma schema and migrations

## License

MIT
