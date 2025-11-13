
'use client';
import { useAuth } from '@/hooks/use-auth';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

export default function Home() {
  const { user, isUserLoading } = useAuth();
  const firestore = useFirestore();

  useEffect(() => {
    if (!isUserLoading) {
      if (user && firestore) {
        if (user.isAnonymous) {
          redirect('/dashboard');
          return;
        }

        const userDocRef = doc(firestore, 'users', user.uid);
        getDoc(userDocRef).then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.role === 'admin') {
              redirect('/dashboard/admin');
            } else if (userData.role === 'creator') {
              redirect('/dashboard/creator');
            } else {
              redirect('/dashboard');
            }
          } else {
            // New user, default to user dashboard
            redirect('/dashboard');
          }
        }).catch(() => {
            // If there's an error fetching, default to user dashboard
            redirect('/dashboard');
        });

      } else {
        redirect('/login');
      }
    }
  }, [user, isUserLoading, firestore]);

  // You can show a loading indicator here while checking auth state
  return (
    <div className="flex h-screen items-center justify-center">
      <p>Loading...</p>
    </div>
  );
}
