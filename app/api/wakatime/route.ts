import { NextResponse } from 'next/server';

export async function GET() {
    const apiKey = process.env.WAKATIME_API_KEY;

    // Update every 30s
    
    
    console.log('API Key present:', !!apiKey);
    
    if (!apiKey) {
        return new NextResponse('Missing WAKATIME_API_KEY', { status: 500 });
    }

    try {
        const res = await fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', {
            headers: {
                'Authorization': `Basic ${Buffer.from(apiKey).toString('base64')}`,
            },
        });

        console.log('Wakatime response status:', res.status);

        if (!res.ok) {
            const errorText = await res.text();
            console.log('Wakatime error response:', errorText);
            return new NextResponse(`Wakatime API error: ${res.status} - ${errorText}`, { status: res.status });
        }
        
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Fetch error:', error);
        return new NextResponse(`Failed to fetch: ${error}`, { status: 500 });
    }
}