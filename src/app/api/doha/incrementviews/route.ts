import { NextRequest, NextResponse } from 'next/server'
import { firestoreAdmin } from '@/lib/firebaseAdminConfig'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { dohaId } = body

        if (!dohaId) {
            return NextResponse.json({ error: 'Doha ID is required' }, { status: 400 })
        }

        if (!firestoreAdmin) {
            return NextResponse.json({ error: 'Firestore admin not initialized' }, { status: 500 })
        }

        // Use dynamic require for server-only package if needed, 
        // but firestoreAdmin should already be configured.
        const { FieldValue } = require('firebase-admin/firestore')
        const dohaViewsRef = firestoreAdmin.collection('dohaViews').doc(String(dohaId))

        await dohaViewsRef.set({
            dohaId: String(dohaId),
            views: FieldValue.increment(1)
        }, { merge: true })

        return NextResponse.json({ message: 'View count incremented' })
    } catch (error: any) {
        console.error('Error incrementing view count:', error)
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
    }
}
