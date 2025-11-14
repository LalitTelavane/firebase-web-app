
'use client';

import Image from "next/image";
import { useState } from "react";
import type { User, Reel, Order } from "@/lib/types";
import { users as allUsers } from "@/lib/placeholder-data";
import { orders as allOrders } from "@/lib/placeholder-orders";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusSquare, Video, Heart, MessageCircle, Upload, HardDriveUpload, CloudUpload } from "lucide-react";
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";


type CreatorProfileProps = {
  creator: User;
  reels: Reel[];
  purchaseHistory: Order[];
};

export function CreatorProfile({ creator, reels, purchaseHistory }: CreatorProfileProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { user, db } = useAuth();


  // Find orders that contain items from this creator's reels
  const creatorOrders = allOrders
    .map(order => {
        const creatorItems = order.items.filter(item => {
            const reel = reels.find(r => r.product.name === item.name);
            return reel && reel.creator.id === creator.id;
        });

        if (creatorItems.length === 0) return null;

        const orderingUser = allUsers.find(u => u.id === 'user-1');

        return {
            ...order,
            items: creatorItems,
            customerName: orderingUser ? orderingUser.name : 'Unknown User'
        };
    })
    .filter(Boolean) as (Order & { customerName: string })[];


  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user || !db) return;

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const productName = formData.get("productName") as string;
    const price = formData.get("price") as string;
    
    // In a real app, you'd upload the video to Firebase Storage and get the URL
    // For now, we'll use a placeholder.
    const videoUrl = `https://picsum.photos/seed/${Math.random()}/450/800`;
    const thumbnailUrl = `https://picsum.photos/seed/${Math.random()}/450/800`;

    if (title && description && productName && price) {
        try {
            await addDoc(collection(db, "videos"), {
                creatorId: user.uid,
                title: title,
                description: description,
                videoUrl: videoUrl,
                thumbnailUrl: thumbnailUrl,
                uploadDate: serverTimestamp(),
                likes: 0,
                product: {
                    name: productName,
                    price: parseFloat(price),
                    imageUrl: `https://picsum.photos/seed/${Math.random()}/150/150`
                },
                // Add creator info for easy access on the client
                creator: {
                    id: user.uid,
                    name: user.displayName,
                    avatarUrl: user.photoURL
                }
            });
            toast({
                title: "Reel Uploaded!",
                description: `Your new reel "${title}" is now live.`
            });
            setOpen(false);
        } catch (error) {
            console.error("Error uploading reel: ", error);
            toast({
                variant: "destructive",
                title: "Upload Failed",
                description: "There was a problem uploading your reel."
            });
        }
    }
  };

  const handleGoogleDriveUpload = () => {
    toast({
        title: "Coming Soon!",
        description: "Google Drive integration is not yet available."
    })
  }

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
        </div>
      </div>

      <Tabs defaultValue="reels" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reels">My Content</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="purchases">My Purchases</TabsTrigger>
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
                                    Add a new video and product to your profile. Max 1 min.
                                </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleUpload}>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="title">Title</Label>
                                            <Input id="title" name="title" placeholder="e.g. My Amazing Recipe" required />
                                        </div>
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
                                            <Label>Video Source</Label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <Button type="button" variant="outline" asChild>
                                                   <Label htmlFor="video-file" className="cursor-pointer h-full flex flex-col items-center justify-center gap-2">
                                                        <HardDriveUpload className="h-6 w-6" />
                                                        <span>From Device</span>
                                                    </Label>
                                                </Button>
                                                <Input id="video-file" name="video" type="file" className="hidden" required accept="video/mp4,video/quicktime,video/x-m4v,video/*" />
                                                <Button type="button" variant="outline" className="flex flex-col items-center justify-center gap-2 h-full" onClick={handleGoogleDriveUpload}>
                                                    <CloudUpload className="h-6 w-6" />
                                                    <span>Google Drive</span>
                                                </Button>
                                            </div>
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
                            <p>You haven't uploaded any reels yet.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="orders">
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Recent Orders From Your Reels</CardTitle>
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
        <TabsContent value="purchases">
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Your Purchase History</CardTitle>
                    <CardDescription>A record of all your past orders.</CardDescription>
                </CardHeader>
                <CardContent>
                    {purchaseHistory.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                        {purchaseHistory.map((order, index) => (
                            <AccordionItem value={`item-${index}`} key={order.id}>
                                <AccordionTrigger>
                                    <div className="flex justify-between w-full pr-4">
                                        <div className="text-left">
                                            <p className="font-semibold">Order #{order.id.slice(-6)}</p>
                                            <p className="text-sm text-muted-foreground">{order.orderDate}</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="font-semibold">${order.totalAmount.toFixed(2)}</p>
                                            <Badge 
                                                variant={order.status === 'Delivered' ? 'default' : order.status === 'Cancelled' ? 'destructive' : 'secondary'}
                                                className="mt-1"
                                            >
                                                {order.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-4">
                                        {order.items.map(item => (
                                            <div key={item.id} className="flex items-center gap-4">
                                                <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint="food"/>
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        ))}
                                        <Separator />
                                        <div className="flex justify-end font-bold">
                                            <p>Total: ${order.totalAmount.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>You haven&apos;t made any purchases yet.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    