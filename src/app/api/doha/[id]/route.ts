import { NextRequest, NextResponse } from 'next/server'
import { getDohaById } from '@/lib/dohaStore'

export const dynamic = 'force-dynamic'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params
    const id = resolvedParams.id

    try {
        const doha = getDohaById(id)
        if (doha) {
            return NextResponse.json(doha)
        } else {
            return NextResponse.json({ error: 'Doha not found' }, { status: 404 })
        }
    } catch (error) {
        console.error(`Error fetching doha ${id}:`, error)
        return NextResponse.json({ error: 'Failed to fetch doha' }, { status: 500 })
    }
}
