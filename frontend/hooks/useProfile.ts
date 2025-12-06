import { useQuery } from '@tanstack/react-query';

export function useProfile(address: string | undefined) {
    return useQuery({
        queryKey: ['profile', address],
        queryFn: async () => {
            const res = await fetch(`/api/profile/${address}`);
            if (!res.ok) {
                throw new Error('Failed to load profile');
            }
            return res.json();
        },
        enabled: !!address,
    });
}
