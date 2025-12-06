'use client';

export default function Delegates() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Delegates</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Mock Delegate Cards */}
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">D{i}</div>
                            <div>
                                <h3 className="font-bold">Delegate {i}</h3>
                                <p className="text-sm text-slate-400">Vote Power: 15.4%</p>
                            </div>
                        </div>
                        <button className="w-full py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition">Delegate</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
