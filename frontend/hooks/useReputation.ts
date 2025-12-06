import { useQuery } from '@tanstack/react-query';

export function useReputation(address: string | undefined) {
    return useQuery({
        queryKey: ['reputation', address],
        queryFn: async () => {
            // Mock endpoint for now, or reuse profile
            const res = await fetch(`/api/profile/${address}`);
            if (!res.ok) {
                throw new Error('Failed to load reputation');
            }
            const data = await res.json();
            return data.reputationScore;
        },
        enabled: !!address,
    });
}
