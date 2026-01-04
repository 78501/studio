"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useApp } from '@/hooks/use-app';
import { MapPin, Stethoscope, UserCircle } from 'lucide-react';

export default function NearbyMedics() {
    const { medics } = useApp();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Nearby Medical Experts</CardTitle>
        <CardDescription>Available first responders in your area.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 pr-4">
          <div className="space-y-4">
            {medics.map((medic) => (
              <div key={medic.id} className="flex items-start gap-4 p-3 border rounded-md">
                <div className="flex-shrink-0 pt-1">
                  <UserCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{medic.name}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Stethoscope className="h-4 w-4 mr-1.5" />
                    <span>{medic.specialty}</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{medic.distance} away</span>
                  </div>
                </div>
              </div>
            ))}
             {medics.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                    <p>No medics are currently online in your vicinity.</p>
                </div>
             )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
