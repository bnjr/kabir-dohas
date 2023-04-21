// src/pages/api/doha/incrementViews.ts

import {NextApiRequest, NextApiResponse} from 'next'
import {firestoreAdmin} from '@/lib/firebaseAdminConfig'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const {dohaId} = req.body
    if (!dohaId) {
      return res.status(400).json({error: 'Doha ID is required'})
    }
    
    const dohaViewsRef = firestoreAdmin.collection('dohaViews')
    const q = dohaViewsRef.where('dohaId', '==', dohaId)
    const dohaViewSnapshot = await q.get()

    if (dohaViewSnapshot.empty) {
      // Create a new document with the dohaId and set the initial view count to 1
      await dohaViewsRef.add({dohaId, views: 1})
    } else {
      // Increment the view count of the existing document
      const dohaViewDoc = dohaViewSnapshot.docs[0]
      await dohaViewsRef.doc(dohaViewDoc.id).update({
        views: dohaViewDoc.data().views + 1,
      })
    }

    return res.status(200).json({message: 'View count incremented'})
  }

  return res.status(405).json({error: 'Method not allowed'})
}
