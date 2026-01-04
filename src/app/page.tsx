"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Hospital, Stethoscope, User as UserIcon, Wifi } from "lucide-react";

import { useApp } from "@/hooks/use-app";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/lib/types";

export default function RoleSelectionPage() {
  const { role } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (role) {
      router.push("/dashboard");
    }
  }, [role, router]);

  const roles: {
    role: UserRole;
    name: string;
    description: string;
    icon: React.ElementType;
  }[] = [
    {
      role: "user",
      name: "User",
      description: "I need assistance.",
      icon: UserIcon,
    },
    {
      role: "medic",
      name: "Medic",
      description: "I am a first responder.",
      icon: Stethoscope,
    },
    {
      role: "hospital",
      name: "Hospital",
      description: "I am a command center.",
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
            <CardTitle className="font-headline text-2xl">Select Your Role</CardTitle>
            <CardDescription>
              Choose how you are connecting to the network.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="grid grid-cols-3 gap-4">
                {roles.map(({ role, name, icon: Icon }) => (
                  <Link key={role} href={`/login/${role}`} passHref>
                    <div
                      className={cn(
                        "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer h-full"
                      )}
                    >
                      <Icon className="mb-3 h-6 w-6" />
                      <span className="text-center text-sm font-medium">{name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            
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
