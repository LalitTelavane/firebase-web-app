"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  Wallet,
  ArrowLeft
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { reels } from "@/lib/placeholder-data";
import type { CartItem } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const initialCartItems: CartItem[] = [
  { id: "cart-item-1", reel: reels[0], quantity: 1 },
  { id: "cart-item-2", reel: reels[2], quantity: 2 },
];

type PaymentStep = "cart" | "payment" | "receipt";

export function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [step, setStep] = useState<PaymentStep>("cart");
  const { toast } = useToast();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.reel.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handlePayment = () => {
    toast({
      title: "Order Placed!",
      description: "Your delicious food is on its way.",
    });
    setStep("receipt");
  };

  const resetCart = () => {
      setStep("cart");
  }

  const renderCartContent = () => (
    <>
      <SheetHeader>
        <SheetTitle>Your Cart ({totalItems})</SheetTitle>
        <SheetDescription>
            Review your items before checkout.
        </SheetDescription>
      </SheetHeader>
      {cartItems.length > 0 ? (
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto pr-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-4">
                <Image
                  src={item.reel.videoUrl}
                  alt={item.reel.product.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                  data-ai-hint="food"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.reel.product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ${item.reel.product.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    {item.quantity > 1 ? <Minus className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <SheetFooter className="mt-auto flex flex-col gap-4 pt-4 border-t">
            <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
            <Button className="w-full" onClick={() => setStep("payment")}>
              Proceed to Payment
            </Button>
          </SheetFooter>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-24 w-24 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">Add some delicious items from the reels!</p>
        </div>
      )}
    </>
  );

  const renderPaymentContent = () => (
    <>
      <SheetHeader>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setStep('cart')}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <SheetTitle>Payment</SheetTitle>
        </div>
        <SheetDescription>
            Choose your preferred payment method. Total: ${total.toFixed(2)}
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col gap-4 py-8">
        <Button variant="outline" className="h-16 justify-start gap-4 text-base" onClick={handlePayment}>
            <CreditCard className="h-6 w-6 text-primary" />
            Debit/Credit Card
        </Button>
        <Button variant="outline" className="h-16 justify-start gap-4 text-base" onClick={handlePayment}>
            <Wallet className="h-6 w-6 text-primary" />
            UPI / Wallets
        </Button>
        <Button variant="outline" className="h-16 justify-start gap-4 text-base" onClick={handlePayment}>
            <Banknote className="h-6 w-6 text-primary" />
            Cash on Delivery
        </Button>
      </div>
    </>
  );
  
    const renderReceiptContent = () => (
    <>
      <SheetHeader>
        <SheetTitle>Order Confirmed!</SheetTitle>
        <SheetDescription>
          A receipt has been sent to your email.
        </SheetDescription>
      </SheetHeader>
      <div className="py-4">
        <h4 className="font-semibold mb-2">Order Summary</h4>
        <div className="space-y-2 rounded-md border p-4">
            {cartItems.map(item => (
                 <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.quantity} x {item.reel.product.name}</span>
                    <span>${(item.quantity * item.reel.product.price).toFixed(2)}</span>
                 </div>
            ))}
            <Separator />
            <div className="flex justify-between font-bold">
                <span>Total Paid</span>
                <span>${total.toFixed(2)}</span>
            </div>
        </div>
      </div>
       <SheetFooter>
            <SheetClose asChild>
                <Button className="w-full" onClick={resetCart}>Back to Shopping</Button>
            </SheetClose>
        </SheetFooter>
    </>
  );

  const renderStep = () => {
    switch (step) {
      case "payment":
        return renderPaymentContent();
      case "receipt":
        return renderReceiptContent();
      case "cart":
      default:
        return renderCartContent();
    }
  };

  return (
    <Sheet onOpenChange={(open) => !open && resetCart()}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        {renderStep()}
      </SheetContent>
    </Sheet>
  );
}
