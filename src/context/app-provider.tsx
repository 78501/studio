"use client";

import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { UserRole, Message, Medic } from '@/lib/types';

interface AppContextType {
  role: UserRole | null;
  messages: Message[];
  medics: Medic[];
  loading: boolean;
  login: (role: UserRole, name?: string) => void;
  logout: () => void;
  sendMessage: (message: Omit<Message, 'id' | 'timestamp' | 'senderId'>) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const MOCK_MEDICS: Medic[] = [
    { id: 'medic-1', name: 'Dr. Emily Carter', specialty: 'Paramedic', distance: '0.8 miles' },
    { id: 'medic-2', name: 'John Davis', specialty: 'EMT', distance: '1.2 miles' },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [medics, setMedics] = useState<Medic[]>(MOCK_MEDICS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedRole = window.localStorage.getItem('meshconnect-role') as UserRole | null;
      const storedMessages = JSON.parse(window.localStorage.getItem('meshconnect-messages') || '[]');
      const storedMedics = JSON.parse(window.localStorage.getItem('meshconnect-medics') || JSON.stringify(MOCK_MEDICS));
      
      if (storedRole) {
        setRole(storedRole);
      }
      setMessages(storedMessages);
      setMedics(storedMedics);

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
        window.localStorage.setItem('meshconnect-medics', JSON.stringify(medics));
      } catch (error) {
        console.error("Failed to write to localStorage", error);
      }
    }
  }, [role, messages, medics, loading]);

  const login = useCallback((selectedRole: UserRole, name?: string) => {
    if (selectedRole === 'medic') {
        const localMedic: Medic = {
          id: 'local-medic',
          name: name || 'Anonymous Medic',
          specialty: 'Field Medic',
          distance: '0.1 miles',
        };
        setMedics(prev => {
            if (prev.find(m => m.id === localMedic.id)) return prev;
            return [localMedic, ...MOCK_MEDICS];
        });
    }
    setRole(selectedRole);
  }, []);

  const logout = useCallback(() => {
    if (role === 'medic') {
        setMedics(prev => prev.filter(m => m.id !== 'local-medic'));
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
