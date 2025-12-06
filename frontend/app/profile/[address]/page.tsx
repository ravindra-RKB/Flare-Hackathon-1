'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trophy, Activity, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';

interface ActivityItem {
    id: number;
    action: string;
    target: string;
    time: string;
    scoreChange: string;
}

interface ProfileData {
    address: string;
    reputationScore: number;
    rank: string;
    submissions: number;
    successful: number;
    failed: number;
    isDelegate: boolean;
    recentActivity: ActivityItem[];
}

export default function Profile() {
    const params = useParams();
    const { address: connectedAddress } = useAccount();
    const [targetAddress, setTargetAddress] = useState<string | null>(null);

    // Determine target address
    useEffect(() => {
        if (params?.address) {
            const addrParam = Array.isArray(params.address) ? params.address[0] : params.address;
            if (addrParam === 'me') {
                if (connectedAddress) {
                    setTargetAddress(connectedAddress);
                }
            } else {
                setTargetAddress(addrParam);
            }
        }
    }, [params, connectedAddress]);

    const { data: profile, isLoading, isError, error } = useQuery<ProfileData>({
        queryKey: ['profile', targetAddress],
        queryFn: async () => {
            const res = await fetch(`/api/profile/${targetAddress}`);
            if (!res.ok) {
                throw new Error('Failed to load profile');
            }
            return res.json();
        },
        enabled: !!targetAddress,
    });

    if (!targetAddress && params?.address === 'me') {
        return (
            <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8 flex items-center justify-center">
                <div className="text-slate-400">Please connect your wallet to view your profile.</div>
            </main>
        );
    }

    if (isLoading) {
        return (
            <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8 flex items-center justify-center">
                <div className="animate-pulse text-slate-400">Loading profile...</div>
            </main>
        );
    }

    if (isError || !profile) {
        return (
            <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8 flex items-center justify-center">
                <div className="text-red-400 flex items-center gap-2">
                    <AlertTriangle /> Failed to load profile. {error?.message}
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-900 border border-indigo-500/30 overflow-hidden mb-8"
                >
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-3xl font-bold shadow-lg shadow-indigo-500/50">
                            {profile.reputationScore >= 1000 ? '💎' : '👤'}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold mb-1 break-all md:break-normal">{profile.address.slice(0, 6)}...{profile.address.slice(-4)}</h1>
                            <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-300">
                                {profile.isDelegate && <span className="px-2 py-0.5 bg-indigo-500/20 rounded border border-indigo-500/50 text-xs font-semibold">DELEGATE</span>}
                                <span className="text-sm">{profile.rank}</span>
                            </div>
                        </div>
                        <div className="md:ml-auto text-center">
                            <p className="text-sm text-slate-400 uppercase tracking-wider">Reputation Score</p>
                            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
                                {profile.reputationScore}
                            </p>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stats */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><Activity size={20} /></div>
                                <span className="text-slate-400">Total Submissions</span>
                            </div>
                            <span className="font-bold">{profile.submissions}</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><CheckCircle size={20} /></div>
                                <span className="text-slate-400">Successful</span>
                            </div>
                            <span className="font-bold">{profile.successful}</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-500/10 text-red-400 rounded-lg"><XCircle size={20} /></div>
                                <span className="text-slate-400">Failed</span>
                            </div>
                            <span className="font-bold">{profile.failed}</span>
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {profile.recentActivity.map((activity, idx) => (
                                <motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between hover:bg-slate-900 transition"
                                >
                                    <div>
                                        <p className="font-medium text-white">{activity.action}</p>
                                        <p className="text-sm text-slate-500">{activity.target} • {activity.time}</p>
                                    </div>
                                    <span className="font-bold text-emerald-400">{activity.scoreChange} pts</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
