import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';

export const coston2 = defineChain({
    id: 114,
    name: 'Coston2',
    nativeCurrency: {
        decimals: 18,
        name: 'Coston2 Flare',
        symbol: 'C2FLR',
    },
    rpcUrls: {
        default: { http: ['https://coston2-api.flare.network/ext/C/rpc'] },
    },
    blockExplorers: {
        default: { name: 'Coston2 Explorer', url: 'https://coston2-explorer.flare.network' },
    },
    testnet: true,
});

export const config = getDefaultConfig({
    appName: 'FlareTrust',
    projectId: 'YOUR_PROJECT_ID',
    chains: [coston2],
    ssr: true,
});
