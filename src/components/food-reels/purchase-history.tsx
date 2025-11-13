
'use client';

import type { User, Order } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Separator } from "../ui/separator";

type PurchaseHistoryProps = {
  user: User;
  orders: Order[];
};

export function PurchaseHistory({ user, orders }: PurchaseHistoryProps) {
  return (
    <div className="space-y-8">
        <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person face" />
                <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Purchase History</CardTitle>
                <CardDescription>A record of all your past orders.</CardDescription>
            </CardHeader>
            <CardContent>
                {orders.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                    {orders.map((order, index) => (
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
    </div>
  );
}
