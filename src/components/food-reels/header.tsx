
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FoodReelsLogo } from "./logo";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";
import { UserNav } from "./user-nav";
import { Cart } from "./cart";
import { useAuth } from "@/hooks/use-auth";
import { users } from "@/lib/placeholder-data";
import type { User as UserType } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function AppHeader() {
  const { user, isUserLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserType[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const creators = users.filter((u) => u.role === 'creator' || u.role === 'admin');
      const filteredCreators = creators.filter((creator) => {
        const emailName = creator.email.split('@')[0];
        return emailName.toLowerCase().startsWith(searchQuery.toLowerCase()) || creator.name.toLowerCase().startsWith(searchQuery.toLowerCase());
      });
      setSearchResults(filteredCreators);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  if (!isClient) {
    // Render a placeholder or nothing on the server to prevent hydration mismatch
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm">
            <div className="flex items-center gap-4">
                <FoodReelsLogo />
            </div>
            <div className="flex items-center gap-2">
                {/* Skeleton or placeholder for nav items */}
            </div>
        </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <FoodReelsLogo />
      </div>
      <div className="hidden sm:block flex-1 max-w-md mx-4">
        <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for creators..."
                className="pl-10 h-9 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </PopoverTrigger>
          {searchResults.length > 0 && (
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
              <div className="flex flex-col gap-1 p-2">
                {searchResults.map((creator) => (
                  <Link
                    key={creator.id}
                    href={`/dashboard/profile?id=${creator.id}`}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-accent"
                    onClick={() => {
                        setSearchQuery('');
                        setIsSearchOpen(false);
                    }}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={creator.avatarUrl} alt={creator.name} />
                      <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{creator.name}</p>
                      <p className="text-xs text-muted-foreground">{creator.email}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </PopoverContent>
          )}
        </Popover>
      </div>
      <div className="flex items-center gap-2">
        {!isUserLoading && user && (
          <>
            <Cart />
            <UserNav />
          </>
        )}
      </div>
    </header>
  );
}
