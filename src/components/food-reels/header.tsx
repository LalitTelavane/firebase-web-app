import { FoodReelsLogo } from "./logo";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { UserNav } from "./user-nav";
import { Cart } from "./cart";

export function AppHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <FoodReelsLogo />
      </div>
      <div className="hidden sm:block flex-1 max-w-md mx-4">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for food, creators..." className="pl-10 h-9 rounded-full" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Cart />
        <UserNav />
      </div>
    </header>
  );
}
