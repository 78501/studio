"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bluetooth, LogOut, HeartPulse } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { logout, role } = useApp();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout();
    router.push('/');
  };

  const roleName = role ? role.charAt(0).toUpperCase() + role.slice(1) : '';

  if (isLoggingOut) {
    return (
      <div className="flex flex-col items-center justify-center h-screen animate-pulse">
        <HeartPulse className="h-20 w-20 text-primary" />
        <h1 className="font-headline text-5xl font-bold text-primary ml-2 mt-4">
          AidNet
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">Disconnecting from Network...</p>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-4">
          <HeartPulse className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-2xl font-bold text-primary hidden sm:block">
            AidNet
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <Bluetooth className="h-5 w-5 text-green-500" />
            <span className="text-sm text-muted-foreground hidden md:inline">
              Connected | {roleName}
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
