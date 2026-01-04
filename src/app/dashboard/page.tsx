"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/hooks/use-app';
import { HeartPulse } from 'lucide-react';
import UserView from '@/components/dashboard/user-view';
import ResponderView from '@/components/dashboard/responder-view';

export default function DashboardPage() {
  const { role, loading } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !role) {
      router.replace('/');
    }
  }, [role, loading, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full animate-pulse">
        <HeartPulse className="h-20 w-20 text-primary" />
        <h1 className="font-headline text-5xl font-bold text-primary ml-2 mt-4">
          AidNet
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">Initializing Network...</p>
      </div>
    );
  }

  if (!role) {
    return null; // or a fallback UI, but useEffect should redirect
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      {role === 'user' ? (
        <UserView />
      ) : (
        <ResponderView role={role} />
      )}
    </div>
  );
}
