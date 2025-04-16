// src/contexts/WebSocketContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import WebSocketClient from '../services/websocket';

// Define the context type
interface WebSocketContextType {
  data: any | null;
  wsClient: WebSocketClient | null;
}

// Create context with a default value
export const WebSocketContext = createContext<WebSocketContextType>({ data: null, wsClient: null });

interface WebSocketProviderProps {
  children: ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [data, setData] = useState<any | null>(null);
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