'use client';

export default function Governance() {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Governance</h1>
                <button className="px-4 py-2 bg-emerald-600 rounded-lg font-medium">Create Proposal</button>
            </div>

            <div className="space-y-4">
                {/* Mock Proposal List */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-indigo-500 transition cursor-pointer">
                    <div className="flex justify-between mb-2">
                        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">ACTIVE</span>
                        <span className="text-slate-400 text-sm">Ends in 2 days</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">FIP-01: Increase Reputation Rewards</h3>
                    <p className="text-slate-400 mb-4">Proposal to increase the base reputation reward for successful data submissions by 25%.</p>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[65%]" />
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-slate-400">
                        <span>For: 65%</span>
                        <span>Against: 35%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
