"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { useAccount } from "wagmi";
import { cn } from "@/lib/utils";

// Mock checks for now, in real app we check on-chain data
const steps = [
    { title: "Submit Data", desc: "Stake FLR & build reputation", href: "/submit", checked: false },
    { title: "Become Delegate", desc: "Verify via FDC to validate", href: "/delegates", checked: false },
    { title: "View Reputation", desc: "Check your trust score", href: "/profile/me", checked: true },
];

export function QuickActions() {
    const { isConnected } = useAccount();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {steps.map((step, idx) => (
                <Link href={step.href} key={idx} className="group relative">
                    <div className={cn(
                        "p-6 rounded-2xl bg-slate-900/50 border border-slate-800 transition-all duration-300",
                        "hover:scale-[1.02] hover:bg-slate-900",
                        idx === 0 && "hover:border-indigo-500/50 bg-gradient-to-br from-indigo-900/10 to-transparent",
                        idx === 1 && "hover:border-pink-500/50 bg-gradient-to-br from-pink-900/10 to-transparent",
                        idx === 2 && "hover:border-emerald-500/50 bg-gradient-to-br from-emerald-900/10 to-transparent",
                    )}>
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border",
                                isConnected && step.checked
                                    ? "bg-emerald-500 border-emerald-500 text-white"
                                    : "bg-slate-800 border-slate-700 text-slate-400"
                            )}>
                                {isConnected && step.checked ? <Check size={16} /> : idx + 1}
                            </div>
                            <ArrowRight className="text-slate-600 group-hover:text-white transition-colors" size={20} />
                        </div>

                        <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-white">{step.title}</h3>
                        <p className="text-sm text-slate-400 group-hover:text-slate-300">{step.desc}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
