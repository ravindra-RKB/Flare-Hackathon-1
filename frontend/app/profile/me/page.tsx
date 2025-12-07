"use client";

import { useAccount } from "wagmi";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// Note: Radix Tabs might need installation or simple custom tabs. User said "Keep using Tailwind".
// I'll assume Radix Primitives are OK since I installed tooltip/slot. I'll stick to custom simple tabs to avoid more installs if possible, or just build a simple one.
// Actually, simple state tabs are faster.

import { useState } from "react";
import { Award, Zap, FileText, CheckCircle } from "lucide-react";

export default function ProfilePage() {
    const { address, isConnected } = useAccount();
    const [activeTab, setActiveTab] = useState("submissions");

    if (!isConnected) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
                <div className="p-4 rounded-full bg-slate-900 border border-slate-800 mb-6">
                    <Zap size={48} className="text-slate-500" />
                </div>
                <h1 className="text-2xl font-bold mb-4">Connect Wallet</h1>
                <p className="text-slate-400 max-w-md mb-8">Please connect your Neo-Coston2 compatible wallet to view your reputation profile.</p>
                <ConnectButton />
            </div>
        )
    }

    return (
        <main className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Profile Header */}
            <div className="relative mb-12">
                <div className="h-32 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700"></div>
                <div className="absolute top-16 left-8 flex items-end gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-black border-4 border-slate-950 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-pink-500 to-indigo-600"></div>
                        {/* Placeholder avatar */}
                    </div>
                    <div className="mb-2">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            {address?.slice(0, 6)}...{address?.slice(-4)}
                            <Badge variant="success" className="bg-emerald-900/50 text-emerald-400 border-emerald-500/30">Verified</Badge>
                        </h1>
                        <p className="text-slate-400 text-sm">Member since Dec 2025</p>
                    </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                    <Button variant="outline" size="sm">Edit Profile</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
                <Card className="md:col-span-1 h-fit">
                    <CardContent className="pt-6 text-center space-y-6">
                        <div>
                            <p className="text-sm text-slate-500 uppercase font-bold mb-2">Reputation Score</p>
                            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                                850
                            </div>
                            <p className="text-xs text-emerald-400 mt-1">Top 5% of users</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4">
                            <div>
                                <p className="text-2xl font-bold text-white">42</p>
                                <p className="text-xs text-slate-500">Submissions</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">98%</p>
                                <p className="text-xs text-slate-500">Success Rate</p>
                            </div>
                        </div>

                        <div className="space-y-2 text-left">
                            <p className="text-sm font-semibold text-slate-300">Badges</p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary"><Award size={12} className="mr-1" /> Early Adopter</Badge>
                                <Badge variant="secondary"><CheckCircle size={12} className="mr-1" /> Validator</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="md:col-span-3">
                    <div className="flex gap-4 border-b border-slate-800 mb-6">
                        <button
                            onClick={() => setActiveTab('submissions')}
                            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'submissions' ? 'text-white border-indigo-500' : 'text-slate-400 border-transparent hover:text-white'
                                }`}
                        >
                            My Submissions
                        </button>
                        <button
                            onClick={() => setActiveTab('validations')}
                            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'validations' ? 'text-white border-indigo-500' : 'text-slate-400 border-transparent hover:text-white'
                                }`}
                        >
                            My Validations
                        </button>
                    </div>

                    <div className="space-y-4">
                        {activeTab === 'submissions' && (
                            <>
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 rounded-lg bg-slate-800 text-slate-400"><FileText size={20} /></div>
                                            <div>
                                                <h4 className="font-medium text-slate-200">Sensor Data Report #{100 + i}</h4>
                                                <p className="text-xs text-slate-500">Submitted 2 days ago</p>
                                            </div>
                                        </div>
                                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Accepted</Badge>
                                    </div>
                                ))}
                            </>
                        )}
                        {activeTab === 'validations' && (
                            <div className="text-center py-12 text-slate-500">
                                You haven't validated any submissions yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
