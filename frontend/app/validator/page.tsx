'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function ValidatorConsole() {
    const [tasks, setTasks] = useState([
        { id: 101, type: 'Submission Rating', target: 'Submission #42', reward: '5 FLR', status: 'Pending' },
        { id: 102, type: 'FDC Verification', target: '0xabc...def', reward: '10 Rep', status: 'Pending' },
    ]);

    return (
        <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Validator Console
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                        <p className="text-slate-400 text-sm">Pending Tasks</p>
                        <p className="text-2xl font-bold">{tasks.length}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                        <p className="text-slate-400 text-sm">Accuracy Rate</p>
                        <p className="text-2xl font-bold text-emerald-400">98.5%</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                        <p className="text-slate-400 text-sm">Total Earnings</p>
                        <p className="text-2xl font-bold text-yellow-500">450 FLR</p>
                    </div>
                </div>

                <h2 className="text-xl font-semibold mb-4">Review Queue</h2>
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4"
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="px-2 py-0.5 bg-slate-800 text-xs rounded text-slate-300">{task.type}</span>
                                    <span className="text-yellow-500 text-xs">Reward: {task.reward}</span>
                                </div>
                                <h4 className="font-semibold text-lg">{task.target}</h4>
                            </div>

                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/20 transition">
                                    <CheckCircle size={18} /> Approve
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition">
                                    <XCircle size={18} /> Reject
                                </button>
                            </div>
                        </motion.div>
                    ))}
                    {tasks.length === 0 && (
                        <p className="text-center text-slate-500 py-8">No tasks pending. Good job!</p>
                    )}
                </div>
            </div>
        </main>
    );
}
