// src/services/websocketServer.ts
import { WebSocketServer, WebSocket } from 'ws';
import { LaptopInformation } from './laptop';

class WebSocketServerClass {
  private wss: WebSocketServer;

  constructor() {
    this.wss = new WebSocketServer({ noServer: true });
  }

  start(server: any, getLaptops: () => Promise<LaptopInformation[]>): void {
      server.on('upgrade', (request: any, socket: any, head: any) => {
          this.wss.handleUpgrade(request, socket, head, (ws) => {
            this.wss.emit('connection', ws, request);
          });
      });

      this.wss.on('connection', (ws: WebSocket) => {
        console.log('Client connected');

        ws.on('message', (message: string) => {
          console.log(`Received: ${message}`);
        });

        ws.on('close', () => {
          console.log('Client disconnected');
        });
      });

      const interval = setInterval(async () => {
        const laptops: LaptopInformation[] = await getLaptops();
        this.broadcastMessage(JSON.stringify(laptops));
      }, 5000);

      server.on('close', () => this.closeAllIntervals(interval));
  }
  
    broadcastMessage(message: string): void {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
  
    closeAllIntervals(interval: NodeJS.Timeout): void {
        clearInterval(interval);
    }
}

export { WebSocketServerClass };