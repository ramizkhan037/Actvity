'use client';

import { LaptopService } from '@/services/laptop';
import LaptopList from '@/components/laptop-list';
import { useEffect, useState } from 'react';
import { LaptopInformation } from '@/services/laptop';
import WebSocketClient from '@/services/websocket';

export default function HomePage() {
  const [laptops, setLaptops] = useState<LaptopInformation[]>([]);

  useEffect(() => {
    const laptopService = new LaptopService();

    const fetchData = async () => {
      try {
        const initialLaptops = await laptopService.getLaptops();
        console.log('Initial data fetched:', initialLaptops);
        setLaptops(initialLaptops);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchData();

    const wsClient = new WebSocketClient();
    wsClient.connect('ws://localhost:8080');
    wsClient.onMessage((message: string) => {
      try {
        const updatedLaptops = JSON.parse(message);
        console.log('Received WebSocket update:', updatedLaptops);
        setLaptops(updatedLaptops);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });
  }, []);
  return <LaptopList laptops={laptops} />;
}

