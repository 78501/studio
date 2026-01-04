"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formatDistanceToNow } from 'date-fns';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useApp } from "@/hooks/use-app";
import { Send, MapPin, Check, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Message } from "@/lib/types";

const formSchema = z.object({
  content: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(200, {
    message: "Message cannot exceed 200 characters.",
  }),
  shareLocation: z.boolean().default(false),
});

export default function UserView() {
  const { sendMessage, messages } = useApp();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      shareLocation: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const handleSend = (location?: GeolocationPosition) => {
        sendMessage({
            content: values.content,
            location: values.shareLocation && location ? {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            } : undefined,
            status: 'sending'
        });
        toast({
            title: "Message Sent",
            description: "Your help request has been broadcasted to the network.",
        });
        form.reset();
    }

    if (values.shareLocation) {
        if (!navigator.geolocation) {
            toast({ variant: 'destructive', title: "Geolocation is not supported by your browser." });
            handleSend();
        } else {
            navigator.geolocation.getCurrentPosition(handleSend, () => {
                toast({ variant: 'destructive', title: "Unable to retrieve your location." });
                handleSend(); // Send without location
            });
        }
    } else {
        handleSend();
    }
  }
  
  const userMessages = messages.filter(msg => msg.senderId === 'local-user');

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Emergency Broadcast</CardTitle>
          <CardDescription>
            Send a help request to nearby medics and hospitals.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your situation, e.g., 'Fallen from height, possible leg fracture.'"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shareLocation"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Share Location</FormLabel>
                      <FormDescription>
                        Allow responders to see your current location for faster assistance.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={form.formState.isSubmitting}>
                <Send className="mr-2 h-4 w-4" /> Send Help Message
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Sent Messages</CardTitle>
          <CardDescription>A log of your recent help requests.</CardDescription>
        </CardHeader>
        <CardContent>
          {userMessages.length > 0 ? (
            <ul className="space-y-4">
              {userMessages.map((msg) => (
                <li key={msg.id} className="flex items-start space-x-4 p-3 border rounded-md">
                    <div className="flex-shrink-0">
                        {msg.status === 'sending' ? <Clock className="h-5 w-5 text-muted-foreground animate-spin" /> : <Check className="h-5 w-5 text-green-500" />}
                    </div>
                    <div className="flex-1">
                        <p className="text-sm">{msg.content}</p>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <span>{formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}</span>
                            {msg.location && <MapPin className="h-3 w-3 ml-2" />}
                        </div>
                    </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground py-8">You haven't sent any messages yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
