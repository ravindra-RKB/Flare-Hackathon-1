'use client';

import { StatsRow } from '@/components/dashboard/StatsRow';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { SubmissionFeed } from '@/components/dashboard/SubmissionFeed';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header handled by Layout mostly, but we can add page specific title if needed, 
          though the nav covers the branding. Let's add a welcome section. */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Overview of the FlareTrust reputation network.</p>
      </div>

      <StatsRow />
      <QuickActions />
      <SubmissionFeed />
    </main>
  );
}
