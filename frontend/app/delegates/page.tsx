"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Check, Shield } from "lucide-react";

const delegates = [
    { rank: 1, name: "FlareOrg Validator", address: "0x89a...421", reputation: 980, validated: 14050, status: 'Active' },
    { rank: 2, name: "FTSO Providers Ltd", address: "0x4b2...999", reputation: 965, validated: 12100, status: 'Active' },
    { rank: 3, name: "Community Node 1", address: "0x33c...111", reputation: 940, validated: 8400, status: 'Active' },
    { rank: 4, name: "Data Aggregator X", address: "0x7d1...222", reputation: 890, validated: 5600, status: 'Active' },
    { rank: 5, name: "IoT Verifier", address: "0x1a9...555", reputation: 850, validated: 3200, status: 'Active' },
];

export default function DelegatesPage() {
    return (
        <main className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Delegates Leaderboard</h1>
                    <p className="text-slate-400">Top entities securing the network via FDC verification.</p>
                </div>
                <Card className="p-4 bg-indigo-950/20 border-indigo-500/20 flex gap-4 items-center">
                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                        <Shield size={24} />
                    </div>
                    <div>
                        <p className="font-bold text-indigo-200">Become a Delegate</p>
                        <p className="text-xs text-indigo-300/70">Verify your cross-chain history to join.</p>
                    </div>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">Start Flow</Button>
                </Card>
            </div>

            <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/50">
                <table className="w-full text-left">
                    <thead className="bg-slate-950 text-slate-400 text-xs uppercase font-bold tracking-wider">
                        <tr>
                            <th className="p-4">Rank</th>
                            <th className="p-4">Delegate Entity</th>
                            <th className="p-4">Reputation</th>
                            <th className="p-4">Validations</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {delegates.map((d) => (
                            <tr key={d.rank} className="hover:bg-slate-800/50 transition-colors group">
                                <td className="p-4 text-slate-500 font-mono">#{d.rank}</td>
                                <td className="p-4">
                                    <div className="font-semibold text-white">{d.name}</div>
                                    <div className="text-xs text-slate-500 font-mono">{d.address}</div>
                                </td>
                                <td className="p-4 font-bold text-white">{d.reputation}</td>
                                <td className="p-4 text-slate-400">{d.validated.toLocaleString()}</td>
                                <td className="p-4">
                                    <Badge variant="success" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                        {d.status}
                                    </Badge>
                                </td>
                                <td className="p-4 text-right">
                                    <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        Delegate Vote
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
