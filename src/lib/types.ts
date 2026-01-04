export type UserRole = 'user' | 'medic' | 'hospital';

export interface Message {
  id: string;
  senderId: string; // Could be a device ID in a real scenario
  content: string;
  timestamp: number;
  location?: {
    latitude: number;
    longitude: number;
  };
  status: 'sending' | 'sent';
}
