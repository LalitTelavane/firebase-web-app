import { CreatorProfile } from "@/components/food-reels/creator-profile";
import { users, reels } from "@/lib/placeholder-data";

export default function ProfilePage() {
    const creator = users.find(u => u.role === 'creator');
    const creatorReels = reels.filter(r => r.creator.id === creator?.id);

    if (!creator) return <div>Creator not found</div>;
    
    return (
        <div className="container mx-auto py-8">
            <CreatorProfile creator={creator} reels={creatorReels} />
        </div>
    );
}
