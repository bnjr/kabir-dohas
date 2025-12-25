// src/pages/api/doha/incrementviews.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { firestoreAdmin } from '@/lib/firebaseAdminConfig'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { dohaId } = req.body
    if (!dohaId) {
      return res.status(400).json({ error: 'Doha ID is required' })
    }
    if (!firestoreAdmin) {
      return res.status(500).json({ error: 'Firestore admin not initialized' })
    }

    const { FieldValue } = require('firebase-admin/firestore')
    const dohaViewsRef = firestoreAdmin.collection('dohaViews').doc(String(dohaId))

    await dohaViewsRef.set({
      dohaId: String(dohaId),
      views: FieldValue.increment(1)
    }, { merge: true })

    return res.status(200).json({ message: 'View count incremented' })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
