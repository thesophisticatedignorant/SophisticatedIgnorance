import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
    GoogleAuthProvider, 
    OAuthProvider, 
    signInWithRedirect, 
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    sendPasswordResetEmail
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [emailVerified, setEmailVerified] = useState(false);

    const isPasswordUser = !!user && user.providerData.some(p => p.providerId === 'password');
    const needsEmailVerification = isPasswordUser && !emailVerified;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setEmailVerified(!!currentUser?.emailVerified);
            if (currentUser) {
                try {
                    // Ensure client document exists in Firestore
                    const userRef = doc(db, 'clients', currentUser.uid);
                    const userSnap = await getDoc(userRef);
                    
                    if (!userSnap.exists()) {
                        await setDoc(userRef, {
                            uid: currentUser.uid,
                            email: currentUser.email,
                            displayName: currentUser.displayName,
                            createdAt: serverTimestamp(),
                            totalAcquisitions: 0
                        });
                    }
                } catch (err) {
                    console.error('Could not sync client profile:', err);
                }
                // On startup Firebase reloads the account (so emailVerified can already be
                // true) but keeps the cached ID token, whose email_verified claim may still be
                // false - Firestore rules would then reject inquiries. Refresh it if stale.
                if (currentUser.emailVerified && currentUser.providerData.some(p => p.providerId === 'password')) {
                    try {
                        const { claims } = await currentUser.getIdTokenResult();
                        if (claims.email_verified !== true) await currentUser.getIdToken(true);
                    } catch (err) {
                        console.error('Could not refresh ID token:', err);
                    }
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error("Error signing in with Google:", error);
            throw error;
        }
    };

    const signInWithApple = async () => {
        const provider = new OAuthProvider('apple.com');
        try {
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error("Error signing in with Apple:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const signInWithEmail = async (email, password) => {
        return signInWithEmailAndPassword(auth, email.trim(), password);
    };

    const signUpWithEmail = async (name, email, password) => {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        if (name.trim()) {
            await updateProfile(cred.user, { displayName: name.trim() });
        }
        await sendEmailVerification(cred.user);
        return cred.user;
    };

    const resetPassword = async (email) => {
        return sendPasswordResetEmail(auth, email.trim());
    };

    const resendVerification = async () => {
        return sendEmailVerification(auth.currentUser);
    };

    const refreshVerification = async () => {
        if (!auth.currentUser) return false;
        await auth.currentUser.reload();
        // Force a new token so Firestore rules see email_verified
        await auth.currentUser.getIdToken(true);
        setEmailVerified(!!auth.currentUser.emailVerified);
        return !!auth.currentUser.emailVerified;
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            emailVerified,
            needsEmailVerification,
            signInWithGoogle,
            signInWithApple,
            signInWithEmail,
            signUpWithEmail,
            resetPassword,
            resendVerification,
            refreshVerification,
            logout
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
