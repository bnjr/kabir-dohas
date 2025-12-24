import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

let firestoreAdmin: any = null

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  const adminApp =
    getApps().length > 0
      ? getApps()[0]
      : initializeApp({
        credential: cert(serviceAccount),
      })
  firestoreAdmin = getFirestore()
} else {
  console.warn('FIREBASE_SERVICE_ACCOUNT missing. Skipping admin initialization.')
}

export { firestoreAdmin }
