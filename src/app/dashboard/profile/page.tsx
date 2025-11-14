
'use client';
import { CreatorProfile } from "@/components/food-reels/creator-profile";
import { users, reels } from "@/lib/placeholder-data";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import type { User, Reel as ReelType } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { orders } from "@/lib/placeholder-orders";

export default function ProfilePage() {
    const { user: authUser } = useAuth();
    const searchParams = useSearchParams();
    const profileId = searchParams.get('id');

    const [profileUser, setProfileUser] = useState<User | null>(null);
    const [userReels, setUserReels] = useState<ReelType[]>([]);

    useEffect(() => {
        let targetUser: User | undefined;

        if (profileId) {
            // View someone else's profile
            targetUser = users.find(u => u.id === profileId);
        } else if (authUser) {
            // View your own profile
            targetUser = users.find(u => u.email === authUser.email);
        }
        
        if (targetUser) {
            setProfileUser(targetUser);
            const foundReels = reels.filter(r => r.creator.id === targetUser!.id);
            setUserReels(foundReels);
        }

    }, [authUser, profileId]);


    if (!profileUser) return (
        <div className="container mx-auto py-8 text-center">
            <p>Loading profile...</p>
        </div>
    );
    
    // All users now see the CreatorProfile, which will contain all views.
    return (
        <div className="container mx-auto py-8">
            <CreatorProfile creator={profileUser} reels={userReels} purchaseHistory={orders} />
        </div>
    );
}
