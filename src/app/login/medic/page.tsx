"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

import { useApp } from "@/hooks/use-app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, HeartPulse } from "lucide-react";

export default function MedicLoginPage() {
  const { login, role } = useApp();
  const router = useRouter();
  const [name, setName] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (role) {
      router.push("/dashboard");
    }
  }, [role, router]);

  const handleLogin = () => {
    setIsLoggingIn(true);
    login('medic', name || 'Alex Riley (You)'); 
    router.push("/dashboard");
  };

  if (isLoggingIn || role) {
    return (
       <div className="flex flex-col items-center justify-center h-screen animate-pulse">
        <HeartPulse className="h-20 w-20 text-primary" />
        <h1 className="font-headline text-5xl font-bold text-primary ml-2 mt-4">
          AidNet
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">Connecting to Network...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
                <Stethoscope className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Medic Login</CardTitle>
            <CardDescription>
              Log in to respond to emergencies.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Alex Riley" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="medic@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
            <div className="mt-4 text-center text-sm">
              <Link href="/" className="underline">
                Back to role selection
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
