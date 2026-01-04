"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

import { useApp } from "@/hooks/use-app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi } from "lucide-react";

export default function LoginPage() {
  const { login, role } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (role) {
      router.push("/dashboard");
    }
  }, [role, router]);

  const handleLogin = () => {
    // This is a mock login. In a real app, you'd validate credentials.
    // For now, we'll log in as a 'user' by default.
    login('user'); 
    router.push("/dashboard");
  };

  if (role) return null; // Or a loader

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-2">
                <Wifi className="h-12 w-12 text-primary" />
                <h1 className="font-headline text-4xl font-bold text-primary ml-2">
                MeshConnect
                </h1>
            </div>
            <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Log in to access the emergency network.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{' '}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
       <footer className="mt-12 text-center text-muted-foreground text-sm">
        <p>Your device is part of a secure, offline mesh network.</p>
        <p>All communication is peer-to-peer via Bluetooth.</p>
      </footer>
    </main>
  );
}
