"use client";

import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { UserRole, Message, Medic } from '@/lib/types';

interface AppContextType {
  role: UserRole | null;
  messages: Message[];
  medics: Medic[];
  loading: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  sendMessage: (message: Omit<Message, 'id' | 'timestamp' | 'senderId'>) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const MOCK_MEDICS: Medic[] = [
    { id: 'medic-1', name: 'Dr. Emily Carter', specialty: 'Paramedic', distance: '0.8 miles' },
    { id: 'medic-2', name: 'John Davis', specialty: 'EMT', distance: '1.2 miles' },
];

// This represents the medic who is currently logging in.
const LOCAL_MEDIC: Medic = {
  id: 'local-medic',
  name: 'Alex Riley (You)',
  specialty: 'Field Medic',
  distance: '0.1 miles',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [medics, setMedics] = useState<Medic[]>(MOCK_MEDICS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedRole = window.localStorage.getItem('meshconnect-role') as UserRole | null;
      const storedMessages = JSON.parse(window.localStorage.getItem('meshconnect-messages') || '[]');
      if (storedRole) {
        setRole(storedRole);
        if (storedRole === 'medic') {
          setMedics(prev => [LOCAL_MEDIC, ...prev]);
        }
      }
      setMessages(storedMessages);
    } catch (error) {
      console.error("Failed to read from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      try {
        window.localStorage.setItem('meshconnect-role', role || '');
        window.localStorage.setItem('meshconnect-messages', JSON.stringify(messages));
      } catch (error) {
        console.error("Failed to write to localStorage", error);
      }
    }
  }, [role, messages, loading]);

  const login = useCallback((selectedRole: UserRole) => {
    if (selectedRole === 'medic') {
        // Add the logged-in medic to the list if not already present
        setMedics(prev => {
            if (prev.find(m => m.id === LOCAL_MEDIC.id)) return prev;
            return [LOCAL_MEDIC, ...prev];
        });
    }
    setRole(selectedRole);
  }, []);

  const logout = useCallback(() => {
    if (role === 'medic') {
        // Remove the logged-in medic from the list
        setMedics(prev => prev.filter(m => m.id !== LOCAL_MEDIC.id));
    }
    setRole(null);
  }, [role]);

  const sendMessage = useCallback((messageContent: Omit<Message, 'id' | 'timestamp' | 'senderId'>) => {
    const newMessage: Message = {
      ...messageContent,
      id: new Date().toISOString() + Math.random(),
      timestamp: Date.now(),
      senderId: 'local-user', // In a real app, this would be a unique device ID
      status: 'sending',
    };
    
    setMessages(prevMessages => [newMessage, ...prevMessages]);

    // Simulate message being sent over the mesh network
    setTimeout(() => {
        setMessages(prevMessages => prevMessages.map(msg => msg.id === newMessage.id ? {...msg, status: 'sent'} : msg));
    }, 1500);
  }, []);

  const value = { role, messages, medics, loading, login, logout, sendMessage };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
