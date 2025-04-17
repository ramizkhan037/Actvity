// src/contexts/WebSocketContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import WebSocketClient from '../services/websocket';
import { LaptopInformation } from '../services/laptop';

// Define the context type
interface WebSocketContextType {
  data: LaptopInformation[] | null;
  wsClient: WebSocketClient | null;
}

// Dummy data for initial display
const dummyLaptops: LaptopInformation[] = [
  {
    id: "laptop-001",
    name: "MacBook Pro",
    lastSeen: new Date(),
    cpuUsage: 0.45,
    memoryUsage: 0.62,
  },
  {
    id: "laptop-002",
    name: "Dell XPS",
    lastSeen: new Date(),
    cpuUsage: 0.28,
    memoryUsage: 0.35,
  },
  {
    id: "laptop-003",
    name: "ThinkPad X1",
    lastSeen: new Date(),
    cpuUsage: 0.75,
    memoryUsage: 0.81,
  },
];

// Create context with a default value
export const WebSocketContext = createContext<WebSocketContextType>({ data: dummyLaptops, wsClient: null });

interface WebSocketProviderProps {
  children: ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [data, setData] = useState<LaptopInformation[] | null>(dummyLaptops);
  const [wsClient, setWsClient] = useState<WebSocketClient | null>(null);

  useEffect(() => {
    const client = new WebSocketClient('ws://localhost:9004');

    client.onMessage((message) => {
      console.log('Received:', message);
      try {
        const parsedData = JSON.parse(message);
        setData(parsedData);
      } catch (e) {
        console.error('Error parsing WebSocket message:', e);
      }
    }).connect();

    setWsClient(client);

    return () => {
      client.close();
    };
  }, []);

  return <WebSocketContext.Provider value={{ data, wsClient }}>
    {children}
  </WebSocketContext.Provider>
}

export const useWebSocket = () => useContext(WebSocketContext);