import { Reel } from "@/components/food-reels/reel";
import { reels } from "@/lib/placeholder-data";

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-lg px-0 sm:px-4">
      <div className="flex flex-col items-center gap-8 py-4">
        {reels.map((reel) => (
          <Reel key={reel.id} reel={reel} />
        ))}
      </div>
    </div>
  );
}
