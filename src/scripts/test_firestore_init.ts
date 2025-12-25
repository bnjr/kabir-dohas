// src/scripts/test_firestore_init.ts
import { firestoreAdmin } from '../lib/firebaseAdminConfig.ts';

async function testInit() {
    console.log('--- Testing Firestore Initialization ---');
    if (firestoreAdmin) {
        console.log('✓ firestoreAdmin is initialized.');
        try {
            // Try to access a collection to see if it throws
            const collections = await firestoreAdmin.listCollections();
            console.log(`✓ successfully listed ${collections.length} collections.`);
        } catch (e: any) {
            console.log(`! Could not list collections (expected if not actually connected): ${e.message}`);
        }
    } else {
        console.log('✗ firestoreAdmin is NOT initialized.');
    }
}

testInit().catch(console.error);
