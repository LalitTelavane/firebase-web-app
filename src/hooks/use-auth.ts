
'use client';

import { useFirebase } from '@/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  signInAnonymously as firebaseSignInAnonymously,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const useAuth = () => {
  const { auth, firestore, user, isUserLoading, userError } = useFirebase();

  const signUpWithEmail = async (email: string, password: string) => {
    if (!auth || !firestore) throw new Error("Auth or Firestore service not available");
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Determine role and name based on email
    let role = 'user';
    let name = email.split('@')[0]; // Default name from email

    if (email.toLowerCase() === 'lalittelavane9@admin.com') {
      role = 'admin';
      name = 'Admin';
    } else if (email.endsWith('@student')) {
      role = 'creator';
    }
    
    await updateProfile(user, { displayName: name });

    const userDocRef = doc(firestore, 'users', user.uid);
    await setDoc(userDocRef, {
        id: user.uid,
        email: user.email,
        name: name,
        role: role,
        avatarUrl: user.photoURL || `https://picsum.photos/seed/${user.uid}/150/150`
    });

    if (role === 'admin') {
      const adminRoleDoc = doc(firestore, 'roles_admin', user.uid);
      await setDoc(adminRoleDoc, { grantedAt: new Date() });
    }

    return userCredential;
  };

  const signInWithEmail = (email: string, password: string) => {
    if (!auth) throw new Error("Auth service not available");
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  const signInAnonymously = () => {
    if (!auth) throw new Error("Auth service not available");
    return firebaseSignInAnonymously(auth);
  }

  const signOut = () => {
    if (!auth) throw new Error("Auth service not available");
    return firebaseSignOut(auth);
  };

  return {
    user,
    isUserLoading,
    userError,
    signUpWithEmail,
    signInWithEmail,
    signInAnonymously,
    signOut,
  };
};
