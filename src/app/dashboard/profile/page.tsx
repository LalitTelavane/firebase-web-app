
'use client';
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import type { User } from "@/lib/types";
import { users } from "@/lib/placeholder-data";
import { PurchaseHistory } from "@/components/food-reels/purchase-history";
import { orders } from "@/lib/placeholder-orders";

export default function ProfilePage() {
    const { user: authUser } = useAuth();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (authUser) {
            // In a real app, you'd fetch this from your backend based on authUser.uid
            const currentUser = users.find(u => u.email === authUser.email);
            if (currentUser) {
                setUser(currentUser);
            }
        }
    }, [authUser]);


    if (!user) return (
        <div className="container mx-auto py-8 text-center">
            <p>Loading profile...</p>
        </div>
    );
    
    // For now, we pass the placeholder orders to the purchase history
    return (
        <div className="container mx-auto py-8">
            <PurchaseHistory user={user} orders={orders} />
        </div>
    );
}
