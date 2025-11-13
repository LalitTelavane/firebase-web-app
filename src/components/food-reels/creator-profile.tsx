import Image from "next/image";
import type { User, Reel } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusSquare, Video, Heart, MessageCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


type CreatorProfileProps = {
  creator: User;
  reels: Reel[];
};

export function CreatorProfile({ creator, reels }: CreatorProfileProps) {
  const isAdmin = creator.role === 'creator' || creator.role === 'admin';
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
        <Avatar className="h-32 w-32 border-4 border-primary">
          <AvatarImage src={creator.avatarUrl} alt={creator.name} data-ai-hint="person face" />
          <AvatarFallback className="text-5xl">{creator.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left md:ml-6">
          <h2 className="font-headline text-4xl font-bold">{creator.name}</h2>
          <p className="text-muted-foreground">{creator.email}</p>
          {isAdmin && (
            <div className="mt-4 flex gap-2 justify-center md:justify-start">
                <Button>
                <Video className="mr-2 h-4 w-4" /> Add Story
                </Button>
                <Button variant="secondary">
                <PlusSquare className="mr-2 h-4 w-4" /> Upload Video
                </Button>
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="reels" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reels">Reels</TabsTrigger>
            <TabsTrigger value="admin" disabled={!isAdmin}>Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="reels">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 mt-4">
                {reels.map(reel => (
                    <Card key={reel.id} className="overflow-hidden group cursor-pointer">
                        <CardContent className="p-0 relative aspect-[9/16]">
                            <Image src={reel.videoUrl} alt={reel.description} fill className="object-cover" data-ai-hint="food" />
                             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="flex items-center gap-4 text-white">
                                    <div className="flex items-center gap-1">
                                        <Heart className="h-4 w-4" />
                                        <span className="text-xs font-bold">{reel.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageCircle className="h-4 w-4" />
                                        <span className="text-xs font-bold">{(reel.likes / 5).toFixed(0)}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </TabsContent>
         <TabsContent value="admin">
            <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold">Admin Panel</h3>
                <p className="text-muted-foreground">Video upload and management features will be here.</p>
            </div>
        </TabsContent>
        </Tabs>

    </div>
  );
}
