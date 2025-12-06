import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ address: string }> }
) {
    const { address } = await params;

    // Simulate database delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Mock profile data
    const profile = {
        address: address,
        reputationScore: address === 'me' ? 0 : 1450, // Default to 0 if 'me' reaches here without substitution (shouldn't happen if frontend logic is correct)
        rank: 'Top Contributor',
        submissions: 124,
        successful: 118,
        failed: 6,
        isDelegate: true,
        recentActivity: [
            { id: 1, action: 'Submission Validated', target: 'Review #88', time: '1h ago', scoreChange: '+20' },
            { id: 2, action: 'Submission Created', target: 'Sensor Data #92', time: '5h ago', scoreChange: '+5' },
            { id: 3, action: 'Delegate Attestation', target: 'FDC', time: '1d ago', scoreChange: '+100' },
        ]
    };

    return NextResponse.json(profile);
}
