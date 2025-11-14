'use client';
import { CreatorProfile } from "@/components/food-reels/creator-profile";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import type { User, Reel as ReelType } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { orders } from "@/lib/placeholder-orders";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where, doc, getDoc } from "firebase/firestore";

export default function AdminProfilePage() {
    const { user: authUser, appUser: viewerUser } = useAuth();
    const firestore = useFirestore();
    const searchParams = useSearchParams();
    const profileId = searchParams.get('id');

    const [profileUser, setProfileUser] = useState<User | null>(null);

    // Determine whose profile to view. If no ID, admin is viewing their own profile.
    const targetUserId = profileId || authUser?.uid;

    const userReelsQuery = useMemoFirebase(() => {
        if (!firestore || !targetUserId) return null;
        // Always query reels for the target user, whether it's the admin's own profile or another user's.
        return query(collection(firestore, "videos"), where("creatorId", "==", targetUserId));
    }, [firestore, targetUserId]);

    const { data: userReels } = useCollection<ReelType>(userReelsQuery);

    useEffect(() => {
        if (targetUserId && firestore) {
            const userDocRef = doc(firestore, 'users', targetUserId);
            getDoc(userDocRef).then((docSnap) => {
                if (docSnap.exists()) {
                    setProfileUser(docSnap.data() as User);
                } else {
                    // Fallback for viewing own profile if doc not found yet, or for a user not in DB
                     if (authUser && targetUserId === authUser.uid) {
                        setProfileUser({
                            id: authUser.uid,
                            name: authUser.displayName || 'Admin',
                            email: authUser.email || '',
                            avatarUrl: authUser.photoURL || '',
                            role: 'admin'
                        });
                    }
                }
            });
        }
    }, [authUser, targetUserId, firestore]);


    if (!profileUser) return (
        <div className="container mx-auto py-8 text-center">
            <p>Loading profile...</p>
        </div>
    );
    
    return (
        <div className="container mx-auto py-8">
            <CreatorProfile 
                creator={profileUser} 
                reels={userReels || []} 
                purchaseHistory={orders}
                viewerRole={viewerUser?.role}
            />
        </div>
    );
}
