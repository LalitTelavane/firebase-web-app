
'use client';
import { CreatorProfile } from "@/components/food-reels/creator-profile";
import { users, reels } from "@/lib/placeholder-data";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import type { User, Reel as ReelType } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { PurchaseHistory } from "@/components/food-reels/purchase-history";
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
            // View someone else's profile (usually a creator)
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

    const isCreator = profileUser.role === 'creator' || profileUser.role === 'admin';
    
    // If viewing a creator's profile (or your own creator profile), show CreatorProfile
    if (isCreator) {
        return (
            <div className="container mx-auto py-8">
                <CreatorProfile creator={profileUser} reels={userReels} />
            </div>
        );
    }

    // Otherwise, show the regular user's purchase history
    return (
        <div className="container mx-auto py-8">
            <PurchaseHistory user={profileUser} orders={orders} />
        </div>
    );
}
