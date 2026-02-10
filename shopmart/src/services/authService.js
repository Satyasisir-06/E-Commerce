// Firebase Authentication Service
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile,
    sendEmailVerification,
    setPersistence,
    browserLocalPersistence
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, facebookProvider, db } from '../firebase';

// Enable persistence
setPersistence(auth, browserLocalPersistence);

/**
 * Register a new user with email and password
 */
export const registerWithEmail = async (email, password, displayName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update profile with display name
        await updateProfile(user, {
            displayName: displayName
        });

        // Send email verification
        await sendEmailVerification(user);

        // Create user document in Firestore
        await createUserDocument(user, { displayName });

        return {
            success: true,
            user: user,
            message: 'Account created! Please check your email to verify your account.'
        };
    } catch (error) {
        console.error('Registration error:', error);
        return {
            success: false,
            error: error.code,
            message: getErrorMessage(error.code)
        };
    }
};

/**
 * Sign in with email and password
 */
export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return {
            success: true,
            user: userCredential.user
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            error: error.code,
            message: getErrorMessage(error.code)
        };
    }
};

/**
 * Sign in with Google
 */
export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Create or update user document
        await createUserDocument(user);

        return {
            success: true,
            user: user
        };
    } catch (error) {
        console.error('Google sign-in error:', error);
        return {
            success: false,
            error: error.code,
            message: getErrorMessage(error.code)
        };
    }
};

/**
 * Sign in with Facebook
 */
export const loginWithFacebook = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;

        // Create or update user document
        await createUserDocument(user);

        return {
            success: true,
            user: user
        };
    } catch (error) {
        console.error('Facebook sign-in error:', error);
        return {
            success: false,
            error: error.code,
            message: getErrorMessage(error.code)
        };
    }
};

/**
 * Sign out the current user
 */
export const logoutUser = async () => {
    try {
        await signOut(auth);
        return {
            success: true,
            message: 'Logged out successfully'
        };
    } catch (error) {
        console.error('Logout error:', error);
        return {
            success: false,
            error: error.code,
            message: 'Failed to logout'
        };
    }
};

/**
 * Send password reset email
 */
export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return {
            success: true,
            message: 'Password reset email sent! Check your inbox.'
        };
    } catch (error) {
        console.error('Password reset error:', error);
        return {
            success: false,
            error: error.code,
            message: getErrorMessage(error.code)
        };
    }
};

/**
 * Create or update user document in Firestore
 */
const createUserDocument = async (user, additionalData = {}) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        const { email, displayName, photoURL } = user;
        const createdAt = serverTimestamp();

        try {
            await setDoc(userRef, {
                displayName: displayName || additionalData.displayName || '',
                email,
                photoURL: photoURL || '',
                createdAt,
                updatedAt: createdAt,
                role: 'customer', // default role
                verified: user.emailVerified,
                ...additionalData
            });
        } catch (error) {
            console.error('Error creating user document:', error);
        }
    }
};

/**
 * Listen to auth state changes
 */
export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

/**
 * Get current user
 */
export const getCurrentUser = () => {
    return auth.currentUser;
};

/**
 * Convert Firebase error codes to user-friendly messages
 */
const getErrorMessage = (errorCode) => {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email is already registered. Please login instead.';
        case 'auth/invalid-email':
            return 'Invalid email address.';
        case 'auth/operation-not-allowed':
            return 'Operation not allowed. Please contact support.';
        case 'auth/weak-password':
            return 'Password is too weak. Use at least 6 characters.';
        case 'auth/user-disabled':
            return 'This account has been disabled.';
        case 'auth/user-not-found':
            return 'No account found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        case 'auth/invalid-credential':
            return 'Invalid email or password.';
        case 'auth/too-many-requests':
            return 'Too many failed attempts. Please try again later.';
        case 'auth/network-request-failed':
            return 'Network error. Please check your connection.';
        case 'auth/popup-closed-by-user':
            return 'Sign-in popup was closed.';
        default:
            return 'An error occurred. Please try again.';
    }
};
