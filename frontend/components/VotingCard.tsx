'use client';

export default function VotingCard() {
    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="font-bold mb-4">Cast Your Vote</h3>
            <div className="flex gap-4">
                <button className="flex-1 py-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 rounded-xl hover:bg-emerald-500/20 font-bold">
                    For
                </button>
                <button className="flex-1 py-3 bg-red-500/10 text-red-400 border border-red-500/50 rounded-xl hover:bg-red-500/20 font-bold">
                    Against
                </button>
            </div>
        </div>
    );
}
