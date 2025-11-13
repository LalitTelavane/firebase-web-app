"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Reel as ReelType } from "@/lib/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageCircle, ShoppingCart, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/cart-context";

type ReelProps = {
  reel: ReelType;
};

export function Reel({ reel }: ReelProps) {
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(reel.product);
    toast({
      title: "Added to cart!",
      description: `${reel.product.name} is now in your cart.`,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto snap-center overflow-hidden rounded-2xl shadow-lg border-2">
      <CardHeader className="flex flex-row items-center gap-3 p-3">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src={reel.creator.avatarUrl} alt={reel.creator.name} data-ai-hint="person face" />
          <AvatarFallback>{reel.creator.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="font-semibold text-sm">{reel.creator.name}</p>
      </CardHeader>
      <CardContent className="p-0 relative aspect-[9/16]">
        <Image
          src={reel.videoUrl}
          alt={reel.description}
          fill
          className="object-cover"
          data-ai-hint="food cooking"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end h-1/3">
          <p className="text-white text-sm line-clamp-2">{reel.description}</p>
        </div>
      </CardContent>
      <CardFooter className="p-2 grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 justify-start gap-2 text-muted-foreground hover:text-red-500"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={cn("h-5 w-5", isLiked ? "fill-red-500 text-red-500" : "")} />
            <span className="text-xs">{isLiked ? reel.likes + 1 : reel.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 justify-start gap-2 text-muted-foreground">
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs">{(reel.likes / 5).toFixed(0)}</span>
          </Button>
        </div>
        <Button onClick={handleAddToCart} className="bg-accent text-accent-foreground hover:bg-accent/90">
          <ShoppingCart className="mr-2 h-4 w-4" />
          <span className="text-xs sm:text-sm">Add - ${reel.product.price.toFixed(2)}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
