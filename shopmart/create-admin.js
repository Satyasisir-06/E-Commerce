import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firebaseConfig } from '../firebase';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createAdminUser() {
    try {
        // Create admin user in Firestore users collection
        const adminData = {
            email: 'admin@shopmart.com',
            displayName: 'Admin User',
            role: 'admin',
            phone: '9876543210',
            address: 'Admin Office, ShopMart HQ',
            createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(collection(db, 'users'), adminData);
        console.log('✅ Admin user document created with ID:', docRef.id);
        console.log('📧 Email: admin@shopmart.com');
        console.log('🔑 Password: Set this when you register in the app');
        console.log('\n📝 NEXT STEPS:');
        console.log('1. Register at http://localhost:5173/register with email: admin@shopmart.com');
        console.log('2. Use any password (min 6 characters)');
        console.log('3. After registration, manually update the Firestore user document with role: "admin"');
        console.log('4. Or follow the instructions below to update via Firebase Console\n');
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
    }
}

createAdminUser();
