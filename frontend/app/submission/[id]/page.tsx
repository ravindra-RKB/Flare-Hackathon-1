"use client";

import { use, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ArrowLeft, Share2, Flag, ThumbsUp, ThumbsDown, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SubmissionDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    // Mock data
    const submission = {
        id,
        title: 'Restaurant Review: Bistro 42',
        submitter: '0x123...abc',
        created: '2025-05-15 14:30',
        stake: '500 FLR (~$15.20)',
        score: 92,
        status: 'Verified',
        breakdown: {
            reputation: 40,
            votes: 35,
            history: 17
        },
        validators: [
            { name: 'FTSO Provider A', vote: 'Approve', time: '10 mins ago' },
            { name: 'Guardian Node', vote: 'Approve', time: '15 mins ago' },
            { name: 'Anon Delegate', vote: 'Approve', time: '20 mins ago' },
        ]
    };

    return (
        <main className="container mx-auto px-4 py-8 max-w-5xl">
            <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="flex gap-2 mb-2">
                                    <Badge variant="secondary">Review</Badge>
                                    <Badge variant="success" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Verified</Badge>
                                </div>
                                <h1 className="text-3xl font-bold text-white mb-2">{submission.title}</h1>
                                <p className="text-slate-400">Submitted by <span className="font-mono text-indigo-400">{submission.submitter}</span> on {submission.created}</p>
                            </div>
                            <Button variant="outline" size="icon">
                                <Share2 size={18} />
                            </Button>
                        </div>

                        <Card className="mb-6">
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-slate-500 uppercase font-bold">Stake Locked</p>
                                        <p className="text-xl font-mono text-white">{submission.stake}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 uppercase font-bold">Network Category</p>
                                        <p className="text-xl text-white">Local Business</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <h3 className="text-xl font-bold mb-4">Validator Activity</h3>
                        <div className="space-y-3">
                            {submission.validators.map((v, i) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                                            <ShieldCheck size={16} className="text-emerald-500" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-200">{v.name}</p>
                                            <p className="text-xs text-slate-500">{v.time}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="text-emerald-400 border-emerald-500/20 bg-emerald-500/10">
                                        {v.vote}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="bg-slate-900 border-slate-700">
                        <CardHeader>
                            <CardTitle>Trust Score</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                                {/* Simple SVG Gauge */}
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-800" />
                                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * submission.score / 100)} className="text-emerald-500 transition-all duration-1000 ease-out" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold text-white">{submission.score}</span>
                                    <span className="text-sm text-slate-400">/ 100</span>
                                </div>
                            </div>

                            <div className="w-full space-y-2 mt-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Base Reputation</span>
                                    <span className="text-white">+{submission.breakdown.reputation}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Validator Votes</span>
                                    <span className="text-white">+{submission.breakdown.votes}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">History</span>
                                    <span className="text-white">+{submission.breakdown.history}%</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full gap-2" variant="outline">
                                <ThumbsUp size={16} /> Upvote Submission
                            </Button>
                            <Button className="w-full gap-2" variant="outline">
                                <ThumbsDown size={16} /> Downvote
                            </Button>
                            <Button className="w-full gap-2 text-red-400 border-red-900/50 hover:bg-red-950" variant="outline">
                                <Flag size={16} /> Report / Flag
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
