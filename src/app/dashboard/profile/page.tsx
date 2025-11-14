
'use client';
import { CreatorProfile } from "@/components/food-reels/creator-profile";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import type { User, Reel as ReelType } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { orders } from "@/lib/placeholder-orders";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";

export default function ProfilePage() {
    const { user: authUser, db } = useAuth();
    const firestore = useFirestore();
    const searchParams = useSearchParams();
    const profileId = searchParams.get('id');

    const [profileUser, setProfileUser] = useState<User | null>(null);

    // Determine whose profile to view
    const targetUserId = profileId || authUser?.uid;

    const userReelsQuery = useMemoFirebase(() => {
        if (!firestore || !targetUserId) return null;
        return query(collection(firestore, "videos"), where("creatorId", "==", targetUserId));
    }, [firestore, targetUserId]);

    const { data: userReels, isLoading: reelsLoading } = useCollection<ReelType>(userReelsQuery);

    useEffect(() => {
        // This simplified effect now only sets the user object for the profile header.
        // The reels are handled by the useCollection hook.
        if (profileId) {
            // In a real app, you would fetch this user's profile from Firestore.
            // For now, we are missing the full user list to search from.
            // This part will not work correctly without a `users` collection query.
            console.warn("Viewing other profiles is not fully supported without a user list.");
        } else if (authUser) {
            // For viewing your own profile
            setProfileUser({
                id: authUser.uid,
                name: authUser.displayName || 'User',
                email: authUser.email || '',
                avatarUrl: authUser.photoURL || '',
                role: 'user' // This might not be accurate, would need to fetch from 'users' doc
            });
        }
    }, [authUser, profileId]);


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
            />
        </div>
    );
}

    