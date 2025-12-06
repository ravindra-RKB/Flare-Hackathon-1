import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> } // In Next.js 15+ params is a promise, checking Next 16 usage in package.json
) {
    // Await params because starting from Next.js 15, params are async
    const { id } = await params;

    // Simulate database delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Valid IDs for demo
    if (id === '1') {
        return NextResponse.json({
            id,
            title: 'Restaurant Review: Bistro 42',
            description: 'Data URL: ipfs://QmHash... Review content: "Great food, slow service."',
            submitter: '0x123...abc',
            stake: '500 FLR',
            stakeUSD: '$15.00',
            initialPrice: '$0.030',
            trustScore: 92,
            baseScore: 40,
            ratings: 52,
            upvotes: 48,
            downvotes: 4,
            flags: 0,
            status: 'Verified',
            createdAt: '2025-10-24 14:00',
            history: [
                { event: 'Created', time: '14:00', detail: 'Staked 500 FLR' },
                { event: 'Validation', time: '14:05', detail: 'FDC Verified Identity' },
                { event: 'Rated', time: '14:30', detail: '+1 from 0x999...111' },
            ]
        });
    }

    return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
}
