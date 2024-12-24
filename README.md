# Startup Talent Platform

A modern platform for startups to find and hire talent based on their skills. Built with Next.js 14, React, TypeScript, and Supabase.

## Features

- Dark mode support
- Real-time analytics dashboard
- Multi-step job ad creation process
- Talent pool with matching scores
- Interview scheduling and management
- Profile verification system
- Skill assessment and verification

## Tech Stack

- Next.js 14+ with App Router
- React
- TypeScript
- Supabase (Database & Auth)
- Tailwind CSS
- shadcn/ui components
- ESLint
- Recharts for data visualization

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes
│   ├── components/   # Page-specific components
│   ├── contexts/     # React contexts
│   └── types/        # TypeScript types
├── components/
│   └── ui/           # Reusable UI components
└── lib/              # Utility functions and configurations
```

## Database Schema

The platform uses Supabase with the following main tables:
- Users (Authentication)
- Companies (Startup profiles)
- JobAds (Job postings)
- Candidates (Talent profiles)
- Skills (Skill definitions)
- Assessments (Skill verifications)
- Interviews (Interview scheduling)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
