
'use client';

import Image from "next/image";
import { useState } from "react";
import type { User, Reel, Order } from "@/lib/types";
import { users as allUsers } from "@/lib/placeholder-data";
import { orders as allOrders } from "@/lib/placeholder-orders";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusSquare, Video, Heart, MessageCircle, Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


type CreatorProfileProps = {
  creator: User;
  reels: Reel[];
};

export function CreatorProfile({ creator, reels }: CreatorProfileProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const isCreatorOrAdmin = creator.role === 'creator' || creator.role === 'admin';

  // Find orders that contain items from this creator's reels
  const creatorProductIds = reels.map(r => r.product.id);
  const creatorOrders = allOrders
    .map(order => {
        const creatorItems = order.items.filter(item => {
            // Find which reel the ordered item belongs to
            const reel = reels.find(r => r.product.name === item.name);
            return reel && reel.creator.id === creator.id;
        });

        if (creatorItems.length === 0) return null;

        const orderingUser = allUsers.find(u => u.id === 'user-1'); // Placeholder: in real app find user who made order

        return {
            ...order,
            items: creatorItems,
            customerName: orderingUser ? orderingUser.name : 'Unknown User'
        };
    })
    .filter(Boolean) as (Order & { customerName: string })[];


  const handleUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const description = formData.get("description") as string;
    const productName = formData.get("productName") as string;
    const price = formData.get("price") as string;

    if (description && productName && price) {
        // In a real app, you would handle file upload and then save to a database.
        // Here we just show a success message.
        toast({
            title: "Reel Uploaded!",
            description: `Your new reel "${description.slice(0,20)}..." is now live.`
        });
        setOpen(false);
    }
  };

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
          {isCreatorOrAdmin && (
            <div className="mt-4 flex gap-2 justify-center md:justify-start">
                <Button>
                    <Video className="mr-2 h-4 w-4" /> Add Story
                </Button>
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="reels" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reels">My Content</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="reels">
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Your Reels</span>
                         <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                               <Button variant="outline">
                                    <Upload className="mr-2 h-4 w-4" /> Upload New Reel
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                <DialogTitle>Upload New Reel</DialogTitle>
                                <DialogDescription>
                                    Add a new video and product to your profile.
                                </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleUpload}>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="description">Reel Description</Label>
                                            <Textarea id="description" name="description" placeholder="Describe your amazing creation..." required />
                                        </div>
                                         <div className="grid gap-2">
                                            <Label htmlFor="productName">Product Name</Label>
                                            <Input id="productName" name="productName" placeholder="e.g., Gourmet Burger" required />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="price">Product Price</Label>
                                            <Input id="price" name="price" type="number" placeholder="e.g., 15.99" step="0.01" required />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="video">Video File</Label>
                                            <Input id="video" name="video" type="file" required />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Upload</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     {reels.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
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
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>{isCreatorOrAdmin ? "You haven't uploaded any reels yet." : "This user hasn't uploaded any reels."}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="orders">
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {creatorOrders.length > 0 ? creatorOrders.flatMap(order => 
                                order.items.map(item => (
                                    <TableRow key={`${order.id}-${item.id}`}>
                                        <TableCell>{order.customerName}</TableCell>
                                        <TableCell>{item.name} (x{item.quantity})</TableCell>
                                        <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                                        <TableCell>{order.orderDate}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-24">
                                        No orders from your reels yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
