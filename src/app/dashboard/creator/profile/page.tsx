'use client';
import { CreatorProfile } from "@/components/food-reels/creator-profile";
import { users, reels } from "@/lib/placeholder-data";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import type { User, Reel as ReelType } from "@/lib/types";

export default function ProfilePage() {
    const { user: authUser } = useAuth();
    const [creator, setCreator] = useState<User | null>(null);
    const [creatorReels, setCreatorReels] = useState<ReelType[]>([]);

    useEffect(() => {
        if (authUser) {
            // In a real app, you'd fetch this from your backend based on authUser.uid
            const currentCreator = users.find(u => u.email === authUser.email && (u.role === 'creator' || u.role === 'admin'));
            if (currentCreator) {
                setCreator(currentCreator);
                const aReels = reels.filter(r => r.creator.id === currentCreator.id);
                setCreatorReels(aReels);
            } else {
                 const currentUser = users.find(u => u.email === authUser.email);
                 if(currentUser) setCreator(currentUser);
            }
        }
    }, [authUser]);


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
