'use client';

import LaptopList from '@/components/laptop-list';
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

  return <LaptopList laptops={laptops} />;
}

