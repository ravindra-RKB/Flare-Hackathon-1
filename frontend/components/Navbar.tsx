"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Menu, X, Rocket, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: "/", label: "Dashboard" },
        { href: "/submissions", label: "Submissions" }, // Note: User timeline said "Submissions" but detailed req mostly talked about Dashboard feed. I'll stick to a route if needed or anchor. Plan said "Dashboard" is home.
        { href: "/delegates", label: "Delegates" },
        { href: "/profile/me", label: "Profile" },
        { href: "/governance", label: "Governance" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 rounded-lg bg-gradient-to-tr from-pink-500 to-violet-600 group-hover:opacity-90 transition-opacity">
                        <ShieldCheck size={20} className="text-white" />
                    </div>
                    <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        FlareTrust
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-white ${pathname === link.href ? "text-white" : "text-slate-400"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right Side: Network + Wallet */}
                <div className="hidden md:flex items-center gap-4">
                    <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-950/30">
                        <Rocket size={12} className="mr-1" />
                        Coston2
                    </Badge>
                    <ConnectButton showBalance={false} chainStatus="icon" accountStatus="avatar" />
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-400 hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-slate-800 bg-slate-950"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-sm font-medium py-2 ${pathname === link.href ? "text-white" : "text-slate-400"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="h-px bg-slate-800 my-2" />
                            <div className="flex items-center justify-between">
                                <Badge variant="outline" className="border-indigo-500/30 text-indigo-400">
                                    Coston2
                                </Badge>
                                <ConnectButton showBalance={false} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
