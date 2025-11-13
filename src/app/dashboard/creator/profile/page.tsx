'use client';
import { CreatorProfile } from "@/components/food-reels/creator-profile";
import { users, reels } from "@/lib/placeholder-data";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import type { User, Reel as ReelType } from "@/lib/types";
import { useSearchParams } from "next/navigation";

export default function ProfilePage() {
    const { user: authUser } = useAuth();
    const searchParams = useSearchParams();
    const profileId = searchParams.get('id');

    const [creator, setCreator] = useState<User | null>(null);
    const [creatorReels, setCreatorReels] = useState<ReelType[]>([]);

    useEffect(() => {
        let targetUser: User | undefined;

        if (profileId) {
            // View someone else's profile
            targetUser = users.find(u => u.id === profileId && (u.role === 'creator' || u.role === 'admin'));
        } else if (authUser) {
            // View your own profile
            targetUser = users.find(u => u.email === authUser.email && (u.role === 'creator' || u.role === 'admin'));
            if (!targetUser) {
                 targetUser = users.find(u => u.email === authUser.email);
            }
        }
        
        if (targetUser) {
            setCreator(targetUser);
            const userReels = reels.filter(r => r.creator.id === targetUser!.id);
            setCreatorReels(userReels);
        }

    }, [authUser, profileId]);


    if (!creator) return (
        <div className="container mx-auto py-8 text-center">
            <p>Loading profile...</p>
        </div>
    );
    
    return (
        <div className="container mx-auto py-8">
            <CreatorProfile creator={creator} reels={creatorReels} />
        </div>
    );
}
