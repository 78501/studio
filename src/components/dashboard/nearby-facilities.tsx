"use client";

import { ScrollArea } from '@/components/ui/scroll-area';
import { Hospital, MapPin } from 'lucide-react';

const facilities = [
  {
    id: '1',
    name: 'City General Hospital',
    address: '123 Main St, Cityville',
    distance: '2.5 miles',
  },
  {
    id: '2',
    name: 'County Medical Center',
    address: '456 Oak Ave, Treetown',
    distance: '5.1 miles',
  },
  {
    id: '3',
    name: 'St. Jude\'s Emergency Care',
    address: '789 Pine Ln, Forestburg',
    distance: '8.3 miles',
  },
  {
    id: '4',
    name: 'Riverside Community Hospital',
    address: '101 River Rd, Waterton',
    distance: '12.0 miles',
  },
];

export default function NearbyFacilities() {
  return (
    <ScrollArea className="h-64 pr-4">
      <div className="space-y-4">
        {facilities.map((facility) => (
          <div key={facility.id} className="flex items-start gap-4 p-3 border rounded-md transition-colors hover:bg-muted/50">
            <div className="flex-shrink-0 pt-1">
              <Hospital className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{facility.name}</p>
              <p className="text-sm text-muted-foreground">{facility.address}</p>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{facility.distance} away</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
