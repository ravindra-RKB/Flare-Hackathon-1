"use client";

import { Activity, ShieldCheck, Star, Component, Info, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { SimpleTooltip } from "../ui/Tooltip";
import { cn } from "@/lib/utils";

const stats = [
    {
        label: 'Total Submissions',
        value: '1,284',
        icon: Activity,
        desc: 'Number of on-chain data submissions.',
        trend: '+12%',
        trendUp: true
    },
    {
        label: 'Avg Trust Score',
        value: '87%',
        icon: ShieldCheck,
        desc: 'Network-wide average reputation score.',
        trend: '+2.4%',
        trendUp: true
    },
    {
        label: 'Verified Delegates',
        value: '42',
        icon: Star,
        desc: 'Validators verified via FDC.',
        trend: '+5%',
        trendUp: true
    },
    {
        label: 'Active Disputes',
        value: '3',
        icon: Component, // active disputes using component icon or flag
        desc: 'Submissions currently under review.',
        trend: '-1',
        trendUp: false
    },
];

export function StatsRow() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4 hover:border-slate-700 transition-colors relative group"
                >
                    <div className="p-3 bg-slate-950 rounded-xl text-pink-500 border border-slate-800">
                        <stat.icon size={20} />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
                            <SimpleTooltip content={stat.desc}>
                                <Info size={12} className="text-slate-600 hover:text-slate-400 cursor-help" />
                            </SimpleTooltip>
                        </div>
                        <div className="flex items-end gap-2">
                            <p className="text-2xl font-bold text-white leading-none">{stat.value}</p>
                            <div className={cn("flex items-center text-xs font-medium", stat.trendUp ? "text-emerald-500" : "text-red-500")}>
                                {stat.trendUp ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                                {stat.trend}
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
