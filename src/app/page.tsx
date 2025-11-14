
'use client';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

export default function Home() {
  const { user, isUserLoading } = useAuth();
  const firestore = useFirestore();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading) {
      if (user && firestore) {
        if (user.isAnonymous) {
          router.push('/dashboard');
          return;
        }

        const userDocRef = doc(firestore, 'users', user.uid);
        getDoc(userDocRef).then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.role === 'admin') {
              router.push('/dashboard/admin');
            } else {
              router.push('/dashboard');
            }
          } else {
            // New user, default to user dashboard
            router.push('/dashboard');
          }
        }).catch(() => {
            // If there's an error fetching, default to user dashboard
            router.push('/dashboard');
        });

      } else {
        router.push('/login');
      }
    }
  }, [user, isUserLoading, firestore, router]);

  // You can show a loading indicator here while checking auth state
  return (
    <div className="flex h-screen items-center justify-center">
      <p>Loading...</p>
    </div>
  );
}
