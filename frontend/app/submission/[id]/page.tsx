'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

interface HistoryEvent {
    event: string;
    time: string;
    detail: string;
}

interface Submission {
    id: string;
    title: string;
    description: string;
    submitter: string;
    stake: string;
    stakeUSD: string;
    initialPrice: string;
    trustScore: number;
    baseScore: number;
    ratings: number;
    upvotes: number;
    downvotes: number;
    flags: number;
    status: string;
    createdAt: string;
    history: HistoryEvent[];
}

export default function SubmissionDetail() {
    const { id } = useParams();
    const submissionId = Array.isArray(id) ? id[0] : id;

    const { data: submission, isLoading, isError } = useQuery<Submission>({
        queryKey: ['submission', submissionId],
        queryFn: async () => {
            const res = await fetch(`/api/submissions/${submissionId}`);
            if (!res.ok) {
                throw new Error('Failed to load submission');
            }
            return res.json();
        },
        enabled: !!submissionId,
    });

    const [hasRated, setHasRated] = useState(false);

    if (isLoading) {
        return (
            <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8 flex items-center justify-center">
                <div className="animate-pulse text-slate-400">Loading submission...</div>
            </main>
        );
    }

    if (isError || !submission) {
        return (
            <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8 flex items-center justify-center">
                <div className="text-red-400 flex items-center gap-2">
                    <AlertTriangle /> Failed to load submission.
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2">Submission #{id}</h1>
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs border border-emerald-500/50">
                            Verified
                        </span>
                        <span className="text-slate-500 text-sm">Created by {submission.submitter}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 rounded-2xl bg-slate-900 border border-slate-800"
                        >
                            <h3 className="text-lg font-semibold mb-4">Data Payload</h3>
                            <div className="p-4 bg-slate-950 rounded-lg font-mono text-sm text-slate-300 break-all border border-slate-800">
                                {submission.description}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="p-6 rounded-2xl bg-slate-900 border border-slate-800"
                        >
                            <h3 className="text-lg font-semibold mb-4">Activity Log</h3>
                            <div className="space-y-4">
                                {submission.history.map((event, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-2 bg-slate-800 relative">
                                            <div className="absolute top-2 -left-1 w-4 h-4 rounded-full bg-indigo-500 border-2 border-slate-900" />
                                        </div>
                                        <div className="pb-4">
                                            <p className="font-medium text-slate-200">{event.event}</p>
                                            <p className="text-sm text-slate-500">{event.time} • {event.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Score Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 text-center"
                        >
                            <h3 className="text-slate-400 mb-2">Trust Score</h3>
                            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="56" stroke="#1e293b" strokeWidth="12" fill="none" />
                                    <circle cx="64" cy="64" r="56" stroke="#6366f1" strokeWidth="12" fill="none" strokeDasharray="351" strokeDashoffset={351 - (351 * submission.trustScore) / 100} strokeLinecap="round" />
                                </svg>
                                <div className="absolute text-3xl font-bold">{submission.trustScore}</div>
                            </div>
                            <div className="mt-4 flex justify-between text-xs text-slate-400 px-4">
                                <span>Base: {submission.baseScore}</span>
                                <span>Votes: {submission.ratings}</span>
                            </div>
                        </motion.div>

                        {/* Stake Info */}
                        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                            <h3 className="text-sm text-slate-400 uppercase tracking-wider mb-4">Economic Security</h3>
                            <div className="flex justify-between mb-2">
                                <span>Stake Amount</span>
                                <span className="font-mono">{submission.stake}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Value (USD)</span>
                                <span className="font-mono">{submission.stakeUSD}</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 mt-4 border-t border-slate-800 pt-2">
                                <span>Price at creation</span>
                                <span>{submission.initialPrice} FLR/USD</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                            <h3 className="mb-4 font-semibold">Validation Actions</h3>
                            {!hasRated ? (
                                <div className="flex gap-2 mb-4">
                                    <button onClick={() => setHasRated(true)} className="flex-1 py-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/50 rounded-lg hover:bg-emerald-500/20 transition flex items-center justify-center gap-2">
                                        <ThumbsUp size={16} /> Valid
                                    </button>
                                    <button onClick={() => setHasRated(true)} className="flex-1 py-2 bg-red-500/10 text-red-500 border border-red-500/50 rounded-lg hover:bg-red-500/20 transition flex items-center justify-center gap-2">
                                        <ThumbsDown size={16} /> Invalid
                                    </button>
                                </div>
                            ) : (
                                <div className="p-3 bg-slate-800 rounded text-center text-sm text-slate-400 mb-4">
                                    You rated this submission.
                                </div>
                            )}

                            <button className="w-full py-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition text-sm flex items-center justify-center gap-2">
                                <AlertTriangle size={16} /> Flag for Review
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
