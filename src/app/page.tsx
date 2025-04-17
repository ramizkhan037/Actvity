'use client';

import LaptopList from '@/components/laptop-list';
import WebSocketDebug from '@/components/websocket-debug';
import { useEffect } from 'react';
import { LaptopInformation } from '@/services/laptop';
import { useWebSocket } from '@/contexts/WebSocketContext';

export default function HomePage() {
  const { data } = useWebSocket();

  const laptops: LaptopInformation[] = data || [];

  useEffect(() => {
    if (data) {
      console.log('Received WebSocket update:', data);
    }
  }, [data]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Laptop Monitoring</h1>
      <WebSocketDebug />
      <LaptopList laptops={laptops} />
    </div>
  );
}

