import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    // Logic to calculate or fetch global reputation stats
    return NextResponse.json({
        totalReputation: 50000,
        averageScore: 1200,
        activeParticipants: 45
    });
}
