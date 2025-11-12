import { UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';

export function FoodReelsLogo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2 group">
      <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
        <UtensilsCrossed className="h-6 w-6 text-primary" />
      </div>
      <h1 className="font-headline text-2xl font-bold text-primary tracking-wider hidden sm:block">
        FoodReels
      </h1>
    </Link>
  );
}
