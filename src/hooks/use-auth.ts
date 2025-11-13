
'use client';

import { useFirebase } from '@/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  signInAnonymously as firebaseSignInAnonymously,
  updateProfile
} from 'firebase/auth';

export const useAuth = () => {
  const { auth, user, isUserLoading, userError } = useFirebase();

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    if (!auth) throw new Error("Auth service not available");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
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
