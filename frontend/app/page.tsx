'use client';

import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Flag, Star, ShieldCheck, Activity } from 'lucide-react';
import Link from 'next/link';

// Mock data (replace with hooks later)
const stats = [
  { label: 'Total Submissions', value: '1,284', icon: Activity },
  { label: 'Avg Trust Score', value: '87%', icon: ShieldCheck },
  { label: 'Verified Delegates', value: '42', icon: Star },
  { label: 'Active Disputes', value: '3', icon: Flag },
];

const recentSubmissions = [
  { id: 1, title: 'Restaurant Review: Bistro 42', submitter: '0x123...abc', score: 92, status: 'Verified', date: '2 mins ago' },
  { id: 2, title: 'Sensor Data: Zone B Temp', submitter: '0x456...def', score: 78, status: 'Pending', date: '5 mins ago' },
  { id: 3, title: 'Merchant Rating: Shop X', submitter: '0x789...ghi', score: 45, status: 'Flagged', date: '12 mins ago' },
];

export default function Home() {
  const { address } = useAccount();

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            FlareTrust
          </h1>
          <p className="text-slate-400">Real-Time Reputation & Trust Layer</p>
        </div>
        <ConnectButton />
      </header>

      {/* Stats Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4 hover:border-slate-700 transition-colors"
          >
            <div className="p-2 bg-slate-800 rounded-lg text-pink-500">
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="text-xl font-bold text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Link href="/submit" className="group">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/30 hover:border-indigo-500/60 transition-all cursor-pointer">
            <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-400">Submit Data</h3>
            <p className="text-sm text-slate-400">Stake FLR to submit data and build reputation.</p>
          </div>
        </Link>
        <Link href="/delegates" className="group">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-900/50 to-slate-900 border border-pink-500/30 hover:border-pink-500/60 transition-all cursor-pointer">
            <h3 className="text-lg font-bold mb-2 group-hover:text-pink-400">Become Delegate</h3>
            <p className="text-sm text-slate-400">Verify cross-chain activity via FDC to validate others.</p>
          </div>
        </Link>
        <Link href="/profile/me" className="group">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-slate-900 border border-emerald-500/30 hover:border-emerald-500/60 transition-all cursor-pointer">
            <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-400">My Profile</h3>
            <p className="text-sm text-slate-400">Check your reputation score and submission history.</p>
          </div>
        </Link>
      </div>

      {/* Recent Submissions */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Live Submissions</h2>
          <button className="text-sm text-indigo-400 hover:text-indigo-300">View All</button>
        </div>

        <div className="space-y-4">
          {recentSubmissions.map((sub, idx) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row justify-between items-center hover:bg-slate-900 transition-colors"
            >
              <div className="flex items-center gap-4 mb-2 md:mb-0">
                <div className={`w-2 h-2 rounded-full ${sub.status === 'Verified' ? 'bg-emerald-500' : sub.status === 'Flagged' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                <div>
                  <h4 className="font-medium text-white">{sub.title}</h4>
                  <span className="text-xs text-slate-500">{sub.submitter} • {sub.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-slate-400">Trust Score</p>
                  <div className="text-lg font-bold text-white flex items-center gap-1">
                    {sub.score}<span className="text-xs text-slate-500">/100</span>
                  </div>
                </div>

                <Link href={`/submission/${sub.id}`}>
                  <button className="px-4 py-2 rounded-lg bg-slate-800 text-sm hover:bg-slate-700 transition-colors">
                    View
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
