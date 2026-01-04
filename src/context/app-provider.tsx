"use client";

import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { UserRole, Message } from '@/lib/types';

interface AppContextType {
  role: UserRole | null;
  messages: Message[];
  loading: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  sendMessage: (message: Omit<Message, 'id' | 'timestamp' | 'senderId'>) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedRole = window.localStorage.getItem('meshconnect-role') as UserRole | null;
      const storedMessages = JSON.parse(window.localStorage.getItem('meshconnect-messages') || '[]');
      if (storedRole) {
        setRole(storedRole);
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
    setRole(selectedRole);
  }, []);

  const logout = useCallback(() => {
    setRole(null);
    // Optionally clear messages on logout, or keep them for persistence
    // setMessages([]); 
  }, []);

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

  const value = { role, messages, loading, login, logout, sendMessage };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
