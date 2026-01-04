"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

import { useApp } from "@/hooks/use-app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Hospital } from "lucide-react";

export default function HospitalLoginPage() {
  const { login, role } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (role) {
      router.push("/dashboard");
    }
  }, [role, router]);

  const handleLogin = () => {
    login('hospital'); 
    router.push("/dashboard");
  };

  if (role) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
                <Hospital className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Hospital Login</CardTitle>
            <CardDescription>
              Log in to the command center.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hospitalId">Hospital ID</Label>
              <Input id="hospitalId" type="text" placeholder="HOS-12345" required />
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
