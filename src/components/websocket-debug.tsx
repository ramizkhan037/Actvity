'use client';

import React from 'react';
import { useWebSocket } from '@/contexts/WebSocketContext';

const WebSocketDebug: React.FC = () => {
  const { data } = useWebSocket();

  return (
    <div className="p-4 border border-gray-300 rounded-md bg-gray-50 my-4">
      <h2 className="text-lg font-semibold mb-2">WebSocket Debug</h2>
      <div className="mb-2">
        <span className="font-medium">Connection Status:</span> 
        {data ? (
          <span className="text-green-600 ml-2">Connected</span>
        ) : (
          <span className="text-red-600 ml-2">Waiting for data...</span>
        )}
      </div>
      <div>
        <span className="font-medium">Received Data:</span>
        <pre className="mt-2 p-3 bg-gray-100 rounded overflow-auto max-h-60 text-sm">
          {data ? JSON.stringify(data, null, 2) : 'No data received yet'}
        </pre>
      </div>
    </div>
  );
};

export default WebSocketDebug;