import { NextRequest, NextResponse } from 'next/server'
import { getRandomDoha, getDohaOfDay } from '@/lib/dohaStore'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const daily = searchParams.get('daily')

    try {
        const doha = daily === 'true' ? getDohaOfDay() : getRandomDoha()
        if (doha) {
            return NextResponse.json(doha)
        } else {
            return NextResponse.json({ error: 'No dohas found' }, { status: 404 })
        }
    } catch (error) {
        console.error('Error fetching random/daily doha:', error)
        return NextResponse.json({ error: 'Failed to fetch doha' }, { status: 500 })
    }
}
