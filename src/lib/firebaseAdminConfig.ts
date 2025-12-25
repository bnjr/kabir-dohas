import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

let firestoreAdmin: any = null

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    if (getApps().length === 0) {
      initializeApp({
        credential: cert(serviceAccount),
      })
      console.log('Firebase Admin initialized with service account.')
    }
    firestoreAdmin = getFirestore()
  } catch (error) {
    console.error('Error initializing Firebase Admin with service account:', error)
  }
} else {
  console.warn('FIREBASE_SERVICE_ACCOUNT missing. Attempting to use default application credentials.')
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    console.log('Firebase Admin Fallback - Project ID from env:', projectId)
    let app;
    const adminAppName = 'admin-app'
    const existingApp = getApps().find(a => a.name === adminAppName)

    if (!existingApp) {
      console.log('Initializing named Admin app...')
      app = initializeApp({
        projectId: projectId
      }, adminAppName)
      console.log(`Named Admin app initialized for project: ${projectId}`)
    } else {
      console.log('Existing named Admin app found')
      app = existingApp
    }
    firestoreAdmin = getFirestore(app)
  } catch (error) {
    console.error('Could not initialize Firebase Admin with default credentials. Firestore admin functionality will be disabled.', error)
  }
}

export { firestoreAdmin }
