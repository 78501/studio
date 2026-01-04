"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Hospital, Stethoscope, User as UserIcon, Wifi } from "lucide-react";

import { useApp } from "@/hooks/use-app";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserRole } from "@/lib/types";

export default function LoginPage() {
  const { login, role } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (role) {
      router.push("/dashboard");
    }
  }, [role, router]);

  const handleLogin = (selectedRole: UserRole) => {
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
      description: "Send help requests in emergency situations.",
      icon: UserIcon,
    },
    {
      role: "medic",
      name: "Medic",
      description: "Receive and respond to help requests.",
      icon: Stethoscope,
    },
    {
      role: "hospital",
      name: "Hospital",
      description: "Monitor and coordinate emergency responses.",
      icon: Hospital,
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-2">
            <Wifi className="h-12 w-12 text-primary" />
            <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary ml-2">
            MeshConnect
            </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Offline peer-to-peer messaging for emergency assistance.
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">Choose Your Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map(({ role, name, description, icon: Icon }) => (
            <Card
              key={role}
              onClick={() => handleLogin(role)}
              className="cursor-pointer hover:shadow-lg hover:border-primary transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-2">
                    <Icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">{name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
       <footer className="mt-12 text-center text-muted-foreground text-sm">
        <p>Your device is part of a secure, offline mesh network.</p>
        <p>All communication is peer-to-peer via Bluetooth.</p>
      </footer>
    </main>
  );
}
