"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { signInWithEmail, signInAnonymously, isUserLoading } = useAuth();
  const [email, setEmail] = useState("creator@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmail(email, password);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAnonymousLogin = async () => {
    setError(null);
    try {
      await signInAnonymously();
      toast({
        title: "Logged In as Guest",
        description: "You are browsing as a guest.",
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  }

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
              {error && (
                <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Login Failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
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
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isUserLoading}>
                {isUserLoading ? 'Logging in...' : 'Login'}
              </Button>
              <Button variant="outline" className="w-full" onClick={handleAnonymousLogin} disabled={isUserLoading}>
                Login as Guest
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
