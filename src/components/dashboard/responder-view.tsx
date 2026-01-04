"use client";

import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useApp } from '@/hooks/use-app';
import { MapPin, MessageSquare, ShieldAlert, Mic } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ResponderViewProps {
  role: 'medic' | 'hospital';
}

export default function ResponderView({ role }: ResponderViewProps) {
  const { messages } = useApp();

  const title = role === 'medic' ? 'Medic Response Feed' : 'Hospital Command Center';
  const description = 'Live feed of incoming emergency requests from the mesh network.';

  return (
    <Card className="h-[calc(100vh-10rem)]">
      <CardHeader>
        <CardTitle className="font-headline">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <Card 
                  key={msg.id} 
                  className="border-l-4 border-accent animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms`}}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <ShieldAlert className="h-6 w-6 text-accent" />
                            <CardTitle className="text-lg">Urgent Request</CardTitle>
                        </div>
                        <Badge variant="outline">{formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base mb-3 pl-9">"{msg.content}"</p>
                    <div className="flex items-center gap-4 text-sm pl-9">
                        {msg.location && (
                            <div className="flex items-center gap-2 text-blue-400">
                                <MapPin className="h-4 w-4" />
                                <span>Location attached</span>
                                <span className="text-muted-foreground text-xs font-mono">({msg.location.latitude.toFixed(4)}, {msg.location.longitude.toFixed(4)})</span>
                            </div>
                        )}
                         {msg.audio && (
                            <div className="flex items-center gap-2 text-purple-400">
                                <Mic className="h-4 w-4" />
                                <span>Voice message attached</span>
                            </div>
                        )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground pt-16 animate-fade-in-up">
              <MessageSquare className="h-16 w-16 mb-4" />
              <h3 className="text-xl font-semibold">All Clear</h3>
              <p>No incoming messages at the moment. Waiting for new requests...</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
