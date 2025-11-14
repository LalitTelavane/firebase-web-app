
'use client';

import { useFirebase } from '@/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  signInAnonymously as firebaseSignInAnonymously,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import type { User } from '@/lib/types';


export const useAuth = () => {
  const { auth, firestore, user, isUserLoading, userError } = useFirebase();
  const [appUser, setAppUser] = useState<User | null>(null);

  useEffect(() => {
    if (user && firestore && !user.isAnonymous) {
      const userDocRef = doc(firestore, 'users', user.uid);
      const unsubscribe = getDoc(userDocRef).then(docSnap => {
        if(docSnap.exists()){
            setAppUser(docSnap.data() as User)
        }
      });
      // In a real useEffect, you'd return an unsubscribe function
      // but for a one-time getDoc, this is fine.
    } else {
        setAppUser(null);
    }
  }, [user, firestore])


  const signUpWithEmail = async (email: string, password: string) => {
    if (!auth || !firestore) throw new Error("Auth or Firestore service not available");
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;

    // Determine role and name based on email
    let role = 'creator'; // Default role is now 'creator'
    let name = email.split('@')[0]; // Default name from email

    if (email.toLowerCase() === 'lalittelavane9@admin.com') {
      role = 'admin';
      name = 'Admin';
    }
    
    await updateProfile(newUser, { displayName: name });

    const userDocRef = doc(firestore, 'users', newUser.uid);
    const userDocData = {
        id: newUser.uid,
        email: newUser.email,
        name: name,
        role: role,
        avatarUrl: newUser.photoURL || `https://picsum.photos/seed/${newUser.uid}/150/150`
    };
    await setDoc(userDocRef, userDocData);

    if (role === 'admin') {
      const adminRoleDoc = doc(firestore, 'roles_admin', newUser.uid);
      await setDoc(adminRoleDoc, { grantedAt: new Date() });
    }

    setAppUser(userDocData); // Immediately update local app user state

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
    setAppUser(null);
    return firebaseSignOut(auth);
  };

  return {
    user,
    isUserLoading,
    userError,
    appUser, // Expose appUser which contains role
    signUpWithEmail,
    signInWithEmail,
    signInAnonymously,
    signOut,
    db: firestore
  };
};

    