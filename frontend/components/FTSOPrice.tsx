'use client';

import { useQuery } from '@tanstack/react-query';

export default function FTSOPrice() {
    // Mock FTSO price fetch
    const { data: price } = useQuery({
        queryKey: ['ftso-price'],
        queryFn: async () => 0.042, // Mock FLR price
        refetchInterval: 5000,
    });

    return (
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <h3 className="text-slate-400 text-sm">FLR / USD (FTSO)</h3>
            <p className="text-2xl font-bold text-emerald-400">${price?.toFixed(4)}</p>
        </div>
    );
}
