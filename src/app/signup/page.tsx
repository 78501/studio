"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Hospital, Stethoscope, User as UserIcon, Wifi } from "lucide-react";

import { useApp } from "@/hooks/use-app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function SignupPage() {
  const { login, role } = useApp();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>("user");

  useEffect(() => {
    if (role) {
      router.push("/dashboard");
    }
  }, [role, router]);

  const handleSignup = () => {
    login(selectedRole);
    router.push("/dashboard");
  };

  const roles: {
    role: UserRole;
    name: string;
    description: string;
    icon: React.ElementType;
  }[] = [
    {
      role: "user",
      name: "User",
      description: "Send help requests.",
      icon: UserIcon,
    },
    {
      role: "medic",
      name: "Medic",
      description: "Respond to requests.",
      icon: Stethoscope,
    },
    {
      role: "hospital",
      name: "Hospital",
      description: "Monitor responses.",
      icon: Hospital,
    },
  ];

  if (role) return null;

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
            <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
            <CardDescription>Join the network to send or receive alerts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            
            <div>
              <Label className="mb-3 block">Choose Your Role</Label>
              <RadioGroup
                defaultValue="user"
                className="grid grid-cols-3 gap-4"
                value={selectedRole}
                onValueChange={(value: UserRole) => setSelectedRole(value)}
              >
                {roles.map(({ role, name, icon: Icon }) => (
                  <div key={role}>
                    <RadioGroupItem value={role} id={role} className="peer sr-only" />
                    <Label
                      htmlFor={role}
                      className={cn(
                        "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                        "peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      )}
                    >
                      <Icon className="mb-3 h-6 w-6" />
                      {name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button onClick={handleSignup} className="w-full">
              Sign Up
            </Button>

            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/" className="underline">
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
