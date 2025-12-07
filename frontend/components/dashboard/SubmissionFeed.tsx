"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Input } from "@/components/ui/Input"; // Assuming I might need to build an Input component or use raw input

// Mock Data
const submissions = [
    { id: 1, title: 'Restaurant Review: Bistro 42', submitter: '0x123...abc', score: 92, type: 'Reviews', status: 'Verified', date: '2 mins ago', stake: '500' },
    { id: 2, title: 'Sensor Data: Zone B Temp', submitter: '0x456...def', score: 78, type: 'Sensors', status: 'Pending', date: '5 mins ago', stake: '120' },
    { id: 3, title: 'Merchant Rating: Shop X', submitter: '0x789...ghi', score: 45, type: 'Merchants', status: 'Flagged', date: '12 mins ago', stake: '1000' },
    { id: 4, title: 'Oracle Feed: BTC/USD', submitter: '0xabc...123', score: 99, type: 'Other', status: 'Verified', date: '1 hour ago', stake: '5000' },
    { id: 5, title: 'Sensor Data: Zone A Humidity', submitter: '0xdef...456', score: 65, type: 'Sensors', status: 'Verified', date: '3 hours ago', stake: '200' },
];

export function SubmissionFeed() {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("Newest");

    const filtered = useMemo(() => {
        return submissions
            .filter(s => {
                if (filter !== "All" && s.type !== filter) return false;
                if (search && !s.title.toLowerCase().includes(search.toLowerCase()) && !s.submitter.toLowerCase().includes(search.toLowerCase())) return false;
                return true;
            })
            .sort((a, b) => {
                if (sort === "Trust") return b.score - a.score;
                if (sort === "Stake") return parseInt(b.stake) - parseInt(a.stake);
                return 0; // Default newest
            });
    }, [filter, search, sort]);

    return (
        <section className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white">Live Submissions</h2>
                    <p className="text-sm text-slate-400">Real-time data verifying on Flare Network</p>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-9 w-40 md:w-64 rounded-md bg-slate-900 border border-slate-800 pl-9 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                        {['All', 'Reviews', 'Sensors'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${filter === f ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <Button variant="outline" size="sm" className="gap-2" onClick={() => setSort(sort === "Trust" ? "Newest" : "Trust")}>
                        <ArrowUpDown size={14} />
                        {sort === "Trust" ? "Trust Score" : "Sort By"}
                    </Button>
                </div>
            </div>

            <div className="space-y-3">
                {filtered.map((sub, idx) => (
                    <motion.div
                        layout
                        key={sub.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col md:flex-row gap-4 items-center hover:bg-slate-900 hover:border-slate-700 transition-all"
                    >
                        {/* Status Dot Border Indicator */}
                        <div className={`w-1 h-12 rounded-full hidden md:block ${sub.score >= 80 ? 'bg-emerald-500' : sub.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`} />

                        <div className="flex-1 w-full flex justify-between md:block">
                            <div className="flex items-center gap-2 mb-1">
                                <Badge variant="secondary" className="text-[10px] h-5">{sub.type}</Badge>
                                <span className="text-xs text-slate-500">{sub.date}</span>
                            </div>
                            <h4 className="font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors truncate max-w-md" title={sub.title}>
                                {sub.title}
                            </h4>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                by <span className="font-mono text-slate-400">{sub.submitter}</span>
                                <span className="text-slate-600">•</span>
                                <span className="text-indigo-400">{sub.stake} FLR Staked</span>
                            </p>
                        </div>

                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                            <div className="text-right">
                                <p className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Trust Score</p>
                                <div className="flex items-end gap-1 justify-end">
                                    <span className={`text-xl font-bold ${sub.score >= 80 ? 'text-emerald-400' : sub.score >= 50 ? 'text-yellow-400' : 'text-red-400'
                                        }`}>{sub.score}</span>
                                    <span className="text-xs text-slate-600 mb-1">/100</span>
                                </div>
                            </div>

                            <Link href={`/submission/${sub.id}`}>
                                <Button variant="secondary" size="sm">View</Button>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center pt-4">
                <Button variant="ghost" size="sm" className="text-slate-400">Load More</Button>
            </div>
        </section>
    );
}
