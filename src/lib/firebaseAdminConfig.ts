import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

let firestoreAdmin: any = null

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    let saString = process.env.FIREBASE_SERVICE_ACCOUNT.trim()
    // Remove wrapping quotes if present
    if ((saString.startsWith("'") && saString.endsWith("'")) ||
      (saString.startsWith('"') && saString.endsWith('"'))) {
      saString = saString.slice(1, -1)
    }
    const serviceAccount = JSON.parse(saString)
    if (getApps().length === 0) {
      initializeApp({
        credential: cert(serviceAccount),
      })
      console.log('Firebase Admin initialized with service account.')
    } else {
      console.log('Firebase Admin already initialized.')
    }
    firestoreAdmin = getFirestore()
  } catch (error) {
    console.error('Error initializing Firebase Admin with service account:', error)
    // Fallback logic below if service account fails
  }
}

// Fallback to default credentials if service account not provided or its initialization failed
if (!firestoreAdmin) {
  console.warn('Attempting to use default application credentials for Firestore.')
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT
    console.log('Firebase Admin Fallback - Project ID:', projectId)

    let app;
    const adminAppName = 'admin-app'
    const existingApp = getApps().find(a => a.name === adminAppName)

    if (!existingApp) {
      console.log('Initializing named Admin app with default credentials...')
      app = initializeApp({
        projectId: projectId
      }, adminAppName)
    } else {
      console.log('Using existing named Admin app')
      app = existingApp
    }
    firestoreAdmin = getFirestore(app)
    console.log('Firestore admin initialized via default credentials.')
  } catch (error) {
    console.error('Final fallback failed. Firestore admin functionality will be disabled.', error)
  }
}

export { firestoreAdmin }
