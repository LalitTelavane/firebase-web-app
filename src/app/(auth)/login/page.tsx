"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FoodReelsLogo } from "@/components/food-reels/logo";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 lg:gap-16">
        <div className="w-full max-w-md">
            <Card>
                <CardHeader className="space-y-1 text-center">
                    <div className="mx-auto mb-4">
                        <FoodReelsLogo />
                    </div>
                    <CardTitle className="font-headline text-2xl">Welcome Back!</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" required defaultValue="creator@example.com" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                href="#"
                                className="ml-auto inline-block text-sm underline"
                                >
                                Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" type="password" required defaultValue="password" />
                        </div>
                         <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                            Login
                        </Button>
                        <Button variant="outline" className="w-full">
                            Login with Google
                        </Button>
                    </CardContent>
                </form>
                <CardFooter className="text-center text-sm">
                    Don&apos;t have an account?&nbsp;
                    <Link href="/signup" className="underline">
                        Sign up
                    </Link>
                </CardFooter>
            </Card>
        </div>
        <div className="hidden md:block w-full max-w-md lg:max-w-lg">
            <Image
                src="https://picsum.photos/seed/burger-login/600/800"
                alt="A delicious burger"
                width={600}
                height={800}
                className="rounded-lg shadow-2xl"
                data-ai-hint="burger food"
            />
        </div>
    </div>
  );
}
