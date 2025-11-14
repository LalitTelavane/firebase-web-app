
'use client';

import { Reel } from "@/components/food-reels/reel";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import type { Reel as ReelType } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const firestore = useFirestore();
  
  const reelsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "videos"), orderBy("uploadDate", "desc"));
  }, [firestore]);
  
  const { data: reels, isLoading } = useCollection<ReelType>(reelsQuery);

  const renderSkeletons = () => (
    Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="w-full max-w-md mx-auto snap-center overflow-hidden rounded-2xl shadow-lg border-2 space-y-3 p-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="w-full aspect-[9/16]" />
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      </div>
    ))
  );

  return (
    <div className="container mx-auto max-w-lg px-0 sm:px-4">
      <div className="flex flex-col items-center gap-8 py-4">
        {isLoading && renderSkeletons()}
        {reels && reels.map((reel) => (
          <Reel key={reel.id} reel={reel} />
        ))}
        {!isLoading && reels?.length === 0 && (
            <div className="text-center text-muted-foreground pt-20">
                <h2 className="text-2xl font-semibold">No Reels Yet</h2>
                <p>Be the first one to upload a video!</p>
            </div>
        )}
      </div>
    </div>
  );
}

    