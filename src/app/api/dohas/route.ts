import { NextRequest, NextResponse } from 'next/server'
import { getDohas, getPaginatedDohas } from '@/lib/dohaStore'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const all = searchParams.get('all')
    const page = searchParams.get('page')
    const limit = searchParams.get('limit')

    if (all === 'true') {
        try {
            const alldohas = getDohas()
            return NextResponse.json({ alldohas })
        } catch (error) {
            console.error('Error fetching all dohas:', error)
            return NextResponse.json({ error: 'Failed to fetch all dohas' }, { status: 500 })
        }
    }

    const pageNum = parseInt(page || '1') || 1
    const itemsPerPage = parseInt(limit || '10') || 10

    try {
        const dohas = getPaginatedDohas(pageNum, itemsPerPage)
        return NextResponse.json(dohas)
    } catch (error) {
        console.error('Error fetching paginated dohas:', error)
        return NextResponse.json({ error: 'Failed to fetch dohas' }, { status: 500 })
    }
}
