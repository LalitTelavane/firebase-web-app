
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import { LogOut, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "../ui/skeleton";
import { useFirestore } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import type { User } from "@/lib/types";


export function UserNav() {
  const router = useRouter();
  const { user, signOut, isUserLoading } = useAuth();
  const firestore = useFirestore();
  const [appUser, setAppUser] = useState<User | null>(null);

  useEffect(() => {
    if (user && firestore && !user.isAnonymous) {
      const userDocRef = doc(firestore, 'users', user.uid);
      getDoc(userDocRef).then(docSnap => {
        if(docSnap.exists()){
            setAppUser(docSnap.data() as User)
        }
      })
    } else {
        setAppUser(null);
    }
  }, [user, firestore])

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  if (isUserLoading) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }
  
  if (!user) {
     return (
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    )
  }

  const userInitial = user.isAnonymous ? 'G' : (appUser?.name?.charAt(0) || '?').toUpperCase();
  const userName = user.isAnonymous ? 'Guest' : (appUser?.name || 'User');
  const userEmail = user.isAnonymous ? '' : user.email;
  
  let profileLink = '/dashboard/profile';
  if (appUser?.role === 'admin') {
    profileLink = '/dashboard/admin/profile';
  } else if (appUser?.id) {
    profileLink = `/dashboard/profile?id=${appUser.id}`;
  }


  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-primary transition-colors">
              <AvatarImage src={appUser?.avatarUrl ?? `https://picsum.photos/seed/creator-avatar-1/40/40`} alt={userName} data-ai-hint="person face" />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {userEmail}
              </p>
            </div>

          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={profileLink} passHref>
              <DropdownMenuItem disabled={user.isAnonymous}>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
